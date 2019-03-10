module.exports = {
    displayGefundeneKurse: function (addMessage, convo, maxKurse = false, offset = false) {

        addMessage("Ich habe folgende Kurse gefunden");

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
        let where = "WHERE " + kursOrt + kursBezirk + kursTag + kursZeit + kursNiveau + kursAdressatengruppe;
        let orderBy = "";
        let groupBy = "";


        const pgClient = new pg.Client(dbConfig);
        pgClient.connect();

        var pgQuery = "SELECT * FROM " + process.env.BOTKIT_STORAGE_POSTGRES_DATABASE_TABLE_DEUTSCHKURS + " " + where;

        pgClient.query(pgQuery,
            (err, res) => {
                if (err) throw new Error(err.stack);

                pgClient.end();

                for (var i = 0; i < res.rows.length; i++) {

                    var oRow = res.rows[i];

                    console.log("Kurs #" + i + ": Wird vom " + oRow.Gesamtkurs_Start + " bis zum " + oRow.Gesamtkurs_Ende +
                        " (" + oRow.Gesamtkurs_Dauer_Tage + " Tage) durchgeführt. Der Kurs Startet um " + oRow.Einzelkurs_Start + " und endet um " +
                        oRow.Einzelkurs_Ende + " (" + oRow.Einzelkurs_Dauer_Minuten + " Minuten)");

                    addMessage("Kurs #\ " + i + ": Wird vom " + oRow.Gesamtkurs_Start + " bis zum " + oRow.Gesamtkurs_Ende +
                        " (" + oRow.Gesamtkurs_Dauer_Tage + " Tage) durchgeführt. Der Kurs Startet um " + oRow.Einzelkurs_Start + " und endet um " +
                        oRow.Einzelkurs_Ende + " (" + oRow.Einzelkurs_Dauer_Minuten + " Minuten)");

                }

            });

        console.log("Results: " + results);
    }
};