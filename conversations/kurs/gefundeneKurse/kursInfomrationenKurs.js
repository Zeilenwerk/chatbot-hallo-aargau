module.exports = {
    displayKursInfromationen: function (addMessage, convo, maxKurse = 1, offsetKurse = 0) {
        const pgHelper = require("../../../util/pgHelper");
        const { t } = require('../../../node_modules/localizify');
        const logHelper = require("../../../util/logHelper");

        //Notwendige Informationen
        let kursOrt = "";
        if(convo.vars.kursBezirk && convo.vars.kursBezirk !== "None"){
            kursOrt = " AND LOWER(durchfuerungsort.ort) = '" + convo.vars.kursBezirk.toLowerCase() + "' ";
        }else{
            kursOrt = " AND LOWER(durchfuerungsort.ort) = '" + convo.vars.kursOrt.toLowerCase() + "' ";
        }
        let kursTag = " AND LOWER(tage.tag) = '" + convo.vars.kursTag.toLowerCase() + "' ";
        let kursZeit_start = " AND durchfuehrungszeiten.einzelkursstart >= '" + convo.vars.kursZeit + ":00' ";
        //Add 3 Hours to the
        let kursZeit_ende =" AND durchfuehrungszeiten.einzelkursstart <= '" + (parseInt(convo.vars.kursZeit.substring(0, 2))+3) +
                            convo.vars.kursZeit.substring(2, convo.vars.kursZeit.length) + ":00' ";

        let kursNiveau = " AND LOWER(niveau.niveau) = '" + convo.vars.kursNiveau.toLowerCase() + "' ";

        //Zusatzinfos
        let kursAdressatengruppe = (convo.vars.kursAdressatengruppe !== "None") ? " AND LOWER(adressatengruppe.adressatengruppe) LIKE '" + convo.vars.kursAdressatengruppe.toLowerCase() + "' " : "";
        let kursAnbieter = (convo.vars.kursAnbieter!== "None") ? " AND LOWER(anbieter.name) = '" + convo.vars.kursAnbieter.toLowerCase() + "' " : "";
        //0 = Wochenkurs | 1 = intensivkurs
        let kursIntensitaet = (convo.vars.kursIntensitaet!== "None") ? " AND deutschkurs.kursintensitaet = '" + convo.vars.kursIntensitaet + "' " : "";

        let kursKosten = "";
        if(convo.vars.kursKosten!== "None"){
            switch (convo.vars.kursKosten.toLowerCase()) {
                case "gratis":
                    kursKosten = " AND kosten.gesamtkurs <= 0 ";
                    break;
                case "500":
                    kursKosten = " AND kosten.gesamtkurs <= 500 ";
                    break;
                case "1000":
                    kursKosten = " AND kosten.gesamtkurs <= 1000 ";
                    break;
                case "1000+":
                    kursKosten = " AND kosten.gesamtkurs >= 0 ";
                    break;
                default:
                    kursKosten = "";
                    break;
            }
        }

        //Offset and Limit
        let query_offset = " OFFSET " + offsetKurse;
        let query_limit = " LIMIT " + maxKurse;

        const pgClient = pgHelper.getDB();
        pgClient.connect();

        // let pgQuery = "SELECT * FROM " + process.env.BOTKIT_STORAGE_POSTGRES_DATABASE_TABLE_DEUTSCHKURS + " " + query_where + " " + query_offset + " " + query_limit;
        //SELECT All Kurs Information with kurs id"
        let pgQuery = "SELECT deutschkurs.id,"
                        //Details zeit/datum/tag"
            + "        tage.tag                                                     AS tage_tag,"
            + "        TO_CHAR(durchfuehrungszeiten.gesamtkursstart, 'dd.MM.yyyy')  AS durchfuehrungszeiten_gesamtkursstart,"
            + "        TO_CHAR(durchfuehrungszeiten.gesamtkursende, 'dd.MM.yyyy')   AS durchfuehrungszeiten_gesamtkursende,"
            + "        TO_CHAR(durchfuehrungszeiten.einzelkursstart, 'HH:mm')       AS durchfuehrungszeiten_einzelkursstart,"
            + "        TO_CHAR(durchfuehrungszeiten.einzelkursende, 'HH:mm')        AS durchfuehrungszeiten_einzelkursende,"
                        //Details Deutscjklurs"
            + "        deutschkurs.kursintensitaet                                  AS deutschkurs_kursintensitaet,"
            + "        deutschkurs.kurszweck                                        AS deutschkurs_kurszweck,"
            + "        deutschkurs.kursbeschreibung                                 AS deutschkurs_kursbeschreibung,"
                        //Details Addressatengruppe"
            + "        adressatengruppe.adressatengruppe                            AS adressatengruppe_adressatengruppe,"
            + "        adressatengruppe.beschreibung                                AS adressatengruppe_beschreibung,"
                        //Details Niveau"
            + "        niveau.niveau                                                AS niveau_niveau,"
            + "        niveau.beschreibung                                          AS niveau_beschreibung,"
                        //Details Kosten"
            + "        kosten.gesamtkurs                                            AS kosten_gesamtkurs,"
            + "        kosten.subventioniert                                        AS kosten_subventioniert,"
            + "        kosten.lehrmaterial                                          AS kosten_lehrmaterial,"
            + "        kosten.einzelkurs                                            AS kosten_einzelkurs,"
            + "        kosten.einstufungstest                                       AS kosten_einstufungstest,"
                        //Details anbieter"
            + "        anbieter.name                                                AS anbieter_name,"
            + "        anbieter.beschreibung                                        AS anbieter_beschreibung,"
            + "        anbieter.ort                                                 AS anbieter_ort,"
            + "        anbieter.plz                                                 AS anbieter_plz,"
            + "        anbieter.strasse                                             AS anbieter_strasse,"
            + "        anbieter.mail                                                AS anbieter_mail,"
            + "        anbieter.telefon                                             AS anbieter_telefon,"
            + "        anbieter.website                                             AS anbieter_website,"
                        //Kontakperson (if exists)"
            + "        (SELECT kontaktperson.name"
            + "         FROM kontaktperson"
            + "         WHERE kontaktperson.id = (SELECT id_kontaktperson"
            + "                                   FROM anbieter_kontaktperson"
            + "                                   WHERE id_anbieter = anbieter.id)) AS kontaktperson_name,"
            + "        (SELECT kontaktperson.telefon"
            + "         FROM kontaktperson"
            + "         WHERE kontaktperson.id = (SELECT id_kontaktperson"
            + "                                   FROM anbieter_kontaktperson"
            + "                                   WHERE id_anbieter = anbieter.id)) AS kontaktperson_telefon,"
                        //Details Ort"
            + "        durchfuerungsort.ort                                         AS durchfuerungsort_ort,"
            + "        durchfuerungsort.plz                                         AS durchfuerungsort_plz,"
            + "        durchfuerungsort.strasse                                     AS durchfuerungsort_strasse,"
            + "        durchfuerungsort.raum                                        AS durchfuerungsort_raum"
            + " FROM deutschkurs"
            + "        JOIN anbieter ON anbieter.id = deutschkurs.kursanbieter"
            + "        JOIN kosten ON kosten.id = deutschkurs.kurskosten"
            + "        JOIN durchfuerungsort ON durchfuerungsort.id = deutschkurs.kursort"
            + "        JOIN durchfuehrungszeiten ON durchfuehrungszeiten.id = deutschkurs.kurszeit"
            + "        JOIN niveau ON niveau.id = deutschkurs.kursniveau"
            + "        JOIN tage ON tage.id in (SELECT id_tag"
            + "                                 FROM zeit_tag"
            + "                                 WHERE id_zeit = durchfuehrungszeiten.id)"
            + "        JOIN adressatengruppe ON adressatengruppe.id in (SELECT id_adressatengruppe"
            + "                                                         FROM kurs_adressatengruppe"
            + "                                                         WHERE id_kurs = deutschkurs.id)"
            //Necessary Information
            + " AND (durchfuehrungszeiten.gesamtkursstart IS NULL OR durchfuehrungszeiten.gesamtkursstart <= now())"
            + kursTag
            + kursZeit_start
            + kursZeit_ende
            + kursNiveau
            + kursOrt
            //--Additional Information
            + kursAdressatengruppe
            + kursAnbieter
            + kursIntensitaet
            + kursKosten
            //Offset, Limit and Order By
            + " ORDER BY deutschkurs.id"
            + query_offset
            + query_limit;

        logHelper.info("DB Query: " + pgQuery);

        pgClient.query(pgQuery,
            (err, res) => {
                if (err) throw new Error(err.stack);

                pgClient.end();

                logHelper.info("DB Response:");
                logHelper.info(JSON.stringify(res));

                if (res.rows.length > 0) {
                    addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kurs_Informationen_Gefunden'));
                } else {
                    addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kurs_Informationen_nicht_Gefunden'));
                    convo.gotoThread("kursNotwendigeInfosMenu");
                }

                var oRow = res.rows[0];

                if(oRow){

                    if(oRow.deutschkurs_kursbeschreibung != null && oRow.deutschkurs_kursbeschreibung !== ""){
                        addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursBeschreibung', {kursBeschreibung: oRow.deutschkurs_kursbeschreibung}));
                    }
                    if(oRow.deutschkurs_kurszweck != null && oRow.deutschkurs_kurszweck !== ""){
                        addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursZweck', {kursZweck: oRow.deutschkurs_kurszweck}));
                    }

                   if(oRow.tage_tag != null && oRow.tage_tag !== "" ){
                        addMessage("Der Kurs wird " + oRow.tage_tag + "s durchgeführt.");
                        addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kurs_Informationen_nicht_Gefunden', {kursBeschreibung: oRow.deutschkurs_kursbeschreibung}));
                    }

                    if(oRow.durchfuehrungszeiten_einzelkursende != null  && oRow.durchfuehrungszeiten_einzelkursende !== "" && oRow.durchfuehrungszeiten_einzelkursstart != null && oRow.durchfuehrungszeiten_einzelkursstart !== "" ){
                        addMessage("Der Kurs Startet um " + oRow.durchfuehrungszeiten_einzelkursstart + " Uhr und endet um " + oRow.durchfuehrungszeiten_einzelkursende + " Uhr.");
                        addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kurs_Informationen_nicht_Gefunden', {kursBeschreibung: oRow.deutschkurs_kursbeschreibung}));
                    }

                    addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursAnbieter', {kursAnbieter: oRow.anbieter_name}));

                    if(oRow.durchfuerungsort_strasse != null && oRow.durchfuerungsort_strasse !== "" ){
                        addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursOrt', {ortStrasse: oRow.durchfuerungsort_strasse, ortPlz: oRow.durchfuerungsort_plz, ortName: oRow.durchfuerungsort_ort}));

                    }

                    if(oRow.anbieter_mail != null && oRow.anbieter_mail !== "" ){
                        addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursAnbieter_Mail', {kursAnbieter_Mail: oRow.anbieter_mail}));
                    }
                    if(oRow.anbieter_telefon != null && oRow.anbieter_telefon !== "" ){
                        addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursAnbieter_Telefon', {kursAnbieter_Telefon: oRow.anbieter_telefon}));
                    }
                    if(oRow.anbieter_website != null && oRow.anbieter_website !== "" ){
                        addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursAnbieter_Website', {kursAnbieter_Website: oRow.anbieter_website}));
                    }
                    if(oRow.kontaktperson_name != null && oRow.kontaktperson_name !== "" ){
                        addMessage(t('kurs.gefundeneKurse.kursInformationenKurs.kursKontaktperson', {kursKontaktperson_Name: oRow.kontaktperson_name, kursKontaktperson_Telefon: oRow.kontaktperson_telefon}));
                    }


                }


                if (res.rows.length > 0) {
                    convo.gotoThread("askFeedback");
                }

            });
    }
};