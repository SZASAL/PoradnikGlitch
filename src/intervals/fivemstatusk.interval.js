const on = true
module.exports = async (client) => {
    //
    // ON / OFF
    if(!on) return
    //
    // DEFINIUJE INTERWAL
    const interval = 60 * 5 // w sekundach
    //
    // POKAZUJE W KONSOLI ZA ILE KOMENDA SIE URUCHOMI
    const chalk = require("chalk")
    console.log(chalk.blueBright(`Interwał `),chalk.blue(`status #2 `), chalk.blueBright(`uruchomi się za ${interval} sekund!`))
    //
    // ZMIENNE
    const ip = require(`../config/config`).ip
    const FiveM = require("fivem")
    const srv = new FiveM.Server(ip) 
    const kanal = client.channels.cache.get(`740896874826825749`)
    //
    //
        // ZMIENNE
        let i = 0
        const osobyx = await srv.getPlayers().catch(error => {i++})
        //
        if(i === 1){
            ////////////////////////////////////////////
            const presenceOptionsx = {
                activity: {
                    type: `PLAYING`,
                    name: `❌ Serwer OFF`,
                }
            }
            client.user.setPresence(presenceOptionsx)
            ////////////////////////////////////////////
        } else {
            ////////////////////////////////////////////
            const maxx = await srv.getMaxPlayers()
            const presenceOptionsx = {
                activity: {
                    type: `PLAYING`,
                    name: `Graczy: ${osobyx}/${maxx}`,
                }
            }
            client.user.setPresence(presenceOptionsx)
            ////////////////////////////////////////////
        }
        //
    // URUCHAMIA INTERWAŁ
    setInterval( async () => {
        //
        // ZMIENNE
        let i = 0
        const srvx = new FiveM.Server(ip)
        const osoby = await srvx.getPlayers().catch(error => {i++})
        //
        if(i === 1){
            ////////////////////////////////////////////
            const presenceOptions = {
                activity: {
                    type: `PLAYING`,
                    name: `❌ Serwer OFF`,
                }
            }
            client.user.setPresence(presenceOptions)
            ////////////////////////////////////////////
        } else {
            ////////////////////////////////////////////
            const max = await srvx.getMaxPlayers().catch(error => {})
            const presenceOptions = {
                activity: {
                    type: `PLAYING`,
                    name: `Graczy: ${osoby}/${max}`,
                }
            }
            client.user.setPresence(presenceOptions)
            ////////////////////////////////////////////
        }
        //
    }, interval * 1000);
    
}