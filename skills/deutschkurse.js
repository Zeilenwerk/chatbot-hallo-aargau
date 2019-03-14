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


        convo.addMessage("Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.");

        //********************************
        // Helpers
        //********************************
        // Import Helper Class to get Entites from LUIS Response
        const luisHelper = require("../util/luisHelper");
        const pgHelper = require("../util/pgHelper");

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
        const kursSprache = require("../conversations/deutschkurs/zusaetzlicheInformationen/kursSprache");

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
                default: true,
                callback: function (res, convo) {

                    switch (res.text) {

                        case "Kurs Ort":
                            kursOrt.askKursOrt(convo, luisHelper, "neccessaryInfromation");
                            break;
                        case "Kurs Tag":
                            kursTag.askKursTag(convo, luisHelper, "neccessaryInfromation");
                            break;
                        case "Kurs Zeit":
                            kursZeit.askKursZeit(convo, luisHelper, "neccessaryInfromation");
                            break;
                        case "Kurs Niveau":
                            kursNiveau.askKursNiveau(convo, luisHelper, "neccessaryInfromation");
                            break;
                        case "Keine Änderung":
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
                            kursAdressatengruppe.askKursAdressatengruppe(convo, luisHelper, "zusatzInfo");
                            break;
                        case "Anbieter":
                            kursAnbieter.askKursAnbieter(convo, luisHelper, "zusatzInfo");
                            break;
                        case "Intensitaet":
                            kursIntensitaet.askKursIntensitaet(convo, luisHelper, "zusatzInfo");
                            break;
                        case "Kosten":
                            convo.addMessage("Noch nicht implementiert");
                            break;
                        case "Keine weiteren Angaben":
                            pgHelper.displayGefundeneKurse(function (m) {
                                bot.reply(message, m);
                            }, convo);
                            convo.next();
                            break;
                        default:
                            convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                            convo.repeat();
                            break;
                    }
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

};
