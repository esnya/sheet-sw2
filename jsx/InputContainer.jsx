'use strict';


var _counter = {};

var getId = function (prefix) {
    var n = _counter[prefix] = (_counter[prefix] || 0) + 1;
    return 'input-container-input-' + prefix + '-' + n;
}

module.exports = React.createClass({
    render: function () {
        var type = this.props.type || "text";
        var id = getId(type);

        return (
            <div className="input-container">
                <input id={id} type={type} value={this.props.value} />
                <label htmlFor={id}>{this.props.label}</label>
            </div>
        );
    }
});
