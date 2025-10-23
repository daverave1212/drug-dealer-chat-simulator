import { createContext, useContext, useEffect, useState } from "react";
import { MousePositionContext } from "./MousePositionContext";

export const TooltipContext = createContext()

export function TooltipContextProvider({ children }) {

    const [tooltipText, setTooltipText] = useState(null)

    return <TooltipContext value={{tooltipText, setTooltipText}}>
        { children }
    </TooltipContext>

}