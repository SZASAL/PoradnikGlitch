module.exports =  {
    name: "guildBanAdd",
    enabled: true,

    async run(guild, user){
        //
        // ZMIENNE
        const idkanalu = require(`../config/config`).kanalliczbabanow
        const kanal = guild.channels.cache.get(`${idkanalu}`)
        let i = 0
        const bany = await guild.fetchBans()
        bany.forEach(user => {
            i++
        });
        kanal.setName(`『⛔️』Bany: ${i}`)
        //
        //
    }
}