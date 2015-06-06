'use strict';

var Dialog = React.createClass({
    render: function () {
        var actions = (this.props.actions || ['閉じる']).map(function (action) {
            var handler = function () {
                this.props.onAction(action);
            }.bind(this);
            return (<button onClick={handler}>{action}</button>);
        }.bind(this));

        var className = 'dialog';
        if (!this.props.visible) {
            className += ' hidden';
        }

        return (
                <div className={className}>
                    <div className="container">
                        <header><h1>{this.props.title}</h1></header>
                        {this.props.children}
                        <footer>{actions}</footer>
                    </div>
                </div>
               );
    }
});

module.exports = Dialog;


