module.exports = {
    displayGefundeneKurse: function (bot, message, convo, luisUtil, threadName, nextThread = "None") {

        const pgUtil = require("../../../util/pgUtil");
        const {t} = require('../../../node_modules/localizify');
        const logUtil = require("../../../util/logUtil");
        const timeUtil = require("../../../util/timeUtil");
        const errorUtil = require("../../../util/errorUtil");
        const kursHelper = require('../../../util/helper/kursHelper');
        const gefundeneKurse = this;

        kursHelper.getMatchedKurseFromDB(bot, message, convo, luisUtil, nextThread, function (conversation, rows) {

            logUtil.debug("All Altersgruppe to display in Convo: " + JSON.stringify(rows));

            if (rows.length === 0) {
                conversation.addMessage(t("kurs.kursInformationen.nicht_in_db_gefunden", {item: t("kurs.kursInformationen.altersgruppe.item")}), threadName+"0");
                //conversation.transitionTo(nextThread, t("kurs.kursInformationen.nicht_in_db_gefunden", {item: t("kurs.kursInformationen.altersgruppe.item")}));
            } else {

                let maxQRToDisplay = 1;

                for (let c = 0; c < Math.ceil(rows.length / maxQRToDisplay); c++) {

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

                    if (null != conversation.vars.kursInformationenAnbieter && conversation.vars.kursInformationenAnbieter !== "None" && conversation.vars.kursInformationenAnbieter !== "") {
                        kursInformationenAnbieter = conversation.vars.kursInformationenAnbieter;
                    }
                    if (null != conversation.vars.kursInformationenAltersgruppe && conversation.vars.kursInformationenAltersgruppe !== "None" && conversation.vars.kursInformationenAltersgruppe !== "") {
                        kursInformationenAltersgruppe = conversation.vars.kursInformationenAltersgruppe;
                    }
                    if (null != conversation.vars.kursInformationenGeschlecht && conversation.vars.kursInformationenGeschlecht !== "None" && conversation.vars.kursInformationenGeschlecht !== "") {
                        kursInformationenGeschlecht = conversation.vars.kursInformationenGeschlecht;
                    }
                    if (null != conversation.vars.kursInformationenIntensitaet && conversation.vars.kursInformationenIntensitaet !== "None" && conversation.vars.kursInformationenIntensitaet !== "") {
                        kursInformationenIntensitaet = conversation.vars.kursInformationenIntensitaet;
                    }
                    if (null != conversation.vars.kursInformationenKonversation && conversation.vars.kursInformationenKonversation !== "None" && conversation.vars.kursInformationenKonversation !== "") {
                        kursInformationenKonversation = conversation.vars.kursInformationenKonversation;
                    }
                    if (null != conversation.vars.kursInformationenKosten && conversation.vars.kursInformationenKosten !== "None" && conversation.vars.kursInformationenKosten !== "") {
                        kursInformationenKosten = conversation.vars.kursInformationenKosten;
                    }
                    if (null != conversation.vars.kursInformationenNiveau && conversation.vars.kursInformationenNiveau !== "None" && conversation.vars.kursInformationenNiveau !== "") {
                        kursInformationenNiveau = conversation.vars.kursInformationenNiveau;
                    }
                    if (null != conversation.vars.kursInformationenOrt && conversation.vars.kursInformationenOrt !== "None" && conversation.vars.kursInformationenOrt !== "") {
                        kursInformationenOrt = conversation.vars.kursInformationenOrt;
                    }
                    if (null != conversation.vars.kursInformationenTag && conversation.vars.kursInformationenTag !== "None" && conversation.vars.kursInformationenTag !== "") {
                        kursInformationenTag = conversation.vars.kursInformationenTag;
                    }
                    if (null != conversation.vars.kursInformationenZeit_TagStart && conversation.vars.kursInformationenZeit_TagStart !== "None" && conversation.vars.kursInformationenZeit_TagStart !== "") {
                        kursInformationenZeit_TagStart = conversation.vars.kursInformationenZeit_TagStart;
                    }
                    if (null != conversation.vars.kursInformationenZeit_TagEnde && conversation.vars.kursInformationenZeit_TagEnde !== "None" && conversation.vars.kursInformationenZeit_TagEnde !== "") {
                        kursInformationenZeit_TagEnde = conversation.vars.kursInformationenZeit_TagEnde;
                    }
                    if (null != conversation.vars.kursInformationenZeit_ZeitStart && conversation.vars.kursInformationenZeit_ZeitStart !== "None" && conversation.vars.kursInformationenZeit_ZeitStart !== "") {
                        kursInformationenZeit_ZeitStart = conversation.vars.kursInformationenZeit_ZeitStart;
                    }
                    if (null != conversation.vars.kursInformationenZeit_ZeitEnde && conversation.vars.kursInformationenZeit_ZeitEnde !== "None" && conversation.vars.kursInformationenZeit_ZeitEnde !== "") {
                        kursInformationenZeit_ZeitEnde = conversation.vars.kursInformationenZeit_ZeitEnde;
                    }
                    if (null != conversation.vars.kursInformationenZiel && conversation.vars.kursInformationenZiel !== "None" && conversation.vars.kursInformationenZiel !== "") {
                        kursInformationenZiel = conversation.vars.kursInformationenZiel;
                    }
                    if (null != conversation.vars.kursInformationenAadressatengruppen && conversation.vars.kursInformationenAadressatengruppen !== "None" && conversation.vars.kursInformationenAadressatengruppen !== "") {
                        kursInformationenAadressatengruppen = conversation.vars.kursInformationenAadressatengruppen;
                    }

                    conversation.addMessage(t("kursGefunden_Informationen", {
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

                    qr.push({title: t("gefundeneKurse_Question_QR_Ja"), payload: rows.id});

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
                                        case res.text === t("kurs.gefundeneKurse_Question_QR_Ja"):
                                            gefundeneKurse.displayKursContactInfo(bot, message, conversation, luisUtil, "displayFoundKursContactInformation", "askFeedback");
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

    },

    displayKursContactInfo: function (bot, message, convo, luisUtil, threadName, nextThread = "None") {

    },

    displayKurs: function (bot, message, convo) {

        const pgUtil = require("../../../util/pgUtil");
        const {t} = require('../../../node_modules/localizify');
        const logUtil = require("../../../util/logUtil");
        const timeUtil = require("../../../util/timeUtil");

        let pgQuery = this.prepareKursQuery(bot, message, convo, maxKurse, offsetKurse);

        //Connect to DB
        /////////////////////////////
        const pgClient = pgUtil.getDB();
        pgClient.connect();

        // Execute Query and return res
        /////////////////////////////
        pgClient.query(pgQuery,
            (err, res) => {
                if (err) throw new Error(err.stack);

                pgClient.end();

                logUtil.debug("Display Kurs Informationen DB Response:");
                logUtil.debug(JSON.stringify(res));

                if (res.rows.length > 0) {
                    addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kurs_Informationen_Gefunden'));
                } else {
                    addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kurs_Informationen_nicht_Gefunden'));
                    convo.setVar("offsetKurse", 0);
                    convo.gotoThread("kursNotwendigeInfosMenu");
                }

                var oRow = res.rows[0];

                if (oRow) {

                    if (oRow.kurs_beschreibung != null && oRow.kurs_beschreibung !== "") {
                        addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursBeschreibung', {kursBeschreibung: oRow.kurs_beschreibung}));
                    }

                    if (oRow.zweck != null && oRow.zweck !== "") {
                        addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursZweck', {kursZweck: oRow.zweck}));
                    }

                    if (oRow.tag_nummer != null && oRow.tag_nummer > 0) {
                        addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursTag_Datum', {
                            kursTag: timeUtil.getDayNameFromNumber(oRow.tag_nummer),
                            kursDatum: timeUtil.formatDate(oRow.tag)
                        }));
                    }

                    if (oRow.start_zeit != null && oRow.start_zeit !== "" && oRow.end_zeit != null && oRow.end_zeit !== "") {
                        addMessage(t('kurs.gefundeneKurse.kursGefundeneKurse.kurs_Zeit', {
                            einzelkursstart: oRow.start_zeit,
                            einzelkursende: oRow.end_zeit
                        }));
                    }

                    if (oRow.durchfuerungsort_strasse != null && oRow.durchfuerungsort_strasse !== "") {
                        addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursOrt', {
                            ortStrasse: oRow.durchfuerungsort_strasse,
                            ortPlz: oRow.durchfuerungsort_plz,
                            ortName: oRow.durchfuerungsort_ort
                        }));

                    }

                    if (oRow.anbieter_offizieller_name != null && oRow.anbieter_offizieller_name !== "") {

                        addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursAnbieter', {kursAnbieter: oRow.anbieter_offizieller_name}));

                        if (oRow.anbieter_mail != null && oRow.anbieter_mail !== "") {
                            addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursAnbieter_Mail', {kursAnbieter_Mail: oRow.anbieter_mail}));
                        }
                        if (oRow.anbieter_telefon != null && oRow.anbieter_telefon !== "") {
                            addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursAnbieter_Telefon', {kursAnbieter_Telefon: oRow.anbieter_telefon}));
                        }
                        if (oRow.anbieter_url != null && oRow.anbieter_url !== "") {
                            addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursAnbieter_Website', {kursAnbieter_Website: oRow.anbieter_url}));
                        }
                        if (oRow.kontaktperson_name != null && oRow.kontaktperson_name !== "") {
                            let kpName = oRow.kontaktperson_anrede + " " + oRow.kontaktperson_name + " " + oRow.kontaktperson_vorname;
                            addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursKontaktperson', {
                                kursKontaktperson_Name: kpName,
                                kursKontaktperson_Telefon: oRow.kontaktperson_telefon
                            }));
                        }
                    }
                }

                if (res.rows.length > 0) {
                    convo.gotoThread("askFeedback");
                }

            });
    }
};