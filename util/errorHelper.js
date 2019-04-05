module.exports = {

    displayErrorMessage: function (convo, errorMessage = false, errorCode = false) {

        const logHelper = require("./logHelper");
        const { t } = require('../node_modules/localizify');

        let logMessage = "";

        if(errorCode){
            logMessage += "(Error Code: '" + errorCode + "') ";
        }

        if(errorMessage){
            logMessage += errorMessage;
        }else{
            logMessage += t('error.default_error_message');
        }

        logHelper.error(logMessage);

        convo.addMessage(t('error.default_error_message'));

        convo.stop('quit');

        return null;
    },

    uncaughtExceptionHandling: function (bot, errorMessage = false, errorCode = false) {

        const logHelper = require("./logHelper");
        const { t } = require('../node_modules/localizify');

        let logMessage = "";

        if(errorCode){
            logMessage += "(Error Code: '" + errorCode + "') ";
        }

        if(errorMessage){
            logMessage += errorMessage;
        }else{
            logMessage += t('error.default_error_message');
        }

        logHelper.error(logMessage);

        bot.replyWithTyping(t('error.default_error_message'));

        bot.findConversation(message, function (convo) {
            if (convo) {
                bot.replyWithTyping(message, t('end.convoQuit_Message'));
                // stop the conversation and swallow this message
                convo.stop('quit');
            } else {
                // nothing ongoing, this message passes through
                next();
            }
        });

        return null;
    }
};