module.exports = {

    askFeedback: function (convo, message, bot) {

        const {t} = require('../../node_modules/localizify');
        const logUtil = require("../../util/logUtil");
        const errorUtil = require("../../util/errorUtil");

        logUtil.debug("Start askFeedback");

        convo.addQuestion({
            text: t('feedback.askFeedback'),
            quick_replies: [
                {
                    title: t('feedback.askFeedback_Qr_1'),
                    payload: t('feedback.askFeedback_Qr_1_Payload'),
                },
                {
                    title: t('feedback.askFeedback_Qr_2'),
                    payload: t('feedback.askFeedback_Qr_2_Payload'),
                },
                {
                    title: t('feedback.askFeedback_Qr_3'),
                    payload: t('feedback.askFeedback_Qr_3_Payload'),
                },
                {
                    title: t('feedback.askFeedback_Qr_4'),
                    payload: t('feedback.askFeedback_Qr_4_Payload'),
                },
                {
                    title: t('feedback.askFeedback_Qr_5'),
                    payload: t('feedback.askFeedback_Qr_5_Payload'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try {
                        const dbFeedbackHelper = require("../../util/feedbackUtil");
                        let rating = "0";

                        //reset all conversatino variables
                        let aVars = ["kursOrt", "kursBezirk", "kursZeit", "kursTag", "kursTagUndZeit", "kursDatum", "kursIntensitaet", "kursAnbieter", "kursNiveau", "kursSprache", "kursAdressatengruppe", "kursKosten", "kursZweck"];
                        for (let x = 0; x < aVars.length; x++) {
                            convo.setVar(aVars[x], "None");
                        }
                        convo.setVar("offsetKurse", 0);

                        switch (res.text) {

                            case t('feedback.askFeedback_Qr_1_Payload'):
                                rating = "5";
                                convo.transitionTo('convoEnd', t('feedback.askFeedback_Transition_1'));
                                break;
                            case t('feedback.askFeedback_Qr_2_Payload'):
                                rating = "4";
                                convo.transitionTo('convoEnd', t('feedback.askFeedback_Transition_2'));
                                break;
                            case t('feedback.askFeedback_Qr_3_Payload'):
                                rating = "3";
                                convo.transitionTo('convoEnd', t('feedback.askFeedback_Transition_3'));
                                break;
                            case t('feedback.askFeedback_Qr_4_Payload'):
                                rating = "2";
                                convo.transitionTo('convoEnd', t('feedback.askFeedback_Transition_4'));
                                break;
                            case t('feedback.askFeedback_Qr_5_Payload'):
                                rating = "1";
                                convo.transitionTo('convoEnd', t('feedback.askFeedback_Transition_5'));
                                break;
                            default:
                                convo.addMessage(t('nicht_verstanden'));
                                convo.repeat();
                                break;
                        }

                        dbFeedbackHelper.addNewFeedback(bot, message, convo, message.user, new Date(), rating, "");
                    } catch (err) {
                        errorUtil.displayErrorMessage(bot, message, err, false, false)
                    }
                }
            }
        ], {}, "askFeedback");

    }

};
