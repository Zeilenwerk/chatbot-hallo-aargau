COPY kurs(id, fk_niveau, fk_sprachnachweis, fk_anbieter, fk_konversation, fk_intensitaet, fk_kurs_typ, beschreibung, einstufungstest, einzelunterricht)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\1 - (IMA) Stammdatenpflege Deutschkurse_final - Kurs.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY kurs_adressatengruppe(id, id_kurs, id_adressatengruppe)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\2 - (IMA) Stammdatenpflege Deutschkurse_final - Kurs_Adressatengruppe.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY adressatengruppe(id, code, fk_altersgruppe, fk_geschlecht, fk_aufenthaltsstatus, mit_kinder, beschreibung)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\3 - (IMA) Stammdatenpflege Deutschkurse_final - Adressatengruppe.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY kurs_ziel(id, id_kurs, id_ziel)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\4 - (IMA) Stammdatenpflege Deutschkurse_final - Kurs_Ziele.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY ziel(id, code, fk_didaktische_ziel, fk_berufliches_ziel, fk_ziel_niveau)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\5 - (IMA) Stammdatenpflege Deutschkurse_final - Ziel.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY anbieter(id, fk_kontaktdaten, offizieller_name, beschreibung)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\6 - (IMA) Stammdatenpflege Deutschkurse_final - Anbieter.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY kontaktperson(id, fk_anbieter, fk_anrede, fk_kontaktdaten, name, vorname, fk_stellvertreter)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\7 - (IMA) Stammdatenpflege Deutschkurse_final - Kontaktperson.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY durchfuehrungszeit(id, fk_kurs, fk_durchfuerungsort, tag, tag_start, zeit_start, tag_ende, zeit_ende, pause_start, pause_ende, haeufigkeit, lektionen)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\8 - (IMA) Stammdatenpflege Deutschkurse_final - Durchfuerungszeit.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY durchfuehrungsort(id, code, fk_adresse, raum, kinderhuetedienst)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\9 - (IMA) Stammdatenpflege Deutschkurse_final - Durchfuerungsort.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY anmeldung(id, fk_kurs, fk_anmeldeart, fk_kontaktdaten)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\10 - (IMA) Stammdatenpflege Deutschkurse_final - Anmeldung.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY kontaktdaten(id, fk_adresse, telefon, telefon2, mail, mail2, online_formular, url)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\11 - (IMA) Stammdatenpflege Deutschkurse_final - Kontaktdaten.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY adresse(id, fk_ort, adresse, adresszusatz_1, adresszusatz_2, adresszusatz_3, plz)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\12 - (IMA) Stammdatenpflege Deutschkurse_final - Adresse.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY kosten(id, fk_kurs, fk_kostenart, betrag, subventioniert)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\13 - (IMA) Stammdatenpflege Deutschkurse_final - Kosten.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY anrede(id, code, wert, beschreibung)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\14 - (IMA) Stammdatenpflege Deutschkurse_final - Anrede.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY anmeldeart(id, code, wert, beschreibung)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\15 - (IMA) Stammdatenpflege Deutschkurse_final - Anmeldeart.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY sprachnachweis(id, code, wert, beschreibung)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\16 - (IMA) Stammdatenpflege Deutschkurse_final - Sprachnachweis.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY niveau(id, code, wert, beschreibung)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\17 - (IMA) Stammdatenpflege Deutschkurse_final - Niveau.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY aufenthlatsstatus(id, code, wert, beschreibung)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\18 - (IMA) Stammdatenpflege Deutschkurse_final - Aufenthaltsstatus.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY intensitaet(id, code, wert, beschreibung)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\19 - (IMA) Stammdatenpflege Deutschkurse_final - Intensitaet.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY berufliches_ziel(id, code, wert, beschreibung)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\20 - (IMA) Stammdatenpflege Deutschkurse_final - Berufliche Ziele.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY didaktische_ziel(id, code, wert, beschreibung)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\21 - (IMA) Stammdatenpflege Deutschkurse_final - Didaktische Ziel.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY ort(id, code, wert, beschreibung)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\22 - (IMA) Stammdatenpflege Deutschkurse_final - Ort.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY altersgruppe(id, code, wert, beschreibung)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\23 - (IMA) Stammdatenpflege Deutschkurse_final - Altersgruppe.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY konversation(id, code, wert, beschreibung)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\24 - (IMA) Stammdatenpflege Deutschkurse_final - Konversation.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY kostenart(id, code, wert, beschreibung)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\25 - (IMA) Stammdatenpflege Deutschkurse_final - Kosten Art.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY geschlecht(id, code, wert, beschreibung)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\26 - (IMA) Stammdatenpflege Deutschkurse_final - Geschlecht.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY kurs_typ(id, code, wert, beschreibung)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\27 - (IMA) Stammdatenpflege Deutschkurse_final - Kurs Typ.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';

COPY sprache(id, iso_code, sprache_name, beschreibung)
FROM ''C:\Users\Andreas\Downloads\Compressed\MA\28 - (IMA) Stammdatenpflege Deutschkurse_final - Sprache.csv'' DELIMITER '';'' CSV HEADER ENCODING ''WIN1252'';COPY kurs(id, fk_niveau, fk_sprachnachweis, fk_anbieter, fk_konversation, fk_intensitaet, fk_kurs_typ, beschreibung, einstufungstest, einzelunterricht)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\1 - (IMA) Stammdatenpflege Deutschkurse_final - Kurs.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY kurs_adressatengruppe(id, id_kurs, id_adressatengruppe)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\2 - (IMA) Stammdatenpflege Deutschkurse_final - Kurs_Adressatengruppe.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY adressatengruppe(id, code, fk_altersgruppe, fk_geschlecht, fk_aufenthaltsstatus, mit_kinder, beschreibung)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\3 - (IMA) Stammdatenpflege Deutschkurse_final - Adressatengruppe.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY kurs_ziel(id, id_kurs, id_ziel)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\4 - (IMA) Stammdatenpflege Deutschkurse_final - Kurs_Ziele.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY ziel(id, code, fk_didaktische_ziel, fk_berufliches_ziel, fk_ziel_niveau)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\5 - (IMA) Stammdatenpflege Deutschkurse_final - Ziel.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY anbieter(id, fk_kontaktdaten, offizieller_name, beschreibung)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\6 - (IMA) Stammdatenpflege Deutschkurse_final - Anbieter.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY kontaktperson(id, fk_anbieter, fk_anrede, fk_kontaktdaten, name, vorname, fk_stellvertreter)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\7 - (IMA) Stammdatenpflege Deutschkurse_final - Kontaktperson.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY durchfuehrungszeit(id, fk_kurs, fk_durchfuerungsort, tag, tag_start, zeit_start, tag_ende, zeit_ende, pause_start, pause_ende, haeufigkeit, lektionen)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\8 - (IMA) Stammdatenpflege Deutschkurse_final - Durchfuerungszeit.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY durchfuehrungsort(id, code, fk_adresse, raum, kinderhuetedienst)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\9 - (IMA) Stammdatenpflege Deutschkurse_final - Durchfuerungsort.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY anmeldung(id, fk_kurs, fk_anmeldeart, fk_kontaktdaten)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\10 - (IMA) Stammdatenpflege Deutschkurse_final - Anmeldung.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY kontaktdaten(id, fk_adresse, telefon, telefon2, mail, mail2, online_formular, url)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\11 - (IMA) Stammdatenpflege Deutschkurse_final - Kontaktdaten.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY adresse(id, fk_ort, adresse, adresszusatz_1, adresszusatz_2, adresszusatz_3, plz)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\12 - (IMA) Stammdatenpflege Deutschkurse_final - Adresse.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY kosten(id, fk_kurs, fk_kostenart, betrag, subventioniert)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\13 - (IMA) Stammdatenpflege Deutschkurse_final - Kosten.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY anrede(id, code, wert, beschreibung)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\14 - (IMA) Stammdatenpflege Deutschkurse_final - Anrede.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY anmeldeart(id, code, wert, beschreibung)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\15 - (IMA) Stammdatenpflege Deutschkurse_final - Anmeldeart.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY sprachnachweis(id, code, wert, beschreibung)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\16 - (IMA) Stammdatenpflege Deutschkurse_final - Sprachnachweis.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY niveau(id, code, wert, beschreibung)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\17 - (IMA) Stammdatenpflege Deutschkurse_final - Niveau.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY aufenthlatsstatus(id, code, wert, beschreibung)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\18 - (IMA) Stammdatenpflege Deutschkurse_final - Aufenthaltsstatus.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY intensitaet(id, code, wert, beschreibung)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\19 - (IMA) Stammdatenpflege Deutschkurse_final - Intensitaet.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY berufliches_ziel(id, code, wert, beschreibung)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\20 - (IMA) Stammdatenpflege Deutschkurse_final - Berufliche Ziele.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY didaktische_ziel(id, code, wert, beschreibung)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\21 - (IMA) Stammdatenpflege Deutschkurse_final - Didaktische Ziel.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY ort(id, code, wert, beschreibung)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\22 - (IMA) Stammdatenpflege Deutschkurse_final - Ort.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY altersgruppe(id, code, wert, beschreibung)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\23 - (IMA) Stammdatenpflege Deutschkurse_final - Altersgruppe.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY konversation(id, code, wert, beschreibung)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\24 - (IMA) Stammdatenpflege Deutschkurse_final - Konversation.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY kostenart(id, code, wert, beschreibung)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\25 - (IMA) Stammdatenpflege Deutschkurse_final - Kosten Art.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY geschlecht(id, code, wert, beschreibung)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\26 - (IMA) Stammdatenpflege Deutschkurse_final - Geschlecht.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY kurs_typ(id, code, wert, beschreibung)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\27 - (IMA) Stammdatenpflege Deutschkurse_final - Kurs Typ.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';

COPY sprache(id, iso_code, sprache_name, beschreibung)
FROM 'C:\Users\Andreas\Downloads\Compressed\MA\28 - (IMA) Stammdatenpflege Deutschkurse_final - Sprache.csv' DELIMITER ';' CSV HEADER ENCODING 'WIN1252';