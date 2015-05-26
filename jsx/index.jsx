'use strict';

var SW2CharacterSheet = require('./sw2/CharacterSheet');

var character = {
    name: "Mr. Test"
};

React.render(
    <SW2CharacterSheet data={character}/>,
    document.body
);
