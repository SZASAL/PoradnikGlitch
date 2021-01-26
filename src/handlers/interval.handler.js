const { readdirSync } = require("fs")
const chalk = require("chalk")
const { Constants: { Events } } = require("discord.js")
const serverEvents = Object.values(Events)


module.exports = (client, table) => {
    
    const intervals = readdirSync(__dirname + "/../intervals").filter((file) =>
    file.endsWith(".interval.js"),
    )

    let i = 0

    for (const file of intervals) {
        const interval = require(__dirname + `/../intervals/${file}`)

        
            client.on(`ready`, () => {
                const xintervalx = require(`../intervals/${file}`)
                xintervalx(client)
            })

        i++
        
       }
     
    table.addRow(`Intervały`, i)
    console.log(table.toString())
    var time = new Date().toLocaleString();
    console.log(chalk.gray(`${time}`),`\n`)

}