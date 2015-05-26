'use strict';


var _counter = {};

var getId = function (prefix) {
    var n = _counter[prefix] = (_counter[prefix] || 0) + 1;
    return 'input-container-input-' + prefix + '-' + n;
}

module.exports = React.createClass({displayName: "exports",
    render: function () {
        var type = this.props.type || "text";
        var id = getId(type);

        return (
            React.createElement("div", {className: "input-container"}, 
                React.createElement("input", {id: id, type: type, value: this.props.value}), 
                React.createElement("label", {htmlFor: id}, this.props.label)
            )
        );
    }
});

//# sourceMappingURL=InputContainer.js.map