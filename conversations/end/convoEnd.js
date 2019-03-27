module.exports = {

    convoEnd: function (convo, message, bot) {

        console.log("Start convoEnd");

        convo.addQuestion({
            text: 'Kann ich Ihnen weiterhin behilflich sein?.',
            quick_replies : [
                {
                    title: 'Ja, ich habe noch weitere anliegen',
                    payload: 'Ja',
                },
                {
                    title: 'Nein, das wäre alles',
                    payload: 'Nein',
                },

            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    switch (res.text) {

                        case "Ja":
                            convo.gotoThread("helpMenu");
                            break;
                        case "Nein":
                            convo.addMessage("Auf wiedersehen");
                            bot.findConversation(message, function (convo) {
                                if (convo) {
                                    // stop the conversation and swallow this message
                                    convo.stop('quit');
                                } else {
                                    // nothing ongoing, this message passes through
                                    next();
                                }
                            });
                            break;
                        default:
                            convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                            convo.repeat();
                            break;
                    }
                }
            }
        ], {}, "convoEnd");

    }

};
