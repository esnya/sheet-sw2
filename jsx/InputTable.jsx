'use strict';

var InputContainer = require('./InputContainer');

module.exports = React.createClass({
    render: function () {
        return (
            <table>
                <thead>
                    <tr>{this.props.keys.map(function (key) {
                        return (
                            <th>{key.label}</th>
                        )
                    })}</tr>
                    {this.props.header}
                </thead>
                <tbody>
                    {(this.props.data || []).map(function (line, index) {
                        return (
                            <tr>{this.props.keys.map(function (key) {
                                var onChange = function (value) {
                                    this.props.onChange(index, key.key, value);
                                }.bind(this);
                                return (
                                    <td><InputContainer value={line[key.key]} type={key.type} options={key.options} readOnly={key.readOnly} onChange={onChange}/></td>
                                );
                            }.bind(this))}</tr>
                        );
                    }.bind(this))}
               </tbody>
               <tfoot>
                    {this.props.footer}
               </tfoot>
            </table>
        );
    }
});

