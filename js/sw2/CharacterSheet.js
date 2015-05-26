'use strict';

module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", {class: "sw2-character-sheet"}, 
                React.createElement("header", null, 
                    React.createElement("h1", null, this.props.data.name)
                ), 
                "name"
            )
        );
    }
});

//# sourceMappingURL=../sw2/CharacterSheet.js.map