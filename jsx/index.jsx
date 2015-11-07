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
                    <li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li><li>日</li>
                </ol>
            </div>
        );
    }
});

var CalendarDay = React.createClass({
    render: function() {
        var date = this.props.date;
        var mdate = date.getDate();
        var day = date.getDay();
        return(
            <div className="calendarDay">
                {mdate}
                <canvas></canvas>
            </div>
        );
    }
});

var CalendarDays = React.createClass({
    render: function() {
        var today = new Date();
        return(
            <div className="calendarDays">
                <CalendarDay date={today}/>
                <CalendarDay date={today}/>
            </div>
        );
    }
});

var Calendar = React.createClass({
    render: function () {
        return (
            <div className="calendar">
                <CalendarHeader />
                <div className="clear"></div>
                <CalendarDays/>
            </div>
        );
    }
});

ReactDOM.render(
    <Calendar />,
    document.getElementById('main')
);