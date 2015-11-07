/**
 * Created by zhangshy on 2015/11/7.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var CalendarHeader = React.createClass({
    render: function() {
        return (
            <div className="calendarHeader">
                <ol className="calendarDays">
                    <li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li><li>日</li>
                </ol>
            </div>
        );
    }
});

ReactDOM.render(
    <CalendarHeader />,
    document.getElementById('main')
);