import { getStorage, setStorage, useStorage } from "../services/system-bridge";

export const START_YEAR = 2013
export const CURRENCY = 'USD'


// ----------- User ------------
export function useUser() {
    return useStorage('User', {
        name: 'Jaunty Jackalope'
    })
}


// ----------- Time ------------
export function useGameClock() {
    return useStorage('GameClock', {
        hours: 8,
        minutes: 37
    })
}
export function useGameCalendar() {
    return useStorage('GameCalendar', {
        year: START_YEAR,
        month: 'Dec',
        day: 8,
        weekday: 'Sunday'
    })
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