
//Kurszweck
//Kursdurchführung
//  -> Kurssprache
//      -> QR -> Deutsch
//      -> QR -> English
//      -> QR -> Arabisch
//      -> QR -> Spanisch
//      -> QR -> Portugiesisch
//      -> QR -> Italienisch
//  -> Ort
//  -> Zeit
//  -> Intensität
//  -> Anbieter
//Kursadresat
//  -> Kursniveau
//      -> QR -> Ohne Kentnisse in der lateinischen Schrift
//      -> QR -> Kentnisse in der lateinischen Schrift
//      -> QR -> Keine oder serh wenig Deutschkentnisse
//      -> QR -> A1
//      -> QR -> A2
//      -> QR -> B1
//      -> QR -> B2
//      -> QR -> C1
//      -> QR -> C2
//  -> Adressatengruppe
//      -> QR -> Jugendliche < 16
//      -> QR -> Jugendliche zwischen 16 - 21
//      -> QR -> Erwachsene
//      -> QR -> Frauen
//      -> QR -> Frauen mit Kinder
//Kursformat
//Kursbedingungen
//  -> Sprachnachweis
//  -> Kurskosten







convo.ask({
    text: 'Für welches Sprachniveau suchen Sie den Kurs?',
    quick_replies: [
        {
            title: 'A1',
            payload: 'A1',
        }
    ]
}, [
    {
        pattern: 'A1',
        callback: function (res, convo) {
            convo.gotoThread('A1');
            convo.next();
        }
    },
    {
        default: true,
        callback: function (res, convo) {
            convo.gotoThread('end');
        }
    }
]);

// set up A1 threads
convo.addMessage({
    action: 'default',
}, 'A1');

// set up A2 threads
convo.addMessage({
    action: 'default',
}, 'A2');

// set up B1 threads
convo.addMessage({
    action: 'default',
}, 'B1');

// set up B1 threads
convo.addMessage({
    text: 'Wo soll der Kurs stattfinden?',
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
}, 'B2');

// set up a menu thread which other threads can point at.
convo.ask({
    text: 'In Aarau finden folgende Kurse statt',
    quick_replies: [
        {
            title: 'Intensivkurs ab 01.02.2019',
            payload: 'K1',
        },
        {
            title: 'Wochenkurs, jeweils mittwochs und freitags um 19:00',
            payload: 'K2',
        },
        {
            title: 'Wochenkurs, jeweils dienstags um 08:30',
            payload: 'K3',
        },
    ]
}, [
    {
        pattern: 'K1',
        callback: function (res, convo) {
            convo.gotoThread('K1');
            convo.next();
        }
    },
    {
        pattern: 'K2',
        callback: function (res, convo) {
            convo.gotoThread('K2');
            convo.next();
        }
    },
    {
        pattern: 'K3',
        callback: function (res, convo) {
            convo.gotoThread('K1');
            convo.next();
        }
    },
    {
        default: true,
        callback: function (res, convo) {
            convo.gotoThread('end');
        }
    }
]);

// set up end threads
convo.addMessage({
    text: 'I do not know how to help with that. Say `help` at any time to access this menu.'
}, 'end');

// set up K1 threads
convo.addMessage({
    text: 'Noch nicht implementiert',
}, 'K1');

// set up K2 threads
convo.addMessage({
    text: 'default'
}, 'K2');

// set up K3 threads
convo.addMessage({
    text: 'Super, hier die Daten zum Kurs:\n' +
        'TLC Baden\n' +
        'Bahnhofstrasse 44\n' +
        '5400 Baden\n' +
        'info@ihbaden.ch\n' +
        'www.ihbaden.ch\n' +
        'Tel: 056 205 51 78\n'
}, 'K3');

convo.addMessage({
    text: 'Viel Spass beim Deutsch lernen!'
}, 'K3');



// -------------------------------------------


// set up a menu thread which other threads can point at.
convo.ask({
    text: 'Für welches Sprachniveau suchen Sie den Kurs?',
    quick_replies: [
        {
            title: 'A1',
            payload: 'A1',
        },
        {
            title: 'A2',
            payload: 'A2',
        },
        {
            title: 'B1',
            payload: 'B1',
        },
        {
            title: 'B2 (Business)',
            payload: 'B2',
        },
        {
            title: 'C1',
            payload: 'C1',
        },
        {
            title: 'C2',
            payload: 'C2',
        },
    ]
}, [
    {
        pattern: 'A1',
        callback: function (res, convo) {
            convo.gotoThread('A1');
            convo.next();
        }
    },
    {
        pattern: 'A2',
        callback: function (res, convo) {
            convo.gotoThread('A2');
            convo.next();
        }
    },
    {
        pattern: 'B1',
        callback: function (res, convo) {
            convo.gotoThread('B1');
            convo.next();
        }
    },
    {
        pattern: 'B2',
        callback: function (res, convo) {
            convo.gotoThread('B2');
            convo.next();
        }
    },
    {
        default: true,
        callback: function (res, convo) {
            convo.gotoThread('end');
        }
    }
]);

// set up end threads
convo.addMessage({
    text: 'Noch nicht implementiert.'
}, 'end');

// set up A1 threads
convo.addMessage({
    action: 'default',
}, 'A1');

// set up A2 threads
convo.addMessage({
    action: 'default',
}, 'A2');

// set up B1 threads
convo.addMessage({
    action: 'default',
}, 'B1');

// set up B1 threads
convo.addMessage({
    text: 'Wo soll der Kurs stattfinden?',
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
}, 'B2');

// set up a menu thread which other threads can point at.
convo.ask({
    text: 'In Aarau finden folgende Kurse statt',
    quick_replies: [
        {
            title: 'Intensivkurs ab 01.02.2019',
            payload: 'K1',
        },
        {
            title: 'Wochenkurs, jeweils mittwochs und freitags um 19:00',
            payload: 'K2',
        },
        {
            title: 'Wochenkurs, jeweils dienstags um 08:30',
            payload: 'K3',
        },
    ]
}, [
    {
        pattern: 'K1',
        callback: function (res, convo) {
            convo.gotoThread('K1');
            convo.next();
        }
    },
    {
        pattern: 'K2',
        callback: function (res, convo) {
            convo.gotoThread('K2');
            convo.next();
        }
    },
    {
        pattern: 'K3',
        callback: function (res, convo) {
            convo.gotoThread('K1');
            convo.next();
        }
    },
    {
        default: true,
        callback: function (res, convo) {
            convo.gotoThread('end');
        }
    }
]);

// set up end threads
convo.addMessage({
    text: 'I do not know how to help with that. Say `help` at any time to access this menu.'
}, 'end');

// set up K1 threads
convo.addMessage({
    text: 'Noch nicht implementiert',
}, 'K1');

// set up K2 threads
convo.addMessage({
    text: 'default'
}, 'K2');

// set up K3 threads
convo.addMessage({
    text: 'Super, hier die Daten zum Kurs:\n' +
        'TLC Baden\n' +
        'Bahnhofstrasse 44\n' +
        '5400 Baden\n' +
        'info@ihbaden.ch\n' +
        'www.ihbaden.ch\n' +
        'Tel: 056 205 51 78\n'
}, 'K3');

convo.addMessage({
    text: 'Viel Spass beim Deutsch lernen!'
}, 'K3');

});