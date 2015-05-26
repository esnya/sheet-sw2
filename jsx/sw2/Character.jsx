'use strict';

var InputContainer = require('../InputContainer');

module.exports = React.createClass({
    render: function () {
        var inputContainer = function (key, label) {
            var onChange =function (value) {
                this.props.onChange(key, value);
            }.bind(this); 

            return (
                <InputContainer label={label} value={this.props.data[key]} onChange={onChange}/>
            );
        }.bind(this);

        return (
            <div className="sw2-character">
                {inputContainer('name', '名前')}
                {inputContainer('race', '種族')}
            </div>
        );
    }
});
