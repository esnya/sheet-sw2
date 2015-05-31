'use strict';

module.exports = React.createClass({
    getInitialState: function () {
        return {
            selected: (this.props.selected == null) ? -1 : this.props.selected
        }
    },
    getActionHandler: function (action, i) {
        return function (event) {
            event.preventDefault();
            this.props.onAction(action, i);
        }.bind(this);
    },
    render: function () {
        var Page = this.props.page;
        var title = this.props.title || 'title';
        var selected = (this.state.selected == null) ? -1 : this.state.selected;

        var titles = (this.props.data || []).map(function (data, i) {
            var className = i == selected ? 'active' : '';

            var handler = function (event) {
                event.preventDefault();

                this.setState({
                    selected: i
                });
            }.bind(this);

            return (<li className={className}><a href="#" onClick={handler}>{data[title]}</a></li>);
        }.bind(this));

        var actions = (this.props.actions || []).map(function (action, i) {
            return (<li className="action"><a href="#" onClick={this.getActionHandler(action, i)}>{action}</a></li>);
        }.bind(this));

        var pages = (this.props.data || []).map(function (data, i) {
            var className = 'page';

            if (i == this.state.selected) {
                className += ' active';
            }

            return (
                    <div className={className}>
                        <Page data={data} index={i} options={this.props.pageOptions || {}} />
                    </div>
                    );
        }.bind(this));

        return (
                <div className="tab">
                    <nav>
                        <ul>
                            {titles}
                            <li className="pading" />
                            {actions}
                        </ul>
                    </nav>
                    <div className="pages">{pages}</div>
                </div>
               );
    }
});
