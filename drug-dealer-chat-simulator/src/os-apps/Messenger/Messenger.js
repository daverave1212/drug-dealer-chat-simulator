import { useMessenger } from "../../global-state/MessengerData"
import './Messenger.css'


function MessengerContact({ name, status, statusText, src }) {
    return <div className="messenger-contact flex row os-highlight pointer">
        <div className="avatar-box">
            <img src={src}/>
        </div>
        <div className="name-and-status-text flex column">
            <div className="contact-name"><img className="status-icon" src={`/Messenger/Icons/${status}`}/>{name}</div>
            <div className="status-text">{statusText}</div>
        </div>
    </div>
}

function MessengerApp() {

    const [messengerData, setMessengerData] = useMessenger()

    const { me, contacts } = messengerData
    
    return (<div className="messenger flex row tahoma">
        <div className="left flex column">

            <div className="me flex row">
                <div className="me-avatar-box">
                    <img src={me.src}/>
                </div>
                <div className="name-and-status-text flex column">
                    <div className="contact-name"><img className="status-icon" src={`/Messenger/Icons/${me.status}`}/>{me.name}</div>
                    <div className="status-text">{me.statusText}</div>
                </div>
            </div>

            <div className="contacts flex column gap-half padding-half">
                { Object.keys(contacts).map(contactName => <MessengerContact {...contacts[contactName]}/>) }
            </div>

        </div>
        <div className="right">
            asdasd
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