import { BANKING_CONFIG } from "../os-apps/Banking/Banking";
import { CALENDAR_CONFIG } from "../os-apps/Calendar/Calendar";
import { MESSENGER_CONFIG } from "../os-apps/Messenger/Messenger";
import { NOTEPAD_CONFIG } from "../os-apps/Notepad/Notepad";

let topMostWindowZ = 100;
export const getTopMostWindowZ = () => topMostWindowZ
export const setTopMostWindowZ = value => topMostWindowZ = value

export const ALL_APPS = {
    'Notepad': NOTEPAD_CONFIG,
    'Banking': BANKING_CONFIG,
    'Calendar': CALENDAR_CONFIG,
    'Messenger': MESSENGER_CONFIG
}