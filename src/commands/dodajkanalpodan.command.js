const { Permissions: { FLAGS } } = require("discord.js")
const { MessageEmbed } = require("discord.js")
const { prefix } = require(__dirname + "/../config/config.js")


module.exports = {
    name: "dodaj",
    description: "Komenda która dodaje id kanalu podań do listy.",
    args: true,
    usage: "<id kanału>",
    guildOnly: true,
    cooldown: 3,
    aliases: [],
    botPermissions: [],
    userPermissions: [`ADMINISTRATOR`],
    ownerOnly: false,

    async run(msg, args){
        //
        // ZMIENNE
        const { channel, guild, client, guildMember } = msg
        const fs = require("fs")
        //
        //
        let dane = await require(`../addons/kanalypodan.json`)
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
            fs.writeFile(`src/addons/kanalypodan.json`,dane, `utf8`, function (err) {if (err) return console.log(err)});
        }, 500);
    }
}