'use strict';

var Character = require('./Character');

module.exports = React.createClass({
    render: function () {
        return (
            <div className="sw2-character-sheet">
                <header>
                    <h1>{this.props.data.name}</h1>
                </header>
                <Character data={this.props.data} />
            </div>
        );
    }
});
