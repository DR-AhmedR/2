const path = require('node:path');
const fs = require("fs")

const dir = fs.readdirSync(__dirname)

const plugins = new Array(dir.length - 1)

fs.readdirSync(__dirname).forEach(file => {
    if(file == path.basename(__filename))
        return

    if(path.extname(file) != ".js")
        throw Error("None javascript file within path")

    plugins.push([file.slice(0, -3), require(path.join(__dirname, file))])
})

module.exports = plugins