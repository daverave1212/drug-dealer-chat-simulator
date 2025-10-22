import { useContext } from "react"
import { OpenAppsContext } from "../../../global-state/OpenAppsContext"
import OSWindow from "../OSWindow/OSWindow"



export default function OSOpenApps() {

    const openAPpsCOntext = useContext(OpenAppsContext)

    console.log(openAPpsCOntext)

    return <>
        { openAPpsCOntext.openApps.map(app => (
            <OSWindow config={app}>
              { app.component }
            </OSWindow>
        )) }
    </>
}