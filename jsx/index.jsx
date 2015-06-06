'use strict';

var SW2CharacterSheet = require('./component/sw2/CharacterSheet');
var React = require('react');

React.render(
    <SW2CharacterSheet url="sw2chara.json"/>,
    document.body
);
