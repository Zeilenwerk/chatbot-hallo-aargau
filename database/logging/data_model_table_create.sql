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

