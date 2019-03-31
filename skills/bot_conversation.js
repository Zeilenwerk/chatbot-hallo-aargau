/* This module kicks in if no Botkit Studio token has been provided */

module.exports = function (controller) {

    //Get LUIS middleware
    var luis = require('../node_modules/botkit-middleware-luis/src/luis-middleware');
    const { t } = require('../node_modules/localizify');

    //*********************************
    // Handle User Intents
    //*********************************

    controller.hears(["Deutschkurs suchen", "Hilfe", "Help", "Informationen zum Aufenthaltsstatus"], 'message_received', luis.middleware.hereIntent, function (bot, message) {

        bot.startConversation(message, function (err, convo) {

            //Log Message and top intent
            console.log("Recieved Message:");
            console.log(message);
            console.log("Top Intent: " + message.topIntent.intent);
            console.log("Score: " + message.topIntent.score);

            //Set Timeout in milliseconds
            // 1 min = 60000
            // 2 min = 120000
            // 3 min = 180000
            // 4 min = 240000
            // 5 min = 300000
            convo.setTimeout(120000);

            //Timeout conversation
            convo.onTimeout(function(convo) {
                convo.say(t('bot_conversation.onTimeout'));
                convo.gotoThread("convoEnd");
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
