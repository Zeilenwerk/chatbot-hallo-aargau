module.exports = {
    getDB: function () {

        const logHelper = require("./logHelper");

        //Get Postgres Middleware
        var pg = require('pg');

        const dbConfig = {
            user: process.env.BOTKIT_STORAGE_POSTGRES_USER || 'botkit',
            database: process.env.BOTKIT_STORAGE_POSTGRES_DATABASE || 'botkit_test',
            password: process.env.BOTKIT_STORAGE_POSTGRES_PASSWORD || 'botkit',
            host: process.env.BOTKIT_STORAGE_POSTGRES_HOST || 'localhost',
            port: process.env.BOTKIT_STORAGE_POSTGRES_PORT || '5432'
        };

        return new pg.Client(dbConfig);
    },

    escape_string: function (str) {

        const logHelper = require("./logHelper");

        if (typeof str != 'string')
            return str;

        return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
            switch (char) {
                case "\0":
                    return "\\0";
                case "\x08":
                    return "\\b";
                case "\x09":
                    return "\\t";
                case "\x1a":
                    return "\\z";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\"":
                case "'":
                case "\\":
                case "%":
                    return ""; // remove backslash, percent,
                                        // and double/single quotes
            }
        });
    }
};