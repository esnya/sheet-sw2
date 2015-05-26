'use strict';

var InputContainer = require('../InputContainer');

module.exports = React.createClass({displayName: "exports",
    render: function () {
        var data = this.props.data;

        return (
            React.createElement("div", {className: "sw2-character"}, 
                React.createElement(InputContainer, {label: "名前", value: data.name}), 
                React.createElement(InputContainer, {label: "種族", value: data.race})
            )
        );
    }
});

//# sourceMappingURL=../sw2/Character.js.map