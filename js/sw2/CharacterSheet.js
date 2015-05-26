'use strict';

var Character = require('./Character');

module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", {className: "sw2-character-sheet"}, 
                React.createElement("header", null, 
                    React.createElement("h1", null, this.props.data.name)
                ), 
                React.createElement(Character, {data: this.props.data})
            )
        );
    }
});

//# sourceMappingURL=../sw2/CharacterSheet.js.map