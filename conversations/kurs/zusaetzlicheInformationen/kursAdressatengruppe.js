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
    convoKursAdressatengruppe: function (convo, luisHelper, nextThread = "None") {

        const { t } = require('../../../node_modules/localizify');
        const logHelper = require("../../../util/logHelper");

        logHelper.debug("Start askKursAdressatengruppe");

        //Get All Adressatengruppen from Config and add as Quick Replies
        var adressatengruppen = process.env.KURS_ADRESSATENGRUPPEN.split(",");
        var adressatengruppen_payload = process.env.KURS_ADRESSATENGRUPPEN_PAYLOAD.split(",");
        var qr = [];
        for (let i = 0; i < adressatengruppen.length; i++) {
            qr.push({title: adressatengruppen[i], payload: adressatengruppen_payload[i]})
        }

        convo.addQuestion({
            text:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe'),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper. getEntityFromLuisResponse("kursAdressatengruppe", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursAdressatengruppe", aEntity[0]);
                        logHelper.debug("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }else{
                        convo.next();
                    }


                }
            }
        ], {},"askKursAdressatengruppe");

    }
};