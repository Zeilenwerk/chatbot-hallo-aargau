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
    askKursIntensitaet: function (convo, luisHelper, nextThread = "None") {

        const { t } = require('localizify');
        const logHelper = require("../../../util/logHelper");

        console.log("Start askKursIntensitaet");

        //Get All Intensitaet from Config and add as Quick Replies
        var intensitaet = process.env.KURS_INTENSITAET.split(",");
        var intensitaet_payload = process.env.KURS_INTENSITAET_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < intensitaet.length; i++) {
            qr.push({title: intensitaet[i], payload: intensitaet_payload[i]})
        }

        convo.ask({
            text: t('kurs.notwendigeInformationen.kursIntensitaet.convoKursIntensitaet'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper. getEntityFromLuisResponse("kursIntensitaet", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursIntensitaet", aEntity[0]);
                        logHelper.debug("kursIntensitaet = " + convo.vars.kursIntensitaet);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }else{
                        convo.next();
                    }


                }
            }
        ]);

    },

    convoKursIntensitaet: function (convo, luisHelper, nextThread = "None") {

        const { t } = require('localizify');
        const logHelper = require("../../../util/logHelper");

        console.log("Start askKursIntensitaet");

        //Get All Intensitaet from Config and add as Quick Replies
        var intensitaet = process.env.KURS_INTENSITAET.split(",");
        var intensitaet_payload = process.env.KURS_INTENSITAET_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < intensitaet.length; i++) {
            qr.push({title: intensitaet[i], payload: intensitaet_payload[i]})
        }

        convo.addQuestion({
            text: t('kurs.notwendigeInformationen.kursIntensitaet.convoKursIntensitaet'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper. getEntityFromLuisResponse("kursIntensitaet", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursIntensitaet", aEntity[0]);
                        logHelper.debug("kursIntensitaet = " + convo.vars.kursIntensitaet);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }else{
                        convo.next();
                    }


                }
            }
        ], {}, "askKursIntensitaet");

    }
};