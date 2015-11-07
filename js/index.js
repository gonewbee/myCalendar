/**
 * Created by zhangshy on 2015/11/7.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var CalendarHeader = React.createClass({
    render: function () {
        return React.createElement(
            'div',
            { className: 'calendarHeader' },
            React.createElement(
                'ol',
                null,
                React.createElement(
                    'li',
                    null,
                    '一'
                ),
                React.createElement(
                    'li',
                    null,
                    '二'
                ),
                React.createElement(
                    'li',
                    null,
                    '三'
                ),
                React.createElement(
                    'li',
                    null,
                    '四'
                ),
                React.createElement(
                    'li',
                    null,
                    '五'
                ),
                React.createElement(
                    'li',
                    null,
                    '六'
                ),
                React.createElement(
                    'li',
                    null,
                    '日'
                )
            )
        );
    }
});

var CalendarDay = React.createClass({
    render: function () {
        var day = this.props.date.getDay();
        return React.createElement(
            'div',
            { className: 'calendarDay' },
            day
        );
    }
});

var Calendar = React.createClass({
    render: function () {
        var today = new Date();
        return React.createElement(
            'div',
            { className: 'calendar' },
            React.createElement(CalendarHeader, null),
            React.createElement(CalendarDay, { date: today })
        );
    }
});

ReactDOM.render(React.createElement(Calendar, null), document.getElementById('main'));
