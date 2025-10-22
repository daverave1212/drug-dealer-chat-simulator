import { useContext, useEffect, useRef, useState } from "react";
import OSWindowButton from "../OSWindowButton/OSWindowButton";
import '../Styles/OSStyle.css'
import './OSWindow.css'
import { stopPropagation, useMousePosition } from "../../../lib/utils";
import { getTopMostWindowZ, setTopMostWindowZ } from "../../../services/app-manager";
import { OpenAppsContext } from "../../../global-state/OpenAppsContext";


export default function OSWindow({ config={}, children }) {
    // Positioning
    const [position, setPosition] = useState({ x: 100, y: 100})
    const [zIndex, setZIndex] = useState(getTopMostWindowZ())
    
    const isDragging = useRef(false)
    const draggingMouseOffset = useRef({ x: 0, y: 0 })

    const positionStyle = {
        left: position.x + 'px',
        top: position.y + 'px',
        zIndex: zIndex
    }

    function onDragMouseDown(evt) {
        console.log('ok')
        document.body.style.userSelect = 'none' // Prevent text select while dragging
        const rect = evt.target.getBoundingClientRect()
        const xOffset = evt.clientX - rect.left
        const yOffset = evt.clientY - rect.top
        draggingMouseOffset.current = { x: xOffset, y: yOffset }
        // console.log({ x: evt.clientX, y: evt.clientY })
        isDragging.current = true
        window.addEventListener('mousemove', updateMousePosition)
    }
    function onDragMouseUp(evt) {
        console.log('no')
        document.body.style.userSelect = 'auto' // Revert text select while dragging
        isDragging.current = false
        window.removeEventListener('mousemove', updateMousePosition)
    }
    function updateMousePosition(evt) {
        if (!isDragging.current) {
            return
        }
        setPosition({ x: evt.clientX - draggingMouseOffset.current.x, y: evt.clientY - draggingMouseOffset.current.y })
    }
    function updateZIndex() {
        const newTopMostZ = getTopMostWindowZ() + 1
        setZIndex(newTopMostZ)
        setTopMostWindowZ(newTopMostZ)
    }


    // Config
    const { name, menuItems } = config



    // Helper components
    function WindowButtons() {

        const { openApps, setOpenApps } = useContext(OpenAppsContext)

        function closeApp(evt) {
            console.log('Closing app ' + name)
            const newOpenApps = openApps.filter(app => app.name != name)
            setOpenApps(newOpenApps)
            // evt.stopPropagation()
        }

        return (<div className="absolute flex row gap-quarter" style={{top: '0px', right: '0.5rem', zIndex: `${zIndex}.1`}}>
            <OSWindowButton className={'gray'}>—</OSWindowButton>
            <OSWindowButton onMouseDown={stopPropagation} onMouseUp={closeApp} className={'red'}>×</OSWindowButton>
        </div>)
    }

    return <div className={'os-window os-bordered'} style={{...positionStyle}} onMouseDown={updateZIndex}>
        <div className='os-background top' onMouseDown={onDragMouseDown} onMouseUp={onDragMouseUp}>
            <div className="relative">
                <img src={`/Icons/Apps/${name}.png`} className="os-window-icon"/>
                <div className="os-window-title unselectable">{name}</div>
                <WindowButtons/>
            </div>
            <div className="flex-row">
                { menuItems && menuItems.map(({ name, onClick }) => (
                    <div className="os-window-menu-item pointer unselectable" onClick={onClick}>{name}</div>
                )) }
            </div>
        </div>
        <div className="content">
            { children }
        </div>
    </div>
}