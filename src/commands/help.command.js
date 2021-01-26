const { prefix } = require("../config/config.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    description: "Pokazuje wszystkie dostępne komendy",
    usage: "[nazwa komendy]",
    userPermissions: [`ADMINISTRATOR`],
    guildOnly: true,

    run(msg, args){
        const { commands } = msg.client
        const prefix = require(`../config/config`).prefix
        const avatar = require(`../config/config`).avatar
        const data = []
        const opis = commands.map((command) => (`\`${prefix}${command.name}\``)).join("\n")

        if (!args.length) {
            const embed = new MessageEmbed().setTitle(`Lista wszystkich komend:`)
              .setDescription(opis)
              .setColor(`#006dff`)
              .setThumbnail(avatar)
              .setFooter(`Wyślij   ${prefix}help [nazwa komendy]   aby uzyskać informacje o danej komendzie`)
            return msg.channel.send(embed)
            .then(() => {
                if (msg.channel.type === "dm") return
            })
            .catch(err => {
                console.error(`Nie można wysłać wiadomości do ${msg.author.tag}. \n`, err)
                msg.reply("Wygląda na to że, nie można wysłać do Ciebie wiadomości na DM")
            })
        }



        const name = args[0].toLowerCase()
        const command =
          commands.get(name) ||
          commands.find((c) => c.aliases && c.aliases.includes(name))

          const embed1 = new MessageEmbed()
          .setColor(`#006dff`)
    
        if (!command) {
          return msg.reply("nie ma takiej komendy!")
        }
    
        data.push(`**Nazwa:** ${command.name}`)
    
        if (command.aliases) {
          data.push(`**Aliasy:** ${command.aliases.join(", ")}`)
        }
        if (command.description) {
          data.push(`**Opis:** ${command.description}`)
        }
        if (command.usage) {
          data.push(`**Użycie:** ${prefix}${command.name} ${command.usage}`)
    
          data.push(`**Cooldown:** ${command.cooldown?command.cooldown:3} sekundy`)
        }
        embed1.setDescription(data)
        msg.channel.send(embed1)
    }
}