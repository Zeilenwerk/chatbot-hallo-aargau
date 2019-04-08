/*
    * Checkd ob Entity in der Antwort von LUIS vorhanden ist
    *
    * @param sEntitType --> Type der Entität die gesucht wird
    * @param res --> Response Element der konversation
    *
    * @return aRetVal --> Empty Array || Entity Name && Entity Resolution in an array
    *
    * */
module.exports = {
    getEntityFromLuisResponse: function (sEntitType, res) {

        const logUtil = require("./logUtil");

        logUtil.debug("Start getEntityFromLuisResponse");

        let sEntity = "None";
        let sResolution = "None";

        //TODO: Handle not found ort
        for (var i = 0; i < res.entities.length; i++) {
            let log = "Entitie #" + i +
                "\n\t-> Entity: '" + res.entities[i].entity + "'" +
                "\n\t-> Type: '" + res.entities[i].type + "'";

            if (res.entities[i].type === sEntitType) {

                logUtil.info("Entity found for Type " + sEntitType);
                logUtil.info(JSON.stringify(res.entities[i]));

                sEntity = res.entities[i].entity;
                sResolution = "None";

                if (res.entities[i].resolution && res.entities[i].resolution.value) sResolution = res.entities[i].resolution.value;
                if (res.entities[i].resolution && res.entities[i].resolution.values) sResolution = res.entities[i].resolution.values[0];

                let aRetVal = [sResolution, sEntity];

                logUtil.info("Ret Val: " + aRetVal);

                return aRetVal;
            }

        }
        return null;
    }
};