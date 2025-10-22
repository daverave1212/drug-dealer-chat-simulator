
import { useContext, useRef, useState } from 'react'
import { ALL_APPS } from '../../../services/app-manager'
import './OSDesktopIcons.css'
import { randomInt } from '../../../lib/utils'
import { OpenAppsContext } from '../../../global-state/OpenAppsContext'


function OSDesktopIcon({ appConfig }) {

    const {openApps, setOpenApps, isAppOpen, openApp, closeApp} = useContext(OpenAppsContext)
    const [isLoading, setIsLoading] = useState(false)

    const thisDOMElem = useRef(null)

    const { name } = appConfig

    function openThisApp(evt) {
        if (isAppOpen(name)) {
            return
        }
        document.body.style.cursor = 'wait'
        setIsLoading(true)
        setTimeout(() => {
            document.body.style.cursor = ''
            setIsLoading(false)
            openApp(name)
        }, randomInt(250, 1000))
    }

    return (
        <div ref={thisDOMElem} className={`os-desktop-icon os-highlight flex column center-content ${isLoading? 'loading': 'not-loading'}`} onClick={openThisApp}>
            <img src={`/Icons/Apps/${name}.png`}/>
            <div className='os-desktop-icon-text text-shadow font center-text'>{name}</div>
        </div>
    )

}


export default function OSDesktopIcons() {
    return (
        <div className="os-desktop-icons">
            { Object.keys(ALL_APPS).map(appName => (
                <OSDesktopIcon appConfig={ALL_APPS[appName]}/>
            )) }
        </div>
    )
}