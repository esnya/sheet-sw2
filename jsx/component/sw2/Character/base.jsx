'use strict';

var React = require('react');
var Card = require('../../card');
var Field = require('../../field.jsx');

var Basic = React.createClass({
    render: function () {
        var data = this.props.data;
        var readOnly = this.props.readOnly;
        var onChange = this.props.onChange;

        var rowStyle = {
            display: 'flex',
        };

        return (<Card className="base">
                    <div style={rowStyle}>
                        <Field path='name' label='名前' data={data} readOnly={readOnly} onChange={onChange} />
                        <Field path='race' label='種族' data={data} readOnly={readOnly} onChange={onChange} />
                    </div>
                    <div style={rowStyle}>
                        <Field path='sex' label='性別' data={data} readOnly={readOnly} onChange={onChange} />
                        <Field path='age' label='年齢' data={data} readOnly={readOnly} onChange={onChange} />
                    </div>
                    <div style={rowStyle}>
                        <Field path='experience' label='経験点' type='number' data={data} readOnly={readOnly} onChange={onChange} />
                        <Field path='total_experience' label='累計経験点' type='number' readOnly={true} data={data} readOnly={readOnly} onChange={onChange} />
                    </div>
                    <div style={rowStyle}>
                        <Field path='fumbles' label='1ゾロ' type='number' data={data} readOnly={readOnly} onChange={onChange} />
                        <Field path='growth_count' label='成長回数' type='number' readOnly={true} data={data} readOnly={readOnly} onChange={onChange} />
                    </div>
                    <div style={rowStyle}>
                        <Field path='campaign' label='キャンペーン' data={data} readOnly={readOnly} onChange={onChange} />
                        <Field path='nationality' label='生まれ' data={data} readOnly={readOnly} onChange={onChange} />
                    </div>
                    <div style={rowStyle}>
                        <Field path='level' label='冒険者レベル' type='number' readOnly={true} data={data} readOnly={readOnly} onChange={onChange} />
                    </div>
                </Card>);
    }
});

module.exports = Basic;
