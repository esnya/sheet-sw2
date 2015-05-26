'use strict';

var axios = require('axios');
var Character = require('./Character');

module.exports = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        axios.get(this.props.url).then(function (response) {
            this.setState({
                data: response.data
            });
        }.bind(this));
    },
    handleChange: function (key, newValue) {
        console.log(key + ': ' + this.state.data[key] + ' -> ' + newValue);
        this.state.data[key] = newValue;
        this.setState({
            data: this.state.data
        });
    },
    render: function () {
        return (
            <div className="sw2-character-sheet">
                <header>
                    <h1> {this.state.data.name} <span className="user-id">{this.state.data.user_id}</span></h1>
                    
                </header>
                <Character data={this.state.data} onChange={this.handleChange}/>
            </div>
        );
    }
});
