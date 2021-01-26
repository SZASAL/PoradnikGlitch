const { } = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "warn",
    description: "Nadaje warna na użytkownika",
    args: true,
    usage: "<użytkownik> [powód]",
    guildOnly: false,
    cooldown: 0,
    aliases: [],
    botPermissions: [],
    userPermissions: [`MANAGE_MESSAGES`],
    ownerOnly: false,

    async run(msg, args){
      const { guild } = msg
      const sqlite = require(`sqlite3`).verbose();
      var time = new Date().toLocaleString()
      let db = new sqlite.Database((__dirname+`/../addons/warny.db`), sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
      const idlogi = require(`../config/config`).kanallogi
      const logi = guild.channels.cache.get(`${idlogi}`)
      const idwarny = require(`../config/config`).warny
      const warny = guild.channels.cache.get(`${idwarny}`)
      //
      const iduzytkownika = args[0].slice(3, args[0].length - 1)
      const uzytkownik = guild.members.cache.get(`${iduzytkownika}`)
      if(!uzytkownik){
        msg.reply(`nie znaleziono takiego użytkownika!`)
      }
      args.shift()
      const powod = `${args.length?args.join(` `):`brak`}`
      //
      const embed = new MessageEmbed().setColor(`#ff0000`).setTitle(`WARN`).setDescription(`${uzytkownik} dostał warn od ${msg.author}!${powod===`brak`?``:`\n\n**Powód:** ${powod}`}`)
      const userid = uzytkownik.id
      let query = `SELECT * FROM data WHERE userid = "${userid}"`
      db.get(query, async (err, row) => {
          if(!row){
              let insertdata = db.prepare(`INSERT INTO data VALUES(?,?,?,?,?,?,?)`);
              insertdata.run( null ,userid, uzytkownik.user.tag, `1`,`${time}`,`1: ${powod}`,`1`);                   
              insertdata.finalize();
              db.close();
              logi.send(embed)
              warny.send(embed)
          } else {
              let allwarns = row.allwarns
              let warns = `${row.warns===`-`?`1`:Number(row.warns) + 1}`
              let warnscount = Number(row.warns) + 1
              let reasons = row.reasons
              const powod1 = `${row.reasons===`-`?`1: ${powod}` : `${reasons}\n${warnscount}: ${powod}`}`
              allwarns++
              db.run(`UPDATE data SET allwarns = "${allwarns}" WHERE userid = "${userid}"`) 
              db.run(`UPDATE data SET warns = "${warns}" WHERE userid = "${userid}"`)
              db.run(`UPDATE data SET lastwarn = "${time}" WHERE userid = "${userid}"`) 
              db.run(`UPDATE data SET reasons = "${powod1}" WHERE userid = "${userid}"`) 
              logi.send(embed)
              warny.send(embed)
          }})
          msg.delete()
        msg.channel.send(new MessageEmbed().setDescription(`Warn nadany!`).setColor(`#00ff15`)).then(msg => {
            msg.delete({ timeout: 1500 })})
    }
}