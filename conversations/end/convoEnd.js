module.exports = {

    convoEnd: function (convo, message, bot) {

        const { t } = require('../../../node_modules/localizify');

        console.log("Start convoEnd");

        convo.addQuestion({
            text: t('end.askend_Qr_5_Payload'),
            quick_replies : [
                {
                    title: t('end.convoEnd_Question_Qr_Ja'),
                    payload: t('end.convoEnd_Question_Qr_Ja_Payload'),
                },
                {
                    title: t('end.convoEnd_Question_Qr_Nein'),
                    payload: t('end.convoEnd_Question_Qr_Nein_Payload'),
                },

            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    switch (res.text) {

                        case t('end.convoEnd_Question_Qr_Ja_Payload'):
                            convo.gotoThread("helpMenu");
                            break;
                        case t('end.convoEnd_Question_Qr_Nein_Payload'):
                            bot.findConversation(message, function (convo) {
                                if (convo) {
                                    bot.reply(message, t('end.auf_wiedersehen'));
                                    // stop the conversation and swallow this message
                                    convo.stop('quit');
                                } else {
                                    // nothing ongoing, this message passes through
                                    next();
                                }
                            });
                            break;
                        default:
                            convo.addMessage(t('nicht_verstanden'));
                            convo.repeat();
                            break;
                    }
                }
            }
        ], {}, "convoEnd");

    }

};
