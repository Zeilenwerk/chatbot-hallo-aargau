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
    kursMenuDialog: function (convo, res) {

        const {t} = require('../node_modules/localizify');
        const logUtil = require("./logUtil");
        const luisUtil = require("./luisUtil");

        logUtil.debug("Start kursMenuDialog");

        let kursSuchenMenu = t("kurs.kursSuchen_Menu_Angaben");
        let angabeVorhanden  = false;

        let kursInformationenAltersgruppe = "";
        let kursInformationenAnbieter = "";
        let kursInformationenGeschlecht = "";
        let kursInformationenIntensitaet = "";
        let kursInformationenKonversation = "";
        let kursInformationenKosten = "";
        let kursInformationenNiveau = "";
        let kursInformationenOrt = "";
        let kursInformationenTag = "";
        let kursInformationenZeit = "";
        let kursInformationenZiel = "";

        if(convo.vars.kursInformationenAltersgruppe.toLowerCase() === "keine angabe"){
            let aEntity_kursInformationenAltersgruppe = luisUtil.getEntityFromLuisResponse("kursInformationenAltersgruppe", res);
            if (aEntity_kursInformationenAltersgruppe) {
                //Set var in convo --> used afterwards to get search results form db
                convo.setVar("kursInformationenAltersgruppe", aEntity_kursInformationenAltersgruppe[0]);
                //Reset offset
                logUtil.debug("kursInformationenAltersgruppe = " + convo.vars.kursInformationenAltersgruppe);
                kursSuchenMenu += "<br>" + t("kurs.kursSuchen_KursAltersgruppe", {kursInformationenAltersgruppe: "{{vars.kursInformationenAltersgruppe}}"});
                angabeVorhanden = true;
            }
        }else{
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_KursAltersgruppe", {kursInformationenAltersgruppe: "{{vars.kursInformationenAltersgruppe}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenAnbieter.toLowerCase() === "keine angabe"){
            let aEntity_kursInformationenAnbieter = luisUtil.getEntityFromLuisResponse("kursInformationenAnbieter", res);
            if (aEntity_kursInformationenAnbieter) {
                //Set var in convo --> used afterwards to get search results form db
                convo.setVar("kursInformationenAnbieter", aEntity_kursInformationenAnbieter[0]);
                //Reset offset
                logUtil.debug("kursInformationenAnbieter = " + convo.vars.kursInformationenAnbieter);
                kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Anbieter", {kursInformationenAnbieter: "{{vars.kursInformationenAnbieter}}"});
                angabeVorhanden = true;
            }
        }else{
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Anbieter", {kursInformationenAnbieter: "{{vars.kursInformationenAnbieter}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenGeschlecht.toLowerCase() === "keine angabe"){
            let aEntity_kursInformationenGeschlecht = luisUtil.getEntityFromLuisResponse("kursInformationenGeschlecht", res);
            if (aEntity_kursInformationenGeschlecht) {
                //Set var in convo --> used afterwards to get search results form db
                convo.setVar("kursInformationenGeschlecht", aEntity_kursInformationenGeschlecht[0]);
                //Reset offset
                logUtil.debug("kursInformationenGeschlecht = " + convo.vars.kursInformationenGeschlecht);
                kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Addresiertes", {kursInformationenGeschlecht: "{{vars.kursInformationenGeschlecht}}"});
                angabeVorhanden = true;
            }
        }else{
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Addresiertes", {kursInformationenGeschlecht: "{{vars.kursInformationenGeschlecht}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenIntensitaet.toLowerCase() === "keine angabe"){
            let aEntity_kursInformationenIntensitaet = luisUtil.getEntityFromLuisResponse("kursInformationenIntensitaet", res);
            if (aEntity_kursInformationenIntensitaet) {
                //Set var in convo --> used afterwards to get search results form db
                convo.setVar("kursInformationenIntensitaet", aEntity_kursInformationenIntensitaet[0]);
                //Reset offset
                logUtil.debug("kursInformationenIntensitaet = " + convo.vars.kursInformationenIntensitaet);
                kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Intensität", {kursInformationenIntensitaet: "{{vars.kursInformationenIntensitaet}}"});
                angabeVorhanden = true;
            }
        }else{
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Intensität", {kursInformationenIntensitaet: "{{vars.kursInformationenIntensitaet}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenKonversation.toLowerCase() === "keine angabe"){
            let aEntity_kursInformationenKonversation = luisUtil.getEntityFromLuisResponse("kursInformationenKonversation", res);
            if (aEntity_kursInformationenKonversation) {
                //Set var in convo --> used afterwards to get search results form db
                convo.setVar("kursInformationenKonversation", aEntity_kursInformationenKonversation[0]);
                //Reset offset
                logUtil.debug("kursInformationenKonversation = " + convo.vars.kursInformationenKonversation);
                kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Konversation", {kursInformationenKonversation: "{{vars.kursInformationenKonversation}}"});
                angabeVorhanden = true;
            }
        }else{
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Konversation", {kursInformationenKonversation: "{{vars.kursInformationenKonversation}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenKosten.toLowerCase() === "keine angabe"){
            let aEntity_kursInformationenKosten = luisUtil.getEntityFromLuisResponse("kursInformationenKosten", res);
            if (aEntity_kursInformationenKosten) {
                //Set var in convo --> used afterwards to get search results form db
                convo.setVar("kursInformationenKosten", aEntity_kursInformationenKosten[0]);
                //Reset offset
                logUtil.debug("kursInformationenKosten = " + convo.vars.kursInformationenKosten);
                kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Kosten", {kursInformationenKosten: "{{vars.kursInformationenKosten}}"});
                angabeVorhanden = true;
            }
        }else{
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Kosten", {kursInformationenKosten: "{{vars.kursInformationenKosten}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenNiveau.toLowerCase() === "keine angabe"){
            let aEntity_kursInformationenNiveau = luisUtil.getEntityFromLuisResponse("kursInformationenNiveau", res);
            if (aEntity_kursInformationenNiveau) {
                //Set var in convo --> used afterwards to get search results form db
                convo.setVar("kursInformationenNiveau", aEntity_kursInformationenNiveau[0]);
                //Reset offset
                logUtil.debug("kursInformationenNiveau = " + convo.vars.kursInformationenNiveau);
                kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Niveau", {kursInformationenNiveau: "{{vars.kursInformationenNiveau}}"});
                angabeVorhanden = true;
            }
        }else{
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Niveau", {kursInformationenNiveau: "{{vars.kursInformationenNiveau}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenOrt.toLowerCase() === "keine angabe"){
            let aEntity_kursInformationenOrt = luisUtil.getEntityFromLuisResponse("kursInformationenOrt", res);
            if (aEntity_kursInformationenOrt) {
                //Set var in convo --> used afterwards to get search results form db
                convo.setVar("kursInformationenOrt", aEntity_kursInformationenOrt[1].charAt(0).toUpperCase() + aEntity_kursInformationenOrt[1].slice(1));
                //Reset offset
                logUtil.debug("kursInformationenOrt = " + convo.vars.kursInformationenOrt);
                kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Ort", {kursInformationenOrt: "{{vars.kursInformationenOrt}}"});
                angabeVorhanden = true;
            }
        }else{
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Ort", {kursInformationenOrt: "{{vars.kursInformationenOrt}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenTag.toLowerCase() === "keine angabe"){
            let aEntity_kursInformationenTag = luisUtil.getEntityFromLuisResponse("kursInformationenTag", res);
            if (aEntity_kursInformationenTag) {
                //Set var in convo --> used afterwards to get search results form db
                convo.setVar("kursInformationenTag", aEntity_kursInformationenTag[0]);
                //Reset offset
                logUtil.debug("kursInformationenTag = " + convo.vars.kursInformationenTag);
                kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Tag", {kursInformationenTag: "{{vars.kursInformationenTag}}"});
                angabeVorhanden = true;
            }
        }else{
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Tag", {kursInformationenTag: "{{vars.kursInformationenTag}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenZeit.toLowerCase() === "keine angabe"){
            let aEntity_kursInformationenZeit = luisUtil.getEntityFromLuisResponse("kursInformationenZeit", res);
            if (aEntity_kursInformationenZeit) {
                //Set var in convo --> used afterwards to get search results form db
                convo.setVar("kursInformationenZeit", aEntity_kursInformationenZeit[0]);
                //Reset offset
                logUtil.debug("kursInformationenZeit = " + convo.vars.kursInformationenZeit);
                kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Zeit", {kursInformationenZeit: "{{vars.kursInformationenZeit}}"});
                angabeVorhanden = true;
            }
        }else{
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Zeit", {kursInformationenZeit: "{{vars.kursInformationenZeit}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenZiel.toLowerCase() === "keine angabe"){
            let aEntity_kursInformationenZiel = luisUtil.getEntityFromLuisResponse("kursInformationenZiel", res);
            if (aEntity_kursInformationenZiel) {
                //Set var in convo --> used afterwards to get search results form db
                convo.setVar("kursInformationenZiel", aEntity_kursInformationenZiel[0]);
                //Reset offset
                logUtil.debug("kursInformationenZiel = " + convo.vars.kursInformationenZiel);
                kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Ziel", {kursInformationenZiel: "{{vars.kursInformationenZiel}}"});
                angabeVorhanden = true;
            }
        }else{
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Ziel", {kursInformationenZiel: "{{vars.kursInformationenZiel}}"});
            angabeVorhanden = true;
        }


        convo.setVar("kursSuchenMenu", kursSuchenMenu);


        return angabeVorhanden;

    },

    kursMenuDialog_NoLUIS: function (convo) {

        const {t} = require('../node_modules/localizify');
        const logUtil = require("./logUtil");

        logUtil.debug("Start kursMenuDialog no LUIS");

        let kursSuchenMenu = t("kurs.kursSuchen_Menu_Question");
        let angabeVorhanden  = false;

        if(convo.vars.kursInformationenAltersgruppe.toLowerCase() !== "keine angabe"){
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_KursAltersgruppe", {kursInformationenAltersgruppe: "{{vars.kursInformationenAltersgruppe}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenAnbieter.toLowerCase() !== "keine angabe"){
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Anbieter", {kursInformationenAnbieter: "{{vars.kursInformationenAnbieter}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenGeschlecht.toLowerCase() !== "keine angabe"){
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Addresiertes", {kursInformationenGeschlecht: "{{vars.kursInformationenGeschlecht}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenIntensitaet.toLowerCase() !== "keine angabe"){
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Intensität", {kursInformationenIntensitaet: "{{vars.kursInformationenIntensitaet}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenKonversation.toLowerCase() !== "keine angabe"){
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Konversation", {kursInformationenKonversation: "{{vars.kursInformationenKonversation}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenKosten.toLowerCase() !== "keine angabe"){
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Kosten", {kursInformationenKosten: "{{vars.kursInformationenKosten}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenNiveau.toLowerCase() !== "keine angabe"){
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Niveau", {kursInformationenNiveau: "{{vars.kursInformationenNiveau}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenOrt.toLowerCase() !== "keine angabe"){
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Ort", {kursInformationenOrt: "{{vars.kursInformationenOrt}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenTag.toLowerCase() !== "keine angabe"){
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Tag", {kursInformationenTag: "{{vars.kursInformationenTag}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenZeit.toLowerCase() !== "keine angabe"){
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Zeit", {kursInformationenZeit: "{{vars.kursInformationenZeit}}"});
            angabeVorhanden = true;
        }
        if(convo.vars.kursInformationenZiel.toLowerCase() !== "keine angabe"){
            kursSuchenMenu += "<br>" + t("kurs.kursSuchen_Ziel", {kursInformationenZiel: "{{vars.kursInformationenZiel}}"});
            angabeVorhanden = true;
        }


        convo.setVar("kursSuchenMenu", kursSuchenMenu);


        return angabeVorhanden;

    }
};