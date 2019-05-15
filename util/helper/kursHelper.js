module.exports = {

    getMatchedKurseFromDB: function(bot, message, convo, luisUtil, nextThread, returnDbEntries){

        const pgUtil = require("../pgUtil");
        const logUtil = require("../logUtil");

        let pgQuery = this.prepareAllMatchedKurseQuery(bot,message,convo);
        logUtil.debug("Kurse Query: " + pgQuery);

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

                if (res.rows.length > 0) {
                    logUtil.debug("Kurse to display from : " + JSON.stringify(res.rows));
                    returnDbEntries(convo, res.rows);
                } else {
                    returnDbEntries(convo, "");
                }

            });
    },

    getKursWithId: function(bot, message, convo, luisUtil, nextThread, id, returnDbEntries){

        const pgUtil = require("../pgUtil");
        const logUtil = require("../logUtil");

        let pgQuery = this.prepareKursQueryWithId(id);
        logUtil.debug("Kurse Query: " + pgQuery);

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

                if (res.rows.length > 0) {
                    logUtil.debug("Kurse to display from : " + JSON.stringify(res.rows));
                    returnDbEntries(convo, res.rows);
                } else {
                    returnDbEntries(convo, "");
                }

            });

    },

    prepareAllMatchedKurseQuery: function (bot, message, convo) {

        const {t} = require('../../node_modules/localizify');

        //Initialize possible where conditions
        /////////////////////////////

        let kursInformationenAltersgruppe = "";  // kursInformationenAltersgruppe, convo.vars.kursInformationenAltersgruppe
        let kursInformationenAnbieter = "";      // kursInformationenAnbieter, convo.vars.kursInformationenAnbieter
        let kursInformationenGeschlecht = "";    // kursInformationenGeschlecht, convo.vars.kursInformationenGeschlecht
        let kursInformationenIntensitaet = "";   // kursInformationenIntensitaet, convo.vars.kursInformationenIntensitaet
        let kursInformationenKonversation = "";  // kursInformationenKonversation, convo.vars.kursInformationenKonversation
        let kursInformationenKosten = "";        // kursInformationenKosten, convo.vars.kursInformationenKosten
        let kursInformationenNiveau = "";        // kursInformationenNiveau, convo.vars.kursInformationenNiveau
        let kursInformationenOrt = "";           // kursInformationenOrt, convo.vars.kursInformationenOrt
        let kursInformationenTag = "";           // kursInformationenTag, convo.vars.kursInformationenTag
        let kursInformationenZeit = "";          // kursInformationenZeit, convo.vars.kursInformationenZeit
        let kursInformationenZiel = "";          // kursInformationenZiel, convo.vars.kursInformationenZiel
        let personAltersgruppe = "";             // personAltersgruppe, convo.vars.personAltersgruppe
        let personGeschlecht = "";               // personGeschlecht, convo.vars.personGeschlecht
        let personKind = "";                     // personKind, convo.vars.personKind
        let personSprache = "";                  // personSprache, convo.vars.personSprache

        //Kurs Informationen
        /////////////////////////////

        if (null != convo.vars.kursInformationenAltersgruppe && convo.vars.kursInformationenAltersgruppe !== t("kurs.kursInformationen.keine_angabe") && convo.vars.kursInformationenAltersgruppe !== "") {
            kursInformationenAltersgruppe  = "   AND UPPER((";
            kursInformationenAltersgruppe += "     (SELECT string_agg(ag.wert, ', ') AS kursInformationenAadressatengruppen";
            kursInformationenAltersgruppe += "      FROM altersgruppe ag";
            kursInformationenAltersgruppe += "               LEFT JOIN adressatengruppe adg";
            kursInformationenAltersgruppe += "                         ON ag.id = adg.fk_altersgruppe";
            kursInformationenAltersgruppe += "               LEFT JOIN kurs_adressatengruppe ka";
            kursInformationenAltersgruppe += "                         ON ka.id_adressatengruppe = adg.id";
            kursInformationenAltersgruppe += "      WHERE ka.id_kurs = k.id)";
            kursInformationenAltersgruppe += " )) LIKE UPPER('%" + convo.vars.kursInformationenAltersgruppe + "%')";
        }
        if (null != convo.vars.kursInformationenAnbieter && convo.vars.kursInformationenAnbieter !== t("kurs.kursInformationen.keine_angabe") && convo.vars.kursInformationenAnbieter !== "") {
            kursInformationenAnbieter = " AND UPPER(an.offizieller_name) LIKE UPPER('%" + convo.vars.kursInformationenAnbieter + "%') ";
        }
        if (null != convo.vars.kursInformationenGeschlecht && convo.vars.kursInformationenGeschlecht !== t("kurs.kursInformationen.keine_angabe") && convo.vars.kursInformationenGeschlecht !== "") {

            kursInformationenGeschlecht  = " AND UPPER(( ";
            kursInformationenGeschlecht += "     (SELECT string_agg(g.wert, ', ') AS kursInformationenGeschlecht ";
            kursInformationenGeschlecht += "      FROM geschlecht g ";
            kursInformationenGeschlecht += "               LEFT JOIN adressatengruppe adg ";
            kursInformationenGeschlecht += "                         ON g.id = adg.fk_geschlecht ";
            kursInformationenGeschlecht += "               LEFT JOIN kurs_adressatengruppe ka ";
            kursInformationenGeschlecht += "                         ON ka.id_adressatengruppe = adg.id ";
            kursInformationenGeschlecht += "      WHERE ka.id_kurs = k.id) ";
            kursInformationenGeschlecht += "   )) LIKE UPPER('%" + convo.vars.personGeschlecht + "%') ";

        }
        if (null != convo.vars.kursInformationenIntensitaet && convo.vars.kursInformationenIntensitaet !== t("kurs.kursInformationen.keine_angabe") && convo.vars.kursInformationenIntensitaet !== "") {
            kursInformationenIntensitaet = " AND UPPER(i.wert) LIKE UPPER('%" + convo.vars.kursInformationenIntensitaet + "%') ";
        }
        if (null != convo.vars.kursInformationenKonversation && convo.vars.kursInformationenKonversation !== t("kurs.kursInformationen.keine_angabe") && convo.vars.kursInformationenKonversation !== "") {
            kursInformationenKonversation = " AND UPPER(kon.wert) LIKE UPPER('%" + convo.vars.kursInformationenKonversation + "%') ";
        }
        if (null != convo.vars.kursInformationenKosten && convo.vars.kursInformationenKosten !== t("kurs.kursInformationen.keine_angabe") && convo.vars.kursInformationenKosten !== "") {

            switch (convo.vars.kursInformationenKosten.toLowerCase()) {
                case "gratis":
                    kursInformationenKosten = " AND (SELECT SUM(betrag) FROM kosten WHERE fk_kurs = k.id) <= 0 ";
                    break;
                case "500":
                    kursInformationenKosten = " AND (SELECT SUM(betrag) FROM kosten WHERE fk_kurs = k.id) <= 500 ";
                    break;
                case "1000":
                    kkursInformationenKosten = " AND (SELECT SUM(betrag) FROM kosten WHERE fk_kurs = k.id) <= 1000 ";
                    break;
                default:
                    kursInformationenKosten = "";
                    break;
            }
        }
        if (null != convo.vars.kursInformationenNiveau && convo.vars.kursInformationenNiveau !== t("kurs.kursInformationen.keine_angabe") && convo.vars.kursInformationenNiveau !== "") {
            kursInformationenNiveau = " AND UPPER(n.wert) LIKE UPPER('%" + convo.vars.kursInformationenNiveau + "%') ";
        }
        if (null != convo.vars.kursInformationenOrt && convo.vars.kursInformationenOrt !== t("kurs.kursInformationen.keine_angabe") && convo.vars.kursInformationenOrt !== "") {
            kursInformationenOrt = " AND UPPER(ort.wert) LIKE UPPER('%" + convo.vars.kursInformationenOrt + "%') ";
        }
        if (null != convo.vars.kursInformationenTag && convo.vars.kursInformationenTag !== t("kurs.kursInformationen.keine_angabe") && convo.vars.kursInformationenTag !== "") {
            kursInformationenTag = " AND UPPER(durz.tag) LIKE UPPER('%" + convo.vars.kursInformationenTag + "%') ";
        }
        if (null != convo.vars.kursInformationenZeit && convo.vars.kursInformationenZeit !== t("kurs.kursInformationen.keine_angabe") && convo.vars.kursInformationenZeit !== "") {

            let kursZeit_start = " AND durz.zeit_start >= '" + convo.vars.kursInformationenZeit + ":00' ";
            //Add 3 Hours to the start time
            let kursZeit_ende = " AND durz.zeit_ende <= '" + (parseInt(convo.vars.kursInformationenZeit.substring(0, 2)) + 3) +
                convo.vars.kursInformationenZeit.substring(2, convo.vars.kursInformationenZeit.length) + ":00' ";

            kursInformationenZeit = kursZeit_start + " " + kursZeit_ende;
        }
        if (null != convo.vars.kursInformationenZiel && convo.vars.kursInformationenZiel !== t("kurs.kursInformationen.keine_angabe") && convo.vars.kursInformationenZiel !== "") {

            kursInformationenZiel  = " AND UPPER(( ";
            kursInformationenZiel += "   concat_ws(', ', (SELECT string_agg(dz.wert, ', ') AS kursInformationenZiel ";
            kursInformationenZiel += "                    FROM didaktische_ziel dz ";
            kursInformationenZiel += "                             LEFT JOIN ziel z ";
            kursInformationenZiel += "                                       ON dz.id = z.fk_didaktische_ziel ";
            kursInformationenZiel += "                             LEFT JOIN kurs_ziel kz ";
            kursInformationenZiel += "                                       ON z.id = kz.id ";
            kursInformationenZiel += "                    WHERE kz.id_kurs = k.id), ";
            kursInformationenZiel += "             (SELECT string_agg(bz.wert, ', ') ";
            kursInformationenZiel += "              FROM berufliches_ziel bz ";
            kursInformationenZiel += "                       LEFT JOIN ziel z ";
            kursInformationenZiel += "                                 ON bz.id = z.fk_berufliches_ziel ";
            kursInformationenZiel += "                       LEFT JOIN kurs_ziel kz ";
            kursInformationenZiel += "                                 ON z.id = kz.id ";
            kursInformationenZiel += "              WHERE kz.id_kurs = k.id), ";
            kursInformationenZiel += "             (SELECT string_agg(n.wert, ', ') ";
            kursInformationenZiel += "              FROM niveau n ";
            kursInformationenZiel += "                       LEFT JOIN ziel z ";
            kursInformationenZiel += "                                 ON n.id = z.fk_ziel_niveau ";
            kursInformationenZiel += "                       LEFT JOIN kurs_ziel kz ";
            kursInformationenZiel += "                                 ON z.id = kz.id ";
            kursInformationenZiel += "              WHERE kz.id_kurs = k.id) ";
            kursInformationenZiel += "       ) ";
            kursInformationenZiel += "   )) LIKE UPPER('%" + convo.vars.kursInformationenZiel + "%') ";

        }

        if (null != convo.vars.personAltersgruppe && convo.vars.personAltersgruppe !== t("kurs.kursInformationen.keine_angabe") && convo.vars.personAltersgruppe !== "") {

            personAltersgruppe  = " AND UPPER((";
            personAltersgruppe += "     (SELECT string_agg(ag.wert, ', ') AS kursInformationenAadressatengruppen";
            personAltersgruppe += "      FROM altersgruppe ag";
            personAltersgruppe += "               LEFT JOIN adressatengruppe adg";
            personAltersgruppe += "                         ON ag.id = adg.fk_altersgruppe";
            personAltersgruppe += "               LEFT JOIN kurs_adressatengruppe ka";
            personAltersgruppe += "                         ON ka.id_adressatengruppe = adg.id";
            personAltersgruppe += "      WHERE ka.id_kurs = k.id)";
            personAltersgruppe += " )) LIKE UPPER('%" + convo.vars.personAltersgruppe + "%')";

        }

        if (null != convo.vars.personGeschlecht && convo.vars.personGeschlecht !== t("kurs.kursInformationen.keine_angabe") && convo.vars.personGeschlecht !== "") {

            personGeschlecht  = " AND UPPER(( ";
            personGeschlecht += "     (SELECT string_agg(g.wert, ', ') AS kursInformationenGeschlecht ";
            personGeschlecht += "      FROM geschlecht g ";
            personGeschlecht += "               LEFT JOIN adressatengruppe adg ";
            personGeschlecht += "                         ON g.id = adg.fk_geschlecht ";
            personGeschlecht += "               LEFT JOIN kurs_adressatengruppe ka ";
            personGeschlecht += "                         ON ka.id_adressatengruppe = adg.id ";
            personGeschlecht += "      WHERE ka.id_kurs = k.id) ";
            personGeschlecht += "   )) LIKE UPPER('%" + convo.vars.personGeschlecht + "%') ";

        }

        //Person Informationen
        /////////////////////////////

        if (null != convo.vars.personKind && convo.vars.personKind !== t("kurs.kursInformationen.keine_angabe") && convo.vars.personKind !== "") {
            //personKind = " AND " + convo.vars.personKind;
            personKind = "  ";
        }
        if (null != convo.vars.personSprache && convo.vars.personSprache !== t("kurs.kursInformationen.keine_angabe") && convo.vars.personSprache !== "") {
            // personSprache = " AND " + convo.vars.personSprache;
            personSprache = " ";
        }


        //Generate Query
        /////////////////////////////
        let pgQuery  = " SELECT DISTINCT k.id AS id,";
        pgQuery += "                 an.offizieller_name                                   AS kursInformationenAnbieter,";
        pgQuery += "                 (SELECT string_agg(ag.wert, ', ') AS kursInformationenAltersgruppe";
        pgQuery += "                  FROM altersgruppe ag";
        pgQuery += "                           LEFT JOIN adressatengruppe adg";
        pgQuery += "                                     ON ag.id = adg.fk_altersgruppe";
        pgQuery += "                           LEFT JOIN kurs_adressatengruppe ka";
        pgQuery += "                                     ON ka.id_adressatengruppe = adg.id";
        pgQuery += "                  WHERE ka.id_kurs = k.id)                             AS kursInformationenAltersgruppe,";
        pgQuery += "                 (SELECT string_agg(g.wert, ', ') AS kursInformationenGeschlecht";
        pgQuery += "                  FROM geschlecht g";
        pgQuery += "                           LEFT JOIN adressatengruppe adg";
        pgQuery += "                                     ON g.id = adg.fk_geschlecht";
        pgQuery += "                           LEFT JOIN kurs_adressatengruppe ka";
        pgQuery += "                                     ON ka.id_adressatengruppe = adg.id";
        pgQuery += "                  WHERE ka.id_kurs = k.id)                             AS kursInformationenGeschlecht,";
        pgQuery += "                 i.wert                                                AS kursInformationenIntensitaet,";
        pgQuery += "                 kon.wert                                              AS kursInformationenKonversation,";
        pgQuery += "                 (SELECT SUM(betrag) FROM kosten WHERE fk_kurs = k.id) AS kursInformationenKosten,";
        pgQuery += "                 n.wert                                                AS kursInformationenNiveau,";
        pgQuery += "                 ort.wert                                              AS kursInformationenOrt,";
        pgQuery += "                 durz.tag                                              AS kursInformationenTag,";
        pgQuery += "                 durz.tag_start                                        AS kursInformationenZeit_TagStart,";
        pgQuery += "                 durz.tag_ende                                         AS kursInformationenZeit_TagEnde,";
        pgQuery += "                 durz.zeit_start                                       AS kursInformationenZeit_ZeitStart,";
        pgQuery += "                 durz.zeit_ende                                        AS kursInformationenZeit_ZeitEnde,";
        pgQuery += "                 concat_ws(', ', (SELECT string_agg(dz.wert, ', ') AS ziel";
        pgQuery += "                                  FROM didaktische_ziel dz";
        pgQuery += "                                           LEFT JOIN ziel z";
        pgQuery += "                                                     ON dz.id = z.fk_didaktische_ziel";
        pgQuery += "                                           LEFT JOIN kurs_ziel kz";
        pgQuery += "                                                     ON z.id = kz.id";
        pgQuery += "                                  WHERE kz.id_kurs = k.id),";
        pgQuery += "                           (SELECT string_agg(bz.wert, ', ')";
        pgQuery += "                            FROM berufliches_ziel bz";
        pgQuery += "                                     LEFT JOIN ziel z";
        pgQuery += "                                               ON bz.id = z.fk_berufliches_ziel";
        pgQuery += "                                     LEFT JOIN kurs_ziel kz";
        pgQuery += "                                               ON z.id = kz.id";
        pgQuery += "                            WHERE kz.id_kurs = k.id),";
        pgQuery += "                           (SELECT string_agg(n.wert, ', ')";
        pgQuery += "                            FROM niveau n";
        pgQuery += "                                     LEFT JOIN ziel z";
        pgQuery += "                                               ON n.id = z.fk_ziel_niveau";
        pgQuery += "                                     LEFT JOIN kurs_ziel kz";
        pgQuery += "                                               ON z.id = kz.id";
        pgQuery += "                            WHERE kz.id_kurs = k.id)";
        pgQuery += "                     )                                                 AS kursInformationenZiel";
        pgQuery += " FROM kurs k";
        pgQuery += "          LEFT JOIn intensitaet i";
        pgQuery += "                    ON k.fk_intensitaet = i.id";
        pgQuery += "          LEFT JOIN niveau n";
        pgQuery += "                    ON k.fk_niveau = n.id";
        pgQuery += "          LEFT JOIN sprachnachweis spn";
        pgQuery += "                    ON k.fk_sprachnachweis = spn.id";
        pgQuery += "          LEFT JOIN konversation kon";
        pgQuery += "                    ON k.fk_konversation = kon.id";
        pgQuery += "          LEFT JOIN anbieter an";
        pgQuery += "                    ON k.fk_anbieter = an.id";
        pgQuery += "          LEFT JOIN kontaktperson kp";
        pgQuery += "                    ON kp.fk_anbieter = an.id";
        pgQuery += "          LEFT JOIN anrede anr";
        pgQuery += "                    ON kp.fk_anrede = anr.id";
        pgQuery += "          LEFT JOIN kontaktdaten kond";
        pgQuery += "                    ON kp.fk_kontaktdaten = kond.id";
        pgQuery += "          LEFT JOIN anmeldung anm";
        pgQuery += "                    ON anm.fk_kurs = k.id";
        pgQuery += "          LEFT JOIN kontaktdaten kond2";
        pgQuery += "                    ON anm.fk_kontaktdaten = kond2.id";
        pgQuery += "          LEFT JOIN anmeldeart anma";
        pgQuery += "                    ON anm.fk_anmeldeart = anma.id";
        pgQuery += "          LEFT JOIN durchfuehrungszeit durz";
        pgQuery += "                    ON durz.fk_kurs = k.id";
        pgQuery += "          LEFT JOIN durchfuehrungsort duro";
        pgQuery += "                    ON durz.fk_durchfuerungsort = duro.id";
        pgQuery += "          LEFT JOIN adresse adr";
        pgQuery += "                    ON duro.fk_adresse = adr.id";
        pgQuery += "          LEFT JOIN ort";
        pgQuery += "                    ON adr.fk_ort = ort.id";
        pgQuery += " WHERE k.id IS NOT NULL";
        pgQuery += " " + kursInformationenAltersgruppe;
        pgQuery += " " + kursInformationenAnbieter;
        pgQuery += " " + kursInformationenGeschlecht;
        pgQuery += " " + kursInformationenIntensitaet;
        pgQuery += " " + kursInformationenKonversation;
        pgQuery += " " + kursInformationenKosten;
        pgQuery += " " + kursInformationenNiveau;
        pgQuery += " " + kursInformationenOrt;
        pgQuery += " " + kursInformationenTag;
        pgQuery += " " + kursInformationenZeit;
        pgQuery += " " + kursInformationenZiel;
        pgQuery += " " + personAltersgruppe;
        pgQuery += " " + personGeschlecht;
        pgQuery += " " + personKind;
        pgQuery += " " + personSprache;

        return pgQuery;
    },

    prepareKursQueryWithId: function (id) {

        let pgQuery  = " SELECT DISTINCT k.id AS id,";
            pgQuery += "                 an.offizieller_name                                   AS kursInformationenAnbieter,";
            pgQuery += "                 (SELECT string_agg(ag.wert, ', ') AS kursInformationenAltersgruppe";
            pgQuery += "                  FROM altersgruppe ag";
            pgQuery += "                           LEFT JOIN adressatengruppe adg";
            pgQuery += "                                     ON ag.id = adg.fk_altersgruppe";
            pgQuery += "                           LEFT JOIN kurs_adressatengruppe ka";
            pgQuery += "                                     ON ka.id_adressatengruppe = adg.id";
            pgQuery += "                  WHERE ka.id_kurs = k.id)                             AS kursInformationenAltersgruppe,";
            pgQuery += "                 (SELECT string_agg(g.wert, ', ') AS kursInformationenGeschlecht";
            pgQuery += "                  FROM geschlecht g";
            pgQuery += "                           LEFT JOIN adressatengruppe adg";
            pgQuery += "                                     ON g.id = adg.fk_geschlecht";
            pgQuery += "                           LEFT JOIN kurs_adressatengruppe ka";
            pgQuery += "                                     ON ka.id_adressatengruppe = adg.id";
            pgQuery += "                  WHERE ka.id_kurs = k.id)                             AS kursInformationenGeschlecht,";
            pgQuery += "                 i.wert                                                AS kursInformationenIntensitaet,";
            pgQuery += "                 kon.wert                                              AS kursInformationenKonversation,";
            pgQuery += "                 (SELECT SUM(betrag) FROM kosten WHERE fk_kurs = k.id) AS kursInformationenKosten,";
            pgQuery += "                 n.wert                                                AS kursInformationenNiveau,";
            pgQuery += "                 ort.wert                                              AS kursInformationenOrt,";
            pgQuery += "                 durz.tag                                              AS kursInformationenTag,";
            pgQuery += "                 durz.tag_start                                        AS kursInformationenZeit_TagStart,";
            pgQuery += "                 durz.tag_ende                                         AS kursInformationenZeit_TagEnde,";
            pgQuery += "                 durz.zeit_start                                       AS kursInformationenZeit_ZeitStart,";
            pgQuery += "                 durz.zeit_ende                                        AS kursInformationenZeit_ZeitEnde,";
            pgQuery += "                 concat_ws(', ', (SELECT string_agg(dz.wert, ', ') AS ziel";
            pgQuery += "                                  FROM didaktische_ziel dz";
            pgQuery += "                                           LEFT JOIN ziel z";
            pgQuery += "                                                     ON dz.id = z.fk_didaktische_ziel";
            pgQuery += "                                           LEFT JOIN kurs_ziel kz";
            pgQuery += "                                                     ON z.id = kz.id";
            pgQuery += "                                  WHERE kz.id_kurs = k.id),";
            pgQuery += "                           (SELECT string_agg(bz.wert, ', ')";
            pgQuery += "                            FROM berufliches_ziel bz";
            pgQuery += "                                     LEFT JOIN ziel z";
            pgQuery += "                                               ON bz.id = z.fk_berufliches_ziel";
            pgQuery += "                                     LEFT JOIN kurs_ziel kz";
            pgQuery += "                                               ON z.id = kz.id";
            pgQuery += "                            WHERE kz.id_kurs = k.id),";
            pgQuery += "                           (SELECT string_agg(n.wert, ', ')";
            pgQuery += "                            FROM niveau n";
            pgQuery += "                                     LEFT JOIN ziel z";
            pgQuery += "                                               ON n.id = z.fk_ziel_niveau";
            pgQuery += "                                     LEFT JOIN kurs_ziel kz";
            pgQuery += "                                               ON z.id = kz.id";
            pgQuery += "                            WHERE kz.id_kurs = k.id)";
            pgQuery += "                     )                                                 AS kursInformationenZiel,";
            pgQuery += "             an.offizieller_name AS kursInformationenAnbieter,";
            pgQuery += "             anr.wert AS kursKontaktperson_Anrede,";
            pgQuery += "             kp.name || ' ' || kp.vorname AS kursKontaktperson_Name,";
            pgQuery += "             kond.telefon AS kursKontaktperson_Telefon,";
            pgQuery += "             kond.telefon2 AS kursKontaktperson_Telefon2,";
            pgQuery += "             kond.mail AS kursKontaktperson_Mail,";
            pgQuery += "             kond.mail2 AS kursKontaktperson_Mail2,";
            pgQuery += "             kond.online_formular AS kursKontaktperson_Formular,";
            pgQuery += "             kond.url AS kursKontaktperson_Url,";
            pgQuery += "             durz.lektionen AS durchfuerungszeitLektionen,";
            pgQuery += "             duro.kinderhuetedienst AS durchfuerungsortKinderhuetedienst,";
            pgQuery += "             duro.raum AS durchfuerungsortRaum,";
            pgQuery += "             adr.adresse AS durchfuerungsort_Adresse,";
            pgQuery += "             adr.adresszusatz_1 AS durchfuerungsort_Adresszusatz1,";
            pgQuery += "             adr.adresszusatz_2 AS durchfuerungsort_Adresszusatz2,";
            pgQuery += "             adr.adresszusatz_3 AS durchfuerungsort_Adresszusatz3,";
            pgQuery += "             adr.plz AS durchfuerungsort_Plz";
            pgQuery += " FROM kurs k";
            pgQuery += "          LEFT JOIn intensitaet i";
            pgQuery += "                    ON k.fk_intensitaet = i.id";
            pgQuery += "          LEFT JOIN niveau n";
            pgQuery += "                    ON k.fk_niveau = n.id";
            pgQuery += "          LEFT JOIN sprachnachweis spn";
            pgQuery += "                    ON k.fk_sprachnachweis = spn.id";
            pgQuery += "          LEFT JOIN konversation kon";
            pgQuery += "                    ON k.fk_konversation = kon.id";
            pgQuery += "          LEFT JOIN anbieter an";
            pgQuery += "                    ON k.fk_anbieter = an.id";
            pgQuery += "          LEFT JOIN kontaktperson kp";
            pgQuery += "                    ON kp.fk_anbieter = an.id";
            pgQuery += "          LEFT JOIN anrede anr";
            pgQuery += "                    ON kp.fk_anrede = anr.id";
            pgQuery += "          LEFT JOIN kontaktdaten kond";
            pgQuery += "                    ON kp.fk_kontaktdaten = kond.id";
            pgQuery += "          LEFT JOIN anmeldung anm";
            pgQuery += "                    ON anm.fk_kurs = k.id";
            pgQuery += "          LEFT JOIN kontaktdaten kond2";
            pgQuery += "                    ON anm.fk_kontaktdaten = kond2.id";
            pgQuery += "          LEFT JOIN anmeldeart anma";
            pgQuery += "                    ON anm.fk_anmeldeart = anma.id";
            pgQuery += "          LEFT JOIN durchfuehrungszeit durz";
            pgQuery += "                    ON durz.fk_kurs = k.id";
            pgQuery += "          LEFT JOIN durchfuehrungsort duro";
            pgQuery += "                    ON durz.fk_durchfuerungsort = duro.id";
            pgQuery += "          LEFT JOIN adresse adr";
            pgQuery += "                    ON duro.fk_adresse = adr.id";
            pgQuery += "          LEFT JOIN ort";
            pgQuery += "                    ON adr.fk_ort = ort.id";
            pgQuery += " WHERE k.id = " + id;

            return pgQuery;
    }

};