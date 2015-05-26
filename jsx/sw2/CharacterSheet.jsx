'use strict';

var axios = require('axios');
var Character = require('./Character');

module.exports = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        axios.get(this.props.url).then(function (response) {
            this.setState({
                data: response.data
            });
        }.bind(this));
    },
    render: function () {
        return (
            <div className="sw2-character-sheet">
                <header>
                    <h1>{this.state.data.name}</h1>
                </header>
                <Character data={this.state.data} />
            </div>
        );
    }
});
