module.exports = {

    timeConverter: function (UNIX_timestamp) {

        const logHelper = require("./logHelper");

        let unixDate = new Date(UNIX_timestamp);

        let date = unixDate.toLocaleDateString("de-DE");
        let time = unixDate.toLocaleTimeString("de-CH") + ":" + unixDate.getMilliseconds();

        return date + ' ' + time;
    },

    formatDate: function (dateToFormat){

        const logHelper = require("./logHelper");

        let day = dateToFormat.getDate();
        if(day < 10){
            day = "0"+day;
        }
        let month = dateToFormat.getMonth() + 1; //Months are zero based
        if(month < 10){
            month = "0"+month;
        }
        let year = dateToFormat.getFullYear();

        let hours = dateToFormat.getHours();
        if(hours < 10){
            hours = "0"+hours;
        }
        let mins = dateToFormat.getMinutes();
        if(mins < 10){
            mins = "0"+mins;
        }
        let sec = dateToFormat.getSeconds();
        if(sec < 10){
            sec = "0"+sec;
        }
        let milis = dateToFormat.getMilliseconds();

        let date = year + "-" + month + "-" + day;
        let time = hours + ":" + mins + ":" + sec + ":" +milis;

        return date + ' ' + time;

    },

    getCurrentDate : function(){
        const logHelper = require("./logHelper");

        let currDate = new Date();

        let day = currDate.getDate();
        if(day < 10){
            day = "0"+day;
        }
        let month = currDate.getMonth() + 1; //Months are zero based
        if(month < 10){
            month = "0"+month;
        }
        let year = currDate.getFullYear();

        return year + "-" + month + "-" + day;
    },

    getEpoch: function(date){

        const logHelper = require("./logHelper");

        return date.getTime() / 1000;

    }

};