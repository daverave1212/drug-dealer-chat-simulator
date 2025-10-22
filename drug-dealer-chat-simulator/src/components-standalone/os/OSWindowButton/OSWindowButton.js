
import './OSWindowButton.css'

export default function OSWindowButton({ children, onClick, onMouseUp, onMouseDown, className, style }) {
    return (
        <div className={'os-window-button shadowed-white ' + className} onClick={onClick} style={style} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
            { children }
        </div>
    )
}