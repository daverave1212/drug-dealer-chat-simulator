import { createContext, useState } from "react";


export const CurrentSceneContext = createContext()

export function CurrentSceneContextProvider({ children }) {

    const [currentSceneName, setCurrentSceneName] = useState('Computer')

    return <CurrentSceneContext value={{ currentSceneName, setCurrentSceneName }}>
        { children }
    </CurrentSceneContext>

}