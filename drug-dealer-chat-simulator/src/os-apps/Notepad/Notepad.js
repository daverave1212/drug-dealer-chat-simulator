import { useState } from "react"
import { getStorage, setStorage, useStorage } from "../../services/web-system-bridge"
import './Notepad.css'



function NotepadApp() {
    const [savedText, setSavedText] = useStorage('Notepad.savedText', '')
    
    return (<div className="notepad-app">
        <textarea onChange={evt => setSavedText(evt.target.value)} value={savedText}></textarea>
    </div>)
}

export const NOTEPAD_CONFIG = {
    name: 'Notepad',
    menuItems: [
        { name: 'Help' }
    ],
    component: <NotepadApp/>
}