/*Funktion für die Anfrage des Kurortes
    *
    * TODO: Get Kurs Orte von Datenquelle mit allen Verfügbaren Orten
    *
    * @param convo -> Conversation die am laufen ist
    *
    * */
module.exports = {
    askKursOrt: function (convo, luisHelper, nextThread = "None") {

            console.log("Start askKursOrt");

            // set up a menu thread which other threads can point at.
            convo.addQuestion({
                text: 'Wo soll der Deutschkurs stattfinden?',
                quick_replies: [
                    {
                        title: 'Aarau',
                        payload: 'Deutschkurs in Aarau',
                    },
                    {
                        title: 'Baden',
                        payload: 'Deutschkurs in Baden',
                    },
                    {
                        title: 'Lenzburg',
                        payload: 'Deutschkurs in Lenzburg',
                    },
                    {
                        title: 'Rheinfelden ',
                        payload: 'Deutschkurs in Rheinfelden ',
                    },
                ]
            }, [
                {
                    default: true,
                    callback: function (res, convo) {

                        let aEntity = luisHelper.getEntityFromLuisResponse("kursOrt", res);

                        if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                            // array empty or does not exist
                            //TODO: Handle not found entity
                            convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                            convo.repeat();
                        } else {
                            convo.setVar("kursOrt", aEntity[0]);
                            console.log("kursOrt = " + convo.vars.kursZeit);

                            convo.setVar("kursBezirk", aEntity[1]);
                            console.log("kursBezirk = " + convo.vars.kursBezirk);
                        }

                        if (nextThread !== "None") {
                            convo.gotoThread(nextThread);
                        }else{
                            convo.next();
                        }
                    }
                }
            ], {}, "askKursOrt");

    },

    correctKursOrt: function (convo, luisHelper, nextThread = "None") {

        console.log("Start correctkursOrt");

        // set up a menu thread which other threads can point at.
        convo.addQuestion({
            text: 'Wo soll der Deutschkurs stattfinden?',
            quick_replies: [
                {
                    title: 'Aarau',
                    payload: 'Deutschkurs in Aarau',
                },
                {
                    title: 'Baden',
                    payload: 'Deutschkurs in Baden',
                },
                {
                    title: 'Lenzburg',
                    payload: 'Deutschkurs in Lenzburg',
                },
                {
                    title: 'Rheinfelden ',
                    payload: 'Deutschkurs in Rheinfelden ',
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    let aEntity = luisHelper. getEntityFromLuisResponse("kursOrt", res);

                    if (aEntity === undefined || aEntity.length === 0) {
                        // array empty or does not exist
                        //TODO: Handle not found entity
                        convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                        convo.repeat();
                    } else {
                        convo.setVar("kursOrt", aEntity[0]);
                        console.log("kursOrt = " + convo.vars.kursOrt);

                        convo.setVar("kursBezirk", aEntity[1]);
                        console.log("kursBezirk = " + convo.vars.kursBezirk);
                    }

                    if (nextThread !== "None") {
                        convo.gotoThread(nextThread);
                    }else{
                        convo.next();
                    }

                }
            }
        ], {}, "correctkursOrt");
    }
};
