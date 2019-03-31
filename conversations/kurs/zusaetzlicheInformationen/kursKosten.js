/*Funktion für die Anfrage des Kurs Kosten
*
* Kurs Kosten:
* -> QR -> Nosotras Aargau
* -> QR -> Verein Lesen und Schreiben für Erwachsene
* -> QR -> TLC Baden
*
* Benutzerantwort wird in die Convo variable "kursKosten" gespeichert
*
* @param convo -> Conversation die am laufen ist
*
* */
module.exports = {
    convoKursKosten: function (convo, luisHelper, nextThread = "None") {

        const { t } = require('../../../node_modules/localizify');
        const logHelper = require("../../../util/logHelper");


        logHelper.debug("Start askKursKosten");

        convo.addQuestion({
            text: t('kurs.zusaetzlicheInformationen.kursKosten.convoKursAdressatengruppe_Qr_C1'),
            quick_replies: [
                {
                    title: t('kurs.zusaetzlicheInformationen.kursKosten.convoKursKosten_Qr_Subventionierter'),
                    payload: t('kurs.zusaetzlicheInformationen.kursKosten.convoKursKosten_Qr_Subventionierter'),
                },
                {
                    title: t('kurs.zusaetzlicheInformationen.kursKosten.convoKursKosten_Qr_500'),
                    payload: t('kurs.zusaetzlicheInformationen.kursKosten.convoKursKosten_Qr_500'),
                },
                {
                    title: t('kurs.zusaetzlicheInformationen.kursKosten.convoKursKosten_Qr_1000'),
                    payload: t('kurs.zusaetzlicheInformationen.kursKosten.convoKursKosten_Qr_1000'),
                },
                {
                    title: t('kurs.zusaetzlicheInformationen.kursKosten.convoKursKosten_Qr_1000plus'),
                    payload: t('kurs.zusaetzlicheInformationen.kursKosten.convoKursKosten_Qr_1000plus'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper. getEntityFromLuisResponse("kursKosten", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursKosten", aEntity[0]);
                        logHelper.debug("kursKosten = " + convo.vars.kursKosten);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }else{
                        convo.next();
                    }


                }
            }
        ], {}, "askKursKosten");

    }
};