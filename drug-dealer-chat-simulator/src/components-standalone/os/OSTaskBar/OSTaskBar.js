
import './OSTaskBar.css'
import '../Styles/OSStyle.css'
import { ALL_APPS } from '../../../services/app-manager'
import { useContext } from 'react'
import StartContextMenuContext from '../../../global-state/StartContextMenuContext'
import { useGameCalendar, useGameClock, useUser } from '../../../global-state/AppData'
import { OpenAppsContext } from '../../../global-state/OpenAppsContext'
import { getMonthName } from '../../../lib/utils'

function StartMenu() {

    const { isStartContextMenuOpen, setIsStartContextMenuOpen } = useContext(StartContextMenuContext)

    function onClick(evt) {
        console.log('Opening')
        setIsStartContextMenuOpen(true)
    }

    return (
        <div className='start-menu relative flex row os-highlight fit-content pointer' style={{left: '0px', top: '0px'}} onClick={onClick}>
            <div className='padding-quarter padding-bottom-0'>
                <img src="/Icons/Home.png"/>
            </div>
            <div className='my-name padding-right-half'>Jaunty Jackalope</div>
        </div>
    )
}

function TaskBarInfo() {


    const { openApp } = useContext(OpenAppsContext)
    const [{ hours, minutes }] = useGameClock()
    const [{ year, month, day, weekday }] = useGameCalendar()

    const truncatedHour = hours < 10? '0' + hours: hours
    const monthName = getMonthName(month).substring(0, 3)

    function onCalendarClick() {
        openApp('Calendar')
    }

    return <div className='info flex'>
        <div className='calendar'>
            {weekday} {truncatedHour}:{minutes}
        </div>
        <div className='os-highlight padding-quarter padding-bottom-0' style={{paddingTop: '0.35rem'}} onClick={onCalendarClick}>
            <img src="/Icons/Apps/Calendar.png"/>
        </div>
        <div className='calendar'>
            {year} {monthName} {day}
        </div>
    </div>

}

function TaskBarWindows() {

    function TaskBarApp({appConfig}) {
        return <div className='task-bar-app flex row padding-right-half os-highlight'>
            <div className='padding-quarter padding-bottom-0' style={{paddingTop: '0.35rem'}}>
                <img src={`/Icons/Apps/${appConfig.name}.png`}/>
            </div>
            <div className='name'>
                [{appConfig.name}]
            </div>
        </div>
    }

    const { openApps } = useContext(OpenAppsContext)

    return <div className='flex row'>
        { openApps.map(appConfig => <TaskBarApp appConfig={appConfig}/>) }
    </div>
}

export default function OSTaskBar({ children }) {

    return (
        <div className="os-task-bar os-background relative unselectable">
            <div className='flex row'>
                <StartMenu/>
                <TaskBarWindows/>
            </div>
            <TaskBarInfo/>
        </div>
    )
}