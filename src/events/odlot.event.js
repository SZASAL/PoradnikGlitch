module.exports =  {
    name: "guildMemberRemove",
    enabled: true,

    async run(member){
        //
        //
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
        const embed = new MessageEmbed().setColor(`#ff0000`).setAuthor(user.tag, avatar).setThumbnail(user.avatarURL()).setFooter(`🪐 VenousRP`).setTimestamp()
            .setDescription(`${user.tag} wyleciał z wyspy zostało nas ${i}!`)
        kanal.send(embed)
        kanall.setName(`『🙍』Osoby: ${i}`)
        //
        //
    }
}