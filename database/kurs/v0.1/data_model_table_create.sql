CREATE TABLE public.deutschkurs (
    id integer NOT NULL,
    kursniveau integer NOT NULL,
    kurssprachnachweis integer NOT NULL,
    kurszeit integer NOT NULL,
    kursanbieter integer NOT NULL,
    kursort integer NOT NULL,
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
    id integer NOT NULL,
    gesamtkursstart timestamp with time zone NOT NULL,
    gesamtkursende timestamp with time zone NOT NULL,
    gesamtkursdauer_tage integer NOT NULL,
    gesamtkursdauer_stunden integer NOT NULL,
    einzelkursstart timestamp with time zone NOT NULL,
    einzelkursende timestamp with time zone NOT NULL,
    einzelkursdauer_stunden integer NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE public.durchfuerungsort (
    id  NOT NULL,
    strasse  NOT NULL,
    plz  NOT NULL,
    ort  NOT NULL,
    raum  NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE public.anbieter (
    id integer NOT NULL,
    beschreibung text,
    website text,
    mail text,
    telefon varchar(20),
    strasse text,
    plz integer,
    ort text,
    PRIMARY KEY (id)
);


CREATE TABLE public.kontaktperson (
    id integer NOT NULL,
    name text NOT NULL,
    telefon varchar(20) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE public.zeit_tag (
    id_zeit integer NOT NULL,
    id_tag integer NOT NULL
);


CREATE TABLE public.tage (
    id integer NOT NULL,
    tag varchar(10) NOT NULL
);


COMMENT ON COLUMN public.tage.tag
    IS 'Wochentag Name';

CREATE TABLE public.adressatengruppe (
    id integer NOT NULL,
    adressatengruppe integer NOT NULL,
    beschreibung text NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE public.kurs_adressatengruppe (
    id_kurs integer NOT NULL,
    id_adressatengruppe integer NOT NULL
);


CREATE TABLE public.anbieter_kontaktperson (
    id_anbieter integer NOT NULL,
    id_kontaktperson integer NOT NULL
);


CREATE TABLE public.niveau (
    id integer NOT NULL,
    niveau integer NOT NULL,
    beschreibung text NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE public.sprachnachweis (
    id integer NOT NULL,
    sprachnachweis integer NOT NULL,
    beschreibung text NOT NULL,
    PRIMARY KEY (id)
);


COMMENT ON COLUMN public.sprachnachweis.sprachnachweis
    IS 'normalization of sprachnachweis
ex. B1 = 0, B2 = 1 etc';

CREATE TABLE public.kosten (
    id integer NOT NULL,
    lehrmaterial numeric(0) NOT NULL,
    gesamtkurs numeric(0) NOT NULL,
    einzelkurs numeric(0) NOT NULL,
    einstufungstest numeric(0) NOT NULL,
    subventioniert numeric(0) NOT NULL,
    PRIMARY KEY (id)
);

