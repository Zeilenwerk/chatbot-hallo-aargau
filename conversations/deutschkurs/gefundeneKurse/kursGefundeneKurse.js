module.exports = {
    displayGefundeneKurse: function (addMessage, convo, maxKurse = 3, offsetKurse = 0) {

        const pgHelper = require("../../../util/pgHelper");

        //TODO: Get UQery result to display in Chatbot
        //TODO: Handle multiple Results from PG DB
        //TODO: Add Kosten, Ort und Anbieter

        //Notwendige Informationen
        let kursOrt = "kursOrt = '" + convo.vars.kursOrt + "' ";
        let kursBezirk = "AND kursBezirk = '" + convo.vars.kursBezirk + "' ";
        let kursTag = "AND kursTag = '" + convo.vars.kursTag + "' ";
        let kursZeit = "AND kursZeit = '" + convo.vars.kursZeit + "' ";
        let kursNiveau = "AND kursNiveau = '" + convo.vars.kursNiveau + "' ";

        //Zusatzinfos
        let kursAdressatengruppe = (convo.vars.kursAdressatengruppe !== "None") ? "AND adressatengruppe = '" + convo.vars.kursAdressatengruppe + "' " : "";

        //TODO: Add User Info to WHERE Filter
        let query_where = "WHERE " + kursOrt + kursBezirk + kursTag + kursZeit + kursNiveau + kursAdressatengruppe;
        let query_orderBy = "";
        let query_groupBy = "";
        let query_offset = "OFFSET " + offsetKurse;
        let query_limit = "LIMIT " + maxKurse;

        console.log("Query Filters = " + query_where + " " + query_offset + " " + query_limit);

        const pgClient = pgHelper.getDB();
        pgClient.connect();

        // let pgQuery = "SELECT * FROM " + process.env.BOTKIT_STORAGE_POSTGRES_DATABASE_TABLE_DEUTSCHKURS + " " + query_where + " " + query_offset + " " + query_limit;
        let pgQuery = "SELECT * FROM " + process.env.BOTKIT_STORAGE_POSTGRES_DATABASE_TABLE_DEUTSCHKURS + " " + query_offset + " " + query_limit;

        pgClient.query(pgQuery,
            (err, res) => {
                if (err) throw new Error(err.stack);

                pgClient.end();

                console.log("DB Response:");
                console.log(res);

                if(res.rows.length > 0){
                    addMessage("Ich habe folgende Kurse gefunden");
                }else{
                    addMessage("Leider habe ich für dieses Suchkriterium keine Kurse gefunden");
                    convo.gotoThread("kursNotwendigeInfosMenu");
                }

                for (var i = 0; i < res.rows.length; i++) {

                    var oRow = res.rows[i];

                    addMessage("Kurs #\ " + i + ": Wird vom " + oRow.Gesamtkurs_Start + " bis zum " + oRow.Gesamtkurs_Ende +
                        " (" + oRow.Gesamtkurs_Dauer_Tage + " Tage) durchgeführt. Der Kurs Startet um " + oRow.Einzelkurs_Start + " und endet um " +
                        oRow.Einzelkurs_Ende + " (" + oRow.Einzelkurs_Dauer_Minuten + " Minuten)");

                }

                if(res.rows.length > 0){
                    convo.gotoThread("gefundeneKurse");
                }

            });
    },

    displayKursInfromationen : function(addMessage, convo, kursNummer, kursOffset){

    }
};