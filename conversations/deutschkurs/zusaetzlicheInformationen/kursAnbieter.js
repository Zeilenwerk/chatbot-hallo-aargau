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
module.exports = {
    askKursAnbieter: function (convo, nextThread = "None") {

        console.log("Start askKursAnbieter");

        convo.ask({
            text: 'Wer soll den Kurs Anbieten?',
            quick_replies: [
                {
                    title: 'Nosotras Aargau',
                    payload: 'Nosotras Aargau',
                },
                {
                    title: 'Verein Lesen und Schreiben für Erwachsene',
                    payload: 'Verein Lesen und Schreiben für Erwachsene',
                },
                {
                    title: 'TLC Baden',
                    payload: 'TLC Baden',
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    //Import Helper Class to get Entites from LUIS Response
                    const luisHelper = require("../../../util/luisHelper");

                    let aEntity = luisHelper. getEntityFromLuisResponse("kursAnbieter", res);

                    if (aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        //TODO: Handle not found entity
                        convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                        convo.repeat();
                    } else {
                        convo.setVar("kursAnbieter", aEntity[0]);
                        console.log("kursAnbieter = " + convo.vars.kursAnbieter);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }else{
                        convo.next();
                    }


                }
            }
        ]);

    }
};