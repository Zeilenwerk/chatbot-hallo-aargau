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

    addNewFeedback: function (convo, userId, date, rating, message = "") {

        const logHelper = require("./logHelper");

        const timeUtil = require("./timeUtil");

        const pgHelper = require("./pgHelper");
        const pgClient = pgHelper.getDB();
        pgClient.connect();

        let pgQuery = "INSERT INTO public.Feedback(" +
                            " FK_Benutzer, FK_Stern, erfasst_am, Nachricht)" +
                            " SELECT b.Id, s.Id, to_timestamp("+ timeUtil.getEpoch(date) + "),  '" + message + "' " +
                            " FROM Benutzer b, Stern s " +
                            " WHERE b.Benutzer_Kennung = '" + userId + "'" +
                            " AND s.code = '" + rating + "'";

        logHelper.debug("Feedback DB Query: " + pgQuery);

        pgClient.query(pgQuery,
            (err, res) => {
                if (err) require("./errorHelper").displayErrorMessage(convo, err.stack, false);

                pgClient.end();

                logHelper.info("Feedback DB Response:");
                logHelper.info(JSON.stringify(res));

            });

        return null;
    }
};