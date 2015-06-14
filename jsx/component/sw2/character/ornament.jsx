'use strict';

var React = require('react');
var Card = require('../../card');
var Field = require('../../field');

var Ornament = React.createClass({
    render: function () {
        var data = this.props.data;
        var readOnly = this.props.readOnly;
        var onChange = this.props.onChange;
        var onAppend = this.props.onAppend;
        var onRemove = this.props.onRemove;

        var ornaments = ['頭', '耳', '首', '顔', '背中', '右手', '左手', '腰', '足', 'その他']
            .map(function (label, index) {
                return (
                        <tr key={index}>
                            <td>{label}</td>
                            <td>
                                <Field data={data} path={'ornaments[' + index + '].name'}
                                    readOnly={readOnly} onChange={onChange} />
                            </td>
                            <td>
                                <Field data={data} path={'ornaments[' + index + '].effect'}
                                    readOnly={readOnly} onChange={onChange} />
                            </td>
                        </tr>
                       );
            });

        return (
               <Card className="ornament">
                   <table>
                       <thead>
                           <tr>
                               <th></th>
                               <th>装飾品</th>
                               <th>効果</th>
                           </tr>
                       </thead>
                       <tbody>
                           {ornaments}
                       </tbody>
                   </table>
               </Card>
               );
    }
});

module.exports = Ornament;


