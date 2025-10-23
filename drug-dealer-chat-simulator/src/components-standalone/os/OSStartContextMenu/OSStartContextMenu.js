import { useContext } from "react"
import { ALL_APPS } from "../../../services/app-manager"
import './OSStartContextMenu.css'
import StartContextMenuContext from "../../../global-state/StartContextMenuContext"
import ContextMenu from "../ContextMenu/ContextMenu"
import { OpenAppsContext } from "../../../global-state/OpenAppsContext"
import { useStorage } from "../../../services/web-system-bridge"
import { useUser } from "../../../global-state/AppData"
import { stopPropagation } from "../../../lib/utils"
import Icon from "../../../components/Icon/Icon"
import { CurrentSceneContext } from "../../../global-state/CurrentSceneContext"

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
    const { currentSceneName, setCurrentSceneName } = useContext(CurrentSceneContext)
    const [userData] = useUser()

    function onLogOff() {
        setCurrentSceneName('Room')
    }

    function onShutDown() {
        window.close()
    }


    return <ContextMenu isOpen={isStartContextMenuOpen} setIsOpen={setIsStartContextMenuOpen}>
        <div className='start-context-menu shadowed more'>
            <div className='top relative os-background darker width-100 padding-0'>
                <div className="flex row" style={{borderBottom: 'solid 1px gray'}}>
                    <div className="user-name">{ userData?.name }</div>
                    <div className="log-off os-highlight pointer flex row" onClick={onLogOff}>
                        <Icon src="/Icons/Log Off.png" style={{paddingTop: '1px'}}/>Log Off
                    </div>
                </div>
                <input onClick={stopPropagation}/>
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
            <div className="os-background darker padding-quarter os-highlight pointer" onClick={onShutDown} style={{borderTop: 'solid 1px gray', paddingLeft: '0.75rem', height: '2.5rem', paddingTop: '0.35rem'}}>
                <Icon src="/Icons/Shut Down.png" style={{paddingTop: '3px'}}/>Shut Down
            </div>
        </div>
    </ContextMenu>
}