const { MessageEmbed } = require("discord.js")

module.exports =  {
    name: "message",
    enabled: true,

    async run(msg){
        //
        // ZMIENNE
        if(msg.channel.type === `dm`) return
        const { guild } = msg
        const idlogi = require(`../config/config`).kanallogi
        const logi = guild.channels.cache.get(`${idlogi}`)
        const autor = guild.members.cache.get(`${msg.author.id}`)
        const listaosob = require(`../addons/allowzaproszenia.json`).id
        //
        //
        const tresc = msg.content
        if (tresc.includes(`discord.gg`)) {
            if (autor.hasPermission(`ADMINISTRATOR`)) {
                return
            } else if (listaosob.join().includes(`${msg.author.id}`)){
                return
            } else {
                msg.delete()
                const embed = new MessageEmbed().setColor(`#ff0000`).setTitle(`Nie masz uprawnień aby wysyłać zaproszenia!`)
                msg.author.send(embed)
                var time = new Date().toLocaleString()
                const embed1 = new MessageEmbed().setColor(`#ff0000`).setTitle(`WYKRYTO REKLAME!`).setFooter(`Data zgłoszenia: ${time}`)
                    .setDescription(`**Autor reklamy:** ${autor} | ${autor.user.tag} | ${autor.id}\n**Treść reklamy:**\n${tresc}`)
                logi.send(embed1)
            }
        } else {
            return
        }
        
    }
}