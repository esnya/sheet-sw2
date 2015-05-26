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

        var contents = [];
        contents.push(
            <input id={id} type={type} value={this.props.value} readOnly={this.props.readOnly} onChange={this.handleChange}/>
        );

        if (this.props.label) {
            contents.push(
                <label htmlFor={id}>{this.props.label}</label> 
            );
        }

        return (
            <div className="input-container">
                {contents}
            </div>
        );
    }
});
