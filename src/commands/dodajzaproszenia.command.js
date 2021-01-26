const { } = require("discord.js")
const { MessageEmbed } = require("discord.js")


module.exports = {
    name: "dodajallow",
    description: "Komenda która dodaje id osób które mogą wysyłać zaproszenia.",
    args: true,
    usage: "<id osoby>",
    guildOnly: true,
    cooldown: 3,
    aliases: [],
    botPermissions: [],
    userPermissions: [`ADMINISTRATOR`],
    ownerOnly: false,

    async run(msg, args){
        //
        // ZMIENNE
        const fs = require("fs")
        //
        //
        let dane = require(`../addons/allowzaproszenia.json`)
        var dane_parse = dane
        if (args.length !== 1) return msg.reply(`musisz podać tylko jedno ID!`)
        if (isNaN(args.join())) return msg.reply(`id składa się tylko z cyfr!`)
        const idkanalu = args.join()
        if(dane.id.includes(idkanalu)){
            const index = dane_parse.id.indexOf(idkanalu)
            if (index > -1) {
            dane_parse.id.splice(index, 1);
            }
            const embed = new MessageEmbed().setDescription(`Pomyślnie usunięto \`${idkanalu}\` z listy!`).setColor(`#ff0000`)
            msg.channel.send(embed)
        } else {
            dane_parse['id'].push(idkanalu)
            const embed = new MessageEmbed().setDescription(`Pomyślnie dodano \`${idkanalu}\` do listy!`).setColor(`#00ff15`)
            msg.channel.send(embed)
        }

        setTimeout(() => {
            
            dane = JSON.stringify(dane_parse);
            fs.writeFile(`src/addons/allowzaproszenia.json`,dane, `utf8`, function (err) {if (err) return console.log(err)});
        }, 500);
    }
}