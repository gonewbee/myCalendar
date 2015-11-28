/**
 * Created by zhangshy on 2015/11/7.
 */

var React = require('react');
var ReactDOM = require('react-dom');

// 年和月份选择列表，在react中select可使用value
var CalendarMonth = React.createClass({
    displayName: 'CalendarMonth',

    render: function () {
        var year = this.props.year;
        var month = this.props.month;
        console.log("CalendarMonth", year, month);
        var years = [];
        var months = [];
        for (var start = year - 10; start < year + 10; start++) {
            years.push(React.createElement(
                'option',
                { value: start, key: start },
                start,
                '年'
            ));
        }
        for (var i = 0; i < 12; i++) {
            months.push(React.createElement(
                'option',
                { value: i, key: i },
                i + 1,
                '月'
            ));
        }
        return React.createElement(
            'div',
            { className: 'calendarMonth' },
            React.createElement(
                'select',
                { value: year, onChange: this.props.handleYearChange },
                years
            ),
            React.createElement(
                'select',
                { value: month, onChange: this.props.handleMonthChange },
                months
            )
        );
    }
});

var CalendarHeader = React.createClass({
    displayName: 'CalendarHeader',

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

// 某一天
var CalendarDay = React.createClass({
    displayName: 'CalendarDay',

    render: function () {
        var pclass = "calendarDay " + this.props.status;
        var mdate = this.props.mdate;
        return React.createElement(
            'div',
            { className: pclass },
            mdate
        );
    }
});

// 当月所有天列表
var CalendarDays = React.createClass({
    displayName: 'CalendarDays',

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
        var index = 0;
        if (firstDateDay != 0) {
            // 如果当月第一天不是星期天，在前面补充上个月的后几天。
            var previousMonthLastDate = new Date(year, month, 0);
            var end = previousMonthLastDate.getDate();
            for (var i = end - firstDateDay + 1; i <= end; i++, index++) {
                days.push(React.createElement(CalendarDay, { mdate: i, key: index, status: 'notCurrentMonth' }));
            }
        }
        for (var i = 1; i <= lastDate.getDate(); i++, index++) {
            var status = "currentMonth";
            if (i == mdate) {
                status += " currentDay";
            }
            // 周末换行
            if ((i + firstDateDay) % 7 == 1) {
                status += " clearLef";
            }
            days.push(React.createElement(CalendarDay, { mdate: i, key: index, status: status }));
        }
        // 如果当月最后一天不是周六，在后面补充下个月的前几天
        if (lastDateDay != 6) {
            for (var i = 1; i <= 6 - lastDateDay; i++, index++) {
                days.push(React.createElement(CalendarDay, { mdate: i, key: index, status: 'notCurrentMonth' }));
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
    displayName: 'Calendar',

    handleYearChange: function (event) {
        var year = event.target.value;
        var month = this.state.month;
        var mdate = this.state.mdate;
        console.log(year, month, mdate);
        this.setState({
            year: parseInt(year),
            month: parseInt(month),
            mdate: parseInt(mdate)
        });
    },
    handleMonthChange: function (event) {
        var year = this.state.year;
        var month = event.target.value;
        var mdate = this.state.mdate;
        console.log(year, month, mdate);
        this.setState({
            year: parseInt(year),
            month: parseInt(month),
            mdate: parseInt(mdate)
        });
    },
    getInitialState: function () {
        var today = new Date();
        var month = today.getMonth();
        var year = today.getFullYear();
        var mdate = today.getDate(); // 月的第几天，[1-31]
        console.log(year, month);
        return {
            year: year,
            month: month,
            mdate: mdate
        };
    },
    render: function () {
        return React.createElement(
            'div',
            { className: 'calendar' },
            React.createElement(CalendarMonth, { year: this.state.year, month: this.state.month, handleYearChange: this.handleYearChange, handleMonthChange: this.handleMonthChange }),
            React.createElement(CalendarHeader, null),
            React.createElement('div', { className: 'clear' }),
            React.createElement(CalendarDays, { year: this.state.year, month: this.state.month, mdate: this.state.mdate })
        );
    }
});

ReactDOM.render(React.createElement(Calendar, null), document.getElementById('main'));