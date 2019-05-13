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
    tag varchar(30),
    tag_start date,
    zeit_start time without time zone,
    tag_ende date,
    zeit_ende time without time zone,
    pause_start time without time zone,
    pause_ende time without time zone,
    haeufigkeit integer,
    lektionen integer,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.durchfuehrungszeit
    (fk_kurs);
CREATE INDEX ON public.durchfuehrungszeit
    (fk_durchfuerungsort);


CREATE TABLE public.durchfuehrungsort (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    fk_adresse integer NOT NULL,
    raum varchar(100),
    kinderhuetedienst boolean,
    PRIMARY KEY (id)
);

ALTER TABLE public.durchfuehrungsort
    ADD UNIQUE (code);


CREATE TABLE public.anbieter (
    id SERIAL NOT NULL,
    fk_kontaktdaten integer,
    offizieller_name varchar(60) NOT NULL,
    beschreibung text,
    PRIMARY KEY (id)
);

ALTER TABLE public.anbieter
    ADD UNIQUE (offizieller_name);

CREATE INDEX ON public.anbieter
    (fk_kontaktdaten);


CREATE TABLE public.kontaktperson (
    id SERIAL NOT NULL,
    fk_stellvertreter integer,
    fk_anbieter integer NOT NULL,
    fk_anrede integer NOT NULL,
    fk_kontaktdaten integer NOT NULL,
    name varchar(30) NOT NULL,
    vorname varchar(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.kontaktperson
    (fk_stellvertreter);
CREATE INDEX ON public.kontaktperson
    (fk_anbieter);
CREATE INDEX ON public.kontaktperson
    (fk_anrede);
CREATE INDEX ON public.kontaktperson
    (fk_kontaktdaten);


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
    fk_altersgruppe integer,
    fk_geschlecht integer,
    mit_kinder boolean,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.adressatengruppe
    ADD UNIQUE (code);

CREATE INDEX ON public.adressatengruppe
    (fk_altersgruppe);
CREATE INDEX ON public.adressatengruppe
    (fk_geschlecht);


CREATE TABLE public.kurs_adressatengruppe (
    id SERIAL NOT NULL,
    id_kurs integer NOT NULL,
    id_adressatengruppe integer NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE public.anbieter_kontaktperson (
    id_anbieter integer NOT NULL,
    id_kontaktperson integer NOT NULL
);


CREATE TABLE public.niveau (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(60) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.niveau
    ADD UNIQUE (code);


CREATE TABLE public.sprachnachweis (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.sprachnachweis
    ADD UNIQUE (code);


CREATE TABLE public.kosten (
    id SERIAL NOT NULL,
    fk_kurs integer,
    fk_kostenart integer,
    betrag numeric(6,2),
    subventioniert numeric(3,0),
    PRIMARY KEY (id)
);

CREATE INDEX ON public.kosten
    (fk_kurs);
CREATE INDEX ON public.kosten
    (fk_kostenart);


COMMENT ON COLUMN public.kosten.fk_kurs
    IS 'true: inklusive
false: exklusive';
COMMENT ON COLUMN public.kosten.subventioniert
    IS 'Subvention in Prozent';

CREATE TABLE public.kurs (
    id SERIAL NOT NULL,
    fk_niveau integer,
    fk_sprachnachweis integer,
    fk_anbieter integer,
    fk_konversation integer,
    fk_intensitaet integer,
    fk_kurs_typ integer,
    beschreibung text,
    einstufungstest boolean,
    einzelunterricht boolean,
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
    (fk_kurs_typ);


CREATE TABLE public.kostenart (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.kostenart
    ADD UNIQUE (code);


CREATE TABLE public.intensitaet (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.intensitaet
    ADD UNIQUE (code);


CREATE TABLE public.ziel (
    id SERIAL NOT NULL,
    fk_didaktische_ziel integer,
    fk_berufliches_ziel integer,
    fk_ziel_niveau integer,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.ziel
    (fk_didaktische_ziel);
CREATE INDEX ON public.ziel
    (fk_berufliches_ziel);
CREATE INDEX ON public.ziel
    (fk_ziel_niveau);


CREATE TABLE public.anrede (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.anrede
    ADD UNIQUE (code);


CREATE TABLE public.konversation (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.konversation
    ADD UNIQUE (code);


CREATE TABLE public.didaktische_ziel (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(60) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.didaktische_ziel
    ADD UNIQUE (code);


CREATE TABLE public.berufliches_ziel (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(60) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.berufliches_ziel
    ADD UNIQUE (code);


CREATE TABLE public.entity1 (
);


CREATE TABLE public.person (
    id SERIAL NOT NULL,
    fk_adressatengruppe integer,
    fk_aufenthaltsstatus integer,
    fk_religion integer,
    fk_geschlecht integer,
    fk_arbeitsstatus integer,
    botkit_id varchar(36) NOT NULL,
    pseudonym varchar(30) NOT NULL,
    geburtsdatum date,
    lateinisches_alphabet boolean,
    PRIMARY KEY (id)
);

ALTER TABLE public.person
    ADD UNIQUE (botkit_id, pseudonym);

CREATE INDEX ON public.person
    (fk_adressatengruppe);
CREATE INDEX ON public.person
    (fk_aufenthaltsstatus);
CREATE INDEX ON public.person
    (fk_religion);
CREATE INDEX ON public.person
    (fk_geschlecht);
CREATE INDEX ON public.person
    (fk_arbeitsstatus);


CREATE TABLE public.aufenthlatsstatus (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.aufenthlatsstatus
    ADD UNIQUE (code);


CREATE TABLE public.religion (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.religion
    ADD UNIQUE (code);


CREATE TABLE public.geschlecht (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.geschlecht
    ADD UNIQUE (code);


CREATE TABLE public.kind (
    id SERIAL NOT NULL,
    fk_person integer NOT NULL,
    fk_geschlecht integer,
    geburtsdatum date NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.kind
    (fk_person);
CREATE INDEX ON public.kind
    (fk_geschlecht);


CREATE TABLE public.sprache (
    id SERIAL NOT NULL,
    iso_code char(2) NOT NULL,
    sprache_name varchar(100) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.sprache
    ADD UNIQUE (iso_code);


COMMENT ON COLUMN public.sprache.iso_code
    IS 'ISO 639-1 Code

https://www.iso.org/iso-639-language-codes.html';

CREATE TABLE public.person_sprache (
    id SERIAL NOT NULL,
    id_person integer NOT NULL,
    id_sprache integer NOT NULL,
    fk_sprachniveau integer,
    ist_muttersprache boolean,
    ist_staatssprache boolean,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.person_sprache
    (fk_sprachniveau);


CREATE TABLE public.altersgruppe (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.altersgruppe
    ADD UNIQUE (code);


CREATE TABLE public.arbeitsstatus (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE public.arbeitsstatus
    ADD UNIQUE (code);


CREATE TABLE public.zertifikatstyp (
    id SERIAL NOT NULL,
    fk_person integer NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.zertifikatstyp
    ADD UNIQUE (code);

CREATE INDEX ON public.zertifikatstyp
    (fk_person);


CREATE TABLE public.anmeldeart (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.anmeldeart
    ADD UNIQUE (code);


CREATE TABLE public.anmeldung (
    id SERIAL NOT NULL,
    fk_kurs integer,
    fk_anmeldeart integer,
    fk_kontaktdaten integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.anmeldung
    (fk_kurs);
CREATE INDEX ON public.anmeldung
    (fk_anmeldeart);
CREATE INDEX ON public.anmeldung
    (fk_kontaktdaten);


CREATE TABLE public.adresse (
    id SERIAL NOT NULL,
    fk_ort integer NOT NULL,
    adresse varchar(30),
    adresszusatz_1 varchar(30),
    adresszusatz_2 varchar(30),
    adresszusatz_3 varchar(30),
    plz char(4),
    PRIMARY KEY (id)
);


CREATE TABLE public.kontaktdaten (
    id SERIAL NOT NULL,
    fk_adresse integer,
    online_formular varchar(254),
    url varchar(2083),
    PRIMARY KEY (id)
);

CREATE INDEX ON public.kontaktdaten
    (fk_adresse);


CREATE TABLE public.ort (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(60) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.ort
    ADD UNIQUE (code);


CREATE TABLE public.kurs_typ (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.kurs_typ
    ADD UNIQUE (code);


CREATE TABLE public.mail (
    id SERIAL NOT NULL,
    fk_mail_typ integer NOT NULL,
    mail varchar(254) NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.mail
    (fk_mail_typ);


CREATE TABLE public.telefon (
    id SERIAL NOT NULL,
    fk_telefon_typ integer NOT NULL,
    telefonnummer varchar(12) NOT NULL,
    erreichbarkeit_start time without time zone,
    erreichbarkeit_ende time without time zone,
    erreichbarkeit_wochenende boolean,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.telefon
    (fk_telefon_typ);


CREATE TABLE public.mail_typ (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    PRIMARY KEY (id)
);

ALTER TABLE public.mail_typ
    ADD UNIQUE (code);


CREATE TABLE public.telefon_typ (
    id SERIAL NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500),
    sms boolean,
    whatsapp boolean,
    PRIMARY KEY (id)
);

ALTER TABLE public.telefon_typ
    ADD UNIQUE (code);


CREATE TABLE public.kurs_ziel (
    id SERIAL NOT NULL,
    id_kurs integer NOT NULL,
    id_ziel integer NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE public.tag (
    id SERIAL NOT NULL,
    fk_durchfuerungszeit integer NOT NULL,
    code integer NOT NULL,
    wert varchar(30) NOT NULL,
    beschreibung varchar(500) NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX ON public.tag
    (fk_durchfuerungszeit);

