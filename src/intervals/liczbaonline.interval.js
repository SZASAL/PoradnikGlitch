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
    console.log(chalk.blueBright(`Interwał `),chalk.blue(`online count `), chalk.blueBright(`uruchomi się za ${interval} sekund!`))
    //
    // ZMIENNE
    const idg = require(`../config/config`).guildid
    const idk = require(`../config/config`).kanalliczbaonline
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
        kanal.setName(`『🌎』Online: ${i}`)
    }, interval * 1000);
    
}