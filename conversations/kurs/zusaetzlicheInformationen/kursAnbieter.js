/*Funktion für die Anfrage des Kurs Anbieter
*
* Kurs Anbieter:
* -> QR -> Nosotras Aargau
* -> QR -> Verein Lesen und Schreiben für Erwachsene
* -> QR -> TLC Baden
*
* Benutzerantwort wird in die Convo variable "kursAnbieter" gespeichert
*
* @param convo -> Conversation die am laufen ist
*
* */
module.exports = {
    convoKursAnbieter: function (convo, luisHelper, nextThread = "None") {

        const { t } = require('../../../node_modules/localizify');
        const logHelper = require("../../../util/logHelper");


        logHelper.debug("Start askKursAnbieter");

        convo.addQuestion({
            text: t('kurs.zusaetzlicheInformationen.kursAnbieter.convoKursAnbieter'),
            quick_replies: [
                {
                    title: t('kurs.zusaetzlicheInformationen.kursAnbieter.convoKursAnbieter_Qr_Nosotras'),
                    payload: t('kurs.zusaetzlicheInformationen.kursAnbieter.convoKursAnbieter_Qr_Nosotras'),
                },
                {
                    title: t('kurs.zusaetzlicheInformationen.kursAnbieter.convoKursAnbieter_Qr_Verein'),
                    payload: t('kurs.zusaetzlicheInformationen.kursAnbieter.convoKursAnbieter_Qr_Verein'),
                },
                {
                    title: t('kurs.zusaetzlicheInformationen.kursAnbieter.convoKursAnbieter_Qr_Tlc'),
                    payload: t('kurs.zusaetzlicheInformationen.kursAnbieter.convoKursAnbieter_Qr_Tlc'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursAnbieter", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursAnbieter", aEntity[0]);
                        logHelper.debug("kursAnbieter = " + convo.vars.kursAnbieter);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }else{
                        convo.next();
                    }


                }
            }
        ], {}, "askKursAnbieter");

    }
};