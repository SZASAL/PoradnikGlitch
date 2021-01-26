const { } = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "pisz",
    description: "Komenda dzięki której możemy pisać botem.",
    args: false,
    usage: "",
    guildOnly: true,
    cooldown: 10,
    aliases: [],
    botPermissions: [],
    userPermissions: [`ADMINISTRATOR`],
    ownerOnly: false,

    async run(msg){
        const { client } = msg
        //
        // FUNKCJE
////////////////////////////////////////////////////////////////////////////////////////////
        const embed = new MessageEmbed().setColor(`BLACK`).setDescription(`Oznacz kanał w którym chcesz wysłać wiadomość!`)
        const endembed = new MessageEmbed().setColor(`BLACK`)
        msg.channel.send(embed)
        const filter = m => m.author.id === msg.author.id
        await msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(async collected => {
            const tresc = collected.first().content
            const check1 = tresc.slice(2, tresc.length - 1)
            const kanal = client.channels.cache.get(`${check1}`)
            if(!kanal){
                const embed2 = new MessageEmbed().setDescription(`Podany kanał nie został znaleziony, ponów próbę!`).setColor(`#ff0000`)
                msg.channel.send(embed2)
                return
              }
            msg.reply(`**Kanał wiadomości:** ${kanal}`)
            const embed1 = new MessageEmbed().setColor(`BLACK`).setDescription(`Podaj tytuł wiadomości`).setFooter(`Masz na to 1 min.\nJeśli nie chcesz dawać żadnego tytułu odpisz "brak".`)
            await msg.channel.send(embed1)
//////////////////////////////////////////////////////////////////////////////////////////
                const filter = m => m.author.id === msg.author.id
                await msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(async collected => {
                    const tytul = collected.first().content
                    if(tytul.toLowerCase() !== `brak`){
                        if(tytul.length > 255){
                            msg.reply(`Tytuł jest zbyt długi!`)
                            return
                        }
                        endembed.setTitle(`${tytul}`)
                    }
                    const embed2 = new MessageEmbed().setColor(`BLACK`).setDescription(`Podaj opis wiadomości`).setFooter(`Masz na to 1 min.\nJeśli nie chcesz dawać żadnego opisu odpisz "brak".`)
                    await msg.channel.send(embed2)
//////////////////////////////////////////////////////////////////////////////////////////
                        const filter = m => m.author.id === msg.author.id
                        await msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                        .then(async collected => {
                            const opis = collected.first().content
                            if(opis.toLowerCase() !== `brak`){
                                if(opis.length > 2047){
                                    msg.reply(`Opis jest zbyt długi!`)
                                    return
                                }
                                endembed.setDescription(`${opis}`)
                            }
                            const embed3 = new MessageEmbed().setColor(`BLACK`).setDescription(`Podaj footer wiadomości`).setFooter(`Masz na to 1 min.\nJeśli nie chcesz dawać żadnego footera odpisz "brak".`)
                            await msg.channel.send(embed3)
//////////////////////////////////////////////////////////////////////////////////////////
                                const filter = m => m.author.id === msg.author.id
                                await msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                                .then(async collected => {
                                    const footer = collected.first().content
                                    if(footer.toLowerCase() !== `brak`){
                                        if(footer.length > 2047){
                                            msg.reply(`Footer jest zbyt długi!`)
                                            return
                                        }
                                        endembed.setFooter(`${footer}`)
                                    }
                                    const embed3 = new MessageEmbed().setColor(`BLACK`).setDescription(`Podaj kolor embed`).setFooter(`Masz na to 1 min.\nKolor musi być podany w HEX (np. #ff0000)\nJeśli chcesz ustawić kolor czarny odpisz "brak".`)
                                    await msg.channel.send(embed3)
//////////////////////////////////////////////////////////////////////////////////////////
                                            const filter = m => m.author.id === msg.author.id
                                            await msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                                            .then(async collected => {
                                                const kolor = collected.first().content
                                                if(kolor.toLowerCase() !== `brak`){
                                                    endembed.setColor(`${kolor}`)
                                                }
                                                const embedst = new MessageEmbed().setDescription(`Czy napewno chcesz wysłać tą wiadomość na kanał: ${kanal}?`).setColor(`#00ff22`)
                                                const embedsc = new MessageEmbed().setDescription(`Jeśli chcesz potwierdzić wysłanie wiadomości odpisz \`tak\``).setColor(`#00ff22`)
                                                await msg.channel.send(embedst)
                                                await msg.channel.send(endembed)
                                                await msg.channel.send(embedsc)
//////////////////////////////////////////////////////////////////////////////////////////
                                                    const filter = m => m.author.id === msg.author.id
                                                    await msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                                                    .then(async collected => {
                                                        const odp = collected.first().content.toLowerCase()
                                                        if(odp === `tak`){
                                                            await kanal.send(endembed)
                                                            msg.channel.send(new MessageEmbed().setDescription(`Wiadomość wysłana!`).setColor(`#00ff26`))
                                                        }
                                                    })
                                                    /////////////////////////////////////////////
                                                    .catch(() => {
                                                        msg.reply(`Czas na odpowiedź minął, spróbuj ponownie!`)
                                                      });
////////////////////////////////////////////////////////////////////////////////////////////
                                            })
                                            /////////////////////////////////////////////
                                            .catch(() => {
                                                msg.reply(`Czas na odpowiedź minął, spróbuj ponownie!`)
                                              });
////////////////////////////////////////////////////////////////////////////////////////////
                                })
                                /////////////////////////////////////////////
                                .catch(() => {
                                    msg.reply(`Czas na odpowiedź minął, spróbuj ponownie!`)
                                  });
////////////////////////////////////////////////////////////////////////////////////////////
                        })
                        /////////////////////////////////////////////
                        .catch(() => {
                            msg.reply(`Czas na odpowiedź minął, spróbuj ponownie!`)
                          });
////////////////////////////////////////////////////////////////////////////////////////////
                })
                /////////////////////////////////////////////
                .catch(() => {
                    msg.reply(`Czas na odpowiedź minął, spróbuj ponownie!`)
                });
////////////////////////////////////////////////////////////////////////////////////////////
        })
/////////////////////////////////////////////
        .catch(() => {
            msg.reply(`Czas na odpowiedź minął, spróbuj ponownie!`)
          });
////////////////////////////////////////////////////////////////////////////////////////////
    }
}


