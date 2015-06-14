'use strict';

var React = require('react');
var hash = require('../../../hash');
var ItemTable = require('../../itemtable');

var Table = React.createClass({
    handleChange: function (index, path, value) {
        var onChange = this.props.onChange;
        if (!this.props.readOnly && onChange) {
            onChange([this.props.path, index, path].join('.'), value);
        }
    },
    handleAppend: function () {
        var onAppend = this.props.onAppend;
        console.log(onAppend);
        if (!this.props.readOnly && onAppend) {
            console.log(this.props.path);
            onAppend(this.props.path);
        }
    },
    handleRemove: function (index) {
        var onRemove = this.props.onRemove;
        if (!this.props.readOnly && onRemove) {
            onRemove(this.props.path, index);
        }
    },
    render: function () {
        var path = this.props.path;
        var data = hash.extract(this.props.data, path);
        var columns = this.props.columns || this.props.cols;
        var children = this.props.children;

        return (
                <ItemTable columns={columns} data={data}
                    onChange={this.handleChange} onAppend={this.handleAppend} onRemove={this.handleRemove}>
                    {children}
                </ItemTable>
               );
    }
});

module.exports = Table;
