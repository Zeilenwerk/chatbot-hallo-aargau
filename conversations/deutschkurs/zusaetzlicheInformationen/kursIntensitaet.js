/*Funktion für die Anfrage der Intensität des Kurses
*
* Adressatengruppe:
* -> QR -> Wochenkurs
* -> QR -> Intensivkurs
*
* Benutzerantwort wird in die Convo variable "kursIntensitaet" gespeichert
*
* @param convo -> Conversation die am laufen ist
*
* */
module.exports = {
    convoKursIntensitaet: function (convo, luisHelper, nextThread = "None") {

        console.log("Start askKursIntensitaet");

        convo.addQuestion({
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

                    let aEntity = luisHelper. getEntityFromLuisResponse("kursIntensitaet", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
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
        ], {}, "askKursIntensitaet");

    }
};