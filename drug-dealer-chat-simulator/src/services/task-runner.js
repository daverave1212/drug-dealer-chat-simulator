
let isTaskRunnerAlreadyStarted = false
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
    }, 1000)
}

export function onGameTick(name, func) {
    tasksByName[name] = func
}