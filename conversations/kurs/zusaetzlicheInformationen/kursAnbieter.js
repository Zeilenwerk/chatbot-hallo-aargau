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

        //Get All Anbieter from Config and add as Quick Replies
        var anbieter = process.env.KURS_ANBIETER.split(",");
        var anbieter_payload = process.env.KURS_ANBIETER_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < anbieter.length; i++) {
            qr.push({title: anbieter[i], payload: anbieter_payload[i]})
        }

        convo.addQuestion({
            text: t('kurs.zusaetzlicheInformationen.kursAnbieter.convoKursAnbieter'),
            quick_replies: qr
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