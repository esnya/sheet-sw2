'use strict';

var React = require('react');
var mui = require('material-ui');
var Checkbox = mui.Checkbox;
var TextField = mui.TextField;
var DropDownMenu = mui.DropDownMenu;
var hash = require('../hash');

var Field = React.createClass({
    triggerChange: function (value) {
        if (this.props.onChange) {
            this.props.onChange(this.props.path, value);
        }
    },
    handleCheck: function (event, checked) {
        this.triggerChange(checked);
    },
    handleChange: function (event) {
        this.triggerChange(event.target.value);
    },
    handleChangeMenu: function (event, index, value) {
        this.triggerChange(value.payload || value);
    },
    render: function () {
        var data = this.props.data;
        var path = this.props.path;
        var type = this.props.type;
        var label = this.props.label;
        var readOnly = this.props.readOnly;
        var disabled = this.props.disabled;
        var multiline = this.props.multiline;

        var value = ('value' in this.props) ? this.props.value : hash.get(data, path);

        var width = type == 'select' ? '320px' : 'auto';

        var style = hash.merge({
            flex: '1 1 ' + width,
            width: width,
            margin: '0 8px'
        }, this.props.style || {});

        if (type == 'checkbox') {
            return (
                    <Checkbox
                        value={value}
                        floatingLabelText={label}
                        readOnly={readOnly}
                        disabled={disabled}
                        style={style}
                        onCheck={this.handleCheck} />
                   );
        } else if (type == 'select') {
            var options = this.props.options || [];

            var selectedIndex = Math.max(options.map(function (item) {
                return item.payload || item;
            }).indexOf(value), 0);

            if (options.length == 0) options = [{}];

            style.height = style.height || '40px';
            style.marginTop = style.marginLeft || '-4px';
            style.marginLeft = style.marginLeft || '-20px';
            style.marginRight = style.marginRight || '-20px';

            return (
                    <DropDownMenu
                        selectedIndex={selectedIndex}
                        menuItems={options}
                        floatingLabelText={label}
                        readOnly={readOnly}
                        disabled={disabled}
                        style={style}
                        onChange={this.handleChangeMenu} />
                   );
        } else {
            return (
                    <TextField
                        value={value}
                        floatingLabelText={label}
                        readOnly={readOnly}
                        disabled={disabled}
                        style={style}
                        onChange={this.handleChange} />
                   );
        }
    }
});

module.exports = Field;
