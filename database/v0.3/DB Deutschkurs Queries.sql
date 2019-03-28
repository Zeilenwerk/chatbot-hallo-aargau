--SELECT All Kurs Information with kurs id
SELECT deutschkurs.id,

       --Details zeit/datum/tag
       tage.tag AS tage_tag,
       TO_CHAR( durchfuehrungszeiten.gesamtkursstart, 'dd.MM.yyyy') AS durchfuehrungszeiten_gesamtkursstart,
       TO_CHAR( durchfuehrungszeiten.gesamtkursende, 'dd.MM.yyyy') AS durchfuehrungszeiten_gesamtkursende,
       TO_CHAR( durchfuehrungszeiten.einzelkursstart, 'HH:mm') AS durchfuehrungszeiten_einzelkursstart,
       TO_CHAR( durchfuehrungszeiten.einzelkursende, 'HH:mm') AS durchfuehrungszeiten_einzelkursende,

       --Details Deutscjklurs
       deutschkurs.kursintensitaet AS deutschkurs_kursintensitaet,
       deutschkurs.kurszweck AS deutschkurs_kurszweck,
       deutschkurs.kursbeschreibung AS deutschkurs_kursbeschreibung,

       --Details Addressatengruppe
       adressatengruppe.adressatengruppe AS adressatengruppe_adressatengruppe,
       adressatengruppe.beschreibung AS adressatengruppe_beschreibung,

       --Details Niveau
       niveau.niveau AS niveau_niveau,
       niveau.beschreibung AS niveau_beschreibung,

       --Details Kosten
       kosten.gesamtkurs AS kosten_gesamtkurs,
       kosten.subventioniert AS kosten_subventioniert,
       kosten.lehrmaterial AS kosten_lehrmaterial,
       kosten.einzelkurs AS kosten_einzelkurs,
       kosten.einstufungstest AS kosten_einstufungstest,

       --Details anbieter
       anbieter.name AS anbieter_name,
       anbieter.beschreibung AS anbieter_beschreibung,
       anbieter.ort AS anbieter_ort,
       anbieter.plz AS anbieter_plz,
       anbieter.strasse AS anbieter_strasse,
       anbieter.mail AS anbieter_mail,
       anbieter.telefon AS anbieter_telefon,
       anbieter.website AS anbieter_website,

       --Kontakperson (if exists)
       (SELECT kontaktperson.name FROM kontaktperson WHERE kontaktperson.id = (SELECT id_kontaktperson
                          FROM anbieter_kontaktperson
                          WHERE id_anbieter = anbieter.id)) AS kontaktperson_name,
       (SELECT kontaktperson.telefon FROM kontaktperson WHERE kontaktperson.id = (SELECT id_kontaktperson
                          FROM anbieter_kontaktperson
                          WHERE id_anbieter = anbieter.id)) AS kontaktperson_telefon,

       --Details Ort
       durchfuerungsort.ort AS durchfuerungsort_ort,
       durchfuerungsort.plz AS durchfuerungsort_plz,
       durchfuerungsort.strasse AS durchfuerungsort_strasse,
       durchfuerungsort.raum AS durchfuerungsort_raum

FROM deutschkurs
JOIN anbieter ON anbieter.id = deutschkurs.kursanbieter
JOIN kosten ON kosten.id = deutschkurs.kurskosten
JOIN durchfuerungsort  ON durchfuerungsort.id = deutschkurs.kursort
JOIN durchfuehrungszeiten ON durchfuehrungszeiten.id = deutschkurs.kurszeit
JOIN niveau ON niveau.id = deutschkurs.kursniveau
JOIN tage ON tage.id in (SELECT id_tag
                  FROM zeit_tag
                  WHERE id_zeit = durchfuehrungszeiten.id)
JOIN adressatengruppe ON adressatengruppe.id in (SELECT id_adressatengruppe
                            FROM kurs_adressatengruppe
                            WHERE id_kurs = deutschkurs.id)
WHERE (durchfuehrungszeiten.gesamtkursstart IS NULL OR durchfuehrungszeiten.gesamtkursstart <= now())
--Necessary Information
AND LOWER(tage.tag) = 'dienstag'
AND durchfuehrungszeiten.einzelkursstart >= '07:00:00'
AND LOWER(niveau.niveau) = 'keine_wenig_kentnisse'
AND LOWER(durchfuerungsort.ort) = 'baden'
--Additional Information
AND LOWER(adressatengruppe.adressatengruppe) LIKE '%b2%'
AND LOWER(anbieter.name) = 'nosotras aargau'
AND deutschkurs.kursintensitaet = '0' --0 = Wochenkurs | 1 = intensivkurs
AND kosten.gesamtkurs <= 1500.00
ORDER BY deutschkurs.id
OFFSET 0
LIMIT 1