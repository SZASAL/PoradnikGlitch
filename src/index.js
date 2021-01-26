const { Client, MessageFlags, MessageEmbed } = require("discord.js")
const chalk = require("chalk")
const ascii = require("ascii-table")
const { token, prefix } = require("./config/config.js")
const client = new Client({ partials: ["MESSAGE", "REACTION"] })
const commandHandler = require("./handlers/command.handler") 
const eventHandler = require("./handlers/event.handler")
const intervalHandler = require("./handlers/interval.handler")
const log = console.log
const table = new ascii().setHeading("Nazwa", `Ilość`)
const sqlite = require(`sqlite3`).verbose()
//
//
commandHandler(client, table)
//
eventHandler(client, table)
//
intervalHandler(client, table)
//
client.on("ready", () => {
  log(chalk.green(`Zalogowano jako ${client.user.tag}!`),`\n`,chalk.black(`______________________________`))
})
//
//
client.on(`message`, msg => {
  if (msg.channel.type === `dm` && msg.content === `!info` || msg.content === `!autor`){
    const embed = new MessageEmbed().setDescription(`Bot został stworzony przez **!ENDRU#999**!`).setColor(`#00ffb7`)
    msg.channel.send(embed)
  }
})
//
//
client.login(token)
//
client.on("debug", () => {})
client.on("warn", (msg) => {
  log(chalk.green(info))
})
client.on("error", () => {})
// 