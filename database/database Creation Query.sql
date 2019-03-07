CREATE DATABASE "hallo-aargau"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE TABLE public.deutschkurs_durchfuerungsort
(
    "id" serial NOT NULL,
	"Durchführungsort_Strasse" text,
	"Durchführungsort_PLZ" text,
	"Durchführungsort_Ortschaft" text,
	"Durchführungsort_Raum" text,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.deutschkurs_durchfuerungsort
    OWNER to postgres;


CREATE TABLE public.deutschkurs_anbieter
(
    "id" serial NOT NULL,
	"Anbieter_Name" text,
	"Anbieter_Beschreibung" text,
	"Anbieter_Webseite" text,
	"Anbieter_EMail" text,
	"Anbieter_Tel" text,
	"Anbieter_Strasse" text,
	"Anbieter_PLZ" text,
	"Anbieter_Ort" text,
	"Anbieter_Kontakt" text,
	"Kontakt_Tel" text,
	PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.deutschkurs_anbieter
    OWNER to postgres;


CREATE TABLE public.deutschkurs_kosten
(
    "id" serial NOT NULL,
	"Kosten_Lehrmaterial" text,
	"Kosten_Gesamtkurs" text,
	"Kosten_Einzelkurs" text,
	"Kosten_Einstufungstest" text,
	"Kosten_subventioniert" text,
	PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.deutschkurs_kosten
    OWNER to postgres;

CREATE TABLE public.deutschkurs
(
	"id" serial NOT NULL,
    "Gesamtkurs_Start" text,
	"Gesamtkurs_Ende" text,
	"Gesamtkurs_Dauer_Tage" text,
	"Gesamtkurs_Dauer_Stunden" text,
	"Einzelkurs_Start" text,
	"Einzelkurs_Ende" text,
	"Einzelkurs_Dauer_Minuten" text,
	"id_durchfuehrungsort" integer NOT NULL,
	"id_anbieter" integer NOT NULL,
	"id_kosten" integer NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_durchfuehrungsort) REFERENCES deutschkurs_durchfuehrungsort (id),
    FOREIGN KEY (id_anbieter) REFERENCES deutschkurs_anbieter (id),
    FOREIGN KEY (id_kosten) REFERENCES deutschkurs_kosten (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.deutschkurs
    OWNER to postgres;