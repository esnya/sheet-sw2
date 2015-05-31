'use strict';

var _get = function (o, key) {
    if (key.length == 0 || o == null) {
        return o;
    }

    return _get(o[key[0]], key.slice(1));
};

var _set = function (o, key, value) {
    if (key.length <= 1) {
        o[key[0]] = value;
    } else {
        _set(o[key[0]], key.slice(1), value);
    }

    return o;
};

var _remove = function (o, key, value) {
    if (key.length <= 1) {
        if (Array.isArray(o)) {
            for (var i = (+key[0]); i < o.length; ++i) {
                o[i] = o[i+1];
            }
            o.length = o.length-1;
        } else {
            delete o[key[0]];
        }
        console.log(o, key[0]);
    } else {
        _remove(o[key[0]], key.slice(1), value);
    }

    return o;
};

var hash = {
    get: function (o, key) {
        return _get(o, key.split('.'));
    },
    set: function (o, key, value) {
        return _set(o, key.split('.'), value);
    },
    remove: function (o, key) {
        return _remove(o, key.split('.'));
    }
};

module.exports = hash;

//# sourceMappingURL=hash.js.map