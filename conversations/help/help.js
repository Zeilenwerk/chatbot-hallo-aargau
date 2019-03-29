module.exports = {

    help: function (convo, message, bot) {

        console.log("Start help");

        convo.addMessage({
            text: 'Wie kann ich Ihenen helfen?',
            quick_replies: [
                {
                    title: 'Deutschkurs suchen',
                    payload: 'Deutschkurs suchen',
                },
                {
                    title: 'Informationen zum Aufenthaltsstatus',
                    payload: 'Informationen zum Aufenthaltsstatus',
                },
                {
                    title: 'Hilfe',
                    payload: 'Hilfe',
                },
            ]
        }, "helpMenu");

        convo.addQuestion({
            text: 'Was möchten sie gerne wissen?:',
            quick_replies: [
                {
                    title: 'Wer bin ich?',
                    payload: 'Wer bin ich',
                },
                {
                    title: 'Wie können Sie mich bedienen?',
                    payload: 'Wie können Sie mich bedienen',
                },
                {
                    title: 'Wie kann ich Ihnen helfen?',
                    payload: 'Wie kann ich Ihnen helfen',
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    switch (res.text) {

                        case "Wer bin ich":
                            convo.transitionTo('helpMenu','Ich bin ein Chatbot.');
                            break;
                        case "Wie können Sie mich bedienen":
                            convo.transitionTo('helpMenu','Schreiben sie mir mir..');
                            break;
                        case "Wie kann ich Ihnen helfen":
                            convo.transitionTo('helpMenu','Ich helfe Ihnen bei der Suche nach einem Deutschkurs oder bei Fragen zum Aufenthaltsstatus.');
                            break;
                        default:
                            convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                            convo.repeat();
                            break;
                    }


                }
            }
        ], {}, "help");

    }

};
