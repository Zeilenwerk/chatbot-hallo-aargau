module.exports = {

    timeConverter: function (UNIX_timestamp) {

        const logHelper = require("./logHelper");

        let unixDate = new Date(UNIX_timestamp);

        let date = unixDate.toLocaleDateString("de-DE");
        let time = unixDate.toLocaleTimeString("de-CH") + ":" + unixDate.getMilliseconds();

        return date + ' ' + time;
    },

    formatDateTime: function (dateToFormat) {

        const logHelper = require("./logHelper");

        let day = dateToFormat.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        let month = dateToFormat.getMonth() + 1; //Months are zero based
        if (month < 10) {
            month = "0" + month;
        }
        let year = dateToFormat.getFullYear();

        let hours = dateToFormat.getHours();
        if (hours < 10) {
            hours = "0" + hours;
        }
        let mins = dateToFormat.getMinutes();
        if (mins < 10) {
            mins = "0" + mins;
        }
        let sec = dateToFormat.getSeconds();
        if (sec < 10) {
            sec = "0" + sec;
        }
        let milis = dateToFormat.getMilliseconds();

        let date = year + "-" + month + "-" + day;
        let time = hours + ":" + mins + ":" + sec + ":" + milis;

        return date + ' ' + time;

    },

    formatDate: function (dateToFormat) {

        const logHelper = require("./logHelper");

        let day = dateToFormat.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        let month = dateToFormat.getMonth() + 1; //Months are zero based
        if (month < 10) {
            month = "0" + month;
        }
        let year = dateToFormat.getFullYear();

        return day + "." + month + "." + year;

    },

    getCurrentDate: function () {
        const logHelper = require("./logHelper");

        let currDate = new Date();

        let day = currDate.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        let month = currDate.getMonth() + 1; //Months are zero based
        if (month < 10) {
            month = "0" + month;
        }
        let year = currDate.getFullYear();

        return year + "-" + month + "-" + day;
    },

    getEpoch: function (date) {

        const logHelper = require("./logHelper");

        return date.getTime() / 1000;

    },

    getDayNumberFromDate: function (date) {

        return date.getDay() + 1;

    },

    getDayNumberFromString: function (day) {

        const {t} = require('../node_modules/localizify');

        let dayNumber = 0;

        switch (day.toLowerCase()) {
            case t('tag_montag').toLowerCase():
                dayNumber = 1;
                break;
            case t('tag_dienstag').toLowerCase():
                dayNumber = 2;
                break;
            case t('tag_mittwoch').toLowerCase():
                dayNumber = 3;
                break;
            case t('tag_donnerstag').toLowerCase():
                dayNumber = 4;
                break;
            case t('tag_freitag').toLowerCase():
                dayNumber = 5;
                break;
            case t('tag_samstag').toLowerCase():
                dayNumber = 6;
                break;
            case t('tag_sonntag').toLowerCase():
                dayNumber = 7;
                break;
        }

        return dayNumber;

    },

    getDayNameFromNumber: function (dayNumber) {

        const {t} = require('../node_modules/localizify');

        let dayName = "";

        switch (dayNumber) {
            case 1:
                dayName = t('tag_montag');
                break;
            case 2:
                dayName = t('tag_dienstag');
                break;
            case 3:
                dayName = t('tag_mittwoch');
                break;
            case 4:
                dayName = t('tag_donnerstag');
                break;
            case 5:
                dayName = t('tag_freitag');
                break;
            case 6:
                dayName = t('tag_samstag');
                break;
            case 7:
                dayName = t('tag_sonntag');
                break;
        }

        return dayName;

    }

};