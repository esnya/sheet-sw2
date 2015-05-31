(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Dialog = React.createClass({displayName: "Dialog",
    render: function () {
        var actions = (this.props.actions || ['閉じる']).map(function (action) {
            var handler = function () {
                this.props.onAction(action);
            }.bind(this);
            return (React.createElement("button", {onClick: handler}, action));
        }.bind(this));

        var className = 'dialog';
        if (!this.props.visible) {
            className += ' hidden';
        }

        return (
                React.createElement("div", {className: className}, 
                    React.createElement("div", {className: "screen"}), 
                    React.createElement("div", {className: "container"}, 
                        React.createElement("header", null, React.createElement("h1", null, this.props.title)), 
                        this.props.children, 
                        React.createElement("footer", null, actions)
                    )
                )
               );
    }
});

module.exports = Dialog;




},{}],2:[function(require,module,exports){
'use strict';

var _counter = 0;

var getId = function (prefix) {
    return 'input-container-input-' + (++_counter);
};

module.exports = React.createClass({displayName: "exports",
    handleChange: function (event) {
        var target = event.target;
        this.props.onChange(target.type == 'checkbox' ? target.checked : target.value);
    },
    render: function () {
        var type = this.props.type || 'text';
        var id = getId(type);

        if (this.props.readOnly && type != 'text') {
            type = 'text';
        }

        var contents = [];
        if (!this.props.readOnly && type == 'select') {
            var options = this.props.options.map(function (option) {
                return option.options
                    ? (React.createElement("optgroup", {label: option.name}, 
                        option.options.map(function (option) {
                            return (React.createElement("option", {value: option}, option));
                        })
                    ))
                    : (React.createElement("option", {value: option}, option))
            });
            contents.push(
                    React.createElement("select", {id: id, value: this.props.value, readOnly: this.props.readOnly, onChange: this.handleChange}, 
                        options
                    )
                    );
        } else {
            contents.push(
                    React.createElement("input", {id: id, type: type, value: this.props.value, readOnly: this.props.readOnly, onChange: this.handleChange, checked: type == 'checkbox' && this.props.value})
                    );
        }

        if (this.props.label) {
            contents.push(
                React.createElement("label", {htmlFor: id}, this.props.label) 
            );
        }

        var className = 'input-container';

        if (this.props.value == null || this.props.value == '') {
            className += ' empty';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        if (this.props.readOnly && this.props.type == 'number') {
            className += ' right';
        }

        return (
            React.createElement("div", {className: className}, 
                contents
            )
        );
    }
});


},{}],3:[function(require,module,exports){
'use strict';

var InputContainer = require('./InputContainer');

module.exports = React.createClass({displayName: "exports",
    render: function () {
        var headline = this.props.keys.map(function (key) {
            return (
                    React.createElement("th", null, key.label)
                   )
        });
        if (!this.props.readOnly) {
            headline.push(React.createElement("th", null, React.createElement("button", {onClick: this.props.onAppend}, "+")));
        }
        return (
            React.createElement("table", null, 
                React.createElement("thead", null, 
                    React.createElement("tr", null, headline), 
                    this.props.header
                ), 
                React.createElement("tbody", null, 
                    (this.props.data || []).map(
                            function (line, index) {
                                var cols = this.props.keys.map(function (key) {
                                    var onChange = function (value) {
                                        this.props.onChange(index, key.key, value);
                                    }.bind(this);
                                    return (
                                            React.createElement("td", null, React.createElement(InputContainer, {value: line[key.key], type: key.type, options: key.options, readOnly: key.readOnly, onChange: onChange}))
                                           );
                                }.bind(this))

                                if (!this.props.readOnly && this.props.onRemove) {
                                    var handler = function () {
                                        this.props.onRemove(index);
                                    }.bind(this);
                                    cols.push(React.createElement("td", null, React.createElement("button", {onClick: handler}, "×")));
                                }
                        return (React.createElement("tr", null, cols));
                    }.bind(this))
               ), 
               React.createElement("tfoot", null, 
                    this.props.footer
               )
            )
        );
    }
});



},{"./InputContainer":2}],4:[function(require,module,exports){
'use strict';

var _get = function (o, key) {
    if (key.length == 0 || o == null) {
        return o;
    }

    return _get(o[key[0]], key.slice(1));
};

var _set = function (o, key, value) {
    if (key.length <= 1) {
        o[key[0]] = value;
    } else {
        _set(o[key[0]], key.slice(1), value);
    }

    return o;
};

var _remove = function (o, key, value) {
    if (key.length <= 1) {
        if (Array.isArray(o)) {
            for (var i = (+key[0]); i < o.length; ++i) {
                o[i] = o[i+1];
            }
            o.length = o.length-1;
        } else {
            delete o[key[0]];
        }
        console.log(o, key[0]);
    } else {
        _remove(o[key[0]], key.slice(1), value);
    }

    return o;
};

var hash = {
    get: function (o, key) {
        return _get(o, key.split('.'));
    },
    set: function (o, key, value) {
        return _set(o, key.split('.'), value);
    },
    remove: function (o, key) {
        return _remove(o, key.split('.'));
    }
};

module.exports = hash;


},{}],5:[function(require,module,exports){
'use strict';

var Ability = React.createClass({displayName: "Ability",
    render: function () {
        var data = this.props.data;

        var radius = this.props.radius || 120;
        var margin = radius / 5 * 2;
        var size = radius + margin;

        var points = [];
        for (var i = 0; i < 6; ++i) {
            var r1 = Math.PI * 2 / 6 * (i - 0.5);
            points.push([Math.sin(r1), -Math.cos(r1)]);
        }

        var pmul = function (a) {
            return function (p) {
                return p.map(function (b) {
                    return b * a;
                });
            };
        };
        
        var abilities = [];
        var sumlist = {
            base: [],
            ability: [],
            growth: [],
            sum: []
        };
        if (data.abilities) {
            for (var i = 0; i < 6; ++i) {
                var base = +data[['skill', 'body', 'mind'][Math.floor(i / 2)]];

                var ability = +data.abilities[i];
                var growth = +data.growths[i];

                // ToDo corrects
                var correct = 0;
                var sum = base + ability + growth;
                var bonus = Math.floor(sum / 6);

                sumlist.base.push(base);
                sumlist.ability.push(base + ability);
                sumlist.growth.push(base + ability + growth);
                sumlist.sum.push(sum);

                abilities.push([base, ability, growth, correct].join(',') + '\n'  + sum + ' (+' + bonus + ')');
            }
        }

        var rader = function (sum, n) {
            var r = sum / 30 * radius;
            return points[n].map(function (p) {
                return p * r;
            });
        };

        return (
                React.createElement("svg", {className: "rader", width: size * 2, height: size * 2}, 
                    React.createElement("g", {style: {transform: 'translate(' + size + 'px, ' + size + 'px)'}}, 
                        React.createElement("g", {className: "rader"}, 
                            React.createElement("polygon", {points: sumlist.sum.map(rader)}), 
                            React.createElement("polygon", {points: sumlist.growth.map(rader)}), 
                            React.createElement("polygon", {points: sumlist.ability.map(rader)}), 
                            React.createElement("polygon", {points: sumlist.base.map(rader)})
                        ), 
                        React.createElement("g", {className: "grid"}, 
                            points.map(
                                    function (p) {
                                        return (
                                                React.createElement("line", {x1: "0", y1: "0", x2: p[0] * radius, y2: p[1] * radius})
                                               );
                                    }), 
                            
                            React.createElement("polygon", {points: points.map(pmul(radius))}), 
                            React.createElement("polygon", {points: points.map(pmul(radius * 4 / 5))}), 
                            React.createElement("polygon", {points: points.map(pmul(radius * 3 / 5))}), 
                            React.createElement("polygon", {points: points.map(pmul(radius * 2 / 5))}), 
                            React.createElement("polygon", {points: points.map(pmul(radius / 5))})
                        ), 
                        React.createElement("g", {className: "label"}, 
                            points.map(
                                    function (p, n) {
                                        var x = p[0] * (radius + margin / 2);
                                        var y = p[1] * (radius + margin / 2);

                                        var label = ['器用度', '敏捷度', '筋力', '生命力', '知力', '精神力'][n];

                                        if (abilities[n]) {
                                            label += '\n' + abilities[n];
                                        }

                                        var text = label.split('\n').map(
                                                function (line, n) {
                                                    return (React.createElement("text", {x: x, y: y + n * 15 - 7.5}, line));
                                                });

                                        return text;
                                    }.bind(this)), 
                            
                            '技体心'.split('')
                                .map(function (label, n) {
                                    var p1 = points[n * 2];
                                    var p2 = points[n * 2 + 1];
                                    var r = radius + margin / 3 * 2;
                                    var x = (p1[0] + p2[0]) / 2 * r;
                                    var y = (p1[1] + p2[1]) / 2 * r;
                                    return (React.createElement("text", {className: "l", x: x, y: y}, label));
                                })
                            
                        )
                    )
                )
               );
    }
});

module.exports = Ability;


},{}],6:[function(require,module,exports){
'use strict';

var hash = require('../hash');
var Ability = require('./Ability');
var Skill = require('./Skill');
var InputContainer = require('../InputContainer');
var InputTable = require('../InputTable');
var Dialog = require('../Dialog');

module.exports = React.createClass({displayName: "exports",
    getInitialState: function () {
        return {
            dialog: {
                ability: false
            }
        };
    },
    render: function () {
        var inputContainer = function (key, label, options) {
            options = options || {};

            var onChange = function (value) {
                this.props.onChange(key, value);
            }.bind(this); 

            return (
                React.createElement(InputContainer, {label: label, type: options.type, value: hash.get(this.props.data, key), className: options.className, options: options.options, readOnly: options.readOnly, onChange: onChange})
            );
        }.bind(this);

        var inputTable = function (key, subkeys, options) {
            options = options || {};

            var onChange = function (index, subkey, value) {
                this.props.onChange([key, index, subkey].join('.'), value);
            }.bind(this);

            var onAppend = function () {
                this.props.onAppend(key);
            }.bind(this);

            var onRemove = function (index) {
                this.props.onRemove([key, index].join('.'));
            }.bind(this);

            return (
                React.createElement(InputTable, {keys: subkeys, data: hash.get(this.props.data, key), footer: options.footer, onChange: onChange, onAppend: onAppend, onRemove: onRemove})
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
                    React.createElement("div", {className: "panel ability"}, 
                        React.createElement(Ability, {data: this.props.data}), 
                        React.createElement("button", {onClick: function () {
                            this.setState({
                                dialog: {ability: true}
                            });
                        }.bind(this)}, "✎")
                    ), 
                    React.createElement("div", {className: "panel basic"}, 
                        React.createElement("div", {className: "row"}, 
                            inputContainer('name', '名前'), 
                            inputContainer('race', '種族')
                        ), 
                        React.createElement("div", {className: "row"}, 
                            inputContainer('sex', '性別'), 
                            inputContainer('age', '年齢')
                        ), 
                        React.createElement("div", {className: "row"}, 
                            inputContainer('experience', '経験点', {type: 'number'}), 
                            inputContainer('total_experience', '使用経験点', {readOnly: true, type: 'number'})
                        ), 
                        React.createElement("div", {className: "row"}, 
                            inputContainer('fumbles', '1ゾロ', {type: 'number'}), 
                            inputContainer('growth_count', '成長回数', {readOnly: true, type: 'number'})
                        ), 
                        React.createElement("div", {className: "row"}, 
                            inputContainer('campaign', 'キャンペーン'), 
                            inputContainer('nationality', '生まれ')
                        ), 
                        React.createElement("div", {className: "row"}, 
                            inputContainer('level', '冒険者レベル')
                        )
                    )
                ), 
                React.createElement("div", {className: "panel skill"}, 
                    inputTable('skills', [
                        {key: 'name', label: '技能', type: 'select', options: Skill.byCategory('options')},
                        {key: 'level', label: 'レベル', type: 'number'},
                        {key: 'magic_power', label: '魔力', type: 'number', readOnly: true},
                        {key: 'next', label: '次', type: 'number', readOnly: true},
                        {key: 'total', label: '累計', type: 'number', readOnly: true}
                    ])
                ), 
                React.createElement("div", {className: "panel weapon"}, 
                    "Weapons"
                ), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "panel armor"}, 
                        inputContainer('armor.name', '鎧'), 
                        inputContainer('armor.str_req', '必筋', {type: 'number'}), 
                        inputContainer('armor.protection', '防護点', {type: 'number'}), 
                        inputContainer('armor.evasion', '回避', {type: 'number'}), 
                        inputContainer('armor.memo', 'メモ')
                    ), 
                    React.createElement("div", {className: "panel shiled"}, 
                        inputContainer('shield.name', '盾'), 
                        inputContainer('shield.str_req', '必筋', {type: 'number'}), 
                        inputContainer('shield.protection', '防護点', {type: 'number'}), 
                        inputContainer('shield.evasion', '回避', {type: 'number'}), 
                        inputContainer('shield.memo', 'メモ')
                    )
                ), 
                React.createElement("div", {className: "panel evasion"}, 
                    
                        inputContainer('evasion_skill', '回避技能', {
                            type: 'select',
                            options: Skill.evasion()
                                .filter(function (name) {
                                    return (this.props.data.skills || []).find(function (skill) {
                                        return skill.name == name;
                                    })
                                }.bind(this))
                        }), 
                    
                    React.createElement("div", {className: "row"}, 
                    inputContainer('protection', '防護点', {type: 'number', readOnly: true}), 
                    inputContainer('evasion', '回避力', {type: 'number', readOnly: true})
                    )
                ), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "panel note"}, 
                        inputContainer('notes', '経歴、その他')
                    ), 
                    React.createElement("div", {className: "panel money"}, 
                        inputContainer('money.on_hand', '所持金', {type: 'number'}), 
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
                                    React.createElement("td", null, inputContainer('total_honor', null, {type: 'number', readOnly: true}))
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
                appendix, 
                React.createElement(Dialog, {visible: this.state.dialog.ability, title: "能力値", onAction: function () {
                    this.setState({
                        dialog: {ability: false}
                    });
                }.bind(this)}, 
                    React.createElement("table", null, 
                        React.createElement("thead", null, 
                            React.createElement("tr", null, 
                                React.createElement("th", null), 
                                React.createElement("th", null), 
                                React.createElement("th", {colSpan: "2"}, "基本値"), 
                                React.createElement("th", null, "成長"), 
                                React.createElement("th", null, "補正"), 
                                React.createElement("th", null, "能力値"), 
                                React.createElement("th", null, "ボーナス")
                            )
                        ), 
                        React.createElement("tbody", null, 
                            
                                (function () {
                                    var row = [];
                                    for (var i = 0; i < 6; ++i) {
                                        var cols = [];

                                        if (i % 2 == 0) {
                                            cols.push(React.createElement("td", {rowSpan: "2"}, '技体心'.charAt(i / 2)));
                                        }
                                        cols.push(React.createElement("td", null, ['器', '敏', '筋', '生', '知', '精'][i]));

                                        if (i % 2 == 0) {
                                            cols.push(React.createElement("td", {rowSpan: "2"}, this.props.data[['skill', 'body', 'mind'][i / 2]]));
                                        }
                                        
                                        if (this.props.data.abilities) {
                                            cols.push(React.createElement("td", null, inputContainer('abilities.' + i, null, {type: 'number'})));
                                            cols.push(React.createElement("td", null, inputContainer('growths.' + i, null, {type: 'number'})));
                                            cols.push(React.createElement("td", null, inputContainer('corrects.' + i, null, {type: 'number', readOnly: true})));
                                            cols.push(React.createElement("td", null, inputContainer('sums.' + i, null, {type: 'number', readOnly: true})));
                                            cols.push(React.createElement("td", null, inputContainer('bonuses.' + i, null, {type: 'number', readOnly: true})));
                                        }

                                        row.push(React.createElement("tr", null, cols));
                                    }
                                    return row;
                                }.bind(this))()
                            
                        )
                    )
                )
            )
        );
    }
});


},{"../Dialog":1,"../InputContainer":2,"../InputTable":3,"../hash":4,"./Ability":5,"./Skill":8}],7:[function(require,module,exports){
'use strict';

var axios = require('axios');
var hash = require('../hash');
var Character = require('./Character');
var Skill = require('./Skill');

module.exports = React.createClass({displayName: "exports",
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        axios.get(this.props.url).then(function (response) {
            this.setState({
                data: response.data
            });
        }.bind(this));
    },
    handleChange: function (key, newValue) {
        //console.log(key + ': ' + hash.get(this.state.data, key) + ' -> ' + newValue);
        hash.set(this.state.data, key, newValue);
        this.forceUpdate();
    },
    handleAppend: function (key) {
        hash.get(this.state.data, key).push({});
        this.forceUpdate();
    },
    handleRemove: function (key) {
        hash.remove(this.state.data, key);
        this.forceUpdate();
    },
    calculate: function () {
        var data = this.state.data;

        // Correct
        data.corrects = [0, 0, 0, 0, 0, 0];

        // Ability
        data.sums = [];
        data.growth_count = 0;
        for (var i = 0; i < 6; ++i) {
            data.sums[i] = data[['skill', 'skill', 'body', 'body', 'mind', 'mind'][i]]
                + (data.abilities || [])[i]
                + (data.growths || [])[i]
                + (data.corrects || [])[i];
            if (data.growths) {
                data.growth_count += data.growths[i];
            }
        }
        data.bonuses = data.sums.map(function (n) {
            return Math.floor(n / 6);
        });

        // Level
        if (data.skills) {
            data.level = data.skills.map(function (skill) {
                return skill.level;
            }).reduce(function (a, b) {
                return (a > b) ? a : b;
            });
        }

        // Skill
        if (data.skills) {
            data.skills.forEach(function (skill) {
                var magic_power = Skill.magicPower(skill.name, +skill.level, data) + (data.magic_power || 0);
                if (magic_power) {
                    skill.magic_power = magic_power;
                }

                skill.next = Skill.next(skill.name, +skill.level);
                skill.total = Skill.total(skill.name, +skill.level);
            });
            data.total_experience = data.skills.map(function (skill) {
                return +skill.total;
            }).reduce(function (a, b) {
                return a + b;
            });
        }

        // Protection, Evasion
        data.protection = 0;
        data.evasion = 0;
        if (data.armor) {
            data.protection += (+data.armor.protection) || 0;
            data.evasion += (+data.armor.evasion) || 0;
        }
        if (data.shield) {
            data.protection += (+data.shield.protection) || 0;
            data.evasion += (+data.shield.evasion) || 0;
        }
        if (data.skills) {
            data.evasion += Skill.base(+(data.skills.find(function (skill) {
                return skill.name == data.evasion_skill;
            }) || {level: 0}).level, data.bonuses[1]);
        }
    },
    render: function () {
        this.calculate();
        return (
            React.createElement("div", {className: "sw2-character-sheet"}, 
                React.createElement("header", null, 
                    React.createElement("h1", null, React.createElement("a", {href: "#"}, this.state.data.user_id), " / ", React.createElement("a", {href: "#"}, this.state.data.name))
                    
                ), 
                React.createElement(Character, {data: this.state.data, onChange: this.handleChange, onAppend: this.handleAppend, onRemove: this.handleRemove})
            )
        );
    }
});


},{"../hash":4,"./Character":6,"./Skill":8,"axios":9}],8:[function(require,module,exports){
'use strict';

var Skill = {
    fight: [
        'ファイター',
        'グラップラー',
        'フェンサー',
        'シューター'
    ],
    magic: [
        'ソーサラー',
        'コンジャラー',
        'プリースト',
        'フェアリーテイマー',
        'デーモンルーラー'
    ],
    a: [
        'ファイター', 'グラップラー', 'フェンサー',
        'ソーサラー', 'コンジャラー', 'プリースト', 'フェアリーテイマー',
        'デーモンルーラー'
    ],
    b: [
    ],
    table: [
        500,
        1000,
        1000,
        1500,
        1500,
        2000,
        2500,
        3000,
        4000,
        5000,
        6000,
        7500,
        9000,
        10500,
        12000,
        13500
    ],
    isMagician: function (name) {
        return Skill.magic.indexOf(name) >= 0;
    },
    magicPower: function (name, level, character) {
        return Skill.isMagician(name)
            ? level + character.bonuses[4]
            : 0;
    },
    base: function (level, bonus) {
        return level ? level + bonus : 0;
    },
    isA: function (name) {
        return Skill.a.indexOf(name) >= 0;
    },
    next: function (name, level) {
        return Skill.table[(+level) + (Skill.isA ? 1 : 0)];
    },
    total: function (name, level) {
        var sum = 0;
        var table = Skill.isA ? 0 : -1;

        for (var i = 1; i <= level; ++i) {
            sum += Skill.table[i + table];
        }

        return sum;
    },
    evasion: function () {
        return [
            'ファイター',
            'グラップラー',
            'フェンサー',
            'シューター',
            'デーモンルーラー'
        ];
    },
    byCategory: function (key) {
        key = key || 'skills';

        var skills = [
            {
                name: '戦士系',
            },
            {
                name: '魔法使い系',
            },
            {
                name: 'その他系'
            }
        ];

        skills[0][key] = [
            'ファイター',
            'グラップラー',
            'フェンサー',
            'シューター'
        ];

        skills[1][key] = [
            'ソーサラー',
            'コンジャラー',
            'プリースト',
            'フェアリーテイマー',
            'マギテック',
            'デーモンルーラー'
        ];

        skills[2][key] = [
            'スカウト',
            'レンジャー',
            'セージ',
            'エンハンサー',
            'バード',
            'ライダー',
            'ミスティック',
            'ウォーリーダー'
        ];

        return skills;
    },
};

module.exports = Skill;


},{}],9:[function(require,module,exports){
module.exports = require('./lib/axios');
},{"./lib/axios":11}],10:[function(require,module,exports){
'use strict';

/*global ActiveXObject:true*/

var defaults = require('./../defaults');
var utils = require('./../utils');
var buildUrl = require('./../helpers/buildUrl');
var cookies = require('./../helpers/cookies');
var parseHeaders = require('./../helpers/parseHeaders');
var transformData = require('./../helpers/transformData');
var urlIsSameOrigin = require('./../helpers/urlIsSameOrigin');

module.exports = function xhrAdapter(resolve, reject, config) {
  // Transform request data
  var data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Merge headers
  var requestHeaders = utils.merge(
    defaults.headers.common,
    defaults.headers[config.method] || {},
    config.headers || {}
  );

  if (utils.isFormData(data)) {
    delete requestHeaders['Content-Type']; // Let the browser set it
  }

  // Create the request
  var request = new (XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');
  request.open(config.method.toUpperCase(), buildUrl(config.url, config.params), true);

  // Listen for ready state
  request.onreadystatechange = function () {
    if (request && request.readyState === 4) {
      // Prepare the response
      var responseHeaders = parseHeaders(request.getAllResponseHeaders());
      var responseData = ['text', ''].indexOf(config.responseType || '') !== -1 ? request.responseText : request.response;
      var response = {
        data: transformData(
          responseData,
          responseHeaders,
          config.transformResponse
        ),
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config
      };

      // Resolve or reject the Promise based on the status
      (request.status >= 200 && request.status < 300 ?
        resolve :
        reject)(response);

      // Clean up request
      request = null;
    }
  };

  // Add xsrf header
  var xsrfValue = urlIsSameOrigin(config.url) ?
      cookies.read(config.xsrfCookieName || defaults.xsrfCookieName) :
      undefined;
  if (xsrfValue) {
    requestHeaders[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue;
  }

  // Add headers to the request
  utils.forEach(requestHeaders, function (val, key) {
    // Remove Content-Type if data is undefined
    if (!data && key.toLowerCase() === 'content-type') {
      delete requestHeaders[key];
    }
    // Otherwise add header to the request
    else {
      request.setRequestHeader(key, val);
    }
  });

  // Add withCredentials to request if needed
  if (config.withCredentials) {
    request.withCredentials = true;
  }

  // Add responseType to request if needed
  if (config.responseType) {
    try {
      request.responseType = config.responseType;
    } catch (e) {
      if (request.responseType !== 'json') {
        throw e;
      }
    }
  }

  if (utils.isArrayBuffer(data)) {
    data = new DataView(data);
  }

  // Send the request
  request.send(data);
};

},{"./../defaults":14,"./../helpers/buildUrl":15,"./../helpers/cookies":16,"./../helpers/parseHeaders":18,"./../helpers/transformData":20,"./../helpers/urlIsSameOrigin":21,"./../utils":22}],11:[function(require,module,exports){
'use strict';

var defaults = require('./defaults');
var utils = require('./utils');
var deprecatedMethod = require('./helpers/deprecatedMethod');
var dispatchRequest = require('./core/dispatchRequest');
var InterceptorManager = require('./core/InterceptorManager');

// Polyfill ES6 Promise if needed
(function () {
  // webpack is being used to set es6-promise to the native Promise
  // for the standalone build. It's necessary to make sure polyfill exists.
  var P = require('es6-promise');
  if (P && typeof P.polyfill === 'function') {
    P.polyfill();
  }
})();

var axios = module.exports = function axios(config) {
  config = utils.merge({
    method: 'get',
    headers: {},
    transformRequest: defaults.transformRequest,
    transformResponse: defaults.transformResponse
  }, config);

  // Don't allow overriding defaults.withCredentials
  config.withCredentials = config.withCredentials || defaults.withCredentials;

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  axios.interceptors.request.forEach(function (interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  axios.interceptors.response.forEach(function (interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  // Provide alias for success
  promise.success = function success(fn) {
    deprecatedMethod('success', 'then', 'https://github.com/mzabriskie/axios/blob/master/README.md#response-api');

    promise.then(function(response) {
      fn(response.data, response.status, response.headers, response.config);
    });
    return promise;
  };

  // Provide alias for error
  promise.error = function error(fn) {
    deprecatedMethod('error', 'catch', 'https://github.com/mzabriskie/axios/blob/master/README.md#response-api');

    promise.then(null, function(response) {
      fn(response.data, response.status, response.headers, response.config);
    });
    return promise;
  };

  return promise;
};

// Expose defaults
axios.defaults = defaults;

// Expose all/spread
axios.all = function (promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// Expose interceptors
axios.interceptors = {
  request: new InterceptorManager(),
  response: new InterceptorManager()
};

// Provide aliases for supported request methods
(function () {
  function createShortMethods() {
    utils.forEach(arguments, function (method) {
      axios[method] = function (url, config) {
        return axios(utils.merge(config || {}, {
          method: method,
          url: url
        }));
      };
    });
  }

  function createShortMethodsWithData() {
    utils.forEach(arguments, function (method) {
      axios[method] = function (url, data, config) {
        return axios(utils.merge(config || {}, {
          method: method,
          url: url,
          data: data
        }));
      };
    });
  }

  createShortMethods('delete', 'get', 'head');
  createShortMethodsWithData('post', 'put', 'patch');
})();

},{"./core/InterceptorManager":12,"./core/dispatchRequest":13,"./defaults":14,"./helpers/deprecatedMethod":17,"./helpers/spread":19,"./utils":22,"es6-promise":23}],12:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function (fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function (id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `remove`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function (fn) {
  utils.forEach(this.handlers, function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":22}],13:[function(require,module,exports){
(function (process){
'use strict';

/**
 * Dispatch a request to the server using whichever adapter
 * is supported by the current environment.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  return new Promise(function (resolve, reject) {
    try {
      // For browsers use XHR adapter
      if (typeof window !== 'undefined') {
        require('../adapters/xhr')(resolve, reject, config);
      }
      // For node use HTTP adapter
      else if (typeof process !== 'undefined') {
        require('../adapters/http')(resolve, reject, config);
      }
    } catch (e) {
      reject(e);
    }
  });
};


}).call(this,require('_process'))

},{"../adapters/http":10,"../adapters/xhr":10,"_process":24}],14:[function(require,module,exports){
'use strict';

var utils = require('./utils');

var PROTECTION_PREFIX = /^\)\]\}',?\n/;
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

module.exports = {
  transformRequest: [function (data, headers) {
    if(utils.isFormData(data)) {
      return data;
    }
    if (utils.isArrayBuffer(data)) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isObject(data) && !utils.isFile(data) && !utils.isBlob(data)) {
      // Set application/json if no Content-Type has been specified
      if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
        headers['Content-Type'] = 'application/json;charset=utf-8';
      }
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function (data) {
    if (typeof data === 'string') {
      data = data.replace(PROTECTION_PREFIX, '');
      try {
        data = JSON.parse(data);
      } catch (e) {}
    }
    return data;
  }],

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    },
    patch: utils.merge(DEFAULT_CONTENT_TYPE),
    post: utils.merge(DEFAULT_CONTENT_TYPE),
    put: utils.merge(DEFAULT_CONTENT_TYPE)
  },

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
};

},{"./utils":22}],15:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildUrl(url, params) {
  if (!params) {
    return url;
  }

  var parts = [];

  utils.forEach(params, function (val, key) {
    if (val === null || typeof val === 'undefined') {
      return;
    }
    if (!utils.isArray(val)) {
      val = [val];
    }

    utils.forEach(val, function (v) {
      if (utils.isDate(v)) {
        v = v.toISOString();
      }
      else if (utils.isObject(v)) {
        v = JSON.stringify(v);
      }
      parts.push(encode(key) + '=' + encode(v));
    });
  });

  if (parts.length > 0) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&');
  }

  return url;
};

},{"./../utils":22}],16:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = {
  write: function write(name, value, expires, path, domain, secure) {
    var cookie = [];
    cookie.push(name + '=' + encodeURIComponent(value));

    if (utils.isNumber(expires)) {
      cookie.push('expires=' + new Date(expires).toGMTString());
    }

    if (utils.isString(path)) {
      cookie.push('path=' + path);
    }

    if (utils.isString(domain)) {
      cookie.push('domain=' + domain);
    }

    if (secure === true) {
      cookie.push('secure');
    }

    document.cookie = cookie.join('; ');
  },

  read: function read(name) {
    var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
    return (match ? decodeURIComponent(match[3]) : null);
  },

  remove: function remove(name) {
    this.write(name, '', Date.now() - 86400000);
  }
};

},{"./../utils":22}],17:[function(require,module,exports){
'use strict';

/**
 * Supply a warning to the developer that a method they are using
 * has been deprecated.
 *
 * @param {string} method The name of the deprecated method
 * @param {string} [instead] The alternate method to use if applicable
 * @param {string} [docs] The documentation URL to get further details
 */
module.exports = function deprecatedMethod(method, instead, docs) {
  try {
    console.warn(
      'DEPRECATED method `' + method + '`.' +
      (instead ? ' Use `' + instead + '` instead.' : '') +
      ' This method will be removed in a future release.');

    if (docs) {
      console.warn('For more information about usage see ' + docs);
    }
  } catch (e) {}
};

},{}],18:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {}, key, val, i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

},{"./../utils":22}],19:[function(require,module,exports){
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function (arr) {
    callback.apply(null, arr);
  };
};

},{}],20:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  utils.forEach(fns, function (fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":22}],21:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var msie = /(msie|trident)/i.test(navigator.userAgent);
var urlParsingNode = document.createElement('a');
var originUrl;

/**
 * Parse a URL to discover it's components
 *
 * @param {String} url The URL to be parsed
 * @returns {Object}
 */
function urlResolve(url) {
  var href = url;

  if (msie) {
    // IE needs attribute set twice to normalize properties
    urlParsingNode.setAttribute('href', href);
    href = urlParsingNode.href;
  }

  urlParsingNode.setAttribute('href', href);

  // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
  return {
    href: urlParsingNode.href,
    protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
    host: urlParsingNode.host,
    search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
    hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
    hostname: urlParsingNode.hostname,
    port: urlParsingNode.port,
    pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
              urlParsingNode.pathname :
              '/' + urlParsingNode.pathname
  };
}

originUrl = urlResolve(window.location.href);

/**
 * Determine if a URL shares the same origin as the current location
 *
 * @param {String} requestUrl The URL to test
 * @returns {boolean} True if URL shares the same origin, otherwise false
 */
module.exports = function urlIsSameOrigin(requestUrl) {
  var parsed = (utils.isString(requestUrl)) ? urlResolve(requestUrl) : requestUrl;
  return (parsed.protocol === originUrl.protocol &&
        parsed.host === originUrl.host);
};

},{"./../utils":22}],22:[function(require,module,exports){
'use strict';

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return toString.call(val) === '[object FormData]';
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    return ArrayBuffer.isView(val);
  } else {
    return (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array or arguments callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Check if obj is array-like
  var isArrayLike = isArray(obj) || (typeof obj === 'object' && !isNaN(obj.length));

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArrayLike) {
    obj = [obj];
  }

  // Iterate over array values
  if (isArrayLike) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  }
  // Iterate over object keys
  else {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/*obj1, obj2, obj3, ...*/) {
  var result = {};
  forEach(arguments, function (obj) {
    forEach(obj, function (val, key) {
      result[key] = val;
    });
  });
  return result;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  forEach: forEach,
  merge: merge,
  trim: trim
};

},{}],23:[function(require,module,exports){
(function (process,global){
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
 * @version   2.1.1
 */

(function() {
    "use strict";
    function lib$es6$promise$utils$$objectOrFunction(x) {
      return typeof x === 'function' || (typeof x === 'object' && x !== null);
    }

    function lib$es6$promise$utils$$isFunction(x) {
      return typeof x === 'function';
    }

    function lib$es6$promise$utils$$isMaybeThenable(x) {
      return typeof x === 'object' && x !== null;
    }

    var lib$es6$promise$utils$$_isArray;
    if (!Array.isArray) {
      lib$es6$promise$utils$$_isArray = function (x) {
        return Object.prototype.toString.call(x) === '[object Array]';
      };
    } else {
      lib$es6$promise$utils$$_isArray = Array.isArray;
    }

    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
    var lib$es6$promise$asap$$len = 0;
    var lib$es6$promise$asap$$toString = {}.toString;
    var lib$es6$promise$asap$$vertxNext;
    function lib$es6$promise$asap$$asap(callback, arg) {
      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
      lib$es6$promise$asap$$len += 2;
      if (lib$es6$promise$asap$$len === 2) {
        // If len is 2, that means that we need to schedule an async flush.
        // If additional callbacks are queued before the queue is flushed, they
        // will be processed by this flush that we are scheduling.
        lib$es6$promise$asap$$scheduleFlush();
      }
    }

    var lib$es6$promise$asap$$default = lib$es6$promise$asap$$asap;

    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

    // test for web worker but not in IE10
    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
      typeof importScripts !== 'undefined' &&
      typeof MessageChannel !== 'undefined';

    // node
    function lib$es6$promise$asap$$useNextTick() {
      var nextTick = process.nextTick;
      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
      // setImmediate should be used instead instead
      var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
      if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
        nextTick = setImmediate;
      }
      return function() {
        nextTick(lib$es6$promise$asap$$flush);
      };
    }

    // vertx
    function lib$es6$promise$asap$$useVertxTimer() {
      return function() {
        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
      };
    }

    function lib$es6$promise$asap$$useMutationObserver() {
      var iterations = 0;
      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
      var node = document.createTextNode('');
      observer.observe(node, { characterData: true });

      return function() {
        node.data = (iterations = ++iterations % 2);
      };
    }

    // web worker
    function lib$es6$promise$asap$$useMessageChannel() {
      var channel = new MessageChannel();
      channel.port1.onmessage = lib$es6$promise$asap$$flush;
      return function () {
        channel.port2.postMessage(0);
      };
    }

    function lib$es6$promise$asap$$useSetTimeout() {
      return function() {
        setTimeout(lib$es6$promise$asap$$flush, 1);
      };
    }

    var lib$es6$promise$asap$$queue = new Array(1000);
    function lib$es6$promise$asap$$flush() {
      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
        var callback = lib$es6$promise$asap$$queue[i];
        var arg = lib$es6$promise$asap$$queue[i+1];

        callback(arg);

        lib$es6$promise$asap$$queue[i] = undefined;
        lib$es6$promise$asap$$queue[i+1] = undefined;
      }

      lib$es6$promise$asap$$len = 0;
    }

    function lib$es6$promise$asap$$attemptVertex() {
      try {
        var r = require;
        var vertx = r('vertx');
        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
        return lib$es6$promise$asap$$useVertxTimer();
      } catch(e) {
        return lib$es6$promise$asap$$useSetTimeout();
      }
    }

    var lib$es6$promise$asap$$scheduleFlush;
    // Decide what async method to use to triggering processing of queued callbacks:
    if (lib$es6$promise$asap$$isNode) {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
    } else if (lib$es6$promise$asap$$isWorker) {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
    } else if (lib$es6$promise$asap$$browserWindow === undefined && typeof require === 'function') {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertex();
    } else {
      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
    }

    function lib$es6$promise$$internal$$noop() {}

    var lib$es6$promise$$internal$$PENDING   = void 0;
    var lib$es6$promise$$internal$$FULFILLED = 1;
    var lib$es6$promise$$internal$$REJECTED  = 2;

    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

    function lib$es6$promise$$internal$$selfFullfillment() {
      return new TypeError("You cannot resolve a promise with itself");
    }

    function lib$es6$promise$$internal$$cannotReturnOwn() {
      return new TypeError('A promises callback cannot return that same promise.');
    }

    function lib$es6$promise$$internal$$getThen(promise) {
      try {
        return promise.then;
      } catch(error) {
        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
        return lib$es6$promise$$internal$$GET_THEN_ERROR;
      }
    }

    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
      try {
        then.call(value, fulfillmentHandler, rejectionHandler);
      } catch(e) {
        return e;
      }
    }

    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
       lib$es6$promise$asap$$default(function(promise) {
        var sealed = false;
        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
          if (sealed) { return; }
          sealed = true;
          if (thenable !== value) {
            lib$es6$promise$$internal$$resolve(promise, value);
          } else {
            lib$es6$promise$$internal$$fulfill(promise, value);
          }
        }, function(reason) {
          if (sealed) { return; }
          sealed = true;

          lib$es6$promise$$internal$$reject(promise, reason);
        }, 'Settle: ' + (promise._label || ' unknown promise'));

        if (!sealed && error) {
          sealed = true;
          lib$es6$promise$$internal$$reject(promise, error);
        }
      }, promise);
    }

    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
        lib$es6$promise$$internal$$reject(promise, thenable._result);
      } else {
        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
          lib$es6$promise$$internal$$resolve(promise, value);
        }, function(reason) {
          lib$es6$promise$$internal$$reject(promise, reason);
        });
      }
    }

    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
      if (maybeThenable.constructor === promise.constructor) {
        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
      } else {
        var then = lib$es6$promise$$internal$$getThen(maybeThenable);

        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
        } else if (then === undefined) {
          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
        } else if (lib$es6$promise$utils$$isFunction(then)) {
          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
        } else {
          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
        }
      }
    }

    function lib$es6$promise$$internal$$resolve(promise, value) {
      if (promise === value) {
        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFullfillment());
      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
        lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
      } else {
        lib$es6$promise$$internal$$fulfill(promise, value);
      }
    }

    function lib$es6$promise$$internal$$publishRejection(promise) {
      if (promise._onerror) {
        promise._onerror(promise._result);
      }

      lib$es6$promise$$internal$$publish(promise);
    }

    function lib$es6$promise$$internal$$fulfill(promise, value) {
      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

      promise._result = value;
      promise._state = lib$es6$promise$$internal$$FULFILLED;

      if (promise._subscribers.length !== 0) {
        lib$es6$promise$asap$$default(lib$es6$promise$$internal$$publish, promise);
      }
    }

    function lib$es6$promise$$internal$$reject(promise, reason) {
      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
      promise._state = lib$es6$promise$$internal$$REJECTED;
      promise._result = reason;

      lib$es6$promise$asap$$default(lib$es6$promise$$internal$$publishRejection, promise);
    }

    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
      var subscribers = parent._subscribers;
      var length = subscribers.length;

      parent._onerror = null;

      subscribers[length] = child;
      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

      if (length === 0 && parent._state) {
        lib$es6$promise$asap$$default(lib$es6$promise$$internal$$publish, parent);
      }
    }

    function lib$es6$promise$$internal$$publish(promise) {
      var subscribers = promise._subscribers;
      var settled = promise._state;

      if (subscribers.length === 0) { return; }

      var child, callback, detail = promise._result;

      for (var i = 0; i < subscribers.length; i += 3) {
        child = subscribers[i];
        callback = subscribers[i + settled];

        if (child) {
          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
        } else {
          callback(detail);
        }
      }

      promise._subscribers.length = 0;
    }

    function lib$es6$promise$$internal$$ErrorObject() {
      this.error = null;
    }

    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
      try {
        return callback(detail);
      } catch(e) {
        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
      }
    }

    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
          value, error, succeeded, failed;

      if (hasCallback) {
        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
          failed = true;
          error = value.error;
          value = null;
        } else {
          succeeded = true;
        }

        if (promise === value) {
          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
          return;
        }

      } else {
        value = detail;
        succeeded = true;
      }

      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
        // noop
      } else if (hasCallback && succeeded) {
        lib$es6$promise$$internal$$resolve(promise, value);
      } else if (failed) {
        lib$es6$promise$$internal$$reject(promise, error);
      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
        lib$es6$promise$$internal$$fulfill(promise, value);
      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
        lib$es6$promise$$internal$$reject(promise, value);
      }
    }

    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
      try {
        resolver(function resolvePromise(value){
          lib$es6$promise$$internal$$resolve(promise, value);
        }, function rejectPromise(reason) {
          lib$es6$promise$$internal$$reject(promise, reason);
        });
      } catch(e) {
        lib$es6$promise$$internal$$reject(promise, e);
      }
    }

    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
      var enumerator = this;

      enumerator._instanceConstructor = Constructor;
      enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);

      if (enumerator._validateInput(input)) {
        enumerator._input     = input;
        enumerator.length     = input.length;
        enumerator._remaining = input.length;

        enumerator._init();

        if (enumerator.length === 0) {
          lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
        } else {
          enumerator.length = enumerator.length || 0;
          enumerator._enumerate();
          if (enumerator._remaining === 0) {
            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
          }
        }
      } else {
        lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
      }
    }

    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
      return lib$es6$promise$utils$$isArray(input);
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
      return new Error('Array Methods must be provided an Array');
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
      this._result = new Array(this.length);
    };

    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;

    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
      var enumerator = this;

      var length  = enumerator.length;
      var promise = enumerator.promise;
      var input   = enumerator._input;

      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
        enumerator._eachEntry(input[i], i);
      }
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
      var enumerator = this;
      var c = enumerator._instanceConstructor;

      if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
        if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
          entry._onerror = null;
          enumerator._settledAt(entry._state, i, entry._result);
        } else {
          enumerator._willSettleAt(c.resolve(entry), i);
        }
      } else {
        enumerator._remaining--;
        enumerator._result[i] = entry;
      }
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
      var enumerator = this;
      var promise = enumerator.promise;

      if (promise._state === lib$es6$promise$$internal$$PENDING) {
        enumerator._remaining--;

        if (state === lib$es6$promise$$internal$$REJECTED) {
          lib$es6$promise$$internal$$reject(promise, value);
        } else {
          enumerator._result[i] = value;
        }
      }

      if (enumerator._remaining === 0) {
        lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
      }
    };

    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
      var enumerator = this;

      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
      }, function(reason) {
        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
      });
    };
    function lib$es6$promise$promise$all$$all(entries) {
      return new lib$es6$promise$enumerator$$default(this, entries).promise;
    }
    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
    function lib$es6$promise$promise$race$$race(entries) {
      /*jshint validthis:true */
      var Constructor = this;

      var promise = new Constructor(lib$es6$promise$$internal$$noop);

      if (!lib$es6$promise$utils$$isArray(entries)) {
        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
        return promise;
      }

      var length = entries.length;

      function onFulfillment(value) {
        lib$es6$promise$$internal$$resolve(promise, value);
      }

      function onRejection(reason) {
        lib$es6$promise$$internal$$reject(promise, reason);
      }

      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
      }

      return promise;
    }
    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
    function lib$es6$promise$promise$resolve$$resolve(object) {
      /*jshint validthis:true */
      var Constructor = this;

      if (object && typeof object === 'object' && object.constructor === Constructor) {
        return object;
      }

      var promise = new Constructor(lib$es6$promise$$internal$$noop);
      lib$es6$promise$$internal$$resolve(promise, object);
      return promise;
    }
    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
    function lib$es6$promise$promise$reject$$reject(reason) {
      /*jshint validthis:true */
      var Constructor = this;
      var promise = new Constructor(lib$es6$promise$$internal$$noop);
      lib$es6$promise$$internal$$reject(promise, reason);
      return promise;
    }
    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;

    var lib$es6$promise$promise$$counter = 0;

    function lib$es6$promise$promise$$needsResolver() {
      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    function lib$es6$promise$promise$$needsNew() {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }

    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
    /**
      Promise objects represent the eventual result of an asynchronous operation. The
      primary way of interacting with a promise is through its `then` method, which
      registers callbacks to receive either a promise’s eventual value or the reason
      why the promise cannot be fulfilled.

      Terminology
      -----------

      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
      - `thenable` is an object or function that defines a `then` method.
      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
      - `exception` is a value that is thrown using the throw statement.
      - `reason` is a value that indicates why a promise was rejected.
      - `settled` the final resting state of a promise, fulfilled or rejected.

      A promise can be in one of three states: pending, fulfilled, or rejected.

      Promises that are fulfilled have a fulfillment value and are in the fulfilled
      state.  Promises that are rejected have a rejection reason and are in the
      rejected state.  A fulfillment value is never a thenable.

      Promises can also be said to *resolve* a value.  If this value is also a
      promise, then the original promise's settled state will match the value's
      settled state.  So a promise that *resolves* a promise that rejects will
      itself reject, and a promise that *resolves* a promise that fulfills will
      itself fulfill.


      Basic Usage:
      ------------

      ```js
      var promise = new Promise(function(resolve, reject) {
        // on success
        resolve(value);

        // on failure
        reject(reason);
      });

      promise.then(function(value) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```

      Advanced Usage:
      ---------------

      Promises shine when abstracting away asynchronous interactions such as
      `XMLHttpRequest`s.

      ```js
      function getJSON(url) {
        return new Promise(function(resolve, reject){
          var xhr = new XMLHttpRequest();

          xhr.open('GET', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.send();

          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
              }
            }
          };
        });
      }

      getJSON('/posts.json').then(function(json) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```

      Unlike callbacks, promises are great composable primitives.

      ```js
      Promise.all([
        getJSON('/posts'),
        getJSON('/comments')
      ]).then(function(values){
        values[0] // => postsJSON
        values[1] // => commentsJSON

        return values;
      });
      ```

      @class Promise
      @param {function} resolver
      Useful for tooling.
      @constructor
    */
    function lib$es6$promise$promise$$Promise(resolver) {
      this._id = lib$es6$promise$promise$$counter++;
      this._state = undefined;
      this._result = undefined;
      this._subscribers = [];

      if (lib$es6$promise$$internal$$noop !== resolver) {
        if (!lib$es6$promise$utils$$isFunction(resolver)) {
          lib$es6$promise$promise$$needsResolver();
        }

        if (!(this instanceof lib$es6$promise$promise$$Promise)) {
          lib$es6$promise$promise$$needsNew();
        }

        lib$es6$promise$$internal$$initializePromise(this, resolver);
      }
    }

    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;

    lib$es6$promise$promise$$Promise.prototype = {
      constructor: lib$es6$promise$promise$$Promise,

    /**
      The primary way of interacting with a promise is through its `then` method,
      which registers callbacks to receive either a promise's eventual value or the
      reason why the promise cannot be fulfilled.

      ```js
      findUser().then(function(user){
        // user is available
      }, function(reason){
        // user is unavailable, and you are given the reason why
      });
      ```

      Chaining
      --------

      The return value of `then` is itself a promise.  This second, 'downstream'
      promise is resolved with the return value of the first promise's fulfillment
      or rejection handler, or rejected if the handler throws an exception.

      ```js
      findUser().then(function (user) {
        return user.name;
      }, function (reason) {
        return 'default name';
      }).then(function (userName) {
        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
        // will be `'default name'`
      });

      findUser().then(function (user) {
        throw new Error('Found user, but still unhappy');
      }, function (reason) {
        throw new Error('`findUser` rejected and we're unhappy');
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
      });
      ```
      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

      ```js
      findUser().then(function (user) {
        throw new PedagogicalException('Upstream error');
      }).then(function (value) {
        // never reached
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // The `PedgagocialException` is propagated all the way down to here
      });
      ```

      Assimilation
      ------------

      Sometimes the value you want to propagate to a downstream promise can only be
      retrieved asynchronously. This can be achieved by returning a promise in the
      fulfillment or rejection handler. The downstream promise will then be pending
      until the returned promise is settled. This is called *assimilation*.

      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // The user's comments are now available
      });
      ```

      If the assimliated promise rejects, then the downstream promise will also reject.

      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // If `findCommentsByAuthor` fulfills, we'll have the value here
      }, function (reason) {
        // If `findCommentsByAuthor` rejects, we'll have the reason here
      });
      ```

      Simple Example
      --------------

      Synchronous Example

      ```javascript
      var result;

      try {
        result = findResult();
        // success
      } catch(reason) {
        // failure
      }
      ```

      Errback Example

      ```js
      findResult(function(result, err){
        if (err) {
          // failure
        } else {
          // success
        }
      });
      ```

      Promise Example;

      ```javascript
      findResult().then(function(result){
        // success
      }, function(reason){
        // failure
      });
      ```

      Advanced Example
      --------------

      Synchronous Example

      ```javascript
      var author, books;

      try {
        author = findAuthor();
        books  = findBooksByAuthor(author);
        // success
      } catch(reason) {
        // failure
      }
      ```

      Errback Example

      ```js

      function foundBooks(books) {

      }

      function failure(reason) {

      }

      findAuthor(function(author, err){
        if (err) {
          failure(err);
          // failure
        } else {
          try {
            findBoooksByAuthor(author, function(books, err) {
              if (err) {
                failure(err);
              } else {
                try {
                  foundBooks(books);
                } catch(reason) {
                  failure(reason);
                }
              }
            });
          } catch(error) {
            failure(err);
          }
          // success
        }
      });
      ```

      Promise Example;

      ```javascript
      findAuthor().
        then(findBooksByAuthor).
        then(function(books){
          // found books
      }).catch(function(reason){
        // something went wrong
      });
      ```

      @method then
      @param {Function} onFulfilled
      @param {Function} onRejected
      Useful for tooling.
      @return {Promise}
    */
      then: function(onFulfillment, onRejection) {
        var parent = this;
        var state = parent._state;

        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
          return this;
        }

        var child = new this.constructor(lib$es6$promise$$internal$$noop);
        var result = parent._result;

        if (state) {
          var callback = arguments[state - 1];
          lib$es6$promise$asap$$default(function(){
            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
          });
        } else {
          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
        }

        return child;
      },

    /**
      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
      as the catch block of a try/catch statement.

      ```js
      function findAuthor(){
        throw new Error('couldn't find that author');
      }

      // synchronous
      try {
        findAuthor();
      } catch(reason) {
        // something went wrong
      }

      // async with promises
      findAuthor().catch(function(reason){
        // something went wrong
      });
      ```

      @method catch
      @param {Function} onRejection
      Useful for tooling.
      @return {Promise}
    */
      'catch': function(onRejection) {
        return this.then(null, onRejection);
      }
    };
    function lib$es6$promise$polyfill$$polyfill() {
      var local;

      if (typeof global !== 'undefined') {
          local = global;
      } else if (typeof self !== 'undefined') {
          local = self;
      } else {
          try {
              local = Function('return this')();
          } catch (e) {
              throw new Error('polyfill failed because global object is unavailable in this environment');
          }
      }

      var P = local.Promise;

      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
        return;
      }

      local.Promise = lib$es6$promise$promise$$default;
    }
    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

    var lib$es6$promise$umd$$ES6Promise = {
      'Promise': lib$es6$promise$promise$$default,
      'polyfill': lib$es6$promise$polyfill$$default
    };

    /* global define:true module:true window: true */
    if (typeof define === 'function' && define['amd']) {
      define(function() { return lib$es6$promise$umd$$ES6Promise; });
    } else if (typeof module !== 'undefined' && module['exports']) {
      module['exports'] = lib$es6$promise$umd$$ES6Promise;
    } else if (typeof this !== 'undefined') {
      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
    }

    lib$es6$promise$polyfill$$default();
}).call(this);


}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":24}],24:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],25:[function(require,module,exports){
'use strict';

var SW2CharacterSheet = require('./sw2/CharacterSheet');

React.render(
    React.createElement(SW2CharacterSheet, {url: "sw2chara.json"}),
    document.body
);


},{"./sw2/CharacterSheet":7}]},{},[25])


//# sourceMappingURL=index.js.map