/*Funktion für die Anfrage der Kurszeit
    *
    * Kurszeit wird mittels text extraktion aus der Antwort des benutzers gewonnen
    * TODO: Muss noch überarbeitet werde (Quick & Dirty & Fehleranfällig)
    *
    * Benutzerantwort wird in die Convo variable "kursZeit" gespeichert
    *
    * @param convo -> Conversation die am laufen ist
    *
    * */
module.exports = {
    askKursZeit: function (convo, luisHelper, nextThread = "None") {

        const { t } = require('../../../node_modules/localizify');
        const logHelper = require("../../../util/logHelper");

        logHelper.debug("Start askKursZeit");

        convo.ask({
            text: t('kurs.notwendigeInformationen.kursZeit.askKursZeit', {kursTag : "{{vars.kursTag}}"}),
            quick_replies: [
                {
                    title:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Morgens'),
                    payload:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Morgens_Payload'),
                },
                {
                    title:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Mittags'),
                    payload:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Mittags_Payload'),
                },
                {
                    title:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Nachmittags'),
                    payload:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Nachmittags_Payload'),
                },
                {
                    title:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Abends'),
                    payload:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Abends_Payload'),
                },
                {
                    title:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Nachts'),
                    payload:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Nachts_Payload'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursZeit", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        //Get entity for zeit, not resolution (regex pattern)
                        convo.setVar("kursZeit", aEntity[1]);
                        logHelper.debug("KursZeit = " + convo.vars.kursZeit);
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

    convoKursZeit: function (convo, luisHelper, nextThread = "None") {

        const { t } = require('../../../node_modules/localizify');
        const logHelper = require("../../../util/logHelper");


        logHelper.debug("Start askKursZeit");

        convo.addQuestion({
            //text: t('kurs.notwendigeInformationen.kursZeit.askKursZeit', {kursTag : "{{vars.kursTag}}"}),
            text: t('kurs.notwendigeInformationen.kursZeit.askKursZeit', {kursTag : ""}),
            quick_replies: [
                {
                    title:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Morgens'),
                    payload:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Morgens_Payload'),
                },
                {
                    title:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Mittags'),
                    payload:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Mittags_Payload'),
                },
                {
                    title:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Nachmittags'),
                    payload:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Nachmittags_Payload'),
                },
                {
                    title:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Abends'),
                    payload:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Abends_Payload'),
                },
                {
                    title:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Nachts'),
                    payload:  t('kurs.notwendigeInformationen.kursZeit.askKursZeit_Nachts_Payload'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursZeit", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursZeit", aEntity[0]);
                        logHelper.debug("KursZeit = " + convo.vars.kursZeit);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    } else {
                        convo.next();
                    }
                }
            }
        ], {}, "askKursZeit");

    }
};