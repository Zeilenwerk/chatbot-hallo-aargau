module.exports = {
    askPersonKind: function (bot, message, convo, luisUtil, threadName, nextThread = "None") {

        const {t} = require('localizify');
        const logUtil = require("../../../util/logUtil");
        const errorUtil = require("../../../util/errorUtil");
        const dialogUtil = require("../../../util/dialogUtil");

        let qr = [];

        qr.push({title: t("person.keine_angabe"), payload: t("person.keine_angabe")});
        qr.push({title: t("person.kinder.kinder_ja"), payload: t("person.kinder.kinder_ja")});
        qr.push({title: t("person.kinder.kinder_nein"), payload: t("person.kinder.kinder_nein")});

        convo.addQuestion({
            text: t("person.kinder.kinder_angeben"),
            quick_replies: qr,
            disable_input: true
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try {

                        let ok = false;

                        switch(res.text){
                            case t("person.keine_angabe"):
                                //Set var in convo --> used afterwards to get search results form db
                                convo.setVar("personKind", t("kurs.kursInformationen.keine_angabe"));
                                ok = true;
                                break;
                            case t("person.kinder.kinder_ja"):
                                //Set var in convo --> used afterwards to get search results form db
                                convo.setVar("personKind", "true");
                                ok = true;
                                break;
                            case t("person.kinder.kinder_nein"):
                                //Set var in convo --> used afterwards to get search results form db
                                convo.setVar("personKind", "false");
                                ok = true;
                                break;
                            default:
                                convo.addMessage(t('nicht_verstanden'));
                                convo.repeat();
                                break;

                        }

                        if(ok){
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
        ], {}, threadName + "0");

    }
};

