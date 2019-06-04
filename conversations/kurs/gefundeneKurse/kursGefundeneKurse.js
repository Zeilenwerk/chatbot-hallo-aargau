module.exports = {
    displayGefundeneKurse: function (bot, message, convo, luisUtil, threadName, nextThread = "None") {

        const {t} = require('../../../node_modules/localizify');
        const logUtil = require("../../../util/logUtil");
        const errorUtil = require("../../../util/errorUtil");
        const kursHelper = require('../../../util/helper/kursHelper');
        const gefundeneKurse = this;

        kursHelper.getMatchedKurseFromDB(bot, message, convo, luisUtil, nextThread, function (conversation, rows) {

            logUtil.debug("All getMatchedKurseFromDB to display in Convo: " + JSON.stringify(rows));

            if (rows.length === 0) {
                //conversation.addMessage(t("kurs.kursInformationen.nicht_in_db_gefunden", {item: t("kurs.kursInformationen.item")}), threadName + "0");
                //conversation.transitionTo(nextThread, t("kurs.kursInformationen.nicht_in_db_gefunden", {item: t("kurs.kursInformationen.altersgruppe.item")}));
                conversation.transitionTo("convoEnd", t("kurs.kursInformationen.nicht_in_db_gefunden", {item: t("kurs.kursInformationen.item")}));
            } else {

                let maxQRToDisplay = 1;

                for (let c = 0; c < Math.ceil(rows.length / maxQRToDisplay); c++) {

                    let oRow = rows[c];

                    conversation.addMessage(t("kurs.kursGefunden"), threadName + c);

                    let kursInformationenAnbieter = t("keine_Angabe");
                    let kursInformationenAltersgruppe = t("keine_Angabe");
                    let kursInformationenGeschlecht = t("keine_Angabe");
                    let kursInformationenIntensitaet = t("keine_Angabe");
                    let kursInformationenKonversation = t("keine_Angabe");
                    let kursInformationenKosten = t("keine_Angabe");
                    let kursInformationenNiveau = t("keine_Angabe");
                    let kursInformationenOrt = t("keine_Angabe");
                    let kursInformationenTag = t("keine_Angabe");
                    let kursInformationenZeit_TagStart = t("keine_Angabe");
                    let kursInformationenZeit_TagEnde = t("keine_Angabe");
                    let kursInformationenZeit_ZeitStart = t("keine_Angabe");
                    let kursInformationenZeit_ZeitEnde = t("keine_Angabe");
                    let kursInformationenZiel = t("keine_Angabe");
                    let kursInformationenAadressatengruppen = t("keine_Angabe");

                    if (null != oRow.kursinformationenanbieter && oRow.kursinformationenanbieter !== t("keine_Angabe") && oRow.kursinformationenanbieter !== "") {
                        kursInformationenAnbieter = oRow.kursinformationenanbieter;
                    }
                    if (null != oRow.kursinformationenaltersgruppe && oRow.kursinformationenaltersgruppe !== t("keine_Angabe") && oRow.kursinformationenaltersgruppe !== "") {
                        kursInformationenAltersgruppe = oRow.kursinformationenaltersgruppe;
                    }
                    if (null != oRow.kursinformationengeschlecht && oRow.kursinformationengeschlecht !== t("keine_Angabe") && oRow.kursinformationengeschlecht !== "") {
                        kursInformationenGeschlecht = oRow.kursinformationengeschlecht;
                    }
                    if (null != oRow.kursinformationenintensitaet && oRow.kursinformationenintensitaet !== t("keine_Angabe") && oRow.kursinformationenintensitaet !== "") {
                        kursInformationenIntensitaet = oRow.kursinformationenintensitaet;
                    }
                    if (null != oRow.kursinformationenkonversation && oRow.kursinformationenkonversation !== t("keine_Angabe") && oRow.kursinformationenkonversation !== "") {
                        kursInformationenKonversation = oRow.kursinformationenkonversation;
                    }
                    if (null != oRow.kursinformationenkosten && oRow.kursinformationenkosten !== t("keine_Angabe") && oRow.kursinformationenkosten !== "") {
                        kursInformationenKosten = oRow.kursinformationenkosten;
                    }
                    if (null != oRow.kursinformationenniveau && oRow.kursinformationenniveau !== t("keine_Angabe") && oRow.kursinformationenniveau !== "") {
                        kursInformationenNiveau = oRow.kursinformationenniveau;
                    }
                    if (null != oRow.kursinformationenort && oRow.kursinformationenort !== t("keine_Angabe") && oRow.kursinformationenort !== "") {
                        kursInformationenOrt = oRow.kursinformationenort;
                    }
                    if (null != oRow.kursinformationentag && oRow.kursinformationentag !== t("keine_Angabe") && oRow.kursinformationentag !== "") {
                        kursInformationenTag = oRow.kursinformationentag;
                    }
                    if (null != oRow.kursinformationenzeit_tagstart && oRow.kursinformationenzeit_tagstart !== t("keine_Angabe") && oRow.kursinformationenzeit_tagstart !== "") {
                        kursInformationenZeit_TagStart = oRow.kursinformationenzeit_tagstart;
                    }
                    if (null != oRow.kursinformationenzeit_tagende && oRow.kursinformationenzeit_tagende !== t("keine_Angabe") && oRow.kursinformationenzeit_tagende !== "") {
                        kursInformationenZeit_TagEnde = oRow.kursinformationenzeit_tagende;
                    }
                    if (null != oRow.kursinformationenzeit_zeitstart && oRow.kursinformationenzeit_zeitstart !== t("keine_Angabe") && oRow.kursinformationenzeit_zeitstart !== "") {
                        kursInformationenZeit_ZeitStart = oRow.kursinformationenzeit_zeitstart + " Uhr";
                    }
                    if (null != oRow.kursinformationenzeit_zeitende && oRow.kursinformationenzeit_zeitende !== t("keine_Angabe") && oRow.kursinformationenzeit_zeitende !== "") {
                        kursInformationenZeit_ZeitEnde = oRow.kursinformationenzeit_zeitende + " Uhr";
                    }
                    if (null != oRow.kursinformationenziel && oRow.kursinformationenziel !== t("keine_Angabe") && oRow.kursinformationenziel !== "") {
                        kursInformationenZiel = oRow.kursinformationenziel;
                    }
                    if (null != oRow.kursinformationenaadressatengruppen && oRow.kursinformationenaadressatengruppen !== t("keine_Angabe") && oRow.kursinformationenaadressatengruppen !== "") {
                        kursInformationenAadressatengruppen = oRow.kursinformationenaadressatengruppen;
                    }

                    conversation.addMessage(t("kurs.kursGefunden_Informationen", {
                        nummer: (c + 1),
                        kursInformationenIntensitaet: kursInformationenIntensitaet,
                        kursInformationenGeschlecht: kursInformationenGeschlecht,
                        kursInformationenNiveau: kursInformationenNiveau,
                        kursInformationenZeit_ZeitEnde: kursInformationenZeit_ZeitEnde.slice(0, -7),
                        kursInformationenZeit_ZeitStart: kursInformationenZeit_ZeitStart.slice(0, -7),
                        kursInformationenOrt: kursInformationenOrt
                    }), threadName + c);

                    let qr = [];

                    //If navigated to display more, offer button to go back
                    if (c >= 1) {
                        qr.push({
                            title: t("kurs.kursInformationen.zurück"),
                            payload: t("kurs.kursInformationen.zurück")
                        })
                    }

                    qr.push({title: t("kurs.gefundeneKurse_Question_QR_Ja"), payload: oRow.id + ""});

                    //If there are more than "maxQRToDisplay" elements, offer to display more.
                    if (c < rows.length - 1) {
                        qr.push({
                            title: t("kurs.gefundeneKurse_Question_QR_Nein"),
                            payload: t("kurs.gefundeneKurse_Question_QR_Nein")
                        });
                    }

                    qr.push({
                        title: t("kurs.gefundeneKurse_Question_QR_Infromationen_aendern"),
                        payload: t("kurs.gefundeneKurse_Question_QR_Infromationen_aendern")
                    });

                    conversation.addQuestion({
                        text: t("kurs.gefundeneKurse_Question"),
                        quick_replies: qr,
                        disable_input: true

                    }, [
                        {
                            default: true,
                            callback: function (res, conversation) {

                                try {

                                    switch (res.text) {

                                        case t("kurs.kursInformationen.zurück"):
                                            //Go to thread with previous options
                                            conversation.gotoThread(threadName + (c - 1));
                                            break;
                                        case t("kurs.gefundeneKurse_Question_QR_Nein"):
                                            //Go to thread with next options
                                            conversation.gotoThread(threadName + (c + 1));
                                            break;
                                        case t("kurs.gefundeneKurse_Question_QR_Infromationen_aendern"):
                                            conversation.gotoThread("correctInfromation");
                                            break;
                                        default:

                                            if (Number.isInteger(Number(res.text))) {
                                                gefundeneKurse.displayKursContactInfo(bot, message, conversation, luisUtil, "displayFoundKursContactInformation", "askFeedback", res.text);
                                                conversation.gotoThread("displayFoundKursContactInformation");
                                            } else {
                                                conversation.transitionTo(threadName + c, t("nicht_verstanden"));
                                            }

                                            break;
                                    }

                                } catch (err) {
                                    errorUtil.displayErrorMessage(bot, message, err, false, false);
                                }

                            }
                        }
                    ], {}, threadName + c);

                }

            }
        });

    },

    displayKursContactInfo: function (bot, message, convo, luisUtil, threadName, nextThread = "None", id) {

        const {t} = require('../../../node_modules/localizify');
        const logUtil = require("../../../util/logUtil");
        const errorUtil = require("../../../util/errorUtil");
        const kursHelper = require('../../../util/helper/kursHelper');

        convo.addQuestion({
            text: t("kurs.gefundenerKurs_Auswahl", {id: id}),
            quick_replies: [
                {
                    title: t('kurs.gefundeneKurse_Question_QR_Ja'),
                    payload: t('kurs.gefundeneKurse_Question_QR_Ja'),
                },
                {
                    title: t('kurs.gefundeneKurse_Question_QR_Infromationen_aendern'),
                    payload: t('kurs.gefundeneKurse_Question_QR_Infromationen_aendern'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {
                    try {
                        switch (res.text) {

                            case t('kurs.gefundeneKurse_Question_QR_Ja'):
                                convo.next();
                                break;
                            case t('kurs.gefundeneKurse_Question_QR_Infromationen_aendern'):
                                convo.gotoThread("correctInfromation");
                                break;
                            default:
                                convo.say(t('nicht_verstanden'));
                                convo.repeat();
                                break;
                        }
                    } catch (err) {
                        errorUtil.displayErrorMessage(bot, message, err, false, false);
                    }

                }
            }
        ], {}, threadName);

        kursHelper.getKursWithId(bot, message, convo, luisUtil, nextThread, id, function (conversation, rows) {

            logUtil.debug("All getKursWithId to display in Convo: " + JSON.stringify(rows));

            if (rows.length === 0) {
                conversation.transitionTo("convoEnd", t("kurs.kursInformationen.nicht_in_db_gefunden", {item: t("kurs.kursInformationen.item")}));
            } else {

                let oRow = rows[0];

                conversation.addMessage(t("kurs.kursGefunden"), threadName);

                let kursInformationenAnbieter = t("keine_Angabe");
                let kursInformationenKosten = t("keine_Angabe");
                let kursInformationenTag = t("keine_Angabe");
                let kursInformationenZeit_TagStart = t("keine_Angabe");
                let kursInformationenZeit_TagEnde = t("keine_Angabe");
                let kursInformationenZeit_ZeitStart = t("keine_Angabe");
                let kursInformationenZeit_ZeitEnde = t("keine_Angabe");
                let kursKontaktperson_Name = t("keine_Angabe");
                let kursKontaktperson_Telefon = t("keine_Angabe");
                let kursKontaktperson_Telefon2 = t("keine_Angabe");
                let kursKontaktperson_Mail = t("keine_Angabe");
                let kursKontaktperson_Mail2 = t("keine_Angabe");
                let kursKontaktperson_Formular = t("keine_Angabe");
                let kursKontaktperson_Url = t("keine_Angabe");
                let durchfuerungsortRaum = t("keine_Angabe");
                let durchfuerungsort_Adresse = t("keine_Angabe");
                let durchfuerungsort_Adresszusatz1 = t("keine_Angabe");
                let durchfuerungsort_Adresszusatz2 = t("keine_Angabe");
                let durchfuerungsort_Adresszusatz3 = t("keine_Angabe");
                let kursInformationenOrt = t("keine_Angabe");
                let durchfuerungsort_Plz = t("keine_Angabe");
                let durchfuerungsortKinderhuetedienst = t("keine_Angabe");

                let kursKontakt = "";

                if (null != oRow.kursinformationenanbieter && oRow.kursinformationenanbieter !== t("keine_Angabe") && oRow.kursinformationenanbieter !== "") {
                    kursInformationenAnbieter = oRow.kursinformationenanbieter;
                }
                if (null != oRow.kursinformationenkosten && oRow.kursinformationenkosten !== t("keine_Angabe") && oRow.kursinformationenkosten !== "") {
                    kursInformationenKosten = oRow.kursinformationenkosten + " CHF";
                }
                if (null != oRow.kursinformationentag && oRow.kursinformationentag !== t("keine_Angabe") && oRow.kursinformationentag !== "") {
                    kursInformationenTag = oRow.kursinformationentag;
                }
                if (null != oRow.kursinformationenzeit_tagstart && oRow.kursinformationenzeit_tagstart !== t("keine_Angabe") && oRow.kursinformationenzeit_tagstart !== "") {
                    kursInformationenZeit_TagStart = oRow.kursinformationenzeit_tagstart;
                }
                if (null != oRow.kursinformationenzeit_tagende && oRow.kursinformationenzeit_tagende !== t("keine_Angabe") && oRow.kursinformationenzeit_tagende !== "") {
                    kursInformationenZeit_TagEnde = oRow.kursinformationenzeit_tagende;
                }
                if (null != oRow.kursinformationenzeit_zeitstart && oRow.kursinformationenzeit_zeitstart !== t("keine_Angabe") && oRow.kursinformationenzeit_zeitstart !== "") {
                    kursInformationenZeit_ZeitStart = oRow.kursinformationenzeit_zeitstart;
                }
                if (null != oRow.kursinformationenzeit_zeitende && oRow.kursinformationenzeit_zeitende !== t("keine_Angabe") && oRow.kursinformationenzeit_zeitende !== "") {
                    kursInformationenZeit_ZeitEnde = oRow.kursinformationenzeit_zeitende;
                }
                if (null != oRow.kurskontaktperson_name && oRow.kurskontaktperson_name !== t("keine_Angabe") && oRow.kurskontaktperson_name !== "") {
                    kursKontaktperson_Name = oRow.kurskontaktperson_anrede + " " + oRow.kurskontaktperson_name;
                    kursKontakt += kursKontaktperson_Name + "<br>";
                }
                if (null != oRow.kurskontaktperson_telefon && oRow.kurskontaktperson_telefon !== t("keine_Angabe") && oRow.kurskontaktperson_telefon !== "") {
                    kursKontaktperson_Telefon = "<a href=\"tel:" + oRow.kurskontaktperson_telefon + "\" target=\"_blank\">" + oRow.kurskontaktperson_telefon + "</a>";
                    kursKontakt += kursKontaktperson_Telefon + "<br>";
                }
                if (null != oRow.kurskontaktperson_telefon2 && oRow.kurskontaktperson_telefon2 !== t("keine_Angabe") && oRow.kurskontaktperson_telefon2 !== "") {
                    kursKontaktperson_Telefon2 = "<a href=\"tel:" + oRow.kurskontaktperson_telefon2 + "\" target=\"_blank\">" + oRow.kurskontaktperson_telefon2 + "</a>";
                }
                if (null != oRow.kurskontaktperson_mail && oRow.kurskontaktperson_mail !== t("keine_Angabe") && oRow.kurskontaktperson_mail !== "") {
                    kursKontaktperson_Mail = "<a href=\"mailto:" + oRow.kurskontaktperson_mail + "\" target=\"_blank\">" + oRow.kurskontaktperson_mail + "</a>";
                    kursKontakt += kursKontaktperson_Mail + "<br>";
                }
                if (null != oRow.kurskontaktperson_mail2 && oRow.kurskontaktperson_mail2 !== t("keine_Angabe") && oRow.kurskontaktperson_mail2 !== "") {
                    kursKontaktperson_Mail2 = "<a href=\"mailto:" + oRow.kurskontaktperson_mail2 + "\" target=\"_blank\">" + oRow.kurskontaktperson_mail2 + "</a>";
                }
                if (null != oRow.kurskontaktperson_formular && oRow.kurskontaktperson_formular !== t("keine_Angabe") && oRow.kurskontaktperson_formular !== "") {
                    kursKontaktperson_Formular = "<a href=\"" + oRow.kurskontaktperson_formular + "\" target=\"_blank\">" + oRow.kurskontaktperson_formular + "</a>";
                }
                if (null != oRow.kurskontaktperson_url && oRow.kurskontaktperson_url !== t("keine_Angabe") && oRow.kurskontaktperson_url !== "") {
                    kursKontaktperson_Url = "<a href=\"" + oRow.kurskontaktperson_url + "\" target=\"_blank\">" + oRow.kurskontaktperson_url + "</a>";
                }
                if (null != oRow.durchfuerungsortraum && oRow.durchfuerungsortraum !== t("keine_Angabe") && oRow.durchfuerungsortraum !== "") {
                    durchfuerungsortRaum = oRow.durchfuerungsortraum;
                }
                if (null != oRow.durchfuerungsort_adresse && oRow.durchfuerungsort_adresse !== t("keine_Angabe") && oRow.durchfuerungsort_adresse !== "") {
                    durchfuerungsort_Adresse = oRow.durchfuerungsort_adresse;
                    kursInformationenAnbieter += + "<br>" + durchfuerungsort_Adresse + "<br>"
                }
                if (null != oRow.durchfuerungsort_adresszusatz1 && oRow.durchfuerungsort_adresszusatz1 !== t("keine_Angabe") && oRow.durchfuerungsort_adresszusatz1 !== "") {
                    durchfuerungsort_Adresszusatz1 = oRow.durchfuerungsort_adresszusatz1;
                }
                if (null != oRow.durchfuerungsort_adresszusatz2 && oRow.durchfuerungsort_adresszusatz2 !== t("keine_Angabe") && oRow.durchfuerungsort_adresszusatz2 !== "") {
                    durchfuerungsort_Adresszusatz2 = oRow.durchfuerungsort_adresszusatz2;
                }
                if (null != oRow.durchfuerungsort_adresszusatz3 && oRow.durchfuerungsort_adresszusatz3 !== t("keine_Angabe") && oRow.durchfuerungsort_adresszusatz3 !== "") {
                    durchfuerungsort_Adresszusatz3 = oRow.durchfuerungsort_adresszusatz3;
                }
                if (null != oRow.kursinformationenort && oRow.kursinformationenort !== t("keine_Angabe") && oRow.kursinformationenort !== "") {
                    kursInformationenOrt = oRow.kursinformationenort;
                    kursInformationenAnbieter += kursInformationenOrt + "<br>";
                }
                if (null != oRow.durchfuerungsort_plz && oRow.durchfuerungsort_plz !== t("keine_Angabe") && oRow.durchfuerungsort_plz !== "") {
                    durchfuerungsort_Plz = oRow.durchfuerungsort_plz;
                }
                if (null != oRow.durchfuerungsortkinderhuetedienst && oRow.durchfuerungsortkinderhuetedienst !== t("keine_Angabe") && oRow.durchfuerungsortkinderhuetedienst !== "") {
                    durchfuerungsortKinderhuetedienst = oRow.durchfuerungsortkinderhuetedienst;
                }



                conversation.addMessage(t("kurs.gefundenerKurs_Zusatzinformationen", {
                    kursInformationenAnbieter: kursInformationenAnbieter,
                    kursInformationenKosten: kursInformationenKosten,
                    kursKontakt: kursKontakt,
                }), threadName);


                conversation.addQuestion({
                    text: t("kurs.weiterhelefen"),
                    quick_replies: [
                        {
                            title: t('kurs.kursAuswahl'),
                            payload: t('kurs.kursAuswahl'),
                        },
                        {
                            title: t('kurs.weiter_feedback'),
                            payload: t('kurs.weiter_feedback'),
                        },
                    ],
                    disable_input: true
                }, [
                    {
                        default: true,
                        callback: function (res, convo) {
                            try {
                                switch (res.text) {

                                    case t('kurs.kursAuswahl'):
                                        convo.gotoThread("displayGefundeneKurse0");
                                        break;
                                    case t('kurs.weiter_feedback'):
                                        convo.gotoThread("askFeedback");
                                        break;
                                    default:
                                        convo.say(t('nicht_verstanden'));
                                        convo.repeat();
                                        break;
                                }
                            } catch (err) {
                                errorUtil.displayErrorMessage(bot, message, err, false, false);
                            }

                        }
                    }
                ], {}, threadName);

            }

        });

    }
};