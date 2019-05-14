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
                conversation.addMessage(t("kurs.kursInformationen.nicht_in_db_gefunden", {item: t("kurs.kursInformationen.item")}), threadName+"0");
                //conversation.transitionTo(nextThread, t("kurs.kursInformationen.nicht_in_db_gefunden", {item: t("kurs.kursInformationen.altersgruppe.item")}));
            } else {

                let maxQRToDisplay = 1;

                for (let c = 0; c < Math.ceil(rows.length / maxQRToDisplay); c++) {

                    let oRow = rows[c];

                    conversation.addMessage(t("kurs.kursGefunden"), threadName+c);

                    let kursInformationenAnbieter = t("kurs.kursInformationen.keine_angabe");
                    let kursInformationenAltersgruppe = t("kurs.kursInformationen.keine_angabe");
                    let kursInformationenGeschlecht = t("kurs.kursInformationen.keine_angabe");
                    let kursInformationenIntensitaet = t("kurs.kursInformationen.keine_angabe");
                    let kursInformationenKonversation = t("kurs.kursInformationen.keine_angabe");
                    let kursInformationenKosten = t("kurs.kursInformationen.keine_angabe");
                    let kursInformationenNiveau = t("kurs.kursInformationen.keine_angabe");
                    let kursInformationenOrt = t("kurs.kursInformationen.keine_angabe");
                    let kursInformationenTag = t("kurs.kursInformationen.keine_angabe");
                    let kursInformationenZeit_TagStart = t("kurs.kursInformationen.keine_angabe");
                    let kursInformationenZeit_TagEnde = t("kurs.kursInformationen.keine_angabe");
                    let kursInformationenZeit_ZeitStart = t("kurs.kursInformationen.keine_angabe");
                    let kursInformationenZeit_ZeitEnde = t("kurs.kursInformationen.keine_angabe");
                    let kursInformationenZiel = t("kurs.kursInformationen.keine_angabe");
                    let kursInformationenAadressatengruppen = t("kurs.kursInformationen.keine_angabe");

                    if (null != conversation.vars.kursInformationenAnbieter && conversation.vars.kursInformationenAnbieter !== t("kurs.kursInformationen.keine_angabe") && conversation.vars.kursInformationenAnbieter !== "") {
                        kursInformationenAnbieter = conversation.vars.kursInformationenAnbieter;
                    }
                    if (null != conversation.vars.kursInformationenAltersgruppe && conversation.vars.kursInformationenAltersgruppe !== t("kurs.kursInformationen.keine_angabe") && conversation.vars.kursInformationenAltersgruppe !== "") {
                        kursInformationenAltersgruppe = conversation.vars.kursInformationenAltersgruppe;
                    }
                    if (null != conversation.vars.kursInformationenGeschlecht && conversation.vars.kursInformationenGeschlecht !== t("kurs.kursInformationen.keine_angabe") && conversation.vars.kursInformationenGeschlecht !== "") {
                        kursInformationenGeschlecht = conversation.vars.kursInformationenGeschlecht;
                    }
                    if (null != conversation.vars.kursInformationenIntensitaet && conversation.vars.kursInformationenIntensitaet !== t("kurs.kursInformationen.keine_angabe") && conversation.vars.kursInformationenIntensitaet !== "") {
                        kursInformationenIntensitaet = conversation.vars.kursInformationenIntensitaet;
                    }
                    if (null != conversation.vars.kursInformationenKonversation && conversation.vars.kursInformationenKonversation !== t("kurs.kursInformationen.keine_angabe") && conversation.vars.kursInformationenKonversation !== "") {
                        kursInformationenKonversation = conversation.vars.kursInformationenKonversation;
                    }
                    if (null != conversation.vars.kursInformationenKosten && conversation.vars.kursInformationenKosten !== t("kurs.kursInformationen.keine_angabe") && conversation.vars.kursInformationenKosten !== "") {
                        kursInformationenKosten = conversation.vars.kursInformationenKosten;
                    }
                    if (null != conversation.vars.kursInformationenNiveau && conversation.vars.kursInformationenNiveau !== t("kurs.kursInformationen.keine_angabe") && conversation.vars.kursInformationenNiveau !== "") {
                        kursInformationenNiveau = conversation.vars.kursInformationenNiveau;
                    }
                    if (null != conversation.vars.kursInformationenOrt && conversation.vars.kursInformationenOrt !== t("kurs.kursInformationen.keine_angabe") && conversation.vars.kursInformationenOrt !== "") {
                        kursInformationenOrt = conversation.vars.kursInformationenOrt;
                    }
                    if (null != conversation.vars.kursInformationenTag && conversation.vars.kursInformationenTag !== t("kurs.kursInformationen.keine_angabe") && conversation.vars.kursInformationenTag !== "") {
                        kursInformationenTag = conversation.vars.kursInformationenTag;
                    }
                    if (null != conversation.vars.kursInformationenZeit_TagStart && conversation.vars.kursInformationenZeit_TagStart !== t("kurs.kursInformationen.keine_angabe") && conversation.vars.kursInformationenZeit_TagStart !== "") {
                        kursInformationenZeit_TagStart = conversation.vars.kursInformationenZeit_TagStart;
                    }
                    if (null != conversation.vars.kursInformationenZeit_TagEnde && conversation.vars.kursInformationenZeit_TagEnde !== t("kurs.kursInformationen.keine_angabe") && conversation.vars.kursInformationenZeit_TagEnde !== "") {
                        kursInformationenZeit_TagEnde = conversation.vars.kursInformationenZeit_TagEnde;
                    }
                    if (null != conversation.vars.kursInformationenZeit_ZeitStart && conversation.vars.kursInformationenZeit_ZeitStart !== t("kurs.kursInformationen.keine_angabe") && conversation.vars.kursInformationenZeit_ZeitStart !== "") {
                        kursInformationenZeit_ZeitStart = conversation.vars.kursInformationenZeit_ZeitStart;
                    }
                    if (null != conversation.vars.kursInformationenZeit_ZeitEnde && conversation.vars.kursInformationenZeit_ZeitEnde !== t("kurs.kursInformationen.keine_angabe") && conversation.vars.kursInformationenZeit_ZeitEnde !== "") {
                        kursInformationenZeit_ZeitEnde = conversation.vars.kursInformationenZeit_ZeitEnde;
                    }
                    if (null != conversation.vars.kursInformationenZiel && conversation.vars.kursInformationenZiel !== t("kurs.kursInformationen.keine_angabe") && conversation.vars.kursInformationenZiel !== "") {
                        kursInformationenZiel = conversation.vars.kursInformationenZiel;
                    }
                    if (null != conversation.vars.kursInformationenAadressatengruppen && conversation.vars.kursInformationenAadressatengruppen !== t("kurs.kursInformationen.keine_angabe") && conversation.vars.kursInformationenAadressatengruppen !== "") {
                        kursInformationenAadressatengruppen = conversation.vars.kursInformationenAadressatengruppen;
                    }

                    conversation.addMessage(t("kurs.kursGefunden_Informationen", {
                        nummer: (c+1),
                        kursInformationenAnbieter: kursInformationenAnbieter,
                        kursInformationenAltersgruppe: kursInformationenAltersgruppe,
                        kursInformationenGeschlecht: kursInformationenGeschlecht,
                        kursInformationenIntensitaet: kursInformationenIntensitaet,
                        kursInformationenKonversation: kursInformationenKonversation,
                        kursInformationenKosten: kursInformationenKosten,
                        kursInformationenNiveau: kursInformationenNiveau,
                        kursInformationenOrt: kursInformationenOrt,
                        kursInformationenTag: kursInformationenTag,
                        kursInformationenZeit_TagStart: kursInformationenZeit_TagStart,
                        kursInformationenZeit_TagEnde: kursInformationenZeit_TagEnde,
                        kursInformationenZeit_ZeitStart: kursInformationenZeit_ZeitStart,
                        kursInformationenZeit_ZeitEnde: kursInformationenZeit_ZeitEnde,
                        kursInformationenZiel: kursInformationenZiel,
                        kursInformationenAadressatengruppen: kursInformationenAadressatengruppen
                    }));

                    //If navigated to display more, offer button to go back
                    if (c >= 1) {
                        qr.push({title: t("kurs.kursInformationen.zurück"), payload: t("kurs.kursInformationen.zurück")})
                    }

                    qr.push({title: t("gefundeneKurse_Question_QR_Ja"), payload: oRow.id});

                    //If there are more than "maxQRToDisplay" elements, offer to display more.
                    if (c < rows.length-1) {
                        qr.push({title: t("kurs.gefundeneKurse_Question_QR_Nein"), payload: t("kurs.gefundeneKurse_Question_QR_Nein")});
                    }

                    qr.push({title: t("kurs.gefundeneKurse_Question_QR_Infromationen_aendern"), payload: t("kurs.gefundeneKurse_Question_QR_Infromationen_aendern")});

                    conversation.addQuestion({
                        text: t("kurs.gefundeneKurse_Question"),
                        quick_replies: qr
                    }, [
                        {
                            default: true,
                            callback: function (res, conversation) {

                                try {

                                    switch (res.text) {

                                        case res.text === t("kurs.kursInformationen.zurück"):
                                            //Go to thread with previous options
                                            conversation.gotoThread(threadName + (c - 1));
                                            break;
                                        case !isNaN(res.text):
                                            gefundeneKurse.displayKursContactInfo(bot, message, conversation, luisUtil, "displayFoundKursContactInformation", "askFeedback", res.text);

                                            // continue to next thread
                                            if (nextThread !== "None") {
                                                conversation.gotoThread(nextThread);
                                            } else {
                                                conversation.next();
                                            }

                                            break;
                                        case res.text === t("kurs.gefundeneKurse_Question_QR_Nein"):
                                            //Go to thread with next options
                                            conversation.gotoThread(threadName + (c + 1));
                                            break;
                                        case res.text === t("kurs.gefundeneKurse_Question_QR_Infromationen_aendern"):
                                            conversation.gotoThread("correctInfromation");
                                            break;
                                        default:
                                            conversation.transitionTo(threadName+c, t("nicht_verstanden"));
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

        convo.gotoThread(threadName+"0")

    },

    displayKursContactInfo: function (bot, message, convo, luisUtil, threadName, nextThread = "None", id) {

        const {t} = require('../../../node_modules/localizify');
        const logUtil = require("../../../util/logUtil");
        const errorUtil = require("../../../util/errorUtil");
        const kursHelper = require('../../../util/helper/kursHelper');

        convo.addQuestion({
            text: t("kurs.gefundenerKurs_Auswahl"),
            quick_replies: [
                {
                    title: t('gefundeneKurse_Question_QR_Ja'),
                    payload: t('gefundeneKurse_Question_QR_Ja'),
                },
                {
                    title: t('gefundeneKurse_Question_QR_Infromationen_aendern'),
                    payload: t('gefundeneKurse_Question_QR_Infromationen_aendern'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {
                    try {
                        switch (res.text) {

                            case t('gefundeneKurse_Question_QR_Ja'):
                                convo.next();
                                break;
                            case t('gefundeneKurse_Question_QR_Infromationen_aendern'):
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

            logUtil.debug("All Altersgruppe to display in Convo: " + JSON.stringify(rows));

            if (rows.length === 0) {
                conversation.addMessage(t("kurs.kursInformationen.nicht_in_db_gefunden", {item: t("kurs.kursInformationen.item")}), nextThread);
            } else {

                let maxQRToDisplay = 1;

                for (let c = 0; c < Math.ceil(rows.length / maxQRToDisplay); c++) {

                    let oRow = rows[c];

                    conversation.addMessage(t("kurs.kursGefunden"), threadName);


                    let kursInformationenAnbieter= ("keine_angabe");
                    let kursInformationenKosten= ("keine_angabe");
                    let kursInformationenTag= ("keine_angabe");
                    let kursInformationenZeit_TagStart= ("keine_angabe");
                    let kursInformationenZeit_TagEnde= ("keine_angabe");
                    let kursInformationenZeit_ZeitStart= ("keine_angabe");
                    let kursInformationenZeit_ZeitEnde= ("keine_angabe");
                    let kursKontaktperson_Name= ("keine_angabe");
                    let kursKontaktperson_Telefon= ("keine_angabe");
                    let kursKontaktperson_Telefon2= ("keine_angabe");
                    let kursKontaktperson_Mail= ("keine_angabe");
                    let kursKontaktperson_Mail2= ("keine_angabe");
                    let kursKontaktperson_Formular= ("keine_angabe");
                    let kursKontaktperson_Url= ("keine_angabe");
                    let durchfuerungsortRaum= ("keine_angabe");
                    let durchfuerungsort_Adresse= ("keine_angabe");
                    let durchfuerungsort_Adresszusatz1= ("keine_angabe");
                    let durchfuerungsort_Adresszusatz2= ("keine_angabe");
                    let durchfuerungsort_Adresszusatz3= ("keine_angabe");
                    let kursInformationenOrt= ("keine_angabe");
                    let durchfuerungsort_Plz= ("keine_angabe");
                    let durchfuerungsortKinderhuetedienst= ("keine_angabe");

                    if (null != oRow.kursinformationenanbieter && oRow.kursinformationenanbieter !== t("kurs.kursInformationen.keine_angabe") && oRow.kursinformationenanbieter !== "") {
                        kursInformationenAnbieter = oRow.kursinformationenanbieter;
                    }
                    if (null != oRow.kursinformationenkosten && oRow.kursinformationenkosten !== t("kurs.kursInformationen.keine_angabe") && oRow.kursinformationenkosten !== "") {
                        kursInformationenKosten = oRow.kursinformationenkosten + " CHF";
                    }
                    if (null != oRow.kursinformationentag && oRow.kursinformationentag !== t("kurs.kursInformationen.keine_angabe") && oRow.kursinformationentag !== "") {
                        kursInformationenTag = oRow.kursinformationentag;
                    }
                    if (null != oRow.kursinformationenzeit_tagstart && oRow.kursinformationenzeit_tagstart !== t("kurs.kursInformationen.keine_angabe") && oRow.kursinformationenzeit_tagstart !== "") {
                        kursInformationenZeit_TagStart = oRow.kursinformationenzeit_tagstart;
                    }
                    if (null != oRow.kursinformationenzeit_tagende && oRow.kursinformationenzeit_tagende !== t("kurs.kursInformationen.keine_angabe") && oRow.kursinformationenzeit_tagende !== "") {
                        kursInformationenZeit_TagEnde = oRow.kursinformationenzeit_tagende;
                    }
                    if (null != oRow.kursinformationenzeit_zeitstart && oRow.kursinformationenzeit_zeitstart !== t("kurs.kursInformationen.keine_angabe") && oRow.kursinformationenzeit_zeitstart !== "") {
                        kursInformationenZeit_ZeitStart = oRow.kursinformationenzeit_zeitstart;
                    }
                    if (null != oRow.kursinformationenzeit_zeitende && oRow.kursinformationenzeit_zeitende !== t("kurs.kursInformationen.keine_angabe") && oRow.kursinformationenzeit_zeitende !== "") {
                        kursInformationenZeit_ZeitEnde = oRow.kursinformationenzeit_zeitende;
                    }
                    if (null != oRow.kurskontaktperson_name && oRow.kurskontaktperson_name !== t("kurs.kursInformationen.keine_angabe") && oRow.kurskontaktperson_name !== "") {
                        kursKontaktperson_Name = oRow.kurskontaktperson_anrede + " " + oRow.kurskontaktperson_name;
                    }
                    if (null != oRow.kurskontaktperson_telefon && oRow.kurskontaktperson_telefon !== t("kurs.kursInformationen.keine_angabe") && oRow.kurskontaktperson_telefon !== "") {
                        kursKontaktperson_Telefon = "<a href=\"tel:" + oRow.kurskontaktperson_telefon + "\">" + oRow.kurskontaktperson_telefon + "<a>";
                    }
                    if (null != oRow.kurskontaktperson_telefon2 && oRow.kurskontaktperson_telefon2 !== t("kurs.kursInformationen.keine_angabe") && oRow.kurskontaktperson_telefon2 !== "") {
                        kursKontaktperson_Telefon2 = "<a href=\"tel:" + oRow.kurskontaktperson_telefon2 + "\">" + oRow.kurskontaktperson_telefon2 + "<a>";
                    }
                    if (null != oRow.kurskontaktperson_mail && oRow.kurskontaktperson_mail !== t("kurs.kursInformationen.keine_angabe") && oRow.kurskontaktperson_mail !== "") {
                        kursKontaktperson_Mail = "<a href=\"mailto:" + oRow.kurskontaktperson_mail + "\">" + oRow.kurskontaktperson_mail + "<a>";
                    }
                    if (null != oRow.kurskontaktperson_mail2 && oRow.kurskontaktperson_mail2 !== t("kurs.kursInformationen.keine_angabe") && oRow.kurskontaktperson_mail2 !== "") {
                        kursKontaktperson_Mail2 = "<a href=\"mailto:" + oRow.kurskontaktperson_mail2 + "\">" + oRow.kurskontaktperson_mail2 + "<a>";
                    }
                    if (null != oRow.kurskontaktperson_formular && oRow.kurskontaktperson_formular !== t("kurs.kursInformationen.keine_angabe") && oRow.kurskontaktperson_formular !== "") {
                        kursKontaktperson_Formular = "<a href=\"" + oRow.kurskontaktperson_formular + "\">" + oRow.kurskontaktperson_formular + "<a>";
                    }
                    if (null != oRow.kurskontaktperson_url && oRow.kurskontaktperson_url !== t("kurs.kursInformationen.keine_angabe") && oRow.kurskontaktperson_url !== "") {
                        kursKontaktperson_Url = "<a href=\"" + oRow.kurskontaktperson_url + "\">" + oRow.kurskontaktperson_url + "<a>";
                    }
                    if (null != oRow.durchfuerungsortraum && oRow.durchfuerungsortraum !== t("kurs.kursInformationen.keine_angabe") && oRow.durchfuerungsortraum !== "") {
                        durchfuerungsortRaum = oRow.durchfuerungsortraum;
                    }
                    if (null != oRow.durchfuerungsort_adresse && oRow.durchfuerungsort_adresse !== t("kurs.kursInformationen.keine_angabe") && oRow.durchfuerungsort_adresse !== "") {
                        durchfuerungsort_Adresse = oRow.durchfuerungsort_adresse;
                    }
                    if (null != oRow.durchfuerungsort_adresszusatz1 && oRow.durchfuerungsort_adresszusatz1 !== t("kurs.kursInformationen.keine_angabe") && oRow.durchfuerungsort_adresszusatz1 !== "") {
                        durchfuerungsort_Adresszusatz1 = oRow.durchfuerungsort_adresszusatz1;
                    }
                    if (null != oRow.durchfuerungsort_adresszusatz2 && oRow.durchfuerungsort_adresszusatz2 !== t("kurs.kursInformationen.keine_angabe") && oRow.durchfuerungsort_adresszusatz2 !== "") {
                        durchfuerungsort_Adresszusatz2 = oRow.durchfuerungsort_adresszusatz2;
                    }
                    if (null != oRow.durchfuerungsort_adresszusatz3 && oRow.durchfuerungsort_adresszusatz3 !== t("kurs.kursInformationen.keine_angabe") && oRow.durchfuerungsort_adresszusatz3 !== "") {
                        durchfuerungsort_Adresszusatz3 = oRow.durchfuerungsort_adresszusatz3;
                    }
                    if (null != oRow.kursinformationenort && oRow.kursinformationenort !== t("kurs.kursInformationen.keine_angabe") && oRow.kursinformationenort !== "") {
                        kursInformationenOrt = oRow.kursinformationenort;
                    }
                    if (null != oRow.durchfuerungsort_plz && oRow.durchfuerungsort_plz !== t("kurs.kursInformationen.keine_angabe") && oRow.durchfuerungsort_plz !== "") {
                        durchfuerungsort_Plz = oRow.durchfuerungsort_plz;
                    }
                    if (null != oRow.durchfuerungsortkinderhuetedienst && oRow.durchfuerungsortkinderhuetedienst !== t("kurs.kursInformationen.keine_angabe") && oRow.durchfuerungsortkinderhuetedienst !== "") {
                        durchfuerungsortKinderhuetedienst = oRow.durchfuerungsortkinderhuetedienst;
                    }


                    conversation.addMessage(t("kurs.gefundenerKurs_Zusatzinformationen", {
                        kursInformationenAnbieter: kursInformationenAnbieter,
                        kursInformationenKosten: kursInformationenKosten,
                        kursInformationenTag: kursInformationenTag,
                        kursInformationenZeit_TagStart: kursInformationenZeit_TagStart,
                        kursInformationenZeit_TagEnde: kursInformationenZeit_TagEnde,
                        kursInformationenZeit_ZeitStart: kursInformationenZeit_ZeitStart,
                        kursInformationenZeit_ZeitEnde: kursInformationenZeit_ZeitEnde,
                        kursKontaktperson_Name: kursKontaktperson_Name,
                        kursKontaktperson_Telefon: kursKontaktperson_Telefon,
                        kursKontaktperson_Telefon2: kursKontaktperson_Telefon2,
                        kursKontaktperson_Mail: kursKontaktperson_Mail,
                        kursKontaktperson_Mail2: kursKontaktperson_Mail2,
                        kursKontaktperson_Formular: kursKontaktperson_Formular,
                        kursKontaktperson_Url: kursKontaktperson_Url,
                        durchfuerungsortRaum: durchfuerungsortRaum,
                        durchfuerungsort_Adresse: durchfuerungsort_Adresse,
                        kursInformationenOrt: kursInformationenOrt,
                        durchfuerungsort_Plz: durchfuerungsort_Plz,
                        durchfuerungsortKinderhuetedienst: durchfuerungsortKinderhuetedienst,
                    }));

                    // continue to next thread
                    if (nextThread !== "None") {
                        conversation.gotoThread(nextThread);
                    } else {
                        conversation.next();
                    }

                }

            }
        });

    }
};