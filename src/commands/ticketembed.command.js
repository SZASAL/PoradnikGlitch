const { Permissions: { FLAGS } } = require("discord.js")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    name: "ticketembed",
    description: "Wysyła wiadomość z embed ticket (komenda tylko do konfiguracji).",
    args: false,
    usage: "",
    guildOnly: true,
    cooldown: 60,
    aliases: [],
    botPermissions: [],
    userPermissions: [],
    ownerOnly: true,

    async run(msg){
        const avatar = require(`../config/config`).avatar
        const name = require(`../config/config`).name
        const embed = new MessageEmbed()
                .setTitle('TICKET')
                .setColor(`#006dff`)
                .setDescription(`Kliknij w reakcje 📩 aby otworzyć nowego ticketa!`)
                .setAuthor(name, avatar)
        const wiad = await msg.channel.send(embed)
        wiad.react(`📩`)
        msg.delete()
    }
}