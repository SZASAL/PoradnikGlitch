const { Permissions: { FLAGS } } = require("discord.js")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    name: "kontaktembed",
    description: "Wysyła wiadomość z embed ticket.",
    args: false,
    usage: "",
    guildOnly: false,
    cooldown: 60,
    aliases: [],
    botPermissions: [],
    userPermissions: [],
    ownerOnly: true,

    async run(msg){
        const {name, avatar, prefix} = require(`../config/config`)
        const embed = new MessageEmbed()
                .setTitle('Kontakt')
                .setColor(0x37ff00)
                .setAuthor(name, avatar)
                .setDescription("**Aby skontaktować się z administracją wpisz:**\n\n``!kontakt Wiadomość``")
                .setFooter(`Odpowiedź na kontakt otrzymasz w wiadomości prywatnej.`)
        const wiad = await msg.channel.send(embed)
        msg.delete()
    }
}