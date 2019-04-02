/*Funktion für die Anfrage des Kurortes
    *
    * TODO: Get Kurs Orte von Datenquelle mit allen Verfügbaren Orten
    *
    * @param convo -> Conversation die am laufen ist
    *
    * */
module.exports = {
    askKursOrt: function (convo, luisHelper, nextThread = "None") {

        const { t } = require('../../../node_modules/localizify');
        const logHelper = require("../../../util/logHelper");

        //Get All Orte from Config and add as Quick Replies
        var orte = process.env.KURS_ORTE.split(",");
        var orte_payload = process.env.KURS_ORTE_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < orte.length; i++) {
            qr.push({title: orte[i], payload: orte_payload[i]})
        }

        logHelper.debug("Start askKursOrt");

        // set up a menu thread which other threads can point at.
        convo.ask({
            text:  t('kurs.notwendigeInformationen.kursOrt.askKursOrt'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursOrt", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursBezirk", aEntity[0]);
                        logHelper.debug("kursBezirk = " + convo.vars.kursBezirk);

                        convo.setVar("kursOrt", aEntity[1]);
                        logHelper.debug("kursOrt = " + convo.vars.kursOrt);
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

    convoKursOrt: function (convo, luisHelper, nextThread = "None") {

        const { t } = require('../../../node_modules/localizify');
        const logHelper = require("../../../util/logHelper");

        logHelper.debug("Start askKursOrt");

        //Get All Orte from Config and add as Quick Replies
        var orte = process.env.KURS_ORTE.split(",");
        var orte_payload = process.env.KURS_ORTE_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < orte.length; i++) {
            qr.push({title: orte[i], payload: orte_payload[i]})
        }

        // set up a menu thread which other threads can point at.
        convo.addQuestion({
            text:  t('kurs.notwendigeInformationen.kursOrt.askKursOrt'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursOrt", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursOrt", aEntity[0]);
                        logHelper.debug("kursOrt = " + convo.vars.kursOrt);

                        convo.setVar("kursBezirk", aEntity[1]);
                        logHelper.debug("kursBezirk = " + convo.vars.kursBezirk);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    } else {
                        convo.next();
                    }
                }
            }
        ], {}, "askKursOrt");

    }
};
