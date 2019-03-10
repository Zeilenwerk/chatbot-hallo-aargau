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
    askKursZeit: function (convo, nextThread = "None") {

        console.log("Start askKursZeit");

        convo.addQuestion({
            text: 'Um wie viel Uhr soll der Kurs am {{vars.kursTag}} stattfinden?',
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    const luisHelper = require("../../util/helperLUIS");

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursZeit", res);

                    if (!aEntity || aEntity.length === 0) {
                        // array empty or does not exist
                        //TODO: Handle not found entity
                        convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                        convo.repeat();
                    } else {
                        convo.setVar("kursZeit", aEntity[0]);
                        console.log("KursZeit = " + convo.vars.kursZeit);
                    }

                    convo.addMessage('Super, somit {{vars.kursTag}} um {{vars.kursZeit}} Uhr');

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }

                    convo.next();
                }
            }
        ], {}, "askKursZeit");

    }
}