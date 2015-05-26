'use strict';

var InputContainer = require('./InputContainer');

module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("table", null, 
                React.createElement("thead", null, 
                    React.createElement("tr", null, this.props.keys.map(function (key) {
                        return (
                            React.createElement("th", null, key.label)
                        )
                    })), 
                    this.props.header
                ), 
                React.createElement("tbody", null, 
                    (this.props.data || []).map(function (line, index) {
                        return (
                            React.createElement("tr", null, this.props.keys.map(function (key) {
                                var onChange = function (value) {
                                    this.props.onChange(index, key.key, value);
                                }.bind(this);
                                return (
                                    React.createElement("td", null, React.createElement(InputContainer, {value: line[key.key], type: key.type, readOnly: key.readOnly, onChange: onChange}))
                                );
                            }.bind(this)))
                        );
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