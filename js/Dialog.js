'use strict';

var Dialog = React.createClass({displayName: "Dialog",
    render: function () {
        var actions = (this.props.actions || ['閉じる']).map(function (action) {
            var handler = function () {
                this.props.onAction(action);
            }.bind(this);
            return (React.createElement("button", {onClick: handler}, action));
        }.bind(this));

        var className = 'dialog';
        if (!this.props.visible) {
            className += ' hidden';
        }

        return (
                React.createElement("div", {className: className}, 
                    React.createElement("div", {className: "screen"}), 
                    React.createElement("div", {className: "container"}, 
                        React.createElement("header", null, React.createElement("h1", null, this.props.title)), 
                        this.props.children, 
                        React.createElement("footer", null, actions)
                    )
                )
               );
    }
});

module.exports = Dialog;



//# sourceMappingURL=Dialog.js.map