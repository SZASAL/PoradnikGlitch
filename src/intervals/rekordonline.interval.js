const on = true

module.exports = async (client) => {
    //
    // ON / OFF
    if(!on) return
    //
    // DEFINIUJE INTERWAL
    const interval = 5 * 61 // w sekundach
    //
    // POKAZUJE W KONSOLI ZA ILE KOMENDA SIE URUCHOMI
    const chalk = require("chalk")
    console.log(chalk.blueBright(`Interwał `),chalk.blue(`rekord online `), chalk.blueBright(`uruchomi się za ${interval} sekund!`))
    //
    // ZMIENNE
    const idg = require(`../config/config`).guildid
    const idk = require(`../config/config`).kanalrekordonline
    const guild = client.guilds.cache.get(`${idg}`)
    const kanal = guild.channels.cache.get(`${idk}`)
    
    //
    // URUCHAMIA INTERWAŁ
    setInterval( async () => {
        let i = 0
        await guild.members.cache.forEach(element => {
            if(element.presence.status !== `offline`){
                i++
              }
        });
        const aktualnyrekord = kanal.name.split(` `)[1]
        if (aktualnyrekord < i){
            kanal.setName(`『🏆』Rekord: ${i}`)
        }
    }, interval * 1000);
    
}