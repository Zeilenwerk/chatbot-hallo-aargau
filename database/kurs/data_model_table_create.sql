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

