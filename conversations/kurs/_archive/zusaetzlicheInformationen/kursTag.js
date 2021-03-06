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

    convoKursTag: function (bot, message, convo, luisUtil, nextThread = "None") {

        const { t } = require('localizify');
        const logUtil = require("../../../../util/logUtil");

        logUtil.debug("Start askKursTag");

        //Get All Tage from Config and add as Quick Replies
        var tag = process.env.KURS_TAG.split(",");
        var tag_payload = process.env.KURS_TAG_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < tag.length; i++) {
            qr.push({title: tag[i], payload: tag_payload[i]})
        }

        convo.addQuestion({
            text: t('kurs.kursInformationen.kursTag.askKursTag'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try{
                        let aEntity = luisUtil.getEntityFromLuisResponse("kursTag", res);

                        if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                            // array empty or does not exist
                            convo.addMessage(t('nicht_verstanden'));
                            convo.repeat();
                        } else {
                            convo.setVar("kursTag", aEntity[0]);
                            logUtil.debug("kursTag = " + convo.vars.kursTag);
                        }

                        if (nextThread !== "None") {
                            convo.gotoThread(nextThread);
                        } else {
                            convo.next();
                        }
                    }catch(err){
                        errorUtil.displayErrorMessage(bot, message, err, false, false);
                    }

                }
            }
        ], {}, "askKursTag");

    }
};