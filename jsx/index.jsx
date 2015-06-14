'use strict';

var SW2CharacterSheet = require('./component/sw2/charactersheet');
var React = require('react');

require("react-tap-event-plugin")();

React.render(
    <SW2CharacterSheet url="sw2chara.json"/>,
    document.body
);
