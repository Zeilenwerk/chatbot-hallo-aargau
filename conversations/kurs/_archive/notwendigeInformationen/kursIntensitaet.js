/*Funktion für die Anfrage der Intensität des Kurses
*
* Adressatengruppe:
* -> QR -> Wochenkurs
* -> QR -> Intensivkurs
*
* Benutzerantwort wird in die Convo variable "kursIntensitaet" gespeichert
*
* @param convo -> Conversation die am laufen ist
*
* */
module.exports = {
    askKursIntensitaet: function (bot, message, convo, luisUtil, nextThread = "None") {

        const pgUtil = require("../../../../util/pgUtil");

        pgUtil.getDB();

        const { t } = require('localizify');
        const logUtil = require("../../../../util/logUtil");
        const errorUtil = require("../../../../util/errorUtil");

        console.log("Start askKursIntensitaet");

        //Get All Intensitaet from Config and add as Quick Replies
        var intensitaet = process.env.KURS_INTENSITAET.split(",");
        var intensitaet_payload = process.env.KURS_INTENSITAET_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < intensitaet.length; i++) {
            qr.push({title: intensitaet[i], payload: intensitaet_payload[i]})
        }

        convo.ask({
            text: t('kurs.kursInformationen.kursIntensitaet.convoKursIntensitaet'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try{
                        let aEntity = luisUtil. getEntityFromLuisResponse("kursIntensitaet", res);

                        if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                            // array empty or does not exist
                            convo.addMessage(t('nicht_verstanden'));
                            convo.repeat();
                        } else {
                            convo.setVar("kursIntensitaet", aEntity[0]);
                            logUtil.debug("kursIntensitaet = " + convo.vars.kursIntensitaet);
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
        ]);

    },

    convoKursIntensitaet: function (bot, message, convo, luisUtil, nextThread = "None") {

        const { t } = require('localizify');
        const logUtil = require("../../../../util/logUtil");
        const errorUtil = require("../../../../util/errorUtil");

        console.log("Start askKursIntensitaet");

        //Get All Intensitaet from Config and add as Quick Replies
        var intensitaet = process.env.KURS_INTENSITAET.split(",");
        var intensitaet_payload = process.env.KURS_INTENSITAET_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < intensitaet.length; i++) {
            qr.push({title: intensitaet[i], payload: intensitaet_payload[i]})
        }

        convo.addQuestion({
            text: t('kurs.kursInformationen.kursIntensitaet.convoKursIntensitaet'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try{
                        let aEntity = luisUtil. getEntityFromLuisResponse("kursIntensitaet", res);

                        if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                            // array empty or does not exist
                            convo.addMessage(t('nicht_verstanden'));
                            convo.repeat();
                        } else {
                            convo.setVar("kursIntensitaet", aEntity[0]);
                            logUtil.debug("kursIntensitaet = " + convo.vars.kursIntensitaet);
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
        ], {}, "askKursIntensitaet");

    }
};