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
        if (reaction.message.id !== `744508037074780243`) return
        if (reaction._emoji.name !== `✅`) return
        //
        // ZMIENNE
        const guild = reaction.message.channel.guild
        const idrola1 = `720285603413098516`
        const rolahalf = guild.roles.cache.get(`${idrola1}`)
        const uzytkownik = guild.members.cache.get(`${user.id}`)
        //
        if(uzytkownik._roles.includes(`${idrola1}`)) return uzytkownik.send(new MessageEmbed().setColor(`#ff0000`).setDescription(`Już jesteś zweryfikowany!`))
        //
        uzytkownik.roles.add(rolahalf)
        // 
    }
}