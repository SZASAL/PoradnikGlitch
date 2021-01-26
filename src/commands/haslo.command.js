const { Permissions: { FLAGS } } = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "haslo",
    description: "Pokazuje hasło wyspy.",
    args: false,
    usage: "",
    guildOnly: false,
    cooldown: 10,
    aliases: [`password`],
    botPermissions: [],
    userPermissions: [],
    ownerOnly: false,

    run(msg){
        //
        const haslo = require(`../config/config`).haslo
        const embed = new MessageEmbed().setColor(`#006dff`).setDescription(`Hasło wyspy: \`${haslo}\``)
        msg.channel.send(embed)
        //
    }
}