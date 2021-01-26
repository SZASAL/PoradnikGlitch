const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "clear",
    description: "Usuwa wiadomości",
    args: true,
    usage: "<ilość>",
    guildOnly: true,
    cooldown: 10,
    aliases: ["purge"],
    botPermissions: ["MANAGE_MESSAGES"],
    userPermissions: ["MANAGE_MESSAGES"],
    ownerOnly: false,

    run(msg, args){
        const amout = parseInt(args[0])
        const { channel, guild } = msg
        const idlogi = require(`../config/config`).kanallogi
        var time = new Date().toLocaleString()
        const logi = guild.channels.cache.get(`${idlogi}`)
        
        if (!Number.isInteger(amout)){
            return channel.send("Podana wartość nie jest liczbą!")
        }

        if(amout < 2 || amout > 100){
            return channel.send("Nie możesz usunąć tyle wiadomości!")
        }
    
        channel.bulkDelete(amout)
        const embed = new MessageEmbed().setColor(`#fcf403`).setTitle(`Usunięte wiadomości`).setDescription(`${msg.author} usunął ${amout} wiadomości na kanale ${msg.channel}.`).setFooter(`Data: ${time}`)
        logi.send(embed)

    }
}