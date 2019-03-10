module.exports = function (controller) {

    //Get LUIS middleware
    var luis = require('../node_modules/botkit-middleware-luis/src/luis-middleware');

    controller.hears(["Deutschkurs Suchen"], 'message_received', luis.middleware.hereIntent, function (bot, message) {

        bot.startConversation(message, function (err, convo) {

            //Lof Message and top intent
            console.log("Recieved Message:");
            console.log(message);
            console.log("Top Intent: " + message.topIntent.intent);
            console.log("Score: " + message.topIntent.score);

            if (message.topIntent.intent === "Deutschkurs Suchen") {

                //Initialize conversation and conversation Varaibles
                require( "../conversations/deutschkurs/kursInitialization").initializeDeutschkursConversation(convo, message, bot);



                deutschkursSuchen(convo, message);
                // displayGefundeneKurse(function(m){
                //   bot.reply(message, m);
                // });

            } else {

                bot.reply(message, "Leider noch nicht implementiert");

            }

        });

    });

    function deutschkursSuchen(convo, message) {

        // convo.gotoThread("kursNotwendigeInfosMenu");
        // convo.next();
        //
        // convo.addMessage("Zusätzliche Infromationen helfen mir die Kurse besser für Sie anzuzeigen.");
        //
        // convo.gotoThread("kursZusatzInfosMenu");
        // convo.next();
        //
        // convo.addMessage("Passen die?", "gefundeneKurse");


        // create a path for when a user says YES
        convo.addMessage({
            text: 'You said yes! How wonderful.',
        }, 'yes_thread');

        // create a path for when a user says NO
        convo.addMessage({
            text: 'You said no, that is too bad.',
        }, 'no_thread');

        // create a path where neither option was matched
        // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
        convo.addMessage({
            text: 'Sorry I did not understand.',
            action: 'default',
        }, 'bad_response');


    }
};
