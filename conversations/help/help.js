module.exports = {

    help: function (convo, message, bot) {

        const { t } = require('../../../node_modules/localizify');

        console.log("Start help");

        convo.addMessage({
            text: t('help.helpMenu_Message'),
            quick_replies: [
                {
                    title: t('help.helpMenu_Message_Qr_Kurs_Suchen'),
                    payload: t('help.helpMenu_Message_Qr_Kurs_Suchen'),
                },
                {
                    title: t('help.helpMenu_Message_Qr_Aufenthaltsstatus'),
                    payload: t('help.helpMenu_Message_Qr_Aufenthaltsstatus'),
                },
                {
                    title: t('help.helpMenu_Message_Qr_Hilfe'),
                    payload: t('help.helpMenu_Message_Qr_Hilfe'),
                },
            ]
        }, "helpMenu");

        convo.addQuestion({
            text: t('help.help_Question'),
            quick_replies: [
                {
                    title: t('help.help_Question_Qr_wer_bin_ich'),
                    payload: t('help.help_Question_Qr_wer_bin_ich'),
                },
                {
                    title: t('help.help_Question_Qr_Bedienung'),
                    payload: t('help.help_Question_Qr_Bedienung'),
                },
                {
                    title: t('help.help_Question_Qr_wie_kann_ich_helfen'),
                    payload: t('help.help_Question_Qr_wie_kann_ich_helfen'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    switch (res.text) {

                        case t('help.help_Question_Qr_wer_bin_ich'):
                            convo.transitionTo('helpMenu',t('help.help_wer_bin_ich'));
                            break;
                        case t('help.help_Question_Qr_Bedienung'):
                            convo.transitionTo('helpMenu',t('help.help_Bedienung'));
                            break;
                        case t('help.help_Question_Qr_wie_kann_ich_helfen'):
                            convo.transitionTo('helpMenu',t('help.help_wie_kann_ich_helfen'));
                            break;
                        default:
                            convo.addMessage(t('nicht_verstanden'));
                            convo.repeat();
                            break;
                    }


                }
            }
        ], {}, "help");

    }

};
