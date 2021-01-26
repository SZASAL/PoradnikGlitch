module.exports =  {
    name: "guildMemberAdd",
    enabled: true,

    async run(member){
        //
        // WYSYŁA WIADOMOŚĆ
        const avatar = require(`../config/config`).avatar
        const { MessageEmbed } = require("discord.js")
        const { guild, user } = member
        const idkanall = require(`../config/config`).kanalnowy
        const kanall = guild.channels.cache.get(`${idkanall}`)
        //
        //
        kanall.setName(`『👤』Nowy: ${member.displayName}`)
        //
        //
    }
}