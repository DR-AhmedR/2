const fs = require("fs")

const JSON5 = require('json5');
const attackPreview = JSON5.parse(fs.readFileSync("./a.jsonc"));

console.log(attackPreview.gli.C)

attackPreview.gli.C.forEach(commander => {
    console.log(commander.VIS)
    let melee = 0
    let range = 0
    let cy = 0
    let flank = 0
    let front = 0
    commander.EQ.forEach((eq,i) => {
        let Piece = [
            "Chest",
            "Weapon",
            "Helmet",
            "Artifact",
            "Look",
            "Hero"
        ]
        console.log(Piece[i])
        if(Piece[i] == "Look")
            return
        eq[5].forEach(stat => {
                if (stat[1].size > 1)
                    throw "Unimplemented"
                
                let attributeType = {
                    61 : "Melee (None Relic)",
                    57 : "Wall (None Relic)",
                    59 : "Moat (None Relic)",
                    62 : "Range (None Relic)",
                    58 : "Gate (None Relic)",
                    53 : "Travel Speed (None Relic)",
                    54 : "Plundering (None Relic)",
                    334 : "Combat Strength (None Relic) (Hero)",
                    66 : "Flank (None Relic) (Hero)",
                    234 : "Combat Strength Courtyard (None Relic) (Hero) (Castle Lord)",
                    239 : "Unit Flank Limit Courtyard (None Relic) (Hero) (Castle Lord)",

                    1 : "Melee (Relic)",
                    110 : "Wall (Relic)",
                    5 : "Moat (Relic)",
                    109 : "Range (Relic)", //2
                    2 : "Range (Relic)", //2
                    4 : "Gate (Relic)",
                    111 : "Gate (Relic)",
                    108 : "Melee (Relic)",
                    101 : "Melee (Relic)",
                    3 : "Wall (Relic)",
                    6 : "Speed (Relic)",
                    116 : "Strength in courtyard (Relic)",
                    112 : "Moat (Relic)",
                    7 : "Plundering (Relic)",
                    114 : "Plundering (Relic)",
                    121 : "Shield Madian (Relic)",
                    117 : "Front (Relic)",
                    811 : "Flank (Relic) (Hero) (Castle Lord)",
                    115 : "Flank (Relic)",
                    814 : "Range (Relic) (Hero) (Castle Lord)",
                    809 : "Gate (Relic) (Hero) (Castle Lord)",
                    813 : "Melee (Relic) (Hero) (Castle Lord)",
                    20014 : "Unknown",
                    20018 : "Unknown",
                    60 : "Find powerful artifact",
                    52 : "Honour",
                    51 : "Glory",
                    113 : "Strength in courtyard (Relic)",
                    107 : "Plundered (Relic)",
                    120 : "Combat Strength of units when attacking flank (Relic)",
                    119 : "Combat Strength of units when attacking front (Relic)",
                    64 : "Travel Cost",
                    63 : "Destruction",
                }
                let type = attributeType[stat[0]]
                if(type == undefined)
                    throw `Unknown stat ${stat[0]}`
                else
                    console.log(`${type}: ${stat[stat.length == 3 ? 2 : 1][stat[0] != 121 ? 0 : 1]}`)
        })
    });
})
