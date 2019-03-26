INSERT INTO public.adressatengruppe(
	id, adressatengruppe, beschreibung)
  VALUES ( 1, 'Frauen', 'Frauen'	)
        ,( 2, 'Erwachsene', 'Erwachsene'	)
        ,( 3, 'Muttersprache', 'Erwachsene deutscher Muttersprache oder gute mündliche Deutschkenntnisse')
        ,( 4, 'B1_B2', 'Erwachsene mit abgeschlossene Niveaustufe B1 oder im Einstufungstest Niveaustufe B2 erreicht')
        ,( 5, 'B2', 'Erwachsene im Einstufungstest Niveaustufe B2 erreicht'	)
        ,( 6, 'C1_C2', 'Erwachsene mit abgeschlossene Niveaustufe C1 oder im Einstufungstest Niveaustufe C2 erreicht'	)
        ,( 7, 'B2_C1', 'Erwachsene mit abgeschlossene Niveaustufe B2 oder im Einstufungstest Niveaustufe C1 erreicht'	)
        ,( 8, 'A2_B1', 'Erwachsene mit abgeschlossene Niveaustufe A2 oder im Einstufungstest Niveaustufe B1 erreicht'	)
        ,( 9, 'A1_A2', 'Abgeschlossene Niveau A1 oder im Einstufungstest Niveau A2 erreicht'	);


INSERT INTO public.niveau(
	id, niveau, beschreibung)
	VALUES   (1, 'Keine_Wenig_Kentnisse', 'Personen mit gar keinen oder nur wenigen Deutschkenntnissen')
          ,(2, 'Schrift_Kentnisse', 'Für Personen mit Kenntnis der lateinischen Schrift')
          ,(3, 'B1', 'Für Personen mit Deutsschniveau B1')
          ,(4, 'B2', 'Für Personen mit Deutsschniveau B2')
          ,(5, 'B3', 'Für Personen mit Deutsschniveau B3')
          ,(6, 'B4', 'Für Personen mit Deutsschniveau B4')
          ,(7, 'B5', 'Für Personen mit Deutsschniveau B5')
          ,(8, 'B6', 'Für Personen mit Deutsschniveau B6')
          ,(9, 'B7', 'Für Personen mit Deutsschniveau B7')
          ,(10, 'B8', 'Für Personen mit Deutsschniveau B8')
          ,(11, 'B9', 'Für Personen mit Deutsschniveau B9')
          ,(12, 'B10', 'Für Personen mit Deutsschniveau B10')
          ,(13, 'B11', 'Für Personen mit Deutsschniveau B11')
          ,(14, 'B12', 'Für Personen mit Deutsschniveau B12')
          ,(15, 'B13', 'Für Personen mit Deutsschniveau B13')
          ,(16, 'B14', 'Für Personen mit Deutsschniveau B14')
          ,(17, 'B15', 'Für Personen mit Deutsschniveau B15')
          ,(18, 'B16', 'Für Personen mit Deutsschniveau B16')
          ,(19, 'B17', 'Für Personen mit Deutsschniveau B17')
          ,(20, 'B18', 'Für Personen mit Deutsschniveau B18')
          ,(21, 'B19', 'Für Personen mit Deutsschniveau B19')
          ,(22, 'A1', 'Für Personen mit Deutsschniveau A1');


INSERT INTO public.sprachnachweis(
	id, sprachnachweis, beschreibung)
  VALUES (1, 'nein', 'nein')
        ,(2, 'ja', 'ja')
        ,(3, 'muttersprache', 'Deutcher Muttersprache oder gute mündliche Deutschkenntnisse')
        ,(4, 'B1', 'Deutsch B1')
        ,(5, 'B1_Intensiv', 'Geschäftsdeutsch B1 Intensiv')
        ,(6, 'B1_Konversation', 'Deutsch Konversation B1')
        ,(7, 'C1', 'Deutsch C1')
        ,(8, 'A2', 'Deutsch A2')
        ,(9, 'A2_Intensiv', 'Deutsch A2 (Intensiv)')
        ,(10, 'A1', 'Deutsch A1')
        ,(11, 'A1_Intensiv', 'Deutsch A1 (Intensiv)')
        ,(12, 'B2', 'Deutsch B2')
        ,(13, 'B2_Konversation', 'Deutsch Konversation B2');


INSERT INTO public.anbieter(
	id, name, beschreibung, website, mail, telefon, strasse, plz, ort)
	VALUES (1, 'Nosotras Aargau', 'NoSotras setzt sich dafür ein, Frauen zu aktivieren und zu integrieren. IN Aarau und Baden bieten sie Deutschkurse und Konversationskurse an.', 'www.nosotras-aargau.ch', 'info@nosotras-aargau.ch', '','','','')
  ,(2, 'Verein Lesen und Schreiben für Erwachsene', 'Lesen, Schreiben, Rechtschreibung, Grammatik, Stil, Wortschatz, Fremdwörter und Textverständnis. Das Kurs- und Beratungsangebot richtet sich an Erwachsene mit deutscher Muttersprache oder guten mündlichen Deutschkenntnissen, die im Umgang mit der deutschen Sprache unsicher sind.','www.lesenschreibenaargau.ch','info@lesenschreibenaargau.ch','062 824 05 25','Entfelderstrasse 61','5000','Aarau')
  ,(3, 'TLC Baden', 'TLC International House Zurich-Baden ist die Sprachschule für Erwachsene und Unternehmen. In unseren Räumlichkeiten in Baden und Birr sowie firmenintern in der gesamten Deutschschweiz ist TLC Ihr idealer Partner für professionelles Sprachtraining. Individuell, praxisnah und effizient. Sie lernen in Kleingruppen von maximal 8 Kursteilnehmenden und werden von hoch qualifizierten und motivierten Lehrkräften betreut, die ausnahmslos ihre Muttersprache unterrichten. Drei internationale Zertifizierungen und über 100 Firmenreferenzen bürgen für unsere Qualität.','www.ihbaden.ch','info@ihbaden.ch','056 205 51 78','Bahnhofstrasse 44','5400','Baden');


INSERT INTO public.kontaktperson(
	id, name, telefon)
	VALUES (1, 'Frau Ligia Vogt', '079 335 06 61');

INSERT INTO public.anbieter_kontaktperson(
	id_anbieter, id_kontaktperson)
	VALUES (1, 1);

INSERT INTO public.tage(
	id, tag)
	VALUES   (1, 'Montag')
	        ,(2, 'Dienstag')
	        ,(3, 'Mittwoch')
	        ,(4, 'Donnerstag')
	        ,(5, 'Freitag')
	        ,(6, 'Samstag')
	        ,(7, 'Sonntag');


INSERT INTO public.durchfuehrungszeiten(
	id, gesamtkursstart, gesamtkursende, gesamtkursdauer_tage, gesamtkursdauer_stunden, einzelkursstart, einzelkursende, einzelkursdauer_stunden)
	VALUES   (1, NULL, NULL, NULL, NULL, '09:00:00', '11:00:00', 120)
	        ,(2, NULL, NULL, NULL, NULL, '14:00:00', '16:00:00', 120)
	        ,(3, '2019-02-01', NULL, 16, NULL, '18:45:00', '21:00:00', 135)
	        ,(4, '2019-02-01', NULL, 18, NULL, '19:00:00', '21:00:00', 120)
	        ,(5, '2019-02-01', NULL, 18, NULL, '19:30:00', '21:30:00', 135)
	        ,(6, '2019-08-28','2019-02-01', 46, 180, '07:30:00', '09:00:00', NULL)
	        ,(7, '2018-11-07','2019-04-10',46,180,'07:30:00','09:00:00',NULL)
	        ,(8, '2018-11-27','2019-04-25',46,180,'07:30:00','09:00:00',NULL)
	        ,(9, '2019-01-08','2019-06-04',42,180,'18:30:00','20:00:00',NULL)
	        ,(10, '2019-02-05','2019-07-05',44,180,'07:30:00','09:00:00',NULL)
	        ,(11, '2019-01-07','2019-02-01',16,NULL,'09:00:00','12:30:00',NULL)
	        ,(12, '2019-01-14','2019-03-18',10,NULL,'17:30:00','19:00:00',NULL)
	        ,(13, '2019-04-30','2019-09-19',40,180,'19:30:00','21:00:00',NULL)
	        ,(14, '2018-09-04','2019-02-07',42,120,'17:30:00','19:00:00',NULL)
	        ,(15, '2018-10-22','2019-03-25',23,120,'19:00:00','21:05:00',NULL)
	        ,(16, '2019-01-07','2019-05-22',40,120,'18:30:00','20:00:00',NULL)
	        ,(17, '2018-08-28','2019-02-01',46,180,'07:30:00','09:00:00',NULL)
	        ,(18, '2019-01-07','2019-02-01',16,NULL,'09:00:00','12:30:00',NULL)
	        ,(19, '2019-01-07','2019-05-20',39,120,'19:00:00','20:30:00',NULL)
	        ,(20, '2019-01-14','2019-06-17',45,120,'19:00:00','20:30:00',NULL)
	        ,(21, '2018-09-04','2019-02-07',42,120,'17:30:00','19:00:00',NULL)
	        ,(22, '2019-02-12','2019-07-04',42,120,'18:30:00','20:00:00',NULL)
	        ,(23, '2018-10-24','2019-04-01',46,120,'17:30:00','19:00:00',NULL)
	        ,(24, '2019-01-07','2019-02-01',16,NULL,'08:00:00','11:30:00',NULL)
	        ,(25, '2019-01-28','2019-07-01',45,120,'19:00:00','20:30:00',NULL)
	        ,(26, '2018-11-08','2019-04-09',40,180,'18:35:00','20:05:00',NULL)
	        ,(27, '2019-02-05','2019-04-09',10,NULL,'17:30:00','19:00:00',NULL)
	        ,(28, '2019-04-10','2019-09-02',40,180,'18:35:00','20:05:00',NULL)
	        ,(29, '2019-04-11','2019-09-03',40,180,'19:35:00','21:05:00',NULL);

INSERT INTO public.zeit_tag(
	id_zeit, id_tag)
	VALUES(1,2)
          ,(2,2)
          ,(6,2)
          ,(6,5)
          ,(7,2)
          ,(7,5)
          ,(8,2)
          ,(8,5)
          ,(9,2)
          ,(9,4)
          ,(10,2)
          ,(10,5)
          ,(12,1)
          ,(13,2)
          ,(13,4)
          ,(14,2)
          ,(14,4)
          ,(15,1)
          ,(16,1)
          ,(16,3)
          ,(17,2)
          ,(17,5)
          ,(18,2)
          ,(18,5)
          ,(19,1)
          ,(19,3)
          ,(20,1)
          ,(20,3)
          ,(21,2)
          ,(21,4)
          ,(22,2)
          ,(22,4)
          ,(23,2)
          ,(23,4)
          ,(25,1)
          ,(25,3)
          ,(26,2)
          ,(26,4)
          ,(27,2)
          ,(28,1)
          ,(28,3)
          ,(29,2)
          ,(29,4);

INSERT INTO public.durchfuerungsort(
	id, strasse, plz, ort, raum)
	VALUES (1, 'Zürcherstrasse 1','5400','Baden','Nosotras Aargau')
	      ,(2, 'Rain 24','5000','Aarau','Anlaufstelle Integration Aargau (2. Stock)')
	      ,(3, NULL,NULL,'Aarau',NULL)
	      ,(4, NULL,NULL,'Baden',NULL)
	      ,(5, 'Bahnhofstrasse 44','5400','Baden',NULL);


INSERT INTO public.kosten(
	id, lehrmaterial, gesamtkurs, einzelkurs, einstufungstest, subventioniert)
	VALUES   (1, true,0.00,0.00,0.00,0.00)
          ,(2, true,0.00,0.00,0.00,0.00)
          ,(3, true,400.00,NULL,0.00,0.00)
          ,(4, true,400.00,NULL,0.00,0.00)
          ,(5, true,440.00,NULL,0.00,0.00)
          ,(6, FALSE,1440.00,NULL,NULL,0.00)
          ,(7, FALSE,1440.00,NULL,NULL,0.00)
          ,(8, FALSE,1440.00,NULL,NULL,0.00)
          ,(9, FALSE,1440.00,NULL,NULL,0.00)
          ,(10, FALSE,1440.00,NULL,NULL,0.00)
          ,(11, FALSE,1180.00,NULL,NULL,0.00)
          ,(12, FALSE,510.00,NULL,NULL,0.00)
          ,(13, FALSE,1440.00,NULL,NULL,0.00)
          ,(14, FALSE,1440.00,NULL,NULL,0.00)
          ,(15, FALSE,1080.00,NULL,NULL,0.00)
          ,(16, FALSE,1440.00,NULL,NULL,0.00)
          ,(17, FALSE,1440.00,NULL,NULL,0.00)
          ,(18, FALSE,1180.00,NULL,NULL,0.00)
          ,(19, FALSE,1440.00,NULL,NULL,0.00)
          ,(20, FALSE,1440.00,NULL,NULL,0.00)
          ,(21, FALSE,1440.00,NULL,NULL,0.00)
          ,(22, FALSE,1440.00,NULL,NULL,0.00)
          ,(23, FALSE,1440.00,NULL,NULL,0.00)
          ,(24, FALSE,1180.00,NULL,NULL,0.00)
          ,(25, FALSE,1440.00,NULL,NULL,0.00)
          ,(26, FALSE,1080.00,NULL,NULL,0.00)
          ,(27, FALSE,20.00,NULL,NULL,0.00)
          ,(28, FALSE,1440.00,NULL,NULL,0.00)
          ,(29, FALSE,1440.00,NULL,NULL,0.00);

INSERT INTO public.deutschkurs(
	id, kursniveau, kurssprachnachweis, kurszeit, kursanbieter, kursort, kurskosten, kurszweck, kurskonversation, kursbeschreibung, kurseinstufungstest, kurseinzelunterricht, kursintensitaet)
	VALUES (1,1,1,1,1,1,1,'Konversation', 'Alltagswissen','Lockere Konversation',FALSE,FALSE,0)
	      ,(2,1,1,2,1,2,2,'Konversation', 'Alltagswissen','lockere Konversation',FALSE,FALSE,0)
	      ,(3,2,3,3,2,3,3,'Deutsch Lesen und Schreiben',NULL,'Sie haben Mühe, Wörter und Sätze zu lesen oder zu schreiben. Die Schriftsprache wird von Grund auf gelernt. Es wird mit Themen aus dem Alltag gearbeitet.',FALSE,TRUE,0)
	      ,(4,2,3,4,2,4,4,'Deutsch Lesen und Schreiben',NULL,'Sie haben Mühe, Wörter und Sätze zu lesen oder zu schreiben.Die Schriftsprache wird von Grund auf gelernt.Es wird mit Themen aus dem Alltag gearbeitet.',FALSE,TRUE,0)
	      ,(5,2,3,5,2,3,5,'Deutsch Lesen und Schreiben',NULL,'Sie wollen mehr Sicherheit im Schreiben erlangen.Regeln der Rechtschreibung und Grammatik werden vertieft.Es wird mit Texten aus Beruf und Alltag gearbeitet.',FALSE,TRUE,0)
	      ,(6,3,4,6,3,5,6,'Deutsch B2',NULL,'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.',TRUE,TRUE,0)
	      ,(7,4,4,7,3,5,7,'Deutsch B2',NULL,'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.',TRUE,TRUE,0)
	      ,(8,5,4,8,3,5,8,'Deutsch B2',NULL,'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.',TRUE,TRUE,0)
	      ,(9,6,4,9,3,5,9,'Deutsch B2',NULL,'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.',TRUE,TRUE,0)
	      ,(10,7,4,10,3,5,10,'Deutsch B2',NULL,'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.',TRUE,TRUE,0)
	      ,(11,8,5,11,3,5,11,'Geschäftsdeutsch B2',NULL,'Der Kurs Geschäftsdeutsch B2 richtet sich an Deutschlernende, die ihre Fähigkeiten im Bereich schriftlicher und mündlicher Kommunikation für die Arbeit im Büro verbessern möchten.',TRUE,TRUE,1)
	      ,(12,9,6,12,3,5,12,'Konversation B2','Formale Konversation','Sie haben eine solide Basis im Deutschen und möchten Ihre mündliche Ausdrucksfähigkeit verbessernNULL Im Fokuskurs Besser Sprechen B2 üben Sie das Sprechen in authentischen Situationen und über Themen Ihrer Wahl in Paaren, Kleingruppen und im Plenum und gewinnen so weiter an sprachlicher Sicherheit, um sich spontan und fliessend auszudrücken. Ihr Wortschatz erweitert sich und Sie formulieren Ihre Beiträge grammatikalisch korrekter.',TRUE,TRUE,0)
	      ,(13,10,4,13,3,5,13,'Deutsch B2',NULL,'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.',TRUE,TRUE,0)
	      ,(14,11,2,14,3,5,14,'Deutsch A1',NULL,'Jetzt starten: Legen Sie mit dem Anfängerkurs Deutsch A1 den Grundstein für eine erfolgreiche Kommunikation in Deutsch. Der Sprachkurs vermittelt Ihnen die Basics des modernen Alltagsdeutsch und zeigt Ihnen kulturelle Besonderheiten der deutschsprachigen Länder auf.',TRUE,TRUE,0)
	      ,(15,12,7,15,3,5,15,'Deutsch C2',NULL,'Auf die Details kommt es an: Im Deutschkurs auf Niveaustufe C2 konzentrieren Sie sich auf die Feinheiten der deutschen Sprache. Ihr bereits sehr gutes Deutsch wird am Ende dieser Niveaustufe auf ein fast perfektes und fliessendes Deutsch angehoben, das einer mutter-sprachlichen Verwendung der Sprache gleicht.',TRUE,TRUE,0)
	      ,(16,13,7,16,3,5,16,'Deutsch C2',NULL,'Auf die Details kommt es an: Im Deutschkurs auf Niveaustufe C2 konzentrieren Sie sich auf die Feinheiten der deutschen Sprache. Ihr bereits sehr gutes Deutsch wird am Ende dieser Niveaustufe auf ein fast perfektes und fliessendes Deutsch angehoben, das einer mutter-sprachlichen Verwendung der Sprache gleicht.',TRUE,TRUE,0)
	      ,(17,14,8,17,3,NULL,17,'Deutsch B1',NULL,'Bleiben Sie dran: Auf der Niveaustufe B1 erweitern Sie Ihre bisherige Sprachkompetenz. Sie erlangen Gewandtheit im Sprechen und Schreiben und sind in der Lage, Ihr erstes Buch auf Englisch zu lesen oder sich auf Reisen im Alltag zu verständigen.',TRUE,TRUE,0)
	      ,(18,15,9,18,3,NULL,18,'Deutsch B1 (Intensiv)',NULL,'Bleiben Sie dran: Auf der Niveaustufe B1 erweitern Sie Ihre bisherige Sprachkompetenz. Sie erlangen Gewandtheit im Sprechen und Schreiben und sind in der Lage, Ihr erstes Buch auf Englisch zu lesen oder sich auf Reisen im Alltag zu verständigen.',TRUE,TRUE,1)
	      ,(19,16,8,19,3,NULL,19,'Deutsch B1',NULL,'Bleiben Sie dran: Auf der Niveaustufe B1 erweitern Sie Ihre bisherige Sprachkompetenz. Sie erlangen Gewandtheit im Sprechen und Schreiben und sind in der Lage, Ihr erstes Buch auf Englisch zu lesen oder sich auf Reisen im Alltag zu verständigen.',TRUE,TRUE,0)
	      ,(20,17,8,20,3,NULL,20,'Deutsch B1',NULL,'Bleiben Sie dran: Auf der Niveaustufe B1 erweitern Sie Ihre bisherige Sprachkompetenz. Sie erlangen Gewandtheit im Sprechen und Schreiben und sind in der Lage, Ihr erstes Buch auf Englisch zu lesen oder sich auf Reisen im Alltag zu verständigen.',TRUE,TRUE,0)
	      ,(21,18,1,21,3,5,21,'Deutsch A1',NULL,'Jetzt starten: Legen Sie mit dem Anfängerkurs Deutsch A1 den Grundstein für eine erfolgreiche Kommunikation in Deutsch. Der Sprachkurs vermittelt Ihnen die Basics des modernen Alltagsdeutsch und zeigt Ihnen kulturelle Besonderheiten der deutschsprachigen Länder auf.',TRUE,TRUE,0)
	      ,(22,19,10,22,3,5,22,'Deutsch A1',NULL,'Jetzt starten: Legen Sie mit dem Anfängerkurs Deutsch A1 den Grundstein für eine erfolgreiche Kommunikation in Deutsch. Der Sprachkurs vermittelt Ihnen die Basics des modernen Alltagsdeutsch und zeigt Ihnen kulturelle Besonderheiten der deutschsprachigen Länder auf.',TRUE,TRUE,0)
	      ,(23,20,10,23,3,5,23,'Deutsch A2',NULL,'Die erste Hürde ist gemeistert: Sie haben bereits die Basics gelernt und können jetzt auf der Niveaustufe A2 Ihre Grundkenntnisse erweitern. Sie bauen Ihren Wortschatz aus, verbessern Ihre Aussprache und lernen, in alltäglichen Situationen natürlich zu kommunizieren.',TRUE,TRUE,0)
	      ,(24,21,11,24,3,5,24,'Deutsch A2 (Intensiv)',NULL,'Die erste Hürde ist gemeistert: Sie haben bereits die Basics gelernt und können jetzt auf der Niveaustufe A2 Ihre Grundkenntnisse erweitern. Sie bauen Ihren Wortschatz aus, verbessern Ihre Aussprache und lernen, in alltäglichen Situationen natürlich zu kommunizieren.',TRUE,TRUE,1)
	      ,(25,22,10,25,3,5,25,'Deutsch A2',NULL,'Die erste Hürde ist gemeistert: Sie haben bereits die Basics gelernt und können jetzt auf der Niveaustufe A2 Ihre Grundkenntnisse erweitern. Sie bauen Ihren Wortschatz aus, verbessern Ihre Aussprache und lernen, in alltäglichen Situationen natürlich zu kommunizieren.',TRUE,TRUE,0)
	      ,(26,4,12,26,3,5,26,'Deutsch C1',NULL,'Mit grossen Schritten vorwärts: Auf der Niveaustufe C1 konzentrieren Sie sich auf die Benutzung der deutschen Sprache im Fortgeschrittenenbereich. Ihr bereits gutes Deutsch wird besonders in den Bereichen Sprechen und Schreiben verbessert.',TRUE,TRUE,0)
	      ,(27,4,13,27,3,5,27,'Konversation','Formale Konversation','Sie sprechen bereits sehr gut Deutsch und möchten Ihre mündliche Ausdrucksfähigkeit weiter verbessernNULL Im Fokuskurs Besser Sprechen C1 üben Sie das Sprechen in authentischen Situationen und über Themen Ihrer Wahl in Paaren, Kleingruppen und im Plenum und gewinnen so themenunabhängig an sprachlicher Sicherheit, ohne nach Worten suchen zu müssen. Ihr Wortschatz erweitert sich und Sie formulieren Ihre Beiträge grammatikalisch korrekter.',TRUE,TRUE,0)
	      ,(28,4,12,28,3,5,28,'Deutsch C1',NULL,'Mit grossen Schritten vorwärts: Auf der Niveaustufe C1 konzentrieren Sie sich auf die Benutzung der deutschen Sprache im Fortgeschrittenenbereich. Ihr bereits gutes Deutsch wird besonders in den Bereichen Sprechen und Schreiben verbessert. ',TRUE,TRUE,0)
	      ,(29,4,12,29,3,5,29,'Deutsch C1',NULL,'Mit grossen Schritten vorwärts: Auf der Niveaustufe C1 konzentrieren Sie sich auf die Benutzung der deutschen Sprache im Fortgeschrittenenbereich. Ihr bereits gutes Deutsch wird besonders in den Bereichen Sprechen und Schreiben verbessert. ',TRUE,TRUE,0);



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














