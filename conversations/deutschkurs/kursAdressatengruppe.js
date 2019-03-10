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
    askKursAdressatengruppe: function (convo, nextThread = "None") {

        console.log("Start askKursAdressatengruppe");

        convo.addQuestion({
            text: 'Für welches Adressatengruppe soll der Kurs sein?',
            quick_replies: [
                {
                    title: 'Jugendliche unter 16 Jahren',
                    payload: 'Jugendliche unter 16 Jahren',
                },
                {
                    title: 'Jugendliche zwischen 16 - 21',
                    payload: 'Jugendliche bis 21 Jährig',
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

                    //Import Helper Class to get Entites from LUIS Response
                    const luisHelper = require("../../util/luisHelper");

                    let aEntity = luisHelper. getEntityFromLuisResponse("kursAdressatengruppe", res);

                    if (aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        //TODO: Handle not found entity
                        convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                        convo.repeat();
                    } else {
                        convo.setVar("kursAdressatengruppe", aEntity[0]);
                        console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }else{
                        convo.next();
                    }


                }
            }
        ], {}, "askKursAdressatengruppe");

    }
};