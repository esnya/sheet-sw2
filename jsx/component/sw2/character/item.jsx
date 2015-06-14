'use strict';

var React = require('react');
var Card = require('../../card');
var Field = require('../../field');
var Row = require('../../row');
var Table = require('./table');
var skill = require('../../../sw2/skill');

var Item = React.createClass({
    render: function () {
        var data = this.props.data;
        var readOnly = this.props.readOnly;
        var onChange = this.props.onChange;
        var onAppend = this.props.onAppend;
        var onRemove = this.props.onRemove;

        return (
                <Row minWidth="992">
                    <Card className="inventory">
                        <Row>
                            <Field path="inventory" label="所持品" multiline={true}
                                data={data} readOnly={readOnly} onChange={onChange} />
                        </Row>
                    </Card>
                    <Card className="supply">
                        <Table data={data} path="supplies" cols={[
                            {path: 'name', label: '消耗品'},
                            {path: 'count', label: '数', type: 'number'}
                        ]} readOnly={readOnly} onChange={onChange} onAppend={onAppend} onRemove={onRemove}/>
                    </Card>
                </Row>
              );
    }
});

module.exports = Item;


