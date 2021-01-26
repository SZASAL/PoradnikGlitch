module.exports =  {
    name: "messageReactionRemove",
    enabled: true,

    async run(reaction, user){
        // POBIERA EMOJI JEŚLI SĄ NIEDOSTĘPNE
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
        //
        //
        const fs = require("fs");
        const sqlite = require(`sqlite3`).verbose();
        let db = new sqlite.Database((__dirname+`/../addons/data.db`), sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
        const idig = require(`../config/config`).kanalinstagram
        //
        //
        // SPRAWDZA CZY WIADOMOŚĆ JEST Z IG
        if (user.bot) return
        //
        if(reaction._emoji.name !== '❤️') return
        //
        if(!reaction.message.author.bot) return
        //
        if (reaction.message.channel.id !== idig) return
        //
        // SZUKA W BAZIE AUTORA POSTA
        const nick = reaction.message.embeds[0].author.name
        let query = `SELECT * FROM data WHERE nick = "${nick}"`
        db.get(query, async (err, row) => {
            if(row){
                ///// DODAJE +1 DO SCORE /////
                let score = row.score
                score--
                db.run(`UPDATE data SET score = "${score}" WHERE nick = "${nick}"`) 
                //////////////////////////////
            } else {
                console.log(`ERROR | ID: brak użytkownika w bazie\nLokalizacja: src/events/reactionig.event.js`)
            }
        })
        //
        //
    }
}