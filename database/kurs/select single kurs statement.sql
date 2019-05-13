SELECT DISTINCT k.id AS kursId,
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
                    )                                                 AS kursInformationenZiel,
            an.offizieller_name AS kursInformationenAnbieter,
            anr.wert AS kursKontaktperson_Anrede,
            kp.name || ' ' || kp.vorname AS kursKontaktperson_Name,
            kond.telefon AS kursKontaktperson_Telefon,
            kond.telefon2 AS kursKontaktperson_Telefon2,
            kond.mail AS kursKontaktperson_Mail,
            kond.mail2 AS kursKontaktperson_Mail2,
            kond.online_formular AS kursKontaktperson_Formular,
            kond.url AS kursKontaktperson_Url,
            durz.lektionen AS durchfuerungszeitLektionen,
            duro.kinderhuetedienst AS durchfuerungsortKinderhuetedienst,
            duro.raum AS durchfuerungsortRaum,
            adr.adresse AS durchfuerungsort_Adresse,
            adr.adresszusatz_1 AS durchfuerungsort_Adresszusatz1,
            adr.adresszusatz_2 AS durchfuerungsort_Adresszusatz2,
            adr.adresszusatz_3 AS durchfuerungsort_Adresszusatz3,
            adr.plz AS durchfuerungsort_Plz
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
WHERE k.id = 1
