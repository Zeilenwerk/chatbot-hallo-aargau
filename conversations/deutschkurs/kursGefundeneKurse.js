module.exports = {
    menuGefundeneKurse: function (convo, addMessage) {

        //Get Postgres Middleware
        var pg = require('pg');
        // var async = require('async');
        // var q = require('q');

        const dbConfig = {
            user: process.env.BOTKIT_STORAGE_POSTGRES_USER || 'botkit',
            database: process.env.BOTKIT_STORAGE_POSTGRES_DATABASE || 'botkit_test',
            password: process.env.BOTKIT_STORAGE_POSTGRES_PASSWORD || 'botkit',
            host: process.env.BOTKIT_STORAGE_POSTGRES_HOST || 'localhost',
            port: process.env.BOTKIT_STORAGE_POSTGRES_PORT || '5432'
        };

        //TODO: Get UQery result to display in Chatbot
        //TODO: Handle multiple Results from PG DB
        //TODO: Add User Info to WHERE Filter
        //TODO: Add Kosten, Ort und Anbieter

        const pgClient = new pg.Client(dbConfig);
        pgClient.connect();

        var pgQuery = "SELECT * FROM " + process.env.BOTKIT_STORAGE_POSTGRES_DATABASE_TABLE_DEUTSCHKURS;

        pgClient.query(pgQuery,
            (err, res) => {
                if(err) throw new Error(err.stack);

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