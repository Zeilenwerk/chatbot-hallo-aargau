module.exports = {

    displayErrorMessage: function (bot, message, error = false, errorCode = false, errorBotMessage = false) {

        const logUtil = require("./logUtil");
        const {t} = require('../node_modules/localizify');


        //Prepare Log Message
        let logMessage = "";

        if (errorCode) {
            logMessage += "(Error Code: '" + errorCode + "') ";
        }

        if (error) {
            logMessage += " Error: " + JSON.stringify(error);
            logMessage += " Stack: " + JSON.stringify(error.stack);
        } else {
            logMessage += t('error.default_error_message');
        }

        logUtil.error(logMessage);

        bot.reply(message, t('error.default_error_message'));
        if (errorBotMessage) {
            bot.reply(message, errorBotMessage);
            logUtil.error("Error Bot Message: " + errorBotMessage);
        }

        bot.findConversation(message, function (convo) {
            if (convo) {
                bot.reply(message, t('end.convoQuit_Message'));

                // reset all conversatino variables
                let aVars = ["kursOrt", "kursBezirk", "kursZeit", "kursTag", "kursTagUndZeit", "kursDatum", "kursIntensitaet", "kursAnbieter", "kursNiveau", "kursSprache", "kursAdressatengruppe", "kursKosten", "kursZweck"];
                for (let x = 0; x < aVars.length; x++) {
                    convo.setVar(aVars[x], t("kurs.kursInformationen.keine_angabe"));
                }
                convo.setVar("offsetKurse", 0);

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