/*
 * Store
 *
 * @param sEntitType --> Type der Entität die gesucht wird
 * @param res --> Response Element der konversation
 *
 * @return aRetVal --> Empty Array || Entity Name && Entity Resolution in an array
 *
 * */
module.exports = {

    addNewFeedback: function (bot, message, convo, userId, date, rating, userMessage = "") {

        const logUtil = require("./logUtil");
        const timeUtil = require("./timeUtil");
        const pgUtil = require("./pgUtil");
        const errorUtil = require("./errorUtil");


        const pgClient = pgUtil.getDB();
        pgClient.connect();

        let pgQuery = "INSERT INTO public.Feedback(" +
                            " FK_Benutzer, FK_Stern, erfasst_am, Nachricht)" +
                            " SELECT b.Id, s.Id, to_timestamp("+ timeUtil.getEpoch(date) + "),  '" + userMessage + "' " +
                            " FROM Benutzer b, Stern s " +
                            " WHERE b.Benutzer_Kennung = '" + userId + "'" +
                            " AND s.code = '" + rating + "'";

        logUtil.debug("Feedback DB Query: " + pgQuery);

        try{
            pgClient.query(pgQuery,
                (err, res) => {
                    if (err) throw new Error(err.stack);

                    pgClient.end();

                    logUtil.info("Feedback DB Response:");
                    logUtil.info(JSON.stringify(res));

                });
        }catch(err){
            errorUtil.displayErrorMessage(bot, message, err, false, false)
        }



        return null;
    }
};