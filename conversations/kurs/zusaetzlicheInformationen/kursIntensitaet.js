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

        const { t } = require('../../../node_modules/localizify');
        const logHelper = require("../../../util/logHelper");


        console.log("Start askKursIntensitaet");

        convo.addQuestion({
            text: t('kurs.zusaetzlicheInformationen.kursIntensitaet.convoKursIntensitaet'),
            quick_replies: [
                {
                    title: t('kurs.zusaetzlicheInformationen.kursIntensitaet.convoKursIntensitaet_Qr_Wochenkurs'),
                    payload: t('kurs.zusaetzlicheInformationen.kursIntensitaet.convoKursIntensitaet_Qr_Wochenkurs'),
                },
                {
                    title: t('kurs.zusaetzlicheInformationen.kursIntensitaet.convoKursIntensitaet_Qr_Intensivkurs'),
                    payload: t('kurs.zusaetzlicheInformationen.kursIntensitaet.convoKursIntensitaet_Qr_Intensivkurs'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper. getEntityFromLuisResponse("kursIntensitaet", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursIntensitaet", aEntity[0]);
                        logHelper.debug("kursIntensitaet = " + convo.vars.kursIntensitaet);
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