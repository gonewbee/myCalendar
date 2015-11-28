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
        var year = this.props.year;
        var month = this.props.month;
        var date = this.props.date;
        return(
            <div className={pclass} onClick={this.props.handleSelect.bind(null, year, month, date)}>
                {date}
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
            var lyear, lmonth;
            month==0 ? (lyear=year-1,lmonth=11) : (lyear=year, lmonth=month-1);
            for(var i=end-firstDateDay+1;i<=end;i++,index++) {
                days.push(<CalendarDay year={lyear} month={lmonth} date={i} key={index} status="notCurrentMonth" handleSelect={this.props.handleSelect}/>)
            }
        }
        for (var i=1; i<=lastDate.getDate(); i++,index++) {
            var status = "currentMonth";
            if (year==today.getFullYear() && month==today.getMonth() && i==mdate) {
                status += " currentDay";
            }
            if (i==this.props.dselect) {
                status += " selectDay";
            }
            // 周末换行
            if ((i+firstDateDay)%7==1) {
                status += " clearLef";
            }
            days.push(<CalendarDay year={year} month={month} date={i} key={index} status={status} handleSelect={this.props.handleSelect}/>)
        }
        // 如果当月最后一天不是周六，在后面补充下个月的前几天
        if (lastDateDay!=6) {
            var lyear, lmonth;
            month==11 ? (lyear=year+1,lmonth=0) : (lyear=year, lmonth=month+1);
            for (var i=1;i<=6-lastDateDay;i++,index++) {
                days.push(<CalendarDay year={lyear} month={lmonth} date={i} key={index} status="notCurrentMonth" handleSelect={this.props.handleSelect}/>)
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
        switch (type) {
            case "year":
                year = event.target.value;
                this.setState({year:parseInt(year)});
                break;
            case "month":
                month = event.target.value;
                this.setState({month:parseInt(month)});
                break;
            default :
                console.log("type::::",type);
        }
    },
    handleSelect: function(year, month, dselect) {
        console.log("select:", dselect);
        this.setState({
            year: year,
            month: month,
            dselect: dselect,
        });
    },
    handleReturnToday: function() {
        var month = today.getMonth();
        var year = today.getFullYear();
        var mdate = today.getDate(); // 月的第几天，[1-31]
        console.log("today:",year,month);
        this.setState({
            year: year,
            month: month,
            mdate: mdate,
            dselect: mdate,
        });
    },
    getInitialState: function() {
        var month = today.getMonth();
        var year = today.getFullYear();
        var mdate = today.getDate(); // 月的第几天，[1-31]
        console.log("today:",year,month);
        return {
            year: year,
            month: month,
            mdate: mdate,
            dselect: mdate,
        };
    },
    render: function () {
        return (
            <div className="calendar">
                <CalendarMonth year={this.state.year} month={this.state.month} handleYearMonthChange={this.handleYearMonthChange}
                               handleReturnToday={this.handleReturnToday}/>
                <CalendarHeader />
                <div className="clear"></div>
                <CalendarDays year={this.state.year} month={this.state.month} mdate={this.state.mdate}
                              dselect={this.state.dselect} handleSelect={this.handleSelect}/>
            </div>
        );
    }
});

var today = new Date();

ReactDOM.render(
    <Calendar />,
    document.getElementById('main')
);