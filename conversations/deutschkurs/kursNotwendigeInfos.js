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
                }
            },
            {
                pattern: 'Nein',
                callback: function (res, convo) {
                    convo.gotoThread("kursNotwendigeInfosKorrigieren");
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
                    // askKursOrt(convo, "kursNotwendigeInfosMenu");
                    convo.gotoThread("askKursOrt");
                }
            },
            {
                pattern: 'Kurs Tag',
                callback: function (res, convo) {
                    // askKursTag(convo, "kursNotwendigeInfosMenu");
                    convo.gotoThread("askKursTag");
                }
            },
            {
                pattern: 'Kurs Zeit',
                callback: function (res, convo) {
                    // askKursZeit(convo, "kursNotwendigeInfosMenu");
                    convo.gotoThread("askKursZeit");
                }
            },
            {
                pattern: 'Kurs Niveau',
                callback: function (res, convo) {
                    // askKursNiveau(convo, "kursNotwendigeInfosMenu");
                    convo.gotoThread("askKursNiveau");
                }
            },
            {
                pattern: 'Keine Änderung',
                callback: function (res, convo) {
                    convo.gotoThread("zusatzInfo");
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

    }

};