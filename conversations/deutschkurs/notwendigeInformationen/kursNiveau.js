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

module.exports = {
    askKursNiveau: function (convo, luisHelper, nextThread = "None") {

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

    },

    convoKursNiveau: function (convo, luisHelper, nextThread = "None") {

        console.log("Start askKursNiveau");

        convo.addQuestion({
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
        ], {}, "askKursNiveau");

    }
};