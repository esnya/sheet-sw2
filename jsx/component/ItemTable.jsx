'use strict';

var React = require('react');
var MUI = require('material-ui');
var TextField = MUI.TextField;
var Checkbox = MUI.Checkbox;
var FlatButton = MUI.FlatButton;
var ItemTable = require('./ItemTable');

var InputTable = React.createClass({
    render: function () {
        var headline = this.props.keys.map(function (key) {
            return (
                    <th>{key.label}</th>
                   )
        });
        if (!this.props.readOnly) {
            headline.push(<th><FlatButton onClick={this.props.onAppend}>＋</FlatButton></th>);
        }
        return (
                <table>
                    <thead>
                        <tr>{headline}</tr>
                        {this.props.header}
                    </thead>
                    <tbody>
                        {(this.props.data || []).map(
                                function (line, index) {
                                    return (
                                            <ItemTable.Row
                                                line={line}
                                                index={index}
                                                keys={this.props.keys}
                                                onChange={this.props.onChange}
                                                onRemove={this.props.onRemove} />
                                                );
                                }, this)}
                    </tbody>
                    <tfoot>
                        {this.props.footer}
                    </tfoot>
                </table>
               );
    }
});

ItemTable.Column = React.createClass({
    render: function () {
        var key = this.props.def;
        var index = this.props.index;
        var _onChange = this.props.onChange;

        if (key.type == 'checkbox') {
            var onCheck = function (event, checked) {
                _onChange(index, key.key, checked);
            };
            return (
                    <td>
                        <Checkbox
                            hintText={key.label}
                            value={this.props.value}
                            readOnly={key.readOnly}
                            disabled={key.disabled}
                            onCheck={onCheck} />
                    </td>
                   );
        } else {
            var onChange = function (event) {
                _onChange(index, key.key, event.target.value);
            };
            return (
                    <td>
                        <TextField
                            hintText={key.label}
                            value={this.props.value}
                            readOnly={key.readOnly}
                            disabled={key.disabled}
                            onChange={onChange} />
                    </td>
                   );
        }
    }
});

ItemTable.Row = React.createClass({
    render: function () {
        var line = this.props.line;
        var index = this.props.index;

        var cols = this.props.keys.map(function (key) {
            return (<ItemTable.Column def={key} value={line[key.key]} index={index} onChange={this.props.onChange}/>);
        }, this);

        var _onRemove = this.props.onRemove;
        if (!this.props.readOnly && _onRemove) {
            var handler = function () {
                _onRemove(index);
            };
            cols.push(<td><FlatButton onClick={handler}>×</FlatButton></td>);
        }
        return (<tr>{cols}</tr>);
    }
});

module.exports = InputTable;
