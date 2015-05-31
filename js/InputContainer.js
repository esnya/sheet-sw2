'use strict';

var _counter = 0;

var getId = function (prefix) {
    return 'input-container-input-' + (++_counter);
};

module.exports = React.createClass({displayName: "exports",
    handleChange: function (event) {
        var target = event.target;
        this.props.onChange(target.type == 'checkbox' ? target.checked : target.value);
    },
    render: function () {
        var type = this.props.type || 'text';
        var id = getId(type);

        if (this.props.readOnly && type != 'text') {
            type = 'text';
        }

        var contents = [];
        if (!this.props.readOnly && type == 'select') {
            var options = this.props.options.map(function (option) {
                return option.options
                    ? (React.createElement("optgroup", {label: option.name}, 
                        option.options.map(function (option) {
                            return (React.createElement("option", {value: option}, option));
                        })
                    ))
                    : (React.createElement("option", {value: option}, option))
            });
            contents.push(
                    React.createElement("select", {id: id, value: this.props.value, readOnly: this.props.readOnly, onChange: this.handleChange}, 
                        options
                    )
                    );
        } else {
            contents.push(
                    React.createElement("input", {id: id, type: type, value: this.props.value, readOnly: this.props.readOnly, onChange: this.handleChange, checked: type == 'checkbox' && this.props.value})
                    );
        }

        if (this.props.label) {
            contents.push(
                React.createElement("label", {htmlFor: id}, this.props.label) 
            );
        }

        var className = 'input-container';

        if (this.props.value == null || this.props.value == '') {
            className += ' empty';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        if (this.props.readOnly && this.props.type == 'number') {
            className += ' right';
        }

        return (
            React.createElement("div", {className: className}, 
                contents
            )
        );
    }
});

//# sourceMappingURL=InputContainer.js.map