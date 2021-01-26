const { } = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "mute",
    description: "Mutuje użytkownika na x minut",
    args: true,
    usage: "<@osoba> <czas mute>",
    guildOnly: true,
    cooldown: 0,
    aliases: [],
    botPermissions: [],
    userPermissions: [`MANAGE_NICKNAMES`],
    ownerOnly: false,

    run(msg, args){
        //
        // ZMIENNE 
        const { guild } = msg
        const kto = args[0].slice(3, args[0].length - 1)
        const naile = args[1]
        const uzytkownik = guild.members.cache.get(`${kto}`)
        const idroli = require(`../config/config`).rolamute
        const rola = guild.roles.cache.get(`${idroli}`)
        //
        if(!uzytkownik) {
          msg.reply(`nie znaleziono takiego użytkownika!`)
          return
        }
        //
        if(isNaN(naile)){
          msg.reply(`czas mute musi być podany w liczbie!`)
          return
        }
        //
        if(!args[1]){
          msg.reply(`nie podałeś czasu mute!`)
          return
        }
        //
        uzytkownik.roles.add(rola)
        const embed = new MessageEmbed().setColor(`BLACK`).setDescription(`Zostałeś zmutowany przez ${msg.author} na ${naile} minut!`)
        uzytkownik.send(embed)
        const embe = new MessageEmbed().setColor(`BLACK`).setDescription(`${uzytkownik} został zmutowany na ${naile} minut przez ${msg.author}!`)
        msg.channel.send(embe)
        const embed1 = new MessageEmbed().setColor(`BLACK`).setDescription(`Zmutowałeś ${uzytkownik} na ${naile} minut!`)
        msg.author.send(embed1)
        //
        //
        msg.delete()
        setTimeout(() => {
          uzytkownik.roles.remove(rola)
          const embed3 = new MessageEmbed().setColor(`#00ff15`).setDescription(`Zostałeś odmutowany!`)
          uzytkownik.send(embed3)
          const embed4 = new MessageEmbed().setColor(`BLACK`).setDescription(`Użytkownik ${uzytkownik} został odmutowany po ${naile} minutach!`)
          msg.author.send(embed4)
        }, naile * 1000 * 60);

    }
}