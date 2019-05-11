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
    convoKursAnbieter: function (bot, message, convo, luisUtil, nextThread = "None") {

        const { t } = require('localizify');
        const logUtil = require("../../../../util/logUtil");
        const errorUtil = require("../../../../util/errorUtil");

        logUtil.debug("Start askKursAnbieter");

        //Get All Anbieter from Config and add as Quick Replies
        var anbieter = process.env.KURS_ANBIETER.split(",");
        var anbieter_payload = process.env.KURS_ANBIETER_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < anbieter.length; i++) {
            qr.push({title: anbieter[i], payload: anbieter_payload[i]})
        }

        convo.addQuestion({
            text: t('kurs.kursInformationen.kursAnbieter.convoKursAnbieter'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try{
                        let aEntity = luisUtil.getEntityFromLuisResponse("kursAnbieter", res);

                        if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                            // array empty or does not exist
                            convo.addMessage(t('nicht_verstanden'));
                            convo.repeat();
                        } else {
                            convo.setVar("kursAnbieter", aEntity[0]);
                            logUtil.debug("kursAnbieter = " + convo.vars.kursAnbieter);
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
        ], {}, "askKursAnbieter");

    }
};