import './ContextMenu.css'

export default function ContextMenu({ className, style, isOpen, setIsOpen, children }) {

    if (!isOpen) {
        return <></>
    }

    return (<div className={`context-menu ${className}`} onClick={evt => setIsOpen(false)} style={style}>
        { children }
    </div>)
}