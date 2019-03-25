/*Funktion für die Anfrage des Kurs Kosten
*
* Kurs Kosten:
* -> QR -> Nosotras Aargau
* -> QR -> Verein Lesen und Schreiben für Erwachsene
* -> QR -> TLC Baden
*
* Benutzerantwort wird in die Convo variable "kursKosten" gespeichert
*
* @param convo -> Conversation die am laufen ist
*
* */
module.exports = {
    convoKursKosten: function (convo, luisHelper, nextThread = "None") {

        console.log("Start askKursKosten");

        convo.addQuestion({
            text: 'Wie viel darf der Kurs Kosten?',
            quick_replies: [
                {
                    title: 'Subventionierter Kurs',
                    payload: 'Subventionierter Kurs',
                },
                {
                    title: 'Unter 500 Chf',
                    payload: 'Unter 500 Chf',
                },
                {
                    title: 'Bis zu 1000 Chf',
                    payload: 'Bis zu 1000 Chf',
                },
                {
                    title: 'Mehr als 1000 Chf',
                    payload: 'Mehr als 1000 Chf',
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper. getEntityFromLuisResponse("kursKosten", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        //TODO: Handle not found entity
                        convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                        convo.repeat();
                    } else {
                        convo.setVar("kursKosten", aEntity[0]);
                        console.log("kursKosten = " + convo.vars.kursKosten);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }else{
                        convo.next();
                    }


                }
            }
        ], {}, "askKursKosten");

    }
};