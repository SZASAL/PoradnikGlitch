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
        const idkategoria = require(`../config/config`).kategoriaticket
        const kategoriaticket = reaction.message.channel.guild.channels.cache.get(`${idkategoria}`)
        if (reaction._emoji.name !== `🔒`) return
        if (reaction.message.channel.parentID !== kategoriaticket.id) return
        if (!reaction.message.author.bot) return
        if (user.bot) return
        //
        // ZMIENNE
        const guild = reaction.message.channel.guild
        //
        // FUNKCJE

        //
        // USUWA REAKCJE UŻYTKOWNIKA
        reaction.users.remove(`${user.id}`)
        //
        // DODAJE REAKCJE
        const reakcja1 = await reaction.message.react(`❌`)
        const reakcja2 = await reaction.message.react(`✅`)
        //
        // AWAIT REAKCJE
        const filter = (reaction, user) => { return user.bot === false } 
        reaction.message.awaitReactions(filter, { max: 1, time: 6000, errors: ['time'] })
            .then(collected=> {
                if (collected.first()._emoji.name === `❌`){
                    reakcja1.remove()
                    reakcja2.remove()
                    return
                } else if (collected.first()._emoji.name === `✅`) {
                    reakcja1.remove()
                    reakcja2.remove()
                    reaction.message.channel.updateOverwrite(user, {ADD_REACTIONS: false,VIEW_CHANNEL: false,SEND_MESSAGES: false,EMBED_LINKS: false,ATTACH_FILES: false,READ_MESSAGE_HISTORY: false})
                    const embed = new MessageEmbed().setDescription(`Ticket został zamknięty przez ${user}!`).setColor(`#ff0000`)
                    reaction.message.channel.send(embed)
                    const nazwa = reaction.message.channel.name
                    setTimeout(() => {
                        reaction.message.channel.setName(`closed-${nazwa}`)
                    }, 1000);
                    setTimeout(async () => {
                        const embed1 = new MessageEmbed().setDescription(`Aby pokazać więcej opcji kliknij w reakcje 🔐!`).setColor(`#00ff11`)
                        const wiad = await reaction.message.channel.send(embed1)
                        wiad.react(`🔐`)
                    }, 2000);
                    
                }
            })
            .catch(async () => {
                await reakcja1.remove()
                await reakcja2.remove()
            });
        //
        //
    }
}