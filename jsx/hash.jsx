'use strict';

var path = function (path) {
    if (typeof(path) == 'string') {
        return path.replace(/\[[0-9n]+\]\.?/g, function (match) {
            var l = match.length;
            return '.' + (match[l - 1] == '.'
                    ? (match.substr(1, l - 3) + '.')
                    : (match.substr(1, l - 2)));

        }).split('.');
    } else {
        console.error('Invalid path:', path);
        throw new Error('Invalid path "' + path + '"');
    }
};

var get = function (o, key) {
    if (key.length == 0 || o == null) {
        return o;
    }

    return get(o[key[0]], key.slice(1));
};

var extract = function (o, key) {
    if (key.length == 0 || o == null) {
        return o;
    }

    if (key[0] == '*' || key[0] == 'n') {
        var results = [];
        var nkey = key.slice(1);
        if (Array.isArray(o)) {
            results = o.map(function (o) {
                return extract(o, nkey);
            });
        } else {
            for (var _key in o) {
                results.push(extract(o[_key], nkey));
            }
        }
        return results;
    } else {
        return extract(o[key[0]], key.slice(1));
    }
};

var set = function (o, key, value) {
    if (key.length <= 1) {
        o[key[0]] = value;
    } else {
        set(o[key[0]], key.slice(1), value);
    }

    return o;
};

var remove = function (o, key, value) {
    if (key.length <= 1) {
        if (Array.isArray(o)) {
            for (var i = (+key[0]); i < o.length; ++i) {
                o[i] = o[i+1];
            }
            o.length = o.length-1;
        } else {
            delete o[key[0]];
        }
    } else {
        remove(o[key[0]], key.slice(1), value);
    }

    return o;
};

var merge = function (a, b) {
    var c = {};

    Object.keys(a).forEach(function (key) {
        c[key] = a[key];
    });

    Object.keys(b).forEach(function (key) {
        if (c[key] && typeof(c[key]) == 'object') {
            c[key] = merge(c[key], b[key]);
        } else {
            c[key] = b[key];
        }
    });

    return c;
};

var hash = {
    get: function (o, key) {
        return get(o, path(key));
    },
    extract: function (o, key) {
        return extract(o, path(key));
    },
    set: function (o, key, value) {
        return set(o, path(key), value);
    },
    remove: function (o, key) {
        return remove(o, path(key));
    },
    merge: function (a, b) {
        return merge(a, b);
    }
};

module.exports = hash;
