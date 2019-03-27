module.exports = {

    askFeedback: function (convo, message, bot) {

        console.log("Start askFeedback");

        convo.addQuestion({
            text: 'Waren sie mit dem Bot zufrieden?',
            quick_replies: [
                {
                    title: '★★★★★',
                    payload: 'Sehr zufrieden',
                },
                {
                    title: '★★★★',
                    payload: 'Zufrieden',
                },
                {
                    title: '★★★',
                    payload: 'Mittelmässig zufrieden',
                },
                {
                    title: '★★',
                    payload: 'Eher nicht zufrieden',
                },
                {
                    title: '★',
                    payload: 'Gar nicht zufrieden',
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    switch (res.text) {

                        case "Sehr zufrieden":
                            convo.transitionTo('convoEnd','Das freut mich, dass Sie sehr zufrieden sind.');
                            break;
                        case "Zufrieden":
                            convo.transitionTo('convoEnd','Das freut mich, dass Sie zufrieden sind.');
                            break;
                        case "Mittelmässig zufrieden":
                            convo.transitionTo('convoEnd','Ich hoffe nächstes mal kann ich Ihnen besser weiterhelfen.');
                            break;
                        case "Eher nicht zufrieden":
                            convo.transitionTo('convoEnd','Das tut mir leid, das sie eher nicht zufriden sind.');
                            break;
                        case "Gar nicht zufrieden":
                            convo.transitionTo('convoEnd','Das tut mir leid, das sie gar nicht zufriden sind.');
                            break;
                        default:
                            convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                            convo.repeat();
                            break;
                    }
                }
            }
        ], {}, "askFeedback");

    }

};
