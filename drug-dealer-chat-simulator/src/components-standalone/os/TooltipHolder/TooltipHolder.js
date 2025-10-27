import { useContext } from "react";
import { TooltipContext } from "../../../global-state/TooltipContext";


export default function TooltipHolder({ children, tooltip, className, style={} }) {
    const { setTooltipText } = useContext(TooltipContext)

    function onMouseEnter() {
        setTooltipText(tooltip)
    }
    function onMouseLeave() {
        setTooltipText(null)
    }

    return <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={'cursor-help ' + className} style={style}>
        { children }
    </div>
}