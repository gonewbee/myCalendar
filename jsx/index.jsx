/**
 * Created by zhangshy on 2015/11/7.
 */

var React = require('react');
var ReactDOM = require('react-dom');

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

var CalendarDay = React.createClass({
    render: function() {
        var pclass = "calendarDay " + this.props.state;
        var mdate = this.props.mdate;
        return(
            <div className={pclass}>
                {mdate}
            </div>
        );
    }
});

var CalendarDays = React.createClass({
    render: function() {
        var days = [];
        var year = this.props.year;
        var month = this.props.month;
        var mdate = this.props.mdate;
        var firstDate = new Date(year, month, 1); // 月第一天
        var lastDate = new Date(year, month+1, 0); // 月最后一天
        console.log(firstDate.getDate(),firstDate.getDay());
        console.log(lastDate.getDate(),lastDate.getDay());
        var firstDateDay = firstDate.getDay(); // 第一天周几，0是周日，1是周一
        var lastDateDay = lastDate.getDay();
        if (firstDateDay!=0) {
            var previousMonthLastDate = new Date(year, month, 0);
            var end = previousMonthLastDate.getDate();
            for(var i=end-firstDateDay+1;i<=end;i++) {
                days.push(<CalendarDay mdate={i} state="notCurrentMonth"/>)
            }
        }
        for (var i=1; i<=lastDate.getDate(); i++) {
            if (i==mdate) {
                days.push(<CalendarDay mdate={i} state="currentMonth currentDay"/>);
            } else {
                days.push(<CalendarDay mdate={i} state="currentMonth"/>);
            }
            if ((i+firstDateDay)%7==0) {
                days.push(<div className="clear"></div>);
            }
        }
        if (lastDateDay!=6) {
            for (var i=1;i<=6-lastDateDay;i++) {
                days.push(<CalendarDay mdate={i} state="notCurrentMonth"/>)
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
    render: function () {
        var today = new Date();
        var month = today.getMonth();
        var year = today.getFullYear();
        var mdate = today.getDate();
        console.log(year,month);
        return (
            <div className="calendar">
                <CalendarHeader />
                <div className="clear"></div>
                <CalendarDays year={year} month={month} mdate={mdate}/>
            </div>
        );
    }
});

ReactDOM.render(
    <Calendar />,
    document.getElementById('main')
);