const { MessageEmbed } = require("discord.js")

module.exports =  {
    name: "message",
    enabled: true,

    async run(msg){
        //
        // ZMIENNE
        if(msg.channel.type === `dm`) return
        const { guild } = msg
        const idkanalu = require(`../config/config`).darkweb
        const idlogi = require(`../config/config`).kanallogi
        const logi = guild.channels.cache.get(`${idlogi}`)
        //
        //
        if(msg.author.bot) return
        if (msg.channel.id === idkanalu) {
            const tresc = msg.content
            const autor = Math.floor(msg.author.id/90642121313)
            msg.delete()
            const embed = new MessageEmbed().setColor(`BLACK`).setAuthor(`${autor}`,`https://pbs.twimg.com/profile_images/1269007854188597256/smxRNSC3_400x400.jpg`).setTimestamp()
                .setDescription(`${tresc}`)
            msg.channel.send(embed)
            const embed1 = new MessageEmbed().setColor(`BLACK`).setTitle(`Nowy darkweb!`).setDescription(`**Autor:** ${msg.author} | ${msg.author.tag}\n\n\n**Treść:**\n${tresc}`).setTimestamp()
            logi.send(embed1)

        }
    }
}