/**
 * Created by zhangshy on 2015/11/7.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var today = new Date();
var $ = require('jquery');

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
                { value: year, onChange: this.props.handleYearMonthChange.bind(null, "year") },
                years
            ),
            React.createElement(
                'select',
                { value: month, onChange: this.props.handleYearMonthChange.bind(null, "month") },
                months
            ),
            React.createElement('input', { type: 'button', value: '返回今天', onClick: this.props.handleReturnToday })
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

// 具体一天的布局
var CalendarDay = React.createClass({
    displayName: 'CalendarDay',

    handleMouseDown: function (e) {
        console.log('CalendarDays mousedown---------');
        var canvas = this.refs.perCanvas;
        drawing = true;
        var top = canvas.getBoundingClientRect().top;
        var left = canvas.getBoundingClientRect().left;
        currX = e.clientX - left;
        currY = e.clientY - top;
    },
    handleMouseUp: function (e) {
        console.log('CalendarDays mouseup==========');
        drawing = false;
    },
    handleMouseMove: function (e) {
        if (drawing) {
            var canvas = this.refs.perCanvas;
            var ctx = canvas.getContext("2d");
            var top = canvas.getBoundingClientRect().top;
            var left = canvas.getBoundingClientRect().left;
            prevX = currX;
            prevY = currY;
            currX = e.clientX - left;
            currY = e.clientY - top;
            console.log('CalendarDay mousemove!!', currX, ' ', currY);
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        }
    },
    render: function () {
        var pclass = "calendarDay " + this.props.status;
        var year = this.props.year;
        var month = this.props.month;
        var date = this.props.date;
        return React.createElement(
            'div',
            { className: pclass },
            React.createElement(
                'span',
                null,
                date
            ),
            React.createElement('canvas', { onClick: this.props.handleSelect.bind(null, year, month, date), onMouseDown: this.handleMouseDown, onMouseUp: this.handleMouseUp,
                onMouseMove: this.handleMouseMove,
                ref: 'perCanvas' })
        );
    }
});

// 当月所有天列表
var CalendarDays = React.createClass({
    displayName: 'CalendarDays',

    handleMouseMove: function (e) {
        e.preventDefault();
    },
    render: function () {
        var days = [];
        var year = this.props.year;
        var month = this.props.month;
        var dselect = this.props.dselect;
        var firstDate = new Date(year, month, 1); // 月第一天
        var lastDate = new Date(year, month + 1, 0); // 月最后一天
        console.log("month:", month, "first date:", firstDate.getDate(), "week:", firstDate.getDay());
        console.log("month:", month, "last date:", lastDate.getDate(), "week:", lastDate.getDay());
        var firstDateDay = firstDate.getDay(); // 第一天周几，0是周日，1是周一
        var lastDateDay = lastDate.getDay();
        var index = 0;
        if (firstDateDay != 0) {
            // 如果当月第一天不是星期天，在前面补充上个月的后几天。
            var previousMonthLastDate = new Date(year, month, 0);
            var end = previousMonthLastDate.getDate();
            var lyear, lmonth;
            month == 0 ? (lyear = year - 1, lmonth = 11) : (lyear = year, lmonth = month - 1);
            for (var i = end - firstDateDay + 1; i <= end; i++, index++) {
                days.push(React.createElement(CalendarDay, { year: lyear, month: lmonth, date: i, key: index, status: 'notCurrentMonth', handleSelect: this.props.handleSelect }));
            }
        }
        for (var i = 1; i <= lastDate.getDate(); i++, index++) {
            var status = "currentMonth";
            if (year == today.getFullYear() && month == today.getMonth() && i == today.getDate()) {
                status += " currentDay";
            }
            if (i == dselect) {
                status += " selectDay";
            }
            // 周末换行
            if ((i + firstDateDay) % 7 == 1) {
                status += " clearLef";
            }
            days.push(React.createElement(CalendarDay, { year: year, month: month, date: i, key: index, status: status, handleSelect: this.props.handleSelect }));
        }
        // 如果当月最后一天不是周六，在后面补充下个月的前几天
        if (lastDateDay != 6) {
            var lyear, lmonth;
            month == 11 ? (lyear = year + 1, lmonth = 0) : (lyear = year, lmonth = month + 1);
            for (var i = 1; i <= 6 - lastDateDay; i++, index++) {
                days.push(React.createElement(CalendarDay, { year: lyear, month: lmonth, date: i, key: index, status: 'notCurrentMonth', handleSelect: this.props.handleSelect }));
            }
        }
        console.log('total index;', index);
        return React.createElement(
            'div',
            { className: 'calendarDays', onMouseMove: this.handleMouseMove },
            days
        );
    }
});

var DayWeather = React.createClass({
    displayName: 'DayWeather',

    render: function () {
        if (typeof this.props.weather == 'undefined') return React.createElement('div', { className: 'dayWeather' });
        var weather = this.props.weather;
        var now = weather["now"];
        var aqi = weather["aqi"]["city"];
        console.log(weather["basic"]["update"]);
        console.log(now);
        console.log(aqi);
        return React.createElement(
            'div',
            { className: 'dayWeather' },
            '天气:',
            now["cond"]["txt"],
            '; pm:',
            aqi["aqi"],
            '; 空气质量:',
            aqi["qlty"],
            '; 温度:',
            now["tmp"],
            '; 更新:',
            weather["basic"]["update"]["loc"]
        );
    }
});

var DayPlan = React.createClass({
    displayName: 'DayPlan',

    render: function () {
        return React.createElement(
            'div',
            { className: 'dayPlan' },
            React.createElement(
                'p',
                null,
                this.props.year,
                '年',
                this.props.month,
                '月',
                this.props.dselect,
                '日'
            )
        );
    }
});

var DayShow = React.createClass({
    displayName: 'DayShow',

    getPM: function (city) {
        $.ajax({
            url: "http://apis.baidu.com/heweather/weather/free",
            data: {
                city: city
            },
            headers: { "apikey": "31ac18b28c025348f056bbb9efb47c06" },
            dataType: 'json',
            cache: false,
            success: (function (data) {
                var weather = data["HeWeather data service 3.0"][0];
                this.setState({ weather: weather });
            }).bind(this),
            error: (function (xhr, status, err) {
                console.error(status, err.toString());
            }).bind(this)
        });
    },
    componentDidMount: function () {
        this.getPM(this.state.city);
    },
    getInitialState: function () {
        return { city: "济南" };
    },
    render: function () {
        return React.createElement(
            'div',
            { className: 'dayShow clearLef' },
            React.createElement(DayWeather, { weather: this.state.weather }),
            React.createElement(DayPlan, { year: this.props.year, month: this.props.month, dselect: this.props.dselect })
        );
    }
});

var Calendar = React.createClass({
    displayName: 'Calendar',

    handleYearMonthChange: function (type, event) {
        switch (type) {
            case "year":
                year = event.target.value;
                this.setState({ year: parseInt(year) });
                break;
            case "month":
                month = event.target.value;
                this.setState({ month: parseInt(month) });
                break;
            default:
                console.log("type::::", type);
        }
    },
    handleSelect: function (year, month, dselect) {
        console.log("select:", dselect);
        this.setState({
            year: year,
            month: month,
            dselect: dselect
        });
    },
    handleReturnToday: function () {
        var data = this.getInitialState();
        this.setState(data);
    },
    getInitialState: function () {
        var month = today.getMonth();
        var year = today.getFullYear();
        var mdate = today.getDate(); // 月的第几天，[1-31]
        console.log("today:", year, month);
        return {
            year: year,
            month: month,
            dselect: mdate
        };
    },
    render: function () {
        return React.createElement(
            'div',
            { className: 'calendar' },
            React.createElement(CalendarMonth, { year: this.state.year, month: this.state.month, handleYearMonthChange: this.handleYearMonthChange,
                handleReturnToday: this.handleReturnToday }),
            React.createElement(CalendarHeader, null),
            React.createElement('div', { className: 'clear' }),
            React.createElement(CalendarDays, { year: this.state.year, month: this.state.month,
                dselect: this.state.dselect, handleSelect: this.handleSelect }),
            React.createElement(DayShow, { year: this.state.year, month: this.state.month, dselect: this.state.dselect })
        );
    }
});

var drawing = false;
var prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0;

ReactDOM.render(React.createElement(Calendar, null), document.getElementById('main'));