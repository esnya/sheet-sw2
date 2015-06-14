'use strict';

var _skill = function (name, type, table) {
    return {
        name: name,
        type: type,
        table: table
    }
};


var Skill = {
    list: [
        _skill('ファイター', '戦士', 'A'),
        _skill('グラップラー', '戦士', 'A'),
        _skill('フェンサー', '戦士', 'A'),
        _skill('シューター', '戦士', 'B'),
        _skill('ソーサラー', '魔法', 'A'),
        _skill('コンジャラー', '魔法', 'A'),
        _skill('プリースト', '魔法', 'A'),
        _skill('フェアリーテイマー', '魔法', 'A'),
        _skill('マギテック', '魔法', 'A'),
        _skill('デーモンルーラー', '魔法', 'A'),
        _skill('スカウト', 'その他', 'B'),
        _skill('レンジャー', 'その他', 'B'),
        _skill('エンハンサー', 'その他', 'B'),
        _skill('バード', 'その他', 'B'),
        _skill('ライダー', 'その他', 'B'),
        _skill('アルケミスト', 'その他', 'B'),
        _skill('ウォーリーダー', 'その他', 'B'),
        _skill('ミスティック', 'その他', 'B')
    ],
    get: function (name) {
        return Skill.list.find(function (skill) {
            return skill.name == name;
        });
    },
    isMagicSkill: function (name) {
        return !!Skill.list.find(function (skill) {
            return skill.name == name && skill.type == '魔法';
        });
    },
    isEvasionSkill: function (name) {
        return name == 'デーモンルーラー' 
            || !!Skill.list.find(function (skill) {
                return skill.name == name && skill.type == '戦士';
            });
    },
    table: [
        500,
        1000,
        1000,
        1500,
        2000,
        2500,
        3000,
        3500,
        4000,
        5000,
        6500,
    ],
    next: function (name, level) {
        var skill = Skill.get(name);
        if (skill) {
            return Skill.table[(+level) + (
                    (skill.table == 'A') ? 1 : 0
                    )];
        }
    },
    total: function (name, level) {
        var skill = Skill.get(name);
        if (skill) {
            return level == 0
                ? 0
                : Skill.table.slice(Skill.get(name).table == 'A' ? 1 : 0)
                .slice(0, +level)
                .reduce(function (a, b) { return a + b; }, 0);
        }
    }

};

module.exports = Skill;
