/*Funktion für die Anfrage der Adressatengruppe des Kurses
*
* Adressatengruppe:
* -> QR -> Frauen
* -> QR -> Erwachsene
* -> QR -> Erwachsene deutscher Muttersprache
* -> QR -> Niveau A1 abgschlossen
* -> QR -> Niveau A2 abgschlossen
* -> QR -> Niveau B1 abgschlossen
* -> QR -> Niveau B2 abgschlossen
* -> QR -> Niveau C1 abgschlossen
*
* Benutzerantwort wird in die Convo variable "kursAdressatengruppe" gespeichert
*
* @param convo -> Conversation die am laufen ist
*
* */
module.exports = {
    convoKursAdressatengruppe: function (convo, luisHelper, nextThread = "None") {

        console.log("Start askKursAdressatengruppe");

        convo.addQuestion({
            text: 'Für welches Adressatengruppe soll der Kurs sein?',
            quick_replies: [
                {
                    title: 'Frauen',
                    payload: 'Frauen',
                },
                {
                    title: 'Erwachsene',
                    payload: 'Erwachsene',
                },

                {
                    title: 'Erwachsene deutscher Muttersprache',
                    payload: 'Erwachsene deutscher Muttersprache oder gute mündliche Deutschkenntnisse',
                },
                {
                    title: 'Niveau A1 abgschlossen',
                    payload: 'Abgeschlossene Niveau A1 oder im Einstufungstest Niveau A2 erreicht',
                },
                {
                    title: 'Niveau A2 abgschlossen',
                    payload: 'Erwachsene mit abgeschlossene Niveaustufe A2 oder im Einstufungstest Niveaustufe B1 erreicht',
                },
                {
                    title: 'Niveau B1 abgschlossen',
                    payload: 'Erwachsene mit abgeschlossene Niveaustufe B1 oder im Einstufungstest Niveaustufe B2 erreicht',
                },
                {
                    title: 'Niveau B2 abgschlossen',
                    payload: 'Erwachsene im Einstufungstest Niveaustufe B2 erreicht',
                },
                {
                    title: 'Niveau C1 abgschlossen',
                    payload: 'Erwachsene mit abgeschlossene Niveaustufe C1 oder im Einstufungstest Niveaustufe C2 erreicht',
                },

            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper. getEntityFromLuisResponse("kursAdressatengruppe", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        //TODO: Handle not found entity
                        convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                        convo.repeat();
                    } else {
                        convo.setVar("kursAdressatengruppe", aEntity[0]);
                        console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }else{
                        convo.next();
                    }


                }
            }
        ], {},"askKursAdressatengruppe");

    }
};