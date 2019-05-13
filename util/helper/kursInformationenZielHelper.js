module.exports = {

    getDidaktischeZieleFromDB: function(bot, message, convo, luisUtil, nextThread, returnDbEntries){

        const pgUtil = require("../pgUtil");
        const logUtil = require("../logUtil");

        let pgQuery  = " SELECT DISTINCT dz.wert AS ziel";
        pgQuery     += " FROM didaktische_ziel dz";
        pgQuery     += "          LEFT JOIN ziel z";
        pgQuery     += "                    ON dz.id = z.fk_didaktische_ziel";
        pgQuery     += "          LEFT JOIN kurs_ziel kz";
        pgQuery     += "                    ON z.id = kz.id";
        pgQuery     += " UNION";
        pgQuery     += " SELECT DISTINCT bz.wert";
        pgQuery     += " FROM berufliches_ziel bz";
        pgQuery     += "          LEFT JOIN ziel z";
        pgQuery     += "                    ON bz.id = z.fk_berufliches_ziel";
        pgQuery     += "          LEFT JOIN kurs_ziel kz";
        pgQuery     += "                    ON z.id = kz.id";
        pgQuery     += " UNION";
        pgQuery     += " SELECT DISTINCT n.wert";
        pgQuery     += " FROM niveau n";
        pgQuery     += "          LEFT JOIN ziel z";
        pgQuery     += "                    ON n.id = z.fk_ziel_niveau";
        pgQuery     += "          LEFT JOIN kurs_ziel kz";
        pgQuery     += "                    ON z.id = kz.id";

        logUtil.debug("Didaktisches Ziel Query: " + pgQuery);

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
                    logUtil.debug("Didaktisches Ziel to display from : " + JSON.stringify(res.rows));
                    returnDbEntries(convo, res.rows);
                } else {
                    returnDbEntries(convo, "");
                }

            });
    },

    getBeruflicheZieleFromDB: function(bot, message, convo, luisUtil, nextThread, returnDbEntries){

        const pgUtil = require("../pgUtil");
        const logUtil = require("../logUtil");

        let pgQuery  = " SELECT DISTINCT dz.wert AS ziel";
        pgQuery     += " FROM didaktische_ziel dz";
        pgQuery     += "          LEFT JOIN ziel z";
        pgQuery     += "                    ON dz.id = z.fk_didaktische_ziel";
        pgQuery     += "          LEFT JOIN kurs_ziel kz";
        pgQuery     += "                    ON z.id = kz.id";
        pgQuery     += " UNION";
        pgQuery     += " SELECT DISTINCT bz.wert";
        pgQuery     += " FROM berufliches_ziel bz";
        pgQuery     += "          LEFT JOIN ziel z";
        pgQuery     += "                    ON bz.id = z.fk_berufliches_ziel";
        pgQuery     += "          LEFT JOIN kurs_ziel kz";
        pgQuery     += "                    ON z.id = kz.id";
        pgQuery     += " UNION";
        pgQuery     += " SELECT DISTINCT n.wert";
        pgQuery     += " FROM niveau n";
        pgQuery     += "          LEFT JOIN ziel z";
        pgQuery     += "                    ON n.id = z.fk_ziel_niveau";
        pgQuery     += "          LEFT JOIN kurs_ziel kz";
        pgQuery     += "                    ON z.id = kz.id";
        logUtil.debug("Berufliches Ziel Query: " + pgQuery);

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
                    logUtil.debug("Berufliches Ziel to display from : " + JSON.stringify(res.rows));
                    returnDbEntries(convo, res.rows);
                } else {
                    returnDbEntries(convo, "");
                }

            });
    }


};