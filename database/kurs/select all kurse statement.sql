SELECT DISTINCT k.id,
                an.offizieller_name                                   AS kursInformationenAnbieter,
                (SELECT string_agg(ag.wert, ', ') AS kursInformationenAltersgruppe
                 FROM altersgruppe ag
                          LEFT JOIN adressatengruppe adg
                                    ON ag.id = adg.fk_altersgruppe
                          LEFT JOIN kurs_adressatengruppe ka
                                    ON ka.id_adressatengruppe = adg.id
                 WHERE ka.id_kurs = k.id)                             AS kursInformationenAltersgruppe,

                (SELECT string_agg(g.wert, ', ') AS kursInformationenGeschlecht
                 FROM geschlecht g
                          LEFT JOIN adressatengruppe adg
                                    ON g.id = adg.fk_geschlecht
                          LEFT JOIN kurs_adressatengruppe ka
                                    ON ka.id_adressatengruppe = adg.id
                 WHERE ka.id_kurs = k.id)                             AS kursInformationenGeschlecht,
                i.wert                                                AS kursInformationenIntensitaet,
                kon.wert                                              AS kursInformationenKonversation,
                (SELECT SUM(betrag) FROM kosten WHERE fk_kurs = k.id) AS kursInformationenKosten,
                n.wert                                                AS kursInformationenNiveau,
                ort.wert                                              AS kursInformationenOrt,
                durz.tag                                              AS kursInformationenTag,
                durz.tag_start                                        AS kursInformationenZeit_TagStart,
                durz.tag_ende                                         AS kursInformationenZeit_TagEnde,
                durz.zeit_start                                       AS kursInformationenZeit_ZeitStart,
                durz.zeit_ende                                        AS kursInformationenZeit_ZeitEnde,
                concat_ws(', ', (SELECT string_agg(dz.wert, ', ') AS ziel
                                 FROM didaktische_ziel dz
                                          LEFT JOIN ziel z
                                                    ON dz.id = z.fk_didaktische_ziel
                                          LEFT JOIN kurs_ziel kz
                                                    ON z.id = kz.id
                                 WHERE kz.id_kurs = k.id),
                          (SELECT string_agg(bz.wert, ', ')
                           FROM berufliches_ziel bz
                                    LEFT JOIN ziel z
                                              ON bz.id = z.fk_berufliches_ziel
                                    LEFT JOIN kurs_ziel kz
                                              ON z.id = kz.id
                           WHERE kz.id_kurs = k.id),
                          (SELECT string_agg(n.wert, ', ')
                           FROM niveau n
                                    LEFT JOIN ziel z
                                              ON n.id = z.fk_ziel_niveau
                                    LEFT JOIN kurs_ziel kz
                                              ON z.id = kz.id
                           WHERE kz.id_kurs = k.id)
                    )                                                 AS kursInformationenZiel
FROM kurs k
         LEFT JOIn intensitaet i
                   ON k.fk_intensitaet = i.id
         LEFT JOIN niveau n
                   ON k.fk_niveau = n.id
         LEFT JOIN sprachnachweis spn
                   ON k.fk_sprachnachweis = spn.id
         LEFT JOIN konversation kon
                   ON k.fk_konversation = kon.id
         LEFT JOIN anbieter an
                   ON k.fk_anbieter = an.id
         LEFT JOIN kontaktperson kp
                   ON kp.fk_anbieter = an.id
         LEFT JOIN anrede anr
                   ON kp.fk_anrede = anr.id
         LEFT JOIN kontaktdaten kond
                   ON kp.fk_kontaktdaten = kond.id
         LEFT JOIN anmeldung anm
                   ON anm.fk_kurs = k.id
         LEFT JOIN kontaktdaten kond2
                   ON anm.fk_kontaktdaten = kond2.id
         LEFT JOIN anmeldeart anma
                   ON anm.fk_anmeldeart = anma.id
         LEFT JOIN durchfuehrungszeit durz
                   ON durz.fk_kurs = k.id
         LEFT JOIN durchfuehrungsort duro
                   ON durz.fk_durchfuerungsort = duro.id
         LEFT JOIN adresse adr
                   ON duro.fk_adresse = adr.id
         LEFT JOIN ort
                   ON adr.fk_ort = ort.id
WHERE k.id IS NOT NULL

  AND UPPER(an.offizieller_name) LIKE UPPER('%TLC Baden%')         --kursInformationenAnbieter
  AND UPPER(i.wert) LIKE UPPER('%Wochenkurs%')                     --kursInformationenIntensitaet
  AND UPPER(kon.wert) LIKE UPPER('%Lockere Konversation%')         --kursInformationenKonversation
  AND UPPER(n.wert) LIKE UPPER('%B1%')                             --kursInformationenNiveau
  AND UPPER(ort.wert) LIKE UPPER('%Aarau%')                        --kursInformationenOrt
  AND UPPER(durz.tag) LIKE UPPER('%Montag%')                       --kursInformationenTag

  -- **********************
  -- kursInformationenZeit
  -- **********************
  AND durz.zeit_start >= '13:00:00'
  AND durz.zeit_ende <= '16:00:00'

  -- **********************
  -- kursInformationenKosten
  -- **********************
  AND (SELECT SUM(betrag) FROM kosten WHERE fk_kurs = k.id) <= 0   -- Gratis (Subventioniert)
  AND (SELECT SUM(betrag) FROM kosten WHERE fk_kurs = k.id) < 500  -- Bis zu 500
  AND (SELECT SUM(betrag) FROM kosten WHERE fk_kurs = k.id) < 1000 -- Bis zu 1000

  -- **********************
  -- kursInformationenZiel
  -- **********************
  AND UPPER((
    -- Get All Ziele from Kurs
    concat_ws(', ', (SELECT string_agg(dz.wert, ', ') AS kursInformationenZiel
                     FROM didaktische_ziel dz
                              LEFT JOIN ziel z
                                        ON dz.id = z.fk_didaktische_ziel
                              LEFT JOIN kurs_ziel kz
                                        ON z.id = kz.id
                     WHERE kz.id_kurs = k.id),
              (SELECT string_agg(bz.wert, ', ')
               FROM berufliches_ziel bz
                        LEFT JOIN ziel z
                                  ON bz.id = z.fk_berufliches_ziel
                        LEFT JOIN kurs_ziel kz
                                  ON z.id = kz.id
               WHERE kz.id_kurs = k.id),
              (SELECT string_agg(n.wert, ', ')
               FROM niveau n
                        LEFT JOIN ziel z
                                  ON n.id = z.fk_ziel_niveau
                        LEFT JOIN kurs_ziel kz
                                  ON z.id = kz.id
               WHERE kz.id_kurs = k.id)
        )
    )) LIKE UPPER('%A1%')

  -- **********************
  -- kursInformationenAltersgruppe
  -- **********************
  AND UPPER((
    -- Get All Altersgruppen from Kurs
    (SELECT string_agg(ag.wert, ', ') AS kursInformationenAadressatengruppen
     FROM altersgruppe ag
              LEFT JOIN adressatengruppe adg
                        ON ag.id = adg.fk_altersgruppe
              LEFT JOIN kurs_adressatengruppe ka
                        ON ka.id_adressatengruppe = adg.id
     WHERE ka.id_kurs = k.id)
)) LIKE UPPER('%Erwachsene%')

  -- **********************
  -- Geschlecht
  -- **********************
  AND UPPER((
    (SELECT string_agg(g.wert, ', ') AS kursInformationenGeschlecht
     FROM geschlecht g
              LEFT JOIN adressatengruppe adg
                        ON g.id = adg.fk_geschlecht
              LEFT JOIN kurs_adressatengruppe ka
                        ON ka.id_adressatengruppe = adg.id
     WHERE ka.id_kurs = k.id)
  )) LIKE UPPER('%Mann%')