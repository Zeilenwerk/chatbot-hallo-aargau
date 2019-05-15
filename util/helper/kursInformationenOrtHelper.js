module.exports = {

    getOrtFromDB: function(bot, message, convo, luisUtil, nextThread, returnDbEntries){

        const pgUtil = require("../pgUtil");
        const logUtil = require("../logUtil");

        let pgQuery  = " SELECT DISTINCT o.wert, o.code, o.id FROM durchfuehrungsort d";
            pgQuery += " FULL JOIN adresse a";
            pgQuery += " ON d.fk_adresse = a.id";
            pgQuery += " FULL JOIN ort o";
            pgQuery += " ON a.fk_ort = o.id";
        logUtil.debug("Ort Query: " + pgQuery);

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
                    logUtil.debug("Ort to display from : " + JSON.stringify(res.rows));
                    returnDbEntries(convo, res.rows);
                } else {
                    returnDbEntries(convo, "");
                }

            });
    }


};