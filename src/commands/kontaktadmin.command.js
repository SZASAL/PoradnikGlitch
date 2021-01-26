const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "odpowiedz",
    description: "Komenda dzięki której administracja może odpowiadać na zgłoszenia",
    args: true,
    usage: "<wiadomość>",
    guildOnly: true,
    cooldown: 60,
    aliases: [`k`],
    botPermissions: [],
    userPermissions: [],
    ownerOnly: false,

    run(msg, args){
        //
        // ZMIENNE 
        const { guild, author, channel } = msg
        const {kanalkontakt, kanalkontaktadmin} = require(`../config/config`)
        const kanaladmin = guild.channels.cache.get(`${kanalkontaktadmin}`)
        const idwiad = args[0]
        var time = new Date().toLocaleString();
        //
        if(!kanaladmin){console.log(`Brak kanału admin!`)}
        //
        if(channel !== kanaladmin) { 
          msg.reply('tej komendy nie możesz używać na tym kanale!')
          .then(msg => {
            msg.delete({ timeout: 2000 })
          })
          msg.delete()
          return
        }
        //
        kanaladmin.messages.fetch({around: `${idwiad}`, limit: 1})
        .then(async msgg => {
            const Msg = msgg.first()
            if(!Msg) {
                msg.reply('nie znaleziono takiego zgłoszenia!')
                    .then(msg => {
                        msg.delete({ timeout: 2000 })
                })
            }
            const e = Msg.embeds[0]
            const autor = guild.members.cache.get(e.author.name)
            if(!autor) return console.log(`Nie znaleziono autora.\nMiejsce błedu: ${__filename}`)
            const odp = args.slice(1).join(` `)
            const embed = new MessageEmbed()
                .setColor(`#00ff15`)
                .setTitle(`Zgłoszenie`)
                .setAuthor(e.author.name, e.author.iconURL)
                .setThumbnail(e.thumbnail.url)
                .setDescription(`${e.description}\n\n---\n\n**Kto odpowiedział:** ${msg.author.tag}\n**Data odpowiedzi:** ${time}\n\n**Odpowiedź:**\n${odp}`)

            const odpowiedz = new MessageEmbed().setColor(`#00ff15`).setAuthor(author.tag, author.avatarURL()).setTitle(`Odpowiedź na zgłoszenie o ID ${idwiad}:`)
                .setDescription(odp).setTimestamp()
            //
            autor.send(odpowiedz)
                .catch(err => {
                    msg.reply(`do tego użytkownika bot nie może wysłać wiadomości DM!`)
                })
            Msg.edit(embed)
            msg.delete()
        })
    }
}