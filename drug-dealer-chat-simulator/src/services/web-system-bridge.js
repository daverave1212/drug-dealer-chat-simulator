import { getLocalStorageBool, getLocalStorageJSON, setLocalStorageJSON, useLocalStorageState } from "../lib/utils"


export function exit() {
    window.close()
}

export const useStorage = useLocalStorageState
export const setStorage = setLocalStorageJSON
export const getStorage = getLocalStorageJSON