import { useContext } from "react"
import { ALL_APPS } from "../../../services/app-manager"
import './OSStartContextMenu.css'
import StartContextMenuContext from "../../../global-state/StartContextMenuContext"
import ContextMenu from "../ContextMenu/ContextMenu"
import { OpenAppsContext } from "../../../global-state/OpenAppsContext"

function StartContextMenuItem({ appConfig }) {

    const { openApp } = useContext(OpenAppsContext)

    function onClick() {
        openApp(appConfig)
    }

    return (
        <div className='start-context-menu-item flex row os-highlight pointer' onClick={onClick}>
            <div>
                <img src={`/Icons/Apps/${appConfig.name}.png`}/>
            </div>
            <div className='padding-left-quarter'>
                {appConfig.name}
            </div>
        </div>
    )
}

export default function OSStartContextMenu() {

    const { isStartContextMenuOpen, setIsStartContextMenuOpen } = useContext(StartContextMenuContext)

    return <ContextMenu isOpen={isStartContextMenuOpen} setIsOpen={setIsStartContextMenuOpen}>
        <div className='start-context-menu'>
            <div className='top relative os-background width-100'>
                <div>Jaunty Jackalope</div>
                <input/>
            </div>
            <div className='bottom width-100'>
                { Object.keys(ALL_APPS).map(appName => (
                    <StartContextMenuItem appConfig={ALL_APPS[appName]}/>
                )) }
                { Object.keys(ALL_APPS).map(appName => (
                    <StartContextMenuItem appConfig={ALL_APPS[appName]}/>
                )) }
                { Object.keys(ALL_APPS).map(appName => (
                    <StartContextMenuItem appConfig={ALL_APPS[appName]}/>
                )) }
                { Object.keys(ALL_APPS).map(appName => (
                    <StartContextMenuItem appConfig={ALL_APPS[appName]}/>
                )) }
                { Object.keys(ALL_APPS).map(appName => (
                    <StartContextMenuItem appConfig={ALL_APPS[appName]}/>
                )) }
                { Object.keys(ALL_APPS).map(appName => (
                    <StartContextMenuItem appConfig={ALL_APPS[appName]}/>
                )) }
                { Object.keys(ALL_APPS).map(appName => (
                    <StartContextMenuItem appConfig={ALL_APPS[appName]}/>
                )) }
                { Object.keys(ALL_APPS).map(appName => (
                    <StartContextMenuItem appConfig={ALL_APPS[appName]}/>
                )) }
                { Object.keys(ALL_APPS).map(appName => (
                    <StartContextMenuItem appConfig={ALL_APPS[appName]}/>
                )) }
                { Object.keys(ALL_APPS).map(appName => (
                    <StartContextMenuItem appConfig={ALL_APPS[appName]}/>
                )) }
            </div>
        </div>
    </ContextMenu>
}