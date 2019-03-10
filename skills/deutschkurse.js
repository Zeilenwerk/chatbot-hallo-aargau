module.exports = function (controller) {

    //Get LUIS middleware
    var luis = require('../node_modules/botkit-middleware-luis/src/luis-middleware');

    controller.hears(["Deutschkurs Suchen"], 'message_received', luis.middleware.hereIntent, function (bot, message) {

        bot.startConversation(message, function (err, convo) {

            //Log Message and top intent
            console.log("Recieved Message:");
            console.log(message);
            console.log("Top Intent: " + message.topIntent.intent);
            console.log("Score: " + message.topIntent.score);


            if (message.topIntent.intent === "Deutschkurs Suchen") {

                //deutschkursSuchen(convo, message, bot);
                require("../util/pgHelper").displayGefundeneKurse(function (m) {
                    bot.reply(message, m);
                }, convo);

            } else {

                bot.reply(message, "Leider noch nicht implementiert");

            }

        });

    });

    function deutschkursSuchen(convo, message, bot) {


        convo.addMessage("Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.");

        //********************************
        // Helpers
        //********************************
        // Import Helper Class to get Entites from LUIS Response
        const luisHelper = require("../util/luisHelper");
        const pgHelper = require("../util/pgHelper");


        //********************************
        // Initialize Conversation
        //********************************
        //Set Timeout in milliseconds
        // 1 min = 60000
        // 2 min = 120000
        // 3 min = 180000
        // 4 min = 240000
        // 5 min = 300000
        convo.setTimeout(120000);

        //Variablen zur Suche eines Deutschkurses die in der Conversation ausfindig gemacht werden müssen
        let aVars = ["kursOrt", "kursBezirk", "kursZeit", "kursTag", "kursTagUndZeit", "kursDatum", "kursIntensitaet", "kursAnbieter", "kursNiveau", "kursSprache", "kursAdressatengruppe",];

        for (var x = 0; x < aVars.length; x++) {

            let aEntity = luisHelper.getEntityFromLuisResponse(aVars[x], message);

            if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                console.log("Initialize var " + aVars[x] + " with value to 'None'");
                convo.setVar(aVars[x], "None");
            } else {
                if(aEntity[1]){
                    convo.setVar(aVars[x], aEntity[1]);
                    console.log(aVars[x] + " = " + aEntity[1]);
                }else{
                    convo.setVar(aVars[x], aEntity[0]);
                    console.log(aVars[x] + " = " + aEntity[0]);
                }

            }
        }

        //********************************
        //Check Notwendige Informationen
        //********************************
        console.log("Check Notwendige Informationen");

        if (convo.vars.kursOrt !== "None" && convo.vars.kursTag !== "None" && convo.vars.kursZeit !== "None" && convo.vars.kursNiveau !== "None") {
            console.log("Alle Notwendigen Infos vorhanden");
            console.log("gotoThread kursNotwendigeInfosMenu");
            convo.gotoThread("kursNotwendigeInfosMenu");
        } else {

            //Informationen vom benutzer beantragen, damit ein Deutschkurs gesucht werden kann
            if (convo.vars.kursOrt === "None") {
                console.log("askKursOrt");
                askKursOrt(convo, luisHelper);
            } else {
                if (convo.vars.kursBezirk !== "None") {
                    convo.say("Den Ort haben Sie schon angegeben ({{vars.kursOrt}}, im Bezirk {kursBezirk}}), somit benötige ich dies nicht mehr.")
                } else {
                    convo.say("Den Ort haben Sie schon angegeben ({{vars.kursOrt}}), somit benötige ich dies nicht mehr.")
                }
            }

            if (convo.vars.kursTag === "None") {
                console.log("askKursTag");
                askKursTag(convo, luisHelper);
            } else {
                convo.say("Als Kurstag, haben Sie den {{vars.kursTag}} gewählt.")
            }

            if (convo.vars.kursZeit === "None") {
                console.log("askKursZeit");
                askKursZeit(convo, luisHelper);
            } else {
                convo.say("Die Zeit am {{vars.kursTag}} für den Kurs ist {{vars.kursZeit}} Uhr.")
            }

            if (convo.vars.kursNiveau === "None") {
                console.log("askKursNiveau");
                askKursNiveau(convo, luisHelper, "kursNotwendigeInfosMenu");
            } else {
                convo.say("Das Kursniveau ist {{vars.kursNiveau}}.");
            }

        }

        //********************************
        //Conversation Threads
        //********************************

        // Create a yes/no question in the default thread...
        convo.addMessage('Sie Suchen somit für den {{vars.kursTag}} um {{vars.kursZeit}} ein Niveau {{vars.kursNiveau}} Deutschkurs in {{vars.kursOrt}}. ', 'kursNotwendigeInfosMenu');

        convo.addQuestion({
            text: 'Stimmen diese Angaben für Sie?',
            quick_replies: [
                {
                    title: 'Ja',
                    payload: 'Ja',
                },
                {
                    title: 'Nein, ich möchte etwas ändern',
                    payload: 'Nein',
                },
            ]
        }, [
            {
                pattern: 'Ja',
                callback: function (res, convo) {
                    convo.gotoThread("zusatzInfo");
                    convo.next();
                }
            },
            {
                pattern: 'Nein',
                callback: function (res, convo) {
                    convo.gotoThread("correctNeccessaryInfromation");
                    convo.next();
                }
            },
            {
                default: true,
                callback: function (res, convo) {
                    convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                    convo.repeat();
                }
            }
        ], {}, "kursNotwendigeInfosMenu");

        convo.addQuestion({
            text: 'Welche Angabe möchten sie abändern?',
            quick_replies: [
                {
                    title: 'Kurs Ort',
                    payload: 'Kurs Ort',
                },
                {
                    title: 'Kurs Tag',
                    payload: 'Kurs Tag',
                },
                {
                    title: 'Kurs Zeit',
                    payload: 'Kurs Zeit',
                },
                {
                    title: 'Kurs Niveau',
                    payload: 'Kurs Niveau',
                },
                {
                    title: 'Keine Änderung',
                    payload: 'Keine Änderung',
                },
            ]
        }, [
            {
                pattern: 'Kurs Ort',
                callback: function (res, convo) {
                    askKursOrt(convo, "neccessaryInfromation");
                }
            },
            {
                pattern: 'Kurs Tag',
                callback: function (res, convo) {
                    askKursTag(convo, "neccessaryInfromation");
                }
            },
            {
                pattern: 'Kurs Zeit',
                callback: function (res, convo) {
                    askKursZeit(convo, "neccessaryInfromation");
                }
            },
            {
                pattern: 'Kurs Niveau',
                callback: function (res, convo) {
                    askKursNiveau(convo, "neccessaryInfromation");
                }
            },
            {
                pattern: 'Keine Änderung',
                callback: function (res, convo) {
                    convo.gotoThread("zusatzInfo");
                }
            },
            {
                default: true,
                callback: function (res, convo) {
                    convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                    convo.repeat();
                }
            }
        ], {}, "correctNeccessaryInfromation");

        convo.addMessage("Zusätzliche Infromationen helfen mir die Kurse besser für Sie anzuzeigen.", "zusatzInfo");

        convo.addQuestion({
            text: 'Möchten sie mir noch eine oder mehrere der folgenden Zusatzinformationen geben:',
            quick_replies: [
                {
                    title: "Adressatengruppe",
                    payload: 'Adressatengruppe',
                },
                {
                    title: "Kurs Anbieter",
                    payload: 'Anbieter',
                },
                {
                    title: "Kurs Intensitaet",
                    payload: 'Intensitaet',
                },
                {
                    title: "Kurs Sprache",
                    payload: 'Sprache',
                },
                {
                    title: "Keine weiteren Angaben",
                    payload: 'Keine weiteren Angaben',
                },
            ]
        }, [
            {
                pattern: 'Adressatengruppe',
                callback: function (res, convo) {
                    askKursAdressatengruppe(convo, "zusatzInfo");
                }
            },
            {
                pattern: 'Anbieter',
                callback: function (res, convo) {
                    convo.addMessage("Noch nicht implementiert");
                }
            },
            {
                pattern: 'Intensitaet',
                callback: function (res, convo) {
                    convo.addMessage("Noch nicht implementiert");
                }
            },
            {
                pattern: 'Sprache',
                callback: function (res, convo) {
                    convo.addMessage("Noch nicht implementiert");
                }
            },
            {
                pattern: 'Keine weiteren Angaben',
                callback: function (res, convo) {
                    pgHelper.displayGefundeneKurse(function (m) {
                        bot.reply(message, m);
                    }, convo);
                    convo.next();
                }
            },
        ], {}, "zusatzInfo");




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


        //********************************
        // Ending Threads
        //********************************

        convo.on('end', function (convo) {

            convo.say('This is the end of the conversation.');

            if (convo.status === 'completed') {
                // do something useful with the users responses
                var res = convo.extractResponses();

                // reference a specific response by key
                var value = convo.extractResponse('key');

                // ... do more stuff...

            } else {
                // something happened that caused the conversation to stop prematurely
            }

        });

        convo.onTimeout(function (convo) {

            convo.say('Oh no! The time limit has expired.');
            convo.gotoThread("end")

        });


    }

    /*Funktion für die Anfrage des Kurortes
    *
    * TODO: Get Kurs Orte von Datenquelle mit allen Verfügbaren Orten
    *
    * @param convo -> Conversation die am laufen ist
    *
    * */
    function askKursOrt(convo, luisHelper, nextThread = "None") {

        console.log("Start askKursOrt");

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
                default: true,
                callback: function (res, convo) {

                    console.log("kursOrt Callback");

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursOrt", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        //TODO: Handle not found entity
                        convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                        convo.repeat();
                    } else {
                        convo.setVar("kursOrt", aEntity[0]);
                        console.log("kursOrt = " + convo.vars.kursOrt);

                        convo.setVar("kursBezirk", aEntity[1]);
                        console.log("kursBezirk = " + convo.vars.kursBezirk);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    } else {
                        convo.next();
                    }
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
    function askKursTag(convo, luisHelper, nextThread = "None") {

        console.log("Start askKursTag");

        convo.ask({
            text: "An welchem Tag soll der Kurs in {{kursOrt}} stattfinden?",
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
                default: true,
                callback: function (res, convo) {

                    console.log("kursTag Callback");

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursTag", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        //TODO: Handle not found entity
                        convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                        convo.repeat();
                    } else {
                        convo.setVar("kursTag", aEntity[0]);
                        console.log("kursTag = " + convo.vars.kursTag);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    } else {
                        convo.next();
                    }

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
    function askKursZeit(convo, luisHelper, nextThread = "None") {

        console.log("Start askKursZeit");

        convo.ask({
            text: 'Um wie viel Uhr soll der Kurs am {{vars.kursTag}} stattfinden?',
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    console.log("kursZeit Callback");

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursZeit", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        //TODO: Handle not found entity
                        convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                        convo.repeat();
                    } else {
                        convo.setVar("kursZeit", aEntity[0]);
                        console.log("KursZeit = " + convo.vars.kursZeit);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    } else {
                        convo.next();
                    }
                }
            }
        ]);


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
    function askKursNiveau(convo, luisHelper, nextThread = "None") {

        console.log("Start askKursNiveau");

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
                default: true,
                callback: function (res, convo) {

                    console.log("kursNiveau Callback");

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursNiveau", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        //TODO: Handle not found entity
                        convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                        convo.repeat();
                    } else {
                        convo.setVar("kursNiveau", aEntity[0]);
                        console.log("kursNiveau = " + convo.vars.kursNiveau);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    } else {
                        convo.next();
                    }
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
    function askKursAdressatengruppe(convo, nextThread = "None") {

        console.log("Start askKursAdressatengruppe");

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
                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }
                    console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    convo.next();
                }
            },
            {
                pattern: 'Jugendliche zwischen 16 - 21',
                callback: function (res, convo) {
                    convo.setVar("kursAdressatengruppe", "Jugendliche zwischen 16 - 21");
                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }
                    console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    convo.next();
                }
            },
            {
                pattern: 'Erwachsene',
                callback: function (res, convo) {
                    convo.setVar("kursAdressatengruppe", "Erwachsene");
                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }
                    console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    convo.next();
                }
            },
            {
                pattern: 'Frauen',
                callback: function (res, convo) {
                    convo.setVar("kursAdressatengruppe", "Frauen");
                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }
                    console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    convo.next();
                }
            },
            {
                pattern: 'Frauen mit Kinder',
                callback: function (res, convo) {
                    convo.setVar("kursAdressatengruppe", "Frauen mit Kinder");
                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }
                    console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    convo.next();
                }
            },
            {
                default: true,
                callback: function (res, convo) {

                    switch (res.text) {
                        case 'Jugendliche unter 16 Jahren':
                            convo.setVar("kursAdressatengruppe", "Jugendliche unter 16 Jahren");
                            break;
                        case 'Jugendliche zwischen 16 - 21':
                            convo.setVar("kursAdressatengruppe", "Jugendliche zwischen 16 - 21");
                            break;
                        case 'Erwachsene':
                            convo.setVar("kursAdressatengruppe", "Erwachsene");
                            break;
                        case 'Frauen':
                            convo.setVar("kursAdressatengruppe", "Frauen");
                            break;
                        case 'Frauen mit Kinder':
                            convo.setVar("kursAdressatengruppe", "Frauen mit Kinder");
                            break;
                        default:
                            convo.addMessage("Leider habe ich das nicht verstanden");
                            convo.repeat();
                            break;
                    }

                    console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }

                    convo.next();


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
    function askKursSprache(convo, nextThread = "None") {

        console.log("Start askKursSprache");

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
                default: true,
                callback: function (res, convo) {
                    switch (res.text) {
                        case 'Jugendliche unter 16 Jahren':
                            convo.setVar("kursAdressatengruppe", "Jugendliche unter 16 Jahren");
                            break;
                        case 'Jugendliche zwischen 16 - 21':
                            convo.setVar("kursAdressatengruppe", "Jugendliche zwischen 16 - 21");
                            break;
                        case 'Erwachsene':
                            convo.setVar("kursAdressatengruppe", "Erwachsene");
                            break;
                        case 'Frauen':
                            convo.setVar("kursAdressatengruppe", "Frauen");
                            break;
                        case 'Frauen mit Kinder':
                            convo.setVar("kursAdressatengruppe", "Frauen mit Kinder");
                            break;
                        default:
                            convo.addMessage("Leider habe ich das nicht verstanden");
                            convo.repeat();
                            break;
                    }

                    console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }

                    convo.next();
                }
            }
        ]);

    }
};
