SELECT ku.id,
       ku.beschreibung AS kurs_beschreibung,
       n.wert AS niveau,
       s.wert AS sprachnachweis,
       a.offizieller_name AS anbieter_offizieller_name,
       a.strasse AS anbieter_strasse,
       a.ort AS anbieter_ort,
       a.plz AS anbieter_plz,
       a.mail AS anbieter_mail,
       a.telefon AS anbieter_telefon,
       a.url AS anbieter_url,
       k.wert AS konversation,
       i.wert AS intensitaet,
       z.wert AS zweck,
       dz.reihenfolge AS reihenfolge,
       dz.tag AS tag,
       to_char(dz.tag, 'TMDay') AS tag_name,
       extract(isodow from dz.tag) AS tag_Nummer,
       dz.zeit_start AS start_Zeit,
       dz.zeit_ende AS end_Zeit,
       o.ort AS ort,
       o.strasse AS ort_Strasse,
       o.plz AS ort_PLZ,
       o.raum AS ort_Raum,
       ad.wert AS adressatengruppe,
       (SELECT an.wert
       FROM anrede an
       WHERE an.id = (SELECT kp.fk_anrede
                      FROM kontaktperson kp
                      WHERE kp.fk_anbieter = a.id)) AS kontaktperson_anrede,
      (SELECT kp.name
       FROM kontaktperson kp
       WHERE kp.fk_anbieter = a.id) AS kontaktperson_name,
      (SELECT kp.vorname
       FROM kontaktperson kp
       WHERE kp.fk_anbieter = a.id) AS kontaktperson_vorname,
      (SELECT kp.telefon
       FROM kontaktperson kp
       WHERE kp.fk_anbieter = a.id) AS kontaktperson_telefon
FROM kurs ku
LEFT JOIN niveau n              ON ku.fk_niveau = n.id
LEFT JOIN sprachnachweis s      ON ku.fk_sprachnachweis = s.id
LEFT JOIN anbieter a            ON ku.fk_anbieter = a.id
LEFT JOIN konversation k        ON ku.fk_konversation = k.id
LEFT JOIN intensitaet i         ON ku.fk_intensitaet = i.id
LEFT JOIN zweck z               ON ku.fk_zweck = z.id
LEFT JOIN durchfuehrungszeit dz ON ku.id = dz.fk_kurs
LEFT JOIN durchfuehrungsort o   ON dz.fk_durchfuerungsort = o.id
LEFT JOIN kosten ko             ON ku.id = ko.fk_kurs
LEFT JOIN kostenart ka          ON ko.fk_kostenart = ka.id
JOIN adressatengruppe ad ON ad.id in (SELECT id_adressatengruppe
                            FROM kurs_adressatengruppe
                            WHERE id_kurs = ku.id)

WHERE (dz.tag IS NULL OR dz.tag >= now())
--Necessary Information
AND extract(isodow from dz.tag) = 1
AND dz.zeit_start >= '07:00:00'
AND dz.zeit_start <= '10:00:00'
AND n.code = 1
AND LOWER(o.ort) = 'baden'
--Additional Information
AND ad.code = 1
AND LOWER(a.offizieller_name) = 'nosotras aargau'
AND i.code = 1 --1 = Wochenkurs | 2 = intensivkurs
AND ko.betrag <= 1500.00
ORDER BY dz.reihenfolge
OFFSET 0
LIMIT 1000