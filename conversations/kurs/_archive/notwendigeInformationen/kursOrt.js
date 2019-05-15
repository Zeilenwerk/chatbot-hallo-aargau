/*Funktion für die Anfrage des Kurortes
    *
    * TODO: Get Kurs Orte von Datenquelle mit allen Verfügbaren Orten
    *
    * @param convo -> Conversation die am laufen ist
    *
    * */
module.exports = {
    askKursOrt: function (bot, message, convo, luisUtil, nextThread = "None") {

        const { t } = require('localizify');
        const logUtil = require("../../../../util/logUtil");
        const errorUtil = require("../../../../util/errorUtil");

        //Get All Orte from Config and add as Quick Replies
        var orte = process.env.KURS_ORTE.split(",");
        var orte_payload = process.env.KURS_ORTE_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < orte.length; i++) {
            qr.push({title: orte[i], payload: orte_payload[i]})
        }

        logUtil.debug("Start askKursOrt");

        // set up a menu thread which other threads can point at.
        convo.ask({
            text:  t('kurs.kursInformationen.kursOrt.askKursOrt'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try{
                        let aEntity = luisUtil.getEntityFromLuisResponse("kursOrt", res);

                        if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                            convo.addMessage(t('nicht_verstanden'));
                            convo.repeat();
                        } else {
                            convo.setVar("kursOrt", aEntity[0]);
                            logUtil.debug("kursOrt = " + convo.vars.kursOrt);

                            // convo.setVar("kursBezirk", aEntity[1]);
                            // logUtil.debug("kursBezirk = " + convo.vars.kursBezirk);
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
        ]);

    },

    convoKursOrt: function (bot, message, convo, luisUtil, nextThread = "None") {

        const { t } = require('localizify');
        const logUtil = require("../../../../util/logUtil");
        const errorUtil = require("../../../../util/errorUtil");

        logUtil.debug("Start askKursOrt");

        //Get All Orte from Config and add as Quick Replies
        var orte = process.env.KURS_ORTE.split(",");
        var orte_payload = process.env.KURS_ORTE_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < orte.length; i++) {
            qr.push({title: orte[i], payload: orte_payload[i]})
        }

        // set up a menu thread which other threads can point at.
        convo.addQuestion({
            text:  t('kurs.kursInformationen.kursOrt.askKursOrt'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try{
                        let aEntity = luisUtil.getEntityFromLuisResponse("kursOrt", res);

                        if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                            // array empty or does not exist
                            convo.addMessage(t('nicht_verstanden'));
                            convo.repeat();
                        } else {
                            convo.setVar("kursOrt", aEntity[0]);
                            logUtil.debug("kursOrt = " + convo.vars.kursOrt);

                            // convo.setVar("kursBezirk", aEntity[1]);
                            // logUtil.debug("kursBezirk = " + convo.vars.kursBezirk);
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
        ], {}, "askKursOrt");

    }
};
