const { prefix } = require("../../config/config")
const { MessageEmbed } = require("discord.js")
const kolor = require(`./instagram.colors.json`)
const avatar = require(`../../config/config`).avatar
const namebot = require(`../../config/config`).name

module.exports = async (msg, sendembed, row) => {
    //
    // ZMIENNE
    const sqlite = require(`sqlite3`).verbose();
    const instagram4 = require("./4.instagram.zdj.js")
    //
    // FUNKCJE
    function timeout() {
        const embedt = new MessageEmbed()
                .setColor(kolor.b)
                .setTitle(`Czas na wprowadzenie danych minął!`)
                .setAuthor(namebot, avatar)
                .setFooter(`Aby ponowić próbę wpisz ponownie ${prefix}instagram.\nJeśli twierdzisz, że to błąd, zgłoś go do administracji!`)
        sendembed.edit(embedt)
    }
    //
    // WYSYŁA ZAPYTANIE NA JAKI PORTAL KTOŚ CHCE WEJŚĆ
    const embed = new MessageEmbed()
            .setTitle(`Instagram ${namebot}`)
            .setColor(kolor.j)
            .setAuthor(namebot, avatar)
            .setDescription(`
        **[1]** - Instagram
        **[2]** - Statystyki konta
        **[3]** - Anuluj
        `)
            .setFooter(`Wybierz jedną z opcji odpisując 1, 2 lub 3`)
        sendembed.edit(embed)
    //
    const filter = m => m.author.id === msg.author.id
    await msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
      .then(collected => {
        const liczba = collected.first().content
        if(!isNaN(liczba)){
          if(liczba === `1`){
            instagram4(msg, sendembed, row)

          } else if (liczba === `2`){
              const embed2 = new MessageEmbed()
                    .setTitle(`STATYSTKI TWOJEGO KONTA`)
                    .setColor(kolor.j)
                    .setAuthor(namebot, avatar)
                    .setDescription(`
                    **Nick : **${row.nick}
                    **Łączna liczba postów : **${row.posts}
                    **Łączna liczba lików : **${row.score}`)
                    .setFooter(`Aby się zalogować, wpisz ponownie ${prefix}instagram`)
            sendembed.edit(embed2)
          } else if (liczba === `3`){
            const embedanuluj = new MessageEmbed()
              .setColor(kolor.j)
              .setAuthor(namebot, avatar)
              .setFooter(`Aby ponowić próbę wpisz ponownie ${prefix}instagram.`)
            sendembed.edit(embedanuluj)
            
          }else {
            const embed4 = new MessageEmbed()
              .setColor(kolor.b)
              .setTitle(`Opcja którą wybrałeś jest niedostępna!`)
              .setAuthor(namebot, avatar)
              .setFooter(`Aby ponowić próbę wpisz ponownie ${prefix}instagram.`)
            sendembed.edit(embed4)
          }
        } else {
          const embedlitera = new MessageEmbed()
              .setColor(kolor.b)
              .setTitle(`Prawdopodobnie podałeś literę zamist cyfry!`)
              .setAuthor(namebot, avatar)
              .setFooter(`Aby ponowić próbę wpisz ponownie ${prefix}instagram.\nJeśli twierdzisz, że to błąd, zgłoś go do administracji!`)
            sendembed.edit(embedlitera)
        }
      })
      .catch(() => {
        timeout() // URUCHAMIA FUNKCJE KTÓRA WYSYŁA ŻE MINĄŁ CZAS
      });
      
    //
    //
}