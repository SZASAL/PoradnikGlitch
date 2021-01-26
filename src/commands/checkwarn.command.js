const { } = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "checkwarn",
    description: "Tą komendą możemy sprawdzić naszą liczbę warnów.",
    args: false,
    usage: "[użytkownik]",
    guildOnly: false,
    cooldown: 0,
    aliases: [],
    botPermissions: [],
    userPermissions: [],
    ownerOnly: false,

    async run(msg, args){
      const { guild } = msg
      const sqlite = require(`sqlite3`).verbose();
      let db = new sqlite.Database((__dirname+`/../addons/warny.db`), sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
      //
      const iduzytkownika =  `${!args.length?msg.author.id:args[0].slice(3, args[0].length - 1)}`
      const uzytkownik = guild.members.cache.get(`${iduzytkownika}`)
      if(!uzytkownik){
        msg.reply(`nie znaleziono takiego użytkownika!`)
      }
      const userid = uzytkownik.id
      let query = `SELECT * FROM data WHERE userid = "${userid}"`
      db.get(query, async (err, row) => {
          if(!row){
              const brak = new MessageEmbed().setColor(`#00ff15`).setDescription(`Ten użytkownik jest czysty!`)
              msg.channel.send(brak)
          } else {
              const embed = new MessageEmbed().setColor(`#ff0000`).setTitle(`Warny ${row.usertag}`)
                .setDescription(`**Ilość warnów:** ${row.warns}
                                **Łączna ilość warnów:** ${row.allwarns}
                                **Data ostatniego warna:** ${row.lastwarn}
                                **Powody warnów:**\n${row.reasons}`)
            msg.channel.send(embed)
          }})
    
    }
}