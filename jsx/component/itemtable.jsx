'use strict';

var React = require('react');
var mui = require('material-ui');
var hash = require('../hash');
var Field = require('./field.jsx');
var TextField = mui.TextField;
var Checkbox = mui.Checkbox;
var FlatButton = mui.FlatButton;

var ItemTable = React.createClass({
    handleChange: function (index, path, value) {
        if (!this.props.readOnly && this.props.onChange) {
            this.props.onChange(index, path, value);
        }
    },
    handleAppend: function () {
        if (!this.props.readOnly && this.props.onAppend) {
            this.props.onAppend();
        }
    },
    handleRemove: function (index) {
        if (!this.props.readOnly && this.props.onRemove) {
            this.props.onRemove(index);
        }
    },
    render: function () {
        var data = this.props.data;
        var columns = this.props.columns || this.props.cols;
        var readOnly = this.props.readOnly;

        var head = columns.map(function (column, index) {
            return (<th key={index}>{column.label}</th>);
        });
        if (!readOnly) {
            head.push(<th key="button"><FlatButton onClick={this.handleAppend}>＋</FlatButton></th>);
        }

        var body = (data || []).map(function (data, index) {
            return (<Row
                        key={index}
                        index={index}
                        data={data}
                        columns={columns}
                        readOnly={readOnly}
                        onChange={this.handleChange}
                        onRemove={this.handleRemove} />);
        }, this);

        return (
                <table>
                    <thead>
                        <tr>{head}</tr>
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                    <tfoot>
                        {this.props.children}
                    </tfoot>
                </table>
               );
    }
});

var Row = React.createClass({
    handleChange: function (path, value) {
        if (!this.props.readOnly && this.props.onChange) {
            this.props.onChange(this.props.index, path, value);
        }
    },
    handleRemove: function () {
        if (!this.props.readOnly && this.props.onRemove) {
            this.props.onRemove(this.props.index);
        }
    },
    render: function () {
        //var index = this.props.index;
        var data = this.props.data;
        var columns = this.props.columns || this.props.cols;
        var readOnly = this.props.readOnly;
        var onChange = this.props.onChange;
        var onRemove = this.props.onRemove;

        var cols = columns.map(function (column, index) {
            return (<Column
                        key={index}
                        data={data}
                        path={column.path}
                        type={column.type}
                        options={column.options}
                        readOnly={readOnly || column.readOnly}
                        disabled={column.disabled}
                        multiline={column.multiline}
                        onChange={this.handleChange}/>);
        }, this);

        if (!readOnly && onRemove) {
            cols.push(<td key="button"><FlatButton onClick={this.handleRemove}>×</FlatButton></td>);
        }

        return (<tr>{cols}</tr>)
    }
});

var Column = React.createClass({
    render: function () {
        //var index = this.props.index;
        var data = this.props.data;
        var path = this.props.path;
        var type = this.props.type;
        var options = this.props.options;
        var readOnly = this.props.readOnly;
        var disabled = this.props.disabled;
        var multiline = this.props.multiline;
        var onChange = this.props.onChange;

        var style = hash.merge({
            width: 'auto',
            flex: 'none'
        }, this.props.style || {});

        return (<td><Field data={data} path={path} type={type} options={options} onChange={onChange} /></td>);
    }
});

module.exports = ItemTable;
