import OSDesktop from "../../../components-standalone/os/OSDesktopBackground/OSDesktopBackground";
import OSDesktopIcons from "../../../components-standalone/os/OSDesktopIcons/OSDesktopIcons";
import OSOpenApps from "../../../components-standalone/os/OSOpenApps/OSOpenApps";
import OSStartContextMenu from "../../../components-standalone/os/OSStartContextMenu/OSStartContextMenu";
import OSTaskBar from "../../../components-standalone/os/OSTaskBar/OSTaskBar";



export default function ComputerScene() {
    return <>
        <OSStartContextMenu/>
        <OSDesktop/>
        <OSDesktopIcons/>
        <OSTaskBar/>
        <OSOpenApps/>
    </>
}