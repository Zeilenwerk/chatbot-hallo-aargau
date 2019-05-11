/*Funktion für die Anfrage des Kurs Zweck
    *
    * Kurs Zweck:
    * -> QR -> Für Personen mit Kenntnis der lateinischen Schrift
    * -> QR -> Kurs für Anfänger
    * -> QR -> A1
    * -> QR -> A2
    * -> QR -> B1
    * -> QR -> B2 (Business)
    * -> QR -> C1
    * -> QR -> C2
    *
    * Benutzerantwort wird in die Convo variable "kursZweck" gespeichert
    *
    * @param convo -> Conversation die am laufen ist
    *
    * */

module.exports = {
    askKursZweck: function (bot, message, convo, luisUtil, nextThread = "None") {

        const { t } = require('localizify');
        const logUtil = require("../../../../util/logUtil");
        const errorUtil = require("../../../../util/errorUtil");

        logUtil.debug("Start askKursZweck");

        //Get All Zweck from Config and add as Quick Replies
        var niveau = process.env.KURS_ZWECK.split(",");
        var niveau_payload = process.env.KURS_ZWECK_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < niveau.length; i++) {
            qr.push({title: niveau[i], payload: niveau_payload[i]})
        }

        convo.ask({
            text: t('kurs.kursInformationen.kursZweck.askKursZweck'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisUtil.getEntityFromLuisResponse("kursZweck", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursZweck", aEntity[0]);
                        logUtil.debug("kursZweck = " + convo.vars.kursZweck);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    } else {
                        convo.next();
                    }
                }
            }
        ]);

    },

    convoKursZweck: function (bot, message, convo, luisUtil, nextThread = "None") {

        const { t } = require('localizify');
        const logUtil = require("../../../../util/logUtil");
        const errorUtil = require("../../../../util/errorUtil");

        logUtil.debug("Start askKursZweck");

        //Get All Zweck from Config and add as Quick Replies
        var niveau = process.env.KURS_ZWECK.split(",");
        var niveau_payload = process.env.KURS_ZWECK_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < niveau.length; i++) {
            qr.push({title: niveau[i], payload: niveau_payload[i]})
        }

        convo.addQuestion({
            text: t('kurs.kursInformationen.kursZweck.askKursZweck'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisUtil.getEntityFromLuisResponse("kursZweck", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursZweck", aEntity[0]);
                        logUtil.debug("kursZweck = " + convo.vars.kursZweck);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    } else {
                        convo.next();
                    }
                }
            }
        ], {}, "askKursZweck");

    }
};