'use strict';

var React = require('react');
var axios = require('axios');
var hash = require('../../hash');
var Character = require('./character');
var character = require('../../sw2/character');
var AppBar = require('material-ui/lib/app-bar');
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');

var CharacterSheet = React.createClass({
    childContextTypes: {
          muiTheme: React.PropTypes.object
    },
    getInitialState: function () {
        return {data: {}};
    },
    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        }
    },
    componentDidMount: function () {
        axios.get(this.props.url).then(function (response) {
            var c = new character(response.data);
            this.setState({
                data: c//response.data
            });
        }.bind(this));
    },
    handleChange: function (key, newValue) {
        hash.set(this.state.data, key, newValue);
        this.forceUpdate();
    },
    handleAppend: function (key) {
        this.state.data.append(key);
        this.forceUpdate();
    },
    handleRemove: function (key, index) {
        this.state.data.remove(key, index);
        this.forceUpdate();
    },
    componentWillMount: function() {
        ThemeManager.setPalette({
            accent1Color: Colors.deepOrange500
        });
    },
    render: function () {
        document.title = this.state.data.name;
        return (
            <div className="sw2-character-sheet">
                <AppBar title={this.state.data.user_id + ' / ' + this.state.data.name} iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                <Character data={this.state.data} onChange={this.handleChange} onAppend={this.handleAppend} onRemove={this.handleRemove}/>
            </div>
        );
    }
});

module.exports = CharacterSheet;
