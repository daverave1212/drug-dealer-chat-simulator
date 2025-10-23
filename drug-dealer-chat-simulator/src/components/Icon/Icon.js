
import './Icon.css'

export default function Icon({ src, className, style={}, paddingTop=0 }) {

    return <div className={`icon-box ${className}`} style={{display: 'inline-block', ...style}}>
        <img src={src}/>
    </div>
}