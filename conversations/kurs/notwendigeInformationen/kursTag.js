/*Funktion für die Anfrage des Kurs Tag
   *
   * Tage:
   * -> QR -> Montag
   * -> QR -> Dinestag
   * -> QR -> Mittwoch
   * -> QR -> Donnerstag
   * -> QR -> Freitag
   * -> QR -> Samstag
   * -> QR -> Sonntag
   *
   * Benutzerantwort wird in die Convo variable "kursTag" gespeichert
   *
   * @param convo -> Conversation die am laufen ist
   *
   * */
module.exports = {
    askKursTag: function (convo, luisHelper, nextThread = "None") {

        const { t } = require('../../../node_modules/localizify');
        const logHelper = require("../../../util/logHelper");

        logHelper.debug("Start askKursTag");

        //Get All Tage from Config and add as Quick Replies
        var tag = process.env.KURS_TAG.split(",");
        var tag_payload = process.env.KURS_TAG_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < tag.length; i++) {
            qr.push({title: tag[i], payload: tag_payload[i]})
        }

        convo.ask({
            text: t('kurs.notwendigeInformationen.kursTag.askKursTag'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursTag", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursTag", aEntity[0]);
                        logHelper.debug("kursTag = " + convo.vars.kursTag);
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

    convoKursTag: function (convo, luisHelper, nextThread = "None") {

        const { t } = require('../../../node_modules/localizify');
        const logHelper = require("../../../util/logHelper");

        logHelper.debug("Start askKursTag");

        //Get All Tage from Config and add as Quick Replies
        var tag = process.env.KURS_TAG.split(",");
        var tag_payload = process.env.KURS_TAG_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < tag.length; i++) {
            qr.push({title: tag[i], payload: tag_payload[i]})
        }

        convo.addQuestion({
            text: t('kurs.notwendigeInformationen.kursTag.askKursTag'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursTag", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursTag", aEntity[0]);
                        logHelper.debug("kursTag = " + convo.vars.kursTag);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    } else {
                        convo.next();
                    }

                }
            }
        ], {}, "askKursTag");

    }
};