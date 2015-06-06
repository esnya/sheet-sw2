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
    isMagicSkill: function (name) {
        return !!Skill.list.find(function (skill) {
            return skill.name == name && skill.type == '魔法';
        });
    }
};

module.exports = Skill;
