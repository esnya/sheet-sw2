'use strict';

var SW2CharacterSheet = require('./sw2/CharacterSheet');

var character = {
    name: "Mr. Test",
    race: "人間"
};

React.render(
    React.createElement(SW2CharacterSheet, {data: character}),
    document.body
);

//# sourceMappingURL=index.js.map