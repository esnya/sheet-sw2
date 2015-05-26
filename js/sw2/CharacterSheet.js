'use strict';

var axios = require('axios');
var Character = require('./Character');

module.exports = React.createClass({displayName: "exports",
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
            React.createElement("div", {className: "sw2-character-sheet"}, 
                React.createElement("header", null, 
                    React.createElement("h1", null, this.state.data.name)
                ), 
                React.createElement(Character, {data: this.state.data})
            )
        );
    }
});

//# sourceMappingURL=../sw2/CharacterSheet.js.map