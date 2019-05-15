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
    convoKursKosten: function (bot, message, convo, luisUtil, nextThread = "None") {

        const { t } = require('localizify');
        const logUtil = require("../../../../util/logUtil");
        const errorUtil = require("../../../../util/errorUtil");


        logUtil.debug("Start askKursKosten");

        convo.addQuestion({
            text: t('kurs.kursInformationen.kursKosten.convoKursKosten'),
            quick_replies: [
                {
                    title: t('kurs.kursInformationen.kursKosten.convoKursKosten_Qr_Subventionierter'),
                    payload: t('kurs.kursInformationen.kursKosten.convoKursKosten_Qr_Subventionierter'),
                },
                {
                    title: t('kurs.kursInformationen.kursKosten.convoKursKosten_Qr_500'),
                    payload: t('kurs.kursInformationen.kursKosten.convoKursKosten_Qr_500'),
                },
                {
                    title: t('kurs.kursInformationen.kursKosten.convoKursKosten_Qr_1000'),
                    payload: t('kurs.kursInformationen.kursKosten.convoKursKosten_Qr_1000'),
                },
                {
                    title: t('kurs.kursInformationen.kursKosten.convoKursKosten_Qr_1000plus'),
                    payload: t('kurs.kursInformationen.kursKosten.convoKursKosten_Qr_1000plus'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try{
                        let aEntity = luisUtil. getEntityFromLuisResponse("kursKosten", res);

                        if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                            // array empty or does not exist
                            convo.addMessage(t('nicht_verstanden'));
                            convo.repeat();
                        } else {
                            convo.setVar("kursKosten", aEntity[0]);
                            logUtil.debug("kursKosten = " + convo.vars.kursKosten);
                        }

                        if (nextThread !== "None") {
                            convo.gotoThread(nextThread);
                        }else{
                            convo.next();
                        }
                    }catch(err){
                        errorUtil.displayErrorMessage(bot, message, err, false, false);
                    }




                }
            }
        ], {}, "askKursKosten");

    }
};