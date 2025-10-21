
import './OSTaskBar.css'
import '../Styles/OSStyle.css'

export default function OSTaskBar({ children }) {
    return (
        <div className="os-task-bar os-background flex row">
            { children }
        </div>
    )
}