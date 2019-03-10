module.exports = {
    menuNotwendigeInfos: function(convo){

        // Create a yes/no question in the default thread...
        convo.addMessage('Sie Suchen somit für den {{vars.kursTag}} um {{vars.kursZeit}} ein Niveau {{vars.kursNiveau}} Deutschkurs in {{vars.kursOrt}}. ', 'kursNotwendigeInfosMenu');

        convo.addQuestion({
            text: 'Stimmen diese Angaben für Sie?',
            quick_replies: [
                {
                    title: 'Ja',
                    payload: 'Ja',
                },
                {
                    title: 'Nein, ich möchte etwas ändern',
                    payload: 'Nein',
                },
            ]
        }, [
            {
                pattern: 'Ja',
                callback: function (res, convo) {
                    convo.gotoThread("zusatzInfo");
                    convo.next();
                }
            },
            {
                pattern: 'Nein',
                callback: function (res, convo) {
                    convo.gotoThread("kursNotwendigeInfosKorrigieren");
                    convo.next();
                }
            },
            {
                default: true,
                callback: function (res, convo) {
                    convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                    convo.repeat();
                }
            }
        ], {}, "kursNotwendigeInfosMenu");


        convo.addQuestion({
            text: 'Welche Angabe möchten sie abändern?',
            quick_replies: [
                {
                    title: 'Kurs Ort',
                    payload: 'Kurs Ort',
                },
                {
                    title: 'Kurs Tag',
                    payload: 'Kurs Tag',
                },
                {
                    title: 'Kurs Zeit',
                    payload: 'Kurs Zeit',
                },
                {
                    title: 'Kurs Niveau',
                    payload: 'Kurs Niveau',
                },
                {
                    title: 'Keine Änderung',
                    payload: 'Keine Änderung',
                },
            ]
        }, [
            {
                pattern: 'Kurs Ort',
                callback: function (res, convo) {
                    askKursOrt(convo, "kursNotwendigeInfosMenu");
                    convo.next();
                }
            },
            {
                pattern: 'Kurs Tag',
                callback: function (res, convo) {
                    askKursTag(convo, "kursNotwendigeInfosMenu");
                    convo.next();
                }
            },
            {
                pattern: 'Kurs Zeit',
                callback: function (res, convo) {
                    askKursZeit(convo, "kursNotwendigeInfosMenu");
                    convo.next();
                }
            },
            {
                pattern: 'Kurs Niveau',
                callback: function (res, convo) {
                    askKursNiveau(convo, "kursNotwendigeInfosMenu");
                    convo.next();
                }
            },
            {
                pattern: 'Keine Änderung',
                callback: function (res, convo) {
                    convo.gotoThread("zusatzInfo");
                    convo.next();
                }
            },
            {
                default: true,
                callback: function (res, convo) {
                    convo.addMessage("Leider habe ich die Antwort nicht verstanden.");
                    convo.repeat();
                }
            }
        ], {}, "kursNotwendigeInfosKorrigieren");

    },
    checkNotwendigeInfos: function(convo) {

        console.log("Check Notwendige Informationen");

        if(convo.vars.kursOrt !== "None" && convo.vars.kursTag !== "None" && convo.vars.kursZeit !== "None" && convo.vars.kursNiveau !== "None") {
            convo.gotoThread("kursNotwendigeInfosMenu");
            convo.next();
        }else{

            //Informationen vom benutzer beantragen, damit ein Deutschkurs gesucht werden kann
            if (convo.vars.kursOrt === "None") {
                console.log("gotoThread askKursOrt");
                convo.gotoThread("askKursOrt");
                convo.next();
            } else {
                if (convo.vars.kursBezirk !== "None") {
                    convo.addMessage("Den Ort haben Sie schon angegeben ({{vars.kursOrt}}, im Bezirk {kursBezirk}}), somit benötige ich dies nicht mehr.")
                } else {
                    convo.addMessage("Den Ort haben Sie schon angegeben ({{vars.kursOrt}}), somit benötige ich dies nicht mehr.")
                }
            }

            if (convo.vars.kursTag === "None") {
                console.log("gotoThread askKursTag");
                convo.gotoThread("askKursTag");
                convo.next();
            } else {
                convo.addMessage("Als Kurstag, haben Sie den {{vars.kursTag}} gewählt.")
            }

            if (convo.vars.kursZeit === "None") {
                console.log("gotoThread askKursZeit");
                convo.gotoThread("askKursZeit");
                convo.next();
            } else {
                convo.addMessage("Die Zeit am {{vars.kursTag}} für den Kurs ist {{vars.kursZeit}} Uhr.")
            }

            if (convo.vars.kursNiveau === "None") {
                console.log("gotoThread askKursNiveau");
                convo.gotoThread("askKursNiveau");
                convo.next();
            } else {
                convo.addMessage("Das Kursniveau ist {{vars.kursNiveau}}.");
            }

            console.log("gotoThread kursNotwendigeInfosMenu");
            convo.gotoThread("kursNotwendigeInfosMenu");
            convo.next();
        }

    }

};