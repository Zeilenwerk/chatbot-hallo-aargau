/* This module kicks in if no Botkit Studio token has been provided */

module.exports = function (controller) {

    //Get LUIS middleware
    var luis = require('../node_modules/botkit-middleware-luis/src/luis-middleware');

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
    // Can be trigger like so: bot.trigger('help_request', [bot, message]);
    controller.on('help_request', function(bot, message) {
        bot.reply(message,'I am here to help!');
    });

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
                ]
            });


        });

    }

    // controller.hears(['help', 'contact', 'documentation', 'docs', 'community'], 'message_received', luis.middleware.hereIntent, function (bot, message) {
    //
    //     bot.startConversation(message, function (err, convo) {
    //
    //         // set up a menu thread which other threads can point at.
    //         convo.ask({
    //             text: 'I can point you to resources, and connect you with experts who can help.',
    //             quick_replies: [
    //                 {
    //                     title: 'Read the Docs',
    //                     payload: 'documentation',
    //                 },
    //                 {
    //                     title: 'Join the Community',
    //                     payload: 'community',
    //                 },
    //                 {
    //                     title: 'Expert Help',
    //                     payload: 'contact us',
    //                 },
    //             ]
    //         }, [
    //             {
    //                 pattern: 'documentation',
    //                 callback: function (res, convo) {
    //                     convo.gotoThread('docs');
    //                     convo.next();
    //                 }
    //             },
    //             {
    //                 pattern: 'community',
    //                 callback: function (res, convo) {
    //                     convo.gotoThread('community');
    //                     convo.next();
    //                 }
    //             },
    //             {
    //                 pattern: 'contact',
    //                 callback: function (res, convo) {
    //                     convo.gotoThread('contact');
    //                     convo.next();
    //                 }
    //             },
    //             {
    //                 default: true,
    //                 callback: function (res, convo) {
    //                     convo.gotoThread('end');
    //                 }
    //             }
    //         ]);
    //
    //         // set up docs threads
    //         convo.addMessage({
    //             text: 'I do not know how to help with that. Say `help` at any time to access this menu.'
    //         }, 'end');
    //
    //         // set up docs threads
    //         convo.addMessage({
    //             text: 'Botkit is extensively documented! Here are some useful links:\n\n[Botkit Studio Help Desk](https://botkit.groovehq.com/help_center)\n\n[Botkit Anywhere README](https://github.com/howdyai/botkit-starter-web/blob/master/readme.md#botkit-anywhere)\n\n[Botkit Developer Guide](https://github.com/howdyai/botkit/blob/master/readme.md#build-your-bot)',
    //         }, 'docs');
    //
    //         convo.addMessage({
    //             action: 'default'
    //         }, 'docs');
    //
    //
    //         // set up community thread
    //         convo.addMessage({
    //             text: 'Our developer community has thousands of members, and there are always friendly people available to answer questions about building bots!',
    //         }, 'community');
    //
    //         convo.addMessage({
    //             text: '[Join our community Slack channel](https://community.botkit.ai) to chat live with the Botkit team, representatives from major messaging platforms, and other developers just like you!',
    //         }, 'community');
    //
    //         convo.addMessage({
    //             text: '[Checkout the Github Issue Queue](https://github.com/howdyai/botkit/issues) to find frequently asked questions, bug reports and more.',
    //         }, 'community');
    //
    //         convo.addMessage({
    //             action: 'default'
    //         }, 'community');
    //
    //
    //         // set up contact thread
    //         convo.addMessage({
    //             text: 'The team who built me can help you build the perfect robotic assistant! They can answer all of your questions, and work with you to develop custom applications and integrations.\n\n[Use this form to get in touch](https://botkit.ai/contact.html), or email us directly at [help@botkit.ai](mailto:help@botkit.ai), and a real human will get in touch!',
    //         }, 'contact');
    //         convo.addMessage({
    //             action: 'default'
    //         }, 'contact');
    //
    //     });
    //
    // });


}
