/* This module kicks in if no Botkit Studio token has been provided */

module.exports = function (controller) {

    //Get LUIS middleware
    var luis = require('../node_modules/botkit-middleware-luis/src/luis-middleware');

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
                convo.say('Leider ist das Zeitlimit überschirtten worden. Diese Sitzung wird beendet.');
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
            const deutschkurs = require('../conversations/deutschkurs/deutschkurse');

            if (message.topIntent.intent === "Deutschkurs Suchen") {
                deutschkurs.deutschkursSuchen(convo, message, bot);
            } else if (message.topIntent.intent === "Help") {
                convo.gotoThread("help");
            } else {
                bot.reply(message, "Leider noch nicht implementiert");
                convo.gotoThread("convoEnd");
            }

        });

    });

    //*********************************
    // On Bot Start / Resume
    //*********************************
    controller.on('hello', conductOnboarding);
    controller.on('welcome_back', conductOnboarding);

    //*********************************
    // Middleware Error handling
    // Source: https://www.botkit.ai/docs/core.html#middleware-error-events
    //*********************************
    controller.on('ingest_error', function (err, bot, message) {
        //An error happend while processing the message in an ingest middleware.
        bot.reply(message, `There was an error processing your request. Please try again later. Error: ${err.toString()}`);
    });

    controller.on('normalize_error', function (err, bot, message) {
        //An error happend while processing the message in a normalize middleware.
        bot.reply(message, `There was an error processing your request. Please try again later. Error: ${err.toString()}`);
    });

    controller.on('categorize_error', function (err, bot, message) {
        //An error happend while processing the message in a categorize middleware.
        bot.reply(message, `There was an error processing your request. Please try again later. Error: ${err.toString()}`);
    });

    controller.on('receive_error', function (err, bot, message) {
        //An error happend while processing the message in a receive middleware.
        bot.reply(message, `There was an error processing your request. Please try again later. Error: ${err.toString()}`);
    });

    //*********************************
    // Conversation Lifecycle Events
    // Source: https://www.botkit.ai/docs/core.html#conversation-lifecycle-events
    //*********************************
    controller.on('conversationStarted', function (bot, convo) {
        //A conversation has started. handler should be in the form of function(bot, convo)
        console.log('A conversation started with ', convo.context.user);
    });

    controller.on('conversationEnded', function (bot, convo) {
        //A conversation has ended. handler should be in the form of function(bot, convo)
        console.log('A conversation ended with ', convo.context.user);
        console.log('\t-> Text: ', convo.context.text);
        // console.log('\t-> Top Intent: ', convo.context.message.topIntent.intent);
        // console.log('\t-> Intent Score: ', convo.context.message.topIntent.score);
    });

    controller.on('heard-trigger', function (bot, triggers, message) {
        //A trigger defined with controller.hears() was fired. handler should be in the form of function(bot, triggers, message)
        console.log('A trigger defined with controller.hears() was fired: ', triggers , message);
    });

    // controller.on('tick', function () {
    //     //The event loop has ticked. handler does not receive any parameters.
    //     console.log('The event loop has ticked.');
    // });

    //*********************************
    // Custom Triggers
    //*********************************
    function conductOnboarding(bot, message) {

        bot.startConversation(message, function (err, convo) {

            convo.say({
                text: 'Guten Tag! Wie kann ich Ihenen helfen?',
                quick_replies: [
                    {
                        title: 'Deutschkurs suchen',
                        payload: 'Deutschkurs suchen',
                    },
                    {
                        title: 'Informationen zum Aufenthaltsstatus',
                        payload: 'Informationen zum Aufenthaltsstatus',
                    },
                    {
                        title: 'Hilfe',
                        payload: 'Hilfe',
                    },
                ]
            });


        });

    }


};
