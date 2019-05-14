module.exports = {
    askPersonGeschlecht: function (bot, message, convo, luisUtil, threadName, nextThread = "None") {

        const personGeschlechtHelper = require('../../../util/helper/personGeschlechtHelper');
        const {t} = require('localizify');
        const logUtil = require("../../../util/logUtil");
        const errorUtil = require("../../../util/errorUtil");

        personGeschlechtHelper.getGeschlechtFromDB(bot, message, convo, luisUtil, nextThread, function (conversation, rows) {

            logUtil.debug("All Geschlecht to display in Convo: " + JSON.stringify(rows));

            if (rows.length === 0) {
                conversation.addMessage(t("person.nicht_in_db_gefunden", {item: t("person.geschlecht.item")}), threadName + "0");
                // conversation.transitionTo(nextThread, t("person.nicht_in_db_gefunden", {item: t("person.geschlecht.item")}));
            } else {

                let maxQRToDisplay = convo.vars.limitPersonGeschlecht;
                let offset = 0;

                for (let c = 0; c < Math.ceil(rows.length / maxQRToDisplay); c++) {


                    let qr = [];
                    let counter = 0;

                    qr.push({title: t("person.keine_angabe"), payload: t("person.keine_angabe")});

                    //Add a max of "limitPersonGeschlecht" QR to the Question
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
                        qr.push({title: t("person.zurück"), payload: t("person.zurück")})
                    }

                    //If there are more than "maxQRToDisplay" elements, offer to display more.
                    if (counter >= maxQRToDisplay) {
                        qr.push({
                            title: t("person.mehr_elemente_anzeigen", {item: t("person.geschlecht.item")}),
                            payload: t("person.mehr_elemente_anzeigen", {item: t("person.geschlecht.item")})
                        })
                    }

                    conversation.addQuestion({
                        text: t("person.geschlecht.geschlecht_angeben"),
                        quick_replies: qr
                    }, [
                        {
                            default: true,
                            callback: function (res, conversation) {

                                try {

                                    if (res.text === t("person.mehr_elemente_anzeigen", {item: t("person.geschlecht.item")})) {

                                        //Go to thread with next options
                                        conversation.gotoThread(threadName + (c + 1));

                                    } else if (res.text === t("person.zurück")) {

                                        //Go to thread with previous options
                                        conversation.gotoThread(threadName + (c - 1));

                                    } else if (res.text === t("person.keine_angabe")) {

                                        //Set var in convo --> used afterwards to get search results form db
                                        conversation.setVar("personGeschlecht", t("kurs.kursInformationen.keine_angabe"));

                                        //continue to next thread
                                        if (nextThread !== "None") {
                                            conversation.gotoThread(nextThread);
                                        } else {
                                            conversation.next();
                                        }

                                    } else {

                                        let aEntity = luisUtil.getEntityFromLuisResponse("personGeschlecht", res);

                                        if (aEntity === null || aEntity === undefined || aEntity.length === 0 || aEntity === "") {
                                            // array empty or does not exist
                                            conversation.transitionTo(threadName+"0", t('nicht_verstanden'));
                                        } else {

                                            //Set var in convo --> used afterwards to get search results form db
                                            conversation.setVar("personGeschlecht", aEntity[0]);

                                            //Reset offset
                                            logUtil.debug("personGeschlecht = " + convo.vars.personGeschlecht);

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
