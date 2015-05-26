'use strict';

var InputContainer = require('../InputContainer');

module.exports = React.createClass({
    render: function () {
        var data = this.props.data;

        return (
            <div className="sw2-character">
                <InputContainer label="名前" value={data.name} />
                <InputContainer label="種族" value={data.race} />
            </div>
        );
    }
});
