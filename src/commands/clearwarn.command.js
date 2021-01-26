const { } = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "clearwarn",
    description: "Komenda która usuwa warny.",
    args: true,
    usage: "<użytkownik>",
    guildOnly: false,
    cooldown: 0,
    aliases: [],
    botPermissions: [],
    userPermissions: [`ADMINISTRATOR`],
    ownerOnly: false,

    async run(msg, args){
      const { guild } = msg
      const sqlite = require(`sqlite3`).verbose();
      let db = new sqlite.Database((__dirname+`/../addons/warny.db`), sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
      //
      const iduzytkownika =  args[0].slice(3, args[0].length - 1)
      const uzytkownik = guild.members.cache.get(`${iduzytkownika}`)
      if(!uzytkownik){
        msg.reply(`nie znaleziono takiego użytkownika!`)
      }
      const userid = uzytkownik.id
      let query = `SELECT * FROM data WHERE userid = "${userid}"`
      db.get(query, async (err, row) => {
          if(!row){
              msg.reply(`ten użytkownik nie ma warnów!`)
          } else {
            db.run(`UPDATE data SET warns = "-" WHERE userid = "${userid}"`)
            db.run(`UPDATE data SET lastwarn = "-" WHERE userid = "${userid}"`)
            db.run(`UPDATE data SET reasons = "-" WHERE userid = "${userid}"`)
          }})
      msg.delete()
      msg.channel.send(new MessageEmbed().setDescription(`Warny usunięte!`).setColor(`#00ff15`)).then(msg => {
        msg.delete({ timeout: 1500 })})
    }
}