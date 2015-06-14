'use strict';

var React = require('react');
var MUI = require('material-ui');
var TextField = MUI.TextField;
var Checkbox = MUI.Checkbox;
var FlatButton = MUI.FlatButton;
var hash = require('../../../hash');
var Skill = require('./skill');
var ItemTable = require('../../itemtable');
var Card = require('../../card');

var Row = require('../../row');
var Field = require('../../field');
var Table = require('./table');

var Ability = require('./ability');
var Base = require('./base');
var Weapon = require('./weapon');
var ProtectionEvasion = require('./protection_evasion');
var Item = require('./item');
var Ornament = require('./ornament');
var Honor = require('./honor');
var Technique = require('./technique');

var Character = React.createClass({
    render: function () {
        var data = this.props.data;
        var readOnly = this.props.readOnly;
        var onChange = this.props.onChange;
        var onAppend = this.props.onAppend;
        var onRemove = this.props.onRemove;

        return (
            <div className="sw2-character">
                <Card className="icon-image">
                    Icon/Image
                </Card>
                <Row minWidth="992">
                    <Ability data={data} readOnly={readOnly} onChange={onChange} />
                    <Base data={data} readOnly={readOnly} onChange={onChange} />
                </Row>
                <Skill data={data} readOnly={readOnly} onChange={onChange} onRemove={onRemove} />
                <Weapon data={data} onChange={onChange} onAppend={onAppend} onRemove={onRemove} />
                <ProtectionEvasion data={data} readOnly={readOnly} onChange={onChange} />
                <Card className="note">
                    <Row minWidth="992">
                        <Field path="notes" label="経歴、その他" multiline={true} data={data} readOnly={readOnly} onChange={onChange} />
                    </Row>
                </Card>
                <Card className="money">
                    <Row minWidth="992">
                        <Field path="money.on_hand" label="所持金" type="number" data={data} readOnly={readOnly} onChange={onChange} />
                        <Field path="money.deposit" label="貯金" type="number" data={data} readOnly={readOnly} onChange={onChange} />
                        <Field path="money.debt" label="借金" type="number" data={data} readOnly={readOnly} onChange={onChange} />
                    </Row>
                </Card>
                <Item data={data} readOnly={readOnly} onChange={onChange} onAppend={onAppend} onRemove={onRemove} />
                <Row minWidth="992">
                    <Ornament data={data} readOnly={readOnly} onChange={onChange} />
                    <Honor data={data} readOnly={readOnly} onChange={onChange} onAppend={onAppend} onRemove={onRemove} />
                </Row>
                <Row minWidth="992">
                    <Card className="combat-feat">
                        <Table path="combat_feats" data={data} columns={[
                                {path: 'name', label: '戦闘特技'},
                                {path: 'auto', label: '自動', type: 'checkbox'},
                                {path: 'effect', label: '効果'}
                            ]} onChange={onChange} onAppend={onAppend} onRemove={onRemove}/>
                    </Card>
                    <Card className="language">
                        <Table path="languages" data={data} columns={[
                                {path: 'name', label: '戦闘特技'},
                                {path: 'talk', label: '会話', type: 'checkbox'},
                                {path: 'write', label: '読文', type: 'checkbox'}
                            ]} onChange={onChange} onAppend={onAppend} onRemove={onRemove}/>
                    </Card>
                </Row>
                <Technique data={data} readOnly={readOnly} onChange={onChange} onAppend={onAppend} onRemove={onRemove} />
            </div>
        );
    }
});

module.exports = Character;
