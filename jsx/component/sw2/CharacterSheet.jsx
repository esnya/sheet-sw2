'use strict';

var axios = require('axios');
var hash = require('../hash');
var Character = require('./Character');
var character = require('../../sw2/character');

module.exports = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        axios.get(this.props.url).then(function (response) {
            var c = new character(response.data);
            this.setState({
                data: c
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
    handleRemove: function (key) {
        hash.remove(this.state.data, key);
        this.forceUpdate();
    },
    render: function () {
        return (
            <div className="sw2-character-sheet">
                <header>
                    <h1><a href="#">{this.state.data.user_id}</a> / <a href="#">{this.state.data.name}</a></h1>
                    
                </header>
                <Character data={this.state.data} onChange={this.handleChange} onAppend={this.handleAppend} onRemove={this.handleRemove}/>
            </div>
        );
    }
});
