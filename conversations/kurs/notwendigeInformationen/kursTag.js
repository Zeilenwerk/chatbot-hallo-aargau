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
    askKursTag: function (convo, luisHelper, nextThread = "None") {

        const { t } = require('../../../node_modules/localizify');
        const logHelper = require("../../../util/logHelper");


        logHelper.debug("Start askKursTag");

        convo.ask({
            text: t('kurs.notwendigeInformationen.kursTag.askKursTag'),
            quick_replies: [
                {
                    title: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Montag'),
                    payload: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Montag'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Dienstag'),
                    payload: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Dienstag'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Mittwoch'),
                    payload: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Mittwoch'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Donnerstag'),
                    payload: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Donnerstag'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Freitag'),
                    payload: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Freitag'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Samstag'),
                    payload: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Samstag'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Sonntag'),
                    payload: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Sonntag'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursTag", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursTag", aEntity[0]);
                        logHelper.debug("kursTag = " + convo.vars.kursTag);
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

    convoKursTag: function (convo, luisHelper, nextThread = "None") {

        const { t } = require('../../../node_modules/localizify');
        const logHelper = require("../../../util/logHelper");


        logHelper.debug("Start askKursTag");

        convo.addQuestion({
            text: t('kurs.notwendigeInformationen.kursTag.askKursTag'),
            quick_replies: [
                {
                    title: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Montag'),
                    payload: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Montag'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Dienstag'),
                    payload: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Dienstag'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Mittwoch'),
                    payload: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Mittwoch'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Donnerstag'),
                    payload: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Donnerstag'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Freitag'),
                    payload: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Freitag'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Samstag'),
                    payload: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Samstag'),
                },
                {
                    title: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Sonntag'),
                    payload: t('kurs.notwendigeInformationen.kursTag.askKursTag_Qr_Sonntag'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper.getEntityFromLuisResponse("kursTag", res);

                    if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        convo.addMessage(t('nicht_verstanden'));
                        convo.repeat();
                    } else {
                        convo.setVar("kursTag", aEntity[0]);
                        logHelper.debug("kursTag = " + convo.vars.kursTag);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    } else {
                        convo.next();
                    }

                }
            }
        ], {}, "askKursTag");

    }
};