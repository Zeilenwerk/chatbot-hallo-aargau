module.exports = {

    getIntensitaetFromDB: function(bot, message, convo, luisUtil, nextThread, returnDbEntries){

        const pgUtil = require("../pgUtil");
        const logUtil = require("../logUtil");

        let pgQuery = "SELECT DISTINCT * FROM intensitaet";
        logUtil.debug("Intensitaet Query: " + pgQuery);

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
                    logUtil.debug("Intensitaet to display from : " + JSON.stringify(res.rows));
                    returnDbEntries(convo, res.rows);
                } else {
                    returnDbEntries(convo, "");
                }

            });
    }


};