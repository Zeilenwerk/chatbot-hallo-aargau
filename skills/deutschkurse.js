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

                deutschkursSuchen(convo, message, bot);
                // require("../util/pgHelper").displayGefundeneKurse(function (m) {
                //     bot.reply(message, m);
                // }, convo);

            } else {

                bot.reply(message, "Leider noch nicht implementiert");

            }

    });

    });

    function deutschkursSuchen(convo, message, bot) {

        //Set Timeout in milliseconds
        // 1 min = 60000
        // 2 min = 120000
        // 3 min = 180000
        // 4 min = 240000
        // 5 min = 300000
        convo.setTimeout(120000);

        convo.addMessage("Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.");

        //********************************
        // Helpers
        //********************************
        // Import Helper Class to get Entites from LUIS Response
        const luisHelper = require("../util/luisHelper");

        //********************************
        // Required Threads
        //********************************
        const kursOrt = require("../conversations/deutschkurs/notwendigeInformationen/kursOrt");
        const kursTag = require("../conversations/deutschkurs/notwendigeInformationen/kursTag");
        const kursZeit = require("../conversations/deutschkurs/notwendigeInformationen/kursZeit");
        const kursNiveau = require("../conversations/deutschkurs/notwendigeInformationen/kursNiveau");

        const kursAdressatengruppe = require("../conversations/deutschkurs/zusaetzlicheInformationen/kursAdressatengruppe");
        const kursAnbieter = require("../conversations/deutschkurs/zusaetzlicheInformationen/kursAnbieter");
        const kursIntensitaet = require("../conversations/deutschkurs/zusaetzlicheInformationen/kursIntensitaet");
        const kursKosten = require("../conversations/deutschkurs/zusaetzlicheInformationen/kursKosten");

        const kursGefundeneKurse = require("../conversations/deutschkurs/gefundeneKurse/kursGefundeneKurse");

        //********************************
        // Initialize Conversation
        //********************************

        kursOrt.convoKursOrt(convo, luisHelper, "kursNotwendigeInfosMenu");
        kursTag.convoKursTag(convo, luisHelper, "kursNotwendigeInfosMenu");
        kursZeit.convoKursZeit(convo, luisHelper, "kursNotwendigeInfosMenu");
        kursNiveau.convoKursNiveau(convo, luisHelper, "kursNotwendigeInfosMenu");

        kursAdressatengruppe.convoKursAdressatengruppe(convo, luisHelper, "zusatzInfo");
        kursAnbieter.convoKursAnbieter(convo, luisHelper, "zusatzInfo");
        kursIntensitaet.convoKursIntensitaet(convo, luisHelper, "zusatzInfo");
        kursKosten.convoKursKosten(convo, luisHelper, "zusatzInfo");


        //Variablen zur Suche eines Deutschkurses die in der Conversation ausfindig gemacht werden müssen
        let aVars = ["kursOrt", "kursBezirk", "kursZeit", "kursTag", "kursTagUndZeit", "kursDatum", "kursIntensitaet", "kursAnbieter", "kursNiveau", "kursSprache", "kursAdressatengruppe", "kursKosten"];

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

        convo.setVar("maxKurse", 3);
        convo.setVar("offsetKurse", 0);

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
                kursOrt.askKursOrt(convo, luisHelper);
            } else {
                if (convo.vars.kursBezirk !== "None") {
                    convo.say("Den Ort haben Sie schon angegeben ({{vars.kursOrt}}, im Bezirk {kursBezirk}}), somit benötige ich dies nicht mehr.")
                } else {
                    convo.say("Den Ort haben Sie schon angegeben ({{vars.kursOrt}}), somit benötige ich dies nicht mehr.")
                }
            }

            if (convo.vars.kursTag === "None") {
                console.log("askKursTag");
                kursTag.askKursTag(convo, luisHelper);
            } else {
                convo.say("Als Kurstag, haben Sie den {{vars.kursTag}} gewählt.")
            }

            if (convo.vars.kursZeit === "None") {
                console.log("askKursZeit");
                kursZeit.askKursZeit(convo, luisHelper);
            } else {
                convo.say("Die Zeit am {{vars.kursTag}} für den Kurs ist {{vars.kursZeit}} Uhr.")
            }

            if (convo.vars.kursNiveau === "None") {
                console.log("askKursNiveau");
                kursNiveau.askKursNiveau(convo, luisHelper, "kursNotwendigeInfosMenu");
            } else {
                convo.say("Das Kursniveau ist {{vars.kursNiveau}}.");
            }

        }

        //********************************
        //Conversation Threads
        //********************************

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
                default: true,
                callback: function (res, convo) {

                    switch (res.text) {

                        case "Kurs Ort":
                            convo.gotoThread("askKursOrt");
                            break;
                        case "Kurs Tag":
                            convo.gotoThread("askKursTag");
                            break;
                        case "Kurs Zeit":
                            convo.gotoThread("askKursZeit");
                            break;
                        case "Kurs Niveau":
                            convo.gotoThread("askKursNiveau");
                            break;
                        case "Keine Änderung":
                            convo.say("Zusätzliche Infromationen helfen mir die Kurse besser für Sie anzuzeigen.");
                            convo.gotoThread("zusatzInfo");
                            break;
                        default:
                            convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                            convo.repeat();
                            break;
                    }
                }
            }
        ], {}, "correctNeccessaryInfromation");



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
                    title: "Kurs Kosten",
                    payload: 'Kosten',
                },
                {
                    title: "Keine weiteren Angaben",
                    payload: 'Keine weiteren Angaben',
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    switch (res.text) {

                        case "Adressatengruppe":
                            convo.gotoThread("askKursAdressatengruppe");
                            break;
                        case "Anbieter":
                            convo.gotoThread("askKursAnbieter");
                            break;
                        case "Intensitaet":
                            convo.gotoThread("askKursIntensitaet");
                            break;
                        case "Kosten":
                            convo.gotoThread("askKursKosten");
                            break;
                        case "Keine weiteren Angaben":
                            kursGefundeneKurse.displayGefundeneKurse(function (m) {
                                bot.reply(message, m);
                            }, convo, convo.vars.maxKurse, convo.vars.offsetKurse);
                            break;
                        default:
                            convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                            convo.repeat();
                            break;
                    }
                }
            },
        ], {}, "zusatzInfo");


        convo.addQuestion({
            text: 'Möchten sie weitere Informationen zu einem dieser Kurse?',
            quick_replies: [
                {
                    title: "Ja, Kurs 1",
                    payload: 'Kurs 1',
                },
                {
                    title: "Ja, Kurs 2",
                    payload: 'Kurs 2',
                },
                {
                    title: "Ja, Kurs 3",
                    payload: 'Kurs 3',
                },
                {
                    title: "Nein, weitere Kurse anzeigen",
                    payload: 'Weitere Kurse anzeigen',
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    switch (res.text) {

                        case "Kurs 1":
                            // kursGefundeneKurse.displayKursInfromationen();
                            convo.addMessage("Leider noch nicht implementiert");
                            break;
                        case "Kurs 2":
                            // kursGefundeneKurse.displayKursInfromationen();
                            convo.addMessage("Leider noch nicht implementiert");
                            break;
                        case "Kurs 3":
                            // kursGefundeneKurse.displayKursInfromationen();
                            convo.addMessage("Leider noch nicht implementiert");
                            break;
                        case "Weitere Kurse anzeigen":

                            //Add +3 to offset
                            convo.setVar("offsetKurse", convo.vars.offsetKurse + 3)

                            kursGefundeneKurse.displayGefundeneKurse(function (m) {
                                bot.reply(message, m);
                            }, convo, convo.vars.maxKurse, convo.vars.offsetKurse);
                            break;
                        default:
                            convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                            convo.repeat();
                            break;
                    }
                }
            },
        ], {}, "gefundeneKurse");

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

};
