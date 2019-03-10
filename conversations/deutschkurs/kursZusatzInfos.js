module.exports = {
    menuZusatzInfos: function (convo, nextThread = "None", message, bot) {

        convo.addQuestion({
            text: 'Möchten sie mir noch eine oder mehrere der folgenden Zusatzinformationen geben:',
            quick_replies: [
                {
                    title: "Adressatengruppe",
                    payload: 'Adressatengruppe',
                },
                {
                    title: "Kurs Anbieter",
                    payload: 'Anbieter',
                },
                {
                    title: "Kurs Intensitaet",
                    payload: 'Intensitaet',
                },
                {
                    title: "Kurs Sprache",
                    payload: 'Sprache',
                },
                {
                    title: "Keine weiteren Angaben",
                    payload: 'Keine weiteren Angaben',
                },
            ]
        }, [
            {
                pattern: 'Adressatengruppe',
                callback: function (res, convo) {
                    askKursAdressatengruppe(convo, "kursZusatzInfosMenu");
                    convo.next();
                }
            },
            {
                pattern: 'Anbieter',
                callback: function (res, convo) {
                    convo.addMessage("Noch nicht implementiert");
                    convo.next();
                }
            },
            {
                pattern: 'Intensitaet',
                callback: function (res, convo) {
                    convo.addMessage("Noch nicht implementiert");
                    convo.next();
                }
            },
            {
                pattern: 'Sprache',
                callback: function (res, convo) {
                    convo.addMessage("Noch nicht implementiert");
                    convo.next();
                }
            },
            {
                pattern: 'Keine weiteren Angaben',
                callback: function (res, convo) {

                    convo.addMessage("Ich habe folgende Kurse gefunden");

                    require("./kursGefundeneKurse").menuGefundeneKurse(convo, function(m){
                        bot.reply(message, m);
                    });

                    convo.gotoThread("gefundeneKurse");
                    convo.next();
                }
            },
        ], {}, "kursZusatzInfosMenu");
    }
};

