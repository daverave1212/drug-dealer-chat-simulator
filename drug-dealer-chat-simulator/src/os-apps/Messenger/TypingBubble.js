
import './TypingBubble.css'

export default function TypingBubble({ className, style }) {
    return <div class={`chat-bubble ${className}`} style={style}>
        <div class="typing">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    </div>
}