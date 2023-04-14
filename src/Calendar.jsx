import React from "react";
import PropsTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';

function Calendar(props) {
    const {date} = props;
    const dayWeek = moment(date).format('dddd');
    const dayNumber = moment(date).format('D');
    const monthWithDeclension = moment(date).format('D MMMM').split(' ')[1];
    const fullYear = moment(date).format('YYYY');
    const month = moment(date).format('MMMM');
    
    const arrayVisibleDays = [];
    const startVisibleDay = moment(date).startOf('month').startOf('week');
    
    for(let i = 1; i <= 5 * 7; i++) {
        const currentDate = startVisibleDay.clone().add(i, 'day');
        arrayVisibleDays.push({
            day: currentDate.date(),
            isOtherMonth: moment(currentDate).format('MMMM') !== month,
            isCurrentDate: moment(currentDate).format('D MMMM') === moment(date).format('D MMMM'),
        });
    }

    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{dayWeek}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{dayNumber}</div>
                    <div className="ui-datepicker-material-month">{monthWithDeclension}</div>
                    <div className="ui-datepicker-material-year">{fullYear}</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                <span className="ui-datepicker-month">{month}</span>&nbsp;<span className="ui-datepicker-year">{fullYear}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col className="ui-datepicker-week-end" />
                    <col className="ui-datepicker-week-end" />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Пн</th>
                        <th scope="col" title="Вторник">Вт</th>
                        <th scope="col" title="Среда">Ср</th>
                        <th scope="col" title="Четверг">Чт</th>
                        <th scope="col" title="Пятница">Пт</th>
                        <th scope="col" title="Суббота">Сб</th>
                        <th scope="col" title="Воскресенье">Вс</th>
                    </tr>
                </thead>
                <tbody>
                    { new Array(5).fill(0).map((week, i) => (
                        <tr key={Date.now() + i*3}>
                            {arrayVisibleDays.slice(i*7, i*7 + 7).map((day, i) => (
                                <td className={day.isOtherMonth ? 'ui-datepicker-other-month' : day.isCurrentDate ? 'ui-datepicker-today' : null} 
                                    key={Date.now() + i*5}>
                                    {day.day}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

Calendar.propsTypes = {
    date: PropsTypes.object.isRequired
}

export default Calendar;