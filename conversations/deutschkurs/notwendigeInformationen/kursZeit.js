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
        ]);

    }
};