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
module.exports = {
    askKursZeit: function (convo, luisHelper, nextThread = "None") {

        console.log("Start askKursZeit");

        convo.ask({
            text: 'Um wie viel Uhr soll der Kurs am {{vars.kursTag}} stattfinden?',
            quick_replies: [
                {
                    title: 'Morgens (07:00 - 10:00 Uhr)',
                    payload: '07:00 Uhr',
                },
                {
                    title: 'Mittags (10:00 - 13:00 Uhr)',
                    payload: '10:00 Uhr',
                },
                {
                    title: 'Nachmittags (13:00 - 16:00 Uhr)',
                    payload: '13:00 Uhr',
                },
                {
                    title: 'Abends (16:00 - 19:00 Uhr)',
                    payload: '16:00 Uhr',
                },
                {
                    title: 'Nachts (19:00 - 22:00 Uhr)',
                    payload: '19:00 Uhr',
                },
            ]
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
                        //Get entity for zeit, not resolution (regex pattern)
                        convo.setVar("kursZeit", aEntity[1]);
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

    },

    convoKursZeit: function (convo, luisHelper, nextThread = "None") {

        console.log("Start askKursZeit");

        convo.addQuestion({
            text: 'Um wie viel Uhr soll der Kurs am {{vars.kursTag}} stattfinden?',
            quick_replies: [
                {
                    title: 'Morgens (07:00 - 10:00 Uhr)',
                    payload: '07:00 Uhr',
                },
                {
                    title: 'Mittags (10:00 - 13:00 Uhr)',
                    payload: '10:00 Uhr',
                },
                {
                    title: 'Nachmittags (13:00 - 16:00 Uhr)',
                    payload: '13:00 Uhr',
                },
                {
                    title: 'Abends (16:00 - 19:00 Uhr)',
                    payload: '16:00 Uhr',
                },
                {
                    title: 'Nachts (19:00 - 22:00 Uhr)',
                    payload: '19:00 Uhr',
                },
            ]
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
        ], {}, "askKursZeit");

    }
};