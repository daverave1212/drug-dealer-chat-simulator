import { NOTEPAD_CONFIG } from "../os-apps/Notepad/Notepad";

let topMostWindowZ = 100;
export const getTopMostWindowZ = () => topMostWindowZ
export const setTopMostWindowZ = value => topMostWindowZ = value

export const ALL_APPS = {
    'Notepad': NOTEPAD_CONFIG
}