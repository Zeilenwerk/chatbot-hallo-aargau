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

    addNewFeedback: function (userId, date, rating, message = "") {

        const logHelper = require("./logHelper");

        const timeUtil = require("./timeUtil");

        const pgHelper = require("./pgHelper");
        const pgClient = pgHelper.getDB();
        pgClient.connect();

        let pgQuery = "INSERT INTO public.Feedback(" +
                            " Benutzer, Zeit, Sterne, Nachricht)" +
                            " SELECT b.Id, to_timestamp("+ timeUtil.getEpoch(date) + "), s.Id, '" + message + "' " +
                            " FROM Benutzer b, Stern s " +
                            " WHERE b.Benutzer = '" + userId + "'" +
                            " AND s.code = '" + rating + "'";

        logHelper.debug("Feedback DB Query: " + pgQuery);

        pgClient.query(pgQuery,
            (err, res) => {
                if (err) throw new Error(err.stack);

                pgClient.end();

                logHelper.info("Feedback DB Response:");
                logHelper.info(JSON.stringify(res));

            });

        return null;
    }
};