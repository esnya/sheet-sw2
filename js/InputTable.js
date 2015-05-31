'use strict';

var InputContainer = require('./InputContainer');

module.exports = React.createClass({displayName: "exports",
    render: function () {
        var headline = this.props.keys.map(function (key) {
            return (
                    React.createElement("th", null, key.label)
                   )
        });
        if (!this.props.readOnly) {
            headline.push(React.createElement("th", null, React.createElement("button", {onClick: this.props.onAppend}, "+")));
        }
        return (
            React.createElement("table", null, 
                React.createElement("thead", null, 
                    React.createElement("tr", null, headline), 
                    this.props.header
                ), 
                React.createElement("tbody", null, 
                    (this.props.data || []).map(
                            function (line, index) {
                                var cols = this.props.keys.map(function (key) {
                                    var onChange = function (value) {
                                        this.props.onChange(index, key.key, value);
                                    }.bind(this);
                                    return (
                                            React.createElement("td", null, React.createElement(InputContainer, {value: line[key.key], type: key.type, options: key.options, readOnly: key.readOnly, onChange: onChange}))
                                           );
                                }.bind(this))

                                if (!this.props.readOnly && this.props.onRemove) {
                                    var handler = function () {
                                        this.props.onRemove(index);
                                    }.bind(this);
                                    cols.push(React.createElement("td", null, React.createElement("button", {onClick: handler}, "×")));
                                }
                        return (React.createElement("tr", null, cols));
                    }.bind(this))
               ), 
               React.createElement("tfoot", null, 
                    this.props.footer
               )
            )
        );
    }
});


//# sourceMappingURL=InputTable.js.map