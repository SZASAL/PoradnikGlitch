const { MessageEmbed } = require("discord.js")

module.exports =  {
    name: "message",
    enabled: true,

    async run(msg){
        //
        // ZMIENNE
        if(msg.channel.type === `dm`) return
        const { guild } = msg
        const idkanalu = `742820629811822754`
        const idlogi = require(`../config/config`).kanallogi
        //
        //
        if(msg.author.bot) return
        if (msg.channel.id === idkanalu) {
            const tresc = msg.content
            const autor = msg.author.tag
            msg.delete()
            const embed = new MessageEmbed().setColor(`#00ff15`).setAuthor(`${autor}`,`${msg.author.avatarURL()}`).setTimestamp()
                .setDescription(`${tresc}`).setTitle(`Propozycja`)
            const wiad = await msg.channel.send(embed)
            await wiad.react(`✅`)
            await wiad.react(`❌`)

        }
    }
}