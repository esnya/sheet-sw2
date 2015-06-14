'use strict';

var React = require('react');
var mui = require('material-ui');

var Card = React.createClass({
    render: function () {
        var defaults = {
            margin: '16px',
            padding: '16px',
            boxSizing: 'border-box',
            display: 'flex',
            flex: '1 1 0',
            flexDirection: 'column'
        };

        var style = this.props.style || {};

        Object.keys(defaults).forEach(function (key) {
            if (!(key in style)) {
                style[key] = defaults[key];
            }
        });

        var firstChild = this.props.children && this.props.children[0];
        if (firstChild && firstChild.type && firstChild.type.displayName == 'ItemTable') {
            style.padding = 0;
        }

        return (
                <mui.Paper style={style}>{this.props.children}</mui.Paper>
               );
    }
});

module.exports = Card;
