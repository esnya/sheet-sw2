(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';


var _counter = {};

var getId = function (prefix) {
    var n = _counter[prefix] = (_counter[prefix] || 0) + 1;
    return 'input-container-input-' + prefix + '-' + n;
}

module.exports = React.createClass({displayName: "exports",
    render: function () {
        var type = this.props.type || "text";
        var id = getId(type);

        return (
            React.createElement("div", {className: "input-container"}, 
                React.createElement("input", {id: id, type: type, value: this.props.value}), 
                React.createElement("label", {htmlFor: id}, this.props.label)
            )
        );
    }
});


},{}],2:[function(require,module,exports){
'use strict';

var InputContainer = require('../InputContainer');

module.exports = React.createClass({displayName: "exports",
    render: function () {
        var data = this.props.data;

        return (
            React.createElement("div", {className: "sw2-character"}, 
                React.createElement(InputContainer, {label: "名前", value: data.name}), 
                React.createElement(InputContainer, {label: "種族", value: data.race})
            )
        );
    }
});


},{"../InputContainer":1}],3:[function(require,module,exports){
'use strict';

var Character = require('./Character');

module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", {className: "sw2-character-sheet"}, 
                React.createElement("header", null, 
                    React.createElement("h1", null, this.props.data.name)
                ), 
                React.createElement(Character, {data: this.props.data})
            )
        );
    }
});


},{"./Character":2}],4:[function(require,module,exports){
'use strict';

var SW2CharacterSheet = require('./sw2/CharacterSheet');

var character = {
    name: "Mr. Test",
    race: "人間"
};

React.render(
    React.createElement(SW2CharacterSheet, {data: character}),
    document.body
);


},{"./sw2/CharacterSheet":3}]},{},[4])


//# sourceMappingURL=index.js.map