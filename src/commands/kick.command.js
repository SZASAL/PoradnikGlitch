const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "kick",
    description: "Komenda która kickuje użytkownika",
    args: true,
    usage: "<user> [powód]",
    guildOnly: true,
    cooldown: [],
    aliases: [],
    botPermissions: ["KICK_MEMBERS"],
    userPermissions: ["KICK_MEMBERS"],

    async run(msg, args){

        const { guild, author, mentions } = msg
        const userToKick = mentions.users.first()
        const reasonArg = [...args].slice(1).join(" ")
        const idlogi = require(`../config/config`).kanallogi
        var time = new Date().toLocaleString()
        const logi = guild.channels.cache.get(`${idlogi}`)

        if(!userToKick){
            return msg.reply(`musisz podać osobę którą chesz wyrzucić`)
        }

        if(userToKick.id === author.id){
            return msg.reply("nie możesz wyrzucić samego siebie!")
        }

        if(userToKick.id === "736359863160143893"){
            return msg.reply("nie możesz wyrzucić bota!")
        }

        const memberToKick = guild.members.cache.get(userToKick.id)

        if (!memberToKick.kickable) {
            msg.reply(`Potrzebuje więcej permisji aby wyrzucić ${memberToKick}`)
        }
        
        const embed1 = new MessageEmbed().setColor(`#ff0000`).setTitle(`KICK`).setDescription(`Zostałeś wyrzucony z serwera przez ${msg.author}!\n
            ${reasonArg ? `\n **Powód:** ${reasonArg}` : ""}`).setFooter(`Data: ${time}`)
            await userToKick.send(embed1)

        memberToKick.kick(reasonArg).then(kickedUser => {
            const embed = new MessageEmbed().setColor(`#eaff00`).setTitle(`KICK`).setDescription(`${kickedUser.user.tag} | ${kickedUser} został wyrzucony z serwera przez ${msg.author}\n
            ${reasonArg ? `\n **Powód:** ${reasonArg}` : ""}`).setFooter(`Data: ${time}`)
            logi.send(embed)
        })

    }
}