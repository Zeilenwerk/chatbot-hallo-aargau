module.exports = {
    askKursAltersgruppe: function (bot, message, convo, luisUtil, threadName, nextThread = "None") {

        const kursInformationenAltersgruppeHelper = require('../../../util/helper/kursInformationenAltersgruppeHelper');
        const {t} = require('localizify');
        const logUtil = require("../../../util/logUtil");
        const errorUtil = require("../../../util/errorUtil");
        const dialogUtil = require("../../../util/dialogUtil");

        kursInformationenAltersgruppeHelper.getAltersgruppeFromDB(bot, message, convo, luisUtil, nextThread, function (conversation, rows) {

            logUtil.debug("All Altersgruppe to display in Convo: " + JSON.stringify(rows));

            if (rows.length === 0) {
                conversation.addMessage(t("kurs.kursInformationen.nicht_in_db_gefunden", {item: t("kurs.kursInformationen.altersgruppe.item")}), threadName+"0");
                //conversation.transitionTo(nextThread, t("kurs.kursInformationen.nicht_in_db_gefunden", {item: t("kurs.kursInformationen.altersgruppe.item")}));
            } else {

                let maxQRToDisplay = convo.vars.limitKursAltersgruppe;
                let offset = 0;

                for (let c = 0; c < Math.ceil(rows.length / maxQRToDisplay); c++) {

                    let qr = [];
                    let counter = 0;

                    qr.push({title: t("kurs.kursInformationen.keine_angabe"), payload: t("kurs.kursInformationen.keine_angabe")});

                    //Add a max of "limitKursAltersgruppe" QR to the Question
                    for (let i = offset; i < rows.length; i++) {
                        if (counter < maxQRToDisplay) {
                            let oRow = rows[i];
                            if (oRow.wert != null && oRow.wert !== "") {
                                qr.push({title: oRow.wert, payload: oRow.wert})
                            }
                        }
                        counter++;
                    }

                    //Updated offset
                    offset += maxQRToDisplay;

                    //If navigated to display more, offer button to go back
                    if (c >= 1) {
                        qr.push({title: t("kurs.kursInformationen.zurück"), payload: t("kurs.kursInformationen.zurück")})
                    }

                    //If there are more than "maxQRToDisplay" elements, offer to display more.
                    if (counter >= maxQRToDisplay) {
                        qr.push({
                            title: t("kurs.kursInformationen.mehr_elemente_anzeigen", {item: t("kurs.kursInformationen.altersgruppe.item")}),
                            payload: t("kurs.kursInformationen.mehr_elemente_anzeigen", {item: t("kurs.kursInformationen.altersgruppe.item")})
                        })
                    }

                    conversation.addQuestion({
                        text: t("kurs.kursInformationen.altersgruppe.altersgruppe_angeben"),
                        quick_replies: qr,
                        disable_input: true
                    }, [
                        {
                            default: true,
                            callback: function (res, conversation) {

                                try {

                                    if (res.text === t("kurs.kursInformationen.mehr_elemente_anzeigen", {item: t("kurs.kursInformationen.altersgruppe.item")})) {

                                        //Go to thread with next options
                                        conversation.gotoThread(threadName + (c + 1));

                                    } else if (res.text === t("kurs.kursInformationen.zurück")) {

                                        //Go to thread with previous options
                                        conversation.gotoThread(threadName + (c - 1));

                                    } else if (res.text === t("kurs.kursInformationen.keine_angabe")) {

                                        //Set var in convo --> used afterwards to get search results form db
                                        conversation.setVar("kursInformationenAltersgruppe", t("kurs.kursInformationen.keine_angabe"));

                                        //continue to next thread
                                        if (nextThread !== "None") {
                                            conversation.gotoThread(nextThread);
                                        } else {
                                            conversation.next();
                                        }

                                    } else {

                                        let aEntity = luisUtil.getEntityFromLuisResponse("kursInformationenAltersgruppe", res);

                                        if (aEntity === null || aEntity === undefined || aEntity.length === 0 || aEntity === "") {
                                            // array empty or does not exist
                                            conversation.transitionTo(threadName+"0", t('nicht_verstanden'));
                                        } else {

                                            //Set var in convo --> used afterwards to get search results form db
                                            conversation.setVar("kursInformationenAltersgruppe", aEntity[0]);

                                            //Reset offset
                                            logUtil.debug("kursInformationenAltersgruppe = " + convo.vars.kursInformationenAltersgruppe);

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

                                    }

                                } catch (err) {
                                    errorUtil.displayErrorMessage(bot, message, err, false, false);
                                }

                            }
                        }
                    ], {}, threadName + c);

                }

            }
        });

    }

};
