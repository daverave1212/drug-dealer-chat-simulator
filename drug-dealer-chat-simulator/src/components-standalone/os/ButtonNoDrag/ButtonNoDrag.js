import { useRef } from "react"


export default function ButtonNoDrag({ className, style, onClick, children }) {

    const wasClicked = useRef(false)

    function onMouseDown(evt) {
        evt.stopPropagation()
        wasClicked.current = true
    }
    function onMouseUp(evt) {
        if (wasClicked) {}
    }

    return (<div className={className} style={style} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        { children }
    </div>)
}