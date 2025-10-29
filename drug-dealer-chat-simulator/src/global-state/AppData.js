import { getNDaysInYearMonth, mergeObjectsIgnoreNull } from "../lib/utils";
import { getStorage, setStorage, useStorage } from "../services/system-bridge";

export const START_YEAR = 2013
export const CURRENCY = 'USD'


// ----------- User ------------
const USER_STATS_DEFAULT = {
    satiety: 1,                     // 100%
    energy: 1                       // 100%
}
export function useUser() {
    return useStorage('User', {
        name: 'Jaunty Jackalope',
        stats: USER_STATS_DEFAULT
    })
}


// ----------- Time ------------
export function useGameCalendar() {
    return useStorage('GameCalendar', {
        year: START_YEAR,
        month: 12,
        day: 8,
        weekday: 'Sunday',
        hours: 8,
        minutes: 37
    })
}
export function getGameCalendar() {
    return getStorage('GameCalendar')
}
export function setGameCalendar(calendar) {
    return setStorage('GameCalendar', calendar)
}
export function setCalendarToNextDay(givenCalendar=null) {
    const date = givenCalendar ?? getStorage('GameCalendar')
    const nDaysThisMonth = getNDaysInYearMonth()

    date.day += 1
    if (date.day > nDaysThisMonth) {
        date.day = 1
        date.month += 1
    }
    if (date.month > 12) {
        date.month = 1
        date.year += 1
    }

    setStorage('GameCalendar', date)
}
export function passTime({ hours=0, minutes=0 }) {
    const newCalendar = getGameCalendar()
    newCalendar.minutes += minutes
    if (newCalendar.minutes >= 60) {
        newCalendar.minutes -= 60
        newCalendar.hours += 1
    }
    newCalendar.hours += hours
    if (newCalendar.hours >= 24) {
        newCalendar.hours -= 24
        setCalendarToNextDay(newCalendar)
    } else {
        setGameCalendar(newCalendar)
    }

}


// ----------- Banking ------------
export function useBanking() {
    return useStorage('Banking', {
        accounts: {
            'ONLINE ACCOUNT': {
                name: 'ONLINE ACCOUNT',
                subtitle: 'Online banking account',
                sum: -21151,
                info: 'CNB18...0001',
                icon: '/Icons/Banking/Card.png',
                color: 'orange'
            },
            Cash: {
                name: 'Cash',
                sum: 0,
                subtitle: 'Pocker banknotes money',
                info: '',
                icon: '/Icons/Banking/Cash.png',
                color: 'green'
            }
        }
    })
}
export function getBanking() {
    return getStorage('Banking')
}
export function setBanking(value) {
    return setStorage('Banking', value)
}
export function addMoneyToAccount(accountName, amount) {
    const myBanking = getBanking()
    if (myBanking.accounts[accountName] == null) {
        myBanking.accounts[accountName] = {
            name: accountName,
            sum: 0,
            infoLeft: '',
            infoRight: '',
            icon: '/Icons/Banking/Cash.png',
            colorFrom: '#EEFFEE',
            colorTo: '#EEEEDD',

        }
    }
    myBanking.accounts[accountName].sum += amount
    setBanking(accountName, myBanking)
}


export const DuePaymentTypes = {
    RENT: {
        name: 'Rent',
        sum: 3,
        dueInDays: 2
    },
    FOOD: {
        name: 'Food',
        sum: 6.5,
        dueInDays: 1
    },
    OTHER: {
        name: 'Other',
        sum: 10,
        dueInDays: 1
    }
}
export function addDuePayment(duePaymentTemplate) {
    setDuePayments([...getDuePayments(), duePaymentTemplate])
}
export function setDuePayments(value) {
    return setStorage('DuePayments', value)
}
export function getDuePayments() {
    return getStorage('DuePayments')
}
export function useDuePayments() {
    return useStorage('DuePayments', [
        {
            name: 'Rent',
            sum: 3,
            dueInDays: 2,
        },
        {
            name: 'Food',
            sum: 6.5,
            dueInDays: 1
        }
    ])
}