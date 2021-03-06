module.exports = function (controller) {

    const dblogUtil = require("../util/logUtil");

    function logMessage(message, messageType, date) {

        if (message.type === 'message' || message.type === 'message_received') {

            let log_user = message.user;
            let log_message = message.text;
            let log_type = "";
            let log_date = date;

            if(messageType === "user_message"){
                log_type = 1;
            }else{
                log_type = 2;
            }

            dblogUtil.storeMessage(log_user, log_type, log_date, log_message);

        }
    }

    // log incoming messages to the user history
    controller.middleware.receive.use(function (bot, message, next) {
        controller.storage.users.get(message.user, function (err, user) {
            logMessage(message, "user_message", new Date());
        });
        next();
    });

    controller.middleware.format.use(function (bot, message, platform_message, next) {
        controller.storage.users.get(message.to, function (err, user) {
            logMessage(platform_message, "bot_message", new Date());
        });
        next();
    });

};
