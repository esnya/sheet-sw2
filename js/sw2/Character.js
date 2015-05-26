'use strict';

var InputContainer = require('../InputContainer');

module.exports = React.createClass({displayName: "exports",
    render: function () {
        var inputContainer = function (key, label) {
            var onChange =function (value) {
                this.props.onChange(key, value);
            }.bind(this); 

            return (
                React.createElement(InputContainer, {label: label, value: this.props.data[key], onChange: onChange})
            );
        }.bind(this);

        return (
            React.createElement("div", {className: "sw2-character"}, 
                inputContainer('name', '名前'), 
                inputContainer('race', '種族')
            )
        );
    }
});

//# sourceMappingURL=../sw2/Character.js.map