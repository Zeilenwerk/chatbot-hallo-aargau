module.exports = {

    checkNotwendigeInfos: function(convo) {

        console.log("Check Notwendige Informationen");

        if(convo.vars.kursOrt !== "None" && convo.vars.kursTag !== "None" && convo.vars.kursZeit !== "None" && convo.vars.kursNiveau !== "None") {
            return true;
        }else{

            //Informationen vom benutzer beantragen, damit ein Deutschkurs gesucht werden kann
            if (convo.vars.kursOrt !== "None") {
                if (convo.vars.kursBezirk !== "None") {
                    convo.addMessage("Den Ort haben Sie schon angegeben ({{vars.kursOrt}}, im Bezirk {kursBezirk}}), somit benötige ich dies nicht mehr.")
                } else {
                    convo.addMessage("Den Ort haben Sie schon angegeben ({{vars.kursOrt}}), somit benötige ich dies nicht mehr.")
                }
            }

            if (convo.vars.kursTag !== "None") {
                convo.addMessage("Als Kurstag, haben Sie den {{vars.kursTag}} gewählt.")
            }

            if (convo.vars.kursZeit !== "None") {
                convo.addMessage("Die Zeit am {{vars.kursTag}} für den Kurs ist {{vars.kursZeit}} Uhr.")
            }

            if (convo.vars.kursNiveau !== "None") {
                convo.addMessage("Das Kursniveau ist {{vars.kursNiveau}}.");
            }

            return false;

        }

    }
};