module.exports = {
    initializeDeutschkursConversation: function (convo, message, bot) {

        //Add All Threads of the Conversation
        require("../ende/convoEnde").convoEnde(convo);
        require("../ende/convoTimeout").convoTimeout(convo);
        require("./kursZusatzInfos").menuZusatzInfos(convo, "None", message, bot);
        require("./kursNotwendigeInfos").menuNotwendigeInfos(convo);
        require("./kursOrt").askKursOrt(convo);
        require("./kursNiveau").askKursNiveau(convo);
        require("./kursTag").askKursTag(convo);
        require("./kursZeit").askKursZeit(convo);

        //Variablen zur Suche eines Deutschkurses die in der Conversation ausfindig gemacht werden müssen
        convo.setVar("kursOrt", "None");
        convo.setVar("kursBezirk", "None");
        convo.setVar("kursZeit", "None");
        convo.setVar("kursTag", "None");
        convo.setVar("kursTagUndZeit", "None");
        convo.setVar("kursDatum", "None");
        convo.setVar("kursIntensitaet", "None");
        convo.setVar("kursAnbieter", "None");
        convo.setVar("kursNiveau", "None");
        convo.setVar("kursSprache", "None");
        convo.setVar("kursAdressatengruppe", "None");

        for (var i = 0; i < message.entities.length; i++) {
            let log = "Entitie #" + i +
                "\n\t-> Entity: '" + message.entities[i].entity + "'" +
                "\n\t-> Type: '" + message.entities[i].type + "'" +
                "\n\t-> StartIndex: '" + message.entities[i].startIndex + "'" +
                "\n\t-> EndIndex: '" + message.entities[i].endIndex + "'";

            if (message.entities[i].resolution) log += "\n\t-> Resolution: '" + console.log(message.entities[i].resolution) + "'";

            console.log(log);

            switch (message.entities[i].type) {
                case "kursZeit":
                    convo.setVar("kursZeit", message.entities[i].entity);
                    console.log("Set kursZeit to " + message.entities[i].entity);
                    break;

                case "kursTag":
                    convo.setVar("kursTag", message.entities[i].entity);
                    console.log("Set kursTag to " + message.entities[i].entity);
                    break;

                case "kursTagUndZeit":
                    convo.setVar("kursTagUndZeit", message.entities[i].entity);
                    console.log("Set kursTagUndZeit to " + message.entities[i].entity);
                    break;

                case "kursOrt":
                    convo.setVar("kursOrt", message.entities[i].entity);
                    console.log("Set kursOrt to " + message.entities[i].entity);
                    break;

                case "kursIntensitaet":
                    convo.setVar("kursIntensitaet", message.entities[i].entity);
                    console.log("Set kursIntensitaet to " + message.entities[i].entity);
                    break;

                case "kursAnbieter":
                    convo.setVar("kursAnbieter", message.entities[i].entity);
                    console.log("Set kursAnbieter to " + message.entities[i].entity);
                    break;

                case "kursNiveau":
                    convo.setVar("kursNiveau", message.entities[i].entity);
                    console.log("Set kursNiveau to " + message.entities[i].entity);
                    break;

                case "kursSprache":
                    convo.setVar("kursSprache", message.entities[i].entity);
                    console.log("Set kursSprache to " + message.entities[i].entity);
                    break;

                case "kursAdressatengruppe":
                    convo.setVar("kursAdressatengruppe", message.entities[i].entity);
                    console.log("Set kursAdressatengruppe to " + message.entities[i].entity);
                    break;

                case "buildin.datetime":
                    convo.setVar("kursZeit", message.entities[i].entity);
                    console.log("Set kursZeit to " + message.entities[i].entity);
                    break;
            }
        }

        convo.addMessage("Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.");

        require("./kursNotwendigeInfos").checkNotwendigeInfos(convo);

    }

};