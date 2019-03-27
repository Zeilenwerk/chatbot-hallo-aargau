/*Funktion für die Anfrage des Kurs Anbieter
*
* Kurs Anbieter:
* -> QR -> Nosotras Aargau
* -> QR -> Verein Lesen und Schreiben für Erwachsene
* -> QR -> TLC Baden
*
* Benutzerantwort wird in die Convo variable "kursAnbieter" gespeichert
*
* @param convo -> Conversation die am laufen ist
*
* */
module.exports = {
    convoKursAnbieter: function (convo, luisHelper, nextThread = "None") {

        console.log("Start askKursAnbieter");

        convo.addQuestion({
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

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursAnbieter", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
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
        ], {}, "askKursAnbieter");

    }
};