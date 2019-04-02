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

CREATE TABLE public.durchfuehrungszeiten (
    id SERIAL NOT NULL,
    gesamtkursstart date,
    gesamtkursende date,
    gesamtkursdauer_tage integer,
    gesamtkursdauer_stunden integer,
    einzelkursstart time without time zone,
    einzelkursende time without time zone,
    einzelkursdauer_stunden integer,
    PRIMARY KEY (id)
);


CREATE TABLE public.durchfuerungsort (
    id SERIAL NOT NULL,
    strasse text,
    plz varchar(10),
    ort text,
    raum text,
    PRIMARY KEY (id)
);


CREATE TABLE public.anbieter (
    id SERIAL NOT NULL,
    name text NOT NULL,
    beschreibung text,
    website text,
    mail text,
    telefon varchar(20),
    strasse text,
    plz varchar(10),
    ort text,
    PRIMARY KEY (id)
);


CREATE TABLE public.kontaktperson (
    id SERIAL NOT NULL,
    name text NOT NULL,
    telefon varchar(20) NOT NULL,
    PRIMARY KEY (id)
);


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
    adressatengruppe varchar(50) NOT NULL,
    beschreibung text,
    PRIMARY KEY (id)
);


COMMENT ON COLUMN public.adressatengruppe.adressatengruppe
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
    niveau varchar(50) NOT NULL,
    beschreibung text,
    PRIMARY KEY (id)
);


COMMENT ON COLUMN public.niveau.niveau
    IS 'short name of niveau';

CREATE TABLE public.sprachnachweis (
    id SERIAL NOT NULL,
    sprachnachweis varchar(50) NOT NULL,
    beschreibung text,
    PRIMARY KEY (id)
);


COMMENT ON COLUMN public.sprachnachweis.sprachnachweis
    IS 'short name of sprachnachweis';

CREATE TABLE public.kosten (
    id SERIAL NOT NULL,
    lehrmaterial boolean,
    gesamtkurs numeric,
    einzelkurs numeric,
    einstufungstest numeric,
    subventioniert numeric,
    PRIMARY KEY (id)
);


COMMENT ON COLUMN public.kosten.lehrmaterial
    IS 'true: inklusive
false: exklusive';
