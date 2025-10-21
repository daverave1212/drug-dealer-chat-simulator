import { useEffect, useState } from "react"

// ---------------- Array Utilities ----------------

// Puts it at the end if it has no keyName property.
export function sortObjectArrayByKey(array, keyName) {
    if (Array.isArray(array) == false) {
        console.log({array})
        throw `Did not give an array to sortObjectArrayByKey. See object above.`
    }
    const sortedArray = [...array].sort(function(a, b) {
        const aSort = a[keyName] != null? a[keyName]: 99999
        const bSort = b[keyName] != null? b[keyName]: 99999
        return aSort - bSort
    })
    return sortedArray
}
export function sortSpellsArrayByOrderOnWebsite(array) {
    return sortObjectArrayByKey(array, 'OrderOnWebsite')
}

export function insertBetweenAll(array, insertWhat) {
    if (array.length == 0) return array;

    const newArray = [array[0]]

    for (let i = 1; i < array.length; i++) {
        newArray.push(
            typeof insertWhat === 'function'?
                insertWhat(i):
                insertWhat
        )
        newArray.push(array[i])
    }

    return newArray
}
export function areArraysEqual(a1, a2, compareElems=null) {
    if (a1 == null && a2 == null) {
        throw `Both arrays given are null`
    }
    if (a1 == null) {
        throw `First array given is null`
    }
    if (a2 == null) {
        throw `Second array given is null`
    }
    if (a1.length != a2.length) return false
    for (let i = 0; i < a1.length; i++) {
        if (compareElems != null) {
            if (compareElems(a1[i], a2[i]) == false) {
                return false
            }
        } else {
            if (a1[i] !== a2[i]) return false
        }
    }
    return true
}
window.areArraysEqual = areArraysEqual
export function mapKeysToObject(keys, func) {
    const obj = {}
    for (const key of keys) {
        obj[key] = func(key)
    }
    return obj
}
export function mapObject(obj, func) {
    const keys = Object.keys(obj)
    let newObj = {}
    for (const oldKey of keys) {
        const oldValue = obj[oldKey]
        const { key, value } = func({key: oldKey, value: oldValue})
        newObj = {...newObj, [key]: value }
    }
    return newObj
}
export function addObjects(a, b) {
    if (a == null || b == null) {
        console.log({a, b})
        console.error(`addObjects: a or b null! Printed above.`)
        return a ?? b ?? {}
    }
    if (a == null && b != null) {
        return b;
    }
    if (a != null && b == null) {
        return a;
    }
    const bKeys = Object.keys(b)
    let finalObject = {...a}
    for (const bKey of bKeys) {
        if (finalObject[bKey] == null) {
            finalObject[bKey] = b[bKey]
        } else {
            const aValue = finalObject[bKey]
            const bValue = b[bKey]
            if (isNumber(aValue) && isNumber(bValue)) {
                finalObject[bKey] = finalObject[bKey] + bValue
            } else if (Array.isArray(aValue) && Array.isArray(bValue)) {
                finalObject[bKey] = [...finalObject[bKey], ...b[bKey]]
            } else {
                console.log({a, b})
                throw `For addObject at key ${bKey} could not match types from a with b.`
            }
        }
    }
    return finalObject
}
export function filterObject(obj, func) {
    const newKeys = Object.keys(obj).filter(key => func({ key, value: obj[key] }))
    const newObj = {}
    for (const key of newKeys) {
        newObj[key] = obj[key]
    }
    return newObj
}
export function joinObjectValues(obj, str) {
   return Object.keys(obj).map(key => obj[key]).join(str)
}
export function mergeObjects(a, b) {
    const newA = {...a}
    for (const key of Object.keys(b)) {
        newA[key] = b[key]
    }
    return newA
}
export function addManyObjects(arr) {
    if (arr.length == 0) {
        return {}
    }
    if (arr.length == 1) {
        return arr[0] ?? {}
    }
    let finalObject = arr[0]
    for (let i = 1; i < arr.length; i++) { 
        finalObject = addObjects(finalObject, arr[i])
    }
    return finalObject
}
export function reverseObject(obj) {
    const keys = Object.keys(obj)
    const values = Object.values(obj)
    const newObj = {}
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const value = values[i]
        newObj[value] = key
    }
    return newObj
}
export function groupBy(arr, hashFunc) {
    const hashKeyArrayElemValuePairs = {}
    for (const elem of arr) {
        const elemHash = hashFunc(elem)
        if (elemHash == null)
            continue
        if (hashKeyArrayElemValuePairs[elemHash] == null) {
            hashKeyArrayElemValuePairs[elemHash] = []
        }
        hashKeyArrayElemValuePairs[elemHash].push(elem)
    }
    return hashKeyArrayElemValuePairs
}
export function addArrays(a, b, c=null) {
    const newArr = [...a]
    for (let i = 0; i < a.length; i++) {
        newArr[i] += b[i]
        if (c != null) {
            newArr[i] += c[i]
        }
    }
    return newArr
}
window.addArrays = addArrays
export function numbersUntil(num) {
    const arr = []
    for (let i = 0; i < num; i++) {
        arr.push(i)
    }
    return arr
}
export function last(arr) {
    return arr[arr.length - 1]
}
export function allEqual(arr, val) {
    const allEqualElems = arr.filter(elem => elem == val)
    return arr.length == allEqualElems.length
}
export function splitArrayEvenly(arr, nArrays) {
    const arrays = new Array(nArrays)
    for (let i = 0; i < nArrays; i++) {
        arrays[i] = []
    }
    for (let i = 0; i < arr.length; i++) {
        const arrayI = i % nArrays
        arrays[arrayI].push(arr[i])
    }
    return arrays
}
export function uniqueElements(arr) {
    return [...new Set(arr)]
}
export function onlyUniqueFilter(value, index, array) {   // Use as .filter(onlyUniqueFilter)
    return array.indexOf(value) === index;
}
export function withToggledElement(arr, elem) {
    if (arr.includes(elem)) {
        return arr.filter(e => e != elem)
    } else {
        return [...arr, elem]
    }
}

window.splitArrayEvenly = splitArrayEvenly




// ---------------- Forms and Valdiation ----------------

export function ifOk(whatToCheck, then) {
    return (whatToCheck == null)? null : then
}
export function isFormValueNumeric(value) {
    if (value.length == 0)
        return true
    if (value.length == 1 && value[0] == '-')
        return true
    return isStringNumeric(value)
}
export function isFormValueInt(value) {
    if (value.includes('.'))
        return false
    return isFormValueNumeric(value)
}
// Tries to cast whatever is given to an int
// If it fails, returns the default value
export function asIntOr(toCast, defaultValue) {
    if (Number.isInteger(toCast))
        return toCast
    if (isNumber(toCast))
        return Math.floor(toCast)
    if (isStringNumeric(toCast))
        return parseInt(toCast)
    return defaultValue
}


export function formValueIntOr(value, orUseThis) {
    if (isFormValueInt(value))
        return value
    return orUseThis
}

export function hasAnyProperty(obj, propList) {
    for (const prop of propList) {
        if (obj[prop] != undefined) return true
    }
    return false
}
export function isCharDigit(char) {
    return '0123456789'.includes(char)
}

// ---------------- Other Small Utilities ----------------
export function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
window.generateUniqueId = generateUniqueId
export function logAndReturn(obj) {
    console.log(obj)
    return obj
}
export function def(val, func) {
    return func(val)
}
export function getOnlyProp(obj) {
    return getAnyPropNameExcept(obj, 'default')
}
export function stringReplaceAllMany(str, replaceWhats, replaceWiths) {
    if (!isString(str)) {
        console.log({str, replaceWhats, replaceWiths})
        throw `stringReplaceAllMany: str parameter is not a string. Params printed above`
    }
    for (let i = 0; i < replaceWhats.length; i++) {
        str = str.split(replaceWhats[i]).join(replaceWiths[i])
    }
    return str
}
export function isObject(obj) {
    return typeof obj === 'object'
}
export function isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
}
export function isNumber(obj) {
    return ! isNaN(obj)
}
export function isStringNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
export function getPageHashFromLocation(location) {       // Use 'const location = useLocation()' in a component to get location (from 'react-router-dom')
    const decodedHash = decodeURIComponent(location.hash)
    if (decodedHash == null || decodedHash.length == 0)
        return ''
    return decodedHash.substring(1) // Remove the "#" at the beginning
}
export function scrollToId(id, offset) {
    offset = offset == null? 0 : offset
    const elemWithId = document.getElementById(id)
    if (elemWithId != null) {
        const elemPosition = elemWithId.getBoundingClientRect().top
        const scrollPosition = elemPosition + window.scrollY - offset
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        })
    }
}
export function getBasePathBeforeHash(linkWithHash) {
    const hashIndex = linkWithHash.indexOf('#')
    return linkWithHash.substring(0, hashIndex)
}
export function isBasePathEmpty(basepath) {
    return basepath == null || basepath.length == 0 || basepath == '/'
}
export function isHashEmpty(hash) {
    return hash == null || hash.length == 0 || hash == '#'
}
export function getAnyPropNameExcept(obj, exceptions) {
    if (Array.isArray(exceptions) == false)
        exceptions = [exceptions]
    const props = Object.keys(obj)
    const remainingProps = props.filter(propName => exceptions.includes(propName) == false)
    if (remainingProps.length == 0)
        return null
    return remainingProps[0]
}
export function getLocalStorageBool(name) {
    const value = window.localStorage.getItem(name)
    if (value == null) return false
    if (value == 'false') return false
    if (value == 'true') return true
    return false
}
export function randomInt(low, high){
    return Math.floor(Math.random() * (high - low + 1) + low);
}
export function randomOf(...args){
    return args[randomInt(0, args.length - 1)];
}
export function shuffle(array_a){
    var iRandomize;
    for(iRandomize = 0; iRandomize < array_a.length; iRandomize++){
        var randomizeArrayIndex = randomInt(0, array_a.length - 1);
        var auxRandomize = array_a[iRandomize];
        array_a[iRandomize] = array_a[randomizeArrayIndex];
        array_a[randomizeArrayIndex] = auxRandomize;
    }
    return array_a
}
export function range(fromIncluding, toExcluding) {
    const numbers = []
    for (let i = fromIncluding; i < toExcluding; i++) {
        numbers.push(i)
    }
    return numbers
}
export function takeRandomElements(fromArray, numberOfElements) {
    return shuffle([...fromArray]).slice(0, numberOfElements)
}
export function percentChance(num) {
    const roll = (1 - Math.random()) * 100
    return num >= roll
}
export function capitalizeFirstLetter(str) {
    if (str == null) {
        return 'capitalizeFirstLetter Error'
    }
    const str2 = str.charAt(0).toUpperCase() + str.slice(1)
    return str2
}
export function uncapitalizeFirstLetter(str) {
    const str2 = str.charAt(0).toLowerCase() + str.slice(1)
    return str2
}
export function isLocalhost() {
    return window.location.href.includes('localhost')
}
export function createKey(values) {
    return Array.from(values).map(value => value.substring(0, 10).split(' ').join('_')).join('-')
}
export function assert(cond, message) {
    if (message == null) {
        message = `condition given ${cond} is not true`
    }
    message = 'Assert error: ' + message
    if (cond == null) {
        throw 'Assert error: condition is null'
    }
    if (typeof cond === 'function') {
        if (cond() != true) {
            throw message
        }
    }
    if (cond != true) {
        throw message
    }
}
export function isMobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}
export function objectFromKVArrays(keys, values) {
    if (keys.length != values.length) {
        console.log({keys, values})
        throw `Given keys and values to objectFromKVArrays have unequal lengths`
    }
    const obj = {}
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const value = values[i]
        obj[key] = value
    }
    return obj
}
export function htmlToJson(str) {
    const wrappedStr = `<xml>${str}</xml>`
    let xmlNode = new DOMParser().parseFromString(wrappedStr, 'text/html')
    return xmlNode.children[0]
}
window.xmlToJson = htmlToJson
export function doesSubstringFromStartWith(string, i, startingWith) {
    let withI = 0
    if (i + startingWith.length - 1 > string.length) {
        return false
    }
    while (withI < startingWith.length && i < string.length) {
        const strChar = string.charAt(i)
        const withChar = startingWith.charAt(withI)
        if (strChar != withChar) {
            return false
        }
        withI++
        i++
    }
    return true
}
const customMappings = {
    '@@$#': () => ({ end: '@@$#', tag: 'span', attributes: 'style="color: red;"'}),
    "<p>^^^": () => ({ end: '</p>', tag: 'div', attributes: 'style="margin-top: 5rem"'}),
    '\\aside': () => ({ end: '\\aside', tag: 'div', attributes: 'class="hbc-quote"'}),
    '\\if': () => ({ end: '\\if', tag: 'div', attributes: 'class="hbc-maybe"'}),
    '\\img': (params=[]) => ({ end: '\n', tag: 'img', attributes: 
        `src="${params[0]}" style="${params[2] != 'right'? '': 'position: absolute; right: 12px;'} ${params[1] == 'null'? '': 'width: ' + params[1]};"`,
    ignoreContent: true })
}


export function parseCustomMarkdownStringToString(string) {
    function findMappingItStartsWith(i) {
        for (const key of Object.keys(customMappings)) {
            if (doesSubstringFromStartWith(string, i, key)) {
                return key
            }
        }
        return null
    }
    function getMappingAsHTML(startI, mappingName) {
        const mapping = customMappings[mappingName]()
        let i = startI + mappingName.length
        while (doesSubstringFromStartWith(string, i, mapping.end) == false) {
            i++
        }
        const parameters = []
        let htmlContents = string.substring(startI + mappingName.length, i)
        while (htmlContents.startsWith('(')) {
            const paramEnd = htmlContents.indexOf(')')
            const param = htmlContents.substring(1, paramEnd)
            parameters.push(param)
            htmlContents = htmlContents.substring(paramEnd + 1)
        }

        console.log({parameters})

        const finalMapping = customMappings[mappingName](parameters)

        const finalHTML = 
            finalMapping.ignoreContent?
                `<${finalMapping.tag} ${finalMapping.attributes}/>`
            :
                `<${finalMapping.tag} ${finalMapping.attributes}>${htmlContents}</${finalMapping.tag}>`
        return {
            string,
            html: finalHTML,
            i: i,
            newI: i + finalMapping.end.length - 1  // -1 because of the i++ in the for below
        }
    }

    let newString = ''
    for (let i = 0; i < string.length; i++) {
        const char = string.charAt(i)
        let mappingName = findMappingItStartsWith(i)
        if (mappingName == null) {
            newString += char
            continue
        }
        console.log(`Found one at i = ${i} mappingName="${mappingName}" in string: "${string}"`)
        const result = getMappingAsHTML(i, mappingName)
        console.log({result})
        newString += result.html
        i = result.newI
    }

    return newString
}
export function getDOMNodeAttributes(node) {
    if (node.attributes == null) {
        return null
    }
    return Array
        .from(node.attribute)
        .reduce((soFar, nvp) => ({ ...soFar, [nvp.name]: nvp.value }), {})
}

// ---------------- React Small Utilities ----------------
export const styleMargined = { marginBottom: 'var(--element-padding)' }    // Use this as style={styleMargined}
export const stylePadded   = { padding: 'var(--element-padding)' }

export function getLocalStorageJSON(keyName) {
    const value = localStorage.getItem(keyName)
    if (value == null || value == 'undefined') {
        return null
    }
    try {
        return JSON.parse(value)
    } catch (e) {
        throw `${e.toString()} -- keyName: ${keyName}`
    }
}
export function setLocalStorageJSON(keyName, value) {
    if (value == null) {
        localStorage.removeItem(keyName)
    } else {
        try {
            localStorage.setItem(keyName, JSON.stringify(value))
        }  catch (e) {
            throw `${e.toString()} -- keyName: ${keyName}, value: ${value}`
        }
    }
    window.dispatchEvent(new CustomEvent('custom-storage', { detail: {
        key: keyName,
        value: value
    } }))
}
export function useLocalStorageState(keyName, defaultValue) {
    const existingValue = getLocalStorageJSON(keyName)
    if (existingValue == null) {
        localStorage.setItem(keyName, JSON.stringify(defaultValue))
    }

    const [state, setInnerState] = useState(existingValue == null? defaultValue: existingValue)
    
    useEffect(() => {
        window.addEventListener('custom-storage', evt => {
            if (evt.detail.key == keyName) {
                if (evt.detail.value == null || evt.detail.value == 'undefined') {
                    setInnerState(null)    
                } else {
                    setInnerState(evt.detail.value)
                }
            }
        })

        window.addEventListener('storage', evt => {
            if (evt.key == keyName) {
                if (evt.newValue == null || evt.newValue == 'undefined') {
                    setInnerState(null)
                } else {
                    setInnerState(JSON.parse(evt.newValue))
                }
            }
        })
    }, [])

    function setState(newState) {
        if (newState != null && newState.src != null) {
            console.log(`setState for key ${keyName} with newValue: ${JSON.stringify(newState)}`)
        }
        localStorage.setItem(keyName, JSON.stringify(newState))
        window.dispatchEvent(new CustomEvent('custom-storage', { detail: {
            key: keyName,
            value: newState
        } }))
        setInnerState(newState)
    }

    return [state, setState]
}
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export default function useConstWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
export const useMousePosition = () => {
  const [
    mousePosition,
    setMousePosition
  ] = useState({ x: null, y: null });
  useEffect(() => {
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  return mousePosition;
};

// -------------------------- Canvas --------------------------

let ctxSettings = {
    'default': {}
}
export function saveCtxSettings(ctx, key) {
    let ctxSettingsObject
    if (key == null) {
        ctxSettingsObject = ctxSettings['default']
    } else {
        if (ctxSettings[key] == null) {
            ctxSettings[key] = {}
        }
        ctxSettingsObject = ctxSettings[key]
    }
    ctxSettingsObject.textAlign = ctx.textAlign
    ctxSettingsObject.font = ctx.font
    ctxSettingsObject.fillStyle = ctx.fillStyle
    ctxSettingsObject.globalAlpha = ctx.globalAlpha
    ctxSettingsObject.stroke = ctx.stroke
    ctxSettingsObject.lineWidth = ctx.lineWidth
}
export function loadCtxSettings(ctx, key) {
    const ctxSettingsObject = key == null? ctxSettings['default'] : ctxSettings[key]
    for (const key of Object.keys(ctxSettingsObject)) {
        ctx[key] = ctxSettingsObject[key]
    }
}
export function loadImageAsync(src) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
    });
  }
export function drawImageOnCanvasAsync(canvas, pathOrImage, x, y, width, height, alpha) {
    const ctx = canvas.getContext('2d')
    let image
    if (typeof pathOrImage === 'string' || pathOrImage instanceof String) {
        image = new Image()
        image.src = pathOrImage
    } else {
        image = pathOrImage
    }
    return new Promise((res, rej) => {
        image.onload = function() {
            saveCtxSettings(ctx)
            if (alpha != null) {
                ctx.globalAlpha = alpha
            }
            if (width == null && height != null) {
                ctx.drawImage(image, x, y, getImageRelativeWidthAtHeight(image, height), height)
            } else if (width != null && height == null) {
                ctx.drawImage(image, x, y, width)
            } else if (width != null && height != null) {
                ctx.drawImage(image, x, y, width, height)
            } else {
                ctx.drawImage(image, x, y)
            }
            loadCtxSettings(ctx)
            res()
        }
    })
}
export function getImageRelativeWidthAtHeight(image, atHeight) {
    const aspectRatio = image.naturalWidth / image.naturalHeight
    return atHeight * aspectRatio
}
export function fillCanvasColor(canvas, color) {
    const ctx = canvas.getContext('2d')
    saveCtxSettings(ctx)
    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    loadCtxSettings(ctx)
}
export function clearCanvas(canvas) {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.reset()
}
export function clearRect(canvas, x, y, width, height) {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(x, y, width, height)
}
export function drawText({canvas, font, x, y, text, textAlign='center', color, strokeColor, strokeSize, rotation}) {
    const ctx = canvas.getContext('2d')
    ctx.save()
    if (color != null) {
        ctx.fillStyle = color
    }
    ctx.textAlign = textAlign
    ctx.font = font
    if (strokeColor != null) {
        ctx.strokeStyle = strokeColor
    }
    if (strokeSize != null) {
        ctx.lineWidth = strokeSize
    }
    if (rotation != null) {
        ctx.rotate(Math.PI / 180 * rotation)
    }
    if (strokeSize != null || strokeColor != null) {
        ctx.strokeText(text, x, y);
    }
    ctx.fillText(text, x, y)
    ctx.restore()
}

export function drawTextLines({canvas, font, x, y, width, text, lineHeight, textAlign='center', color, isCenteredY=true, strokeColor, strokeSize}) {
    const ctx = canvas.getContext('2d')
    saveCtxSettings(ctx, 'drawTextLines')
    ctx.font = font
    const lines = getLines(ctx, text, width)
    console.log(`Got lines as`)
    console.log({lines})
    const totalHeight = lines.length * lineHeight
    const startY = isCenteredY ? y - totalHeight / 2 : y
    for (let i = 0; i < lines.length; i++) {
        const textLine = lines[i]
        const thisY = startY + i * lineHeight
        drawText({canvas, font, x, y: thisY, text: textLine, textAlign, color, strokeColor, strokeSize})
    }
    loadCtxSettings(ctx, 'drawTextLines')
    return lines
}

export function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

export function getOnlyKey(obj) {
    return Object.keys(obj)[0]
}
export function getTextWidth(font, text) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.font = font
    const width = ctx.measureText(text).width
    return width
    
}
export function arrayUnion(a, b) {
    const fullArray = [...a]
    for (const elem of b) {
        if (a.includes(b) == false) {
            fullArray.push(elem)
        }
    }
    return fullArray
}
export function arrayDiff(arrayA, arrayB) {
    const onlyArrayA = []
    const both = []
    const onlyArrayB = []
    for (const elemA of arrayA) {
        if (arrayB.includes(elemA)) {
            both.push(elemA)
        } else {
            onlyArrayA.push(elemA)
        }
    }
    for (const elemB of arrayB) {
        if (arrayA.includes(elemB) == false) {
            onlyArrayB.push(elemB)
        }
    }
    return { left: onlyArrayA, both, right: onlyArrayB }
}
export function mergeObjectsContainingArrays(a, b) {
    console.log('Ok')
    const { left, both, right } = arrayDiff(Object.keys(a), Object.keys(b))
    const finalObject = {}
    for (const key of left) {
        finalObject[key] = a[key]
    }
    for (const key of right) {
        finalObject[key] = b[key]
    }
    for (const key of both) {
        finalObject[key] = [...a[key], ...b[key]]
    }
    console.log('yy')
    return finalObject
}
export function randomOfArrayWeighted(items, _weights) {
    if (items.length == 1) {
        return items[0]
    }

    let i;
    let weights = [..._weights]

    for (i = 1; i < weights.length; i++)
        weights[i] += weights[i - 1];
    
    let random = Math.random() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++)
        if (weights[i] > random)
            break;
    
    return items[i];
}
export function includesAll(str, strings) {
    for (const included of strings) {
        if (!str.includes(included)) {
            return false
        }
    }
    return true
}
export function includesAny(str, strings) {
    for (const included of strings) {
        if (str.includes(included)) {
            return included
        }
    }
    return false
}
window.includesAll = includesAll
window.includesAny = includesAny
export function containsNumber(str) {
    for (let i = 0; i < str.length; i++) {
        if ('0123456789'.includes(str.at(i))) {
            return true
        }
    }
    return false
}
window.containsNumber = containsNumber
export function parseFloatIgnoreStrings(str) {
    const allowOnly = '0123456789.'
    const formattedStr = str.split('').filter(char => allowOnly.includes(char)).join('')
    if (formattedStr.length == 0 || formattedStr == '.') {
        throw `Invalid str given to parseFloatIgnoreStrings: "${str}"`
    }
    return parseFloat(formattedStr)
}
window.parseFloatIgnoreStrings = parseFloatIgnoreStrings

// bio = Druid Person 250 Normal
export function bioMatchesSearchText(bio, {mathClauses, textClauses}) {
    const bioNumbers = bio.split(' ').filter(str => containsNumber(str)).map(str => parseFloatIgnoreStrings(str))   // E.g: 400 2   (from "Druid 400 Epic x2")
    function containsName(bio) {
        const matches = []
        for (const clause of textClauses) {
            if (bio.includes(clause)) {
                matches.push(true)
            }
        }
        return matches.length == textClauses.length
    }
    function byNumber(bio) {
        if (containsNumber(bio) == false) {
            return true // 
        }
        for (const clause of mathClauses) {
            let compareNumberToClause = (num, cla) => num == cla
            if (clause.startsWith('>=')) {
                compareNumberToClause = (num, cla) => num >= cla
            } else if (clause.startsWith('>')) {
                compareNumberToClause = (num, cla) => num > cla
            } else if (clause.startsWith('<=')) {
                compareNumberToClause = (num, cla) => num <= cla
            } else if (clause.startsWith('<')) {
                compareNumberToClause = (num, cla) => num < cla
            }
            const clauseAsNumber = parseFloatIgnoreStrings(clause)                                                      // E.g: 250
            return bioNumbers.find(num => compareNumberToClause(num, clauseAsNumber)) != null                           // E.g. Any of [400, 2] > 250
        }
        return false
    }

    let shouldFilterNumbers = mathClauses.length > 0
    let shouldFilterStrings = textClauses.length > 0

    if (shouldFilterNumbers && shouldFilterStrings) {
        return containsName(bio) && byNumber(bio)
    }
    if (shouldFilterNumbers) {
        return byNumber(bio)
    }
    if (shouldFilterStrings) {
        return containsName(bio)
    }
}
window.bio = "Druid 400 Person x2"
window.searchText = ">250"
window.bioMatchesSearchText = bioMatchesSearchText
export function filterArrayBySearch(arr, getElemBio, searchText) {
    searchText = searchText.toLowerCase()
    const clauses = searchText.split('&').map(str => str.trim())
    const mathClauses = clauses.filter(clause => containsNumber(clause))                                            // E.g: >250    (from "Druid & >250")
    const textClauses = clauses.filter(clause => containsNumber(clause) == false)
    return arr.filter(elem => {
        const bio = getElemBio(elem).toLowerCase()
        return bioMatchesSearchText(bio, {mathClauses, textClauses})
    })
}
window.filterArrayBySearch = filterArrayBySearch