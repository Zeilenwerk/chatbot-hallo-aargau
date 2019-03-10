module.exports = {
    convoEnde: function (convo) {

        convo.on('end', function (convo) {

            convo.say('This is the end of the conversation.');

            if (convo.status === 'completed') {
                // do something useful with the users responses
                var res = convo.extractResponses();

                // reference a specific response by key
                var value = convo.extractResponse('key');

                // ... do more stuff...

            } else {
                // something happened that caused the conversation to stop prematurely
            }

        });

    }
};