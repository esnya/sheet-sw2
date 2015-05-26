'use strict';

var SW2CharacterSheet = require('./sw2/CharacterSheet');

var character = {
    name: "Mr. Test"
};

React.render(
    React.createElement(SW2CharacterSheet, {data: character}),
    document.body
);

//# sourceMappingURL=index.js.map