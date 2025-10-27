import TooltipHolder from "../../components-standalone/os/TooltipHolder/TooltipHolder"
import { EVENTS_BY_MONTH_AND_DAY } from "../../game/calendar-events"
import { useGameCalendar } from "../../global-state/AppData"
import { getDaysInMonth, getDaysInMonthPaddedWithExtraDays, getMonthName, groupBy, splitArrayIntoChunks } from "../../lib/utils"

import './Calendar.css'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function Calendar() {

    const [{ year, month, day }] = useGameCalendar()
    const today = day

    const daysInCalendar = getDaysInMonthPaddedWithExtraDays(year, month, 7)
    let firstSundayIndex = daysInCalendar.findIndex(d => d.weekday == WEEKDAYS[0])
    if (firstSundayIndex == 0) {
        firstSundayIndex = 7
    }

    const daysInCalendarFixedFront = daysInCalendar.slice(firstSundayIndex)

    const lastSaturdayIndex = daysInCalendarFixedFront.findLastIndex(d => d.weekday == WEEKDAYS[6])
    
    const daysInCalendarAllFixed = daysInCalendarFixedFront.slice(0, lastSaturdayIndex + 1)
    for (const dayInCalendar of daysInCalendarAllFixed) {
        if (dayInCalendar.day < day) {
            dayInCalendar.isInThePast = true
        }
    }

    const daysByWeek = splitArrayIntoChunks(daysInCalendarAllFixed, 7)

    const currentMonthName = getMonthName(month)

    return <div className="calendar flex column center-text">
        <div className="top verdana">
            <div className="text">{ currentMonthName }&nbsp;&nbsp;{ year }</div>
        </div>
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                    { daysByWeek.map((week, i) => (
                        <tr key={i}>
                            { week.map(day => (
                                <td className={`
                                    ${!day.isInTargetMonth? 'outside-this-month in-the-past': ''}
                                    ${day.isInThePast? 'in-the-past': ''}
                                    ${day.day == today? 'today': ''}
                                `}>
                                    { day.month in EVENTS_BY_MONTH_AND_DAY && day.day in EVENTS_BY_MONTH_AND_DAY[day.month]? (
                                        <TooltipHolder tooltip={EVENTS_BY_MONTH_AND_DAY[day.month][day.day].name}>
                                            { day.day }
                                        </TooltipHolder>
                                    ): (
                                        day.day
                                    )}
                                </td>
                            ))}
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    </div>
}


export const CALENDAR_CONFIG = {
    name: 'Calendar',
    menuItems: [
        { name: 'Help' }
    ],
    component: <Calendar/>
}