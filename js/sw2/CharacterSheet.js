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
    handleChange: function (key, newValue) {
        console.log(key + ': ' + this.state.data[key] + ' -> ' + newValue);
        this.state.data[key] = newValue;
        this.setState({
            data: this.state.data
        });
    },
    render: function () {
        return (
            React.createElement("div", {className: "sw2-character-sheet"}, 
                React.createElement("header", null, 
                    React.createElement("h1", null, React.createElement("a", {href: "#"}, this.state.data.user_id), " / ", React.createElement("a", {href: "#"}, this.state.data.name))
                    
                ), 
                React.createElement(Character, {data: this.state.data, onChange: this.handleChange})
            )
        );
    }
});

//# sourceMappingURL=../sw2/CharacterSheet.js.map