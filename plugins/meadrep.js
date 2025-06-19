const {workerData, isMainThread} = require('node:worker_threads')

const name = "Mead replace"

if (isMainThread)
    return module.exports = {
        name : name,
        description : "Mead replace",
    }

const { xtHandler, sendXT, waitForResult } = require("../ggebot")

let dcl = undefined
let gcl = undefined

xtHandler.on("dcl", (obj) => {
    dcl = obj
})

xtHandler.on("gcl", (obj) => {
    gcl = obj
})
const externalKingdom = 12
const stormIslands = 4
const greatEmpire = 0
const castleType = 0
const areaID = 3
const mainCastle = 1

async function needMead() {
    try {
        await sendXT("dcl", JSON.stringify({CD : 1}))

        {
            let [obj] = await waitForResult("dcl", 1000 * 10)
            dcl = obj //hacky nooo
        }
        let ai = gcl.C.find(k => k.KID == stormIslands).AI.find(ai => ai.AI[castleType] == externalKingdom)
        let areaInfo = dcl.C.find(k => k.KID == stormIslands).AI.find(ai2 => ai2.AID == ai.AI[areaID])
        
        // console.log((areaInfo.MEAD / (areaInfo.gpa.DMEADC / 10) - 2.1) * 60 * 60)
        if(areaInfo?.gpa?.MRMEAD == undefined || areaInfo.gpa.MRMEAD <= 0)
            return console.warn("No mead storage")
        if(areaInfo.MEAD / (areaInfo.gpa.DMEADC / 10) > 2.1) {
            let time = (areaInfo.MEAD / (areaInfo.gpa.DMEADC / 10) - 2.1) * 60 * 60 * 1000
            if(areaInfo.gpa.DMEADC != 0) //2147483647
                setTimeout(needMead, Math.min(time, 2147483647))
            
            return console.log("Don't need mead")
        }
        console.log("Need mead")
        //From where? Try ops... Don't take from those who are in the negatives todo
        //await sendXT("grc", JSON.stringify({"AID":3750279,"KID":greatEmpire}))
        //let [obj] = await waitForResult("grc", 1000 * 10)
        let mainCastleAI = gcl.C.find(k => k.KID == greatEmpire).AI.find(ai => ai.AI[castleType] == mainCastle)

        console.log(`Will try to send ${Math.floor(areaInfo.gpa.MRMEAD - areaInfo.MEAD)} Mead`)
        await sendXT("kgt", JSON.stringify({"SCID":mainCastleAI.AI[areaID],"SKID":greatEmpire,"TKID":stormIslands,"G":[["MEAD", Math.floor(areaInfo.gpa.MRMEAD - areaInfo.MEAD)]]}))
        console.log((areaInfo.gpa.MRMEAD / (areaInfo.gpa.DMEADC / 10) - 2.1) * 60 * 60 * 1000)
        if(areaInfo.gpa.DMEADC != 0)
            setTimeout(needMead, (areaInfo.gpa.MRMEAD / (areaInfo.gpa.DMEADC / 10) - 2.1) * 60 * 60 * 1000)
    }
    catch (e) {
        console.warn(e)
        console.warn("Is storm even unlocked?")
    }
}
setTimeout(async () => {
    needMead()
}, 1000 * 10)
