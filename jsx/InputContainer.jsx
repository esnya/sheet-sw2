'use strict';

var _counter = 0;

var getId = function (prefix) {
    return 'input-container-input-' + (++_counter);
};

module.exports = React.createClass({
    handleChange: function (event) {
        this.props.onChange(event.target.value);
    },
    render: function () {
        var type = this.props.type || "text";
        var id = getId(type);

        return (
            <div className="input-container">
                <input id={id} type={type} value={this.props.value} onChange={this.handleChange}/>
                <label htmlFor={id}>{this.props.label}</label>
            </div>
        );
    }
});
