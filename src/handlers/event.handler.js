const { readdirSync } = require("fs")
const chalk = require("chalk")
const { Constants: { Events } } = require("discord.js")
const serverEvents = Object.values(Events)

module.exports = (client, table) => {
    
    const events = readdirSync(__dirname + "/../events").filter((file) =>
    file.endsWith(".event.js"),
    )

    let registeredEventsCount = 0

    for (const file of events) {
        const event = require(__dirname + `/../events/${file}`)

    
       if (!event.run){
           console.log(chalk.redBright(`Event '${file}' missing run()`))
           process.exit(1)
       } else if(typeof event.run !== "function"){
            console.log(`Event ${file} property 'run' must be a function`)
            process.exit(1)
       }

       if (event.enabled === true){
        if(serverEvents.includes(event.name)) {
            client.on(event.name, event.run)
            registeredEventsCount++
           
    
           } else {
               console.log(chalk.redBright("Event ", chalk.greenBright(event.name), ` nie istnieje.`))
           }
       }
      }
    //console.log(events) // POKAZUJE WSZYSTKIE EVENTY NIEZALEŻNIE CZY SĄ FALSE CZY TRUE
    table.addRow(`Eventy`, registeredEventsCount)
}