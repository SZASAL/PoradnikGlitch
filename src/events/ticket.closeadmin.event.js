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
        if (reaction._emoji.name !== `🔐`) return
        if (reaction.message.channel.parentID !== kategoriaticket.id) return
        if (!reaction.message.author.bot) return
        if (user.bot) return
        //
        // ZMIENNE
        const webhookdane1 = require(`../config/config`).webhooklogi1
        const webhookdane2 = require(`../config/config`).webhooklogi2
        const guild = reaction.message.channel.guild
        const interval = 10
        const idkategoriaarchiwum = require(`../config/config`).kategoriaarchiwum
        const kategoriaarchiwum = guild.channels.cache.get(`${idkategoriaarchiwum}`)
        //
        // FUNKCJE
        function embedinfo(reaction){
            const x = reaction.message.embeds[0]
            const embed = new MessageEmbed()
                .setDescription(`${x.description}`).setColor(`#00ff11`)
                .setFooter(`Kliknij w reakcje:\n❌ - aby usunąć ticket.\n📁 - aby zarchiwizować ticket.\n🔓 - aby ponownie otworzyć ticket.`)
            reaction.message.edit(embed)
        }
        //
        function embedclear(reaction){
            const x = reaction.message.embeds[0]
            const embed = new MessageEmbed()
                .setDescription(`${x.description}`).setColor(`#00ff11`)
            reaction.message.edit(embed)
        }
        //
        function logi_delticket (reaction, user) {
            const Discord = require('discord.js')
            const autorticketa = guild.members.cache.get(`${reaction.message.channel.topic}`)
            const hook = new Discord.WebhookClient(webhookdane1, webhookdane2)
            var time = new Date().toLocaleString();
            const embed1 = new MessageEmbed()
                .setTitle(`Usunięty ticket!`)
                .setDescription(`**Dane o autorze ticketa:**
                \`Nazwa:\` ${autorticketa.user} | ${autorticketa.user.tag}
                \`ID:\` ${autorticketa.user.id}\n
                **Dane ticketa: **
                \`Nazwa kanału:\` ${reaction.message.channel.name}
                \`ID ticketa:\` ${reaction.message.channel.id}\n\n
                \`Kto usunął ticketa:\` ${user} | ${user.tag} | ${user.id}
                `)
                .setThumbnail(user.avatarURL())
                .setColor(`#ff0000`)
                .setFooter(`Data zgłoszenia: ${time}`)
            hook.send(embed1)
        }
        //
        function logi_archiwum (reaction, user) {
            const Discord = require('discord.js')
            const hook = new Discord.WebhookClient(webhookdane1, webhookdane2)
            const autorticketa = guild.members.cache.get(`${reaction.message.channel.topic}`)
            var time = new Date().toLocaleString();
            const embed1 = new MessageEmbed()
                .setTitle(`Zarchiwizowany ticket!`)
                .setDescription(`**Dane o autorze ticketa:**
                \`Nazwa:\` ${autorticketa.user} | ${autorticketa.user.tag}
                \`ID:\` ${autorticketa.user.id}\n
                **Dane ticketa: **
                \`Nazwa kanału:\` ${reaction.message.channel.name}
                \`ID ticketa:\` ${reaction.message.channel.id}\n\n
                \`Kto zarchiwizował ticketa:\` ${user} | ${user.tag} | ${user.id}
                `)
                .setThumbnail(user.avatarURL())
                .setColor(`#ffd500`)
                .setFooter(`Data zgłoszenia: ${time}`)
            hook.send(embed1)
        }
        //
        // USUWA REAKCJE UŻYTKOWNIKA
        reaction.users.remove(`${user.id}`)
        //
        // DODAJE REAKCJE
        const reakcja1 = await reaction.message.react(`❌`)
        const reakcja2 = await reaction.message.react(`📁`)
        const reakcja3 = await reaction.message.react(`🔓`)
        //
        // 
        embedinfo(reaction)
        //
        // AWAIT REAKCJE
        const filter = (reaction, user) => { return user.bot === false } 
        reaction.message.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
            .then( async collected => {
                if (collected.first()._emoji.name === `❌`){
/////////////////////////////////////////////////////////////////////////////////////////////                    
                    reakcja1.remove()
                    reakcja2.remove()
                    reakcja3.remove()
                    const embed = new MessageEmbed().setDescription(`Ten kanał zostanie usunięty za \`${interval} sek\`!`).setColor(`#ff0000`)
                    reaction.message.channel.send(embed)
                    setTimeout(() => {
                        reaction.message.channel.delete()
                        logi_delticket(reaction, user)
                    }, interval * 1000);
/////////////////////////////////////////////////////////////////////////////////////////////
                } else if  (collected.first()._emoji.name === `📁`) {
/////////////////////////////////////////////////////////////////////////////////////////////                    
                    reakcja1.remove()
                    reakcja2.remove()
                    reakcja3.remove()
                    const embed = new MessageEmbed().setColor(`#ffd500`).setDescription(`Ten kanał został zarchiwizowany przez ${user}!`)
                    reaction.message.channel.send(embed)
                    logi_archiwum (reaction, user)
                    setTimeout(() => {
                        reaction.message.channel.setParent(`${kategoriaarchiwum.id}`)
                    }, 1000);
/////////////////////////////////////////////////////////////////////////////////////////////
                } else if (collected.first()._emoji.name === `🔓`) {
/////////////////////////////////////////////////////////////////////////////////////////////                    
                    reakcja1.remove()
                    reakcja2.remove()
                    reakcja3.remove()
                    const autorticketa = guild.members.cache.get(`${reaction.message.channel.topic}`)
                    if(autorticketa){
                        const embed = new MessageEmbed().setColor(`#00ff15`).setDescription(`Ticket został ponownie otworzony przez ${user}!`)
                        const kanaldozmiany = reaction.message.channel
                        reaction.message.channel.send(`${autorticketa}`)
                        reaction.message.channel.send(embed)
                        await reaction.message.channel.updateOverwrite(autorticketa, {ADD_REACTIONS: true,VIEW_CHANNEL: true,SEND_MESSAGES: true,EMBED_LINKS: true,ATTACH_FILES: true,READ_MESSAGE_HISTORY: true})
                        const nazwapoopen = reaction.message.channel.name.slice(7, 18)
                        await kanaldozmiany.setName(`reopen-${nazwapoopen}`)
                    } else {
                        const embedfail = new MessageEmbed().setColor(`#ff0000`).setDescription(`**Błąd podczas ponownego otwierania ticketa:**\n-nie znaleziono autora ticketa.`)
                        reaction.message.channel.send(embedfail)
                    }
/////////////////////////////////////////////////////////////////////////////////////////////
                }
            })
            .catch(async () => {
                await embedclear(reaction)
                await reakcja1.remove()
                await reakcja2.remove()
                await reakcja3.remove()
            });
        //
        //
    }
}