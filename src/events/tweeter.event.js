const { MessageEmbed } = require("discord.js")

module.exports =  {
    name: "message",
    enabled: true,

    async run(msg){
        //
        // ZMIENNE
        if(msg.channel.type === `dm`) return
        const { guild } = msg
        const idkanalu = `742662775662444635`
        const idlogi = require(`../config/config`).kanallogi
        const logi = guild.channels.cache.get(`${idlogi}`)
        //
        //
        if(msg.author.bot) return
        if (msg.channel.id === idkanalu) {
            const tresc = msg.content
            const autor = msg.author.tag
            msg.delete()
            const embed = new MessageEmbed().setColor(`#1DA1F2`).setAuthor(`${autor}`,`https://pomoc.home.pl/wp-content/uploads/2019/11/twitter-logo-300x300.png`).setTimestamp()
                .setDescription(`${tresc}`)
            msg.channel.send(embed)
            const embed1 = new MessageEmbed().setColor(`#1DA1F2`).setTitle(`Nowy tweeter!`).setDescription(`**Autor:** ${msg.author} | ${msg.author.tag}\n\n\n**Treść:**\n${tresc}`).setTimestamp()
            logi.send(embed1)

        }
    }
}