const { MessageEmbed } = require("discord.js")
const kolor = require(`./instagram.colors.json`)
const avatar = require(`../../config/config`).avatar
const namebot = require(`../../config/config`).name
const logi1 = require(`../../config/config`).logiig1
const logi2 = require(`../../config/config`).logiig2
const ig1 = require(`../../config/config`).kanalig1
const ig2 = require(`../../config/config`).kanalig2

module.exports = async (msg, sendembed, row, zdjig, zdjcheckw) => {
    //
    // ZMIENNE
    const { client } = msg
    const sqlite = require(`sqlite3`).verbose();
    let db = new sqlite.Database((__dirname+`/../data.db`), sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
    //
    // WYSYŁA ZDJ NA WEBHOOKA
    const Discord = require('discord.js');
    const hook = new Discord.WebhookClient(ig1, ig2);
    //
    const wyslanyhook = await hook.send(zdjig)
    //
    // REAGUJE NA WYSLANEGO WEBHOOKA
    const kanalhooka = await client.channels.cache.get(`${wyslanyhook.channel_id}`)
    const idwiad = wyslanyhook.id
    //
    kanalhooka.messages.fetch({around: `${idwiad}`, limit: 1})
        .then(async w => {
            const fetchedMsg = w.first();
            fetchedMsg.react(`❤️`)
        })
    //
    // DODAJE +1 DO ILOŚCI POSTÓW
    if(row){
        let posts = row.posts
        posts++
        db.run(`UPDATE data SET posts = "${posts}" WHERE id = "${row.id}"`)
    } else {
        console.log(`ERROR, użytkownik: ${msg.author.tag} | ${msg.author.id} nie dostał dodatkowych punktów za dodanie posta!\nLokalizacja błędu: src/addons/instagram/5.instagram.zdj.js`)
    }
    
    //
    // WYSYŁA INFORMACJE ŻE WEBHOOK ZOSTAŁ WYSŁANY
    logi(msg, row, zdjig)
    //
    const embed = new MessageEmbed()
            .setTitle(`Twoje zdjęcie zostało wysłane!`)
            .setDescription(`Teraz możesz zobaczyć swoje zdjęcie na kanale: ${kanalhooka}`)
            .setColor(kolor.z)
            .setAuthor(namebot, avatar)
        zdjcheckw.edit(embed)
    //
    // FUNKCJE
    function logi(msg, row, zdjig){
        const Discord = require('discord.js');
            const hook = new Discord.WebhookClient(logi1, logi2);
            var time = new Date().toLocaleString();
            const embednewk = new MessageEmbed()
                    .setColor(`#37ff00`)
                    .setTitle(`Nowe zdjęcie na Instagramie!`)
                    .setDescription(`**Autor: ** ${msg.author}
                    \`Tag:\` ${msg.author.tag}
                    \`ID:\` ${msg.author.id}\n
                    **Konto:**
                    \`Nick:\` ${row.nick}
                    \`User Tag:\` ${row.usertag}
                    \`ID:\` ${row.id}
                    \`User ID:\` ${row.userid}
                    \`Ilość postów:\` ${row.posts}
                    \`Ilość lików:\` ${row.score}
                    `)
                    .setAuthor(namebot, avatar)
                    .setImage(`${zdjig.image.url}`)
                    .setFooter(`Data stworzenia: ${time}`)
            hook.send(embednewk)
    }
    //
    //
    
}