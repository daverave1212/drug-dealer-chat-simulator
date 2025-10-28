





const BORIS_MESSAGES = {
    "hey, I heard you are in need of money": {
        options: {
            "who are you?": {
                next: 'im your neighbor boris',
                onSend: () => {},
            },
            "yes please, can you help?": {
                next: 'sure i can help'
            }
        }
    },
    "sure i can help. but are you a hard working man?": { next: 'i might have job for you' },
    "i might have job for you": { next: 'are you in?' },
    "are you in?": {
        also: [
            'i might have job for you',
            'are you in?'
        ],
        options: {
            'What kind of job?': {
                next: 'simple job really'
            },
            "I'm in! Tell me what I need to do.": {
                next: 'i need you to run an errand'
            }
        }
    },
    'simple job really': { next: 'i need you to run an errand for m' },
    'i need you to run an errand for me': { next: 'my package arrived at post' },
    'my package arrived at post office': { next: 'you just need to go there and pick up the' },
    'you just need to go there and pick up the package, then you come to me with the package': { next: true },
    '$5': { next: 'small task, small money' },
    'small task, small money': {
        
    }
}

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

export function findCurrentDialogueStep(from, lastMessageText) {
    if (!(from in dialogues.contacts)) {
        return null
    }
    return dialogues.contacts[from][lastMessageText]
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