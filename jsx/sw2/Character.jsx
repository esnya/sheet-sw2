'use strict';

var hash = require('../hash');
var Ability = require('./Ability');
var Skill = require('./Skill');
var InputContainer = require('../InputContainer');
var InputTable = require('../InputTable');

module.exports = React.createClass({
    render: function () {
        var inputContainer = function (key, label, options) {
            options = options || {};

            var onChange = function (value) {
                this.props.onChange(key, value);
            }.bind(this); 

            return (
                <InputContainer label={label} type={options.type} value={hash.get(this.props.data, key)} className={options.className} options={options.options} readOnly={options.readOnly} onChange={onChange}/>
            );
        }.bind(this);

        var inputTable = function (key, subkeys, options) {
            options = options || {};

            var onChange = function (index, subkey, value) {
                this.props.onChange([key, index, subkey].join('.'), value);
            }.bind(this);

            return (
                <InputTable keys={subkeys} data={hash.get(this.props.data, key)} onChange={onChange} footer={options.footer}/>
            );
        }.bind(this);

        var appender = {
            'エンハンサー': function () {
                return (
                    <div className="panel subskill">{inputTable('techniques', [
                        {key: 'name', label: '練技'},
                        {key: 'effect', label: '効果'}
                    ])}</div>
                );
            },
            'バード': function () {
                return (
                    <div className="panel subskill">
                        {inputTable('songs', [
                            {key: 'name', label: '呪歌'},
                            {key: 'introduction', label: '前奏'},
                            {key: 'effect', label: '効果'}
                        ])}
                        <div>
                            {inputContainer('instrument', '楽器')}
                            {inputContainer('pet', 'ペット')}
                        </div>
                    </div>
                );
            },
            'ライダー': function () {
                return (
                    <div className="panel subskill">{inputTable('riding_skills', [
                        {key: 'name', label: '騎芸'},
                        {key: 'effect', label: '効果'}
                    ])}</div>
                );
            },
            'アルケミスト': function () {
                return (
                    <div className="panel subskill">{inputTable('alchemist_skills', [
                        {key: 'name', label: '賦術'},
                        {key: 'card', label: 'カード'},
                        {key: 'effect', label: '効果'}
                    ])}</div>
                );
            },
            'ウォーリーダー': function () {
                return (
                    <div className="panel subskill">{inputTable('warleader_skills', [
                        {key: 'name', label: '鼓咆'},
                        {key: 'effect', label: '効果'}
                    ])}</div>
                );
            },
            'ミスティック': function () {
                return (
                    <div className="panel subskill">{inputTable('mistic_skills', [
                        {key: 'name', label: '占瞳'},
                        {key: 'item', label: '占具'},
                        {key: 'effect', label: '効果'}
                    ])}</div>
                );
            }
        };

        var appendix = (this.props.data.skills || []).map(function (skill) {
            return skill.name;
        }).filter(function (name) {
            return name in appender;
        }).map(function (name) {
            return appender[name]();
        }.bind(this));

        return (
            <div className="sw2-character">
                <div className="panel icon-image">
                    Icon/Image
                </div>
                <div className="row">
                    <div className="panel ability">
                        <Ability data={this.props.data}/>
                    </div>
                    <div className="panel basic">
                        <div className="row">
                            {inputContainer('name', '名前')}
                            {inputContainer('race', '種族')}
                        </div>
                        <div className="row">
                            {inputContainer('sex', '性別')}
                            {inputContainer('age', '年齢')}
                        </div>
                        <div className="row">
                            {inputContainer('experience', '経験点', {type: 'number'})}
                            {inputContainer('total_experience', '使用経験点', {readOnly: true, type: 'number'})}
                        </div>
                        <div className="row">
                            {inputContainer('fumbles', '1ゾロ', {type: 'number'})}
                            {inputContainer('growth_count', '成長回数', {readOnly: true, type: 'number'})}
                        </div>
                        <div className="row">
                            {inputContainer('campaign', 'キャンペーン')}
                            {inputContainer('nationality', '生まれ')}
                        </div>
                        <div className="row">
                            {inputContainer('level', '冒険者レベル')}
                        </div>
                    </div>
                </div>
                <div className="panel skill">
                    {inputTable('skills', [
                        {key: 'name', label: '技能', type: 'select', options: Skill.byCategory('options')},
                        {key: 'level', label: 'レベル', type: 'number'},
                        {key: 'magic_power', label: '魔力', type: 'number', readOnly: true},
                        {key: 'next', label: '次', type: 'number', readOnly: true},
                        {key: 'total', label: '累計', type: 'number', readOnly: true}
                    ])}
                </div>
                <div className="panel weapon">
                    Weapons
                </div>
                <div className="row">
                    <div className="panel armor">
                        {inputContainer('armor.name', '鎧')}
                        {inputContainer('armor.str_req', '必筋', {type: 'number'})}
                        {inputContainer('armor.protection', '防護点', {type: 'number'})}
                        {inputContainer('armor.evasion', '回避', {type: 'number'})}
                        {inputContainer('armor.memo', 'メモ')}
                    </div>
                    <div className="panel shiled">
                        {inputContainer('shield.name', '盾')}
                        {inputContainer('shield.str_req', '必筋', {type: 'number'})}
                        {inputContainer('shield.protection', '防護点', {type: 'number'})}
                        {inputContainer('shield.evasion', '回避', {type: 'number'})}
                        {inputContainer('shield.memo', 'メモ')}
                    </div>
                </div>
                <div className="panel evasion">
                    {
                        inputContainer('evasion_skill', '回避技能', {
                            type: 'select',
                            options: Skill.evasion()
                                .filter(function (name) {
                                    return (this.props.data.skills || []).find(function (skill) {
                                        return skill.name == name;
                                    })
                                }.bind(this))
                        })
                    }
                    <div className="row">
                    {inputContainer('protection', '防護点', {type: 'number', readOnly: true})}
                    {inputContainer('evasion', '回避力', {type: 'number', readOnly: true})}
                    </div>
                </div>
                <div className="row">
                    <div className="panel note">
                        {inputContainer('notes', '経歴、その他')}
                    </div>
                    <div className="panel money">
                        {inputContainer('money.on_hands', '所持金', {type: 'number'})}
                        {inputContainer('money.deposit', '貯金', {type: 'number'})}
                        {inputContainer('money.debt', '借金', {type: 'number'})}
                    </div>
                </div>
                <div className="row">
                    <div className="panel inventory">
                        {inputContainer('inventory', '所持品')}
                    </div>
                    <div className="panel supply">
                        {inputTable('supplies', [
                            {key: 'name', label: '消耗品'},
                            {key: 'count', label: '数', type: 'number'}
                        ])}
                    </div>
                </div>
                <div className="row">
                    <div className="panel ornament">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>装飾品</th>
                                    <th>効果</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {key: 'head', label: '頭'},
                                    {key: 'ears', label: '耳'},
                                    {key: 'neck', label: '首'},
                                    {key: 'face', label: '顔'},
                                    {key: 'back', label: '背中'},
                                    {key: 'right_hand', label: '右手'},
                                    {key: 'left_hand', label: '左手'},
                                    {key: 'waist', label: '腰'},
                                    {key: 'feet', label: '足'},
                                    {key: 'other', label: 'その他'}
                                ].map(function (area) {
                                    return (
                                        <tr>
                                            <td>{area.label}</td>
                                            <td>{inputContainer('ornaments.' + area.key + '.name')}</td>
                                            <td>{inputContainer('ornaments.' + area.key + '.effect')}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="panel honorable-item">
                        {inputTable('honorable_items', [
                            {key: 'name', label: '名誉アイテム'},
                            {key: 'value', label: '名誉点', type: 'number'}
                        ], {
                            footer: [(
                                <tr>
                                    <th>所持名誉点</th>
                                    <td>{inputContainer('honor', null, {type: 'number'})}</td>
                                </tr>
                            ), (
                                <tr>
                                    <th>合計名誉点</th>
                                    <td>{inputContainer('total_honor', null, {readOnly: true})}</td>
                                </tr>
                            )]
                        })}
                    </div>
                </div>
                <div className="row">
                    <div className="panel combat-feat">
                        {inputTable('combat_feats', [
                            {key: 'name', label: '戦闘特技'},
                            {key: 'auto', label: '自動', type: 'checkbox'},
                            {key: 'effect', label: '効果'}
                        ])}
                    </div>
                    <div className="panel language">
                        {inputTable('languages', [
                            {key: 'name', label: '言語'},
                            {key: 'talk', label: '会話', type: 'checkbox'},
                            {key: 'write', label: '読文', type: 'checkbox'}
                        ])}
                    </div>
                </div>
                {appendix}
            </div>
        );
    }
});
