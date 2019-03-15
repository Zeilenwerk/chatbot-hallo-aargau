module.exports = {
    getDB: function () {

        //Get Postgres Middleware
        var pg = require('pg');
        // var async = require('async');
        // var q = require('q');

        const dbConfig = {
            user: process.env.BOTKIT_STORAGE_POSTGRES_USER || 'botkit',
            database: process.env.BOTKIT_STORAGE_POSTGRES_DATABASE || 'botkit_test',
            password: process.env.BOTKIT_STORAGE_POSTGRES_PASSWORD || 'botkit',
            host: process.env.BOTKIT_STORAGE_POSTGRES_HOST || 'localhost',
            port: process.env.BOTKIT_STORAGE_POSTGRES_PORT || '5432'
        };

        return new pg.Client(dbConfig);
    },
};