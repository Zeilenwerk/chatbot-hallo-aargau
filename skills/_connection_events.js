/* This module kicks in if no Botkit Studio token has been provided */

module.exports = function (controller) {

    const dbLogHelper = require("../util/logHelper");
    const timeUtil = require("../util/timeUtil");
    const { t } = require('../node_modules/localizify');

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

        //Insert new User to  on cinversation start
        dbLogHelper.addNewUser(convo.context.user, new Date());


    });

    controller.on('conversationEnded', function (bot, convo) {
        //A conversation has ended. handler should be in the form of function(bot, convo)
        console.log('A conversation ended with ', convo.context.user);
        console.log('\t-> Text: ', convo.context.text);
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
                text: t('_connection_events.onboarding'),
                quick_replies: [
                    {
                        title: t('_connection_events.onboarding_Deutschkurs'),
                        payload: t('_connection_events.onboarding_Deutschkurs'),
                    },
                    {
                        title: t('_connection_events.onboarding_Aufenthaltsstatus'),
                        payload: t('_connection_events.onboarding_Aufenthaltsstatus'),
                    },
                    {
                        title: t('_connection_events.onboarding_Hilfe'),
                        payload: t('_connection_events.onboarding_Hilfe'),
                    },
                ]
            });


        });

    }


};
