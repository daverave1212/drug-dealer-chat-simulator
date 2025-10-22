
import './OSTaskBar.css'
import '../Styles/OSStyle.css'
import { ALL_APPS } from '../../../services/app-manager'
import { useContext } from 'react'
import StartContextMenuContext from '../../../global-state/StartContextMenuContext'

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

export default function OSTaskBar({ children }) {

    return (
        <div className="os-task-bar os-background relative unselectable">
            <StartMenu/>
        </div>
    )
}