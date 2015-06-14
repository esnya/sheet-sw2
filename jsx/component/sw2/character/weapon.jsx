'use strict';
var hash = require('../../../hash');
var Card = require('../../card.jsx');
var Field = require('../../field');
var Row = require('../../row');
var React = require('react');
var MUI = require('material-ui');
var TextField = MUI.TextField;
var Checkbox = MUI.Checkbox;
var Tabs = MUI.Tabs;
var Tab = MUI.Tab;
var FlatButton = MUI.FlatButton;

var WeaponTab = React.createClass({
    handleRemove: function () {
        var onRemove = this.props.onRemove;
        if (!this.props.readOnly && onRemove) {
            onRemove('weapons', this.props.index);
        }
    },
    handleChange: function (path, value) {
        var onChange = this.props.onChange;
        if (!this.props.readOnly && onChange) {
            onChange('weapons[' + this.props.index + '].' + path, value);
        }
    },
    render: function () {
        var index = this.props.index;
        var data = this.props.data;
        var readOnly = this.props.readOnly;

        return (
                <div style={{padding: '16px'}}>
                    <Row>
                        <Field path="name" label="武器" data={data} readOnly={readOnly} onChange={this.handleChange}/>
                        <FlatButton onClick={this.handleRemove}>×</FlatButton>
                    </Row>
                    <Row>
                        <Field path="to_use" label="用法" data={data} readOnly={readOnly} onChange={this.handleChange}/>
                        <Field path="str_req" label="必筋" type="number" data={data} readOnly={readOnly} onChange={this.handleChange}/>
                    </Row>
                    <Row>
                        <Field path="accuracy_correction" label="命中補正" type="number" data={data} readOnly={readOnly} onChange={this.handleChange}/>
                        <Field path="accuracy" label="命中" type="number" data={data} readOnly={true} onChange={this.handleChange}/>
                    </Row>
                    <Row>
                        <Field path="damage_correction" label="ダメージ補正" type="number" data={data} readOnly={readOnly} onChange={this.handleChange}/>
                        <Field path="extra_damage" label="追加ダメージ" type="number" data={data} readOnly={true} onChange={this.handleChange}/>
                    </Row>
                    <Row>
                        <Field path="impact" label="威力" type="number" data={data} readOnly={readOnly} onChange={this.handleChange}/>
                        <Field path="critical" label="C値" type="number" data={data} readOnly={readOnly} onChange={this.handleChange}/>
                    </Row>
                    <Card style={{margin: '16px 0 0'}}>
                        <table>
                            <thead>
                                <tr key="header">
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
                                <tr key="value">
                                    <td>*</td>
                                    <td>
                                        <Field path="impact_3" type="number"
                                            data={data} readOnly={readOnly} onChange={this.handleChange}/>
                                    </td>
                                    <td>
                                        <Field path="impact_4" type="number"
                                            data={data} readOnly={readOnly} onChange={this.handleChange}/>
                                    </td>
                                    <td>
                                        <Field path="impact_5" type="number"
                                            data={data} readOnly={readOnly} onChange={this.handleChange}/>
                                    </td>
                                    <td>
                                        <Field path="impact_6" type="number"
                                            data={data} readOnly={readOnly} onChange={this.handleChange}/>
                                    </td>
                                    <td>
                                        <Field path="impact_7" type="number"
                                            data={data} readOnly={readOnly} onChange={this.handleChange}/>
                                    </td>
                                    <td>
                                        <Field path="impact_8" type="number"
                                            data={data} readOnly={readOnly} onChange={this.handleChange}/>
                                    </td>
                                    <td>
                                        <Field path="impact_9" type="number"
                                            data={data} readOnly={readOnly} onChange={this.handleChange}/>
                                    </td>
                                    <td>
                                        <Field path="impact_10" type="number"
                                            data={data} readOnly={readOnly} onChange={this.handleChange}/>
                                    </td>
                                    <td>
                                        <Field path="impact_11" type="number"
                                            data={data} readOnly={readOnly} onChange={this.handleChange}/>
                                    </td>
                                    <td>
                                        <Field path="impact_12" type="number"
                                            data={data} readOnly={readOnly} onChange={this.handleChange}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </div>
               );
    }
});

var Weapon = React.createClass({
    handleAppend: function () {
        var onAppend = this.props.onAppend;
        if (!this.props.readOnly && onAppend) {
            onAppend('weapons');
        }
    },
    handleRemove: function () {
        var selectedIndex = this.refs.tabs.state.selectedIndex;
        if (selectedIndex == this.props.data.weapons.length - 1 && selectedIndex > 0) {
            this.refs.tabs.setState({
                selectedIndex: selectedIndex - 1
            });
        }
        this.props.onRemove.apply(this, arguments);
    },
    handleChange: function (index) {
        if (index == this.props.data.weapons.length && index > 0) {
            this.refs.tabs.setState({
                selectedIndex: index - 1
            });
        }
    },
    render: function () {
        return (
                <Card className="weapon" style={{padding: 0}}>
                    <Tabs ref="tabs" onChange={this.handleChange}>
                        {
                            (this.props.data.weapons || []).map(function (weapon, index) {
                                return (
                                        <Tab key={index} label={weapon.name}>
                                            <WeaponTab
                                                index={index}
                                                data={weapon}
                                                onChange={this.props.onChange}
                                                onRemove={this.handleRemove} />
                                        </Tab>
                                       );
                            }, this)
                            .concat([(
                                        <Tab key="append" label="＋" onActive={this.handleAppend}>
                                        <FlatButton label="武器を追加" onClick={this.handleAppend}/>
                                        
                                        </Tab>
                                     )])
                        }
                    </Tabs>
                </Card>
            );
    }
});

module.exports = Weapon;
