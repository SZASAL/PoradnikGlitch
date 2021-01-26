const { Permissions: { FLAGS } } = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ip",
    description: "Pokazuje IP wyspy.",
    args: false,
    usage: "",
    guildOnly: false,
    cooldown: 10,
    aliases: [],
    botPermissions: [],
    userPermissions: [],
    ownerOnly: false,

    run(msg){
        //
        const ip = require(`../config/config`).ip
        const embed = new MessageEmbed().setColor(`#006dff`).setDescription(`IP wyspy: \`${ip}\``)
        msg.channel.send(embed)
        //
        console.log(msg.guild.iconURL())
    }
}