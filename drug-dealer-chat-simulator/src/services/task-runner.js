
let isTaskRunnerAlreadyStarted = false
let lastTickTimestamp = Date.now()
const tasksByName = {}
export function startRunningTasks() {
    if (isTaskRunnerAlreadyStarted) {
        return
    }
    isTaskRunnerAlreadyStarted = true
    setInterval(() => {
        for (const key of Object.keys(tasksByName)) {
            tasksByName[key]?.()
        }
        lastTickTimestamp = Date.now()
    }, 1000)
}
export function getTimeSinceLastTick() {
    return Date.now() - lastTickTimestamp
}
export function onGameTick(name, func) {
    tasksByName[name] = func
}