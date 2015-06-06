'use strict';

var hash = require('../hash');
var skill = require('./skill');

var add = function (a, b) {
    return {
        op: 'add',
        a: a,
        b: b
    };
};
var sum = function (a, b) {
    return {
        op: 'sum',
        a: a,
        b: b
    };
};
var max = function (a, b) {
    return {
        op: 'max',
        a: a,
        b: b
    };
};
var div = function (a, b) {
    return {
        op: 'div',
        a: a,
        b: b
    };
};
var each = function (a, b) {
    return {
        op: 'each',
        a: a,
        b: b
    };
};
var zero = function (a, b) {
    return {
        op: 'zero',
        a: a,
        b: b
    };
};
var floor = function (a, b) {
    return {
        op: 'floor',
        a: a,
        b: b
    };
};

var build = function (target) {
    var dirty = true;
    var dependics = {};

    var flush = function (target, key) {
        target.dirty = true;
        //var targets = dependics[key];

        //if (targets) {
        //    var cache = target._cache;
        //    targets.forEach(function (key) {
        //        hash.remove(cache, key);
        //    });
        //}
    };

    Object.keys(target.dependics).forEach(function (key) {
        var node = target.dependics[key];

        var getDependeds = function (node) {
            if (typeof(node) == 'string') {
                if (!(node in dependics)) {
                    dependics[node] = [];
                }
                dependics[node].push(key);

                if (node.match('.*.')) {
                    var path = node.split('.*.')[0];
                    if (!(path in dependics)) {
                        dependics[path] = [];
                    }
                    dependics[path].push(key);
                }
            } else if (node) {
                if (node.a) getDependeds(node.a);
                if (node.b) getDependeds(node.b);
            }
        };
        getDependeds(node);

        Object.defineProperty(target.prototype, key, {
            enumerable: true,
            get: function () {
                if (this.dirty || this._cache[key] == null) {
                    var _this = this;

                    var exec = function (node) {
                        var aggregate = function (callback, init) {
                            var path = node.a.split('.*.');
                            return (hash.get(_this, path[0]) || []).map(function (item) {
                                return (+hash.get(item, path[1])) || 0;
                            }).reduce(callback, node.b || init);
                        };

                        if (typeof(node) == 'string') {
                            return +hash.get(_this, node);
                        } else if (node.op == 'zero') {
                            return 0;
                        } else if (node.op == 'add') {
                            return exec(node.a) + exec(node.b);
                        } else if (node.op == 'sum') {
                            return aggregate(function (a, b) { return a + b; }, 0);
                        } else if (node.op == 'max') {
                            return aggregate(function (a, b) { return a > b ? a : b; });
                        } else if (node.op == 'each') {
                            var results = [];
                            for (var i = 0; i < node.b; ++i) {
                                var next = node.a;
                                if (typeof(next.a) == 'string') next.a += '.' + i;
                                if (typeof(next.b) == 'string') next.b += '.' + i;

                                var result = exec(node.a);
                            }
                        } else if (typeof(node) == 'function') {
                            return node(_this);
                        }
                    };

                    hash.set(_this._cache, key, exec(node));

                    flush(_this, key);
                }
                return this._cache[key];
            }
        });
    });

    target.fields.forEach(function (key) {
        Object.defineProperty(target.prototype, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                return hash.get(this._data, key);
            },
            set: function (value) {
                hash.set(this._data, key, value);
                flush(this, key);
            }
        });
    });

    target.prototype.append = function (key, value) {
        var SubModule = Character.hasMany[key];
        if (SubModule) {
            hash.get(this, key).push(new SubModule(this, value || {}));
            flush(this, key);
        }
    };

    target.prototype.remove = function (key, index) {
        var a = hash.get(this, key);
        for (var i = index; i < a.length; ++i) {
            a[i] = a[i + 1];
        }
        --a.length;

        flush(this, key);
    };

    Object.defineProperty(target.prototype, 'dirty', {
        get: function () {
            if (this.parent) {
                return this.parent.dirty;
            } else {
                return dirty;
            }
        },
        set: function (value) {
            if (this.parent) {
                this.parent.dirty = value;
            } else {
                dirty = value;
            }
        }
    });
};

var createSubModule = function (fields, dependics) {
    fields = fields || [];
    dependics = dependics || {};

    var subModule = function (parent, data) {
        this.parent = parent;

        Object.defineProperty(this, '_cache', {
            writable: true,
            value: {}
        });
        Object.defineProperty(this, '_data', {
            writable: true,
            value: data
        });
    };

    subModule.fields = fields;
    subModule.dependics = dependics;

    build(subModule);

    return subModule;
};

var Character = function (data) {
    Object.defineProperty(this, '_cache', {
        writable: true,
        value: {}
    });
    Object.defineProperty(this, '_data', {
        writable: true,
        value: data
    });

    var _this = this;

    Object.keys(Character.hasOne).forEach(function (key) {
        var SubModule = Character.hasOne[key];
        Object.defineProperty(this, key, {
            enumerable: true,
            value: new SubModule(_this, hash.get(data, key))
        });
    }.bind(this));

    Object.keys(Character.hasMany).forEach(function (key) {
        Object.defineProperty(this, key, {
            enumerable: true,
            value: (hash.get(data, key) || []).map(function (data) {
                var SubModule = Character.hasMany[key];
                return new SubModule(_this, data);
            })
        });
    }.bind(this));
};

Character.fields = [
    'id',
    'name',
    'user_id',
    'race',
    'sex',
    'age',
    'fumbles',
    'expreience',
    'nationality',
    'evasion_skill',
    'notes',
    'inventory',
    'honor',
    'instrument',
    'pet'
];

Character.hasOne = {
    ability: createSubModule(
                     ['base3', 'base', 'growth'],
                     {
                         correct: function (_this) {
                             return [0, 0, 0, 0, 0, 0];
                         },
                         sum: function (_this) {
                             return _this.base.map(function (base, i) {
                                 return (+_this.base3[Math.floor(i / 2)])
                                     + (+base)
                                     + (+_this.growth[i])
                                     + (+_this.correct[i]);
                             });
                         },
                         bonus: function (_this) {
                             return _this.sum.map(function (sum) {
                                 return Math.floor(sum / 6);
                             });
                         }
                     })
};
Character.hasMany = {
    skills: createSubModule(['name', 'level'], {
        magic_power: function (_this) {
            return skill.isMagicSkill(_this.name)
                ? (+_this.level) + _this.parent.ability.bonus[4] + (+_this.parent.magic_power || 0)
                : undefined;
        }
    }),
    weapons: createSubModule(['name']),
    supplies: createSubModule(['name', 'count']),
        //'ornaments',
        //'money',
    combat_feats: createSubModule(['name', 'auto', 'effect']),
    languages: createSubModule(['name', 'talk', 'write']),
    honorable_items: createSubModule(['name', 'value']),
    techniques: createSubModule(['name', 'effect']),
    songs: createSubModule(['name', 'effect']),
    riding_skills: createSubModule(['name', 'effect']),
    alchemist_skills: createSubModule(['name', 'effect']),
    warleader_skills: createSubModule(['name', 'effect']),
    mistic_skill: createSubModule(['name', 'effect'])
};
Character.dependics = {
    level: max('skills.*.level'),
    total_honor: add(sum('honorable_items.*.value'), 'honor')
};

build(Character);

module.exports = Character;

var c = new Character(require('../../sw2chara.json'));
