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

        console.log("Start askKursAdressatengruppe");

        convo.addQuestion({
            text:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe'),
            quick_replies: [
                {
                    title:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe_Qr_Frauen'),
                    payload:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe_Qr_Frauen_Payload'),
                },
                {
                    title:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe_Qr_Erwachsene'),
                    payload:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe_Qr_Erwachsene_Payload'),
                },

                {
                    title:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe_Qr_Muttersprache'),
                    payload:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe_Qr_Muttersprache_Payload'),
                },
                {
                    title:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe_Qr_A1'),
                    payload:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe_Qr_A1_Payload'),
                },
                {
                    title:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe_Qr_A2'),
                    payload:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe_Qr_A2_Payload'),
                },
                {
                    title:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe_Qr_B1'),
                    payload:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe_Qr_B1_Payload'),
                },
                {
                    title:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe_Qr_B2'),
                    payload:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe_Qr_B2_Payload'),
                },
                {
                    title:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe_Qr_C1'),
                    payload:  t('kurs.zusaetzlicheInformationen.kursAdressatengruppe.convoKursAdressatengruppe_Qr_C1_Payload'),
                },

            ]
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
                        console.log("kursAdressatengruppe = " + convo.vars.kursAdressatengruppe);
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