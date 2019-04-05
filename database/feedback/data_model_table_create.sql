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

