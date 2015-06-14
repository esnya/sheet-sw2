'use strict';

var React = require('react');

var Card = require('../../card');
var Field = require('../../field');
var skill = require('../../../sw2/skill');

var ProtectionEvasion = React.createClass({
    render: function () {
        var data = this.props.data;
        var readOnly = this.props.readOnly;
        var onChange = this.props.onChange;

        var rowStyle = {
            display: 'flex',
        };

        var evasion_skill = (data.skills || []).map(function (skill) {
            return skill.name;
        }).filter(skill.isEvasionSkill)
        .map(function (name) {
            return {
                text: name,
                payload: name
            };
        });

        return (
                <div>
                    <div style={rowStyle}>
                        <Card className="armor">
                            <div style={rowStyle}>
                                <Field path="armor.name" label="鎧" data={data} readOnly={readOnly} onChange={onChange} />
                            </div>
                            <div style={rowStyle}>
                                <Field path="armor.str_req" label="必筋" type="number"
                                    data={data} readOnly={readOnly} onChange={onChange} />
                            </div>
                            <div style={rowStyle}>
                                <Field path="armor.protection" label="防護点" type="number"
                                    data={data} readOnly={readOnly} onChange={onChange} />
                            </div>
                            <div style={rowStyle}>
                                <Field path="armor.evasion" label="回避" type="number"
                                    data={data} readOnly={readOnly} onChange={onChange} />
                            </div>
                            <div style={rowStyle}>
                                <Field path="armor.memo" label="メモ"
                                    multiline={true} data={data} readOnly={readOnly} onChange={onChange} />
                            </div>
                        </Card>
                        <Card className="shield">
                            <div style={rowStyle}>
                                <Field path="shield.name" label="盾" data={data} readOnly={readOnly} onChange={onChange} />
                            </div>
                            <div style={rowStyle}>
                                <Field path="shield.str_req" label="必筋" type="number"
                                    data={data} readOnly={readOnly} onChange={onChange} />
                            </div>
                            <div style={rowStyle}>
                                <Field path="shield.protection" label="防護点" type="number"
                                    data={data} readOnly={readOnly} onChange={onChange} />
                            </div>
                            <div style={rowStyle}>
                                <Field path="shield.evasion" label="回避" type="number"
                                    data={data} readOnly={readOnly} onChange={onChange} />
                            </div>
                            <div style={rowStyle}>
                                <Field path="shield.memo" label="メモ"
                                    multiline={true} data={data} readOnly={readOnly} onChange={onChange} />
                            </div>
                        </Card>
                    </div>
                    <Card key="2" className="evasion">
                        <div style={rowStyle}>
                            <Field path="evasion_skill" label="回避技能" type="select"
                                options={evasion_skill} data={data} readOnly={readOnly} onChange={onChange} />
                        </div>
                        <div style={rowStyle}>
                            <Field path="protection" label="防護点" type="number"
                                multiline={true} data={data} readOnly={true} />
                            <Field path="evasion" label="回避力" type="number"
                                multiline={true} data={data} readOnly={true} />
                        </div>
                    </Card>
                </div>
                );
    }
});

module.exports = ProtectionEvasion;
