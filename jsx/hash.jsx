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

var hash = {
    get: function (o, key) {
        return _get(o, key.split('.'));
    },
    set: function (o, key, value) {
        return _set(o, key.split('.'), value);
    },
};

module.exports = hash;
