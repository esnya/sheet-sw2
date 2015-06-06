'use strict';
var hash = require('../../hash');
var Tab = require('../../Tab');
var InputContainer = require('../../InputContainer');

var Page = React.createClass({
    handleRemove: function () {
        this.props.options.onRemove(this.props.index);
    },
    render: function () {
        var inputContainer = function (key, label, options) {
            options = options || {};

            var onChange = function (value) {
                this.props.options.onChange(['weapons', this.props.index, key].join('.'), value);
            }.bind(this); 

            return (
                <InputContainer label={label} type={options.type} value={hash.get(this.props.data, key)} className={options.className} options={options.options} readOnly={options.readOnly} onChange={onChange}/>
            );
        }.bind(this);

        return (
                <div>
                    <div className="row">
                        {inputContainer('name', '武器')}
                        <button onClick={this.handleRemove}>×</button>
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
                    <div className="panel">
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
                    </div>
                </div>
               );
    }
})

module.exports = React.createClass({
    render: function () {
        return (
                <div className="panel weapon">
                    <Tab page={Page} pageOptions={{
                        onChange: this.props.onChange,
                        onRemove: this.props.onRemove
                    }} title="name" data={this.props.data.weapons} actions={['＋']} selected="0" onAction={this.props.onAppend} />
                </div>
            );
    }
});
