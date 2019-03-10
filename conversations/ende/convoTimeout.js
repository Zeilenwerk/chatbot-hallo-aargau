module.exports = {
    convoTimeout: function (convo, timeout = false) {

        if (!timeout) {
            //Set Timeout in milliseconds
            // 1 min = 60000
            // 2 min = 120000
            // 3 min = 180000
            // 4 min = 240000
            // 5 min = 300000
            convo.setTimeout(120000);
        } else {
            convo.setTimeout(timeout);
        }

        convo.onTimeout(function (convo) {

            convo.say('Oh no! The time limit has expired.');
            convo.gotoThread("end")

        });

    }
};