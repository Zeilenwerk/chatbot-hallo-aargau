module.exports = {
    askPersonSprache: function (bot, message, convo, luisUtil, threadName, nextThread = "None") {

        const personSpracheHelper = require('../../../util/helper/personSpracheHelper');
        const {t} = require('localizify');
        const logUtil = require("../../../util/logUtil");
        const errorUtil = require("../../../util/errorUtil");

        personSpracheHelper.getSparchenFromDB(bot, message, convo, luisUtil, nextThread, function (conversation, rows) {

            logUtil.debug("All Sprache to display in Convo: " + JSON.stringify(rows));

            if (rows.length === 0) {
                conversation.addMessage(t("kurs.person.nicht_in_db_gefunden", {item: t("kurs.person.sprache.item")}), threadName + "0");
                // conversation.transitionTo(nextThread, t("kurs.person.nicht_in_db_gefunden", {item: t("kurs.person.sprache.item")}));
            } else {

                let maxQRToDisplay = convo.vars.limitPersonSprache;
                let offset = 0;

                for (let c = 0; c < Math.ceil(rows.length / maxQRToDisplay); c++) {


                    let qr = [];
                    let counter = 0;

                    qr.push({title: t("kurs.person.keine_angabe"), payload: t("kurs.person.keine_angabe")});

                    //Add a max of "limitPersonSprache" QR to the Question
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
                        qr.push({title: t("kurs.person.zurück"), payload: t("kurs.person.zurück")})
                    }

                    //If there are more than "maxQRToDisplay" elements, offer to display more.
                    if (counter >= maxQRToDisplay) {
                        qr.push({
                            title: t("kurs.person.mehr_elemente_anzeigen", {item: t("kurs.person.sprache.item")}),
                            payload: t("kurs.person.mehr_elemente_anzeigen", {item: t("kurs.person.sprache.item")})
                        })
                    }

                    conversation.addQuestion({
                        text: t("kurs.person.sprache.sprache_angeben"),
                        quick_replies: qr
                    }, [
                        {
                            default: true,
                            callback: function (res, conversation) {

                                try {

                                    if (res.text === t("kurs.person.mehr_elemente_anzeigen", {item: t("kurs.person.sprache.item")})) {

                                        //Go to thread with next options
                                        conversation.gotoThread(threadName + (c + 1));

                                    } else if (res.text === t("kurs.person.zurück")) {

                                        //Go to thread with previous options
                                        conversation.gotoThread(threadName + (c - 1));

                                    } else if (res.text === t("kurs.person.keine_angabe")) {

                                        //Set var in convo --> used afterwards to get search results form db
                                        conversation.setVar("personSprache", "None");

                                        //continue to next thread
                                        if (nextThread !== "None") {
                                            conversation.gotoThread(nextThread);
                                        } else {
                                            conversation.next();
                                        }

                                    } else {

                                        let aEntity = luisUtil.getEntityFromLuisResponse("personSprache", res);

                                        if (aEntity === null || aEntity === undefined || aEntity.length === 0 || aEntity === "") {
                                            // array empty or does not exist
                                            conversation.transitionTo(threadName, t('nicht_verstanden'));
                                        } else {

                                            //Set var in convo --> used afterwards to get search results form db
                                            conversation.setVar("personSprache", aEntity[0]);

                                            //Reset offset
                                            logUtil.debug("personSprache = " + convo.vars.personSprache);

                                            //continue to next thread
                                            if (nextThread !== "None") {
                                                conversation.gotoThread(nextThread);
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
