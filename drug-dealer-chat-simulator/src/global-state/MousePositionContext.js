import { createContext, useContext, useEffect, useState } from "react";




export const MousePositionContext = createContext()

export function MousePositionContextProvider({ children }) {

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        window.addEventListener('mousemove', evt => {
            setMousePosition({ x: evt.clientX, y: evt.clientY })
        })
    }, [])

    return <MousePositionContext value={{mousePosition}}>
        { children }
    </MousePositionContext>

}