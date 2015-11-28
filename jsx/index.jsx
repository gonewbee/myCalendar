/**
 * Created by zhangshy on 2015/11/7.
 */

var React = require('react');
var ReactDOM = require('react-dom');

// 年和月份选择列表，在react中select可使用value
var CalendarMonth = React.createClass({
    render: function() {
        var year = this.props.year;
        var month = this.props.month;
        console.log("CalendarMonth",year,month);
        var years = [];
        var months = [];
        for (var start=year-10; start<year+10; start++) {
            years.push(<option value={start} key={start}>{start}年</option>);
        }
        for (var i=0;i<12;i++) {
            months.push(<option value={i} key={i}>{i+1}月</option>)
        }
        return (
            <div className="calendarMonth">
                <select value={year} onChange={this.props.handleYearMonthChange.bind(null, "year")}>
                    {years}
                </select>
                <select value={month} onChange={this.props.handleYearMonthChange.bind(null, "month")}>
                    {months}
                </select>
                <input type="button" value="返回今天" onClick={this.props.handleReturnToday}/>
            </div>
        );
    }
});

var CalendarHeader = React.createClass({
    render: function() {
        return (
            <div className="calendarHeader">
                <ol>
                    <li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>
                </ol>
            </div>
        );
    }
});

// 具体一天的布局
var CalendarDay = React.createClass({
    render: function() {
        var pclass = "calendarDay " + this.props.status;
        var mdate = this.props.date;
        return(
            <div className={pclass}>
                {mdate}
            </div>
        );
    }
});

// 当月所有天列表
var CalendarDays = React.createClass({
    render: function() {
        var days = [];
        var year = this.props.year;
        var month = this.props.month;
        var mdate = this.props.mdate;
        var firstDate = new Date(year, month, 1); // 月第一天
        var lastDate = new Date(year, month+1, 0); // 月最后一天
        console.log("month:", month, "first date:", firstDate.getDate(), "week:", firstDate.getDay());
        console.log("month:", month, "last date:", lastDate.getDate(), "week:", lastDate.getDay());
        var firstDateDay = firstDate.getDay(); // 第一天周几，0是周日，1是周一
        var lastDateDay = lastDate.getDay();
        var index = 0;
        if (firstDateDay!=0) {
            // 如果当月第一天不是星期天，在前面补充上个月的后几天。
            var previousMonthLastDate = new Date(year, month, 0);
            var end = previousMonthLastDate.getDate();
            for(var i=end-firstDateDay+1;i<=end;i++,index++) {
                days.push(<CalendarDay year={year} month={month} date={i} key={index} status="notCurrentMonth"/>)
            }
        }
        for (var i=1; i<=lastDate.getDate(); i++,index++) {
            var status = "currentMonth";
            if (i==mdate) {
                status += " currentDay";
            }
            // 周末换行
            if ((i+firstDateDay)%7==1) {
                status += " clearLef";
            }
            days.push(<CalendarDay year={year} month={month} date={i} key={index} status={status}/>)
        }
        // 如果当月最后一天不是周六，在后面补充下个月的前几天
        if (lastDateDay!=6) {
            for (var i=1;i<=6-lastDateDay;i++,index++) {
                days.push(<CalendarDay year={year} month={month} date={i} key={index} status="notCurrentMonth"/>)
            }
        }
        return(
            <div className="calendarDays">
                {days}
            </div>
        );
    }
});

var Calendar = React.createClass({
    handleYearMonthChange: function(type, event) {
        var year = this.state.year;
        var month = this.state.month;
        var mdate = this.state.mdate;
        switch (type) {
            case "year":
                year = event.target.value;
                break;
            case "month":
                month = event.target.value;
                break;
            default :
                console.log("type::::",type);
                return;
        }
        console.log(year,month,mdate);
        this.setState({
            year: parseInt(year),
            month: parseInt(month),
            mdate: parseInt(mdate)
        });
    },
    handleReturnToday: function() {
        var today = new Date();
        var month = today.getMonth();
        var year = today.getFullYear();
        var mdate = today.getDate(); // 月的第几天，[1-31]
        console.log("today:",year,month);
        this.setState({
            year: parseInt(year),
            month: parseInt(month),
            mdate: parseInt(mdate)
        });
    },
    getInitialState: function() {
        var today = new Date();
        var month = today.getMonth();
        var year = today.getFullYear();
        var mdate = today.getDate(); // 月的第几天，[1-31]
        console.log("today:",year,month);
        return {
            year: year,
            month: month,
            mdate: mdate
        };
    },
    render: function () {
        return (
            <div className="calendar">
                <CalendarMonth year={this.state.year} month={this.state.month} handleYearMonthChange={this.handleYearMonthChange}
                               handleReturnToday={this.handleReturnToday}/>
                <CalendarHeader />
                <div className="clear"></div>
                <CalendarDays year={this.state.year} month={this.state.month} mdate={this.state.mdate}/>
            </div>
        );
    }
});

ReactDOM.render(
    <Calendar />,
    document.getElementById('main')
);