const { readdirSync } = require("fs")
const { prefix, owner } = require(__dirname + "/../config/config.js")
const { Collection } = require("discord.js")
const ascii = require("ascii-table")
const chalk = require("chalk")

module.exports = (client, table) => {
  // Collections
  client.commands = new Collection()
  const cooldowns = new Collection()

  const commandFiles = readdirSync(__dirname + "/../commands").filter((file) =>
    file.endsWith(".command.js"),
  )

  let i = 0
  let x = 0

  for (const file of commandFiles) {
    const command = require(__dirname + `/../commands/${file}`)

    if (command.name) {
      client.commands.set(command.name, command)
      i++
    } else {
      x++
      continue
    }
  }

  table.addRow(`Komendy`, i)

  if(x !== 0){
    console.log(chalk.redBright(`${x} komend nie zostało uruchomionych!`))
  }

  client.on("message", (msg) => {
    const { author, guild, channel } = msg
    // Check if user is a bot
    if (author.bot) {
      return
    }
    // Ignore messages without prefix
    if (!msg.content.startsWith(prefix)) return
    //
    const args = msg.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g)
    //
    const cmdName = args.shift().toLowerCase()
    const cmd = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName))
    //
    // Check if commands exist
    if (!cmd) return

    if (cmd.guildOnly && !guild){
      return msg.reply("Wiadomość może zostać wysłana tylko na serwerze")
    }
    //SPRAWDZA OWNERONLY
    if(cmd.ownerOnly) {
      if (author.id !== owner){
        return msg.reply("tylko właściciel bota może używać tej komendy!")
      }
    }
    //SPRAWDZA PERMISJE

    //BOTA
    if (cmd.botPermissions && cmd.botPermissions.length){
      if(!guild.me.permissionsIn(channel).has(cmd.botPermissions)){
          return channel.send(`Bot potrzebuje więcej permisji aby wykonać tą komendę! \`${cmd.botPermissions.join(
          "`,`",
          )}\`.`
        )
      }
    }
    //UŻTYKOWNIKA
    if (cmd.userPermissions && cmd.userPermissions.length){
      if(!msg.member.permissionsIn(channel).has(cmd.userPermissions)){
        return msg.reply("potrzebujesz większe permisje do tej komendy!")
      }
    }
    //
    if (cmd.args && !args.length) {
      let reply = `Nie podałeś żadnego argumentu, ${msg.author}!`

      if (cmd.usage) {
        reply += `\nPoprawne użycie to: \`${prefix}${cmdName} ${cmd.usage}\``
      }
      return msg.channel.send(reply)
      
    }

    if(!cooldowns.has(cmdName)){
      cooldowns.set(cmdName, new Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(cmdName)
    const cooldownAmout = (cmd.cooldown || 3) * 1000

    if(timestamps.has(msg.author.id)) {

      const expirantionTime = timestamps.get(msg.author.id) + cooldownAmout

      if(now < expirantionTime && msg.author.id !== owner){
        const timeLeft = (expirantionTime - now) / 1000
        return msg.reply(`Poczekaj ${timeLeft.toFixed(1)} sekund przed uruchamianiem komendy \`${cmdName}\` `)
      }

    }

    timestamps.set(author.id, now)
    setTimeout(() => {
      timestamps.delete(author.id)
    }, cooldownAmout);

    try {
      cmd.run(msg, args)
    } catch (error) {
      console.error(error)
      msg.reply("there was an error trying to execute that command!")
    }
  })
}