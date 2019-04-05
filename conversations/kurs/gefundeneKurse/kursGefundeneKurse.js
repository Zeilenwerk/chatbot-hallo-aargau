module.exports = {
    displayGefundeneKurse: function (addMessage, convo, maxKurse = 1, offsetKurse = 0) {

        const pgHelper = require("../../../util/pgHelper");
        const {t} = require('../../../node_modules/localizify');
        const logHelper = require("../../../util/logHelper");
        const timeUtil = require("../../../util/timeUtil");

        let pgQuery = this.prepareKursQuery(convo, maxKurse, offsetKurse);

        //Connect to DB
        /////////////////////////////
        const pgClient = pgHelper.getDB();
        pgClient.connect();

        // Execute Query and return res
        /////////////////////////////
        pgClient.query(pgQuery,
            (err, res) => {
                if (err) require("../../../util/errorHelper").displayErrorMessage(convo, err.stack, false);

                pgClient.end();

                if(res.rows) logHelper.info("Gefundene Kurse DB Response:");
                if(res.rows) logHelper.info(JSON.stringify(res.rows));
                if(res.rows) logHelper.debug(JSON.stringify(res));

                if (res.rows.length > 0) {
                    addMessage(t('kurs.gefundeneKurse.kursGefundeneKurse.kurse_Gefunden'));
                } else {
                    addMessage(t('kurs.gefundeneKurse.kursGefundeneKurse.kurse_nicht_Gefunden'));
                    convo.setVar("offsetKurse", 0);
                    convo.gotoThread("kursNotwendigeInfosMenu");
                }

                for (var i = 0; i < res.rows.length; i++) {

                    var oRow = res.rows[i];

                    if (oRow.tag != null && oRow.tag !== "") {
                        addMessage(t('kurs.gefundeneKurse.kursGefundeneKurse.kurs_Tag_Datum', {kursTag: timeUtil.getDayNameFromNumber(oRow.tag_nummer), kursDatum: timeUtil.formatDate(oRow.tag)}));
                    }

                    if (oRow.start_zeit != null && oRow.start_zeit !== "" && oRow.end_zeit != null && oRow.end_zeit !== "") {
                        addMessage(t('kurs.gefundeneKurse.kursGefundeneKurse.kurs_Zeit', {
                            einzelkursstart: oRow.start_zeit,
                            einzelkursende: oRow.end_zeit
                        }));
                    }
                }
                if (res.rows.length > 0) {
                    convo.gotoThread("gefundeneKurse");
                }

            });
    },

    displayKursInfromationen: function (addMessage, convo, maxKurse = 1, offsetKurse = 0) {

        const pgHelper = require("../../../util/pgHelper");
        const {t} = require('../../../node_modules/localizify');
        const logHelper = require("../../../util/logHelper");
        const timeUtil = require("../../../util/timeUtil");

        let pgQuery = this.prepareKursQuery(convo, maxKurse, offsetKurse);

        //Connect to DB
        /////////////////////////////
        const pgClient = pgHelper.getDB();
        pgClient.connect();

        // Execute Query and return res
        /////////////////////////////
        pgClient.query(pgQuery,
            (err, res) => {
                if (err) require("../../../util/errorHelper").displayErrorMessage(convo, err.stack, false);

                pgClient.end();

                logHelper.debug("Display Kurs Informationen DB Response:");
                logHelper.debug(JSON.stringify(res));

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
                        addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursTag_Datum', {kursTag: timeUtil.getDayNameFromNumber(oRow.tag_nummer), kursDatum: timeUtil.formatDate(oRow.tag)}));
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
    },

    prepareKursQuery: function (convo, maxKurse = 1, offsetKurse = 0) {

        const logHelper = require("../../../util/logHelper");
        const timeUtil = require("../../../util/timeUtil");
        const niveauHelper = require("../../../util/niveauHelper");
        const adressatengruppenHelper = require("../../../util/adressatengruppenHelper");
        const intensitaetHelper = require("../../../util/intensitaetHelper");
        const zweckHelper = require("../../../util/zweckHelper");

        //Notwendige Informationen
        /////////////////////////////
        //1 = Wochenkurs | 2 = intensivkurs
        let kursIntensitaet = "";
        if (convo.vars.kursIntensitaet !== "None" && intensitaetHelper.getIntensitaetCodeFromString(convo.vars.kursIntensitaet) !== 0) {
            kursIntensitaet = " AND i.code = " + intensitaetHelper.getIntensitaetCodeFromString(convo.vars.kursIntensitaet);
        }

        let kursOrt = "";
        if (convo.vars.kursOrt !== "None") {
            kursOrt = " AND LOWER(o.ort) = '" + convo.vars.kursOrt.toLowerCase() + "' ";
        }

        let kursAdressatengruppe = "";
        if (convo.vars.kursAdressatengruppe !== "None" && adressatengruppenHelper.getAdressatengruppeCodeFromString(convo.vars.kursAdressatengruppe) !== 0) {
            kursAdressatengruppe = " AND ad.code = " + adressatengruppenHelper.getAdressatengruppeCodeFromString(convo.vars.kursAdressatengruppe);
        }

        let kursZweck = "";
        if (zweckHelper.getZweckCodeFromString(convo.vars.kursZweck) !== 0) {
            kursZweck = " AND z.code = " + zweckHelper.getZweckCodeFromString(convo.vars.kursZweck);
        }

        let kursNiveau = "";
        if (niveauHelper.getNiveauCodeFromString(convo.vars.kursNiveau) !== 0) {
            kursNiveau = " AND n.code = " + niveauHelper.getNiveauCodeFromString(convo.vars.kursNiveau);
        }

        //Zusatzinfos
        /////////////////////////////


        let kursAnbieter = "";
        if (convo.vars.kursAnbieter !== "None") {
            kursAnbieter = " AND LOWER(a.offizieller_name) = '" + convo.vars.kursAnbieter.toLowerCase() + "' ";
        }

        let kursTag = "";
        if(convo.vars.kursTag !== "None"){
            kursTag = " AND extract(isodow from dz.tag) = " + timeUtil.getDayNumberFromString(convo.vars.kursTag) + " ";
        }

        let kursZeit_start = "";
        let kursZeit_ende = "";
        if(convo.vars.kursZeit !== "None"){
            kursZeit_start = " AND dz.zeit_start >= '" + convo.vars.kursZeit + ":00' ";
            //Add 3 Hours to the start time
            kursZeit_ende = " AND dz.zeit_start <= '" + (parseInt(convo.vars.kursZeit.substring(0, 2)) + 3) +
                convo.vars.kursZeit.substring(2, convo.vars.kursZeit.length) + ":00' ";
        }


        let kursKosten = "";
        if (convo.vars.kursKosten !== "None") {
            switch (convo.vars.kursKosten.toLowerCase()) {
                case "gratis":
                    kursKosten = " AND ko.betrag <= 0 ";
                    break;
                case "500":
                    kursKosten = " AND ko.betrag <= 500 ";
                    break;
                case "1000":
                    kursKosten = " AND ko.betrag <= 1000 ";
                    break;
                case "1000+":
                    kursKosten = " AND ko.betrag >= 0 ";
                    break;
                default:
                    kursKosten = "";
                    break;
            }
        }

        //Offset and Limit
        /////////////////////////////
        let query_offset = " OFFSET " + offsetKurse;
        let query_limit = " LIMIT " + maxKurse;

        // let pgQuery = "SELECT * FROM " + process.env.BOTKIT_STORAGE_POSTGRES_DATABASE_TABLE_DEUTSCHKURS + " " + query_where + " " + query_offset + " " + query_limit;
        //SELECT All Kurs Information with kurs id"
        let pgQuery =
            " SELECT ku.id, "
            + "        ku.beschreibung AS kurs_beschreibung, "
            + "        n.wert AS niveau, "
            + "        s.wert AS sprachnachweis, "
            + "        a.offizieller_name AS anbieter_offizieller_name, "
            + "        a.strasse AS anbieter_strasse, "
            + "        a.ort AS anbieter_ort, "
            + "        a.plz AS anbieter_plz, "
            + "        a.mail AS anbieter_mail, "
            + "        a.telefon AS anbieter_telefon, "
            + "        a.url AS anbieter_url, "
            + "        k.wert AS konversation, "
            + "        i.wert AS intensitaet, "
            + "        z.wert AS zweck, "
            + "        dz.reihenfolge AS reihenfolge, "
            + "        dz.tag AS tag, "
            + "        to_char(dz.tag, 'TMDay') AS tag_name, "
            + "        extract(isodow from dz.tag) AS tag_Nummer, "
            + "        dz.zeit_start AS start_Zeit, "
            + "        dz.zeit_ende AS end_Zeit, "
            + "        o.ort AS ort, "
            + "        o.strasse AS ort_Strasse, "
            + "        o.plz AS ort_PLZ, "
            + "        o.raum AS ort_Raum, "
            + "        ad.wert AS adressatengruppe, "
            + "        (SELECT an.wert "
            + "        FROM anrede an "
            + "        WHERE an.id = (SELECT kp.fk_anrede "
            + "                       FROM kontaktperson kp "
            + "                       WHERE kp.fk_anbieter = a.id)) AS kontaktperson_anrede, "
            + "       (SELECT kp.name "
            + "        FROM kontaktperson kp "
            + "        WHERE kp.fk_anbieter = a.id) AS kontaktperson_name, "
            + "       (SELECT kp.vorname "
            + "        FROM kontaktperson kp "
            + "        WHERE kp.fk_anbieter = a.id) AS kontaktperson_vorname, "
            + "       (SELECT kp.telefon "
            + "        FROM kontaktperson kp "
            + "        WHERE kp.fk_anbieter = a.id) AS kontaktperson_telefon "
            + " FROM kurs ku "
            + " LEFT JOIN niveau n              ON ku.fk_niveau = n.id "
            + " LEFT JOIN sprachnachweis s      ON ku.fk_sprachnachweis = s.id "
            + " LEFT JOIN anbieter a            ON ku.fk_anbieter = a.id "
            + " LEFT JOIN konversation k        ON ku.fk_konversation = k.id "
            + " LEFT JOIN intensitaet i         ON ku.fk_intensitaet = i.id "
            + " LEFT JOIN zweck z               ON ku.fk_zweck = z.id "
            + " LEFT JOIN durchfuehrungszeit dz ON ku.id = dz.fk_kurs "
            + " LEFT JOIN durchfuehrungsort o   ON dz.fk_durchfuerungsort = o.id "
            + " LEFT JOIN kosten ko             ON ku.id = ko.fk_kurs "
            + " LEFT JOIN kostenart ka          ON ko.fk_kostenart = ka.id "
            + " JOIN adressatengruppe ad ON ad.id in (SELECT id_adressatengruppe "
            + "                             FROM kurs_adressatengruppe "
            + "                             WHERE id_kurs = ku.id) "
            + " WHERE (dz.tag IS NULL OR dz.tag >= now()) "
            //Necessary Information
            + " " + kursIntensitaet
            + " " + kursAdressatengruppe
            + " " + kursOrt
            + " " + kursZweck
            + " " + kursNiveau
            //Additional Information
            + " " + kursAnbieter
            + " " + kursTag
            + " " + kursZeit_start
            + " " + kursZeit_ende
            + " " + kursKosten
            + " ORDER BY dz.reihenfolge "
            + " " + query_offset
            + " " + query_limit;

        logHelper.debug("Kurs Select DB Query: " + pgQuery);

        //Reste offset
        convo.setVar("offsetKurse", 0);

        return pgQuery;
    }
};