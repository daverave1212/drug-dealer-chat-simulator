
import { useState } from 'react'
import { CURRENCY, useBanking, useDuePayments, useUser } from '../../global-state/AppData'
import './Banking.css'
import './MyAccounts.css'
import './CardDisplay.css'
import Icon from '../../components/Icon/Icon'
import { getMoneyParts, splitMoneyBy1000s } from '../../lib/utils'

const GREEN_COLOR = 'rgb(0, 180, 90)'
const RED_COLOR = 'rgb(180, 0, 0)'

function CardDisplay2({ name, subtitle, sum, info, icon, color }) {

    const { integralParts, decimals } = getMoneyParts(sum)

    const moneyColor = sum > 0? GREEN_COLOR: RED_COLOR

    return (<div className="card flex column inter" style={{borderLeft: `solid 4px ${color}`}}>
        <div className='top flex row padding-half'>
            <div className='card-icon center-content'>
                <img src={icon}/>
            </div>

            <div className='flex column flex-1 relative padding-left-half'>
                <div className='light-gray name'>{name}</div>
                <div className='light-gray info'>{info}</div>
                <div className='dark-gray margin-top-half'>{subtitle}</div>
                <div className='money' style={{color: moneyColor}}>
                    <span>{integralParts.join('.')},</span>
                    <span className='decimals'>{decimals}</span> {CURRENCY}
                </div>
                { sum < 0 && <div className='subtext'>
                    You are in debt. Sum to pay: {sum.toFixed(2)} {CURRENCY}.
                </div> }
            </div>

        </div>
        <div className='bottom relative'>
            <div className='card-option pointer os-highlight'>
                <span className='plus'>+</span> <span>New Transfer</span>
            </div>
        </div>
    </div>)
}

function MyAccounts({ myBanking }) {

    const [duePayments, setDuePayments] = useDuePayments()

    const dueInText = nDays => nDays == 1? 'today': `in ${nDays} days`
    const formatMoney = sum => {
        const { integralParts, decimals } = getMoneyParts(sum)
        return integralParts.join('.') + ',' + decimals
    }

    return <div className='flex row my-accounts'>
        <div className='cards flex column gap-1'>
            { Object.keys(myBanking.accounts).map(accountName => (
                <CardDisplay2 {...myBanking.accounts[accountName]}/>
                // <CardDisplay {...myBanking.accounts[accountName]}/>
            )) }
        </div>
        <div className='flex column padding-1'>
            <h3 className='margin-0'>Due Payments</h3>
            <div className='padding-half'></div>
            <div className='flex column gap-half'>
                { duePayments.map(dp => (
                    <div className='due-payment banking-div flex column relative inter'>
                        <div className='title'>{dp.name}</div>
                        <div className='due-in'>{dueInText(dp.dueInDays)}</div>
                        <div className='money bold' style={{color: RED_COLOR}}>- {formatMoney(dp.sum)} {CURRENCY}</div>
                    </div>
                )) }
                <div><Icon src="/Icons/Home.png"/>Taxes</div>
            </div>
        </div>
    </div>
}


const BANKING_APP_TABS = {
    'My Accounts': MyAccounts,
    'Transaction History': null,
    'Profile': null
}

export function BankingApp() {

    const [user] = useUser()
    const [activeTabName, setActiveTabName] = useState('My Accounts')
    const [myBanking, setMyBanking] = useBanking()

    const RenderedTabComponent = BANKING_APP_TABS[activeTabName]

    function onTabClick(name) {
        setActiveTabName(name)
    }

    return <div className='banking'>
        <div className='banking-content flex row banking-background'>
            <div className='menu flex column banking-background padding-half'>
                <h3 className='banking-title padding-half margin-0 padding-bottom-0'><span style={{color: '#6666CC'}}>CNB</span><i style={{color: '#6666AA'}}>Bank</i></h3>
                <div className='banking-title margin-0 margin-bottom-1 padding-left-half' style={{fontSize: '0.75rem'}}>World's leading bank</div>
                <div className='padding-1'></div>
                { Object.keys(BANKING_APP_TABS).map(name => (
                    <div className='os-highlight pointer banking-title padding-half padding-bottom-0'>
                        <div className='pointer banking-underline' onClick={evt => onTabClick(name)}>{name}</div>
                    </div>
                )) }
            </div>
            <RenderedTabComponent myBanking={myBanking}/>
        </div>
    </div>

}

export const BANKING_CONFIG = {
    name: 'Banking',
    menuItems: [
        { name: 'Help' }
    ],
    component: <BankingApp/>
}