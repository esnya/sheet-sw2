'use strict';

var InputContainer = require('../InputContainer');
var InputTable = require('../InputTable');

module.exports = React.createClass({displayName: "exports",
    render: function () {
        var inputContainer = function (key, label, options) {
            options = options || {};

            var onChange = function (value) {
                this.props.onChange(key, value);
            }.bind(this); 

            return (
                React.createElement(InputContainer, {label: label, type: options.type, value: this.props.data[key], className: options.className, readOnly: options.readOnly, onChange: onChange})
            );
        }.bind(this);

        var inputTable = function (key, subkeys, options) {
            options = options || {};

            var onChange = function (index, subkey, value) {
                this.props.onChange([key, index, subkey].join('.'), value);
            }.bind(this);

            return (
                React.createElement(InputTable, {keys: subkeys, data: this.props.data[key], onChange: onChange, footer: options.footer})
            );
        }.bind(this);

        var appender = {
            'エンハンサー': function () {
                return (
                    React.createElement("div", {className: "panel subskill"}, inputTable('techniques', [
                        {key: 'name', label: '練技'},
                        {key: 'effect', label: '効果'}
                    ]))
                );
            },
            'バード': function () {
                return (
                    React.createElement("div", {className: "panel subskill"}, 
                        inputTable('songs', [
                            {key: 'name', label: '呪歌'},
                            {key: 'introduction', label: '前奏'},
                            {key: 'effect', label: '効果'}
                        ]), 
                        React.createElement("div", null, 
                            inputContainer('instrument', '楽器'), 
                            inputContainer('pet', 'ペット')
                        )
                    )
                );
            },
            'ライダー': function () {
                return (
                    React.createElement("div", {className: "panel subskill"}, inputTable('riding_skills', [
                        {key: 'name', label: '騎芸'},
                        {key: 'effect', label: '効果'}
                    ]))
                );
            },
            'アルケミスト': function () {
                return (
                    React.createElement("div", {className: "panel subskill"}, inputTable('alchemist_skills', [
                        {key: 'name', label: '賦術'},
                        {key: 'card', label: 'カード'},
                        {key: 'effect', label: '効果'}
                    ]))
                );
            },
            'ウォーリーダー': function () {
                return (
                    React.createElement("div", {className: "panel subskill"}, inputTable('warleader_skills', [
                        {key: 'name', label: '鼓咆'},
                        {key: 'effect', label: '効果'}
                    ]))
                );
            },
            'ミスティック': function () {
                return (
                    React.createElement("div", {className: "panel subskill"}, inputTable('mistic_skills', [
                        {key: 'name', label: '占瞳'},
                        {key: 'item', label: '占具'},
                        {key: 'effect', label: '効果'}
                    ]))
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
            React.createElement("div", {className: "sw2-character"}, 
                React.createElement("div", {className: "panel icon-image"}, 
                    "Icon/Image"
                ), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "panel basic"}, 
                        React.createElement("div", {className: "flex column"}, 
                            inputContainer('name', '名前', {className: 'fill'}), 
                            inputContainer('race', '種族', {className: 'fill'}), 
                            inputContainer('sex', '性別', {className: 'fill'}), 
                            inputContainer('age', '年齢', {className: 'fill'})
                        ), 
                        React.createElement("div", {className: "flex column"}, 
                            inputContainer('fumbles', '1ゾロ', {type: 'number', className: 'fill'}), 
                            inputContainer('experience', '経験点', {type: 'number', className: 'fill'}), 
                            inputContainer('used_experience', '使用経験点', {readOnly: true, className: 'fill'}), 
                            inputContainer('nationality', '生まれ', {className: 'fill'}), 
                            inputContainer('growth_count', '成長回数', {readOnly: true, className: 'fill'})
                        )
                    ), 
                    React.createElement("div", {className: "panel attribute"}, 
                        "Abilities"
                    )
                ), 
                React.createElement("div", {className: "panel skill"}, 
                    inputTable('skills', [
                        {key: 'name', label: '技能'},
                        {key: 'level', label: 'レベル', type: 'number'},
                        {key: 'magic_power', label: '魔力', readOnly: true},
                        {key: 'next', label: '次', readOnly: true},
                        {key: 'total', label: '累計', readOnly: true}
                    ])
                ), 
                React.createElement("div", {className: "panel weapon"}, 
                    "Weapons"
                ), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "panel armor"}, 
                        inputContainer('armor.name', '鎧'), 
                        inputContainer('armor.str_req', '必筋'), 
                        inputContainer('armor.protection', '防護点'), 
                        inputContainer('armor.evasion', '回避'), 
                        inputContainer('armor.memo', 'メモ')
                    ), 
                    React.createElement("div", {className: "panel shiled"}, 
                        inputContainer('shield.name', '盾'), 
                        inputContainer('shield.str_req', '必筋'), 
                        inputContainer('shield.protection', '防護点'), 
                        inputContainer('shield.evasion', '回避'), 
                        inputContainer('shield.memo', 'メモ')
                    )
                ), 
                React.createElement("div", {className: "panel evasion"}, 
                    inputContainer('evasion_skill', '回避技能')
                ), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "panel note"}, 
                        inputContainer('notes', '経歴、その他')
                    ), 
                    React.createElement("div", {className: "panel money"}, 
                        inputContainer('money.on_hands', '所持金', {type: 'number'}), 
                        inputContainer('money.deposit', '貯金', {type: 'number'}), 
                        inputContainer('money.debt', '借金', {type: 'number'})
                    )
                ), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "panel inventory"}, 
                        inputContainer('inventory', '所持品')
                    ), 
                    React.createElement("div", {className: "panel supply"}, 
                        inputTable('supplies', [
                            {key: 'name', label: '消耗品'},
                            {key: 'count', label: '数', type: 'number'}
                        ])
                    )
                ), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "panel ornament"}, 
                        React.createElement("table", null, 
                            React.createElement("thead", null, 
                                React.createElement("tr", null, 
                                    React.createElement("th", null), 
                                    React.createElement("th", null, "装飾品"), 
                                    React.createElement("th", null, "効果")
                                )
                            ), 
                            React.createElement("tbody", null, 
                                [
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
                                        React.createElement("tr", null, 
                                            React.createElement("td", null, area.label), 
                                            React.createElement("td", null, inputContainer('ornaments.' + area.key + '.name')), 
                                            React.createElement("td", null, inputContainer('ornaments.' + area.key + '.effect'))
                                        )
                                    );
                                })
                            )
                        )
                    ), 
                    React.createElement("div", {className: "panel honorable-item"}, 
                        inputTable('honorable_items', [
                            {key: 'name', label: '名誉アイテム'},
                            {key: 'value', label: '名誉点', type: 'number'}
                        ], {
                            footer: [(
                                React.createElement("tr", null, 
                                    React.createElement("th", null, "所持名誉点"), 
                                    React.createElement("td", null, inputContainer('honor', null, {type: 'number'}))
                                )
                            ), (
                                React.createElement("tr", null, 
                                    React.createElement("th", null, "合計名誉点"), 
                                    React.createElement("td", null, inputContainer('total_honor', null, {readOnly: true}))
                                )
                            )]
                        })
                    )
                ), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "panel combat-feat"}, 
                        inputTable('combat_feats', [
                            {key: 'name', label: '戦闘特技'},
                            {key: 'auto', label: '自動', type: 'checkbox'},
                            {key: 'effect', label: '効果'}
                        ])
                    ), 
                    React.createElement("div", {className: "panel language"}, 
                        inputTable('languages', [
                            {key: 'name', label: '言語'},
                            {key: 'talk', label: '会話', type: 'checkbox'},
                            {key: 'write', label: '読文', type: 'checkbox'}
                        ])
                    )
                ), 
                appendix
            )
        );
    }
});

//# sourceMappingURL=../sw2/Character.js.map