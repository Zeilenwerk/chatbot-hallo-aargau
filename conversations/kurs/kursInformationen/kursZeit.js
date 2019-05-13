module.exports = {
    askKursZeit: function (bot, message, convo, luisUtil, threadName, nextThread = "None") {

        const {t} = require('localizify');
        const logUtil = require("../../../util/logUtil");
        const errorUtil = require("../../../util/errorUtil");

        let qr = [];

        qr.push({title: t("kurs.kursInformationen.keine_angabe"), payload: t("kurs.kursInformationen.keine_angabe")});
        qr.push({title: t("kurs.kursInformationen.zeit.morgens"), payload: t("kurs.kursInformationen.zeit.morgens_Payload")});
        qr.push({title: t("kurs.kursInformationen.zeit.mittags"), payload: t("kurs.kursInformationen.zeit.mittags_Payload")});
        qr.push({title: t("kurs.kursInformationen.zeit.nachmittags"), payload: t("kurs.kursInformationen.zeit.nachmittags_Payload")});
        qr.push({title: t("kurs.kursInformationen.zeit.abends"), payload: t("kurs.kursInformationen.zeit.abends_Payload")});
        qr.push({title: t("kurs.kursInformationen.zeit.nachts"), payload: t("kurs.kursInformationen.zeit.nachts_Payload")});

        convo.addQuestion({
            text: t("kurs.kursInformationen.zeit.zeit_angeben"),
            quick_replies: qr
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try {

                        let ok = false;

                        switch(res.text){
                            case t("kurs.kursInformationen.zeit.morgens_Payload"):
                                convo.setVar("kursInformationenZeit", t("kurs.kursInformationen.zeit.morgens_Payload"));
                                ok = true;
                                break;
                            case t("kurs.kursInformationen.zeit.mittags_Payload"):
                                convo.setVar("kursInformationenZeit", t("kurs.kursInformationen.zeit.mittags_Payload"));
                                ok = true;
                                break;
                            case t("kurs.kursInformationen.zeit.nachmittags_Payload"):
                                convo.setVar("kursInformationenZeit", t("kurs.kursInformationen.zeit.nachmittags_Payload"));
                                ok = true;
                                break;
                            case t("kurs.kursInformationen.zeit.abends_Payload"):
                                convo.setVar("kursInformationenZeit", t("kurs.kursInformationen.zeit.abends_Payload"));
                                ok = true;
                                break;
                            case t("kurs.kursInformationen.zeit.nachts_Payload"):
                                convo.setVar("kursInformationenZeit", t("kurs.kursInformationen.zeit.nachts_Payload"));
                                ok = true;
                                break;
                            case t("kurs.kursInformationen.keine_angabe"):
                                //Set var in convo --> used afterwards to get search results form db
                                convo.setVar("kursInformationenZeit", "None");
                                ok = true;
                                break;
                            default:
                                convo.addMessage(t('nicht_verstanden'));
                                convo.repeat();
                                break;
                        }

                        if (ok){
                            //continue to next thread
                            if (nextThread !== "None") {
                                convo.gotoThread(nextThread);
                            } else {
                                convo.next();
                            }
                        }


                    } catch (err) {
                        errorUtil.displayErrorMessage(bot, message, err, false, false);
                    }

                }
            }
        ], {}, threadName  + "0");

    }
};

