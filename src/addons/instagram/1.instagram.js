const { prefix } = require("../../config/config")
const { MessageEmbed } = require("discord.js")
const kolor = require(`./instagram.colors.json`)
const avatar = require(`../../config/config`).avatar
const namebot = require(`../../config/config`).name
const logi1 = require(`../../config/config`).logiig1
const logi2 = require(`../../config/config`).logiig2

module.exports = async (msg, sendembed) => {
    //
    // ZMIENNE
    const { client } = msg
    const sqlite = require(`sqlite3`).verbose();
    let db = new sqlite.Database((__dirname+`/../data.db`), sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
    
    //
    // FUNKCJE
    //
    function timeout() {
        const embedt = new MessageEmbed()
                .setColor(kolor.b)
                .setTitle(`Czas na wprowadzenie danych minął!`)
                .setAuthor(namebot, avatar)
                .setFooter(`Aby ponowić próbę wpisz ponownie ${prefix}instagram.\nJeśli twierdzisz, że to błąd, zgłoś go do administracji!`)
        sendembed.edit(embedt)
    }
    //
    function brakloginu() {
        const embedbl = new MessageEmbed()
                .setColor(kolor.b)
                .setTitle(`Konto z danym loginem nie istnieje!`)
                .setAuthor(namebot, avatar)
                .setFooter(`Aby ponowić próbę wpisz ponownie ${prefix}instagram.\nJeśli twierdzisz, że to błąd, zgłoś go do administracji!`)
        sendembed.edit(embedbl)
    }
    //
    function blednaodp() {
        const embedbl = new MessageEmbed()
                .setColor(kolor.b)
                .setTitle(`Błędna odpowiedź!`)
                .setDescription(`Dla Twojego bezpieczeństwa dokonano odmówienia logowania.`)
                .setAuthor(namebot, avatar)
                .setFooter(`Aby ponowić próbę wpisz ponownie ${prefix}instagram.\nJeśli twierdzisz, że to błąd, zgłoś go do administracji!`)
        sendembed.edit(embedbl)
    }
    //
    function blednehaslo() {
        const embedbh = new MessageEmbed()
                .setColor(kolor.b)
                .setTitle(`Błędne hasło!`)
                .setAuthor(namebot, avatar)
                .setFooter(`Aby ponowić próbę wpisz ponownie ${prefix}instagram.\nJeśli twierdzisz, że to błąd, zgłoś go do administracji!`)
        sendembed.edit(embedbh)
    }
    //
    function zawiadomienieadmin(row, msg, uzytkownik) {
        const Discord = require('discord.js');
        const hook = new Discord.WebhookClient(logi1, logi2);
        var time = new Date().toLocaleString();
        const embedzaw = new MessageEmbed()
                .setColor(`#ff0000`)
                .setTitle(`Zgłoszenie!`)
                .setDescription(`
                **Zgłaszający:** ${uzytkownik} 
                \`Tag:\` ${uzytkownik.tag} 
                \`ID:\` ${uzytkownik.id}\n
                **Konto zgłaszającego:**
                \`Nick:\` ${row.nick} 
                \`ID:\` ${row.id} 
                \`User ID:\` ${row.userid} 
                \`User Tag:\` ${row.usertag}\n
                **Osoba próbująca się zalogować:** ${msg.author} 
                \`Tag:\` ${msg.author.tag} 
                \`ID:\` ${msg.author.id}
                `)
                .setAuthor(namebot, avatar)
                .setFooter(`Data zgłoszenia: ${time}`)
        hook.send(embedzaw)
    }
    //
    function kontoinnegou() {
        const embedbh = new MessageEmbed()
                .setColor(kolor.i)
                .setTitle(`To konto zarejestrowane jest na innego użytkownika!`)
                .setDescription(`Jeśli napewno chcesz się zalogować na to konto odpisz \`tak\`, twórca konta zostanie poinformowany w celu zatwierdzenia logowania.`)
                .setAuthor(namebot, avatar)
                .setFooter(`Jeśli twierdzisz, że to błąd, zgłoś go do administracji, lub ponów probę komendą ${prefix}instagram`)
        sendembed.edit(embedbh)
    }
    //
    function podajhaslo() {
        const embedbl = new MessageEmbed()
                .setColor(kolor.d)
                .setTitle(`PODAJ HASLO`)
                .setAuthor(namebot, avatar)
        sendembed.edit(embedbl)
    }
    //
    // ZMIENIA EMBED ZEBY PODAĆ LOGIN
    const embed1 = new MessageEmbed()
                .setColor(kolor.d)
                .setTitle(`PODAJ LOGIN`)
                .setAuthor(namebot, avatar)
    sendembed.edit(embed1)
    //
    const filter = m => m.author.id === msg.author.id
    await msg.channel.awaitMessages( filter, { max: 1, time: 30000, errors: ['time'] })
    .then(async collected => {
        const login = `${collected.first().content}`
        let query = `SELECT * FROM data WHERE login = "${login}"`
        db.get(query, async (err, row) => {
            if(row){
                podajhaslo()
                const filter = m => m.author.id === msg.author.id
                await msg.channel.awaitMessages( filter, { max: 1, time: 30000, errors: ['time'] })
                .then(async collected => {
                    const haslo = collected.first().content
                //
                // SPRAWDZA CZY HASŁO JEST POPRAWNE
                    if (haslo === row.password){
                    const instagram3 = require("./3.instagram.js")
/////////////////////////////////////////////////////////////////////////////////////////////////////
                        if (msg.author.id === row.userid){
                            instagram3(msg, sendembed, row)
                        } else {
////////////////////////////////////////////////////////////////////////////////////////
                            kontoinnegou()
                            const filter = m => m.author.id === msg.author.id
                            await msg.channel.awaitMessages( filter, { max: 1, time: 60000, errors: ['time'] })
                            .then(async collected => {
                            if(collected.first().content.toLowerCase() === `tak`) {
                            const uzytkownik = client.users.cache.get(`${row.userid}`)
                            if(uzytkownik){
                                const kanal = await uzytkownik.createDM()
                                var time = new Date().toLocaleString();
                                const embedcheck1 = new MessageEmbed()
                                    .setColor(kolor.i)
                                    .setTitle(`Na twoje konto próbuje zalogować się inny użytkownik!`)
                                    .setDescription(`**Konto:** ${row.nick} \n
                                    **Dane użytkownika:**
                                    \`Użytkownik:\` ${msg.author}
                                    \`Nazwa:\` ${msg.author.tag}
                                    \`ID:\` ${msg.author.id}`)
                                    .setAuthor(namebot, avatar)
                                    .setFooter(`Odpisz tylko 1 opcją (allow, deny, zglos)\n\nJeśli pozwalasz na logowanie odpisz "allow".\nJeśli nie chcesz zezwolić na logowanie odpisz "deny".\nJeśli chcesz zgłosić to do administracji i nie zezwolić na logowanie odpisz "zglos". \n\nData zgłoszenia: ${time}`)
                            const check = kanal.send(embedcheck1)
                            const filter = m => m.author.id === uzytkownik.id
                            await kanal.awaitMessages( filter, { max: 1, time: 60000 * 3, errors: ['time'] })
                            .then(async collected => {
                                const odp = collected.first().content.toLowerCase()
                                if (odp === `allow`){
                                    const embed2 = new MessageEmbed()
                                            .setColor(kolor.d)
                                            .setTitle(`ŁADOWANIE`)
                                            .setAuthor(namebot, avatar)
                                    sendembed.edit(embed2)
                                    const embed5 = new MessageEmbed()
                                            .setColor(kolor.z)
                                            .setTitle(`Pomyślnie zezwolono na logowanie!`)
                                            .setAuthor(namebot, avatar)
                                    kanal.send(embed5)
                                    setTimeout(() => {
                                        instagram3(msg, sendembed, row) 
                                    }, 1000);                              
                                } else if (odp === `deny`){
                                    const embed3 = new MessageEmbed()
                                            .setColor(kolor.b)
                                            .setTitle(`Brak zezwolenia!`)
                                            .setFooter(`Aby ponowić próbę wpisz ponownie ${prefix}instagram.`)
                                            .setAuthor(namebot, avatar)
                                    sendembed.edit(embed3)
                                    //
                                    const embed4 = new MessageEmbed()
                                            .setColor(kolor.z)
                                            .setTitle(`Pomyślnie anulowano logowanie!`)
                                            .setAuthor(namebot, avatar)
                                    kanal.send(embed4)
                                    return
                                } else if (odp === `zglos`){
                                    zawiadomienieadmin(row, msg, uzytkownik)
                                    const embed6 = new MessageEmbed()
                                            .setColor(kolor.b)
                                            .setTitle(`Brak zezwolenia!`)
                                            .setFooter(`Aby ponowić próbę wpisz ponownie ${prefix}instagram.`)
                                            .setAuthor(namebot, avatar)
                                    sendembed.edit(embed6)
                                    //
                                    const embed7 = new MessageEmbed()
                                            .setColor(kolor.z)
                                            .setTitle(`Pomyślnie anulowano logowanie i wysłano zgłoszenie!`)
                                            .setAuthor(namebot, avatar)
                                    kanal.send(embed7)
                                    return
                                } else {
                                    blednaodp(check)
                                }
                            })
                            .catch(collected => {
                                timeout() // URUCHAMIA FUNKCJE KTÓRA WYSYŁA ŻE MINĄŁ CZAS
                                });
                                
                            } else {
                                console.log(`ERROR ID: 21414 Lokalizacja: src/addons/instagram/1.instagram.js`)
                            }
                        }})
////////////////////////////////////////////////////////////////////////////////////////
                        }
/////////////////////////////////////////////////////////////////////////////////////////////////////
                    } else {
                        blednehaslo()
                    }
                //
                //
            })
            .catch(collected => {
                timeout() // URUCHAMIA FUNKCJE KTÓRA WYSYŁA ŻE MINĄŁ CZAS
                });
                
                
            } else {
                brakloginu()
            }
            
        })

    })
    .catch(collected => {
        timeout() // URUCHAMIA FUNKCJE KTÓRA WYSYŁA ŻE MINĄŁ CZAS
        });
        
        
    //
    //
}