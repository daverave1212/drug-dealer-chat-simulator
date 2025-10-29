

import fs from 'fs'
import yaml from 'js-yaml'

const fileName = 'BorisDialogue'
const dialogueYaml = fs.readFileSync(`./yaml/${fileName}.yml`, { encoding: 'utf-8'})
const dialogueJson = yaml.load(dialogueYaml)
/*

    Dialogue is a KVP like:
        chatter response text
            text: key
            next?: <chatter response starting text>
            options: options

    parseBaselineText(text, value):
        Add new entry to the parsedDialogue, blank
        Possibilities of the value of a key:
            next:
                Find the next baseline key and add the kvp "next": foundKey
            end: nothing
            String (next text):
                Add the kvp "next": string
            Array (options):
                Each element is an object with only one key.
                Add "options": options.map(op => parseOption(text, op))



*/

function getOnlyKey(obj) {
    if (obj == null) {
        throw new Error(`Gave null as parameter for getOnlyKey`)
    }
    return Object.keys(obj)[0]
}
function getVarType(v) {
    if (v == 'next') {
        return 'next'
    }
    if (v == 'end') {
        return 'end'
    }
    if (typeof v == 'string' || v instanceof String) {
        return 'String'
    }
    if (Array.isArray(v)) {
        return 'Array'
    }
    if (typeof v == 'object') {
        return 'true object'
    }
    return 'unknown'
}


function parseDialogueJSON(dialogue) {
    const parsedDialogue = {}
    const baselineTexts = Object.keys(dialogue)
    let i   // Used for the for later

    function findBaselineTextStartingWith(text) {
        return baselineTexts.find(t => t.startsWith(text))
    }
    function findNextBaselineText() {
        return baselineTexts[i + 1]
    }
    function parseBaselineText(text, value) {
        const dialogueStepValue = {}
        parsedDialogue[text] = dialogueStepValue
        if (value == 'next') {
            dialogueStepValue.next = findNextBaselineText()
        } else if (value == 'end') {
            // Pass
        } else if (typeof value === 'string' || value instanceof String) {
            dialogueStepValue.next = findBaselineTextStartingWith(value)
        } else if (Array.isArray(value)) {
            dialogueStepValue.options = {}
            for (const optionObject of value) {
                const onlyKey = getOnlyKey(optionObject)
                const onlyValue = optionObject[onlyKey]
                dialogueStepValue.options[onlyKey] = getParsedOption(text, onlyValue)
            }
        } else {    // Is object
            const onlyKey = getOnlyKey(value)
            const onlyValue = value[onlyKey]
            parseBaselineText(onlyKey, onlyValue)
            dialogueStepValue.next = onlyKey
        }
    }
    function getParsedOption(parentText, optionValue) {
        if (optionValue == 'next') {
            const nextBaselineText = findNextBaselineText()
            return { next: nextBaselineText }
        } else if (optionValue == 'end') {
            return {}
        } else if (typeof optionValue === 'string' || optionValue instanceof String) {
            return { next: findBaselineTextStartingWith(optionValue) }
        } else if (Array.isArray(optionValue)) {
            throw `ERROR: Incorrect optionValue in getParsedOption("${parentText}")`
        } else {
            const onlyKey = getOnlyKey(optionValue)
            const onlyValue = optionValue[onlyKey]
            parseBaselineText(onlyKey, onlyValue)
            return { next: onlyKey }
        }
    }

    for (i = 0; i < baselineTexts.length; i++) {
        const baselineText = baselineTexts[i]
        parseBaselineText(baselineText, dialogue[baselineText])
    }

    fs.writeFileSync(`./json/${fileName}.json`, JSON.stringify(parsedDialogue, null, 4), { encoding: 'utf-8' })
}

/*
    getParsedOption(parentText, optionObject):
        Find the text (only key of optionObject)
        Possibilities of the value of a key:
            next:
                Find the next baseline key and add the kvp "next": foundKey
                return { text, next: foundKey }
            object:
                Find the onlyKey
                parseBaselineText(key, value[onlyKey])
                return { text, next: onlyKey }
            end:
                return { text }

*/

parseDialogueJSON(dialogueJson)