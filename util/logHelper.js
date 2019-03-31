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

    addNewUser: function (userId, date) {

        console.log("Add new user to DB: " + userId + " at " + date);

        const timeUtil = require("./timeUtil");
        const pgHelper = require("./pgHelper");
        const pgClient = pgHelper.getDB();
        pgClient.connect();

        //If user exists do nothing, else insert User to DB
        let pgQuery = "INSERT INTO public.Benutzer(" +
            " Benutzer, Datum_Hinzugefuegt)" +
            " VALUES ('"+ userId +"', to_timestamp(" + timeUtil.getEpoch(date) + "))" +
            " ON CONFLICT (Benutzer) DO NOTHING";

        console.log("DB Query: " + pgQuery);

        pgClient.query(pgQuery,
            (err, res) => {
                if (err) throw new Error(err.stack);

                pgClient.end();

                console.log("DB Response:");
                console.log(res);

            });

        return null;


    },


    storeMessage: function (userId, messageType, date, message) {

        console.log("Store Message");

        const timeUtil = require("./timeUtil");
        const pgHelper = require("./pgHelper");
        const pgClient = pgHelper.getDB();
        pgClient.connect();

        let pgQuery = "INSERT INTO public.Benutzer_Log(" +
                            " Nachricht_Typ, Benutzer, Zeit, Nachricht)" +
                            " SELECT n.Id, b.Id, to_timestamp(" + timeUtil.getEpoch(date) + "), '" + message + "' " +
                            "FROM Benutzer b, Nachricht_Typ n " +
                            "WHERE b.Benutzer = '" + userId + "'" +
                            "AND n.code = '" + messageType + "'";

        console.log("DB Query: " + pgQuery);

        pgClient.query(pgQuery,
            (err, res) => {
                if (err) throw new Error(err.stack);

                pgClient.end();

                console.log("DB Response:");
                console.log(res);

            });

        return null;
    },

    //Log Level
    // 1 = DEBUG
    // 2 = INFO
    // 3 = WARNING
    // 4 = ERROR
    storeLogEntry: function (logLevel, date, entry) {

        console.log("Store Log Entry");

        const timeUtil = require("./timeUtil");
        const pgHelper = require("./pgHelper");
        const pgClient = pgHelper.getDB();

        //TODO: put in config file
        debugLogEnabled = false;
        infoLogEnabled = true;
        warningLogEnabled = true;
        ErrorLogEnabled = true;

        //If debug Log is not enabled, dont log to DB
        if(!debugLogEnabled && logLevel === 1){
            console.log(date + " (" + logLevel.toUpperCase() + ") - " + entry);
            return null;
        }

        //If info Log is not enabled, dont log to DB
        if(!infoLogEnabled && logLevel === 2){
            console.log(date + " (" + logLevel.toUpperCase() + ") - " + entry);
            return null;
        }

        //If warning Log is not enabled, dont log to DB
        if(!warningLogEnabled && logLevel === 3){
            console.log(date + " (" + logLevel.toUpperCase() + ") - " + entry);
            return null;
        }

        //If error Log is not enabled, dont log to DB
        if(!ErrorLogEnabled && logLevel === 4){
            console.log(date + " (" + logLevel.toUpperCase() + ") - " + entry);
            return null;
        }

        pgClient.connect();

        let pgQuery = "INSERT INTO public.Bot_Log(" +
            " Level, Zeit, Eintrag)" +
            " SELECT l.Id, to_timestamp(" + timeUtil.getEpoch(date) + "), '" + entry + "' " +
            " FROM Log_Level l " +
            " WHERE l.code = " + logLevel;

        console.log("DB Query: " + pgQuery);

        pgClient.query(pgQuery,
            (err, res) => {
                if (err) throw new Error(err.stack);

                pgClient.end();

                console.log("DB Response:");
                console.log(res);

            });

        return null;
    }
};