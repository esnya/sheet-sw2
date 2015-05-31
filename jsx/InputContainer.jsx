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
        var type = this.props.type || 'text';
        var id = getId(type);

        if (this.props.readOnly && type == 'number') {
            type = 'text';
        }

        var contents = [];
        contents.push(
            <input id={id} type={type} value={this.props.value} readOnly={this.props.readOnly} onChange={this.handleChange}/>
        );

        if (this.props.label) {
            contents.push(
                <label htmlFor={id}>{this.props.label}</label> 
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
            <div className={className}>
                {contents}
            </div>
        );
    }
});
