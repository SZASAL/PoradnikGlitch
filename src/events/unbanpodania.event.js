module.exports =  {
    name: "message",
    enabled: true,

    async run(msg){
        //
        // SPRAWDZA CZY AUTOR TO BOT
        if(msg.author.bot) return
        //
        // SPRAWDZA CZY WIADOMOŚCI SĄ NA DM
        if(msg.channel.type === `dm`) return
        //
        // ZMIENNE
        const { guild } = msg
        const { MessageEmbed } = require("discord.js")
        const avatar = require(`../config/config`).avatar
        const namebot = require(`../config/config`).name
        const listakanalow = [`743470163361398794`, `720761523579912264`]
        const idkanal = `745702144048496760`//require(`../config/config`).kanaladminpodania
        const kanaladmin = guild.channels.cache.get(`${idkanal}`)
        //
        // SPRAWDZA CZY WIADOMOŚĆ JEST NA DOBRYM KANALE
        if(listakanalow.join().includes(`${msg.channel.id}`) && listakanalow.join().includes(`${msg.channel.parent.id}`)){
            
            
            const trescpodania = msg.content
            const embed = new MessageEmbed().setAuthor(namebot, avatar).setTitle(`Nowe podanie o unbana!`).setFooter(`${msg.author.id}`).setColor(`#fcfc03`).setThumbnail(`${msg.author.avatarURL()}`).setDescription(`**Autor podania:** ${msg.author} | ${msg.author.tag}\n
            **Treść podania:**\n\n${trescpodania}\n`)
            if(msg.attachments.find(u => u)){
                const a = (msg.attachments.find(u => u))
                embed.addField(`Załącznik`, `${a.url}`)
            }
            const wiadadmin = await kanaladmin.send(embed)
            await wiadadmin.react(`✅`)
            await wiadadmin.react(`❌`)
            msg.delete()
            const embed1 = new MessageEmbed().setDescription(`Twoje podanie o unbana wkrótce zostanie rozpatrzone!`).setColor(`#ffe600`).setAuthor(namebot, avatar)
            msg.author.send(embed1)
        } else return
        //
        //
        
    }
}