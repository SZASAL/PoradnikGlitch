module.exports =  {
    name: "guildMemberAdd",
    enabled: true,

    async run(member){
        //
        // WYSYŁA WIADOMOŚĆ
        const avatar = require(`../config/config`).avatar
        const { MessageEmbed } = require("discord.js")
        const { guild, user } = member
        const idkanall = require(`../config/config`).kanalliczbaosoball
        const kanall = guild.channels.cache.get(`${idkanall}`)
        const idkanal = require(`../config/config`).kanalpowitania
        const kanal = guild.channels.cache.get(`${idkanal}`)
        
        //
        // ZMIENIA LICZBE OSÓB
        let i = 0
        await guild.members.cache.forEach(element => {
            if(!element.user.bot){
                i++
            }
        });
        const embed = new MessageEmbed().setColor(`#00ff15`).setAuthor(user.tag, avatar).setThumbnail(user.avatarURL()).setFooter(`🪐 VenousRP`).setTimestamp()
            .setDescription(`Witamy na serwerze 🪐VenousRP! Jesteś naszym ${i} użytkownikiem!`)
        kanal.send(embed)
        kanall.setName(`『🙍』Osoby: ${i}`)
        //
        //
    }
}