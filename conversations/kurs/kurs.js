module.exports = {

    kursSuchen : function(convo, message, bot) {

        const { t } = require('../../node_modules/localizify');
        const logHelper = require("../../util/logHelper");

        convo.addMessage(t('kurs.kursSuchen'));

        //********************************
        // Helpers
        //********************************
        // Import Helper Class to get Entites from LUIS Response
        const luisHelper = require("../../util/luisHelper");

        //********************************
        // Required Threads
        //********************************
        const kursOrt = require("./notwendigeInformationen/kursOrt");
        const kursTag = require("./notwendigeInformationen/kursTag");
        const kursZeit = require("./notwendigeInformationen/kursZeit");
        const kursNiveau = require("./notwendigeInformationen/kursNiveau");

        const kursAdressatengruppe = require("./zusaetzlicheInformationen/kursAdressatengruppe");
        const kursAnbieter = require("./zusaetzlicheInformationen/kursAnbieter");
        const kursIntensitaet = require("./zusaetzlicheInformationen/kursIntensitaet");
        const kursKosten = require("./zusaetzlicheInformationen/kursKosten");

        const kursGefundeneKurse = require("./gefundeneKurse/kursGefundeneKurse");
        const kursInformationenKurs = require("./gefundeneKurse/kursInfomrationenKurs");

        //********************************
        // Initialize Conversation
        //********************************

        kursOrt.convoKursOrt(convo, luisHelper, "kursNotwendigeInfosMenu");
        kursTag.convoKursTag(convo, luisHelper, "kursNotwendigeInfosMenu");
        kursZeit.convoKursZeit(convo, luisHelper, "kursNotwendigeInfosMenu");
        kursNiveau.convoKursNiveau(convo, luisHelper, "kursNotwendigeInfosMenu");

        kursAdressatengruppe.convoKursAdressatengruppe(convo, luisHelper, "zusatzInfo");
        kursAnbieter.convoKursAnbieter(convo, luisHelper, "zusatzInfo");
        kursIntensitaet.convoKursIntensitaet(convo, luisHelper, "zusatzInfo");
        kursKosten.convoKursKosten(convo, luisHelper, "zusatzInfo");


        //Variablen zur Suche eines Deutschkurses die in der Conversation ausfindig gemacht werden müssen
        let aVars = ["kursOrt", "kursBezirk", "kursZeit", "kursTag", "kursTagUndZeit", "kursDatum", "kursIntensitaet", "kursAnbieter", "kursNiveau", "kursSprache", "kursAdressatengruppe", "kursKosten"];

        for (var x = 0; x < aVars.length; x++) {

            let aEntity = luisHelper.getEntityFromLuisResponse(aVars[x], message);

            if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                logHelper.debug("Initialize var " + aVars[x] + " with value to 'None'");
                convo.setVar(aVars[x], "None");
            } else {
                if (aEntity[1]) {
                    convo.setVar(aVars[x], aEntity[1]);
                    logHelper.debug(aVars[x] + " = " + aEntity[1]);
                } else {
                    convo.setVar(aVars[x], aEntity[0]);
                    logHelper.debug(aVars[x] + " = " + aEntity[0]);
                }
            }
        }

        convo.setVar("maxKurse", 1);
        convo.setVar("offsetKurse", 0);

        //********************************
        //Conversation Threads
        //********************************

        convo.addMessage(t('kurs.kursNotwendigeInfosMenu_Message', {kursTag: "{{vars.kursTag}}", kursZeit: "{{vars.kursZeit}}", kursNiveau: "{{vars.kursNiveau}}", kursOrt: "{{vars.kursOrt}}"}), 'kursNotwendigeInfosMenu');

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
                    title: t('kurs.kurs_Tag'),
                    payload: t('kurs.kurs_Tag'),
                },
                {
                    title: t('kurs.kurs_Zeit'),
                    payload: t('kurs.kurs_Zeit'),
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

                    switch (res.text) {

                        case t('kurs.kurs_Ort'):
                            convo.gotoThread("askKursOrt");
                            break;
                        case t('kurs.kurs_Tag'):
                            convo.gotoThread("askKursTag");
                            break;
                        case t('kurs.kurs_Zeit'):
                            convo.gotoThread("askKursZeit");
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
                }
            }
        ], {}, "correctNeccessaryInfromation");


        convo.addQuestion({
            text: 'Möchten sie mir noch eine oder mehrere der folgenden Zusatzinformationen geben?',
            quick_replies: [
                {
                    title: t('kurs.kurs_Adressatengruppe'),
                    payload: t('kurs.Adressatengruppe'),
                },
                {
                    title: t('kurs.kurs_Anbieter'),
                    payload: t('kurs.Anbieter'),
                },
                {
                    title: t('kurs.kurs_Intensitaet'),
                    payload: t('kurs.Intensitaet'),
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

                    switch (res.text) {

                        case t('kurs.Adressatengruppe'):
                            convo.gotoThread("askKursAdressatengruppe");
                            break;
                        case t('kurs.Anbieter'):
                            convo.gotoThread("askKursAnbieter");
                            break;
                        case t('kurs.Intensitaet'):
                            convo.gotoThread("askKursIntensitaet");
                            break;
                        case t('kurs.Kosten'):
                            convo.gotoThread("askKursKosten");
                            break;
                        case t('kurs.keine_weiteren_Angaben'):
                            kursGefundeneKurse.displayGefundeneKurse(function (m) {
                                bot.reply(message, m);
                            }, convo, convo.vars.maxKurse, convo.vars.offsetKurse);
                            break;
                        default:
                            convo.addMessage(t('nicht_verstanden'));
                            convo.repeat();
                            break;
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
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    switch (res.text) {

                        case t('kurs.gefundeneKurse_Question_QR_Ja'):
                            kursInformationenKurs.displayKursInfromationen(function (m) {
                                bot.reply(message, m);
                            }, convo, convo.vars.maxKurse, convo.vars.offsetKurse);
                            break;
                        case t('kurs.gefundeneKurse_Question_QR_Nein'):

                            //Add +1 to offset
                            convo.setVar("offsetKurse", convo.vars.offsetKurse + 1)

                            kursGefundeneKurse.displayGefundeneKurse(function (m) {
                                bot.reply(message, m);
                            }, convo, convo.vars.maxKurse, convo.vars.offsetKurse);
                            break;
                        default:
                            convo.addMessage(t('nicht_verstanden'));
                            convo.repeat();
                            break;
                    }
                }
            },
        ], {}, "gefundeneKurse");

        //********************************
        //Check Notwendige Informationen
        //********************************
        logHelper.debug("Check Notwendige Informationen");

        if (convo.vars.kursOrt !== "None" && convo.vars.kursTag !== "None" && convo.vars.kursZeit !== "None" && convo.vars.kursNiveau !== "None") {
            logHelper.debug("Alle Notwendigen Infos vorhanden");
            logHelper.debug("gotoThread kursNotwendigeInfosMenu");
            convo.gotoThread("kursNotwendigeInfosMenu");
        } else {

            //Informationen vom benutzer beantragen, damit ein Deutschkurs gesucht werden kann
            if (convo.vars.kursOrt === "None") {
                logHelper.debug("askKursOrt");
                kursOrt.askKursOrt(convo, luisHelper);
            } else {
                if (convo.vars.kursBezirk !== "None") {
                    convo.say(t('kurs.check_Notwendige_Informationen_Ort', {kursOrt: "{{vars.kursOrt}}", kursBezirk : "{{vars.kursBezirk}}"}))
                } else {
                    convo.say(t('kurs.check_Notwendige_Informationen_Ort_Bezirk', {kursOrt: "{{vars.kursOrt}}"}))
                }
            }

            if (convo.vars.kursTag === "None") {
                logHelper.debug("askKursTag");
                kursTag.askKursTag(convo, luisHelper);
            } else {
                convo.say(t('kurs.check_Notwendige_Informationen_Tag', {kursTag: "{{vars.kursTag}}"}))
            }

            if (convo.vars.kursZeit === "None") {
                logHelper.debug("askKursZeit");
                kursZeit.askKursZeit(convo, luisHelper);
            } else {
                convo.say(t('kurs.check_Notwendige_Informationen_Zeit', {kursZeit: "{{vars.kursZeit}}"}))
            }

            if (convo.vars.kursNiveau === "None") {
                logHelper.debug("askKursNiveau");
                kursNiveau.askKursNiveau(convo, luisHelper, "kursNotwendigeInfosMenu");
            } else {
                convo.say(t('kurs.check_Notwendige_Informationen_Niveau', {kursNiveau: "{{vars.kursNiveau}}"}));
            }

        }


    }

};
