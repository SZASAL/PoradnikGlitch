const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "kontakt",
    description: "Komenda dzięki której można się komunikować z administracją",
    args: true,
    usage: "<wiadomość>",
    guildOnly: true,
    cooldown: 60,
    aliases: [`k`],
    botPermissions: [],
    userPermissions: [],
    ownerOnly: false,

    async run(msg, args){
        //
        // ZMIENNE 
        const { guild, author, channel } = msg
        const {kanalkontakt, kanalkontaktadmin} = require(`../config/config`)
        const kanal = guild.channels.cache.get(`${kanalkontakt}`)
        var time = new Date().toLocaleString();
        const kanaladmin = guild.channels.cache.get(`${kanalkontaktadmin}`)
        //
        if(!kanal){console.log(`Brak kanału!`)}
        if(!kanaladmin){console.log(`Brak kanału admin!`)}
        //
        if(channel !== kanal) { 
          msg.reply('tej komendy nie możesz używać na tym kanale!')
          .then(msg => {
            msg.delete({ timeout: 2000 })
          })
          msg.delete()
          return
        }
        //
        const preembed = new MessageEmbed().setTitle(`Nowe zgłoszenie!`)
        const wiad = await kanaladmin.send(preembed)
        const tresc = args.join(` `)
        //
        const embed = new MessageEmbed()
          .setTitle(`Nowe zgłoszenie`)
          .setColor(`#347aeb`)
          .setAuthor(author.id, author.avatarURL())
          .setFooter(`Aby odpowiedzieć na to zgłoszenie wpisz: !odpowiedz ${wiad.id} <tresc>`)
          .setThumbnail(author.avatarURL())
          .setDescription(`\n**Zgłaszający:** ${author} | ${author.tag}\n**Data zgłoszenia:** ${time}\n
              **Treść zgłoszenia:**\n${tresc}`)
        //
        wiad.edit(embed)
        author.send(new MessageEmbed().setColor(`#ffdd00`).setDescription(`Twoje zgłoszenie zostało wysłane, za niedługo dostaniesz odpowiedź!`).setFooter(`ID zgłoszenia: ${wiad.id}`))
        msg.delete()
    }
}