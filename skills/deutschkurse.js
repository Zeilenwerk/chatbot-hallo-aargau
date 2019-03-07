module.exports = function (controller) {

    //Get LUIS middleware
    var luis = require('../node_modules/botkit-middleware-luis/src/luis-middleware');

    controller.hears(["Deutschkurs Suchen"], 'message_received', luis.middleware.hereIntent, function (bot, message) {

        bot.startConversation(message, function (err, convo) {

            console.log("Message:");
            console.log(message);

            console.log("Hello from LUIS Demo");
            console.log("Top Intent: " + message.topIntent.intent);
            console.log("Score: " + message.topIntent.score);


            if (message.topIntent.intent === "Deutschkurs Suchen") {

                deutschkursSuchen(convo, message);

            } else {

                bot.reply(message, "Leider noch nicht implementiert");

            }

        });

    });

    function deutschkursSuchen(convo, message) {

        //Set Timeout in milliseconds
        // 1 min = 60000
        // 2 min = 120000
        // 3 min = 180000
        // 4 min = 240000
        // 5 min = 300000
        convo.setTimeout(120000);

        //Variablen zur Suche eines Deutschkurses die in der Conversation ausfindig gemacht werden müssen
        convo.setVar("kursOrt", "None");
        convo.setVar("kursBezirk", "None");
        convo.setVar("kursZeit", "None");
        convo.setVar("kursTag", "None");
        convo.setVar("kursTagUndZeit", "None");
        convo.setVar("kursDatum", "None");
        convo.setVar("kursIntensitaet", "None");
        convo.setVar("kursAnbieter", "None");
        convo.setVar("kursNiveau", "None");
        convo.setVar("kursSprache", "None");
        convo.setVar("kursAdressatengruppe", "None");

        for (var i = 0; i < message.entities.length; i++) {
            let log = "Entitie #" + i +
                "\n\t-> Entity: '" + message.entities[i].entity + "'" +
                "\n\t-> Type: '" + message.entities[i].type + "'" +
                "\n\t-> StartIndex: '" + message.entities[i].startIndex + "'" +
                "\n\t-> EndIndex: '" + message.entities[i].endIndex + "'";

            if(message.entities[i].resolution) log += "\n\t-> Resolution: '" + console.log(message.entities[i].resolution) + "'";

            console.log(log);

            switch (message.entities[i].type) {
                case "kursZeit":
                    convo.setVar("kursZeit", message.entities[i].entity);
                    console.log("Set kursZeit to " + message.entities[i].entity);
                    break;

                case "kursTag":
                    convo.setVar("kursTag", message.entities[i].entity);
                    console.log("Set kursTag to " + message.entities[i].entity);
                    break;

                case "kursTagUndZeit":
                    convo.setVar("kursTagUndZeit", message.entities[i].entity);
                    console.log("Set kursTagUndZeit to " + message.entities[i].entity);
                    break;

                case "kursOrt":
                    convo.setVar("kursOrt", message.entities[i].entity);
                    console.log("Set kursOrt to " + message.entities[i].entity);

                    if(message.entities[i].resolution && message.entities[i].resolution.values){
                        let resolutionBezirk = message.entities[i].entity.resolution.values[0];
                        convo.setVar("kursBezirk", resolutionBezirk);
                        console.log("Set kursBezirk to " + resolutionBezirk);
                    }

                    break;

                case "kursIntensitaet":
                    convo.setVar("kursIntensitaet", message.entities[i].entity);
                    console.log("Set kursIntensitaet to " + message.entities[i].entity);
                    break;

                case "kursAnbieter":
                    convo.setVar("kursAnbieter", message.entities[i].entity);
                    console.log("Set kursAnbieter to " + message.entities[i].entity);
                    break;

                case "kursNiveau":
                    convo.setVar("kursNiveau", message.entities[i].entity);
                    console.log("Set kursNiveau to " + message.entities[i].entity);
                    break;

                case "kursSprache":
                    convo.setVar("kursSprache", message.entities[i].entity);
                    console.log("Set kursSprache to " + message.entities[i].entity);
                    break;

                case "kursAdressatengruppe":
                    convo.setVar("kursAdressatengruppe", message.entities[i].entity);
                    console.log("Set kursAdressatengruppe to " + message.entities[i].entity);
                    break;

                case "buildin.datetime":
                    convo.setVar("kursZeit", message.entities[i].entity);
                    console.log("Set kursZeit to " + message.entities[i].entity);
                    break;
            }
        }

        convo.addMessage( "Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.");

        //Informationen vom benutzer beantragen, damit ein Deutschkurs gesucht werden kann
        if (convo.vars.kursOrt === "None") {
            askKursOrt(convo);
        } else {
            if(convo.vars.kursBezirk !== "None"){
                convo.addMessage("Den Ort haben Sie schon angegeben ({{vars.kursOrt}}, im Bezirk {kursBezirk}}), somit benötige ich dies nicht mehr.")
            }else{
                convo.addMessage("Den Ort haben Sie schon angegeben ({{vars.kursOrt}}), somit benötige ich dies nicht mehr.")
            }
        }

        if (convo.vars.kursTag === "None") {
            askKursTag(convo);
        } else {
            convo.addMessage("Als Kurstag, haben Sie den {{vars.kursTag}} gewählt.")
        }

        if (convo.vars.kursZeit === "None") {
            askKursZeit(convo);
        } else {
            convo.addMessage("Die Zeit am {{vars.kursTag}} für den Kurs ist {{vars.kursZeit}} Uhr.")
        }

        if (convo.vars.kursNiveau === "None") {
            askKursNiveau(convo);
        } else {
            convo.addMessage("Das Kursniveau ist {{vars.kursNiveau}}.")
        }

        if (convo.vars.kursOrt !== "None" && convo.vars.kursTag !== "None" && convo.vars.kursZeit !== "None" && convo.vars.kursNiveau !== "None") {
            currentDeutschkurs(convo);
            convo.addMessage("Zusätzliche Infromationen helfen mir die Kurse besser für Sie anzuzeigen.");
        }


        // create a path for when a user says YES
        convo.addMessage({
            text: 'You said yes! How wonderful.',
        }, 'yes_thread');

        // create a path for when a user says NO
        convo.addMessage({
            text: 'You said no, that is too bad.',
        }, 'no_thread');

        // create a path where neither option was matched
        // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
        convo.addMessage({
            text: 'Sorry I did not understand.',
            action: 'default',
        }, 'bad_response');


        convo.on('end', function (convo) {

            if (convo.status === 'completed') {
                // do something useful with the users responses
                var res = convo.extractResponses();

                // reference a specific response by key
                var value = convo.extractResponse('key');

                // ... do more stuff...

            } else {
                // something happened that caused the conversation to stop prematurely
            }

            convo.say('This is the end of the conversation.');

        });

        convo.onTimeout(function (convo) {

            convo.say('Oh no! The time limit has expired.');
            convo.next();

        });


    }

    /*Funktion für anzeige der Kursinformationen die der benutzer angegeben hat
     *
     * Fragt ob alle angegebenen Infos Ok sind, falls nbicht, können Informationen vom benutzer geändert werden
     *
     * @param convo -> Conversation die am laufen ist
     *
     * */
    function currentDeutschkurs(convo) {

        var reply = "Ihre Angaben:";

        if (convo.vars.kursOrt !== "None") reply += "Kursort: '" + kursOrt + "'\n";
        if (convo.vars.kursZeit !== "None") reply += "Kurszeit: '" + kursZeit + "'\n";
        if (convo.vars.kursIntensitaet !== "None") reply += "Kurs Intensität: '" + kursIntensitaet + "'\n";
        if (convo.vars.kursAnbieter !== "None") reply += "Kurs Anbieter: '" + kursAnbieter + "'\n";
        if (convo.vars.kursNiveau !== "None") reply += "Kurs Niveau: '" + kursNiveau + "'\n";
        if (convo.vars.kursSprache !== "None") reply += "Kurs Sprache: '" + kursSprahe + "'\n";
        if (convo.vars.kursAdressatengruppe !== "None") reply += "Kurs Adressatengruppe: '" + kursAdressatengruppe + "'\n";

        convo.addMessage(reply);

        // Create a yes/no question in the default thread...
        convo.addQuestion('Stimmen diese Angaben für Sie?', [
            {
                pattern: 'yes',
                callback: function (response, convo) {
                    convo.gotoThread('yes_thread');
                },
            },
            {
                pattern: 'no',
                callback: function (response, convo) {
                    convo.gotoThread('no_thread');
                },
            },
            {
                default: true,
                callback: function (response, convo) {
                    convo.gotoThread('bad_response');
                },
            }
        ], {}, 'default');

    }

    /*Funktion für die Anfrage des Kurortes
    *
    * TODO: Get Kurs Orte von Datenquelle mit allen Verfügbaren Orten
    *
    * @param convo -> Conversation die am laufen ist
    *
    * */
    function askKursOrt(convo) {
        // set up a menu thread which other threads can point at.
        convo.ask({
            text: 'Wo soll der Deutschkurs stattfinden?',
            quick_replies: [
                {
                    title: 'Aarau',
                    payload: 'Deutschkurs in Aarau',
                },
                {
                    title: 'Baden',
                    payload: 'Deutschkurs in Baden',
                },
                {
                    title: 'Lenzburg',
                    payload: 'Deutschkurs in Lenzburg',
                },
                {
                    title: 'Rheinfelden ',
                    payload: 'Deutschkurs in Rheinfelden ',
                },
            ]
        }, [
            {
                pattern: 'Deutschkurs in Aarau',
                callback: function (res, convo) {
                    convo.setVar("kursOrt", "Aarau");
                    console.log("kursOrt = " + convo.vars.kursOrt);
                    convo.next();
                }
            },
            {
                pattern: 'Deutschkurs in Baden',
                callback: function (res, convo) {
                    convo.setVar("kursOrt", "Baden");
                    console.log("kursOrt = " + convo.vars.kursOrt);
                    convo.next();
                }
            },
            {
                pattern: 'Deutschkurs in Lenzburg',
                callback: function (res, convo) {
                    convo.setVar("kursOrt", "Lenzburg");
                    console.log("kursOrt = " + convo.vars.kursOrt);
                    convo.next();
                }
            },
            {
                pattern: 'Deutschkurs in Rheinfelden',
                callback: function (res, convo) {
                    convo.setVar("kursOrt", "Rheinfelden");
                    console.log("kursOrt = " + convo.vars.kursOrt);
                    convo.next();
                }
            },
            {
                default: true,
                callback: function (res, convo) {

                    console.log("Default Kurs Ort");

                    let aEntity = getEntityFromLuisResponse("kursOrt", res);

                    if (array === undefined || array.length === 0) {
                        // array empty or does not exist
                        //TODO: Handle not found entity
                    }else{
                        convo.setVar("kursOrt", aEntity["sEntity"]);
                        console.log("kursOrt = " + convo.vars.kursZeit);

                        convo.setVar("kursBezirk",  aEntity["sResolution"] );
                        console.log("kursBezirk = " + convo.vars.kursBezirk);
                    }

                    convo.next();
                }
            }
        ]);
    }

    /*Funktion für die Anfrage des Kurs Tag
    *
    * Tage:
    * -> QR -> Montag
    * -> QR -> Dinestag
    * -> QR -> Mittwoch
    * -> QR -> Donnerstag
    * -> QR -> Freitag
    * -> QR -> Samstag
    * -> QR -> Sonntag
    *
    * Benutzerantwort wird in die Convo variable "kursTag" gespeichert
    *
    * @param convo -> Conversation die am laufen ist
    *
    * */
    function askKursTag(convo) {

        let text = "";
        if(convo.vars.kursBezirk !== "None"){
            text = "An welchem Tag soll der Kurs in {{kursOrt}}, {{kursBezirk}} stattfinden?";
        }else{
            text = "An welchem Tag soll der Kurs in {{kursOrt}} stattfinden?";
        }

        convo.ask({
            text: text,
            quick_replies: [
                {
                    title: 'Montag',
                    payload: 'Montag',
                },
                {
                    title: 'Dienstag',
                    payload: 'Dienstag',
                },
                {
                    title: 'Mittwoch',
                    payload: 'Mittwoch',
                },
                {
                    title: 'Donnerstag',
                    payload: 'Donnerstag',
                },
                {
                    title: 'Freitag',
                    payload: 'Freitag',
                },
                {
                    title: 'Samstag',
                    payload: 'Samstag',
                },
                {
                    title: 'Sonntag',
                    payload: 'Sonntag',
                },
            ]
        }, [
            {
                pattern: 'Montag',
                callback: function (res, convo) {
                    convo.setVar("kursTag", "Montag");
                    console.log("kursTag = " + convo.vars.kursTag);
                    if (convo.vars.kursZeit === "None") {
                        askKursZeit(convo);
                    }
                    convo.next();
                }
            },
            {
                pattern: 'Dienstag',
                callback: function (res, convo) {
                    convo.setVar("kursTag", "Dienstag");
                    console.log("kursTag = " + convo.vars.kursTag);
                    if (convo.vars.kursZeit === "None") {
                        askKursZeit(convo);
                    }
                    convo.next();
                }
            },
            {
                pattern: 'Mittwoch',
                callback: function (res, convo) {
                    convo.setVar("kursTag", "Mittwoch");
                    console.log("kursTag = " + convo.vars.kursTag);
                    if (convo.vars.kursZeit === "None") {
                        askKursZeit(convo);
                    }
                    convo.next();
                }
            },
            {
                pattern: 'Donnerstag',
                callback: function (res, convo) {
                    convo.setVar("kursTag", "Donnerstag");
                    console.log("kursTag = " + convo.vars.kursTag);
                    if (convo.vars.kursZeit === "None") {
                        askKursZeit(convo);
                    }
                    convo.next();
                }
            },
            {
                pattern: 'Freitag',
                callback: function (res, convo) {
                    convo.setVar("kursTag", "Freitag");
                    console.log("kursTag = " + convo.vars.kursTag);
                    if (convo.vars.kursZeit === "None") {
                        askKursZeit(convo);
                    }
                    convo.next();
                }
            },
            {
                pattern: 'Samstag',
                callback: function (res, convo) {
                    convo.setVar("kursTag", "Samstag");
                    console.log("kursTag = " + convo.vars.kursTag);
                    if (convo.vars.kursZeit === "None") {
                        askKursZeit(convo);
                    }
                    convo.next();
                }
            },
            {
                pattern: 'Sonntag',
                callback: function (res, convo) {
                    convo.setVar("kursTag", "Sonntag");
                    console.log("kursTag = " + convo.vars.kursTag);
                    if (convo.vars.kursZeit === "None") {
                        askKursZeit(convo);
                    }
                    convo.next();
                }
            },
            {
                default: true,
                callback: function (res, convo) {
                    convo.gotoThread('end');
                }
            }
        ]);

    }

    /*Funktion für die Anfrage der Kurszeit
    *
    * Kurszeit wird mittels text extraktion aus der Antwort des benutzers gewonnen
    * TODO: Muss noch überarbeitet werde (Quick & Dirty & Fehleranfällig)
    *
    * Benutzerantwort wird in die Convo variable "kursZeit" gespeichert
    *
    * @param convo -> Conversation die am laufen ist
    *
    * */
    function askKursZeit(convo) {

        convo.ask({
            text: 'Um wie viel Uhr soll der Kurs am {{vars.kursTag}} stattfinden?',
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    //Only get numbers from response
                    // Source: https://stackoverflow.com/questions/1183903/regex-using-javascript-to-return-just-numbers
                    //Only get first 4 Numbers
                    // Source: https://stackoverflow.com/questions/11096977/javascript-how-to-get-the-first-4-numbers-in-a-string
                    // var numberPattern = /\d+/g;
                    // let uhrzeit = res.text;
                    // uhrzeit = uhrzeit.match(numberPattern).join([]).substring(0, 4);
                    //
                    //
                    // //Splice in a : befor the 2 last digits, so it rersembles a timestamp
                    // if (uhrzeit.length > 2) {
                    //     position = uhrzeit.length - 2;
                    //     uhrzeit = [uhrzeit.slice(0, position), ":", uhrzeit.slice(position)].join('')
                    // }

                    let aEntity = getEntityFromLuisResponse("kursZeit", res);

                    if (array === undefined || array.length === 0) {
                        // array empty or does not exist
                        //TODO: Handle not found entity
                    }else{
                        convo.setVar("kursZeit", aEntity["sEntity"]);
                        console.log("KursZeit = " + convo.vars.kursZeit);
                    }

                    convo.next();
                }
            }
        ]);

        convo.addMessage('Super, somit {{vars.kursTag}} um {{vars.kursZeit}} Uhr');
    }

    /*Funktion für die Anfrage des Kurs Niveau
    *
    * Kurs Niveau:
    * -> QR -> A1
    * -> QR -> A2
    * -> QR -> B1
    * -> QR -> B2
    * -> QR -> C1
    * -> QR -> C2
    * -> QR -> Keine / Wenig Deutschkentnisse
    *
    * Benutzerantwort wird in die Convo variable "kursNiveau" gespeichert
    *
    * @param convo -> Conversation die am laufen ist
    *
    * */
    function askKursNiveau(convo) {

        convo.ask({
            text: 'Für welches Sprachniveau suchen Sie den Kurs?',
            quick_replies: [
                {
                    title: 'A1',
                    payload: 'A1',
                },
                {
                    title: 'A2',
                    payload: 'A2',
                },
                {
                    title: 'B1',
                    payload: 'B1',
                },
                {
                    title: 'B2 (Business)',
                    payload: 'B2',
                },
                {
                    title: 'C1',
                    payload: 'C1',
                },
                {
                    title: 'C2',
                    payload: 'C2',
                },
                {
                    title: 'Kurs für Anfänger',
                    payload: 'Kurs für Anfänger',
                },
            ]
        }, [
            {
                pattern: 'A1',
                callback: function (res, convo) {
                    convo.setVar("kursNiveau", "A1");
                    console.log("kursNiveau = " + convo.vars.kursNiveau);
                    convo.next();
                }
            },
            {
                pattern: 'A2',
                callback: function (res, convo) {
                    convo.setVar("kursNiveau", "A2");
                    console.log("kursNiveau = " + convo.vars.kursNiveau);
                    convo.next();
                }
            },
            {
                pattern: 'B1',
                callback: function (res, convo) {
                    convo.setVar("kursNiveau", "B1");
                    console.log("kursNiveau = " + convo.vars.kursNiveau);
                    convo.next();
                }
            },
            {
                pattern: 'B2',
                callback: function (res, convo) {
                    convo.setVar("kursNiveau", "B2");
                    console.log("kursNiveau = " + convo.vars.kursNiveau);
                    convo.next();
                }
            },
            {
                pattern: 'C1',
                callback: function (res, convo) {
                    convo.setVar("kursNiveau", "C1");
                    console.log("kursNiveau = " + convo.vars.kursNiveau);
                    convo.next();
                }
            },
            {
                pattern: 'C2',
                callback: function (res, convo) {
                    convo.setVar("kursNiveau", "C2");
                    console.log("kursNiveau = " + convo.vars.kursNiveau);
                    convo.next();
                }
            },
            {
                pattern: 'Kurs für Anfänger',
                callback: function (res, convo) {
                    convo.setVar("kursNiveau", "Anfaenger");
                    console.log("kursNiveau = " + convo.vars.kursNiveau);
                    convo.next();
                }
            },
            {
                default: true,
                callback: function (res, convo) {
                    convo.gotoThread('end');
                }
            }
        ]);

    }

    /*Funktion für die Anfrage der Adressatengruppe des Kurses
    *
    * Adressatengruppe:
    * -> QR -> Jugendliche < 16
    * -> QR -> Jugendliche zwischen 16 - 21
    * -> QR -> Erwachsene
    * -> QR -> Frauen
    * -> QR -> Frauen mit Kinder
    *
    * Benutzerantwort wird in die Convo variable "kursAdressatengruppe" gespeichert
    *
    * @param convo -> Conversation die am laufen ist
    *
    * */
    function askKursAdressatengruppe(convo) {

        convo.ask({
            text: 'Für welches Adressatengruppe soll der Kurs sein?',
            quick_replies: [
                {
                    title: 'Jugendliche unter 16 Jahren',
                    payload: 'Jugendliche unter 16 Jahren',
                },
                {
                    title: 'Jugendliche zwischen 16 - 21',
                    payload: 'Jugendliche zwischen 16 - 21',
                },
                {
                    title: 'Erwachsene',
                    payload: 'Erwachsene',
                },
                {
                    title: 'Frauen',
                    payload: 'Frauen',
                },
                {
                    title: 'Frauen mit Kinder',
                    payload: 'Frauen mit Kinder',
                },
            ]
        }, [
            {
                pattern: 'Jugendliche unter 16 Jahren',
                callback: function (res, convo) {
                    convo.setVar("kursAdressatengruppe", "Jugendliche unter 16 Jahren");
                    console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    convo.next();
                }
            },
            {
                pattern: 'Jugendliche zwischen 16 - 21',
                callback: function (res, convo) {
                    convo.setVar("kursAdressatengruppe", "Jugendliche zwischen 16 - 21");
                    console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    convo.next();
                }
            },
            {
                pattern: 'Erwachsene',
                callback: function (res, convo) {
                    convo.setVar("kursAdressatengruppe", "Erwachsene");
                    console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    convo.next();
                }
            },
            {
                pattern: 'Frauen',
                callback: function (res, convo) {
                    convo.setVar("kursAdressatengruppe", "Frauen");
                    console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    convo.next();
                }
            },
            {
                pattern: 'Frauen mit Kinder',
                callback: function (res, convo) {
                    convo.setVar("kursAdressatengruppe", "Frauen mit Kinder");
                    console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    convo.next();
                }
            },
            {
                default: true,
                callback: function (res, convo) {
                    convo.gotoThread('end');
                }
            }
        ]);

    }

    /*Funktion für die Anfrage der Sprache des Kurses
     *
     * Kurssprache
     *  -> QR -> Deutsch
     *  -> QR -> English
     *  -> QR -> Arabisch
     *  -> QR -> Spanisch
     *  -> QR -> Portugiesisch
     *  -> QR -> Italienisch
     *
     *
     *
     * Benutzerantwort wird in die Convo variable "kursAdressatengruppe" gespeichert
     *
     * @param convo -> Conversation die am laufen ist
     *
     * */
    function askKursSprache(convo) {

        convo.ask({
            text: 'Für welches Adressatengruppe soll der Kurs sein?',
            quick_replies: [
                {
                    title: 'Jugendliche unter 16 Jahren',
                    payload: 'Jugendliche unter 16 Jahren',
                },
                {
                    title: 'Jugendliche zwischen 16 - 21',
                    payload: 'Jugendliche zwischen 16 - 21',
                },
                {
                    title: 'Erwachsene',
                    payload: 'Erwachsene',
                },
                {
                    title: 'Frauen',
                    payload: 'Frauen',
                },
                {
                    title: 'Frauen mit Kinder',
                    payload: 'Frauen mit Kinder',
                },
            ]
        }, [
            {
                pattern: 'Jugendliche unter 16 Jahren',
                callback: function (res, convo) {
                    convo.setVar("kursAdressatengruppe", "Jugendliche unter 16 Jahren");
                    console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    convo.next();
                }
            },
            {
                pattern: 'Jugendliche zwischen 16 - 21',
                callback: function (res, convo) {
                    convo.setVar("kursAdressatengruppe", "Jugendliche zwischen 16 - 21");
                    console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    convo.next();
                }
            },
            {
                pattern: 'Erwachsene',
                callback: function (res, convo) {
                    convo.setVar("kursAdressatengruppe", "Erwachsene");
                    console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    convo.next();
                }
            },
            {
                pattern: 'Frauen',
                callback: function (res, convo) {
                    convo.setVar("kursAdressatengruppe", "Frauen");
                    console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    convo.next();
                }
            },
            {
                pattern: 'Frauen mit Kinder',
                callback: function (res, convo) {
                    convo.setVar("kursAdressatengruppe", "Frauen mit Kinder");
                    console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    convo.next();
                }
            },
            {
                default: true,
                callback: function (res, convo) {
                    luis.middleware.hereAction();
                    convo.gotoThread('end');
                }
            }
        ]);

    }

    /*Funktion für die Anfrage voon Zusatzinformationen für den Kurs
    *
    * @param convo -> Conversation die am laufen ist
    *
    * */
    function askZusaetzlicheKursInformationen(convo){

        let titleInfoKursAdressatengruppe = (convo.vars.kursAdressatengruppe === "None") ? "Adressatengruppe" : "Adressatengruppe ändern";
        let titleInfoKursAnbieter = (convo.vars.kursAnbieter === "None") ? "Gewünschter Kursanbieter" : "Gewünschter Kursanbieter ändern";
        let titleInfoKursIntensitaet = (convo.vars.kursIntensitaet === "None") ? "Kurs Intensität" : "Kurs Intensität ändern";
        let titleInfoKursSprache = (convo.vars.kursSprache === "None") ? "Kurs Sprache" : "Kurs Sprache ändern";

        convo.ask({
            text: 'Möchten sie mir noch eine oder mehrere der folgenden Zusatzinformationen geben:',
            quick_replies: [
                {
                    title: titleInfoKursAdressatengruppe,
                    payload: 'Adressatengruppe',
                },
                {
                    title: titleInfoKursAnbieter,
                    payload: 'Anbieter',
                },
                {
                    title: titleInfoKursIntensitaet,
                    payload: 'Intensitaet',
                },
                {
                    title: titleInfoKursSprache,
                    payload: 'Sprache',
                },
            ]
        }, [
            {
                pattern: 'Adressatengruppe',
                callback: function (res, convo) {
                    askKursAdressatengruppe(convo);
                    convo.next();
                }
            },
            {
                pattern: 'Anbieter',
                callback: function (res, convo) {
                    convo.addMessage("Noch nicht implementiert");
                    convo.next();
                }
            },
            {
                pattern: 'Intensitaet',
                callback: function (res, convo) {
                    convo.addMessage("Noch nicht implementiert");
                    convo.next();
                }
            },
            {
                pattern: 'Sprache',
                callback: function (res, convo) {
                    convo.addMessage("Noch nicht implementiert");
                    convo.next();
                }
            },
        ]);

    }

    function correctionDeutschkurs() {


    }

    /*
    * Checkd ob Entity in der Antwort von LUIS vorhanden ist
    *
    * @param sEntitType --> Type der Entität die gesucht wird
    * @param res --> Response Element der konversation
    *
    * @return aRetVal --> Empty Array || Entity Name && Entity Resolution in an array
    *
    * */
    function getEntityFromLuisResponse(sEntitType, res){

        let aRetVal = array();
        let sEntity = "None";
        let sResolution = "None";

        //TODO: Handle not found ort
        for (var i = 0; i < res.entities.length; i++) {
            let log = "Entitie #" + i +
                "\n\t-> Entity: '" + res.entities[i].entity + "'" +
                "\n\t-> Type: '" + res.entities[i].type + "'";

            console.log(log);

            if(res.entities[i].type === sEntitType){

                console.log("Entity found for Type " + sEntitType);
                console.log(res.entities[i]);

                sEntity = res.entities[i].entity;

                if(res.entities[i].resolution && res.entities[i].resolution.value) sResolution = res.entities[i].resolution.value;
                if(res.entities[i].resolution && res.entities[i].resolution.values) sResolution = res.entities[i].resolution.values[0];

                aRetVal["sEntity"] = sEntity;
                aRetVal["sResolution"] = sResolution;

                break;
            }

        }

        console.log("Ret Val: " + aRetVal);
        return aRetVal;
    }


    // controller.on('deutschkurs_in_aarau', function (bot, message) {
    //
    //     bot.startConversation(message, function (err, convo) {
    //
    //         // set up a menu thread which other threads can point at.
    //         convo.ask({
    //             text: 'In Aarau finden folgende Kurse statt',
    //             quick_replies: [
    //                 {
    //                     title: 'Intensivkurs ab 01.02.2019',
    //                     payload: 'K1',
    //                 },
    //                 {
    //                     title: 'Wochenkurs, jeweils mittwochs und freitags um 19:00',
    //                     payload: 'K2',
    //                 },
    //                 {
    //                     title: 'Wochenkurs, jeweils dienstags um 08:30',
    //                     payload: 'K3',
    //                 },
    //             ]
    //         }, [
    //             {
    //                 pattern: 'K1',
    //                 callback: function (res, convo) {
    //                     convo.gotoThread('K1');
    //                     convo.next();
    //                 }
    //             },
    //             {
    //                 pattern: 'K2',
    //                 callback: function (res, convo) {
    //                     convo.gotoThread('K2');
    //                     convo.next();
    //                 }
    //             },
    //             {
    //                 pattern: 'K3',
    //                 callback: function (res, convo) {
    //                     convo.gotoThread('K1');
    //                     convo.next();
    //                 }
    //             },
    //             {
    //                 default: true,
    //                 callback: function (res, convo) {
    //                     convo.gotoThread('end');
    //                 }
    //             }
    //         ]);
    //
    //         // set up end threads
    //         convo.addMessage({
    //             text: 'I do not know how to help with that. Say `help` at any time to access this menu.'
    //         }, 'end');
    //
    //         // set up K1 threads
    //         convo.addMessage({
    //             text: 'Noch nicht implementiert',
    //         }, 'K1');
    //
    //         // set up K2 threads
    //         convo.addMessage({
    //             text: 'default'
    //         }, 'K2');
    //
    //         // set up K3 threads
    //         convo.addMessage({
    //             text: 'Super, hier die Daten zum Kurs:\n' +
    //                 'TLC Baden\n' +
    //                 'Bahnhofstrasse 44\n' +
    //                 '5400 Baden\n' +
    //                 'info@ihbaden.ch\n' +
    //                 'www.ihbaden.ch\n' +
    //                 'Tel: 056 205 51 78\n'
    //         }, 'K3');
    //
    //         convo.addMessage({
    //             text: 'Viel Spass beim Deutsch lernen!'
    //         }, 'K3');
    //
    //
    //     });
    //
    // });

};
