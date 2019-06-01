/* This module kicks in if no Botkit Studio token has been provided */

module.exports = function (controller) {

    //Get LUIS middleware
    var luis = require('../node_modules/botkit-middleware-luis/src/luis-middleware');
    const { t } = require('../node_modules/localizify');
    const logUtil = require("../util/logUtil");

    //*********************************
    // Handle User Intents
    //*********************************

    controller.hears(["Deutschkurs suchen", "Hilfe", "Help", t('_connection_events.onboarding_Deutschkurs')], 'message_received', luis.middleware.hereIntent, function (bot, message) {

        bot.startConversation(message, function (err, convo) {

            //Log Message and top intent
            logUtil.info("Recieved Message: " + message.text);
            logUtil.debug(JSON.stringify(message));
            logUtil.info("Top Intent: " + message.topIntent.intent);
            logUtil.info("Score: " + message.topIntent.score);

            //Set Timeout in milliseconds
            // 1 min = 60000
            // 2 min = 120000
            // 3 min = 180000
            // 4 min = 240000
            // 5 min = 300000
            convo.setTimeout(120000);

            //Timeout conversation
            convo.onTimeout(function(convo) {
                bot.reply(message, t('bot_conversation.onTimeout', {timeout: "2 Minuten inaktiv"}));
                end.convoQuit(convo, message, bot);
            });

            //End conversation
            const end = require('../conversations/end/convoEnd');
            end.convoEnd(convo, message, bot);

            //Help Thread
            const help = require('../conversations/help/help');
            help.help(convo, message, bot, controller);

            //Fedback
            const feedback = require('../conversations/feedback/userFeedback');
            feedback.askFeedback(convo, message, bot);

            //Deutschkurs
            const deutschkurs = require('../conversations/kurs/kurs');

            if (message.topIntent.intent === "Deutschkurs Suchen") {
                deutschkurs.kursSuchen(convo, message, bot);
            } else if (message.topIntent.intent === "Help") {
                convo.gotoThread("help");
            } else if (message.topIntent.intent === "Hallo") {
                convo.gotoThread("helpMenu");
            } else {
                bot.reply(message, t('bot_conversation.nicht_implementiert'));
                convo.gotoThread("convoEnd");
            }

        });

    });

};
