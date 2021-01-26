const { MessageEmbed } = require("discord.js");

module.exports =  {
    name: "messageReactionAdd",
    enabled: true,

    async run(reaction, user){
        // POBIERA EMOJI JEŚLI SĄ NIEDOSTĘPNE
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
        //
        // SPRAWDZA CZY ZGADZA SIĘ ID WIADOMOŚCI
        if (reaction.message.id !== `745779298484355133`) return
        if (reaction._emoji.name !== `1️⃣` && reaction._emoji.name !== `2️⃣`) return
        //
        // ZMIENNE
        const guild = reaction.message.channel.guild
        const idrola1 = `745581271215767635`
        const idrola2 = `745778525168074852`
        const rola1 = guild.roles.cache.get(`${idrola1}`)
        const rola2 = guild.roles.cache.get(`${idrola2}`)
        const uzytkownik = guild.members.cache.get(`${user.id}`)
        //
        if(reaction._emoji.name !== `1️⃣`){
            uzytkownik.roles.add(rola1)
        }
        if(reaction._emoji.name !== `2️⃣`){
            uzytkownik.roles.add(rola2)
        }
        // 
    }
}