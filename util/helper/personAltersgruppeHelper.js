module.exports = {

    getAltersgruppenFromDB: function(bot, message, convo, luisUtil, nextThread, returnDbEntries){

        const pgUtil = require("../pgUtil");
        const logUtil = require("../logUtil");

        let pgQuery = "SELECT DISTINCT * FROM altersgruppe";
        logUtil.debug("Altersgruppen Query: " + pgQuery);

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
                    logUtil.debug("Altersgruppen to display from : " + JSON.stringify(res.rows));
                    returnDbEntries(convo, res.rows);
                } else {
                    returnDbEntries(convo, "");
                }

            });
    }


};