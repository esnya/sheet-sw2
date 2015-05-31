'use strict';

var InputContainer = require('./InputContainer');

module.exports = React.createClass({
    render: function () {
        var headline = this.props.keys.map(function (key) {
            return (
                    <th>{key.label}</th>
                   )
        });
        if (!this.props.readOnly) {
            headline.push(<th><button onClick={this.props.onAppend}>+</button></th>);
        }
        return (
            <table>
                <thead>
                    <tr>{headline}</tr>
                    {this.props.header}
                </thead>
                <tbody>
                    {(this.props.data || []).map(
                            function (line, index) {
                                var cols = this.props.keys.map(function (key) {
                                    var onChange = function (value) {
                                        this.props.onChange(index, key.key, value);
                                    }.bind(this);
                                    return (
                                            <td><InputContainer value={line[key.key]} type={key.type} options={key.options} readOnly={key.readOnly} onChange={onChange}/></td>
                                           );
                                }.bind(this))

                                if (!this.props.readOnly && this.props.onRemove) {
                                    var handler = function () {
                                        this.props.onRemove(index);
                                    }.bind(this);
                                    cols.push(<td><button onClick={handler}>×</button></td>);
                                }
                        return (<tr>{cols}</tr>);
                    }.bind(this))}
               </tbody>
               <tfoot>
                    {this.props.footer}
               </tfoot>
            </table>
        );
    }
});

