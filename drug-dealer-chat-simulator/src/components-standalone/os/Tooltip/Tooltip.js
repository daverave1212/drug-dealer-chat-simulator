import { useContext, useEffect } from "react"
import { TooltipContext } from "../../../global-state/TooltipContext"
import { MousePositionContext } from "../../../global-state/MousePositionContext"
import './Tooltip.css'
import Icon from "../../../components/Icon/Icon"

export default function Tooltip({ children, className, style={} }) {

    const { tooltipText } = useContext(TooltipContext)
    const { mousePosition } = useContext(MousePositionContext)

    if (tooltipText == null) {
        return <></>
    }

    console.log(`Tooltip updated: ${tooltipText} at ${mousePosition.x},${mousePosition.y}`)

    return <div className={`tooltip absolute pointer os-background shadowed darker ${className}`} style={{
        left: `${mousePosition.x + 15}px`,
        top: `${mousePosition.y + 5}px`,
        pointerEvents: 'none',
        ...style
    }}>
        <div className="content">
            <Icon src="/Icons/Tooltip.png" style={{paddingTop: '3px'}} />{ tooltipText }
        </div>
    </div>
}