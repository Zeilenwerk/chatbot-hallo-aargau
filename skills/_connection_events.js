/* This module kicks in if no Botkit Studio token has been provided */

module.exports = function (controller) {

    const logUtil = require("../util/logUtil");
    const errorUtil = require("../util/errorUtil");

    //*********************************
    // On Bot Start / Resume
    //*********************************
    controller.on('hello', conductOnboarding);
    controller.on('welcome_back', conductOnboarding);
    controller.on('reconnect', conductOnReconnect);

    //*********************************
    // Middleware Error handling
    // Source: https://www.botkit.ai/docs/core.html#middleware-error-events
    //*********************************
    controller.on('ingest_error', function (err, bot, message) {
        //An error happend while processing the message in an ingest middleware.
        logUtil.error(`[ingest_error] There was an error processing your request. Please try again later. Error: ${err.stack}`);

        // bot.reply(message, `There was an error processing your request. Please try again later. Error: ${err.toString()}`);
        errorUtil.displayErrorMessage(bot, message, err, false, false);
    });

    controller.on('normalize_error', function (err, bot, message) {
        //An error happend while processing the message in a normalize middleware.
        logUtil.error(`[normalize_error] There was an error processing your request. Please try again later. Error: ${err.toString()}`);

        // bot.reply(message, `There was an error processing your request. Please try again later. Error: ${err.toString()}`);
        errorUtil.displayErrorMessage(bot, message, err, false, false);
    });

    controller.on('categorize_error', function (err, bot, message) {
        //An error happend while processing the message in a categorize middleware.
        logUtil.error(`[categorize_error] There was an error processing your request. Please try again later. Error: ${err.toString()}`);

        // bot.reply(message, `There was an error processing your request. Please try again later. Error: ${err.toString()}`);
        errorUtil.displayErrorMessage(bot, message, err, false, false);
    });

    controller.on('receive_error', function (err, bot, message, pipeline_stage) {
        //An error happend while processing the message in a receive middleware.
        logUtil.error(`[receive_error] There was an error processing your request. Please try again later. Error: ${err.toString()}`);

        // bot.reply(message, `There was an error processing your request. Please try again later. Error: ${err.toString()}`);
        errorUtil.displayErrorMessage(bot, message, err, false, false);
    });

    //*********************************
    // Conversation Lifecycle Events
    // Source: https://www.botkit.ai/docs/core.html#conversation-lifecycle-events
    //*********************************
    controller.on('conversationStarted', function (bot, convo) {
        //A conversation has started. handler should be in the form of function(bot, convo)
        logUtil.info('A conversation started with ' + convo.context.user);

        //Insert new User to  on cinversation start
        logUtil.addNewUser(convo.context.user, new Date());


    });

    controller.on('conversationEnded', function (bot, convo) {
        //A conversation has ended. handler should be in the form of function(bot, convo)
        logUtil.info('A conversation ended with ' + convo.context.user);
    });

    controller.on('heard-trigger', function (bot, triggers, message) {
        //A trigger defined with controller.hears() was fired. handler should be in the form of function(bot, triggers, message)
        logUtil.info('A trigger defined with controller.hears() was fired: ');
        logUtil.info('Triggers:' + triggers);
        logUtil.info("Message: " + message);
    });

    // controller.on('tick', function () {
    //     //The event loop has ticked. handler does not receive any parameters.
    //     console.log('The event loop has ticked.');
    // });

    //*********************************
    // Error Handling
    //*********************************

    // catch the uncaught errors that weren't wrapped in a domain or try catch statement
    // do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
    process
        .on('unhandledRejection', (reason, p) => {
            const logUtil = require("../util/logUtil");

            logUtil.error('Unhandled Rejection at Promise: ' + JSON.stringify(p) + " Reason: " + JSON.stringify(reason));

            //Does not work yet
            //restartNodeApp(logUtil, "unhandledRejection");
        })
        .on('uncaughtException', err => {
            const logUtil = require("../util/logUtil");

            logUtil.error('Uncaught Exception thrown: ' + err.stack);

            //Does not work yet
            //restartNodeApp(logUtil, "uncaughtException");
        });

    //*********************************
    // Custom Triggers
    //*********************************
    function conductOnboarding(bot, message) {

        const {t} = require('../node_modules/localizify');

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

    function conductOnReconnect(bot, message) {

        const {t} = require('../node_modules/localizify');

        bot.startConversation(message, function (err, convo) {

            convo.say({
                text: t('_connection_events.reconnect'),
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

    //Source: https://stackoverflow.com/questions/10265798/determine-project-root-from-a-running-node-js-application
    function restartNodeApp(logUtil, reason) {
        const exec = require('child_process').exec;
        const path = require('path');

        logUtil.error('Trying to restart app after ' + reason);

        var appDir = path.dirname(require.main.filename);

        // First I create an exec command which is executed before current process is killed
        var cmd = "node " + appDir + '\\luis_bot.js';

        logUtil.info("Restarting App with command '" + cmd + "'");

        // Then I excute the command and kill the app if starting was successful
        exec(cmd, function () {
            logUtil.info('APPLICATION RESTARTED AFTER ' + reason.toUpperCase());
            process.exit();
        });

    }


};
