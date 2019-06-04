module.exports = {
    askKursKosten: function (bot, message, convo, luisUtil, threadName, nextThread = "None") {

        const {t} = require('localizify');
        const logUtil = require("../../../util/logUtil");
        const errorUtil = require("../../../util/errorUtil");
        const dialogUtil = require("../../../util/dialogUtil");

        let qr = [];

        qr.push({title: t("kurs.kursInformationen.keine_angabe"), payload: t("kurs.kursInformationen.keine_angabe")});
        qr.push({title: t("kurs.kursInformationen.kosten.subventionierter"), payload: t("kurs.kursInformationen.kosten.subventionierter_Payload")});
        qr.push({title: t("kurs.kursInformationen.kosten.unter_500"), payload: t("kurs.kursInformationen.kosten.unter_500_Payload")});
        qr.push({title: t("kurs.kursInformationen.kosten.bis_1000"), payload: t("kurs.kursInformationen.kosten.bis_1000_Payload")});
        qr.push({title: t("kurs.kursInformationen.kosten.mehr_als_1000"), payload: t("kurs.kursInformationen.kosten.mehr_als_1000_Payload")});

        convo.addQuestion({
            text: t("kurs.kursInformationen.kosten.kosten_angeben"),
            quick_replies: qr,
            disable_input: true
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try {

                        let ok = false;

                        switch(res.text){
                            case t("kurs.kursInformationen.kosten.subventionierter_Payload"):
                                convo.setVar("kursInformationenKosten", t("kurs.kursInformationen.kosten.subventionierter_Payload"));
                                ok = true;
                                break;
                            case t("kurs.kursInformationen.kosten.unter_500_Payload"):
                                convo.setVar("kursInformationenKosten", t("kurs.kursInformationen.kosten.unter_500_Payload"));
                                ok = true;
                                break;
                            case t("kurs.kursInformationen.kosten.bis_1000_Payload"):
                                convo.setVar("kursInformationenKosten", t("kurs.kursInformationen.kosten.bis_1000_Payload"));
                                ok = true;
                                break;
                            case t("kurs.kursInformationen.kosten.mehr_als_1000_Payload"):
                                convo.setVar("kursInformationenKosten", t("kurs.kursInformationen.kosten.mehr_als_1000_Payload"));
                                ok = true;
                                break;
                            case t("kurs.kursInformationen.keine_angabe"):
                                //Set var in convo --> used afterwards to get search results form db
                                convo.setVar("kursInformationenKosten", t("kurs.kursInformationen.keine_angabe"));
                                ok = true;
                                break;
                            default:
                                convo.addMessage(t('nicht_verstanden'));
                                convo.repeat();
                                break;
                        }

                        if (ok){
                            //continue to next thread
                            dialogUtil.kursMenuDialog_NoLUIS(conversation);

                            //continue to next thread
                            if (nextThread !== "None") {
                                if (nextThread === "kursSuchen_Menu") {
                                    conversation.transitionTo(nextThread, convo.vars.kursSuchenMenu);
                                }else{
                                    conversation.gotoThread(nextThread);
                                }
                            } else {
                                conversation.next();
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

