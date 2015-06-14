'use strict';

var React = require('react');
var Card = require('../../card');
var Field = require('../../field');
var Table = require('./table');
var skill = require('../../../sw2/skill');

var Honor = React.createClass({
    render: function () {
        var data = this.props.data;
        var readOnly = this.props.readOnly;
        var onChange = this.props.onChange;
        var onAppend = this.props.onAppend;
        var onRemove = this.props.onRemove;

        var rowStyle = {
            display: 'flex',
        };

        return (
                <Card className="honorable-item">
                    <Table data={data} path="honorable_items" cols={[
                        {path: 'name', label: '名誉アイテム'},
                        {path: 'value', label: '名誉点', type: 'number'}
                    ]} readOnly={readOnly} onChange={onChange} onAppend={onAppend} onRemove={onRemove}>
                        <tr>
                            <th>所持名誉点</th>
                            <td>
                                <Field path="honor" type="number" data={data} readOnly={readOnly} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th>合計名誉点</th>
                            <td>
                                <Field path="total_honor" type="number" data={data} readOnly={true}/>
                            </td>
                        </tr>
                    </Table>
                </Card>
               );
    }
});

module.exports = Honor;
