const { Permissions: { FLAGS } } = require("discord.js")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    name: "reactionembed",
    description: "Wysyła wiadomość z reaction role.",
    args: false,
    usage: "",
    guildOnly: false,
    cooldown: 60,
    aliases: [],
    botPermissions: [],
    userPermissions: [],
    ownerOnly: true,

    async run(msg){
        const embed = new MessageEmbed()
                .setTitle('Naciśnij na reakcję, aby otrzymywać pingi o:')
                .setColor(`#000000`)
                .setDescription(`1️⃣ - Changelog\n2️⃣ - Ogłoszenia`)
        const wiad = await msg.channel.send(embed)
        await wiad.react(`1️⃣`)
        await wiad.react(`2️⃣`)
        msg.delete()
    }
}