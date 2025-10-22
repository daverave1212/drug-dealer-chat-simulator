import './ContextMenu.css'

export default function ContextMenu({ className, style, isOpen, setIsOpen, children }) {

    console.log(isOpen)

    if (!isOpen) {
        return <></>
    }

    return (<div className="context-menu" onClick={evt => setIsOpen(false)}>
        { children }
    </div>)
}