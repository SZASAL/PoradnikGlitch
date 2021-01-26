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
        if (reaction.message.id !== `744507070824448070`) return
        if (reaction._emoji.name !== `📩`) return
        //
        // ZMIENNE
        const avatar = require(`../config/config`).avatar
        const namebot = require(`../config/config`).name
        const guild = reaction.message.channel.guild
        const limitticketów = 1
        const idkategoria = require(`../config/config`).kategoriaticket
        const kategoriaticket = guild.channels.cache.get(`${idkategoria}`)
        const everyone = require(`../config/config`).everyone
        const idrola = require(`../config/config`).rolaobsługi
        const rolaobslugiticket = guild.roles.cache.get(`${idrola}`)
        const liczbakanalowwkategori = kategoriaticket.children.size
        const webhookdane1 = require(`../config/config`).webhooklogi1
        const webhookdane2 = require(`../config/config`).webhooklogi2
        const Discord = require('discord.js')
        const hook = new Discord.WebhookClient(webhookdane1, webhookdane2)
        //
        // FUNKCJE
        function nr (num) {
            if (num < 10) return (`000${num}`)
            if (num < 100) return (`00${num}`)
            if (num < 1000) return (`0${num}`)
            if (num >= 1000) return (`${num}`)
        }
        //
        // USUWA REAKCJE UŻYTKOWNIKA
        reaction.users.remove(`${user.id}`)
        //
        // SPRAWDZA CZY KTOŚ JUŻ NIE STWORZYŁ TICKETA
        let i = 0
        if (kategoriaticket.children.size > 0){
            kategoriaticket.children.forEach(kanal => {
                if(kanal.topic === user.id){
                    i++
                }
            })
        }
        //
        if (i >= limitticketów){
            const embed = new MessageEmbed().setTitle(`Twój limit ticketów został wyczerpany! (${i}/${limitticketów})`).setColor(`#ff0000`)
            user.send(embed)
            return
        }
        
        //
        // TWORZY NOWY KANAŁ  TICKET
        const nazwa = `ticket-${nr(liczbakanalowwkategori + 1)}`
        const nowykanal = await guild.channels.create(nazwa, {
            type: 'text',
            permissionOverwrites: [  // ZABRANIA EVERYONE NA ZOBACZENIE KANAŁU
               {
                 id: everyone,
                 deny: [`VIEW_CHANNEL`],
              },
            ],
            parent: `${kategoriaticket.id}`,
          })
        // USTAWIA TEMAT KANAŁU JAKO ID UŻYTKOWNIKA W CELU PÓŹNIEJSZEJ KONFIGURACJI
        await nowykanal.setTopic(`${user.id}`)
        // USTAWIA PERMISJE KANAŁU
        nowykanal.updateOverwrite(user, {ADD_REACTIONS: true,VIEW_CHANNEL: true,SEND_MESSAGES: true,EMBED_LINKS: true,ATTACH_FILES: true,READ_MESSAGE_HISTORY: true});
        nowykanal.updateOverwrite(rolaobslugiticket, {ADD_REACTIONS: true,VIEW_CHANNEL: true,SEND_MESSAGES: true,EMBED_LINKS: true,ATTACH_FILES: true,READ_MESSAGE_HISTORY: true,MANAGE_CHANNELS: false,MANAGE_MESSAGES: false,MENTION_EVERYONE: true});
        //
        // WYSYŁA WIADOMOŚĆ NA NOWY KANAŁ Z INFORMACJAMI
        wiad0 = await nowykanal.send(`${user}`)
        setTimeout(() => {
            wiad0.delete()
        }, 1000);
        const embed = new MessageEmbed()
          .setDescription(`${user}, za chwilę zjawi się tu support!\nAby zamknąć ticket kliknij w reakcję 🔒!`)
          .setFooter(`Twórca ticketa: ${user.tag}`, user.avatarURL())
          .setAuthor(namebot, avatar)
        const wiad1 = await nowykanal.send(embed)
        wiad1.react(`🔒`)
        //
        // WYSYŁA LOGI
        var time = new Date().toLocaleString();
        const embed1 = new MessageEmbed()
            .setTitle(`Nowy ticket!`)
            .setDescription(`
            \`ID ticketa:\` ${nowykanal.id}\n
            **Dane o użytkowniku:**
            \`Nazwa:\` ${user} | ${user.tag}
            \`ID:\` ${user.id}
            `)
            .setThumbnail(user.avatarURL())
            .setColor(`#00ff08`)
            .setFooter(`Data zgłoszenia: ${time}`)
        hook.send(embed1)
        //
        //
    }
}