
import { useContext } from 'react'
import './SceneRegion.css'
import { TooltipContext } from '../../../global-state/TooltipContext'

export default function SceneRegion({ children, className, style, tooltip, onClick, imageData, regionData }) {

    const { setTooltipText } = useContext(TooltipContext)

    const newRegionData = {
        x: imageData.x + imageData.width * regionData.x,
        y: imageData.y + imageData.height * regionData.y,
        width: imageData.width * regionData.width,
        height: imageData.height * regionData.height
    }

    function onMouseEnter() {
        console.log(tooltip)
        setTooltipText(tooltip)
    }
    function onMouseLeave() {
        console.log(null)
        setTooltipText(null)
    }

    return <div className={`scene-region pointer absolute ${className}`} style={{
        left: newRegionData.x + 'px',
        top: newRegionData.y + 'px',
        width: newRegionData.width + 'px',
        height: newRegionData.height + 'px',
        ...style
    }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
        { children }
    </div>
}