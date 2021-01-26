const { MessageEmbed } = require("discord.js");

module.exports =  {
    name: "messageReactionAdd",
    enabled: true,

    async run(reaction, user){
        // POBIERA EMOJI JEŚLI SĄ NIEDOSTĘPNE
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
        //
        //
        const idkanaladmin = `745702144048496760`//require(`../config/config`).kanaladminpodania
        //
        // SPRAWDZA CZY WIADOMOŚĆ JEST Z IG
        if (user.bot) return
        //
        if (!reaction.message.author.bot) return
        //
        if(reaction._emoji.name !== '✅' && reaction._emoji.name !== '❌') return
        //
        if (reaction.message.channel.id !== `${idkanaladmin}`) return
        //
        //
        const { guild } = reaction.message.channel
        const idkanalwyniki = `742663463414792264` //require(`../config/config`).kanalwynikipodania
        const kanalwyniki = guild.channels.cache.get(`${idkanalwyniki}`)
        const avatar = require(`../config/config`).avatar
        const namebot = require(`../config/config`).name
        //
        //
        if(reaction._emoji.name === '✅'){
            const uzytkownik = guild.members.cache.get(`${reaction.message.embeds[0].footer.text}`).user
            const embedold = reaction.message.embeds[0]
            if(!uzytkownik){
                reaction.message.channel.send(`${user}, powstał błąd podczas potwierdzania podania!`)
                return
            }
            const embed = new MessageEmbed().setDescription(`${uzytkownik}, twoja prośba o unbana została zatwierdzona, zgłoś się do ${user.tag} z hexem!`).setColor(`#00ff15`).setAuthor(namebot, avatar)
            kanalwyniki.send(embed)
            embed.setDescription(`${uzytkownik}, twoja prośba o unbana została zatwierdzona, zgłoś się do ${user.tag} z hexem!`)
            uzytkownik.send(embed)
            reaction.message.reactions.removeAll()
            const newembed = new MessageEmbed()
                .setTitle(`Podanie o unbana rozpatrzone pozytywnie!`)
                .setDescription(embedold.description)
                .setColor(`#00ff15`)
                .addField(`\u200B`,`\u200B`)
                .addField(`Podanie rozpatrzone przez`, `${user.tag}`)
                .setThumbnail(embedold.thumbnail.url)
                .setAuthor(namebot, avatar)
                .setFooter(embedold.footer.text)
                if(embedold.fields.length > 0){
                    newembed.addField(embedold.fields[0].name, embedold.fields[0].value)
                }
            reaction.message.edit(newembed)
        } else if(reaction._emoji.name === '❌'){
            const uzytkownik = guild.members.cache.get(`${reaction.message.embeds[0].footer.text}`).user
            const embedold = reaction.message.embeds[0]
            if(!uzytkownik){
                reaction.message.channel.send(`${user}, powstał błąd podczas potwierdzania podania!`)
                return
            }
            const embed = new MessageEmbed().setDescription(`${uzytkownik}, twoja prośba o unbana została odrzucona!`).setColor(`#ff0000`).setAuthor(namebot, avatar)
            kanalwyniki.send(embed)
            embed.setDescription(`${uzytkownik}, twoja prośba o unbana została odrzucona przez ${user}!`)
            uzytkownik.send(embed)
            reaction.message.reactions.removeAll()
            const newembed = new MessageEmbed()
                .setTitle(`Podanie o unbana rozpatrzone negatywnie!`)
                .setDescription(embedold.description)
                .setColor(`#ff0000`)
                .addField(`\u200B`,`\u200B`)
                .addField(`Podanie rozpatrzone przez`, `${user.tag}`)
                .setThumbnail(embedold.thumbnail.url)
                .setAuthor(namebot, avatar)
                .setFooter(embedold.footer.text)
                if(embedold.fields.length > 0){
                    newembed.addField(embedold.fields[0].name, embedold.fields[0].value)
                }
            reaction.message.edit(newembed)
        }
    }
}