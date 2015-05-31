'use strict';

var axios = require('axios');
var hash = require('../hash');
var Character = require('./Character');
var Skill = require('./Skill');

module.exports = React.createClass({
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
        console.log(key + ': ' + hash.get(this.state.data, key) + ' -> ' + newValue);
        hash.set(this.state.data, key, newValue);
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
            <div className="sw2-character-sheet">
                <header>
                    <h1><a href="#">{this.state.data.user_id}</a> / <a href="#">{this.state.data.name}</a></h1>
                    
                </header>
                <Character data={this.state.data} onChange={this.handleChange}/>
            </div>
        );
    }
});
