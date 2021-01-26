const { Permissions: { FLAGS }, MessageEmbed } = require("discord.js")

module.exports = {
    name: "ban",
    description: "Banuje użytkownika",
    args: true,
    usage: "<uzytkownik> [dni(0-7)] [powód]",
    guildOnly: true,
    cooldown: [],
    aliases: [],
    botPermissions: ["BAN_MEMBERS"],
    userPermissions: ["BAN_MEMBERS"],

    async run(msg, args){

    const { channel, guild, mentions, author } = msg
    const idlogi = require(`../config/config`).kanallogi
    var time = new Date().toLocaleString()
    const logi = guild.channels.cache.get(`${idlogi}`)
    let daysArg = +args[1]

    // 
    if (!isNaN(daysArg)) {
      if (daysArg < 0) daysArg = 0
      if (daysArg > 7) daysArg = 7
    }

    const reasonArg = [...args].slice(isNaN(daysArg) ? 1 : 2).join(" ")

    const userToBan = mentions.users.first()

    if (!userToBan) {
      return msg.reply("nie ma takiego użytkownika!")
    }

    if (userToBan.id === author.id) {
      return msg.reply("nie możesz zbanować siebie!")
    }

    const memberToBan = guild.members.cache.get(userToBan.id)

    if (!memberToBan.bannable) {
      return channel.send("Potrzebuje więcej permisji!")
    }

    // 
    const banOptions = {
      reason: reasonArg,
    }

    //
    if (!isNaN(daysArg)) banOptions.days = daysArg

    const embed1 = new MessageEmbed().setColor(`#ff0000`).setTitle(`BAN`).setDescription(`Zostałeś zbanowany na serwerze przez ${msg.author}!\n
            ${reasonArg ? `\n **Powód:** ${reasonArg}` : ""}`).setFooter(`Data: ${time}`)
            await memberToBan.send(embed1)

    // BAN
    memberToBan.ban(banOptions).then((bannedUser) => {
      const embed = new MessageEmbed().setColor(`#eaff00`).setTitle(`BAN`).setDescription(`${bannedUser.user.tag} | ${bannedUser} został zbanowany na serwerze przez ${msg.author}\n
        ${reasonArg ? `\n **Powód:** ${reasonArg}` : ""}`).setFooter(`Data: ${time}`)
      logi.send(embed)
    })
  },
}