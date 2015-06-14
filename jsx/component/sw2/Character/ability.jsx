'use strict';

var mui = require('material-ui');
var Dialog = mui.Dialog;
var FlatButton = mui.FlatButton;
var React = require('react');
var Rader = require('../rader');
var Card = require('../../card');
var Field = require('../../field');

var Row = React.createClass({
    render: function () {
        var index = this.props.index;
        var data = this.props.data;
        var readOnly = this.props.readOnly;
        var onChange = this.props.onChange;

        var cols = [];

        if (index % 2 == 0) cols.push(<th key="header3" rowSpan="2">{'技体心'.charAt(index / 2)}</th>);
        cols.push(<th key="header">{['器', '敏', '筋', '生', '知', '精'][index]}</th>);

        if (index % 2 == 0) {
            cols.push(<td key="base3" rowSpan="2">
                    <Field path={'ability.base3.' + index / 2} data={data} type="number" readOnly={readOnly} onChange={onChange} />
                </td>);
        }
        cols.push(<td key="base">
                <Field path={'ability.base.' + index} data={data} type="number" readOnly={readOnly} onChange={onChange} />
            </td>);
        cols.push(<td key="growth">
                <Field path={'ability.growth.' + index} data={data} type="number" readOnly={readOnly} onChange={onChange} />
            </td>);
        cols.push(<td key="sum">
                <Field path={'ability.sum.' + index} data={data} type="number" readOnly={true} onChange={onChange} />
            </td>);
        cols.push(<td key="bonus">
                <Field path={'ability.bonus.' + index} data={data} type="number" readOnly={true} onChange={onChange} />
            </td>);

        return (<tr>{cols}</tr>);
    }
});

var Ability = React.createClass({
    handleEdit: function () {
        this.refs.dialog.show();
    },
    render: function () {
        var data = this.props.data;
        var readOnly = this.props.readOnly;
        var onChange = this.props.onChange;

        var rows = [];
        for (var i = 0; i < 6; ++i) {
            rows.push(<Row key={i} index={i} data={data} readOnly={readOnly} onChange={onChange} />);
        }
        
        return (
            <Card className="ability" style={{textAlign: 'center'}}>
                <Rader data={this.props.data} style={{margin: 'auto'}}/>
                <FlatButton onClick={this.handleEdit}>✎</FlatButton>
                <Dialog ref="dialog" title="能力値" actions={[{text: '閉じる'}]}>
                    <table>
                        <thead>
                            <tr key="header">
                                <th></th>
                                <th></th>
                                <th colSpan="2">基本値</th>
                                <th>成長</th>
                                <th>補正</th>
                                <th>能力値</th>
                                <th>ボーナス</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </Dialog>
            </Card>
        );
    }
});

module.exports = Ability;
