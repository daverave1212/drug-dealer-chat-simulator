
import './Icon.css'

export default function Icon({ src, className, style={}, top=0 }) {

    if (top != 0) {
        style.paddingTop = top + "px"
    }

    return <div className={`icon-box ${className}`} style={{display: 'inline-block', ...style}}>
        <img src={src}/>
    </div>
}