const { } = require("discord.js")
const { MessageEmbed } = require("discord.js")


module.exports = {
    name: "pokazallow",
    description: "Komenda która pokazuje osoby które mogą wysyłać zaproszenia.",
    args: false,
    usage: "",
    guildOnly: true,
    cooldown: 3,
    aliases: [],
    botPermissions: [],
    userPermissions: [`ADMINISTRATOR`],
    ownerOnly: false,

    async run(msg){
        //
        // ZMIENNE
        const { guild } = msg
        const avatar = require(`../config/config`).avatar
        const namebot = require(`../config/config`).name
        //
        //
        let kanaly = []
        let dane = require(`../addons/allowzaproszenia.json`)
        dane.id.forEach(id => {
            const kanal = guild.members.cache.get(`${id}`)
            if(kanal){
                kanaly.push(`${id} | ${kanal.user.tag}`)
            } else {
                kanaly.push(`${id} | **nie znaleziono!**`)
            }    
        })
        if (kanaly.length === 0){
            kanaly.push(`**Brak osób!**`)
        }
        const embed = new MessageEmbed().setColor(`#00ff15`).setTitle(`Lista wszystkich osób:`).setDescription(`${kanaly.join(`\n`)}`).setAuthor(namebot, avatar)
        msg.channel.send(embed)
    }
}