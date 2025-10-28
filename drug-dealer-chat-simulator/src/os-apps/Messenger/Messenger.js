import { useEffect } from "react"
import { useUser } from "../../global-state/AppData"
import { useMessenger } from "../../global-state/MessengerData"
import './Messenger.css'
import Icon from "../../components/Icon/Icon"


function MessengerContact({ className, name, status, statusText, src }) {
    return <div className={"messenger-contact flex row pointer " + className}>
        <div className="avatar-box">
            <img src={src}/>
        </div>
        <div className="name-and-status-text flex column">
            <div className="contact-name"><img className="status-icon" src={`/Messenger/Icons/${status}`}/>{name}</div>
            <div className="status-text">{statusText}</div>
        </div>
    </div>
}

function IncomingMessage({ src, message, date }) {
    return <div className="chat-message incoming relative">
        <img src={src} className="chat-message-avatar absolute"/>
        <div className="text">
            { message }
        </div>
    </div>
}

function MessengerApp() {

    const [user] = useUser()
    const [messengerData, setMessengerData] = useMessenger()

    const { me, contacts } = messengerData
    const activeChatContact = contacts[messengerData.activeChat]

    useEffect(() => {
        messengerData.me.name = user.name
        setMessengerData(messengerData)
    }, [])
    
    return (<div className="messenger flex row">
        <div className="left flex column">

            <div className="me">
                <div className="me-bg flex row">
                    <div className="me-avatar-box">
                        <img src={me.src}/>
                    </div>
                    <div className="name-and-status-text flex column">
                        <div className="contact-name bold"><img className="status-icon" src={`/Messenger/Icons/${me.status}`}/>{me.name}</div>
                        <input className="me-status-text" value={me.statusText}/>
                        <div className="other">All chats are encrypted | Ping: 41ms</div>
                    </div>
                </div>
            </div>

            <div className="search-contact flex row">
                <input className={'flex-1'} value={'search for contact...'}/><img src="/Icons/Apps/Messenger.png"/>
            </div>

            <div className="contacts flex column padding-half">
                { Object.keys(contacts).map(contactName => <MessengerContact {...contacts[contactName]}/>) }
            </div>

        </div>
        <div className="right">
            <div className="header">
                <MessengerContact className={'active-chat-messenger-contact'} {...activeChatContact}/>
            </div>
            <div className="messages flex column gap-half">
                { activeChatContact.chatHistory.map(msg => (
                    msg.from == activeChatContact.name?
                        <IncomingMessage src={activeChatContact.src} message={msg.message} date={msg.date}/>
                    :
                        <div>{ msg.message }</div>
                )) }
            </div>
        </div>
    </div>)

}

export const MESSENGER_CONFIG = {
    name: 'Messenger',
    menuItems: [
        { name: 'Help' }
    ],
    component: <MessengerApp/>
}