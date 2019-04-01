/*Funktion für die Anfrage des Kurs Niveau
    *
    * Kurs Niveau:
    * -> QR -> Für Personen mit Kenntnis der lateinischen Schrift
    * -> QR -> Kurs für Anfänger
    * -> QR -> A1
    * -> QR -> A2
    * -> QR -> B1
    * -> QR -> B2 (Business)
    * -> QR -> C1
    * -> QR -> C2
    *
    * Benutzerantwort wird in die Convo variable "kursNiveau" gespeichert
    *
    * @param convo -> Conversation die am laufen ist
    *
    * */

module.exports = {
    askKursNiveau: function (convo, luisHelper, nextThread = "None") {

        const { t } = require('../../../node_modules/localizify');
        const logHelper = require("../../../util/logHelper");

        logHelper.debug("Start askKursNiveau");

        //Get All Niveau from Config and add as Quick Replies
        var niveau = process.env.KURS_NIVEAU.split(",");
        var niveau_payload = process.env.KURS_NIVEAU_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < niveau.length; i++) {
            qr.push({title: niveau[i], payload: niveau_payload[i]})
        }

        convo.ask({
            text: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursNiveau", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursNiveau", aEntity[0]);
                        logHelper.debug("kursNiveau = " + convo.vars.kursNiveau);
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

    convoKursNiveau: function (convo, luisHelper, nextThread = "None") {

        const { t } = require('../../../node_modules/localizify');
        const logHelper = require("../../../util/logHelper");

        logHelper.debug("Start askKursNiveau");

        //Get All Niveau from Config and add as Quick Replies
        var niveau = process.env.KURS_NIVEAU.split(",");
        var niveau_payload = process.env.KURS_NIVEAU_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < niveau.length; i++) {
            qr.push({title: niveau[i], payload: niveau_payload[i]})
        }

        convo.addQuestion({
            text: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursNiveau", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursNiveau", aEntity[0]);
                        logHelper.debug("kursNiveau = " + convo.vars.kursNiveau);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    } else {
                        convo.next();
                    }
                }
            }
        ], {}, "askKursNiveau");

    }
};