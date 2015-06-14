'use strict';

var hash = require('../hash');
var skill = require('./skill');
var V = require('../virtualmodel.jsx');
var createVirtualModel = V.createModel;
var createVirtualField = V.createField;

var Character = createVirtualModel('Character',
        [
            'id',
            'name',
            'user_id',
            'race',
            'sex',
            'age',
            'fumbles',
            'experience',
            'nationality',
            'evasion_skill',
            'notes',
            'inventory',
            'honor',
            'instrument',
            'pet'
        ],
        [
            createVirtualField('total_experience', V.sum('skills.*.total')),
            createVirtualField('growth_count', V.sum('ability.growth')),
            createVirtualField('magic_power', V.value(0)),
            createVirtualField('level', V.max('skills.*.level')),
            createVirtualField('protection', V.add('armor.protection', 'shield.protection')),
            createVirtualField('evasion', V.add(V.func(function (evasion_skill, skill_names, skill_levels, agi) {
                var index = skill_names.indexOf(evasion_skill);
                if (index >= 0) {
                    return +skill_levels[index] + (+agi);
                } else {
                    return 0;
                }
            }, 'evasion_skill', 'skills.*.name', 'skills.*.level', 'ability.bonus[1]'), V.add('armor.evasion', 'shield.evasion'))),
            createVirtualField('total_honor', V.add(V.sum('honorable_items.*.value'), 'honor'))
        ],
        [
            createVirtualModel('skills', ['name', 'level'],
                    [
                        createVirtualField('magic_power', V.cond(V.func(skill.isMagicSkill, 'name'), V.add(V.add('level', 'parent.ability.bonus.4'), 'parent.magic_power'), null)),
                        createVirtualField('next', V.func(skill.next, 'name', 'level')),
                        createVirtualField('total', V.func(skill.total, 'name', 'level'))
                    ]),
            createVirtualModel('weapons', ['name', 'to_use', 'str_req', 'accuracy_correction', 'damage_correction', 'impact', 'critical', 'memo', 'impact_3', 'impact_4', 'impact_5', 'impact_6', 'impact_7', 'impact_8', 'impact_9', 'impact_10', 'impact_11', 'impact_12']),
            createVirtualModel('supplies', ['name', 'count']),
            createVirtualModel('ornaments', ['name', 'effect']),
            createVirtualModel('combat_feats', ['name', 'talk', 'write']),
            createVirtualModel('honorable_items', ['name', 'value']),
            createVirtualModel('techniques', ['name', 'effect']),
            createVirtualModel('songs', ['name', 'intoro', 'effect']),
            createVirtualModel('riding_skills', ['name', 'effect']),
            createVirtualModel('alchemist_skills', ['name', 'effect']),
            createVirtualModel('warleader_skills', ['name', 'effect']),
            createVirtualModel('mistic_skills', ['name', 'effect'])
        ],
        [
            createVirtualModel('ability', ['base3', 'base', 'growth'], [
                    createVirtualField('correct', V.value([0, 0, 0, 0, 0, 0])),
                    createVirtualField('sum', V.zip(V.zip(V.stretch('base3', 2), 'base', V.add()), 'growth', V.add())),
                    createVirtualField('bonus', V.map0(V.map0(V.zip(V.zip(V.stretch('base3', 2), 'base', V.add()), 'growth', V.add()), V.div(null, 6)), V.floor()))
                ]),
            createVirtualModel('armor', ['name', 'str_req', 'protection', 'evasion', 'memo']),
            createVirtualModel('shield', ['name', 'str_req', 'protection', 'evasion', 'memo']),
            createVirtualModel('money', ['on_hand', 'deposit', 'debt']),
        ]);

module.exports = Character;
