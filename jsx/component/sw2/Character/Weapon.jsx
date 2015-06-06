'use strict';
var hash = require('../../hash');
var React = require('react');
var MUI = require('material-ui');
var TextField = MUI.TextField;
var Checkbox = MUI.Checkbox;
var Tabs = MUI.Tabs;
var Tab = MUI.Tab;
var Paper = MUI.Paper;
var FlatButton = MUI.FlatButton;

var WeaponTab = React.createClass({
    handleRemove: function () {
        this.props.onRemove(this.props.index);
    },
    render: function () {
        var _onChange = this.props.onChange;
        var index = this.props.index;

        var inputContainer = function (key, label, options) {
            options = options || {};

            if (options.type == 'checkbox') {
                var onCheck = function (event, checked) {
                    _onChange(['weapons', index, key].join('.'), checked);
                }; 

                return (
                        <Checkbox
                            floatingLabelText={label}
                            value={hash.get(this.props.data, key)} 
                            readOnly={options.readOnly}
                            disabled={options.disabled}
                            onCheck={onCheck} />
                       );
            } else {
                var onChange = function (event) {
                    _onChange(['weapons', index, key].join('.'), event.target.value);
                }; 

                return (
                        <TextField
                            floatingLabelText={label}
                            value={hash.get(this.props.data, key)} 
                            readOnly={options.readOnly}
                            disabled={options.disabled}
                            onChange={onChange} />
                       );
            }
        }.bind(this);

        return (
                <div>
                    <div className="row">
                        {inputContainer('name', '武器')}
                        <FlatButton onClick={this.handleRemove}>×</FlatButton>
                    </div>

                    <div className="row">
                        {inputContainer('to_use', '用法')}
                        {inputContainer('str_req', '必筋', {type: 'number'})}
                    </div>
                    <div className="row">
                        {inputContainer('accuracy_correction', '命中補正', {type: 'number'})}
                        {inputContainer('accuracy', '命中', {type: 'number', readOnly: true})}
                    </div>
                    <div className="row">
                        {inputContainer('damage_correction', 'ダメージ補正', {type: 'number'})}
                        {inputContainer('extra_damage', '追加ダメージ', {type: 'number', readOnly: true})}
                    </div>
                    <div className="row">
                        {inputContainer('impact', '威力', {type: 'number'})}
                        {inputContainer('critical', 'C値', {type: 'number'})}
                    </div>
                    <Paper>
                        <table>
                            <thead>
                                <tr>
                                    <th>2</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                    <th>6</th>
                                    <th>7</th>
                                    <th>8</th>
                                    <th>9</th>
                                    <th>10</th>
                                    <th>11</th>
                                    <th>12</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>*</td>
                                    <td>{inputContainer('impacts.0', null, {type: 'number'})}</td>
                                    <td>{inputContainer('impacts.1', null, {type: 'number'})}</td>
                                    <td>{inputContainer('impacts.2', null, {type: 'number'})}</td>
                                    <td>{inputContainer('impacts.3', null, {type: 'number'})}</td>
                                    <td>{inputContainer('impacts.4', null, {type: 'number'})}</td>
                                    <td>{inputContainer('impacts.5', null, {type: 'number'})}</td>
                                    <td>{inputContainer('impacts.6', null, {type: 'number'})}</td>
                                    <td>{inputContainer('impacts.7', null, {type: 'number'})}</td>
                                    <td>{inputContainer('impacts.8', null, {type: 'number'})}</td>
                                    <td>{inputContainer('impacts.9', null, {type: 'number'})}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Paper>
                </div>
               );
    }
});

var Weapon = React.createClass({
    render: function () {
        return (
                <Paper className="weapon">
                    <Tabs>
                        {
                            (this.props.data.weapons || []).map(function (weapon, index) {
                                return (
                                        <Tab label={weapon.name}>
                                            <WeaponTab
                                                index={index}
                                                data={weapon}
                                                onChange={this.props.onChange}
                                                onRemove={this.props.onRemove} />
                                        </Tab>
                                       );
                            }, this)
                        }
                    </Tabs>
                    <FlatButton onClick={this.props.onAppend}>＋</FlatButton>
                </Paper>
            );
    }
});

module.exports = Weapon;
