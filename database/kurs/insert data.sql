INSERT INTO public.adressatengruppe(
	code, wert, beschreibung)
  VALUES ( 1, 'Frauen', 'Frauen'	)
        ,( 2, 'Erwachsene', 'Erwachsene'	)
        ,( 3, 'Muttersprache', 'Erwachsene deutscher Muttersprache oder gute mündliche Deutschkenntnisse')
        ,( 4, 'B1_B2', 'Erwachsene mit abgeschlossene Niveaustufe B1 oder im Einstufungstest Niveaustufe B2 erreicht')
        ,( 5, 'B2', 'Erwachsene im Einstufungstest Niveaustufe B2 erreicht'	)
        ,( 6, 'C1_C2', 'Erwachsene mit abgeschlossene Niveaustufe C1 oder im Einstufungstest Niveaustufe C2 erreicht'	)
        ,( 7, 'B2_C1', 'Erwachsene mit abgeschlossene Niveaustufe B2 oder im Einstufungstest Niveaustufe C1 erreicht'	)
        ,( 8, 'A2_B1', 'Erwachsene mit abgeschlossene Niveaustufe A2 oder im Einstufungstest Niveaustufe B1 erreicht'	)
        ,( 9, 'A1_A2', 'Abgeschlossene Niveau A1 oder im Einstufungstest Niveau A2 erreicht'	);

INSERT INTO public.intensitaet(
	code, wert, beschreibung)
	VALUES   (1,  'Wochenkurs', '')
          ,(2,  'Intensivkurs', '');

INSERT INTO public.niveau(
	code, wert, beschreibung)
	VALUES   (1, 'Anfänger', 'Personen mit gar keinen oder nur wenigen Deutschkenntnissen')
          ,(2, 'Schriftliche Kentnisse', 'Für Personen mit Kenntnis der lateinischen Schrift')
          ,(3, 'A1', 'Für Personen mit Deutsschniveau A1')
          ,(4, 'A2', 'Für Personen mit Deutsschniveau A2')
          ,(5, 'B1', 'Für Personen mit Deutsschniveau B1')
          ,(6, 'B2', 'Für Personen mit Deutsschniveau B2')
          ,(7, 'C1', 'Für Personen mit Deutsschniveau C1')
          ,(8, 'C2', 'Für Personen mit Deutsschniveau C2');

INSERT INTO public.sprachnachweis(
	code, wert, beschreibung)
  VALUES (1,  'nein', 'nein')
        ,(2,  'ja', 'ja')
        ,(3,  'muttersprache', 'Deutcher Muttersprache oder gute mündliche Deutschkenntnisse')
        ,(4,  'B1', 'Deutsch B1')
        ,(5,  'B1_Intensiv', 'Geschäftsdeutsch B1 Intensiv')
        ,(6,  'B1_Konversation', 'Deutsch Konversation B1')
        ,(7,  'C1', 'Deutsch C1')
        ,(8,  'A2', 'Deutsch A2')
        ,(9,  'A2_Intensiv', 'Deutsch A2 (Intensiv)')
        ,(10, 'A1', 'Deutsch A1')
        ,(11, 'A1_Intensiv', 'Deutsch A1 (Intensiv)')
        ,(12, 'B2', 'Deutsch B2')
        ,(13, 'B2_Konversation', 'Deutsch Konversation B2');

INSERT INTO public.zweck(
	code, wert, beschreibung)
	VALUES   (1,  'Konversation', '')
          ,(2,  'Deutsch Lesen und Schreiben', '')
          ,(3,  'Deutsch A1', '')
          ,(4,  'Deutsch A2', '')
          ,(5,  'Deutsch A2 (Intensiv)', '')
          ,(6,  'Deutsch B1', '')
          ,(7,  'Deutsch B1 (Intensiv)', '')
          ,(8,  'Konversation B2', '')
          ,(9,  'Deutsch B2', '')
          ,(10, 'Geschäftsdeutsch B2', '')
          ,(11, 'Deutsch C1', '')
          ,(12, 'Deutsch C2', '');

INSERT INTO public.konversation(
	code, wert, beschreibung)
	VALUES   (1,  'Lockere Konversation', '')
          ,(2,  'Formale Konversation', '');

INSERT INTO public.Kostenart(
	code, wert, beschreibung)
  VALUES (1, 'Gesamtkurs', '')
        ,(2, 'Lehrmaterial', '')
        ,(3, 'Einzelkurs', '')
        ,(4, 'Einstufungstest', '');

INSERT INTO public.kosten(
	FK_Kurs, FK_Kostenart, Betrag)
    (SELECT 1,  k.Id, 0.00
	  FROM kostenart k
	  WHERE k.code = 1)
  ,(SELECT 2,  k.Id, 0.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 3,  k.Id, 400.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 4,  k.Id, 400.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 5,  k.Id, 440.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 6,  k.Id, 1440.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 7,  k.Id, 1440.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 8,  k.Id, 1440.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 9,  k.Id, 1440.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 10, k.Id, 1440.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 11, k.Id, 1180.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 12, k.Id, 510.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 13, k.Id, 1440.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 14, k.Id, 1440.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 15, k.Id, 1080.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 16, k.Id, 1440.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 17, k.Id, 1440.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 18, k.Id, 1180.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 19, k.Id, 1440.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 20, k.Id, 1440.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 21, k.Id, 1440.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 22, k.Id, 1440.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 23, k.Id, 1440.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 24, k.Id, 1180.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 25, k.Id, 1440.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 26, k.Id, 1080.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 27, k.Id, 20.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 28, k.Id, 1440.00
    FROM kostenart k
    WHERE k.code = 1)
  ,(SELECT 29, k.Id, 1440.00
    FROM kostenart k
    WHERE k.code = 1;

INSERT INTO public.anbieter(
	Offizieller_Name, beschreibung, url, mail, telefon, strasse, plz, ort)
	VALUES ('Nosotras Aargau', 'NoSotras setzt sich dafür ein, Frauen zu aktivieren und zu integrieren. IN Aarau und Baden bieten sie Deutschkurse und Konversationskurse an.', 'www.nosotras-aargau.ch', 'info@nosotras-aargau.ch', '','','','')
          ,('Verein Lesen und Schreiben für Erwachsene', 'Lesen, Schreiben, Rechtschreibung, Grammatik, Stil, Wortschatz, Fremdwörter und Textverständnis. Das Kurs- und Beratungsangebot richtet sich an Erwachsene mit deutscher Muttersprache oder guten mündlichen Deutschkenntnissen, die im Umgang mit der deutschen Sprache unsicher sind.','www.lesenschreibenaargau.ch','info@lesenschreibenaargau.ch','062 824 05 25','Entfelderstrasse 61','5000','Aarau')
          ,('TLC Baden', 'TLC International House Zurich-Baden ist die Sprachschule für Erwachsene und Unternehmen. In unseren Räumlichkeiten in Baden und Birr sowie firmenintern in der gesamten Deutschschweiz ist TLC Ihr idealer Partner für professionelles Sprachtraining. Individuell, praxisnah und effizient. Sie lernen in Kleingruppen von maximal 8 Kursteilnehmenden und werden von hoch qualifizierten und motivierten Lehrkräften betreut, die ausnahmslos ihre Muttersprache unterrichten. Drei internationale Zertifizierungen und über 100 Firmenreferenzen bürgen für unsere Qualität.','www.ihbaden.ch','info@ihbaden.ch','056 205 51 78','Bahnhofstrasse 44','5400','Baden');

INSERT INTO public.anrede(
	code, wert, beschreibung)
	VALUES (1, 'Frau', '');
	VALUES (2, 'Herr', '');

INSERT INTO public.kontaktperson(
	FK_Anbiete, FK_Stellvertreter, FK_Anrede, Name, Vorname, Telefon)
	VALUES (1, NULL, 1, 'Vogt', 'Ligia','+41793350661');

INSERT INTO public.durchfuerungsort(
	code, strasse, plz, ort, raum)
	VALUES (1, 'Zürcherstrasse 1','5400','Baden','Nosotras Aargau')
	      ,(2, 'Rain 24','5000','Aarau','Anlaufstelle Integration Aargau (2. Stock)')
	      ,(3, NULL,NULL,'Aarau',NULL)
	      ,(4, NULL,NULL,'Baden',NULL)
	      ,(5, 'Bahnhofstrasse 44','5400','Baden',NULL);

INSERT INTO public.durchfuehrungszeiten(
	FK_Kurs, FK_Durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende, Pause_Start, Pause_Ende)
	 (SELECT 1,  o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 2,  o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 3,  o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 4,  o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 5,  o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 6,  o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 7,  o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 8,  o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 9,  o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 10, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 11, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 12, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 13, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 14, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 15, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 16, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 17, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 18, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 19, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 20, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 21, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 22, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 23, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 24, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 25, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 26, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 27, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 28, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1)
	,(SELECT 29, o.Id, 1, '2019-04-01', '09:00:00', '11:00:00', NULL, NULL
	  FROM durchfuerungsort o
	  WHERE o.code = 1);

INSERT INTO public.deutschkurs(
	FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck, Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
	       (SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Lockere Konversation', FALSE, FALSE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, Konversation k, Intensitaet i, Zweck z
	        WHERE n.code = 1 AND s.code = 1 AND a.code = 1 AND k.code = 1 AND i.code = 1 AND z.code = 1)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'lockere Konversation', FALSE, FALSE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, Konversation k, Intensitaet i, Zweck z
	        WHERE n.code = 1 AND s.code = 1 AND a.code = 1 AND k.code = 1 AND i.code = 1 AND z.code = 1)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Sie haben Mühe, Wörter und Sätze zu lesen oder zu schreiben. Die Schriftsprache wird von Grund auf gelernt. Es wird mit Themen aus dem Alltag gearbeitet.', FALSE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 2 AND s.code = 3 AND a.code = 2 AND i.code = 1 AND z.code = 2)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Sie haben Mühe, Wörter und Sätze zu lesen oder zu schreiben.Die Schriftsprache wird von Grund auf gelernt.Es wird mit Themen aus dem Alltag gearbeitet.', FALSE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 2 AND s.code = 3 AND a.code = 2 AND i.code = 1 AND z.code = 2)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Sie wollen mehr Sicherheit im Schreiben erlangen.Regeln der Rechtschreibung und Grammatik werden vertieft.Es wird mit Texten aus Beruf und Alltag gearbeitet.', FALSE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 2 AND s.code = 3 AND a.code = 2 AND i.code = 1 AND z.code = 2)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 5 AND s.code = 4 AND a.code = 3 AND i.code = 1 AND z.code = 6)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 5 AND s.code = 4 AND a.code = 3 AND i.code = 1 AND z.code = 6)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 5 AND s.code = 4 AND a.code = 3 AND i.code = 1 AND z.code = 6)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 5 AND s.code = 4 AND a.code = 3 AND i.code = 1 AND z.code = 6)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 5 AND s.code = 4 AND a.code = 3 AND i.code = 1 AND z.code = 6)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Der Kurs Geschäftsdeutsch B2 richtet sich an Deutschlernende, die ihre Fähigkeiten im Bereich schriftlicher und mündlicher Kommunikation für die Arbeit im Büro verbessern möchten.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 5 AND s.code = 5 AND a.code = 3 AND i.code = 2 AND z.code = 6)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Sie haben eine solide Basis im Deutschen und möchten Ihre mündliche Ausdrucksfähigkeit verbessernNULL Im Fokuskurs Besser Sprechen B2 üben Sie das Sprechen in authentischen Situationen und über Themen Ihrer Wahl in Paaren, Kleingruppen und im Plenum und gewinnen so weiter an sprachlicher Sicherheit, um sich spontan und fliessend auszudrücken. Ihr Wortschatz erweitert sich und Sie formulieren Ihre Beiträge grammatikalisch korrekter.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, Konversation k, Intensitaet i, Zweck z
	        WHERE n.code = 5 AND s.code = 6 AND a.code = 3 AND k.code = 2 AND i.code = 1 AND z.code = 6)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 5 AND s.code = 4 AND a.code = 3 AND i.code = 1 AND z.code = 6)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Jetzt starten: Legen Sie mit dem Anfängerkurs Deutsch A1 den Grundstein für eine erfolgreiche Kommunikation in Deutsch. Der Sprachkurs vermittelt Ihnen die Basics des modernen Alltagsdeutsch und zeigt Ihnen kulturelle Besonderheiten der deutschsprachigen Länder auf.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 5 AND s.code = 2 AND a.code = 3 AND i.code = 1 AND z.code = 6)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Auf die Details kommt es an: Im Deutschkurs auf Niveaustufe C2 konzentrieren Sie sich auf die Feinheiten der deutschen Sprache. Ihr bereits sehr gutes Deutsch wird am Ende dieser Niveaustufe auf ein fast perfektes und fliessendes Deutsch angehoben, das einer mutter-sprachlichen Verwendung der Sprache gleicht.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 7 AND s.code = 7 AND a.code = 3 AND i.code = 1 AND z.code = 11)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Auf die Details kommt es an: Im Deutschkurs auf Niveaustufe C2 konzentrieren Sie sich auf die Feinheiten der deutschen Sprache. Ihr bereits sehr gutes Deutsch wird am Ende dieser Niveaustufe auf ein fast perfektes und fliessendes Deutsch angehoben, das einer mutter-sprachlichen Verwendung der Sprache gleicht.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 7 AND s.code = 7 AND a.code = 3 AND i.code = 1 AND z.code = 11)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Bleiben Sie dran: Auf der Niveaustufe B1 erweitern Sie Ihre bisherige Sprachkompetenz. Sie erlangen Gewandtheit im Sprechen und Schreiben und sind in der Lage, Ihr erstes Buch auf Englisch zu lesen oder sich auf Reisen im Alltag zu verständigen.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 4 AND s.code = 8 AND a.code = 3 AND i.code = 1 AND z.code = 4)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Bleiben Sie dran: Auf der Niveaustufe B1 erweitern Sie Ihre bisherige Sprachkompetenz. Sie erlangen Gewandtheit im Sprechen und Schreiben und sind in der Lage, Ihr erstes Buch auf Englisch zu lesen oder sich auf Reisen im Alltag zu verständigen.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 4 AND s.code = 9 AND a.code = 3 AND i.code = 2 AND z.code = 4)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Bleiben Sie dran: Auf der Niveaustufe B1 erweitern Sie Ihre bisherige Sprachkompetenz. Sie erlangen Gewandtheit im Sprechen und Schreiben und sind in der Lage, Ihr erstes Buch auf Englisch zu lesen oder sich auf Reisen im Alltag zu verständigen.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 4 AND s.code = 8 AND a.code = 3 AND i.code = 1 AND z.code = 4)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Bleiben Sie dran: Auf der Niveaustufe B1 erweitern Sie Ihre bisherige Sprachkompetenz. Sie erlangen Gewandtheit im Sprechen und Schreiben und sind in der Lage, Ihr erstes Buch auf Englisch zu lesen oder sich auf Reisen im Alltag zu verständigen.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 4 AND s.code = 8 AND a.code = 3 AND i.code = 1 AND z.code = 4)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Jetzt starten: Legen Sie mit dem Anfängerkurs Deutsch A1 den Grundstein für eine erfolgreiche Kommunikation in Deutsch. Der Sprachkurs vermittelt Ihnen die Basics des modernen Alltagsdeutsch und zeigt Ihnen kulturelle Besonderheiten der deutschsprachigen Länder auf.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 5 AND s.code = 1 AND a.code = 3 AND i.code = 1 AND z.code = 6)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Jetzt starten: Legen Sie mit dem Anfängerkurs Deutsch A1 den Grundstein für eine erfolgreiche Kommunikation in Deutsch. Der Sprachkurs vermittelt Ihnen die Basics des modernen Alltagsdeutsch und zeigt Ihnen kulturelle Besonderheiten der deutschsprachigen Länder auf.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 3 AND s.code = 10 AND a.code = 3 AND i.code = 1 AND z.code = 3)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Die erste Hürde ist gemeistert: Sie haben bereits die Basics gelernt und können jetzt auf der Niveaustufe A2 Ihre Grundkenntnisse erweitern. Sie bauen Ihren Wortschatz aus, verbessern Ihre Aussprache und lernen, in alltäglichen Situationen natürlich zu kommunizieren.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 3 AND s.code = 10 AND a.code = 3 AND i.code = 1 AND z.code = 3)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Die erste Hürde ist gemeistert: Sie haben bereits die Basics gelernt und können jetzt auf der Niveaustufe A2 Ihre Grundkenntnisse erweitern. Sie bauen Ihren Wortschatz aus, verbessern Ihre Aussprache und lernen, in alltäglichen Situationen natürlich zu kommunizieren.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 3 AND s.code = 11 AND a.code = 3 AND i.code = 2 AND z.code = 3)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Die erste Hürde ist gemeistert: Sie haben bereits die Basics gelernt und können jetzt auf der Niveaustufe A2 Ihre Grundkenntnisse erweitern. Sie bauen Ihren Wortschatz aus, verbessern Ihre Aussprache und lernen, in alltäglichen Situationen natürlich zu kommunizieren.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 3 AND s.code = 10 AND a.code = 3 AND i.code = 1 AND z.code = 3)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Mit grossen Schritten vorwärts: Auf der Niveaustufe C1 konzentrieren Sie sich auf die Benutzung der deutschen Sprache im Fortgeschrittenenbereich. Ihr bereits gutes Deutsch wird besonders in den Bereichen Sprechen und Schreiben verbessert.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 6 AND s.code = 12 AND a.code = 3 AND i.code = 1 AND z.code = 9)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Sie sprechen bereits sehr gut Deutsch und möchten Ihre mündliche Ausdrucksfähigkeit weiter verbessernNULL Im Fokuskurs Besser Sprechen C1 üben Sie das Sprechen in authentischen Situationen und über Themen Ihrer Wahl in Paaren, Kleingruppen und im Plenum und gewinnen so themenunabhängig an sprachlicher Sicherheit, ohne nach Worten suchen zu müssen. Ihr Wortschatz erweitert sich und Sie formulieren Ihre Beiträge grammatikalisch korrekter.', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, Konversation k, Intensitaet i, Zweck z
	        WHERE n.code = 6 AND s.code = 13 AND a.code = 3 AND k.code = 2 AND i.code = 1 AND z.code = 9)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Mit grossen Schritten vorwärts: Auf der Niveaustufe C1 konzentrieren Sie sich auf die Benutzung der deutschen Sprache im Fortgeschrittenenbereich. Ihr bereits gutes Deutsch wird besonders in den Bereichen Sprechen und Schreiben verbessert. ', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 6 AND s.code = 12 AND a.code = 3 AND i.code = 1 AND z.code = 9)
	      ,(SELECT n.Id, s.Id, a.Id, k.Id, i.Id, z.Id, 'Mit grossen Schritten vorwärts: Auf der Niveaustufe C1 konzentrieren Sie sich auf die Benutzung der deutschen Sprache im Fortgeschrittenenbereich. Ihr bereits gutes Deutsch wird besonders in den Bereichen Sprechen und Schreiben verbessert. ', TRUE, TRUE, FALSE
	        FROM Nivea n, Sprachnachweis s, Anbieter a, NULL, Intensitaet i, Zweck z
	        WHERE n.code = 6 AND s.code = 12 AND a.code = 3 AND i.code = 1 AND z.code = 9);

INSERT INTO public.kurs_adressatengruppe(
	id_kurs, id_adressatengruppe)
	VALUES (1,1)
        ,(2,1)
        ,(3,3)
        ,(4,3)
        ,(5,3)
        ,(6,4)
        ,(7,4)
        ,(8,4)
        ,(9,4)
        ,(10,4)
        ,(11,4)
        ,(12,5)
        ,(13,4)
        ,(14,2)
        ,(15,6)
        ,(16,6)
        ,(17,8)
        ,(18,8)
        ,(19,8)
        ,(20,8)
        ,(21,2)
        ,(22,9)
        ,(23,2)
        ,(24,2)
        ,(25,2)
        ,(26,7)
        ,(27,7)
        ,(28,7)
        ,(29,7);
