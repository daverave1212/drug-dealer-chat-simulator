import { findCurrentDialogueStep, findNextDialogueStep } from "../services/dialogue-system";
import { getStorage, setStorage, useStorage } from "../services/system-bridge";
import { getCalendarAndTimeNow } from "./AppData";

export const MessengerStatus = {
    ONLINE: 'Online.png',
    OFFLINE: 'Offline.png',
    DND: 'DoNotDisturb.png',
    IDLE: 'Idle.png'
}

export function useMessenger() {
    return useStorage('Messenger', {
        activeChat: 'Mom',
        me: {
            name: 'Plasmid Salamander',
            status: MessengerStatus.ONLINE,
            statusText: 'pm job offers pls',
            src: '/Messenger/Avatars/Me.jpg'
        },
        contacts: {
            'Mom': {
                name: 'Mom',
                status: MessengerStatus.ONLINE,
                statusText: 'I am using Messenger!',
                src: '/Messenger/Avatars/Mom.jpg',
                chatHistory: []
            },
            'Boris': {
                name: 'Boris',
                status: MessengerStatus.DND,
                statusText: 'work hard play hard',
                src: '/Messenger/Avatars/Boris.jpg',
                chatHistory: []
            },
        }
    })
}

export function sendMessageInChat(chatter, messageFrom, message, lastMessage=null) {
    const messageObj = {
        from: messageFrom,
        message: message,
        date: getCalendarAndTimeNow()
    }

    const messengerData = getStorage('Messenger')
    
    if (messengerData.contacts[chatter] == null) {
        console.error(`Messenger chatter ${chatter} not found`)
        return
    }

    messengerData.contacts[chatter].chatHistory.push(messageObj)
    setStorage('Messenger', messengerData)

    // Dialogue system
    const isReply = messageFrom != chatter
    const currentDialogueStep = findCurrentDialogueStep(chatter, lastMessage)
    if (currentDialogueStep == null) {
        return
    }
    if (isReply) {
        if (lastMessage == null) {
            console.error(`No or null lastMessage provided to sendMessageInChat as reply message in chat ${chatter} "${message}"`)
            return
        }
        console.log({chatter, messageFrom, message, lastMessage})
        const nextDialogueStepText = findNextDialogueStep(chatter, currentDialogueStep.options[message].next)
        sendMessageInChat(chatter, chatter, nextDialogueStepText)
    } else {  // messageFrom == chatter
        if (currentDialogueStep.next != null) {
            const nextDialogueStepText = findNextDialogueStep(chatter, currentDialogueStep.next)
            sendMessageInChat(chatter, chatter, nextDialogueStepText)
        }
    }
}