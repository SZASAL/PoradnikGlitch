const { Permissions: { FLAGS } } = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "changelog",
    description: "Wysyła changeloga",
    args: true,
    usage: "<tresc>",
    guildOnly: true,
    cooldown: 10,
    aliases: [`cl`],
    botPermissions: [],
    userPermissions: [`ADMINISTRATOR`],
    ownerOnly: false,

    async run(msg, args){
        //
        const {avatar, name} = require(`../config/config`)
        const embed = new MessageEmbed().setColor(`#fcba03`).setDescription(`${args.join(` `)}`).setAuthor(name, avatar).setTitle(`🛠CHANGELOG🛠`)
        await msg.channel.send(`<@&745778525168074852>`)
        await msg.channel.send(embed)
        msg.delete()
        //
    }
}