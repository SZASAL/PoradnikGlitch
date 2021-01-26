const { } = require("discord.js")
const { MessageEmbed } = require("discord.js")
const { prefix } = require("../config/config.js")
const avatar = require(`../config/config`).avatar
const namebot = require(`../config/config`).name
const color = require(`../addons/instagram/instagram.colors.json`)


module.exports = {
    name: "instagram",
    description: "Instagram",
    args: false,
    usage: "",
    guildOnly: false,
    cooldown: 3,
    aliases: [],
    botPermissions: [],
    userPermissions: [],
    ownerOnly: false,

    async run(msg){
    //
    // SPRAWDZA CZY WIADOMOŚĆ JEST NA PV
    if(msg.channel.type !== `dm`) {
      msg.delete()
      msg.reply(`tą komendę możesz użyć tylko w DM!`).then(msg => {
        msg.delete({ timeout: 5000 })})
      return
    }
    //
    // WYSYŁA EMBED Z ZAPYTANIEM CO NEXT
    const embed = new MessageEmbed()
      .setTitle(`Instagram CityLife`)
      .setColor(color.j)
      .setAuthor(namebot, avatar)
      .setDescription(`
      **[1]** - Zaloguj się
      **[2]** - Zarejestruj się 
      **[3]** - Anuluj
      `)
      .setFooter(`Wybierz jedną z opcji odpisując 1, 2 lub 3`)
    const sendembed = await msg.channel.send(embed)
    //
    // URUCHAMIA AWAIT MESS
    const filter = m => m.author.id === msg.author.id
    await msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
      .then(collected => {
        const liczba = collected.first().content
        if(!isNaN(liczba)){
          if(liczba === `1`){
            const instagram1 = require("../addons/instagram/1.instagram.js")
            instagram1(msg, sendembed)

          } else if (liczba === `2`){
            const instagram2 = require("../addons/instagram/2.instagram.js")
            let prob = 0
            let n = 0
            instagram2(msg, sendembed, prob, n)

          } else if (liczba === `3`){
            const embedanuluj = new MessageEmbed()
              .setColor(color.j)
              .setAuthor(namebot, avatar)
              .setFooter(`Aby ponowić próbę wpisz ponownie ${prefix}instagram.`)
            sendembed.edit(embedanuluj)
            
          }else {
            const embed4 = new MessageEmbed()
              .setColor(color.b)
              .setTitle(`Opcja którą wybrałeś jest niedostępna!`)
              .setAuthor(namebot, avatar)
              .setFooter(`Aby ponowić próbę wpisz ponownie ${prefix}instagram.`)
            sendembed.edit(embed4)
          }
        } else {
          const embedlitera = new MessageEmbed()
              .setColor(color.b)
              .setTitle(`Prawdopodobnie podałeś literę zamist cyfry!`)
              .setAuthor(namebot, avatar)
              .setFooter(`Aby ponowić próbę wpisz ponownie ${prefix}instagram.\nJeśli twierdzisz, że to błąd, zgłoś go do administracji!`)
            sendembed.edit(embedlitera)
        }
      
    // ZAMKNIĘCIE AWAIT MESS
    })
    //
    // JEŻELI NIE BYŁO ODPOWIEDZI NA MESS
    .catch(() => {
      // TWORZY EMBED 
      const embedfail = new MessageEmbed()
      .setTitle(`Brak odpowiedzi!`)
      .setColor(color.b)
      .setAuthor(namebot, avatar)
      .setFooter(`Aby ponowić próbę wpisz ponownie ${prefix}instagram.\nJeśli twierdzisz, że to błąd, zgłoś go do administracji!`)
      sendembed.edit(embedfail)
      }
      );
    //
    }
}