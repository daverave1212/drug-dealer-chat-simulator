import { useState } from "react";
import OSWindowButton from "../OSWindowButton/OSWindowButton";
import '../Styles/OSStyle.css'
import './OSWindow.css'


export default function OSWindow({ children }) {
    const [draggingMouseOffset, setDraggingMouseOffset] = useState({ x: 0, y: 0 })
    const [position, setPosition] = useState({ x: 100, y: 100})

    const positionStyle = { left: position.x + 'px', top: position.y + 'px' }

    function updateMousePosition(evt) {
        console.log(draggingMouseOffset)
        setPosition({
            x: evt.clientX - draggingMouseOffset.x,
            y: evt.clientY - draggingMouseOffset.y
        })
    }

    function onDragMouseDown(evt) {
        console.log({ x: evt.clientX, y: evt.clientY })
        setDraggingMouseOffset({ x: evt.clientX, y: evt.clientY })
        setTimeout(() => {
            window.addEventListener('mousemove', updateMousePosition)
        }, 1050)
    }
    function onDragMouseUp(evt) {
        window.removeEventListener('mousemove', updateMousePosition)
    }

    return <div className={'os-window os-bordered'} style={{...positionStyle}}>
        <div className='flex row os-background top' onMouseDownCapture={onDragMouseDown} onMouseUp={onDragMouseUp}>
          <div>Photo</div>
          <div>Edit</div>
          <div>View</div>
          <div>Help</div>
          <OSWindowButton className={'red'}>x</OSWindowButton>
        </div>
        <div className="">
            { children }
        </div>
    </div>
}