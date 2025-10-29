import { dialogues, findCurrentDialogueStep, findNextDialogueStep } from "../databases/dialogue/dialogue-system";
import { getStorage, setStorage, useStorage } from "../services/system-bridge";
import { getTimeSinceLastTick } from "../services/task-runner";
import { getGameCalendar } from "./AppData";

export const MessengerStatus = {
    ONLINE: 'Online.png',
    OFFLINE: 'Offline.png',
    DND: 'DoNotDisturb.png',
    IDLE: 'Idle.png'
}

if (getStorage('ScheduledMessages') == null) {
    setStorage('ScheduledMessages', [])
}
export function useScheduledMessages() {
    return useStorage('ScheduledMessages', [])
}
export function scheduleMessage(messageObj) {
    setStorage('ScheduledMessages', [...getStorage('ScheduledMessages'), messageObj])
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
                chatHistory: [],
                currentDialogueStep: null
            },
            'Boris': {
                name: 'Boris',
                status: MessengerStatus.DND,
                statusText: 'work hard play hard',
                src: '/Messenger/Avatars/Boris.jpg',
                chatHistory: [],
                currentDialogueStep: null
            },
        }
    })
}

export function messengerChatTick() {
    const messengerData = getStorage('Messenger')
    if (messengerData == null) {    // Not initialized
        console.warn(`Messenger data not initialized yet`)
        return
    }
    // First, send scheduled messages
    const scheduledMessages = getStorage('ScheduledMessages')
    if (scheduledMessages != null && scheduledMessages.length > 0) {
        let scheduledMessage = scheduledMessages[scheduledMessages.length - 1]
        const timeSinceLastTick = getTimeSinceLastTick()
        if (timeSinceLastTick < scheduledMessage.delay) {
            scheduledMessage.delay -= timeSinceLastTick
            setStorage('ScheduledMessages', scheduledMessages)
            return
        }

        scheduledMessages.pop()
        const { from, message } = scheduledMessage
        setStorage('ScheduledMessages', scheduledMessages)
        sendMessageInChat(from, from, message)
        return
    }
    // Then, continue with more messages
    // const chatters = Object.keys(messengerData.contacts)
    // for (let i = 0; i < chatters.length; i++) {
    //     const chatter = chatters[i]
    //     const currentDialogueStepText = messengerData.contacts[chatter].currentDialogueStep

    //     if (currentDialogueStepText == null) {
    //         continue
    //     }
    //     const currentDialogueStep = dialogues.contacts[chatter][currentDialogueStepText]
    //     if (currentDialogueStep == null) {
    //         throw `ERROR: Dialogue step does not exist: "${currentDialogueStepText}"`
    //     }
        
    //     if (currentDialogueStep.next != null) {
    //         sendMessageInChat(chatter, chatter, currentDialogueStep.next)
    //     }
    // }
}

export function sendMessageInChat(chatter, messageFrom, message) {
    
    // Handle messenger texts
    const messageObj = {
        from: messageFrom,
        message: message,
        date: getGameCalendar()
    }

    const messengerData = getStorage('Messenger')
    const thisChatHistory = messengerData.contacts[chatter].chatHistory
    const lastMessageIndex = (thisChatHistory?.length - 1) ?? -1
    const lastMessageText = thisChatHistory?.[lastMessageIndex]?.message
    
    if (messengerData.contacts[chatter] == null) {
        console.error(`Messenger chatter ${chatter} not found`)
        return
    }

    messengerData.contacts[chatter].chatHistory.push(messageObj)

    // Dialogue system
    const isReply = messageFrom != chatter
    if (isReply) {
        const currentDialogueStep = dialogues.contacts[chatter][lastMessageText]
        const optionObject = currentDialogueStep.options[message]
        scheduleMessage({
            message: optionObject.next,
            from: chatter,
            delay: optionObject.next.length * 100
        })
        // if (optionObject.next == null) {
        //     messengerData.contacts[chatter].currentDialogueStep = null
        // } else {
        //     messengerData.contacts[chatter].currentDialogueStep = optionObject.next
        // }
    } else {
        const currentDialogueStep = dialogues.contacts[chatter][message]
        const nextDialogueStepText = currentDialogueStep.next
        if (nextDialogueStepText != null) {
            scheduleMessage({
                message: nextDialogueStepText,
                from: chatter,
                delay: nextDialogueStepText.length * 100
            })
        }   
        // messengerData.contacts[chatter].currentDialogueStep = message
    }

    // TODO: Still not working fine

    setStorage('Messenger', messengerData)
}