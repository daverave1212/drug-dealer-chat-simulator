import { useEffect, useRef, useState } from "react";
import OSWindowButton from "../OSWindowButton/OSWindowButton";
import '../Styles/OSStyle.css'
import './OSWindow.css'
import { useMousePosition } from "../../../lib/utils";


export default function OSWindow({ children }) {
    const [position, setPosition] = useState({ x: 100, y: 100})
    const isDragging = useRef(false)
    const draggingMouseOffset = useRef({ x: 0, y: 0 })

    const positionStyle = { left: position.x + 'px', top: position.y + 'px' }

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

    return <div className={'os-window os-bordered'} style={{...positionStyle}}>
        <div className='flex row os-background top' onMouseDown={onDragMouseDown} onMouseUp={onDragMouseUp}>
          <div>Photo</div>
          <div>Edit</div>
          <div>View</div>
          <div>Help</div>
          <OSWindowButton className={'red'}>x</OSWindowButton>
        </div>
        <div className="content">
            { children }
        </div>
    </div>
}