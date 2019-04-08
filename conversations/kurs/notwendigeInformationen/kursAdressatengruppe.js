/*Funktion für die Anfrage der Adressatengruppe des Kurses
*
* Adressatengruppe:
* -> QR -> Frauen
* -> QR -> Erwachsene
* -> QR -> Erwachsene deutscher Muttersprache
* -> QR -> Niveau A1 abgschlossen
* -> QR -> Niveau A2 abgschlossen
* -> QR -> Niveau B1 abgschlossen
* -> QR -> Niveau B2 abgschlossen
* -> QR -> Niveau C1 abgschlossen
*
* Benutzerantwort wird in die Convo variable "kursAdressatengruppe" gespeichert
*
* @param convo -> Conversation die am laufen ist
*
* */
module.exports = {
    askKursAdressatengruppe: function (bot, message, convo, luisUtil, nextThread = "None") {

        const {t} = require('localizify');
        const logUtil = require("../../../util/logUtil");
        const errorUtil = require("../../../util/errorUtil");

        logUtil.debug("Start askKursAdressatengruppe");

        //Get All Adressatengruppen from Config and add as Quick Replies
        var adressatengruppen = process.env.KURS_ADRESSATENGRUPPEN.split(",");
        var adressatengruppen_payload = process.env.KURS_ADRESSATENGRUPPEN_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < adressatengruppen.length; i++) {
            qr.push({title: adressatengruppen[i], payload: adressatengruppen_payload[i]})
        }

        convo.ask({
            text: t('kurs.notwendigeInformationen.kursAdressatengruppe.convoKursAdressatengruppe'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try{
                        let aEntity = luisUtil.getEntityFromLuisResponse("kursAdressatengruppe", res);

                        if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                            // array empty or does not exist
                            convo.addMessage(t('nicht_verstanden'));
                            convo.repeat();
                        } else {
                            convo.setVar("kursAdressatengruppe", aEntity[0]);
                            logUtil.debug("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                        }

                        if (nextThread !== "None") {
                            convo.gotoThread(nextThread);
                        } else {
                            convo.next();
                        }
                    }catch(err){
                        errorUtil.displayErrorMessage(bot, message, err, false, false) ;
                    }

                }
            }
        ]);

    },

    convoKursAdressatengruppe: function (bot, message, convo, luisUtil, nextThread = "None") {

        const {t} = require('localizify');
        const logUtil = require("../../../util/logUtil");
        const errorUtil = require("../../../util/errorUtil");

        logUtil.debug("Start askKursAdressatengruppe");

        //Get All Adressatengruppen from Config and add as Quick Replies
        var adressatengruppen = process.env.KURS_ADRESSATENGRUPPEN.split(",");
        var adressatengruppen_payload = process.env.KURS_ADRESSATENGRUPPEN_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < adressatengruppen.length; i++) {
            qr.push({title: adressatengruppen[i], payload: adressatengruppen_payload[i]})
        }

        convo.addQuestion({
            text: t('kurs.notwendigeInformationen.kursAdressatengruppe.convoKursAdressatengruppe'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try {
                        let aEntity = luisUtil.getEntityFromLuisResponse("kursAdressatengruppe", res);

                        if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                            // array empty or does not exist
                            convo.addMessage(t('nicht_verstanden'));
                            convo.repeat();
                        } else {
                            convo.setVar("kursAdressatengruppe", aEntity[0]);
                            logUtil.debug("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                        }

                        if (nextThread !== "None") {
                            convo.gotoThread(nextThread);
                        } else {
                            convo.next();
                        }

                    } catch (err) {
                        errorUtil.displayErrorMessage(bot, message, err, false, false);
                    }

                }
            }
        ], {}, "askKursAdressatengruppe");

    }
};