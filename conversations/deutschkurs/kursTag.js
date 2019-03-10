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
    askKursTag: function (convo, nextThread = "None") {

        console.log("Start askKursTag");

        convo.addQuestion({
            text: "An welchem Tag soll der Kurs in {{kursOrt}} ({{kursBezirk}}) stattfinden?",
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

                    //Import Helper Class to get Entites from LUIS Response
                    const luisHelper = require("../../util/helperLUIS");

                    let aEntity = luisHelper.getEntityFromLuisResponse("kurTag", res);

                    if (aEntity === undefined || aEntity.length === 0) {
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
                    }

                    convo.next();
                }
            }
        ], {}, "askKursTag");

    }
}