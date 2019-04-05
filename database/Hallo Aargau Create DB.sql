DROP TABLE public.benutzer_log CASCADE;
DROP TABLE public.benutzer CASCADE;
DROP TABLE public.nachricht_typ CASCADE;
DROP TABLE public.bot_log CASCADE;
DROP TABLE public.log_level CASCADE;
DROP TABLE public.deutschkurs CASCADE;
DROP TABLE public.durchfuehrungszeit CASCADE;
DROP TABLE public.durchfuehrungsort CASCADE;
DROP TABLE public.anbieter CASCADE;
DROP TABLE public.kontaktperson CASCADE;
DROP TABLE public.zeit_tag CASCADE;
DROP TABLE public.tage CASCADE;
DROP TABLE public.adressatengruppe CASCADE;
DROP TABLE public.kurs_adressatengruppe CASCADE;
DROP TABLE public.anbieter_kontaktperson CASCADE;
DROP TABLE public.niveau CASCADE;
DROP TABLE public.sprachnachweis CASCADE;
DROP TABLE public.kosten CASCADE;
DROP TABLE public.kurs CASCADE;
DROP TABLE public.kostenart CASCADE;
DROP TABLE public.intensitaet CASCADE;
DROP TABLE public.zweck CASCADE;
DROP TABLE public.anrede CASCADE;
DROP TABLE public.konversation CASCADE;
DROP TABLE public.feedback CASCADE;
DROP TABLE public.stern CASCADE;

CREATE TABLE public.feedback (
    id SERIAL NOT NULL,
    fk_benutzer integer NOT NULL,
    fk_stern integer NOT NULL,
    erfasst_am timestamp with time zone NOT NULL,
    nachricht text,
    PRIMARY KEY (id)
);


CREATE TABLE public.stern (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

CREATE TABLE public.deutschkurs (
    id SERIAL NOT NULL,
    kursniveau integer NOT NULL,
    kurssprachnachweis integer NOT NULL,
    kurszeit integer NOT NULL,
    kursanbieter integer NOT NULL,
    kursort integer,
    kurskosten integer NOT NULL,
    kurszweck text,
    kurskonversation text,
    kursbeschreibung text,
    kurseinstufungstest boolean NOT NULL,
    kurseinzelunterricht boolean NOT NULL,
    kursintensitaet varchar(1) NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.deutschkurs
    (kursniveau);
CREATE INDEX ON public.deutschkurs
    (kurssprachnachweis);
CREATE INDEX ON public.deutschkurs
    (kurszeit);
CREATE INDEX ON public.deutschkurs
    (kursanbieter);
CREATE INDEX ON public.deutschkurs
    (kursort);
CREATE INDEX ON public.deutschkurs
    (kurskosten);


COMMENT ON COLUMN public.deutschkurs.kurseinzelunterricht
    IS '0 = nein
1 = ja';
COMMENT ON COLUMN public.deutschkurs.kursintensitaet
    IS '0 = wochenbkurs
1 = intensivkurs
';

CREATE TABLE public.durchfuehrungszeit (
    id SERIAL NOT NULL,
    fk_kurs integer,
    fk_durchfuerungsort integer,
    reihenfolge integer NOT NULL,
    tag date,
    zeit_start time without time zone,
    zeit_ende time without time zone,
    pause_start time without time zone,
    pause_ende time without time zone,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.durchfuehrungszeit
    (fk_kurs);
CREATE INDEX ON public.durchfuehrungszeit
    (fk_durchfuerungsort);


COMMENT ON COLUMN public.durchfuehrungszeit.tag
    IS 'Kurs Tag';

CREATE TABLE public.durchfuehrungsort (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    strasse varchar(30),
    plz char(4),
    ort varchar(30),
    raum varchar(100),
    PRIMARY KEY (id)
);


CREATE TABLE public.anbieter (
    id SERIAL NOT NULL,
    offizieller_name varchar(50) NOT NULL,
    beschreibung text,
    url varchar(2083),
    mail varchar(254),
    telefon char(12),
    strasse varchar(30),
    plz char(4),
    ort varchar(30),
    PRIMARY KEY (id)
);


CREATE TABLE public.kontaktperson (
    id SERIAL NOT NULL,
    fk_anbieter integer NOT NULL,
    fk_stellvertreter integer,
    fk_anrede integer NOT NULL,
    name varchar(30) NOT NULL,
    vorname varchar(30) NOT NULL,
    telefon char(12),
    PRIMARY KEY (id)
);

CREATE INDEX ON public.kontaktperson
    (fk_anbieter);
CREATE INDEX ON public.kontaktperson
    (fk_stellvertreter);
CREATE INDEX ON public.kontaktperson
    (fk_anrede);


COMMENT ON COLUMN public.kontaktperson.fk_anrede
    IS 'Frau
Herr';

CREATE TABLE public.zeit_tag (
    id_zeit integer NOT NULL,
    id_tag integer NOT NULL
);


CREATE TABLE public.tage (
    id SERIAL NOT NULL,
    tag varchar(10) NOT NULL,
    PRIMARY KEY (id)
);


COMMENT ON COLUMN public.tage.tag
    IS 'Wochentag Name';

CREATE TABLE public.adressatengruppe (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);


COMMENT ON COLUMN public.adressatengruppe.wert
    IS 'short name of  adressatengruppe';

CREATE TABLE public.kurs_adressatengruppe (
    id_kurs integer NOT NULL,
    id_adressatengruppe integer NOT NULL
);


CREATE TABLE public.anbieter_kontaktperson (
    id_anbieter integer NOT NULL,
    id_kontaktperson integer NOT NULL
);


CREATE TABLE public.niveau (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);


CREATE TABLE public.sprachnachweis (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);


CREATE TABLE public.kosten (
    id SERIAL NOT NULL,
    fk_kurs integer,
    fk_kostenart integer,
    betrag numeric(6,2),
    PRIMARY KEY (id)
);

CREATE INDEX ON public.kosten
    (fk_kurs);
CREATE INDEX ON public.kosten
    (fk_kostenart);


COMMENT ON COLUMN public.kosten.fk_kurs
    IS 'true: inklusive
false: exklusive';

CREATE TABLE public.kurs (
    id SERIAL NOT NULL,
    fk_niveau integer,
    fk_sprachnachweis integer,
    fk_anbieter integer,
    fk_konversation integer,
    fk_intensitaet integer,
    fk_zweck integer,
    beschreibung text,
    einstufungstest boolean NOT NULL,
    einzelunterricht boolean NOT NULL,
    subventioniert boolean NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.kurs
    (fk_niveau);
CREATE INDEX ON public.kurs
    (fk_sprachnachweis);
CREATE INDEX ON public.kurs
    (fk_anbieter);
CREATE INDEX ON public.kurs
    (fk_konversation);
CREATE INDEX ON public.kurs
    (fk_intensitaet);
CREATE INDEX ON public.kurs
    (fk_zweck);


CREATE TABLE public.kostenart (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);


CREATE TABLE public.intensitaet (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);


CREATE TABLE public.zweck (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);


CREATE TABLE public.anrede (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);


CREATE TABLE public.konversation (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

CREATE TABLE public.benutzer_log (
    id SERIAL NOT NULL,
    nachricht_typ integer NOT NULL,
    benutzer integer NOT NULL,
    erfasst_am timestamp with time zone NOT NULL,
    nachricht text NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.benutzer_log
    (nachricht_typ);
CREATE INDEX ON public.benutzer_log
    (benutzer);


CREATE TABLE public.benutzer (
    id SERIAL NOT NULL,
    benutzer_kennung varchar(36) NOT NULL,
    registriert_am timestamp with time zone NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE public.benutzer
    ADD UNIQUE (benutzer_kennung);


COMMENT ON COLUMN public.benutzer.benutzer_kennung
    IS 'Benutzer ID wird von Botikt erzeugt bei einer neuen Verbindung';

CREATE TABLE public.nachricht_typ (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);


CREATE TABLE public.bot_log (
    id SERIAL NOT NULL,
    level integer NOT NULL,
    erfasst_am timestamp with time zone NOT NULL,
    eintrag text NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.bot_log
    (level);


CREATE TABLE public.log_level (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);



INSERT INTO public.adressatengruppe(code, wert, beschreibung)
VALUES (1, 'Frauen', 'Frauen')
     , (2, 'Erwachsene', 'Erwachsene')
     , (3, 'Muttersprache', 'Erwachsene deutscher Muttersprache oder gute mündliche Deutschkenntnisse')
     , (4, 'B1_B2', 'Erwachsene mit abgeschlossene Niveaustufe B1 oder im Einstufungstest Niveaustufe B2 erreicht')
     , (5, 'B2', 'Erwachsene im Einstufungstest Niveaustufe B2 erreicht')
     , (6, 'C1_C2', 'Erwachsene mit abgeschlossene Niveaustufe C1 oder im Einstufungstest Niveaustufe C2 erreicht')
     , (7, 'B2_C1', 'Erwachsene mit abgeschlossene Niveaustufe B2 oder im Einstufungstest Niveaustufe C1 erreicht')
     , (8, 'A2_B1', 'Erwachsene mit abgeschlossene Niveaustufe A2 oder im Einstufungstest Niveaustufe B1 erreicht')
     , (9, 'A1_A2', 'Abgeschlossene Niveau A1 oder im Einstufungstest Niveau A2 erreicht');

INSERT INTO public.intensitaet(code, wert, beschreibung)
VALUES (1, 'Wochenkurs', NULL)
     , (2, 'Intensivkurs', NULL);

INSERT INTO public.niveau(code, wert, beschreibung)
VALUES (1, 'Anfänger', 'Personen mit gar keinen oder nur wenigen Deutschkenntnissen')
     , (2, 'Schriftliche Kentnisse', 'Für Personen mit Kenntnis der lateinischen Schrift')
     , (3, 'A1', 'Für Personen mit Deutsschniveau A1')
     , (4, 'A2', 'Für Personen mit Deutsschniveau A2')
     , (5, 'B1', 'Für Personen mit Deutsschniveau B1')
     , (6, 'B2', 'Für Personen mit Deutsschniveau B2')
     , (7, 'C1', 'Für Personen mit Deutsschniveau C1')
     , (8, 'C2', 'Für Personen mit Deutsschniveau C2');

INSERT INTO public.sprachnachweis(code, wert, beschreibung)
VALUES (1, 'nein', 'nein')
     , (2, 'ja', 'ja')
     , (3, 'muttersprache', 'Deutcher Muttersprache oder gute mündliche Deutschkenntnisse')
     , (4, 'B1', 'Deutsch B1')
     , (5, 'B1_Intensiv', 'Geschäftsdeutsch B1 Intensiv')
     , (6, 'B1_Konversation', 'Deutsch Konversation B1')
     , (7, 'C1', 'Deutsch C1')
     , (8, 'A2', 'Deutsch A2')
     , (9, 'A2_Intensiv', 'Deutsch A2 (Intensiv)')
     , (10, 'A1', 'Deutsch A1')
     , (11, 'A1_Intensiv', 'Deutsch A1 (Intensiv)')
     , (12, 'B2', 'Deutsch B2')
     , (13, 'B2_Konversation', 'Deutsch Konversation B2');

INSERT INTO public.zweck(code, wert, beschreibung)
VALUES (1,  'Konversation', NULL)
     , (2,  'Deutsch Lesen und Schreiben', NULL)
     , (3,  'Deutsch A1', NULL)
     , (4,  'Deutsch A2', NULL)
     , (5,  'Deutsch A2 (Intensiv)', NULL)
     , (6,  'Deutsch B1', NULL)
     , (7,  'Deutsch B1 (Intensiv)', NULL)
     , (8,  'Konversation B2', NULL)
     , (9,  'Deutsch B2', NULL)
     , (10, 'Geschäftsdeutsch B2', NULL)
     , (11, 'Deutsch C1', NULL)
     , (12, 'Deutsch C2', NULL);

INSERT INTO public.konversation(code, wert, beschreibung)
VALUES (1, 'Lockere Konversation', NULL)
     , (2, 'Formale Konversation', NULL);

INSERT INTO public.Kostenart(code, wert, beschreibung)
VALUES (1, 'Gesamtkurs', NULL)
     , (2, 'Lehrmaterial', NULL)
     , (3, 'Einzelkurs', NULL)
     , (4, 'Einstufungstest', NULL);

INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 1, k.Id, 0.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 2, k.Id, 0.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 3, k.Id, 400.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 4, k.Id, 400.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 5, k.Id, 440.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 6, k.Id, 1440.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 7, k.Id, 1440.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 8, k.Id, 1440.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 9, k.Id, 1440.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 10, k.Id, 1440.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 11, k.Id, 1180.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 12, k.Id, 510.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 13, k.Id, 1440.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 14, k.Id, 1440.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 15, k.Id, 1080.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 16, k.Id, 1440.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 17, k.Id, 1440.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 18, k.Id, 1180.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 19, k.Id, 1440.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 20, k.Id, 1440.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 21, k.Id, 1440.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 22, k.Id, 1440.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 23, k.Id, 1440.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 24, k.Id, 1180.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 25, k.Id, 1440.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 26, k.Id, 1080.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 27, k.Id, 20.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 28, k.Id, 1440.00
   FROM kostenart k
   WHERE k.code = 1);
INSERT INTO public.kosten(FK_Kurs, FK_Kostenart, Betrag)
  (SELECT 29, k.Id, 1440.00
   FROM kostenart k
   WHERE k.code = 1);

INSERT INTO public.anbieter(Offizieller_Name, beschreibung, url, mail, telefon, strasse, plz, ort)
VALUES ('Nosotras Aargau',
        'NoSotras setzt sich dafür ein, Frauen zu aktivieren und zu integrieren. IN Aarau und Baden bieten sie Deutschkurse und Konversationskurse an.',
        'www.nosotras-aargau.ch', 'info@nosotras-aargau.ch', NULL, NULL, NULL, NULL)
     , ('Verein Lesen und Schreiben für Erwachsene',
        'Lesen, Schreiben, Rechtschreibung, Grammatik, Stil, Wortschatz, Fremdwörter und Textverständnis. Das Kurs- und Beratungsangebot richtet sich an Erwachsene mit deutscher Muttersprache oder guten mündlichen Deutschkenntnissen, die im Umgang mit der deutschen Sprache unsicher sind.',
        'www.lesenschreibenaargau.ch', 'info@lesenschreibenaargau.ch', '+41628240525', 'Entfelderstrasse 61', '5000',
        'Aarau')
     , ('TLC Baden',
        'TLC International House Zurich-Baden ist die Sprachschule für Erwachsene und Unternehmen. In unseren Räumlichkeiten in Baden und Birr sowie firmenintern in der gesamten Deutschschweiz ist TLC Ihr idealer Partner für professionelles Sprachtraining. Individuell, praxisnah und effizient. Sie lernen in Kleingruppen von maximal 8 Kursteilnehmenden und werden von hoch qualifizierten und motivierten Lehrkräften betreut, die ausnahmslos ihre Muttersprache unterrichten. Drei internationale Zertifizierungen und über 100 Firmenreferenzen bürgen für unsere Qualität.',
        'www.ihbaden.ch', 'info@ihbaden.ch', '+41562055178', 'Bahnhofstrasse 44', '5400', 'Baden');

INSERT INTO public.anrede(code, wert, beschreibung)
VALUES (1, 'Frau', NULL);
VALUES (2, 'Herr', NULL);

INSERT INTO public.kontaktperson(fk_anbieter, FK_Stellvertreter, FK_Anrede, Name, Vorname, Telefon)
VALUES (1, NULL, 1, 'Vogt', 'Ligia', '+41793350661');

INSERT INTO public.durchfuehrungsort(code, strasse, plz, ort, raum)
VALUES (1, 'Zürcherstrasse 1', '5400', 'Baden', 'Nosotras Aargau')
     , (2, 'Rain 24', '5000', 'Aarau', 'Anlaufstelle Integration Aargau (2. Stock)')
     , (3, NULL, NULL, 'Aarau', NULL)
     , (4, NULL, NULL, 'Baden', NULL)
     , (5, 'Bahnhofstrasse 44', '5400', 'Baden', NULL);

INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 1,
          o.Id,
          1,
          '2019-04-02',
          '09:00:00',
          '11:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 1);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 1,
          o.Id,
          2,
          '2019-04-08',
          '09:00:00',
          '11:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 1);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 1,
          o.Id,
          3,
          '2019-04-15',
          '09:00:00',
          '11:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 1);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 1,
          o.Id,
          4,
          '2019-04-22',
          '09:00:00',
          '11:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 1);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 1,
          o.Id,
          5,
          '2019-04-29',
          '09:00:00',
          '11:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 1);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 2,
          o.Id,
          1,
          '2019-04-02',
          '14:00:00',
          '16:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 2);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 3,
          o.Id,
          1,
          NULL,
          '18:45:00',
          '21:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 3);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 4,
          o.Id,
          1,
          NULL,
          '19:00:00',
          '21:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 4);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 5,
          o.Id,
          1,
          NULL,
          '19:30:00',
          '21:30:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 3);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 6,
          o.Id,
          1,
          '2019-04-02',
          '07:30:00',
          '09:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 7,
          o.Id,
          1,
          '2019-04-02',
          '07:30:00',
          '09:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 8,
          o.Id,
          1,
          '2019-04-02',
          '07:30:00',
          '09:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 9,
          o.Id,
          1,
          '2019-04-02',
          '18:30:00',
          '20:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 10,
          o.Id,
          1,
          '2019-04-02',
          '07:30:00',
          '09:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 11,
          o.Id,
          1,
          NULL,
          '09:00:00',
          '12:30:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 12,
          o.Id,
          1,
          '2019-04-01',
          '17:30:00',
          '19:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 13,
          o.Id,
          1,
          '2019-04-02',
          '19:30:00',
          '21:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 14,
          o.Id,
          1,
          '2019-04-02',
          '17:30:00',
          '19:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 15,
          o.Id,
          1,
          '2019-04-01',
          '19:00:00',
          '21:05:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 16,
          o.Id,
          1,
          '2019-04-01',
          '18:30:00',
          '20:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 17,
          NULL,
          1,
          '2019-04-02',
          '07:30:00',
          '09:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 1); --o.code = 1 because FK is NULL
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 18,
          NULL,
          1,
          '2019-04-02',
          '09:00:00',
          '12:30:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 1); --o.code = 1 because FK is NULL
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 19,
          NULL,
          1,
          '2019-04-01',
          '19:00:00',
          '20:30:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 1); --o.code = 1 because FK is NULL
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 20,
          NULL,
          1,
          '2019-04-01',
          '19:00:00',
          '20:30:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 1); --o.code = 1 because FK is NULL
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 21,
          o.Id,
          1,
          '2019-04-02',
          '17:30:00',
          '19:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 22,
          o.Id,
          1,
          '2019-04-02',
          '18:30:00',
          '20:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 23,
          o.Id,
          1,
          '2019-04-02',
          '17:30:00',
          '19:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 24,
          o.Id,
          1,
          NULL,
          '08:00:00',
          '11:30:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 25,
          o.Id,
          1,
          '2019-04-01',
          '19:00:00',
          '20:30:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 26,
          o.Id,
          1,
          '2019-04-02',
          '18:35:00',
          '20:05:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 27,
          o.Id,
          1,
          '2019-04-02',
          '17:30:00',
          '19:00:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 28,
          o.Id,
          1,
          '2019-04-01',
          '18:35:00',
          '20:05:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);
INSERT INTO public.durchfuehrungszeit(FK_Kurs, fk_durchfuerungsort, Reihenfolge, Tag, Zeit_Start, Zeit_Ende,
                                      Pause_Start, Pause_Ende)
  (SELECT 29,
          o.Id,
          1,
          '2019-04-02',
          '19:35:00',
          '21:05:00',
          NULL,
          NULL
   FROM durchfuehrungsort o
   WHERE o.code = 5);


-- ,('TLC Baden', 'TLC International Hou

INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          k.Id,
          i.Id,
          z.Id,
          'Lockere Konversation',
          FALSE,
          FALSE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Konversation k,
        Intensitaet i,
        Zweck z
   WHERE n.code = 1
     AND s.code = 1
     AND a.offizieller_name = 'Nosotras Aargau'
     AND k.code = 1
     AND i.code = 1
     AND z.code = 1);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          k.Id,
          i.Id,
          z.Id,
          'Lockere Konversation',
          FALSE,
          FALSE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Konversation k,
        Intensitaet i,
        Zweck z
   WHERE n.code = 1
     AND s.code = 1
     AND a.offizieller_name = 'Nosotras Aargau'
     AND k.code = 1
     AND i.code = 1
     AND z.code = 1);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Sie haben Mühe, Wörter und Sätze zu lesen oder zu schreiben. Die Schriftsprache wird von Grund auf gelernt. Es wird mit Themen aus dem Alltag gearbeitet.',
          FALSE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 2
     AND s.code = 3
     AND a.offizieller_name = 'Verein Lesen und Schreiben für Erwachsene'
     AND i.code = 1
     AND z.code = 2);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Sie haben Mühe, Wörter und Sätze zu lesen oder zu schreiben.Die Schriftsprache wird von Grund auf gelernt.Es wird mit Themen aus dem Alltag gearbeitet.',
          FALSE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 2
     AND s.code = 3
     AND a.offizieller_name = 'Verein Lesen und Schreiben für Erwachsene'
     AND i.code = 1
     AND z.code = 2);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Sie wollen mehr Sicherheit im Schreiben erlangen.Regeln der Rechtschreibung und Grammatik werden vertieft.Es wird mit Texten aus Beruf und Alltag gearbeitet.',
          FALSE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 2
     AND s.code = 3
     AND a.offizieller_name = 'Verein Lesen und Schreiben für Erwachsene'
     AND i.code = 1
     AND z.code = 2);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 5
     AND s.code = 4
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 6);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 5
     AND s.code = 4
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 6);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 5
     AND s.code = 4
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 6);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 5
     AND s.code = 4
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 6);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 5
     AND s.code = 4
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 6);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Der Kurs Geschäftsdeutsch B2 richtet sich an Deutschlernende, die ihre Fähigkeiten im Bereich schriftlicher und mündlicher Kommunikation für die Arbeit im Büro verbessern möchten.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 5
     AND s.code = 5
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 2
     AND z.code = 6);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          k.Id,
          i.Id,
          z.Id,
          'Sie haben eine solide Basis im Deutschen und möchten Ihre mündliche Ausdrucksfähigkeit verbessernNULL Im Fokuskurs Besser Sprechen B2 üben Sie das Sprechen in authentischen Situationen und über Themen Ihrer Wahl in Paaren, Kleingruppen und im Plenum und gewinnen so weiter an sprachlicher Sicherheit, um sich spontan und fliessend auszudrücken. Ihr Wortschatz erweitert sich und Sie formulieren Ihre Beiträge grammatikalisch korrekter.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Konversation k,
        Intensitaet i,
        Zweck z
   WHERE n.code = 5
     AND s.code = 6
     AND a.offizieller_name = 'TLC Baden'
     AND k.code = 2
     AND i.code = 1
     AND z.code = 6);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 5
     AND s.code = 4
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 6);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Jetzt starten: Legen Sie mit dem Anfängerkurs Deutsch A1 den Grundstein für eine erfolgreiche Kommunikation in Deutsch. Der Sprachkurs vermittelt Ihnen die Basics des modernen Alltagsdeutsch und zeigt Ihnen kulturelle Besonderheiten der deutschsprachigen Länder auf.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 5
     AND s.code = 2
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 6);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Auf die Details kommt es an: Im Deutschkurs auf Niveaustufe C2 konzentrieren Sie sich auf die Feinheiten der deutschen Sprache. Ihr bereits sehr gutes Deutsch wird am Ende dieser Niveaustufe auf ein fast perfektes und fliessendes Deutsch angehoben, das einer mutter-sprachlichen Verwendung der Sprache gleicht.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 7
     AND s.code = 7
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 11);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Auf die Details kommt es an: Im Deutschkurs auf Niveaustufe C2 konzentrieren Sie sich auf die Feinheiten der deutschen Sprache. Ihr bereits sehr gutes Deutsch wird am Ende dieser Niveaustufe auf ein fast perfektes und fliessendes Deutsch angehoben, das einer mutter-sprachlichen Verwendung der Sprache gleicht.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 7
     AND s.code = 7
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 11);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Bleiben Sie dran: Auf der Niveaustufe B1 erweitern Sie Ihre bisherige Sprachkompetenz. Sie erlangen Gewandtheit im Sprechen und Schreiben und sind in der Lage, Ihr erstes Buch auf Englisch zu lesen oder sich auf Reisen im Alltag zu verständigen.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 4
     AND s.code = 8
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 4);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Bleiben Sie dran: Auf der Niveaustufe B1 erweitern Sie Ihre bisherige Sprachkompetenz. Sie erlangen Gewandtheit im Sprechen und Schreiben und sind in der Lage, Ihr erstes Buch auf Englisch zu lesen oder sich auf Reisen im Alltag zu verständigen.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 4
     AND s.code = 9
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 2
     AND z.code = 4);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Bleiben Sie dran: Auf der Niveaustufe B1 erweitern Sie Ihre bisherige Sprachkompetenz. Sie erlangen Gewandtheit im Sprechen und Schreiben und sind in der Lage, Ihr erstes Buch auf Englisch zu lesen oder sich auf Reisen im Alltag zu verständigen.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 4
     AND s.code = 8
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 4);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Bleiben Sie dran: Auf der Niveaustufe B1 erweitern Sie Ihre bisherige Sprachkompetenz. Sie erlangen Gewandtheit im Sprechen und Schreiben und sind in der Lage, Ihr erstes Buch auf Englisch zu lesen oder sich auf Reisen im Alltag zu verständigen.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 4
     AND s.code = 8
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 4);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Jetzt starten: Legen Sie mit dem Anfängerkurs Deutsch A1 den Grundstein für eine erfolgreiche Kommunikation in Deutsch. Der Sprachkurs vermittelt Ihnen die Basics des modernen Alltagsdeutsch und zeigt Ihnen kulturelle Besonderheiten der deutschsprachigen Länder auf.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 5
     AND s.code = 1
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 6);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Jetzt starten: Legen Sie mit dem Anfängerkurs Deutsch A1 den Grundstein für eine erfolgreiche Kommunikation in Deutsch. Der Sprachkurs vermittelt Ihnen die Basics des modernen Alltagsdeutsch und zeigt Ihnen kulturelle Besonderheiten der deutschsprachigen Länder auf.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 3
     AND s.code = 10
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 3);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Die erste Hürde ist gemeistert: Sie haben bereits die Basics gelernt und können jetzt auf der Niveaustufe A2 Ihre Grundkenntnisse erweitern. Sie bauen Ihren Wortschatz aus, verbessern Ihre Aussprache und lernen, in alltäglichen Situationen natürlich zu kommunizieren.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 3
     AND s.code = 10
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 3);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Die erste Hürde ist gemeistert: Sie haben bereits die Basics gelernt und können jetzt auf der Niveaustufe A2 Ihre Grundkenntnisse erweitern. Sie bauen Ihren Wortschatz aus, verbessern Ihre Aussprache und lernen, in alltäglichen Situationen natürlich zu kommunizieren.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 3
     AND s.code = 11
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 2
     AND z.code = 3);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Die erste Hürde ist gemeistert: Sie haben bereits die Basics gelernt und können jetzt auf der Niveaustufe A2 Ihre Grundkenntnisse erweitern. Sie bauen Ihren Wortschatz aus, verbessern Ihre Aussprache und lernen, in alltäglichen Situationen natürlich zu kommunizieren.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 3
     AND s.code = 10
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 3);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Mit grossen Schritten vorwärts: Auf der Niveaustufe C1 konzentrieren Sie sich auf die Benutzung der deutschen Sprache im Fortgeschrittenenbereich. Ihr bereits gutes Deutsch wird besonders in den Bereichen Sprechen und Schreiben verbessert.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 6
     AND s.code = 12
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 9);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          k.Id,
          i.Id,
          z.Id,
          'Sie sprechen bereits sehr gut Deutsch und möchten Ihre mündliche Ausdrucksfähigkeit weiter verbessernNULL Im Fokuskurs Besser Sprechen C1 üben Sie das Sprechen in authentischen Situationen und über Themen Ihrer Wahl in Paaren, Kleingruppen und im Plenum und gewinnen so themenunabhängig an sprachlicher Sicherheit, ohne nach Worten suchen zu müssen. Ihr Wortschatz erweitert sich und Sie formulieren Ihre Beiträge grammatikalisch korrekter.',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Konversation k,
        Intensitaet i,
        Zweck z
   WHERE n.code = 6
     AND s.code = 13
     AND a.offizieller_name = 'TLC Baden'
     AND k.code = 2
     AND i.code = 1
     AND z.code = 9);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Mit grossen Schritten vorwärts: Auf der Niveaustufe C1 konzentrieren Sie sich auf die Benutzung der deutschen Sprache im Fortgeschrittenenbereich. Ihr bereits gutes Deutsch wird besonders in den Bereichen Sprechen und Schreiben verbessert. ',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 6
     AND s.code = 12
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 9);
INSERT INTO public.kurs(FK_Niveau, FK_Sprachnachweis, FK_Anbieter, FK_Konversation, FK_Intensitaet, FK_Zweck,
                        Beschreibung, Einstufungstest, Einzelunterricht, Subventioniert)
  (SELECT n.Id,
          s.Id,
          a.Id,
          NULL,
          i.Id,
          z.Id,
          'Mit grossen Schritten vorwärts: Auf der Niveaustufe C1 konzentrieren Sie sich auf die Benutzung der deutschen Sprache im Fortgeschrittenenbereich. Ihr bereits gutes Deutsch wird besonders in den Bereichen Sprechen und Schreiben verbessert. ',
          TRUE,
          TRUE,
          FALSE
   FROM Niveau n,
        Sprachnachweis s,
        Anbieter a,
        Intensitaet i,
        Zweck z
   WHERE n.code = 6
     AND s.code = 12
     AND a.offizieller_name = 'TLC Baden'
     AND i.code = 1
     AND z.code = 9);

INSERT INTO public.kurs_adressatengruppe(id_kurs, id_adressatengruppe)
VALUES (1, 1)
     , (2, 1)
     , (3, 3)
     , (4, 3)
     , (5, 3)
     , (6, 4)
     , (7, 4)
     , (8, 4)
     , (9, 4)
     , (10, 4)
     , (11, 4)
     , (12, 5)
     , (13, 4)
     , (14, 2)
     , (15, 6)
     , (16, 6)
     , (17, 8)
     , (18, 8)
     , (19, 8)
     , (20, 8)
     , (21, 2)
     , (22, 9)
     , (23, 2)
     , (24, 2)
     , (25, 2)
     , (26, 7)
     , (27, 7)
     , (28, 7)
     , (29, 7);


INSERT INTO public.nachricht_typ(code, wert, beschreibung)
VALUES (1, 'USER_MESSAGE', NULL	)
     , (2, 'BOT_MESSAGE', NULL	);

INSERT INTO public.log_level(code, wert, beschreibung)
VALUES (1, 'DEBUG', NULL)
     , (2, 'INFO', NULL)
     , (3, 'WARN', NULL)
     , (4, 'ERROR', NULL);

INSERT INTO public.stern(code, wert, beschreibung)
VALUES (1, '1 Stern',  'Sehr zufrieden')
     , (2, '2 Sterne', 'Zufrieden')
     , (3, '3 Sterne', 'Mittelmässig zufrieden')
     , (4, '4 Sterne', 'Eher nicht zufrieden')
     , (5, '5 Sterne', 'Gar nicht zufrieden');