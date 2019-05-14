module.exports = {

    kursSuchen: function (convo, message, bot) {

        //*********************************
        // THIS WILL THROW AN UNCAUGHT ERROR
        //*********************************

        // try {
        //     var fs = require('fs');
        //
        //     fs.readFile('somefile.txt', function (err, data) {
        //         if (err) throw err;
        //         console.log(data);
        //     });
        // } catch (err) {
        //     require("../../util/errorUtil").displayErrorMessage(bot, message, convo, err, false, false);
        // }


        //*********************************
        // THIS WILL THROW AN UNCAUGHT ERROR
        //*********************************


        //********************************
        // Helpers
        //********************************

        const {t} = require('../../node_modules/localizify');
        const logUtil = require("../../util/logUtil");
        const luisUtil = require("../../util/luisUtil");
        const errorUtil = require("../../util/errorUtil");

        //********************************
        // Required Threads
        //********************************

        //Person
        const personSprache = require("./personInformationen/personSprache");
        const personGeschlecht = require("./personInformationen/personGeschlecht");
        const personAltersgruppe = require("./personInformationen/personAltersgruppe");
        const personKind = require("./personInformationen/personKind");

        //Kurs
        const kursIntensitaet = require("./kursInformationen/kursIntensitaet");
        const kursNiveau = require("./kursInformationen/kursNiveau");
        const kursAltersgruppe = require("./kursInformationen/kursAltersgruppe");
        const kursGeschlecht = require("./kursInformationen/kursGeschlecht");
        const kursKonversation = require("./kursInformationen/kursKonversation");
        const kursKosten = require("./kursInformationen/kursKosten");
        const kursOrt = require("./kursInformationen/kursOrt");
        const kursTag = require("./kursInformationen/kursTag");
        const kursZeit = require("./kursInformationen/kursZeit");
        const kursZiel = require("./kursInformationen/kursZiel");
        const kursAnbieter = require("./kursInformationen/kursAnbieter");
        const gefundeneKurse = require("./gefundeneKurse/kursGefundeneKurse");

        //********************************
        // Initialize Conversation
        //********************************

        //Person - Initial
        personSprache.askPersonSprache(bot, message, convo, luisUtil, "askPersonInitialSprache", "askPersonInitialGeschlecht0");
        personGeschlecht.askPersonGeschlecht(bot, message, convo, luisUtil, "askPersonInitialGeschlecht", "askPersonInitialAltersgruppe0");
        personAltersgruppe.askPersonAltersgruppe(bot, message, convo, luisUtil, "askPersonInitialAltersgruppe", "askPersonInitialKind0");
        personKind.askPersonKind(bot, message, convo, luisUtil, "askPersonInitialKind", "askKursInitialIntensitaet0");

        //Person - Correct
        personSprache.askPersonSprache(bot, message, convo, luisUtil, "correctPersonSprache", "kursSuchen_Menu");
        personGeschlecht.askPersonGeschlecht(bot, message, convo, luisUtil, "correctPersonGeschlecht", "kursSuchen_Menu");
        personAltersgruppe.askPersonAltersgruppe(bot, message, convo, luisUtil, "correctPersonAltersgruppe", "kursSuchen_Menu");
        personKind.askPersonKind(bot, message, convo, luisUtil, "correctPersonKind", "kursSuchen_Menu");

        //Kurs - Initial
        kursIntensitaet.askKursIntensitaet(bot, message, convo, luisUtil, "askKursInitialIntensitaet", "askKursInitialNiveau0");
        kursNiveau.askKursNiveau(bot, message, convo, luisUtil, "askKursInitialNiveau", "askKursInitialAltersgruppe0");
        kursAltersgruppe.askKursAltersgruppe(bot, message, convo, luisUtil, "askKursInitialAltersgruppe", "askKursInitialGeschlecht0");
        kursGeschlecht.askKursGeschlecht(bot, message, convo, luisUtil, "askKursInitialGeschlecht", "askKursInitialKonversation0");
        kursKonversation.askKursKonversation(bot, message, convo, luisUtil, "askKursInitialKonversation", "askKursInitialKosten0");
        kursKosten.askKursKosten(bot, message, convo, luisUtil, "askKursInitialKosten", "askKursInitialOrt0");
        kursOrt.askKursOrt(bot, message, convo, luisUtil, "askKursInitialOrt", "askKursInitialTag0");
        kursTag.askKursTag(bot, message, convo, luisUtil, "askKursInitialTag", "askKursInitialZeit0");
        kursZeit.askKursZeit(bot, message, convo, luisUtil, "askKursInitialZeit", "askKursInitialZiel0");
        kursZiel.askKursZiel(bot, message, convo, luisUtil, "askKursInitialZiel", "askKursInitialAnbieter0");
        kursAnbieter.askKursAnbieter(bot, message, convo, luisUtil, "askKursInitialAnbieter", "kursSuchen_Menu");

        //Kurs - Correct
        kursIntensitaet.askKursIntensitaet(bot, message, convo, luisUtil, "correctKursIntensitaet", "kursSuchen_Menu");
        kursNiveau.askKursNiveau(bot, message, convo, luisUtil, "correctKursNiveau", "kursSuchen_Menu");
        kursAltersgruppe.askKursAltersgruppe(bot, message, convo, luisUtil, "correctKursAltersgruppe", "kursSuchen_Menu");
        kursGeschlecht.askKursGeschlecht(bot, message, convo, luisUtil, "correctKursGeschlecht", "kursSuchen_Menu");
        kursKonversation.askKursKonversation(bot, message, convo, luisUtil, "correctKursKonversation", "kursSuchen_Menu");
        kursKosten.askKursKosten(bot, message, convo, luisUtil, "correctKursKosten", "kursSuchen_Menu");
        kursOrt.askKursOrt(bot, message, convo, luisUtil, "correctKursOrt", "kursSuchen_Menu");
        kursTag.askKursTag(bot, message, convo, luisUtil, "correctKursTag", "kursSuchen_Menu");
        kursZeit.askKursZeit(bot, message, convo, luisUtil, "correctKursZeit", "kursSuchen_Menu");
        kursZiel.askKursZiel(bot, message, convo, luisUtil, "correctKursZiel", "kursSuchen_Menu");
        kursAnbieter.askKursAnbieter(bot, message, convo, luisUtil, "correctKursAnbieter", "kursSuchen_Menu");


        //********************************
        // Initialize Conversation Variables
        //********************************

        try {
            //Variablen zur Suche eines Deutschkurses die in der Conversation ausfindig gemacht werden müssen
            let aVars = ["kursInformationenAltersgruppe",
                "kursInformationenAnbieter",
                "kursInformationenGeschlecht",
                "kursInformationenIntensitaet",
                "kursInformationenKonversation",
                "kursInformationenKosten",
                "kursInformationenNiveau",
                "kursInformationenOrt",
                "kursInformationenTag",
                "kursInformationenZeit",
                "kursInformationenZiel",
                "personAltersgruppe",
                "personGeschlecht",
                "personKind",
                "personSprache"];

            for (var x = 0; x < aVars.length; x++) {

                let aEntity = luisUtil.getEntityFromLuisResponse(aVars[x], message);

                if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                    logUtil.debug("Initialize var " + aVars[x] + " with value to '" + t("keine_Angabe") + "'");
                    convo.setVar(aVars[x], t("keine_Angabe"));
                } else {
                    if (aEntity[1]) {
                        convo.setVar(aVars[x], aEntity[1]);
                        logUtil.debug(aVars[x] + " = " + aEntity[1]);
                    } else {
                        convo.setVar(aVars[x], aEntity[0]);
                        logUtil.debug(aVars[x] + " = " + aEntity[0]);
                    }
                }
            }

            convo.setVar("limitKursAltersgruppe", 5);
            convo.setVar("limitKursAnbieter", 5);
            convo.setVar("limitKursGeschlecht", 5);
            convo.setVar("limitKursIntensitaet", 5);
            convo.setVar("limitKursKonversation", 5);
            convo.setVar("limitKursKosten", 5);
            convo.setVar("limitKursNiveau", 5);
            convo.setVar("limitKursOrt", 5);
            convo.setVar("limitKursTag", 5);
            convo.setVar("limitKursZeit", 5);
            convo.setVar("limitKursZiel", 5);
            convo.setVar("limitPersonAltersgruppe", 5);
            convo.setVar("limitPersonGeschlecht", 5);
            convo.setVar("limitPersonKind", 5);
            convo.setVar("limitPersonSprache", 5);

        } catch (err) {
            errorUtil.displayErrorMessage(bot, message, err, false, false);
        }

        //********************************
        // Start Conversation Flow
        //********************************

        //Initial Message
        //////////////////////////////////
        convo.addMessage(t('kurs.kursSuchen'), "initialMessage");
        convo.addQuestion({
            text: t('kurs.kursSuchen_Personen_Daten'),
            quick_replies: [
                {
                    title: t('kurs.kursSuchen_Personen_Daten_Ja'),
                    payload: t('kurs.kursSuchen_Personen_Daten_Ja'),
                },
                {
                    title: t('kurs.kursSuchen_Personen_Daten_Nein'),
                    payload: t('kurs.kursSuchen_Personen_Daten_Nein'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try {
                        switch (res.text) {

                            case t('kurs.kursSuchen_Personen_Daten_Ja'):
                                convo.gotoThread("askPersonInitialSprache0");
                                convo.next();
                                break;
                            case t('kurs.kursSuchen_Personen_Daten_Nein'):
                                convo.gotoThread("askKursInitialIntensitaet0");
                                convo.next();
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
        ], {}, "initialMessage");

        //Kurs Suche Menu
        //////////////////////////////////
        convo.addMessage(t('kurs.kursSuchen_Menu', {
            kursInformationenAltersgruppe: "{{vars.kursInformationenAltersgruppe}}",
            kursInformationenAnbieter: "{{vars.kursInformationenAnbieter}}",
            kursInformationenGeschlecht: "{{vars.kursInformationenGeschlecht}}",
            kursInformationenIntensitaet: "{{vars.kursInformationenIntensitaet}}",
            kursInformationenKonversation: "{{vars.kursInformationenKonversation}}",
            kursInformationenKosten: "{{vars.kursInformationenKosten}}",
            kursInformationenNiveau: "{{vars.kursInformationenNiveau}}",
            kursInformationenOrt: "{{vars.kursInformationenOrt}}",
            kursInformationenTag: "{{vars.kursInformationenTag}}",
            kursInformationenZeit: "{{vars.kursInformationenZeit}}",
            kursInformationenZiel: "{{vars.kursInformationenZiel}}",
            personAltersgruppe: "{{vars.personAltersgruppe}}",
            personGeschlecht: "{{vars.personGeschlecht}}",
            personKind: "{{vars.personKind}}",
            personSprache: "{{vars.personSprache}}"
        }), 'kursSuchen_Menu');

        convo.addQuestion({
            text: t('kurs.kursSuchen_Menu_Question'),
            quick_replies: [
                {
                    title: t('ja'),
                    payload: t('ja'),
                },
                {
                    title: t('kurs.kursSuchen_Menu_Question_Question_Qr_Nein'),
                    payload: t('kurs.kursSuchen_Menu_Question_Question_Qr_Nein'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try {
                        switch (res.text) {

                            case t('ja'):

                                gefundeneKurse.displayGefundeneKurse(bot, message,convo,luisUtil,"displayGefundeneKurse", "displayFoundKursContactInformation");

                                convo.gotoThread("displayGefundeneKurse0");
                                convo.next();
                                break;
                            case t('kurs.kursSuchen_Menu_Question_Question_Qr_Nein'):
                                convo.gotoThread("correctInfromation");
                                convo.next();
                                break;
                            default:
                                convo.addMessage(t('nicht_verstanden'));
                                convo.repeat();
                                break;
                        }
                    } catch (err) {
                        errorUtil.displayErrorMessage(bot, message, err, false, false);
                    }

                }
            }
        ], {}, "kursSuchen_Menu");


        // Correct Information
        //////////////////////////////////
        convo.addQuestion({
            text: t('informationen_korrigieren'),
            quick_replies: [
                {
                    title: t('informationen_korrigieren_person'),
                    payload: t('informationen_korrigieren_person'),
                },
                {
                    title: t('informationen_korrigieren_kurs'),
                    payload: t('informationen_korrigieren_kurs'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try {
                        switch (res.text) {

                            case t('informationen_korrigieren_person'):
                                convo.gotoThread("correctInfromation_person");
                                convo.next();
                                break;
                            case t('informationen_korrigieren_kurs'):
                                convo.gotoThread("correctInfromation_kurs");
                                convo.next();
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
        ], {}, "correctInfromation");

        // Correct Information - Person
        //////////////////////////////////
        let qr_correct_person = [];
        qr_correct_person.push({title: t("person.personSprache"), payload: t("person.personSprache")});
        qr_correct_person.push({title: t("person.personGeschlecht"), payload: t("person.personGeschlecht")});
        qr_correct_person.push({title: t("person.personAltersgruppe"), payload: t("person.personAltersgruppe")});
        qr_correct_person.push({title: t("person.personKinder"), payload: t("person.personKinder")});
        qr_correct_person.push({title: t("person.keine_Aenderung"), payload: t("person.keine_Aenderung")});

        convo.addQuestion({
            text: t('kurs.correctNeccessaryInfromation_Question'),
            quick_replies: qr_correct_person
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try {
                        switch (res.text) {

                            case t('person.personSprache'):
                                convo.gotoThread("correctPersonSprache0");
                                break;
                            case t('person.personGeschlecht'):
                                convo.gotoThread("correctPersonGeschlecht0");
                                break;
                            case t('person.personAltersgruppe'):
                                convo.gotoThread("correctPersonAltersgruppe0");
                                break;
                            case t('person.personKinder'):
                                convo.gotoThread("correctPersonKinder0");
                                break;
                            case t('person.keine_Aenderung'):
                                convo.gotoThread("kursSuchen_Menu");
                                break;
                            default:
                                convo.addMessage(t('nicht_verstanden'));
                                convo.repeat();
                                break;
                        }
                    } catch (err) {
                        errorUtil.displayErrorMessage(bot, message, err, false, false);
                    }

                }
            }
        ], {}, "correctInfromation_person");

        // Correct Information - Kurs
        //////////////////////////////////
        let qr_correct_kurs = [];
        qr_correct_kurs.push({
            title: t("kurs.kursInformationenAltersgruppe"),
            payload: t("kurs.kursInformationenAltersgruppe")
        });
        qr_correct_kurs.push({
            title: t("kurs.kursInformationenAnbieter"),
            payload: t("kurs.kursInformationenAnbieter")
        });
        qr_correct_kurs.push({
            title: t("kurs.kursInformationenGeschlecht"),
            payload: t("kurs.kursInformationenGeschlecht")
        });
        qr_correct_kurs.push({
            title: t("kurs.kursInformationenIntensitaet"),
            payload: t("kurs.kursInformationenIntensitaet")
        });
        qr_correct_kurs.push({
            title: t("kurs.kursInformationenKonversation"),
            payload: t("kurs.kursInformationenKonversation")
        });
        qr_correct_kurs.push({title: t("kurs.kursInformationenKosten"), payload: t("kurs.kursInformationenKosten")});
        qr_correct_kurs.push({title: t("kurs.kursInformationenNiveau"), payload: t("kurs.kursInformationenNiveau")});
        qr_correct_kurs.push({title: t("kurs.kursInformationenOrt"), payload: t("kurs.kursInformationenOrt")});
        qr_correct_kurs.push({title: t("kurs.kursInformationenTag"), payload: t("kurs.kursInformationenTag")});
        qr_correct_kurs.push({title: t("kurs.kursInformationenZeit"), payload: t("kurs.kursInformationenZeit")});
        qr_correct_kurs.push({title: t("kurs.kursInformationenZiel"), payload: t("kurs.kursInformationenZiel")});
        qr_correct_kurs.push({title: t("kurs.keine_Aenderung"), payload: t("kurs.keine_Aenderung")});

        convo.addQuestion({
            text: t('kurs.correctNeccessaryInfromation_Question'),
            quick_replies: qr_correct_kurs
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try {
                        switch (res.text) {

                            case t('kurs.kursInformationenAltersgruppe'):
                                convo.gotoThread("correctKursAltersgruppe0");
                                break;
                            case t('kurs.kursInformationenAnbieter'):
                                convo.gotoThread("correctKursAnbieter0");
                                break;
                            case t('kurs.kursInformationenGeschlecht'):
                                convo.gotoThread("correctKursGeschlecht0");
                                break;
                            case t('kurs.kursInformationenIntensitaet'):
                                convo.gotoThread("correctKursIntensitaet0");
                                break;
                            case t('kurs.kursInformationenKonversation'):
                                convo.gotoThread("correctKursKonversation0");
                                break;
                            case t('kurs.kursInformationenKosten'):
                                convo.gotoThread("correctKursKosten0");
                                break;
                            case t('kurs.kursInformationenNiveau'):
                                convo.gotoThread("correctKursNiveau0");
                                break;
                            case t('kurs.kursInformationenOrt'):
                                convo.gotoThread("correctKursOrt0");
                                break;
                            case t('kurs.kursInformationenTag'):
                                convo.gotoThread("correctKursTag0");
                                break;
                            case t('kurs.kursInformationenZeit'):
                                convo.gotoThread("correctKursZeit0");
                                break;
                            case t('kurs.kursInformationenZiel'):
                                convo.gotoThread("correctKursZiel0");
                                break;
                            case t('kurs.keine_Aenderung'):
                                convo.gotoThread("kursSuchen_Menu");
                                break;
                            default:
                                convo.addMessage(t('nicht_verstanden'));
                                convo.repeat();
                                break;
                        }
                    } catch (err) {
                        errorUtil.displayErrorMessage(bot, message, err, false, false);
                    }

                }
            }
        ], {}, "correctInfromation_kurs");


        // Gefundene Kurse
        //////////////////////////////////
        convo.addQuestion({
            text: t('kurs.gefundeneKurse_Question'),
            quick_replies: [
                {
                    title: t('kurs.gefundeneKurse_Question_QR_Ja'),
                    payload: t('kurs.gefundeneKurse_Question_QR_Ja'),
                },
                {
                    title: t('kurs.gefundeneKurse_Question_QR_Nein'),
                    payload: t('kurs.gefundeneKurse_Question_QR_Nein'),
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
                                kursGefundeneKurse.displayKursInfromationen(bot, message, function (m) {
                                    bot.reply(message, m);
                                }, convo, convo.vars.maxKurse, convo.vars.offsetKurse);
                                break;
                            case t('kurs.gefundeneKurse_Question_QR_Nein'):

                                //Add +1 to offset
                                convo.setVar("offsetKurse", convo.vars.offsetKurse + 1);

                                kursGefundeneKurse.displayGefundeneKurse(bot, message, function (m) {
                                    bot.reply(message, m);
                                }, convo, convo.vars.maxKurse, convo.vars.offsetKurse);
                                break;
                            case t('kurs.gefundeneKurse_Question_QR_Infromationen_aendern'):
                                convo.gotoThread("correctKursInfromation");
                                break;
                            default:
                                convo.addMessage(t('nicht_verstanden'));
                                convo.repeat();
                                break;
                        }
                    } catch (err) {
                        errorUtil.displayErrorMessage(bot, message, err, false, false);
                    }

                }
            },
        ], {}, "gefundeneKurse");

        convo.gotoThread("initialMessage");

    }

};
