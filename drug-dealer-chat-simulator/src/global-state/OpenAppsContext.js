import { createContext, useState } from "react"
import { ALL_APPS } from "../services/app-manager"


export const OpenAppsContext = createContext()

// export default OpenAppsContext

export default function OpenAppsContextProvider({ children }) {
    const [openApps, setOpenApps] = useState([])  // Array of app configs
    
    function isAppOpen(nameOrCfg) {
        const name = nameOrCfg.name ?? nameOrCfg
        return openApps.find(app => app.name == name) != null
    }
    function openApp(nameOrCfg) {
        const name = nameOrCfg.name ?? nameOrCfg
        console.log('Opening app ' + name)
        if (isAppOpen(name)) {
            return
        }
        const newOpenApps = [...openApps, ALL_APPS[name]]
        setOpenApps(newOpenApps)
        console.log('Done')
    }
    function closeApp(nameOrCfg) {
        const name = nameOrCfg.name ?? nameOrCfg
        const newOpenApps = openApps.filter(appCfg => appCfg.name != name)
        setOpenApps(newOpenApps)
    }

    return <OpenAppsContext value={{ openApps, setOpenApps, isAppOpen, openApp, closeApp }}>
        { children }
    </OpenAppsContext>
}