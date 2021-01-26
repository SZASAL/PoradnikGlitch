const { prefix } = require("../../config/config")
const { MessageEmbed } = require("discord.js")
const kolor = require(`./instagram.colors.json`)
const avatar = require(`../../config/config`).avatar
const namebot = require(`../../config/config`).name
const logi1 = require(`../../config/config`).logiig1
const logi2 = require(`../../config/config`).logiig2

module.exports = async (msg, sendembed, prob, n) => {
    //
    // ZMIENNE
    const sqlite = require(`sqlite3`).verbose();
    let db = new sqlite.Database((__dirname+`/../data.db`), sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
    //
    // FUNKCJE
    function timeout() {
        const embedt = new MessageEmbed()
                .setColor(kolor.b)
                .setTitle(`Czas na wprowadzenie danych minął!`)
                .setAuthor(namebot, avatar)
                .setFooter(`Aby ponowić próbę wpisz ponownie ${prefix}instagram.\nJeśli twierdzisz, że to błąd, zgłoś go do administracji!`)
        sendembed.edit(embedt)
    }
    //
    function zapiskonta(l, h, a, n){
        const uid = `${a.id}`
        const ni = `${n}`
        const utag = a.tag
        let insertdata = db.prepare(`INSERT INTO data VALUES(?,?,?,?,?,?,?,?,?,?)`);
                insertdata.run( null ,uid, utag, l, h, 0, `false`, ni, 0, `0`);
                insertdata.finalize();
                db.close();
        const embedz = new MessageEmbed()
            .setColor(kolor.z)
            .setTitle(`KONTO ZAŁOŻONE!`)
            .setAuthor(namebot, avatar)
            .setFooter(`Jeśli chcesz się zalogować wpisz ponownie ${prefix}instagram!`)
        sendembed.edit(embedz)
        ////
            const Discord = require('discord.js');
            const hook = new Discord.WebhookClient(logi1, logi2);
            var time = new Date().toLocaleString();
            const embednewk = new MessageEmbed()
                    .setColor(`#37ff00`)
                    .setTitle(`Nowe konto!`)
                    .setDescription(`**Twórca konta: ** ${a}
                    \`Tag:\` ${a.tag}
                    \`ID:\` ${a.id}
                    \`Nick:\` ${n}
                    `)
                    .setAuthor(namebot, avatar)
                    .setFooter(`Data stworzenia: ${time}`)
            hook.send(embednewk)
    
    }
    //
    function zlaodp() {
        const embedz = new MessageEmbed()
                .setColor(kolor.b)
                .setTitle(`Niepoprawna odpowiedź!`)
                .setAuthor(namebot, avatar)
                .setFooter(`Aby ponowić próbę wpisz ponownie ${prefix}instagram.\nJeśli twierdzisz, że to błąd, zgłoś go do administracji!`)
        sendembed.edit(embedz)
    }
    //
    function nick(login, haslo) {
        const embedni = new MessageEmbed()
                .setColor(kolor.d)
                .setTitle(`WPROWADŹ NICK`)
                .setDescription(`**Login:** ${login}\n**Hasło:** ${haslo}\n**Nick:** ◀`)
                .setAuthor(namebot, avatar)
                .setFooter(`Ten nick będzie pokazywany przy każdym twoim poście na instagramie!`)
        sendembed.edit(embedni)
    }
    //
    function zatwierdzaniedanych(l, h, n){
        const embedt = new MessageEmbed()
            .setColor(kolor.d)
            .setTitle(`TWOJE DANE`)
            .setDescription(`**Login** : ${l}\n**Hasło** : ${h}\n**Nick** : ${n}`)
            .setAuthor(namebot, avatar)
            .setFooter(`Jeśli dane się zgadzają odpisz "tak", jeśli nie, odpisz "nie", a rejestracja rozpocznię się od nowa.\nJeśli zauważyłeś błąd zacznij rejestrację od początku!`)
        sendembed.edit(embedt)
    }
    //
    // SPRAWDZA CZY KTOŚ NIE CHCE PONOWNIE ZALOZYC KONTA
    if (n > 0){
        const embed5 = new MessageEmbed()
            .setColor(kolor.d)
            .setTitle(`WPROWADŹ LOGIN`)
            .setAuthor(namebot, avatar)
        sendembed.edit(embed5)
    }
    // EMBED O WPROWADZENIU LOGINU (SPRAWDZA CZY TO PIERWSZA PRÓBA)
    if (prob === 0 && n === 0){
        const embed1 = new MessageEmbed()
            .setColor(kolor.d)
            .setTitle(`PODAJ LOGIN`)
            .setDescription(`**Login:** ◀\n**Hasło:**\n**Nick:**`)
            .setAuthor(namebot, avatar)
        sendembed.edit(embed1)
    } else if (n === 0) {
        const embed2 = new MessageEmbed()
            .setColor(kolor.i)
            .setTitle(`Podany login jest już zajęty`)
            .setAuthor(namebot, avatar)
        sendembed.edit(embed2)

        setTimeout(() => {
            const embed3 = new MessageEmbed()
                .setColor(kolor.i)
                .setTitle(`WPROWADŹ NOWY LOGIN`)
                .setAuthor(namebot, avatar)
            sendembed.edit(embed3)
        }, 1500);
    }
    
    //
    //
    const filter = m => m.author.id === msg.author.id
    await msg.channel.awaitMessages( filter, { max: 1, time: 15000, errors: ['time'] })
    .then(async collected => {
        const login = `${collected.first().content}`
        let query = `SELECT * FROM data WHERE login = "${login}"`
        db.get(query, (err, row) => {
            if(row){
                const instagram2 = require("../instagram/2.instagram")
                prob++
                instagram2(msg, sendembed, prob, n)
            } else {
////////////////////////////////////////////////////////////////////////////////////////////
                const embed4 = new MessageEmbed()
                    .setColor(kolor.d)
                    .setTitle(`PODAJ HASŁO`)
                    .setDescription(`**Login:** ${login}\n**Hasło:** ◀\n**Nick:**`)
                    .setAuthor(namebot, avatar)
                sendembed.edit(embed4)
                const filter = m => m.author.id === msg.author.id
                msg.channel.awaitMessages( filter, { max: 1, time: 30000, errors: ['time'] })
                .then(async collected => {
                    const haslo = collected.first().content
                    nick(login, haslo)
                    const filter = m => m.author.id === msg.author.id
                    msg.channel.awaitMessages( filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(async collected => {
                        const nick1 = collected.first().content
                    
                    zatwierdzaniedanych(login, haslo, nick1)
////////////////////////////////////////////////////////////////////////////////////////////
                    msg.channel.awaitMessages( filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(async collected => {
                        const odp = collected.first().content.toLowerCase()
                        if(odp === `tak`){
                            zapiskonta(login, haslo, collected.first().author, nick1)
                        } else if (odp === `nie`){
                            n++
                            const instagram2 = require("../instagram/2.instagram")
                            instagram2(msg, sendembed, prob, n)
                        } else {
                            zlaodp()
                        }
                        }).catch(() => {
                            timeout() // URUCHAMIA FUNKCJE KTÓRA WYSYŁA ŻE MINĄŁ CZAS
                            });
                    }).catch(() => {
                    timeout() // URUCHAMIA FUNKCJE KTÓRA WYSYŁA ŻE MINĄŁ CZAS
                    });
                    
////////////////////////////////////////////////////////////////////////////////////////////
                }).catch(() => {
                    timeout() // URUCHAMIA FUNKCJE KTÓRA WYSYŁA ŻE MINĄŁ CZAS
                    });
                    
////////////////////////////////////////////////////////////////////////////////////////////
            } 
          })
    })
    
    .catch(() => {
        timeout() // URUCHAMIA FUNKCJE KTÓRA WYSYŁA ŻE MINĄŁ CZAS
      });
      

    //
    //
}