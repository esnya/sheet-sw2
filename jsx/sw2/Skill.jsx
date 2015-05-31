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
    }
};

module.exports = Skill;
