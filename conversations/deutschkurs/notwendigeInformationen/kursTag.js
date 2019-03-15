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
module.exports = {
    askKursTag: function (convo, luisHelper, nextThread = "None") {

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
};