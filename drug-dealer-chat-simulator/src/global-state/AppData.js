import { useStorage } from "../services/system-bridge";


export function useUser() {
    return useStorage('User', {
        name: 'Jaunty Jackalope'
    })
}
export function useGameClock() {
    return useStorage('GameClock', {
        hours: 8,
        minutes: 37
    })
}
export function useGameCalendar() {
    return useStorage('GameCalendar', {
        year: 2013,
        month: 'Dec',
        day: 8,
        weekday: 'Sunday'
    })
}