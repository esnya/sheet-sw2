'use strict';

var React = require('react');
var Card = require('../../card');
var Table = require('./table');
var skill = require('../../../sw2/skill');

var Skill = React.createClass({
    render: function () {
        var data = this.props.data;
        var readOnly = this.props.readOnly;
        var onChange = this.props.onChange;
        var onAppend = this.props.onAppend;
        var onRemove = this.props.onRemove;

        var skills = skill.list.map(function (skill) {
            return {
                text: (
                        <span className='skill'>
                            <span className='desc' style={{
                                display: 'inline-block',
                                color: 'lightgray',
                                width: '64px'
                            }}>{skill.type + skill.table}</span>
                            <span className='name'>{skill.name}</span>
                        </span>
                      ),
                payload: skill.name
            };
        });

        return (
                <Card className="skill">
                    <Table data={data} path="skills" cols={[
                            {path: 'name', label: '技能', type: 'select', options: skills},
                            {path: 'level', label: 'レベル', type: 'number'},
                            {path: 'magic_power', label: '魔力', type: 'number', readOnly: true},
                            {path: 'next', label: '次', type: 'number', readOnly: true},
                            {path: 'total', label: '累計', type: 'number', readOnly: true}
                        ]} onChange={onChange} onAppend={onAppend} onRemove={onRemove} />
                </Card>
               );
    }
});

module.exports = Skill;
