'use strict';

var React = require('react');
var Table = require('./table');
var Field = require('../../field');
var Card = require('../../card');

var TechniqueTable = React.createClass({
    render: function () {
        var data = this.props.data;
        var path = this.props.path;
        var columns = this.props.columns || this.props.cols;
        var children = this.props.children;
        var readOnly = this.props.readOnly;
        var onChange = this.props.onChange;
        var onAppend = this.props.onAppend;
        var onRemove = this.props.onRemove;

        return (
                <Card>
                    <Table data={data} path={path} columns={columns} readOnly={readOnly}
                        onChange={onChange} onAppend={onAppend} onRemove={onRemove}>
                        {children}
                    </Table>
                </Card>
               );
    }
});

var Technique = React.createClass({
    render: function () {
        var data = this.props.data;
        var readOnly = this.props.readOnly;
        var onChange = this.props.onChange;
        var onAppend = this.props.onAppend;
        var onRemove = this.props.onRemove;

        return (<div>
        {[
            {name: 'エンハンサー', path: 'techniques', columns: [
                {path: 'name', label: '練技'},
                {path: 'effect', label: '効果'}
            ]},

            {name: 'バード', path: 'songs', columns: [
                {path: 'name', label: '練技'},
                {path: 'effect', label: '効果'}
            ], children: [
                <tr key="0">
                    <th>楽器</th>
                    <td><Field path="instrument" data={data} readOnly={readOnly} onChange={onChange} /></td>
                </tr>,
                <tr key="1">
                    <th>ペット</th>
                    <td><Field path="pet" data={data} readOnly={readOnly} onChange={onChange} /></td>
                </tr>
            ]},

            {name: 'ライダー', path: 'riding_skills', columns: [
                {path: 'name', label: '騎芸'},
                {path: 'effect', label: '効果'}
            ]},

            {name: 'アルケミスト', path: 'alchemist_skills', columns: [
                {path: 'name', label: '賦術'},
                {path: 'card', label: 'カード'},
                {path: 'effect', label: '効果'}
            ]},

            {name: 'ウォーリーダー', path: 'warleader_skills', columns: [
                {path: 'name', label: '鼓咆'},
                {path: 'effect', label: '効果'}
            ]},

            {name: 'ミスティック', path: 'mistic_skills', columns: [
                {path: 'name', label: '占瞳'},
                {path: 'item', label: '占具'},
                {path: 'effect', label: '効果'}
            ]},
        ].filter(function (technique) {
            return data.skills && data.skills.find(function (skill) {
                return skill.name == technique.name;
            });
        }).map(function (technique) {
            return (<TechniqueTable key={technique.path} data={data} path={technique.path} columns={technique.columns}
                    readOnly={readOnly} onChange={onChange} onAppend={onAppend} onRemove={onRemove}>
                    {technique.children || []}
                    </TechniqueTable>);
        })}
        </div>);
    }
});

module.exports = Technique;
