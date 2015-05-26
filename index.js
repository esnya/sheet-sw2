(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", {class: "sw2-character-sheet"}, 
                "stub"
            )
        );
    }
});


},{}],2:[function(require,module,exports){
'use strict';

var SW2CharacterSheet = require('./sw2/CharacterSheet');

React.render(
    React.createElement(SW2CharacterSheet, null),
    document.body
);


},{"./sw2/CharacterSheet":1}]},{},[2])


//# sourceMappingURL=index.js.map