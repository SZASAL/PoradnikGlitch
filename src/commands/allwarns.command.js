const { } = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "allwarns",
    description: "Komenda pokazująca wszystkie warny na serwerze.",
    args: false,
    usage: "",
    guildOnly: false,
    cooldown: 0,
    aliases: [],
    botPermissions: [],
    userPermissions: [`ADMINISTRATOR`],
    ownerOnly: false,

    async run(msg){
      const sqlite = require(`sqlite3`).verbose();
      let osoba = []
      let warny = []
      let id = []
      let db = new sqlite.Database((__dirname+`/../addons/warny.db`), sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
      //
      let query1 = `SELECT count() FROM data;`
      msg.reply(`odczytuje dane!`).then(msg => {
        msg.delete({ timeout: 1500 })})
      db.get(query1, async (err, row) => {
        const ilosc = row['count()']

        for (let i = 1; i < (ilosc + 1); i++) {
          let query = `SELECT * FROM data WHERE id = "${i}"`
          db.get(query, async (err, row) => {
            if(row){
              osoba.push(`${row.usertag}`)
              warny.push(`${row.warns}`)
              id.push(`${row.allwarns}`)
            } else {
              return
            }
          })
        }
        setTimeout(() => {
          const embed = new MessageEmbed().setColor(`#00ff15`).setTitle(`Warny:`)
          if(!osoba.length){
            embed.setDescription(`Brak warnów!`)
          } else {
            embed.addField(`Nazwa`, osoba.join(`\n`), true)
            embed.addField(`Warnów`, warny.join(`\n`), true)
            embed.addField(`Wszystkie warny`, id.join(`\n`), true)
          }
          msg.channel.send(embed)
        }, 1500);
      })
      //
      

      
    }
}