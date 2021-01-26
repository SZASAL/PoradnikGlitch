const on = true

module.exports =  async (client) =>  {
    //
    // ON / OFF
    if(!on) return
    //
    // DEFINIUJE INTERWAL
    const interval = 60 // w sekundach
    //
    // POKAZUJE W KONSOLI ZA ILE KOMENDA SIE URUCHOMI
    const ip = require(`../config/config`).ip
    const avatar = require(`../config/config`).avatar
    const namebot = require(`../config/config`).name
    
    const chalk = require("chalk")
    console.log(chalk.blueBright(`Interwał `),chalk.blue(`status #1 `), chalk.blueBright(`uruchomi się za ${interval} sekund!`))
    //
    // USUWA OSTATNIA WIADOMOŚĆ NA KANALE PRZED ROZPOCZĘCIEM INTERWAŁU
    const kanal = client.channels.cache.get(`744500939691655208`)
    const wiad = `744640534018261003`
    const FiveM = require("fivem")
    const srv = new FiveM.Server(ip)
    const { MessageEmbed } = require("discord.js")
    //
    // ZMIENNE 
    const fetch = require('node-fetch');
    //
    // URUCHAMIA INTERWAŁ
    setInterval( async () => {
    
        kanal.messages.fetch({around: `${wiad}`, limit: 1})
        .then(async msgg => {
            const fetchedMsg = msgg.first();
            const max = `64`//await srv.getMaxPlayers()
    //
    // SZUKA OSTATNIEJ WIADOMOŚCI
    //
    //
    let serwofff = 0
    const gracze = await fetch(`http://${ip}/players.json`).then(response => response.json()).catch(() => {serwofff++})
    if(serwofff === 1) {
            const embed1xx = new MessageEmbed()
                .setAuthor(namebot)
                .setThumbnail(avatar)
                .setColor(`#ded309`)
                .addField("Status",`Offline`)
                .addField("IP",`${ip}`)
                .addField("Graczy",`0/64`)
                .setFooter(`🪐 VenousRP  |  Odświeżono`)
                .setTimestamp()
            fetchedMsg.edit(embed1xx)  
    } else if (gracze.length !== 0 ){
        const max = `64` //await srv.getMaxPlayers()
        const ilerazyx = gracze.length
        
        var namex = []
        var idx = []
        var pingx = []
        
        for(let x = 0;x<ilerazyx;x++){
            namex.push(`${gracze[x].name} \n`)
            idx.push(`${gracze[x].id} \n`)
            pingx.push(`${gracze[x].ping} \n`)
        }
        const embedx = new MessageEmbed()
        .setAuthor(namebot)
        .setThumbnail(avatar)
            .setColor(`#ded309`)
            .addField("Status",`Online`)
            .addField("IP",`${ip}`)
            .addField("Graczy",`${gracze.length}/${max}`)
            .setFooter(`🪐 VenousRP  |  Odświeżono`)
            .setTimestamp()
        fetchedMsg.edit(embedx)
    } else { 
        const embed1x = new MessageEmbed()
        .setAuthor(namebot)
        .setThumbnail(avatar)
            .setColor(`#ded309`)
            .addField("Status",`Online`)
            .addField("IP",`${ip}`)
            .addField("Graczy",`${gracze.length}/${max}`)
            .setFooter(`🪐 VenousRP  |  Odświeżono`)
            .setTimestamp()
        fetchedMsg.edit(embed1x)  
    }
    })
    }, interval * 1000);
    
}