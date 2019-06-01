module.exports = {
    askKursTag: function (bot, message, convo, luisUtil, threadName, nextThread = "None") {

        const {t} = require('localizify');
        const logUtil = require("../../../util/logUtil");
        const errorUtil = require("../../../util/errorUtil");
        const dialogUtil = require("../../../util/dialogUtil");

        let qr = [];

        qr.push({title: t("kurs.kursInformationen.keine_angabe"), payload: t("kurs.kursInformationen.keine_angabe")});
        qr.push({title: t("kurs.kursInformationen.tag.montag"), payload: t("kurs.kursInformationen.tag.montag")});
        qr.push({title: t("kurs.kursInformationen.tag.dienstag"), payload: t("kurs.kursInformationen.tag.dienstag")});
        qr.push({title: t("kurs.kursInformationen.tag.mittwoch"), payload: t("kurs.kursInformationen.tag.mittwoch")});
        qr.push({title: t("kurs.kursInformationen.tag.donnerstag"), payload: t("kurs.kursInformationen.tag.donnerstag")});
        qr.push({title: t("kurs.kursInformationen.tag.freitag"), payload: t("kurs.kursInformationen.tag.freitag")});
        qr.push({title: t("kurs.kursInformationen.tag.samstag"), payload: t("kurs.kursInformationen.tag.samstag")});
        qr.push({title: t("kurs.kursInformationen.tag.sonntag"), payload: t("kurs.kursInformationen.tag.sonntag")});

        convo.addQuestion({
            text: t("kurs.kursInformationen.tag.tag_angeben"),
            quick_replies: qr,
            disable_input: true
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try {

                        let ok = false;

                        switch(res.text){
                            case t("kurs.kursInformationen.tag.montag"):
                                convo.setVar("kursInformationenTag", t("kurs.kursInformationen.tag.montag"));
                                ok = true;
                                break;
                            case t("kurs.kursInformationen.tag.dienstag"):
                                convo.setVar("kursInformationenTag", t("kurs.kursInformationen.tag.dienstag"));
                                ok = true;
                                break;
                            case t("kurs.kursInformationen.tag.mittwoch"):
                                convo.setVar("kursInformationenTag", t("kurs.kursInformationen.tag.mittwoch"));
                                ok = true;
                                break;
                            case t("kurs.kursInformationen.tag.donnerstag"):
                                convo.setVar("kursInformationenTag", t("kurs.kursInformationen.tag.donnerstag"));
                                ok = true;
                                break;
                            case t("kurs.kursInformationen.tag.freitag"):
                                convo.setVar("kursInformationenTag", t("kurs.kursInformationen.tag.freitag"));
                                ok = true;
                                break;
                            case t("kurs.kursInformationen.tag.samstag"):
                                convo.setVar("kursInformationenTag", t("kurs.kursInformationen.tag.samstag"));
                                ok = true;
                                break;
                            case t("kurs.kursInformationen.tag.sonntag"):
                                convo.setVar("kursInformationenTag", t("kurs.kursInformationen.tag.sonntag"));
                                ok = true;
                                break;
                            case t("kurs.kursInformationen.keine_angabe"):
                                //Set var in convo --> used afterwards to get search results form db
                                convo.setVar("kursInformationenTag", t("kurs.kursInformationen.keine_angabe"));
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

