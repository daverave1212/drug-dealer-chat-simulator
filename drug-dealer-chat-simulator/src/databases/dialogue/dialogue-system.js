

import BorisDialogue from '../../databases/dialogue/json/BorisDialogue.json'



const BORIS_MESSAGES = BorisDialogue

const MOM_MESSAGES = {
    "Hello there, dear!": {
        options: {
            "Hey mom, how are you?": {
                onSend: () => {},
            },
            "Not now mom, I'm busy": {
                next: 'Hello there, dear!'
            }
        }
    },
}


export const dialogues = {
    contacts: {
        'Boris': BORIS_MESSAGES,
        'Mom': MOM_MESSAGES
    }
}

export function findCurrentDialogueStep(from, messageText) {
    if (!(from in dialogues.contacts)) {
        return null
    }
    return dialogues.contacts[from][messageText]
}
export function findNextDialogueStep(from, next) {
    if (!(from in dialogues.contacts)) {
        console.log('Retunrning null')
        return null
    }
    const thisDialogues = dialogues.contacts[from]
    const dialoguesTexts = Object.keys(thisDialogues)

    console.log({thisDialogues, dialoguesTexts, from, next})

    for (const text of dialoguesTexts) {
        if (text.startsWith(next)) {
            return text
        }
    }
    return null
}