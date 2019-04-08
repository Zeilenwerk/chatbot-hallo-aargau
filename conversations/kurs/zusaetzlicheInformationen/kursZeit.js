/*Funktion für die Anfrage der Kurszeit
    *
    * Kurszeit wird mittels text extraktion aus der Antwort des benutzers gewonnen
    * TODO: Muss noch überarbeitet werde (Quick & Dirty & Fehleranfällig)
    *
    * Benutzerantwort wird in die Convo variable "kursZeit" gespeichert
    *
    * @param convo -> Conversation die am laufen ist
    *
    * */
module.exports = {

    convoKursZeit: function (bot, message, convo, luisUtil, nextThread = "None") {

        const { t } = require('localizify');
        const logUtil = require("../../../util/logUtil");

        logUtil.debug("Start askKursZeit");

        convo.addQuestion({
            text: t('kurs.zusaetzlicheInformationen.kursZeit.askKursZeit', {kursTag : "{{vars.kursTag}}"}),
            quick_replies: [
                {
                    title:  t('kurs.zusaetzlicheInformationen.kursZeit.askKursZeit_Morgens'),
                    payload:  t('kurs.zusaetzlicheInformationen.kursZeit.askKursZeit_Morgens_Payload'),
                },
                {
                    title:  t('kurs.zusaetzlicheInformationen.kursZeit.askKursZeit_Mittags'),
                    payload:  t('kurs.zusaetzlicheInformationen.kursZeit.askKursZeit_Mittags_Payload'),
                },
                {
                    title:  t('kurs.zusaetzlicheInformationen.kursZeit.askKursZeit_Nachmittags'),
                    payload:  t('kurs.zusaetzlicheInformationen.kursZeit.askKursZeit_Nachmittags_Payload'),
                },
                {
                    title:  t('kurs.zusaetzlicheInformationen.kursZeit.askKursZeit_Abends'),
                    payload:  t('kurs.zusaetzlicheInformationen.kursZeit.askKursZeit_Abends_Payload'),
                },
                {
                    title:  t('kurs.zusaetzlicheInformationen.kursZeit.askKursZeit_Nachts'),
                    payload:  t('kurs.zusaetzlicheInformationen.kursZeit.askKursZeit_Nachts_Payload'),
                },
            ]
        }, [
            {
                default: true,
                callback: function (res, convo) {

                    try{
                        let aEntity = luisUtil.getEntityFromLuisResponse("kursZeit", res);

                        if (aEntity === null || aEntity === undefined || aEntity.length === 0) {
                            // array empty or does not exist
                            convo.addMessage(t('nicht_verstanden'));
                            convo.repeat();
                        } else {
                            //Get entity for zeit, not resolution (regex pattern)
                            convo.setVar("kursZeit", aEntity[1]);
                            logUtil.debug("KursZeit = " + convo.vars.kursZeit);
                        }

                        if (nextThread !== "None") {
                            convo.gotoThread(nextThread);
                        } else {
                            convo.next();
                        }
                    }catch(err){
                        errorUtil.displayErrorMessage(bot, message, err, false, false);
                    }
                }
            }
        ], {}, "askKursZeit");

    }
};