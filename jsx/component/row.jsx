'use strict';

var React = require('react');
var hash = require('../hash');

var Row = React.createClass({
    getInitialState: function () {
        return {index: -1, width: window.innerWidth};
    },
    handleResize: function(e) {
        this.setState({width: window.innerWidth});
    },
    componentDidMount: function() {
        if (this.props.minWidth) window.addEventListener('resize', this.handleResize);
    },
    componentWillUnmount: function() {
        if (this.props.minWidth) window.removeEventListener('resize', this.handleResize);
    },
    render: function () {
        var children = this.props.children;
        var minWidth = this.props.minWidth;
        var style = this.props.style;

        var defaultStyle = {
            display: 'flex',
        };

        if (minWidth && this.state.width < minWidth) {
            defaultStyle.flexDirection = 'column';
        }

        style = hash.merge(defaultStyle, style || {});

        return <div style={style}>{children}</div>
    }
});

module.exports = Row;
