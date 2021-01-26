const { prefix } = require("../../config/config")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
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
    function odpnie(zdjcheckw, wyslanezdjcheck) {
      wyslanezdjcheck.delete()
      const embedt = new MessageEmbed()
              .setColor(kolor.j)
              .setAuthor(namebot, avatar)
              .setFooter(`Aby ponowić próbę wpisz ponownie ${prefix}instagram.`)
      zdjcheckw.edit(embedt)
      
  }
  //
    function brakzdj() {
      const embedt = new MessageEmbed()
              .setColor(kolor.i)
              .setTitle(`Prawdopodobnie nie dodałeś żadnego zdjęcia, spróbuj ponownie!`)
              .setAuthor(namebot, avatar)
              .setFooter(`Jeśli twierdzisz, że to błąd, zgłoś go do administracji!`)
      sendembed.edit(embedt)
      setTimeout(() => {
        instagram4(msg, sendembed, row)
      }, 1500);
  }
  //
  function tagi() {
    const embedtag = new MessageEmbed()
            .setColor(kolor.t)
            .setTitle(`Teraz dodaj tagi!\n(Np. #friends #car)`)
            .setAuthor(namebot, avatar)
            .setFooter(`Jeśli nie chcesz żadnych tagów odpisz "brak"  |  Ograniczenie czasu 1 min.`)
    sendembed.edit(embedtag)
  }
  //
    // WYSYŁA ZAPYTANIE NA JAKI PORTAL KTOŚ CHCE WEJŚĆ
    const embed = new MessageEmbed()
            .setTitle(`Teraz dodaj zdjęcie z opisem!`)
            .setColor(kolor.t)
            .setAuthor(namebot, avatar)
            .setFooter(`Ograniczenie czasu: 1 min.`)
        sendembed.edit(embed)
    //
    const filter = m => m.author.id === msg.author.id
    await msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
      .then(async collected => {
        const odpobj = collected.first()
        if(odpobj.attachments.first()) {
          const urlzalacznika = odpobj.attachments.first().url
          const opis = odpobj.content
          const nickdoig = row.nick
          //
          tagi()
          const filter = m => m.author.id === msg.author.id
          msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
          .then(async collected => {
            const odptag = collected.first().content.toLowerCase()
          //////
          const zdjig = new MessageEmbed()
              .setColor(kolor.t)
              .setDescription(opis)
              .setImage(`${urlzalacznika}`)
              .setAuthor(nickdoig, avatar)
              ///////////////////
              const Canvas = require("canvas")
              const canvas = Canvas.createCanvas(50, 50)
              const ctx = canvas.getContext("2d")
              const background = await Canvas.loadImage(__dirname + "/../assets/img/heart1.png")
              ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
              //
              let score = row.score
              var x = canvas.width / 2 + 8;
              var y = canvas.height / 2;
              var rozmiarczcionki = 9
              //
              //ctx.font = `bold ${rozmiarczcionki}px arial`
              ctx.font = "bold 10pt Arial";
              ctx.textAlign = 'center';
              ctx.fillStyle = "#23272A"
              ctx.fillText(score, x, (y + (rozmiarczcionki/2.5)))
              const attachment = new Discord.MessageAttachment(
                canvas.toBuffer(),
                "heart.png",
              )
              zdjig.attachFiles(attachment)
              zdjig.setThumbnail('attachment://heart.png')
              ///////////////////
              if(odptag !== `brak`){
                zdjig.setFooter(`${odptag}`)
              } 
          const wyslanezdjcheck = await msg.channel.send(zdjig)
          //
          const zdjcheck = new MessageEmbed()
              .setColor(kolor.t)
              .setDescription(`Jeśli wszystko się zgadza odpisz \`tak\`, jeśli nie ponów próbę komendą ${prefix}instagram!`)
              .setAuthor(namebot, avatar)
          const zdjcheckw = await msg.channel.send(zdjcheck)
          const filter = m => m.author.id === msg.author.id
          msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
          .then(collected => {
            const odp = collected.first().content.toLowerCase()
            if(odp === `tak`){
              const instagram5 = require("./5.instagram.zdj.js")
              instagram5(msg, sendembed, row, zdjig, zdjcheckw)
            } else {
              odpnie(zdjcheckw, wyslanezdjcheck)
            }
          
          })
          .catch(() => {
            timeout() // URUCHAMIA FUNKCJE KTÓRA WYSYŁA ŻE MINĄŁ CZAS
          });
          //////
          })
          .catch(() => {
            timeout() // URUCHAMIA FUNKCJE KTÓRA WYSYŁA ŻE MINĄŁ CZAS
          });
        } else {
          brakzdj()
        }
          
      })
      .catch(() => {
        timeout() // URUCHAMIA FUNKCJE KTÓRA WYSYŁA ŻE MINĄŁ CZAS
      });
    //
    //
}