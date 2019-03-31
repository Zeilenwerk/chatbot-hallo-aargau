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

        console.log("Start askKursNiveau");

        convo.ask({
            text: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau'),
            quick_replies: [
                {
                    title: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_Anfaenger'),
                    payload: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_Anfaenger'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_Schrift'),
                    payload: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_Schrift'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_A1'),
                    payload: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_A1'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_A2'),
                    payload: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_A2'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_B1'),
                    payload: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_B1'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_B2'),
                    payload: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_B2'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_C1'),
                    payload: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_C1'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_C2'),
                    payload: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_C2'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    console.log("kursNiveau Callback");

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursNiveau", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursNiveau", aEntity[0]);
                        console.log("kursNiveau = " + convo.vars.kursNiveau);
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

        console.log("Start askKursNiveau");

        convo.addQuestion({
            text: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau'),
            quick_replies: [
                {
                    title: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_Anfaenger'),
                    payload: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_Anfaenger'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_Schrift'),
                    payload: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_Schrift'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_A1'),
                    payload: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_A1'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_A2'),
                    payload: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_A2'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_B1'),
                    payload: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_B1'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_B2'),
                    payload: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_B2'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_C1'),
                    payload: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_C1'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_C2'),
                    payload: t('kurs.notwendigeInformationen.kursNiveau.askKursNiveau_Qr_C2'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    console.log("kursNiveau Callback");

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursNiveau", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursNiveau", aEntity[0]);
                        console.log("kursNiveau = " + convo.vars.kursNiveau);
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