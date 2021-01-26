const { Permissions: { FLAGS } } = require("discord.js")
const { MessageEmbed } = require("discord.js")
const { sysUptime } = require("os-utils")
const { prefix } = require(__dirname + "/../config/config.js")


module.exports = {
    name: "pokaz",
    description: "Komenda która pokazuje liste dodanych kanałów!.",
    args: false,
    usage: "",
    guildOnly: true,
    cooldown: 3,
    aliases: [],
    botPermissions: [],
    userPermissions: [`ADMINISTRATOR`],
    ownerOnly: false,

    async run(msg, args){
        //
        // ZMIENNE
        const { channel, guild, client, guildMember } = msg
        const avatar = require(`../config/config`).avatar
        const namebot = require(`../config/config`).name
        //
        //
        let kanaly = []
        let dane = await require(`../addons/kanalypodan.json`)
        dane.id.forEach(id => {
            const kanal = guild.channels.cache.get(`${id}`)
            if(kanal){
                kanaly.push(`${id} | ${kanal.name}`)
            } else {
                kanaly.push(`${id} | **nie znaleziono!**`)
            }    
        })
        if (kanaly.length === 0){
            kanaly.push(`**Brak kanałów!**`)
        }
        const embed = new MessageEmbed().setColor(`#00ff15`).setTitle(`Lista wszystkich dodanych kanałów:`).setDescription(`${kanaly.join(`\n`)}`).setAuthor(namebot, avatar)
        msg.channel.send(embed)
    }
}