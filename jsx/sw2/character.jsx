'use strict';

var hash = require('../hash');

var Virtual = (function () {
    var funcs = {
        num: function (data) {
            return (+this.a);
        },
        field: function (data) {
            var value = hash.extract(data, this.a);
            if (Array.isArray(value)) {
                return value;
            } else {
                return +value;
            }
        },
        add: function (data) {
            return this.a.eval(data) + this.b.eval(data);
        },
        sub: function (data) {
            return this.a.eval(data) + this.b.eval(data);
        },
        mul: function (data) {
            return this.a.eval(data) * this.b.eval(data);
        },
        div: function (data) {
            return this.a.eval(data) / this.b.eval(data);
        },
        floor: function (data) {
            return Math.floor(this.a.eval(data));
        },
        map: function (data) {
            var b = this.b;
            return (this.a.eval(data) || []).map(function (a) {
                if (b.a) {
                    b.b = {
                        a: +a,
                        eval: funcs.num
                    };
                } else {
                    b.a = {
                        a: +a,
                        eval: funcs.num
                    };
                    console.log(b);
                }
                return b.eval(data);
            });
        },
        sum: function (data) {
            return (this.a.eval(data) || []).reduce(function (a, b) {
                return (+a) + (+b);
            }, this.b ? (+this.b.eval(data) || 0) : 0);
        },
        max: function (data) {
            return (this.a.eval(data) || []).reduce(function (a, b) {
                return Math.max(+a, +b);
            }, this.b ? (+this.b.eval(data) || 0) : 0);
        },
        stretch: function (data) {
            var src = this.a.eval(data) || [];
            var dst = [];

            var r = +this.b.eval(data);
            var len = src.length * r;

            for (var i = 0; i < len; ++i) {
                dst.push(src[Math.floor(i / r)]);
            }

            return dst;
        },
        adda: function (data) {
            var a = this.a.eval(data) || [];
            var b = this.b.eval(data) || [];
            var len = Math.min(a.length, b.length);

            var result = [];
            for (var i = 0; i < len; ++i) {
                result.push(a[i] + b[i]);
            }

            return result;
        }
    };

    var Virtual = {};
    var convertArg = function (a) {
        switch (typeof(a)) {
            case 'string':
                return {
                    a: a,
                    eval: funcs.field
                };
            case 'number':
                return {
                    a: a,
                    eval: funcs.num
                };
            default:
                return a;
        }
    };
    Object.keys(funcs).forEach(function (key) {
        Virtual[key] = function (a, b) {
            a = convertArg(a);
            b = convertArg(b);

            return {
                a: a,
                b: b,
                func: key,
                eval: funcs[key]
            }
        };
    });

    return Virtual;
})();
var V = Virtual;

var createVirtualField = function (field, op) {
    return {
        field: field,
        op: op
    };
};

var createVirtualModel = function (model, fields, virtual, hasMany, hasOne) {
    var _dependics = {};

    // ctor
    var VirtualModel = function (data, parent) {
        this._data = data;
        this._cache = {};
        this.parent = parent;

        if (hasMany) {
            this._children = {};

            hasMany.forEach(function (hasMany) {
                if (data[hasMany.model]) {
                    data[hasMany.model].forEach(function (data) {
                        this.append(hasMany.model, data);
                    }, this);
                }
            }, this);
        }

        if (hasOne) {
            hasOne.forEach(function (hasOne) {
                var o = new hasOne(hash.get(data, hasOne.model), this);
                Object.defineProperty(this, hasOne.model, {
                    enumerable: true,
                    get: function () {
                        return o;
                    }
                });
            }, this);
        }
    };

    VirtualModel.model = model;
    VirtualModel._dependics = _dependics;

    VirtualModel.prototype.flush = function (path) {
        console.log('flush:', model, path);
        if (this.parent && path.match(/^parent\./)) {
            // child -> parent
            this.parent.flush(path.substr(7));
        } else if (path.match(/\.\*\./)) {
            // parent -> child[n]
            var s = path.split('.*.');
            (hash.get(this, s[0]) || []).forEach(function (a) {
                a.flush(s[1]);
            });
        } else if (path.match(/\./)) {
            // parent -> child
            var s = path.split('.');
            if (this[s[0]]) {
                this[s[0]].flush(s[1]);
            }
        } else {
            delete this._cache[path];
            if (VirtualModel._dependics[path]) {
                VirtualModel._dependics[path].forEach(function (path) {
                    this.flush(path);
                }, this);
            }
        }
    };

    fields.forEach(function (field) {
        Object.defineProperty(VirtualModel.prototype, field, {
            enumerable: true,
            get: function () {
                return this._data[field];
            },
            set: function (value) {
                if (VirtualModel._dependics[field]) {
                    VirtualModel._dependics[field].forEach(function (key) {
                        this.flush(key);
                    }, this);
                }
                this._data[field] = value;
            }
        });
    });

    VirtualModel.depend = function (src, dst) {
        if (!(src in _dependics)) {
            _dependics[src] = [];
        }
        _dependics[src].push(dst);
    };

    if (virtual) {
        virtual.forEach(function (virtual) {
            var trace = function (op) {
                if (!op) {
                    return [];
                } else if (typeof(op) == 'string') {
                    return [op];
                } else {
                    return trace(op.a).concat(trace(op.b));
                }
            };

            trace(virtual.op).forEach(function (src) {
                VirtualModel.depend(src, virtual.field);
            });

            Object.defineProperty(VirtualModel.prototype, virtual.field, {
                enumerable: true,
                get: function () {
                    if (virtual.field in this._cache) {
                        return this._cache[virtual.field];
                    } else {
                        return (this._cache[virtual.field] = virtual.op.eval(this));
                    }
                }
            });
        });
    }

    if (hasMany) {
        VirtualModel.hasMany = {};

        VirtualModel.prototype.append = function (key, data) {
            if (!(key in this._children)) {
                this._children[key] = [];
            }
            var hasMany = VirtualModel.hasMany[key];
            this._children[key].push(new hasMany(data, this));
        };

        hasMany.forEach(function (hasMany) {
            VirtualModel.hasMany[hasMany.model] = hasMany;

            Object.defineProperty(VirtualModel.prototype, hasMany.model, {
                enumerable: true,
                get: function () {
                    return this._children[hasMany.model] || [];
                }
            });

            Object.keys(VirtualModel._dependics).map(function (key) {
                var s = key.split('.*.');
                return {
                    child: s[0],
                    src: s[1],
                    dst: VirtualModel._dependics[key]
                };
            }).filter(function (key) {
                return key.child == hasMany.model;
            }).forEach(function (key) {
                hasMany.depend(key.src, 'parent.' + key.dst);
            }, this);

            Object.keys(hasMany._dependics).filter(function (key) {
                return key.match(/^parent\./);
            }).forEach(function (key) {
                VirtualModel.depend(key.substr(7), [hasMany.model,'*', hasMany._dependics[key]].join('.'));
            }, this);
        });
    }

    if (hasOne) {
        VirtualModel.hasOne = {};

        hasOne.forEach(function (hasOne) {
            VirtualModel.hasOne[hasOne.model] = hasOne;

            Object.keys(VirtualModel._dependics).map(function (key) {
                var s = key.split('.');
                return {
                    child: s[0],
                    src: s[1],
                    dst: VirtualModel._dependics[key]
                };
            }).filter(function (key) {
                return key.child == hasOne.model;
            }).forEach(function (key) {
                hasOne.depend(key.src, 'parent.' + key.dst);
            }, this);

            Object.keys(hasOne._dependics).filter(function (key) {
                return key.match(/^parent\./);
            }).forEach(function (key) {
                VirtualModel.depend(key.substr(7), [hasOne.model, hasOne._dependics[key]].join('.'));
            }, this);
        });
    }


    return VirtualModel;
};

//Character.fields = [
//    'id',
//    'name',
//    'user_id',
//    'race',
//    'sex',
//    'age',
//    'fumbles',
//    'expreience',
//    'nationality',
//    'evasion_skill',
//    'notes',
//    'inventory',
//    'honor',
//    'instrument',
//    'pet'
//];
//
//Character.hasOne = {
//    ability: createSubModule(
//                     'ability',
//                     ['base3', 'base', 'growth'],
//                     {
//                         correct: function (_this) {
//                             return [0, 0, 0, 0, 0, 0];
//                         },
//                         sum: function (_this) {
//                             return _this.base.map(function (base, i) {
//                                 return (+_this.base3[Math.floor(i / 2)])
//                                     + (+base)
//                                     + (+_this.growth[i])
//                                     + (+_this.correct[i]);
//                             });
//                         },
//                         bonus: function (_this) {
//                             return _this.sum.map(function (sum) {
//                                 return Math.floor(sum / 6);
//                             });
//                         }
//                     })
//};
//Character.hasMany = {
//    skills: createSubModule('skills', ['name', 'level'], {
//        magic_power: function (_this) {
//            return skill.isMagicSkill(_this.name)
//                ? (+_this.level) + _this.parent.ability.bonus[4] + (+_this.parent.magic_power || 0)
//                : undefined;
//        }
//    }),
//    weapons: createSubModule('weapons', ['name']),
//    supplies: createSubModule('supplies', ['name', 'count']),
//        //'ornaments',
//        //'money',
//    combat_feats: createSubModule('combat_feats', ['name', 'auto', 'effect']),
//    languages: createSubModule('languages', ['name', 'talk', 'write']),
//    honorable_items: createSubModule('honorable_items', ['name', 'value']),
//    techniques: createSubModule('techniques', ['name', 'effect']),
//    songs: createSubModule('songs', ['name', 'effect']),
//    riding_skills: createSubModule('riding_skills', ['name', 'effect']),
//    alchemist_skills: createSubModule('alchemist_skills', ['name', 'effect']),
//    warleader_skills: createSubModule('warleader_skills', ['name', 'effect']),
//    mistic_skill: createSubModule('mistic_skill', ['name', 'effect'])
//};
//Character.dependics = {
//    level: max('skills.*.level'),
//    total_honor: add(sum('honorable_items.*.value'), 'honor')
//};

var Character = createVirtualModel('Character',
        [
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
        ],
        [
            createVirtualField('level', V.max('skills.*.level')),
            createVirtualField('total_honor', V.add(V.sum('honorable_items.*.value'), 'honor'))
        ],
        [
            createVirtualModel('skills', ['name', 'level'],
                    [
                        createVirtualField('magic_power', V.add('level', 'parent.ability.bonus.4'))
                    ]),
            createVirtualModel('weapons', ['name']),
            createVirtualModel('supplies', ['name', 'count']),
            createVirtualModel('combat_feats', ['name', 'talk', 'write']),
            createVirtualModel('honorable_items', ['name', 'value']),
            createVirtualModel('techniques', ['name', 'effect']),
            createVirtualModel('songs', ['name', 'intoro', 'effect']),
            createVirtualModel('riding_skills', ['name', 'effect']),
            createVirtualModel('alchemist_skills', ['name', 'effect']),
            createVirtualModel('warleader_skills', ['name', 'effect']),
            createVirtualModel('mistic_skills', ['name', 'effect'])
        ],
        [
            createVirtualModel('ability', ['base3', 'base', 'growth'], [
                    createVirtualField('correct', V.num([0, 0, 0, 0, 0, 0])),
                    createVirtualField('sum', V.adda(V.adda(V.stretch('base3', 2), 'base'), 'growth')),
                    createVirtualField('bonus', V.map(V.map(V.adda(V.adda(V.stretch('base3', 2), 'base'), 'growth'), V.div(6)), V.floor())),
                    //createVirtualField('bonus', V.map(V.map('sum', V.div(6)), V.floor()))
                ])
        ]);

module.exports = Character;

//var c = new Character(require('../../sw2chara.json'));
//console.log(c.honor);
//console.log(c.total_honor);
//
//c.honor = 1000;
//
//console.log(c.honor);
//console.log(c.total_honor);
