'use strict';

var _counter = 0;

var getId = function (prefix) {
    return 'input-container-input-' + (++_counter);
};

module.exports = React.createClass({displayName: "exports",
    handleChange: function (event) {
        this.props.onChange(event.target.value);
    },
    render: function () {
        var type = this.props.type || "text";
        var id = getId(type);

        var contents = [];
        contents.push(
            React.createElement("input", {id: id, type: type, value: this.props.value, readOnly: this.props.readOnly, onChange: this.handleChange})
        );

        if (this.props.label) {
            contents.push(
                React.createElement("label", {htmlFor: id}, this.props.label) 
            );
        }

        return (
            React.createElement("div", {className: "input-container"}, 
                contents
            )
        );
    }
});

//# sourceMappingURL=InputContainer.js.map