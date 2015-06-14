'use strict';

var hash = require('./hash');

var node = function (op) {
    return {
        op: op,
        children: Array.prototype.slice.call(arguments, 1)
    };
};

var ops = {};
var _eval = function (node, data) {
    //console.log('eval', node);
    return ops[node.op](node.args, data);
};

// Leaf
ops.value = function (args, data) {
    return args[0];
};
ops.field = function (args, data) {
    if (Array.isArray(hash.extract(data, args[0]))) {
    }
    return hash.extract(data, args[0]);
};

//
ops.cond = function (args, data) {
    return _eval(args[0], data) ? _eval(args[1], data) : _eval(args[2], data);
};
ops.func = function (args, data) {
    return _eval(args[0], data).apply(this, args.slice(1)
            .map(function (arg) {
                return _eval(arg, data);
            }));
};

// Unary
ops.floor = function (args, data) {
    return Math.floor(+_eval(args[0], data));
};

// Binary
ops.add = function (args, data) {
    return (+_eval(args[0], data)) + (+_eval(args[1], data));
};
ops.sub = function (args, data) {
    return (+_eval(args[0], data)) - (+_eval(args[1], data));
};
ops.mul = function (args, data) {
    return (+_eval(args[0], data)) * (+_eval(args[1], data));
};
ops.div = function (args, data) {
    return (+_eval(args[0], data)) / (+_eval(args[1], data));
};

// Reduce
var _reduce = function (args, data, callback) {
    return (_eval(args[0], data) || [])
        .reduce(callback, args[1] ? (+_eval(args[1], data)) : 0);
};
ops.sum = function (args, data) {
    return _reduce(args, data, function (a, b) {
        return (+a) + (+b);
    });
};
ops.max = function (args, data) {
    return _reduce(args, data, function (a, b) {
        return Math.max(+a, +b);
    });
};

// Array
ops.stretch = function (args, data) {
    var src = _eval(args[0], data) || [];
    var dst = [];
    var r = +_eval(args[1], data);

    src.forEach(function (value) {
        for (var i = 0; i < r; ++i) {
            dst.push(value);
        }
    });

    return dst;
};
ops.map0 = function (args, data) {
    var array = _eval(args[0], data) || [];
    var callback = args[1];

    return array.map(function (value) {
        callback.args[0] = Virtual.value(value);
        return _eval(callback, data);
    });
};
ops.map1 = function (args, data) {
    var array = _eval(args[0], data) || [];
    var callback = args[1];

    return array.map(function (value) {
        callback.args[1] = Virtual.value(value);
        return _eval(callback, data);
    });
};
ops.zip = function (args, data) {
    var a = _eval(args[0], data) || [];
    var b = _eval(args[1], data) || [];
    var callback = args[2];


    var result = [];
    var l = Math.min(a.length, b.length);
    for (var i = 0; i < l; ++i) {
        callback.args[0] = Virtual.value(a[i]);
        callback.args[1] = Virtual.value(b[i]);
        result.push(_eval(callback, data));
    }

    return result;
};

var Virtual = {};
var _convert = function (a) {
    var t = typeof(a);
    if (t === 'object' && a != null) {
        return a;
    } else if (t == 'string') {
        return {
            op: 'field',
            args: arguments
        };
    } else {
        return {
            op: 'value',
            args: arguments
        };
    }
};
Object.keys(ops).forEach(function (key) {
    Virtual[key] = function () {
        return {
            op: key,
            args: (key == 'value' || key == 'field')
                ? Array.prototype.slice.call(arguments, 0)
                : Array.prototype.map.call(arguments, function (arg) {
                    return _convert(arg);
                })
        };
    };
});

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

        var _this = this;
        fields.forEach(function (field) {
            Object.defineProperty(_this, field, {
                enumerable: true,
                get: function () {
                    return _this._data[field];
                },
                set: function (value) {
                    _this.flush(field);
                    _this._data[field] = value;
                }
            });
        });

        if (virtual) {
            virtual.forEach(function (virtual) {
                Object.defineProperty(this, virtual.field, {
                    enumerable: true,
                    get: function () {
                        if (!(virtual.field in this._cache)) {
                            this.flush(virtual.field);
                            this._cache[virtual.field] = _eval(virtual.op, this);
                        }
                        return this._cache[virtual.field];
                    }
                });
            }, this);
        }

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
        //console.log('flush:', model, path);
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
            if (path in this._cache) {
                delete this._cache[path];
            }

            if (VirtualModel._dependics[path]) {
                VirtualModel._dependics[path].forEach(function (path) {
                    this.flush(path);
                }, this);
            }
        }
    };

    VirtualModel.depend = function (src, dst) {
        if (!(src in _dependics)) {
            _dependics[src] = [];
        }
        _dependics[src].push(dst);
    };

    if (virtual) {
        virtual.forEach(function (virtual) {
            var trace = function (node) {
                if (node) {
                    if (node.op == 'field') {
                        return [node.args[0]];
                    } else if (node.op != 'value') {
                        return node.args.map(trace).reduce(function (a, b) {
                            return a.concat(b);
                        }, []);
                    }
                }

                return [];
            };

            trace(virtual.op).forEach(function (src) {
                VirtualModel.depend(src, virtual.field);
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
            this._children[key].push(new hasMany(data || {}, this));
        };

        VirtualModel.prototype.remove = function (key, index) {
            var target = this[key][index];
            Object.keys(target).forEach(target.flush, target);
            hash.remove(this._children, key + '[' + index + ']');
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
                key.dst.forEach(function (dst) {
                    hasMany.depend(key.src, 'parent.' + dst);
                });
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

Virtual.createModel = createVirtualModel;
Virtual.createField = createVirtualField;

module.exports = Virtual;

