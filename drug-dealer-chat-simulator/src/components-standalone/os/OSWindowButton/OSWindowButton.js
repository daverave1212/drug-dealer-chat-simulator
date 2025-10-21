
import './OSWindowButton.css'

export default function OSWindowButton({ children, onClick, className, style }) {
    return (
        <div className={'os-window-button shadowed-white ' + className} onClick={onClick} style={style}>
            { children }
        </div>
    )
}