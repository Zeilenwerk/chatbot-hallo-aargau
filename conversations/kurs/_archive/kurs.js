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


        const {t} = require('localizify');
        const logUtil = require("../../../util/logUtil");

        convo.addMessage(t('kurs.kursSuchen'));

        //********************************
        // Helpers
        //********************************
        // Import Helper Class to get Entites from LUIS Response
        const luisUtil = require("../../../util/luisUtil");
        const errorUtil = require("../../../util/errorUtil");

        //********************************
        // Required Threads
        //********************************

        const kursIntensitaet = require("./notwendigeInformationen/kursIntensitaet");
        const kursAdressatengruppe = require("./notwendigeInformationen/kursAdressatengruppe");
        const kursOrt = require("./notwendigeInformationen/kursOrt");
        const kursZweck = require("./notwendigeInformationen/kursZweck");
        const kursNiveau = require("./notwendigeInformationen/kursNiveau");
        const kursAnbieter = require("./zusaetzlicheInformationen/kursAnbieter");
        const kursKosten = require("./zusaetzlicheInformationen/kursKosten");
        const kursTag = require("./zusaetzlicheInformationen/kursTag");
        const kursZeit = require("./zusaetzlicheInformationen/kursZeit");
        const kursGefundeneKurse = require("../gefundeneKurse/kursGefundeneKurse");

        //********************************
        // Initialize Conversation
        //********************************

        kursIntensitaet.convoKursIntensitaet(bot, message, convo, luisUtil, "kursNotwendigeInfosMenu");
        kursAdressatengruppe.convoKursAdressatengruppe(bot, message, convo, luisUtil, "kursNotwendigeInfosMenu");
        kursOrt.convoKursOrt(bot, message, convo, luisUtil, "kursNotwendigeInfosMenu");
        kursZweck.convoKursZweck(bot, message, convo, luisUtil, "kursNotwendigeInfosMenu");
        kursNiveau.convoKursNiveau(bot, message, convo, luisUtil, "kursNotwendigeInfosMenu");
        kursAnbieter.convoKursAnbieter(bot, message, convo, luisUtil, "zusatzInfo");
        kursKosten.convoKursKosten(bot, message, convo, luisUtil, "zusatzInfo");
        kursTag.convoKursTag(bot, message, convo, luisUtil, "zusatzInfo");
        kursZeit.convoKursZeit(bot, message, convo, luisUtil, "zusatzInfo");


        try {
            //Variablen zur Suche eines Deutschkurses die in der Conversation ausfindig gemacht werden müssen
            let aVars = ["kursOrt", "kursBezirk", "kursZeit", "kursTag", "kursTagUndZeit", "kursDatum", "kursIntensitaet", "kursAnbieter", "kursNiveau", "kursSprache", "kursAdressatengruppe", "kursKosten", "kursZweck"];

            for (var x = 0; x < aVars.length; x++) {

                let aEntity = luisUtil.getEntityFromLuisResponse(aVars[x], message);

                if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                    logUtil.debug("Initialize var " + aVars[x] + " with value to 'None'");
                    convo.setVar(aVars[x], t("kurs.kursInformationen.keine_angabe"));
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

            convo.setVar("maxKurse", 1);
            convo.setVar("offsetKurse", 0);

        } catch (err) {
            errorUtil.displayErrorMessage(bot, message, err, false, false);
        }


        //********************************
        //Conversation Threads
        //********************************

        convo.addMessage(t('kurs.kursNotwendigeInfosMenu_Message', {
            kursIntensitaet: "{{vars.kursIntensitaet}}",
            kursAdressatengruppe: "{{vars.kursAdressatengruppe}}",
            kursOrt: "{{vars.kursOrt}}",
            kursZweck: "{{vars.kursZweck}}",
            kursNiveau: "{{vars.kursNiveau}}"
        }), 'kursNotwendigeInfosMenu');

        convo.addQuestion({
            text: t('kurs.kursNotwendigeInfosMenu_Question'),
            quick_replies: [
                {
                    title: t('ja'),
                    payload: t('ja'),
                },
                {
                    title: t('kurs.kursNotwendigeInfosMenu_Question_Qr_Nein'),
                    payload: t('nein'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try {
                        switch (res.text) {

                            case t('ja'):
                                convo.gotoThread("zusatzInfo");
                                convo.next();
                                break;
                            case t('nein'):
                                convo.gotoThread("correctNeccessaryInfromation");
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
        ], {}, "kursNotwendigeInfosMenu");

        convo.addQuestion({
            text: t('kurs.correctNeccessaryInfromation_Question'),
            quick_replies: [
                {
                    title: t('kurs.kurs_Ort'),
                    payload: t('kurs.kurs_Ort'),
                },
                {
                    title: t('kurs.kurs_Adressatengruppe'),
                    payload: t('kurs.Adressatengruppe'),
                },
                {
                    title: t('kurs.kurs_Intensitaet'),
                    payload: t('kurs.Intensitaet'),
                },
                {
                    title: t('kurs.kurs_Niveau'),
                    payload: t('kurs.kurs_Niveau'),
                },
                {
                    title: t('kurs.keine_Aenderung'),
                    payload: t('kurs.keine_Aenderung'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try {
                        switch (res.text) {

                            case t('kurs.Adressatengruppe'):
                                convo.gotoThread("askKursAdressatengruppe");
                                break;
                            case t('kurs.Intensitaet'):
                                convo.gotoThread("askKursIntensitaet");
                                break;
                            case t('kurs.kurs_Ort'):
                                convo.gotoThread("askKursOrt");
                                break;
                            case t('kurs.kurs_Niveau'):
                                convo.gotoThread("askKursNiveau");
                                break;
                            case t('kurs.keine_Aenderung'):
                                convo.say(t('kurs.zusatzInfo_Say'));
                                convo.gotoThread("zusatzInfo");
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
        ], {}, "correctNeccessaryInfromation");


        convo.addQuestion({
            text: 'Möchten sie mir noch eine oder mehrere der folgenden Zusatzinformationen geben?',
            quick_replies: [
                {
                    title: t('kurs.kurs_Tag'),
                    payload: t('kurs.kurs_Tag'),
                },
                {
                    title: t('kurs.kurs_Zeit'),
                    payload: t('kurs.kurs_Zeit'),
                },
                {
                    title: t('kurs.kurs_Anbieter'),
                    payload: t('kurs.Anbieter'),
                },
                {
                    title: t('kurs.kurs_Kosten'),
                    payload: t('kurs.Kosten'),
                },
                {
                    title: t('kurs.keine_weiteren_Angaben'),
                    payload: t('kurs.keine_weiteren_Angaben'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try {
                        switch (res.text) {

                            case t('kurs.kurs_Tag'):
                                convo.gotoThread("askKursTag");
                                break;
                            case t('kurs.kurs_Zeit'):
                                convo.gotoThread("askKursZeit");
                                break;
                            case t('kurs.Anbieter'):
                                convo.gotoThread("askKursAnbieter");
                                break;
                            case t('kurs.Kosten'):
                                convo.gotoThread("askKursKosten");
                                break;
                            case t('kurs.keine_weiteren_Angaben'):
                                kursGefundeneKurse.displayGefundeneKurse(bot, message, function (m) {
                                    bot.reply(message, m);
                                }, convo, convo.vars.maxKurse, convo.vars.offsetKurse);
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
        ], {}, "zusatzInfo");


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
                                convo.gotoThread("correctNeccessaryInfromation");
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

        //********************************
        //Check Notwendige Informationen
        //********************************
        logUtil.debug("Check Notwendige Informationen");

        if (convo.vars.kursOrt !== t("kurs.kursInformationen.keine_angabe") && convo.vars.kursAdressatengruppe !== t("kurs.kursInformationen.keine_angabe") && convo.vars.kursZweck !== t("kurs.kursInformationen.keine_angabe") && convo.vars.kursNiveau !== t("kurs.kursInformationen.keine_angabe") && convo.vars.kursIntensitaet !== t("kurs.kursInformationen.keine_angabe")) {
            logUtil.info("Alle Notwendigen Infos vorhanden");
            logUtil.debug("gotoThread kursNotwendigeInfosMenu");
            convo.gotoThread("kursNotwendigeInfosMenu");
        } else {

            //Informationen vom benutzer beantragen, damit ein Deutschkurs gesucht werden kann
            if (convo.vars.kursIntensitaet === "None") {
                logUtil.debug("askKursIntensitaet");
                kursIntensitaet.askKursIntensitaet(bot, message, convo, luisUtil);
            } else {
                convo.say(t('kurs.check_Notwendige_Informationen_Intensitaet', {kursIntensitaet: "{{vars.kursIntensitaet}}"}));
            }

            if (convo.vars.kursAdressatengruppe === "None") {
                logUtil.debug("askKursAdressatengruppe");
                kursAdressatengruppe.askKursAdressatengruppe(bot, message, convo, luisUtil);
            } else {
                convo.say(t('kurs.check_Notwendige_Informationen_Adressatengruppe', {kursAdressatengruppe: "{{vars.kursAdressatengruppe}}"}));
            }

            if (convo.vars.kursOrt === "None") {
                logUtil.debug("askKursOrt");
                kursOrt.askKursOrt(bot, message, convo, luisUtil);
            } else {
                if (convo.vars.kursBezirk !== t("kurs.kursInformationen.keine_angabe")) {
                    convo.say(t('kurs.check_Notwendige_Informationen_Ort', {
                        kursOrt: "{{vars.kursOrt}}",
                        kursBezirk: "{{vars.kursBezirk}}"
                    }))
                } else {
                    convo.say(t('kurs.check_Notwendige_Informationen_Ort_Bezirk', {kursOrt: "{{vars.kursOrt}}"}))
                }
            }

            if (convo.vars.kursZweck === "None") {
                logUtil.debug("askKursZweck");
                kursZweck.askKursZweck(bot, message, convo, luisUtil);
            } else {
                convo.say(t('kurs.check_Notwendige_Informationen_Zweck', {kursZweck: "{{vars.kursZweck}}"}));
            }

            if (convo.vars.kursNiveau === "None") {
                logUtil.debug("askKursNiveau");
                kursNiveau.askKursNiveau(bot, message, convo, luisUtil, "kursNotwendigeInfosMenu");
            } else {
                convo.say(t('kurs.check_Notwendige_Informationen_Niveau', {kursNiveau: "{{vars.kursNiveau}}"}));
            }


        }


    }

};
