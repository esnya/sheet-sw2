'use strict';

var SW2CharacterSheet = require('./sw2/CharacterSheet');

var character = {
    name: "Mr. Test",
    race: "人間"
};

React.render(
    <SW2CharacterSheet data={character}/>,
    document.body
);
