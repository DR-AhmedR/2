const { isMainThread, workerData, parentPort, threadId } = require('node:worker_threads');
const name = "Timer"

if (isMainThread)
    return module.exports = {
        name: name,
        description: "Shuts down after specific time",
        pluginOptions: [
            {
                type: "Text",
                label: "Hours",
                key: "hours",
                default: 2
            },
        ]
    };

const pluginOptions = workerData.plugins[require('path').basename(__filename).slice(0, -3)] ??= {}

const sqlite3 = require("sqlite3")
const {webSocket} = require("../ggebot")

let userDatabase = new sqlite3.Database("./user.db", sqlite3.OPEN_READWRITE)
setTimeout(() => {
    userDatabase.run(`UPDATE SubUsers SET state = ? WHERE id = ?`, [0, workerData.id], _ => {
        userDatabase.close()
        setImmediate(() => webSocket.close())
    })
}, pluginOptions.hours * 1000 * 60 * 60)