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
    askKursIntensitaet: function (convo, nextThread = "None") {

        console.log("Start askKursIntensitaet");

        convo.ask({
            text: 'Was für eine Kursintensität suchen Sie?',
            quick_replies: [
                {
                    title: 'Wochenkurs',
                    payload: 'Wochenkurs',
                },
                {
                    title: 'Intensivkurs',
                    payload: 'Intensivkurs',
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    //Import Helper Class to get Entites from LUIS Response
                    const luisHelper = require("../../../util/luisHelper");

                    let aEntity = luisHelper. getEntityFromLuisResponse("kursIntensitaet", res);

                    if (aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        //TODO: Handle not found entity
                        convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                        convo.repeat();
                    } else {
                        convo.setVar("kursIntensitaet", aEntity[0]);
                        console.log("kursIntensitaet = " + convo.vars.kursIntensitaet);
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