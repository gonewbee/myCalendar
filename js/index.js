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
                    '日'
                ),
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
                )
            )
        );
    }
});

var CalendarDay = React.createClass({
    render: function () {
        var pclass = "calendarDay " + this.props.state;
        var mdate = this.props.mdate;
        return React.createElement(
            'div',
            { className: pclass },
            mdate
        );
    }
});

var CalendarDays = React.createClass({
    render: function () {
        var days = [];
        var year = this.props.year;
        var month = this.props.month;
        var mdate = this.props.mdate;
        var firstDate = new Date(year, month, 1); // 月第一天
        var lastDate = new Date(year, month + 1, 0); // 月最后一天
        console.log(firstDate.getDate(), firstDate.getDay());
        console.log(lastDate.getDate(), lastDate.getDay());
        var firstDateDay = firstDate.getDay(); // 第一天周几，0是周日，1是周一
        var lastDateDay = lastDate.getDay();
        if (firstDateDay != 0) {
            var previousMonthLastDate = new Date(year, month, 0);
            var end = previousMonthLastDate.getDate();
            for (var i = end - firstDateDay + 1; i <= end; i++) {
                days.push(React.createElement(CalendarDay, { mdate: i, state: 'notCurrentMonth' }));
            }
        }
        for (var i = 1; i <= lastDate.getDate(); i++) {
            if (i == mdate) {
                days.push(React.createElement(CalendarDay, { mdate: i, state: 'currentMonth currentDay' }));
            } else {
                days.push(React.createElement(CalendarDay, { mdate: i, state: 'currentMonth' }));
            }
            if ((i + firstDateDay) % 7 == 0) {
                days.push(React.createElement('div', { className: 'clear' }));
            }
        }
        if (lastDateDay != 6) {
            for (var i = 1; i <= 6 - lastDateDay; i++) {
                days.push(React.createElement(CalendarDay, { mdate: i, state: 'notCurrentMonth' }));
            }
        }
        return React.createElement(
            'div',
            { className: 'calendarDays' },
            days
        );
    }
});

var Calendar = React.createClass({
    render: function () {
        var today = new Date();
        var month = today.getMonth();
        var year = today.getFullYear();
        var mdate = today.getDate();
        console.log(year, month);
        return React.createElement(
            'div',
            { className: 'calendar' },
            React.createElement(CalendarHeader, null),
            React.createElement('div', { className: 'clear' }),
            React.createElement(CalendarDays, { year: year, month: month, mdate: mdate })
        );
    }
});

ReactDOM.render(React.createElement(Calendar, null), document.getElementById('main'));