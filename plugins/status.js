if (require('node:worker_threads').isMainThread)
    return module.exports = { hidden: true, force : true }

const { xtHandler, sendXT, waitForResult } = require("../ggebot")
const ActionType = require("../actions.json")
const { parentPort } = require('node:worker_threads');

let status = {}
xtHandler.on("lli", (_, r) => {
    if (r != 0)
        return
    let parseGRC = obj => {
        if (obj.KID != 4)
            return

        Object.assign(status, {
            aquamarine: Math.floor(obj.A),
            food: Math.floor(obj.F),
            mead: Math.floor(obj.MEAD)
        })
        parentPort.postMessage([ActionType.StatusUser, status])
    }
    xtHandler.on("grc", (obj, r) => r == 0 ? parseGRC(obj) : void 0)
    xtHandler.on("jaa", (obj, r) => r == 0 ? parseGRC(obj.grc) : void 0)
})

module.exports = status