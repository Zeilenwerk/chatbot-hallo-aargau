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

        this.debug("Add new user to DB: " + userId + " at " + date);

        const timeUtil = require("./timeUtil");
        const pgHelper = require("./pgHelper");
        const pgClient = pgHelper.getDB();
        pgClient.connect();

        //If user exists do nothing, else insert User to DB
        let pgQuery = "INSERT INTO public.Benutzer(" +
            " Benutzer_Kennung, Registriert_am)" +
            " VALUES ('" + userId + "', to_timestamp(" + timeUtil.getEpoch(date) + "))" +
            " ON CONFLICT (Benutzer_Kennung) DO NOTHING";

        this.debug("Benutzer DB Query: " + pgQuery);

        pgClient.query(pgQuery,
            (err, res) => {
                if (err) require("./errorHelper").displayErrorMessage(convo, err.stack, false);

                pgClient.end();

                this.debug("Add New User DB Response:");
                this.debug(JSON.stringify(res));

            });

        return null;


    },

    debug: function(entry){

        const timeUtil = require("./timeUtil");

        let logLineDetails = ((new Error().stack).split("at ")[3]).trim();
        entry = logLineDetails + " - " + entry;

        let date = new Date();
        let logLevel = 1;

        if (process.env.LOG_DEBUG_2_CONSOLE === "true") {
            console.log(timeUtil.formatDateTime(date) + " (" + this.getLogLevelString(logLevel) + ") - " + entry);
        }

        //If debug Log is not enabled, dont log to DB
        if (process.env.LOG_DEBUG_2_DB === "true" ) this.logEntry_2_DB(logLevel, date, entry);
        if (process.env.LOG_DEBUG_2_FILE === "true") this.logEntry_2_File(logLevel, date, entry);

    },

    info: function(entry){

        const timeUtil = require("./timeUtil");

        let logLineDetails = ((new Error().stack).split("at ")[3]).trim();
        entry = logLineDetails + " - " + entry;

        let date = new Date();
        let logLevel = 2;

        if (process.env.LOG_INFO_2_CONSOLE === "true") {
            console.log(timeUtil.formatDateTime(date) + " (" + this.getLogLevelString(logLevel) + ") - " + entry);
        }

        //If debug Log is not enabled, dont log to DB
        if (process.env.LOG_INFO_2_DB === "true" ) this.logEntry_2_DB(logLevel, date, entry);
        if (process.env.LOG_INFO_2_FILE === "true") this.logEntry_2_File(logLevel, date, entry);

    },

    warn: function(entry){

        const timeUtil = require("./timeUtil");

        let logLineDetails = ((new Error().stack).split("at ")[3]).trim();
        entry = logLineDetails + " - " + entry;

        let date = new Date();
        let logLevel = 3;

        if (process.env.LOG_WARN_2_CONSOLE === "true") {
            console.log(timeUtil.formatDateTime(date) + " (" + this.getLogLevelString(logLevel) + ") - " + entry);
        }

        //If debug Log is not enabled, dont log to DB
        if (process.env.LOG_WARN_2_DB === "true" ) this.logEntry_2_DB(logLevel, date, entry);
        if (process.env.LOG_WARN_2_FILE === "true") this.logEntry_2_File(logLevel, date, entry);

    },

    error: function(entry){

        const timeUtil = require("./timeUtil");

        let logLineDetails = ((new Error().stack).split("at ")[3]).trim();
        entry = logLineDetails + " - " + entry;

        let date = new Date();
        let logLevel = 4;

        if (process.env.LOG_ERROR_2_CONSOLE === "true") {
            console.log(timeUtil.formatDateTime(date) + " (" + this.getLogLevelString(logLevel) + ") - " + entry);
        }

        //If debug Log is not enabled, dont log to DB
        if (process.env.LOG_ERROR_2_DB === "true" ) this.logEntry_2_DB(logLevel, date, entry);
        if (process.env.LOG_ERROR_2_FILE === "true") this.logEntry_2_File(logLevel, date, entry);

    },

    //Log Level
    // 1 = DEBUG
    // 2 = INFO
    // 3 = WARNING
    // 4 = ERROR
    logEntry_2_DB: function (logLevel, date, entry) {

        const timeUtil = require("./timeUtil");

        if (process.env.LOG_2_DB === "true"){

            const pgHelper = require("./pgHelper");
            const pgClient = pgHelper.getDB();

            pgClient.connect();

            let pgQuery = "INSERT INTO public.Bot_Log(" +
                " Level, Erfasst_am, Eintrag)" +
                " SELECT l.Id, to_timestamp(" + timeUtil.getEpoch(date) + "), '" + pgHelper.escape_string(entry) + "' " +
                " FROM Log_Level l " +
                " WHERE l.code = " + logLevel;

            pgClient.query(pgQuery,
                (err, res) => {
                    if (err) require("./errorHelper").displayErrorMessage(convo, err.stack, false);
                    pgClient.end();
                });
        }

        return null;
    },

    logEntry_2_File: function (logLevel, date, entry) {

        const timeUtil = require("./timeUtil");

        if(process.env.LOG_2_FILE === "true"){

            const fs = require('fs');

            let data = timeUtil.formatDateTime(date) + " (" + this.getLogLevelString(logLevel) + ") - " + entry;
            let file = "./log/log_entries/" + timeUtil.getCurrentDate() + ' log.txt';

            var stream = fs.createWriteStream(file, {flags:'a'});
            stream.write(data + "\n");
        }

        return null;
    },

    storeMessage: function (userId, messageType, date, message) {

        const timeUtil = require("./timeUtil");

        if (process.env.LOG_MESSAGES_2_DB === "true") {
            {
                const pgHelper = require("./pgHelper");
                const pgClient = pgHelper.getDB();
                pgClient.connect();

                let pgQuery = "INSERT INTO public.Benutzer_Log(" +
                    " Nachricht_Typ, Benutzer, Erfasst_am, Nachricht)" +
                    " SELECT n.Id, b.Id, to_timestamp(" + timeUtil.getEpoch(date) + "), '" + pgHelper.escape_string(message) + "' " +
                    "FROM Benutzer b, Nachricht_Typ n " +
                    "WHERE b.Benutzer_Kennung = '" + userId + "'" +
                    "AND n.code = '" + messageType + "'";

                this.debug("Benutzer Log DB Query: " + pgQuery);

                pgClient.query(pgQuery,
                    (err, res) => {
                        if (err) require("./errorHelper").displayErrorMessage(convo, err.stack, false);

                        pgClient.end();

                        this.debug("Store Message DB Response:");
                        this.debug(JSON.stringify(res));

                    });
            }

            if (process.env.LOG_2_FILE === "true") {

                const fs = require('fs');

                let data = timeUtil.formatDateTime(date) + " (" + this.getMessagTypeString(messageType) + ")\t\t To User '" + userId + "' - " + message;
                let file = "./log/messages/" + timeUtil.getCurrentDate() + ' log_messages.txt';

                //Write to file
                //Source: https://stackoverflow.com/questions/3459476/how-to-append-to-a-file-in-node/43370201#43370201
                var stream = fs.createWriteStream(file, {flags: 'a'});
                stream.write(data + "\n");
            }


            return null;
        }
    },

    getLogLevelString: function(logLevel){

        switch (logLevel) {

            case 1:
                return "DEBUG";
                break;
            case 2:
                return "INFO";
                break;
            case 3:
                return "WARN";
                break;
            case 4:
                return "ERROR";
                break;
        }


    },

    getMessagTypeString: function(messageType){

        switch (messageType) {

            case 1:
                return "USER_MESSAGE";
                break;
            case 2:
                return "BOT_MESSAGE";
                break;
        }

    },

    getTrace: function(message){
        let e = new Error();
        let frame = e.stack.split("\n")[2];
        let lineNumber = frame.split(":")[1];
        let functionName = frame.split(" ")[5];
        return functionName + "(" + lineNumber + ") - " + message;
    }
};