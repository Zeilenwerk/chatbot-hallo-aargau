--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: adressatengruppe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.adressatengruppe (
    id integer NOT NULL,
    code integer NOT NULL,
    wert character varying(30) NOT NULL,
    beschreibung character varying(500)
);


ALTER TABLE public.adressatengruppe OWNER TO postgres;

--
-- Name: COLUMN adressatengruppe.wert; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.adressatengruppe.wert IS 'short name of  adressatengruppe';


--
-- Name: adressatengruppe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.adressatengruppe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.adressatengruppe_id_seq OWNER TO postgres;

--
-- Name: adressatengruppe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.adressatengruppe_id_seq OWNED BY public.adressatengruppe.id;


--
-- Name: anbieter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.anbieter (
    id integer NOT NULL,
    offizieller_name character varying(50) NOT NULL,
    beschreibung text,
    url character varying(2083),
    mail character varying(254),
    telefon character(12),
    strasse character varying(30),
    plz character(4),
    ort character varying(30)
);


ALTER TABLE public.anbieter OWNER TO postgres;

--
-- Name: anbieter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.anbieter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.anbieter_id_seq OWNER TO postgres;

--
-- Name: anbieter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.anbieter_id_seq OWNED BY public.anbieter.id;


--
-- Name: anbieter_kontaktperson; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.anbieter_kontaktperson (
    id_anbieter integer NOT NULL,
    id_kontaktperson integer NOT NULL
);


ALTER TABLE public.anbieter_kontaktperson OWNER TO postgres;

--
-- Name: anrede; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.anrede (
    id integer NOT NULL,
    code integer NOT NULL,
    wert character varying(30) NOT NULL,
    beschreibung character varying(500)
);


ALTER TABLE public.anrede OWNER TO postgres;

--
-- Name: anrede_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.anrede_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.anrede_id_seq OWNER TO postgres;

--
-- Name: anrede_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.anrede_id_seq OWNED BY public.anrede.id;


--
-- Name: benutzer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.benutzer (
    id integer NOT NULL,
    benutzer_kennung character varying(36) NOT NULL,
    registriert_am timestamp with time zone NOT NULL
);


ALTER TABLE public.benutzer OWNER TO postgres;

--
-- Name: COLUMN benutzer.benutzer_kennung; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.benutzer.benutzer_kennung IS 'Benutzer ID wird von Botikt erzeugt bei einer neuen Verbindung';


--
-- Name: benutzer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.benutzer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.benutzer_id_seq OWNER TO postgres;

--
-- Name: benutzer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.benutzer_id_seq OWNED BY public.benutzer.id;


--
-- Name: benutzer_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.benutzer_log (
    id integer NOT NULL,
    nachricht_typ integer NOT NULL,
    benutzer integer NOT NULL,
    erfasst_am timestamp with time zone NOT NULL,
    nachricht text NOT NULL
);


ALTER TABLE public.benutzer_log OWNER TO postgres;

--
-- Name: benutzer_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.benutzer_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.benutzer_log_id_seq OWNER TO postgres;

--
-- Name: benutzer_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.benutzer_log_id_seq OWNED BY public.benutzer_log.id;


--
-- Name: bot_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bot_log (
    id integer NOT NULL,
    level integer NOT NULL,
    erfasst_am timestamp with time zone NOT NULL,
    eintrag text NOT NULL
);


ALTER TABLE public.bot_log OWNER TO postgres;

--
-- Name: bot_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bot_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bot_log_id_seq OWNER TO postgres;

--
-- Name: bot_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bot_log_id_seq OWNED BY public.bot_log.id;


--
-- Name: botkit_channels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.botkit_channels (
    id character(50) NOT NULL,
    json text NOT NULL
);


ALTER TABLE public.botkit_channels OWNER TO postgres;

--
-- Name: botkit_teams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.botkit_teams (
    id character(50) NOT NULL,
    json text NOT NULL
);


ALTER TABLE public.botkit_teams OWNER TO postgres;

--
-- Name: botkit_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.botkit_users (
    id character(50) NOT NULL,
    json text NOT NULL
);


ALTER TABLE public.botkit_users OWNER TO postgres;

--
-- Name: durchfuehrungsort; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.durchfuehrungsort (
    id integer NOT NULL,
    code integer NOT NULL,
    strasse character varying(30),
    plz character(4),
    ort character varying(30),
    raum character varying(100)
);


ALTER TABLE public.durchfuehrungsort OWNER TO postgres;

--
-- Name: durchfuehrungsort_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.durchfuehrungsort_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.durchfuehrungsort_id_seq OWNER TO postgres;

--
-- Name: durchfuehrungsort_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.durchfuehrungsort_id_seq OWNED BY public.durchfuehrungsort.id;


--
-- Name: durchfuehrungszeit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.durchfuehrungszeit (
    id integer NOT NULL,
    fk_kurs integer,
    fk_durchfuerungsort integer,
    reihenfolge integer NOT NULL,
    tag date,
    zeit_start time without time zone,
    zeit_ende time without time zone,
    pause_start time without time zone,
    pause_ende time without time zone
);


ALTER TABLE public.durchfuehrungszeit OWNER TO postgres;

--
-- Name: COLUMN durchfuehrungszeit.tag; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.durchfuehrungszeit.tag IS 'Kurs Tag';


--
-- Name: durchfuehrungszeit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.durchfuehrungszeit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.durchfuehrungszeit_id_seq OWNER TO postgres;

--
-- Name: durchfuehrungszeit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.durchfuehrungszeit_id_seq OWNED BY public.durchfuehrungszeit.id;


--
-- Name: feedback; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feedback (
    id integer NOT NULL,
    fk_benutzer integer NOT NULL,
    fk_stern integer NOT NULL,
    erfasst_am timestamp with time zone NOT NULL,
    nachricht character varying(500)
);


ALTER TABLE public.feedback OWNER TO postgres;

--
-- Name: feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.feedback_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedback_id_seq OWNER TO postgres;

--
-- Name: feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.feedback_id_seq OWNED BY public.feedback.id;


--
-- Name: intensitaet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.intensitaet (
    id integer NOT NULL,
    code integer NOT NULL,
    wert character varying(30) NOT NULL,
    beschreibung character varying(500)
);


ALTER TABLE public.intensitaet OWNER TO postgres;

--
-- Name: intensitaet_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.intensitaet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.intensitaet_id_seq OWNER TO postgres;

--
-- Name: intensitaet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.intensitaet_id_seq OWNED BY public.intensitaet.id;


--
-- Name: kontaktperson; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kontaktperson (
    id integer NOT NULL,
    fk_anbieter integer NOT NULL,
    fk_stellvertreter integer,
    fk_anrede integer NOT NULL,
    name character varying(30) NOT NULL,
    vorname character varying(30) NOT NULL,
    telefon character(12)
);


ALTER TABLE public.kontaktperson OWNER TO postgres;

--
-- Name: COLUMN kontaktperson.fk_anrede; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.kontaktperson.fk_anrede IS 'Frau
Herr';


--
-- Name: kontaktperson_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kontaktperson_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kontaktperson_id_seq OWNER TO postgres;

--
-- Name: kontaktperson_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kontaktperson_id_seq OWNED BY public.kontaktperson.id;


--
-- Name: konversation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.konversation (
    id integer NOT NULL,
    code integer NOT NULL,
    wert character varying(30) NOT NULL,
    beschreibung character varying(500)
);


ALTER TABLE public.konversation OWNER TO postgres;

--
-- Name: konversation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.konversation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.konversation_id_seq OWNER TO postgres;

--
-- Name: konversation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.konversation_id_seq OWNED BY public.konversation.id;


--
-- Name: kosten; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kosten (
    id integer NOT NULL,
    fk_kurs integer,
    fk_kostenart integer,
    betrag numeric(6,2)
);


ALTER TABLE public.kosten OWNER TO postgres;

--
-- Name: COLUMN kosten.fk_kurs; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.kosten.fk_kurs IS 'true: inklusive
false: exklusive';


--
-- Name: kosten_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kosten_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kosten_id_seq OWNER TO postgres;

--
-- Name: kosten_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kosten_id_seq OWNED BY public.kosten.id;


--
-- Name: kostenart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kostenart (
    id integer NOT NULL,
    code integer NOT NULL,
    wert character varying(30) NOT NULL,
    beschreibung character varying(500)
);


ALTER TABLE public.kostenart OWNER TO postgres;

--
-- Name: kostenart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kostenart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kostenart_id_seq OWNER TO postgres;

--
-- Name: kostenart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kostenart_id_seq OWNED BY public.kostenart.id;


--
-- Name: kurs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kurs (
    id integer NOT NULL,
    fk_niveau integer,
    fk_sprachnachweis integer,
    fk_anbieter integer,
    fk_konversation integer,
    fk_intensitaet integer,
    fk_zweck integer,
    beschreibung text,
    einstufungstest boolean NOT NULL,
    einzelunterricht boolean NOT NULL,
    subventioniert boolean NOT NULL
);


ALTER TABLE public.kurs OWNER TO postgres;

--
-- Name: kurs_adressatengruppe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kurs_adressatengruppe (
    id_kurs integer NOT NULL,
    id_adressatengruppe integer NOT NULL
);


ALTER TABLE public.kurs_adressatengruppe OWNER TO postgres;

--
-- Name: kurs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kurs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kurs_id_seq OWNER TO postgres;

--
-- Name: kurs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kurs_id_seq OWNED BY public.kurs.id;


--
-- Name: log_level; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.log_level (
    id integer NOT NULL,
    code integer NOT NULL,
    wert character varying(30) NOT NULL,
    beschreibung character varying(500)
);


ALTER TABLE public.log_level OWNER TO postgres;

--
-- Name: log_level_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.log_level_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.log_level_id_seq OWNER TO postgres;

--
-- Name: log_level_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.log_level_id_seq OWNED BY public.log_level.id;


--
-- Name: nachricht_typ; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nachricht_typ (
    id integer NOT NULL,
    code integer NOT NULL,
    wert character varying(30) NOT NULL,
    beschreibung character varying(500)
);


ALTER TABLE public.nachricht_typ OWNER TO postgres;

--
-- Name: nachricht_typ_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nachricht_typ_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nachricht_typ_id_seq OWNER TO postgres;

--
-- Name: nachricht_typ_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nachricht_typ_id_seq OWNED BY public.nachricht_typ.id;


--
-- Name: niveau; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.niveau (
    id integer NOT NULL,
    code integer NOT NULL,
    wert character varying(30) NOT NULL,
    beschreibung character varying(500)
);


ALTER TABLE public.niveau OWNER TO postgres;

--
-- Name: niveau_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.niveau_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.niveau_id_seq OWNER TO postgres;

--
-- Name: niveau_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.niveau_id_seq OWNED BY public.niveau.id;


--
-- Name: sprachnachweis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sprachnachweis (
    id integer NOT NULL,
    code integer NOT NULL,
    wert character varying(30) NOT NULL,
    beschreibung character varying(500)
);


ALTER TABLE public.sprachnachweis OWNER TO postgres;

--
-- Name: sprachnachweis_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sprachnachweis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sprachnachweis_id_seq OWNER TO postgres;

--
-- Name: sprachnachweis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sprachnachweis_id_seq OWNED BY public.sprachnachweis.id;


--
-- Name: stern; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stern (
    id integer NOT NULL,
    code integer NOT NULL,
    wert character varying(30) NOT NULL,
    beschreibung character varying(500)
);


ALTER TABLE public.stern OWNER TO postgres;

--
-- Name: stern_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stern_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stern_id_seq OWNER TO postgres;

--
-- Name: stern_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stern_id_seq OWNED BY public.stern.id;


--
-- Name: zweck; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zweck (
    id integer NOT NULL,
    code integer NOT NULL,
    wert character varying(30) NOT NULL,
    beschreibung character varying(500)
);


ALTER TABLE public.zweck OWNER TO postgres;

--
-- Name: zweck_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.zweck_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.zweck_id_seq OWNER TO postgres;

--
-- Name: zweck_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.zweck_id_seq OWNED BY public.zweck.id;


--
-- Name: adressatengruppe id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adressatengruppe ALTER COLUMN id SET DEFAULT nextval('public.adressatengruppe_id_seq'::regclass);


--
-- Name: anbieter id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anbieter ALTER COLUMN id SET DEFAULT nextval('public.anbieter_id_seq'::regclass);


--
-- Name: anrede id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anrede ALTER COLUMN id SET DEFAULT nextval('public.anrede_id_seq'::regclass);


--
-- Name: benutzer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.benutzer ALTER COLUMN id SET DEFAULT nextval('public.benutzer_id_seq'::regclass);


--
-- Name: benutzer_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.benutzer_log ALTER COLUMN id SET DEFAULT nextval('public.benutzer_log_id_seq'::regclass);


--
-- Name: bot_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bot_log ALTER COLUMN id SET DEFAULT nextval('public.bot_log_id_seq'::regclass);


--
-- Name: durchfuehrungsort id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.durchfuehrungsort ALTER COLUMN id SET DEFAULT nextval('public.durchfuehrungsort_id_seq'::regclass);


--
-- Name: durchfuehrungszeit id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.durchfuehrungszeit ALTER COLUMN id SET DEFAULT nextval('public.durchfuehrungszeit_id_seq'::regclass);


--
-- Name: feedback id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback ALTER COLUMN id SET DEFAULT nextval('public.feedback_id_seq'::regclass);


--
-- Name: intensitaet id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intensitaet ALTER COLUMN id SET DEFAULT nextval('public.intensitaet_id_seq'::regclass);


--
-- Name: kontaktperson id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kontaktperson ALTER COLUMN id SET DEFAULT nextval('public.kontaktperson_id_seq'::regclass);


--
-- Name: konversation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.konversation ALTER COLUMN id SET DEFAULT nextval('public.konversation_id_seq'::regclass);


--
-- Name: kosten id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kosten ALTER COLUMN id SET DEFAULT nextval('public.kosten_id_seq'::regclass);


--
-- Name: kostenart id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kostenart ALTER COLUMN id SET DEFAULT nextval('public.kostenart_id_seq'::regclass);


--
-- Name: kurs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kurs ALTER COLUMN id SET DEFAULT nextval('public.kurs_id_seq'::regclass);


--
-- Name: log_level id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.log_level ALTER COLUMN id SET DEFAULT nextval('public.log_level_id_seq'::regclass);


--
-- Name: nachricht_typ id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nachricht_typ ALTER COLUMN id SET DEFAULT nextval('public.nachricht_typ_id_seq'::regclass);


--
-- Name: niveau id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.niveau ALTER COLUMN id SET DEFAULT nextval('public.niveau_id_seq'::regclass);


--
-- Name: sprachnachweis id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sprachnachweis ALTER COLUMN id SET DEFAULT nextval('public.sprachnachweis_id_seq'::regclass);


--
-- Name: stern id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stern ALTER COLUMN id SET DEFAULT nextval('public.stern_id_seq'::regclass);


--
-- Name: zweck id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zweck ALTER COLUMN id SET DEFAULT nextval('public.zweck_id_seq'::regclass);


--
-- Data for Name: adressatengruppe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.adressatengruppe (id, code, wert, beschreibung) FROM stdin;
1	1	Frauen	Frauen
2	2	Erwachsene	Erwachsene
3	3	Muttersprache	Erwachsene deutscher Muttersprache oder gute mündliche Deutschkenntnisse
4	4	B1_B2	Erwachsene mit abgeschlossene Niveaustufe B1 oder im Einstufungstest Niveaustufe B2 erreicht
5	5	B2	Erwachsene im Einstufungstest Niveaustufe B2 erreicht
6	6	C1_C2	Erwachsene mit abgeschlossene Niveaustufe C1 oder im Einstufungstest Niveaustufe C2 erreicht
7	7	B2_C1	Erwachsene mit abgeschlossene Niveaustufe B2 oder im Einstufungstest Niveaustufe C1 erreicht
8	8	A2_B1	Erwachsene mit abgeschlossene Niveaustufe A2 oder im Einstufungstest Niveaustufe B1 erreicht
9	9	A1_A2	Abgeschlossene Niveau A1 oder im Einstufungstest Niveau A2 erreicht
\.


--
-- Data for Name: anbieter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.anbieter (id, offizieller_name, beschreibung, url, mail, telefon, strasse, plz, ort) FROM stdin;
2	Verein Lesen und Schreiben für Erwachsene	Lesen, Schreiben, Rechtschreibung, Grammatik, Stil, Wortschatz, Fremdwörter und Textverständnis. Das Kurs- und Beratungsangebot richtet sich an Erwachsene mit deutscher Muttersprache oder guten mündlichen Deutschkenntnissen, die im Umgang mit der deutschen Sprache unsicher sind.	www.lesenschreibenaargau.ch	info@lesenschreibenaargau.ch	+41628240525	Entfelderstrasse 61	5000	Aarau
3	TLC Baden	TLC International House Zurich-Baden ist die Sprachschule für Erwachsene und Unternehmen. In unseren Räumlichkeiten in Baden und Birr sowie firmenintern in der gesamten Deutschschweiz ist TLC Ihr idealer Partner für professionelles Sprachtraining. Individuell, praxisnah und effizient. Sie lernen in Kleingruppen von maximal 8 Kursteilnehmenden und werden von hoch qualifizierten und motivierten Lehrkräften betreut, die ausnahmslos ihre Muttersprache unterrichten. Drei internationale Zertifizierungen und über 100 Firmenreferenzen bürgen für unsere Qualität.	www.ihbaden.ch	info@ihbaden.ch	+41562055178	Bahnhofstrasse 44	5400	Baden
1	Nosotras Aargau	NoSotras setzt sich dafür ein, Frauen zu aktivieren und zu integrieren. IN Aarau und Baden bieten sie Deutschkurse und Konversationskurse an.	www.nosotras-aargau.ch	info@nosotras-aargau.ch	\N	\N	\N	\N
\.


--
-- Data for Name: anbieter_kontaktperson; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.anbieter_kontaktperson (id_anbieter, id_kontaktperson) FROM stdin;
\.


--
-- Data for Name: anrede; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.anrede (id, code, wert, beschreibung) FROM stdin;
1	1	Frau	
\.


--
-- Data for Name: benutzer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.benutzer (id, benutzer_kennung, registriert_am) FROM stdin;
1	a35a46c4-e7a4-cf5b-4a37-1625c47ba45f	2019-04-02 21:52:08.788+02
5	7c44b2a1-35fd-8cad-49d6-6d71ddd8870d	2019-04-03 19:48:37.395+02
\.


--
-- Data for Name: benutzer_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.benutzer_log (id, nachricht_typ, benutzer, erfasst_am, nachricht) FROM stdin;
1	2	1	2019-04-02 21:53:01.509+02	Guten Tag! Wie kann ich Ihenen helfen?
2	2	1	2019-04-02 21:53:54.917+02	Guten Tag! Wie kann ich Ihenen helfen?
3	1	1	2019-04-02 21:53:58.389+02	Deutschkurs suchen
4	2	1	2019-04-02 21:53:58.39+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
5	2	1	2019-04-02 21:53:58.396+02	Wo soll der Deutschkurs stattfinden?
6	2	1	2019-04-02 21:55:58.411+02	Auf wiedersehen. Bei weiteren Anliegen können sie gerne Hallo in das Chat Fenster schreiben.
7	2	5	2019-04-03 19:48:37.509+02	Guten Tag! Wie kann ich Ihenen helfen?
8	1	5	2019-04-03 19:48:39.386+02	Deutschkurs suchen
9	2	5	2019-04-03 19:48:39.387+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
10	2	5	2019-04-03 19:48:39.392+02	Wo soll der Deutschkurs stattfinden?
11	1	5	2019-04-03 19:48:41.593+02	Deutschkurs in Baden
12	2	5	2019-04-03 19:48:41.595+02	Für welches Adressatengruppe soll der Kurs sein?
13	1	5	2019-04-03 19:48:44.79+02	Frauen
14	2	5	2019-04-03 19:48:44.791+02	Sie Suchen somit für den None um None Uhr ein Niveau None Deutschkurs in baden.
15	2	5	2019-04-03 19:48:44.798+02	Stimmen diese Angaben für Sie?
16	2	5	2019-04-03 19:50:44.833+02	Auf wiedersehen. Bei weiteren Anliegen können sie gerne Hallo in das Chat Fenster schreiben.
17	2	5	2019-04-03 19:56:01.865+02	Guten Tag! Wie kann ich Ihenen helfen?
18	1	5	2019-04-03 19:56:02.997+02	Deutschkurs suchen
19	2	5	2019-04-03 19:56:02.997+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
20	2	5	2019-04-03 19:56:03.003+02	Wo soll der Deutschkurs stattfinden?
21	1	5	2019-04-03 19:56:04.286+02	Deutschkurs in Baden
22	2	5	2019-04-03 19:56:04.287+02	Für welches Adressatengruppe soll der Kurs sein?
23	1	5	2019-04-03 19:56:05.333+02	Frauen
24	2	5	2019-04-03 19:56:05.334+02	Sie Suchen somit einen None Kurs für Frauen in baden. Der Kurs Zweck ist None und das kurs None.
25	2	5	2019-04-03 19:56:05.339+02	Stimmen diese Angaben für Sie?
26	2	5	2019-04-03 19:57:46.289+02	Welche Angabe möchten sie abändern?
27	1	5	2019-04-03 19:57:46.28+02	Nein
28	1	5	2019-04-03 19:57:47.244+02	Kurs Ort
29	2	5	2019-04-03 19:59:44.675+02	Guten Tag! Wie kann ich Ihenen helfen?
30	1	5	2019-04-03 19:59:46.036+02	Deutschkurs suchen
31	2	5	2019-04-03 19:59:46.037+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
32	2	5	2019-04-03 19:59:46.043+02	Wo soll der Deutschkurs stattfinden?
33	1	5	2019-04-03 19:59:52.737+02	Lenzburg
34	2	5	2019-04-03 19:59:52.739+02	Für welches Adressatengruppe soll der Kurs sein?
35	1	5	2019-04-03 19:59:56.793+02	Frauen
36	2	5	2019-04-03 19:59:56.801+02	Stimmen diese Angaben für Sie?
37	2	5	2019-04-03 19:59:56.795+02	Sie Suchen somit einen None Kurs für Frauen in lenzburg. Der Kurs Zweck ist None und entspricht dem Niveau None.
38	2	5	2019-04-03 20:01:05.533+02	Guten Tag! Wie kann ich Ihenen helfen?
39	1	5	2019-04-03 20:01:06.499+02	Deutschkurs suchen
40	2	5	2019-04-03 20:01:06.5+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
41	2	5	2019-04-03 20:01:06.504+02	Wo soll der Deutschkurs stattfinden?
42	1	5	2019-04-03 20:01:08.279+02	Deutschkurs in Baden
43	2	5	2019-04-03 20:01:08.281+02	Für welches Adressatengruppe soll der Kurs sein?
44	1	5	2019-04-03 20:01:09.343+02	Frauen
45	2	5	2019-04-03 20:01:09.344+02	Sie Suchen somit einen None Kurs für Frauen in Baden. Der Kurs Zweck ist None und entspricht dem Niveau None.
46	2	5	2019-04-03 20:01:09.35+02	Stimmen diese Angaben für Sie?
47	2	5	2019-04-03 20:55:29.029+02	Guten Tag! Wie kann ich Ihenen helfen?
48	1	5	2019-04-03 20:55:33.206+02	Deutschkurs suchen
49	2	5	2019-04-03 20:55:33.206+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
50	2	5	2019-04-03 20:55:33.208+02	Was für eine Kursintensität suchen Sie?
51	1	5	2019-04-03 20:55:35.598+02	Wochenkurs
52	2	5	2019-04-03 20:55:35.599+02	Sie Suchen somit einen 0 für None in None. Der Kurs Zweck ist None und entspricht dem Niveau None.
53	2	5	2019-04-03 20:55:35.61+02	Stimmen diese Angaben für Sie?
54	2	5	2019-04-03 20:57:35.615+02	Auf wiedersehen. Bei weiteren Anliegen können sie gerne Hallo in das Chat Fenster schreiben.
55	2	5	2019-04-03 21:05:10.248+02	Guten Tag! Wie kann ich Ihenen helfen?
56	1	5	2019-04-03 21:05:11.67+02	Deutschkurs suchen
57	2	5	2019-04-03 21:05:11.671+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
58	2	5	2019-04-03 21:05:11.677+02	Was für eine Kursintensität suchen Sie?
59	1	5	2019-04-03 21:05:13.462+02	Wochenkurs
60	2	5	2019-04-03 21:05:13.463+02	Sie Suchen somit einen Wochenkurs für None in None. Der Kurs Zweck ist None und entspricht dem Niveau None.
61	2	5	2019-04-03 21:05:13.47+02	Stimmen diese Angaben für Sie?
62	2	5	2019-04-03 21:06:54.697+02	Guten Tag! Wie kann ich Ihenen helfen?
63	1	5	2019-04-03 21:06:55.749+02	Deutschkurs suchen
64	2	5	2019-04-03 21:06:55.75+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
65	2	5	2019-04-03 21:06:55.757+02	Was für eine Kursintensität suchen Sie?
66	1	5	2019-04-03 21:06:56.723+02	Wochenkurs
67	2	5	2019-04-03 21:06:56.724+02	Für welches Adressatengruppe soll der Kurs sein?
68	1	5	2019-04-03 21:06:57.821+02	Frauen
69	2	5	2019-04-03 21:06:57.822+02	Wo soll der Deutschkurs stattfinden?
70	1	5	2019-04-03 21:07:00.517+02	Deutschkurs in Baden
71	2	5	2019-04-03 21:07:00.52+02	Was für einen Zweck soll der Kurs erfüllen?
72	1	5	2019-04-03 21:07:10.306+02	Deutsch Lesen und Schreiben
73	2	5	2019-04-03 21:07:10.308+02	Für welches Sprachniveau suchen Sie den Kurs?
74	1	5	2019-04-03 21:07:14.479+02	Anfänger
75	2	5	2019-04-03 21:08:08.05+02	Guten Tag! Wie kann ich Ihenen helfen?
76	1	5	2019-04-03 21:08:09.433+02	Deutschkurs suchen
77	2	5	2019-04-03 21:08:09.434+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
78	2	5	2019-04-03 21:08:09.44+02	Was für eine Kursintensität suchen Sie?
79	1	5	2019-04-03 21:08:10.949+02	Wochenkurs
80	2	5	2019-04-03 21:08:10.949+02	Für welches Adressatengruppe soll der Kurs sein?
81	1	5	2019-04-03 21:08:12.415+02	Frauen
82	2	5	2019-04-03 21:08:12.416+02	Wo soll der Deutschkurs stattfinden?
83	1	5	2019-04-03 21:08:13.519+02	Deutschkurs in Baden
84	2	5	2019-04-03 21:08:13.52+02	Was für einen Zweck soll der Kurs erfüllen?
85	1	5	2019-04-03 21:08:14.538+02	Konversation
86	2	5	2019-04-03 21:08:14.539+02	Für welches Sprachniveau suchen Sie den Kurs?
87	1	5	2019-04-03 21:08:15.452+02	Anfänger
88	2	5	2019-04-03 21:08:15.452+02	Sie Suchen somit einen Wochenkurs für Frauen in Baden. Der Kurs Zweck ist Konversation und entspricht dem Niveau Anfänger.
89	2	5	2019-04-03 21:08:15.462+02	Stimmen diese Angaben für Sie?
90	2	5	2019-04-03 21:08:27.824+02	Möchten sie mir noch eine oder mehrere der folgenden Zusatzinformationen geben?
91	1	5	2019-04-03 21:08:27.819+02	Ja
92	2	5	2019-04-03 21:08:34.003+02	There was an error processing your request. Please try again later. Error: TypeError: zweckHelper.getNiveauCodeFromString is not a function
93	1	5	2019-04-03 21:08:34.001+02	Keine weiteren Angaben
94	2	5	2019-04-03 21:09:19.783+02	Guten Tag! Wie kann ich Ihenen helfen?
95	1	5	2019-04-03 21:09:21.173+02	Deutschkurs suchen
96	2	5	2019-04-03 21:09:21.174+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
97	2	5	2019-04-03 21:09:21.177+02	Was für eine Kursintensität suchen Sie?
98	1	5	2019-04-03 21:09:22.187+02	Wochenkurs
99	2	5	2019-04-03 21:09:22.188+02	Für welches Adressatengruppe soll der Kurs sein?
100	1	5	2019-04-03 21:09:23.18+02	Frauen
101	2	5	2019-04-03 21:09:23.18+02	Wo soll der Deutschkurs stattfinden?
102	1	5	2019-04-03 21:09:24.261+02	Deutschkurs in Baden
103	2	5	2019-04-03 21:09:24.262+02	Was für einen Zweck soll der Kurs erfüllen?
104	1	5	2019-04-03 21:09:25.26+02	Konversation
105	2	5	2019-04-03 21:09:25.26+02	Für welches Sprachniveau suchen Sie den Kurs?
106	1	5	2019-04-03 21:09:26.521+02	Anfänger
107	2	5	2019-04-03 21:09:26.522+02	Sie Suchen somit einen Wochenkurs für Frauen in Baden. Der Kurs Zweck ist Konversation und entspricht dem Niveau Anfänger.
108	2	5	2019-04-03 21:09:26.529+02	Stimmen diese Angaben für Sie?
109	1	5	2019-04-03 21:09:27.897+02	Ja
110	2	5	2019-04-03 21:09:27.904+02	Möchten sie mir noch eine oder mehrere der folgenden Zusatzinformationen geben?
111	1	5	2019-04-03 21:09:28.809+02	Keine weiteren Angaben
112	2	5	2019-04-03 21:12:38.201+02	Guten Tag! Wie kann ich Ihenen helfen?
113	1	5	2019-04-03 21:12:39.591+02	Deutschkurs suchen
114	2	5	2019-04-03 21:12:39.593+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
115	2	5	2019-04-03 21:12:39.598+02	Was für eine Kursintensität suchen Sie?
116	1	5	2019-04-03 21:12:40.698+02	Wochenkurs
117	2	5	2019-04-03 21:12:40.699+02	Für welches Adressatengruppe soll der Kurs sein?
118	1	5	2019-04-03 21:12:41.851+02	Frauen
119	2	5	2019-04-03 21:12:41.852+02	Wo soll der Deutschkurs stattfinden?
120	1	5	2019-04-03 21:12:42.769+02	Deutschkurs in Aarau
121	2	5	2019-04-03 21:12:42.771+02	Was für einen Zweck soll der Kurs erfüllen?
122	1	5	2019-04-03 21:12:43.874+02	Konversation
123	2	5	2019-04-03 21:12:43.875+02	Für welches Sprachniveau suchen Sie den Kurs?
124	1	5	2019-04-03 21:12:45.015+02	Anfänger
125	2	5	2019-04-03 21:12:45.015+02	Sie Suchen somit einen Wochenkurs für Frauen in Aarau. Der Kurs Zweck ist Konversation und entspricht dem Niveau Anfänger.
126	2	5	2019-04-03 21:12:45.023+02	Stimmen diese Angaben für Sie?
127	1	5	2019-04-03 21:12:46.262+02	Nein
128	2	5	2019-04-03 21:12:46.264+02	Welche Angabe möchten sie abändern?
129	1	5	2019-04-03 21:12:47.765+02	Kurs Ort
130	2	5	2019-04-03 21:14:10.065+02	Guten Tag! Wie kann ich Ihenen helfen?
131	1	5	2019-04-03 21:14:11.389+02	Deutschkurs suchen
132	2	5	2019-04-03 21:14:11.396+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
133	2	5	2019-04-03 21:14:11.399+02	Was für eine Kursintensität suchen Sie?
134	1	5	2019-04-03 21:14:14.21+02	Wochenkurs
135	2	5	2019-04-03 21:14:14.217+02	Für welches Adressatengruppe soll der Kurs sein?
136	1	5	2019-04-03 21:14:15.37+02	Frauen
137	2	5	2019-04-03 21:14:15.371+02	Wo soll der Deutschkurs stattfinden?
138	1	5	2019-04-03 21:14:17.208+02	Deutschkurs in Baden
139	2	5	2019-04-03 21:14:17.209+02	Was für einen Zweck soll der Kurs erfüllen?
140	1	5	2019-04-03 21:14:18.256+02	Konversation
141	2	5	2019-04-03 21:14:18.257+02	Für welches Sprachniveau suchen Sie den Kurs?
142	1	5	2019-04-03 21:14:19.275+02	Anfänger
143	2	5	2019-04-03 21:14:19.276+02	Sie Suchen somit einen Wochenkurs für Frauen in Baden. Der Kurs Zweck ist Konversation und entspricht dem Niveau Anfänger.
144	2	5	2019-04-03 21:14:19.282+02	Stimmen diese Angaben für Sie?
145	1	5	2019-04-03 21:14:20.906+02	Ja
146	2	5	2019-04-03 21:14:20.917+02	Möchten sie mir noch eine oder mehrere der folgenden Zusatzinformationen geben?
147	1	5	2019-04-03 21:14:26.369+02	Keine weiteren Angaben
148	2	5	2019-04-03 21:14:26.469+02	Ich habe folgende Kurse gefunden
149	2	5	2019-04-03 21:14:26.469+02	Der Kurs wird am Montag 08.04.2019 durchgeführt.
150	2	5	2019-04-03 21:14:26.47+02	Der Kurs Startet um 09:00:00 Uhr und endet um 11:00:00 Uhr.
151	2	5	2019-04-03 21:14:26.472+02	Möchten sie weitere Informationen zu einem dieser Kurse?
152	1	5	2019-04-03 21:14:39.216+02	Ja, weitere Informationen anzeigen
153	2	5	2019-04-03 21:14:39.343+02	Ich habe folgende Kurse gefunden
154	2	5	2019-04-03 21:14:39.344+02	Kurs Beschreibung: Lockere Konversation
155	2	5	2019-04-03 21:14:39.345+02	Der Kurs wird am Montag 08.04.2019 durchgeführt.
156	2	5	2019-04-03 21:14:39.346+02	Kurs Zweck: Konversation
157	2	5	2019-04-03 21:14:39.347+02	Der Kurs Startet um 09:00:00 Uhr und endet um 11:00:00 Uhr.
158	2	5	2019-04-03 21:14:39.349+02	Kurs Anbieter: Nosotras Aargau
159	2	5	2019-04-03 21:14:39.349+02	E-Mail: info@nosotras-aargau.ch
160	2	5	2019-04-03 21:14:39.35+02	Website: www.nosotras-aargau.ch
161	2	5	2019-04-03 21:14:39.352+02	Kontaktperson: Frau Vogt Ligia, +41793350661
162	2	5	2019-04-03 21:14:39.354+02	Waren sie mit dem Bot zufrieden? Ich würde mich sehr auf Ihr Fedback freuen.
163	2	5	2019-04-03 21:15:54.365+02	Guten Tag! Wie kann ich Ihenen helfen?
164	1	5	2019-04-03 21:15:57.094+02	Deutschkurs suchen
165	2	5	2019-04-03 21:15:57.095+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
166	2	5	2019-04-03 21:15:57.102+02	Was für eine Kursintensität suchen Sie?
167	1	5	2019-04-03 21:15:58.969+02	Wochenkurs
168	2	5	2019-04-03 21:15:58.97+02	Für welches Adressatengruppe soll der Kurs sein?
169	1	5	2019-04-03 21:15:59.955+02	Frauen
170	2	5	2019-04-03 21:15:59.956+02	Wo soll der Deutschkurs stattfinden?
171	1	5	2019-04-03 21:16:01.036+02	Deutschkurs in Baden
172	2	5	2019-04-03 21:16:01.037+02	Was für einen Zweck soll der Kurs erfüllen?
173	1	5	2019-04-03 21:16:02.034+02	Konversation
174	2	5	2019-04-03 21:16:02.035+02	Für welches Sprachniveau suchen Sie den Kurs?
175	1	5	2019-04-03 21:16:03.037+02	Anfänger
176	2	5	2019-04-03 21:16:03.046+02	Stimmen diese Angaben für Sie?
177	2	5	2019-04-03 21:16:03.037+02	Sie Suchen somit einen Wochenkurs für Frauen in Baden. Der Kurs Zweck ist Konversation und entspricht dem Niveau Anfänger.
178	1	5	2019-04-03 21:16:05.724+02	Nein
179	2	5	2019-04-03 21:16:05.725+02	Welche Angabe möchten sie abändern?
180	1	5	2019-04-03 21:16:06.514+02	Kurs Ort
181	2	5	2019-04-03 21:16:06.517+02	Wo soll der Deutschkurs stattfinden?
182	1	5	2019-04-03 21:16:07.523+02	Deutschkurs in Baden
183	2	5	2019-04-03 21:16:07.532+02	Stimmen diese Angaben für Sie?
184	2	5	2019-04-03 21:16:07.523+02	Sie Suchen somit einen Wochenkurs für Frauen in Baden. Der Kurs Zweck ist Konversation und entspricht dem Niveau Anfänger.
185	1	5	2019-04-03 21:16:08.539+02	Ja
186	2	5	2019-04-03 21:16:08.549+02	Möchten sie mir noch eine oder mehrere der folgenden Zusatzinformationen geben?
187	1	5	2019-04-03 21:16:09.872+02	Keine weiteren Angaben
188	2	5	2019-04-03 21:16:09.989+02	Ich habe folgende Kurse gefunden
189	2	5	2019-04-03 21:16:09.989+02	Der Kurs wird am Montag 08.04.2019 durchgeführt.
190	2	5	2019-04-03 21:16:09.991+02	Der Kurs Startet um 09:00:00 Uhr und endet um 11:00:00 Uhr.
191	2	5	2019-04-03 21:16:09.992+02	Möchten sie weitere Informationen zu einem dieser Kurse?
192	1	5	2019-04-03 21:16:10.947+02	Ja, weitere Informationen anzeigen
193	2	5	2019-04-03 21:16:11.061+02	Ich habe folgende Kurse gefunden
194	2	5	2019-04-03 21:16:11.062+02	Der Kurs wird am Montag 08.04.2019 durchgeführt.
195	2	5	2019-04-03 21:16:11.064+02	Kurs Zweck: Konversation
196	2	5	2019-04-03 21:16:11.065+02	Kurs Beschreibung: Lockere Konversation
197	2	5	2019-04-03 21:16:11.067+02	Kurs Anbieter: Nosotras Aargau
198	2	5	2019-04-03 21:16:11.068+02	Der Kurs Startet um 09:00:00 Uhr und endet um 11:00:00 Uhr.
199	2	5	2019-04-03 21:16:11.069+02	E-Mail: info@nosotras-aargau.ch
200	2	5	2019-04-03 21:16:11.07+02	Website: www.nosotras-aargau.ch
201	2	5	2019-04-03 21:16:11.071+02	Kontaktperson: Frau Vogt Ligia, +41793350661
202	2	5	2019-04-03 21:16:11.072+02	Waren sie mit dem Bot zufrieden? Ich würde mich sehr auf Ihr Fedback freuen.
203	2	5	2019-04-03 21:17:26.31+02	Guten Tag! Wie kann ich Ihenen helfen?
204	1	5	2019-04-03 21:17:27.728+02	Deutschkurs suchen
205	2	5	2019-04-03 21:17:27.729+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
206	2	5	2019-04-03 21:17:27.733+02	Was für eine Kursintensität suchen Sie?
207	1	5	2019-04-03 21:17:28.665+02	Wochenkurs
208	2	5	2019-04-03 21:17:28.666+02	Für welches Adressatengruppe soll der Kurs sein?
209	2	5	2019-04-03 21:17:29.594+02	Wo soll der Deutschkurs stattfinden?
210	1	5	2019-04-03 21:17:29.592+02	Frauen
211	1	5	2019-04-03 21:17:30.87+02	Deutschkurs in Baden
212	2	5	2019-04-03 21:17:30.871+02	Was für einen Zweck soll der Kurs erfüllen?
213	1	5	2019-04-03 21:17:32.072+02	Konversation
214	2	5	2019-04-03 21:17:32.073+02	Für welches Sprachniveau suchen Sie den Kurs?
215	1	5	2019-04-03 21:17:32.829+02	Anfänger
216	2	5	2019-04-03 21:17:32.83+02	Sie Suchen somit einen Wochenkurs für Frauen in Baden. Der Kurs Zweck ist Konversation und entspricht dem Niveau Anfänger.
217	2	5	2019-04-03 21:17:32.835+02	Stimmen diese Angaben für Sie?
218	1	5	2019-04-03 21:17:34.516+02	Ja
219	2	5	2019-04-03 21:17:34.527+02	Möchten sie mir noch eine oder mehrere der folgenden Zusatzinformationen geben?
220	1	5	2019-04-03 21:17:35.302+02	Keine weiteren Angaben
221	2	5	2019-04-03 21:17:35.417+02	Ich habe folgende Kurse gefunden
222	2	5	2019-04-03 21:17:35.417+02	Der Kurs wird am Montag 08.04.2019 durchgeführt.
223	2	5	2019-04-03 21:17:35.419+02	Der Kurs Startet um 09:00:00 Uhr und endet um 11:00:00 Uhr.
224	2	5	2019-04-03 21:17:35.419+02	Möchten sie weitere Informationen zu einem dieser Kurse?
225	1	5	2019-04-03 21:17:36.331+02	Ja, weitere Informationen anzeigen
226	2	5	2019-04-03 21:17:36.451+02	Der Kurs wird am Montag 08.04.2019 durchgeführt.
227	2	5	2019-04-03 21:17:36.452+02	Ich habe folgende Kurse gefunden
228	2	5	2019-04-03 21:17:36.453+02	Kurs Beschreibung: Lockere Konversation
229	2	5	2019-04-03 21:17:36.453+02	Kurs Zweck: Konversation
230	2	5	2019-04-03 21:17:36.456+02	Der Kurs Startet um 09:00:00 Uhr und endet um 11:00:00 Uhr.
231	2	5	2019-04-03 21:17:36.457+02	Kurs Anbieter: Nosotras Aargau
232	2	5	2019-04-03 21:17:36.457+02	E-Mail: info@nosotras-aargau.ch
233	2	5	2019-04-03 21:17:36.457+02	Website: www.nosotras-aargau.ch
234	2	5	2019-04-03 21:17:36.46+02	Kontaktperson: Frau Vogt Ligia, +41793350661
235	2	5	2019-04-03 21:17:36.461+02	Waren sie mit dem Bot zufrieden? Ich würde mich sehr auf Ihr Fedback freuen.
236	2	5	2019-04-03 21:17:57.85+02	Guten Tag! Wie kann ich Ihenen helfen?
237	1	5	2019-04-03 21:17:59.014+02	Deutschkurs suchen
238	2	5	2019-04-03 21:17:59.016+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
239	2	5	2019-04-03 21:17:59.025+02	Was für eine Kursintensität suchen Sie?
240	2	5	2019-04-03 21:18:00.596+02	Für welches Adressatengruppe soll der Kurs sein?
241	1	5	2019-04-03 21:18:00.597+02	Wochenkurs
242	1	5	2019-04-03 21:18:01.506+02	Frauen
243	2	5	2019-04-03 21:18:01.507+02	Wo soll der Deutschkurs stattfinden?
244	1	5	2019-04-03 21:18:02.492+02	Deutschkurs in Baden
245	2	5	2019-04-03 21:18:02.498+02	Was für einen Zweck soll der Kurs erfüllen?
246	1	5	2019-04-03 21:18:03.438+02	Konversation
247	2	5	2019-04-03 21:18:03.439+02	Für welches Sprachniveau suchen Sie den Kurs?
248	1	5	2019-04-03 21:18:04.424+02	Anfänger
249	2	5	2019-04-03 21:18:04.431+02	Sie Suchen somit einen Wochenkurs für Frauen in Baden. Der Kurs Zweck ist Konversation und entspricht dem Niveau Anfänger.
250	2	5	2019-04-03 21:18:04.441+02	Stimmen diese Angaben für Sie?
251	1	5	2019-04-03 21:18:06.055+02	Ja
252	2	5	2019-04-03 21:18:06.062+02	Möchten sie mir noch eine oder mehrere der folgenden Zusatzinformationen geben?
253	1	5	2019-04-03 21:18:07.607+02	Keine weiteren Angaben
254	2	5	2019-04-03 21:18:07.72+02	Der Kurs wird am Montag 08.04.2019 durchgeführt.
255	2	5	2019-04-03 21:18:07.721+02	Ich habe folgende Kurse gefunden
256	2	5	2019-04-03 21:18:07.722+02	Der Kurs Startet um 09:00:00 Uhr und endet um 11:00:00 Uhr.
257	2	5	2019-04-03 21:18:07.723+02	Möchten sie weitere Informationen zu einem dieser Kurse?
258	1	5	2019-04-03 21:18:09.303+02	Ja, weitere Informationen anzeigen
259	2	5	2019-04-03 21:18:09.42+02	Ich habe folgende Kurse gefunden
260	2	5	2019-04-03 21:18:09.421+02	Der Kurs wird am Montag 08.04.2019 durchgeführt.
261	2	5	2019-04-03 21:18:09.423+02	Kurs Beschreibung: Lockere Konversation
262	2	5	2019-04-03 21:18:09.424+02	Kurs Zweck: Konversation
263	2	5	2019-04-03 21:18:09.424+02	Der Kurs Startet um 09:00:00 Uhr und endet um 11:00:00 Uhr.
264	2	5	2019-04-03 21:18:09.425+02	Kurs Anbieter: Nosotras Aargau
265	2	5	2019-04-03 21:18:09.426+02	E-Mail: info@nosotras-aargau.ch
266	2	5	2019-04-03 21:18:09.427+02	Website: www.nosotras-aargau.ch
267	2	5	2019-04-03 21:18:09.428+02	Kontaktperson: Frau Vogt Ligia, +41793350661
268	2	5	2019-04-03 21:18:09.43+02	Waren sie mit dem Bot zufrieden? Ich würde mich sehr auf Ihr Fedback freuen.
269	2	5	2019-04-03 21:22:23.827+02	Guten Tag! Wie kann ich Ihenen helfen?
270	1	5	2019-04-03 21:24:35.713+02	Deutschkurs suchen
271	2	5	2019-04-03 21:24:35.713+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
272	2	5	2019-04-03 21:24:35.719+02	Was für eine Kursintensität suchen Sie?
273	1	5	2019-04-03 21:24:40.125+02	Wochenkurs
274	2	5	2019-04-03 21:24:40.126+02	Für welches Adressatengruppe soll der Kurs sein?
275	1	5	2019-04-03 21:24:41.515+02	Frauen
276	2	5	2019-04-03 21:24:41.516+02	Wo soll der Deutschkurs stattfinden?
277	1	5	2019-04-03 21:24:43.837+02	Deutschkurs in Baden
278	2	5	2019-04-03 21:24:43.838+02	Was für einen Zweck soll der Kurs erfüllen?
279	1	5	2019-04-03 21:24:44.812+02	Konversation
280	2	5	2019-04-03 21:24:44.813+02	Für welches Sprachniveau suchen Sie den Kurs?
281	2	5	2019-04-03 21:24:45.842+02	Sie Suchen somit einen Wochenkurs für Frauen in Baden. Der Kurs Zweck ist Konversation und entspricht dem Niveau Anfänger.
282	1	5	2019-04-03 21:24:45.84+02	Anfänger
283	2	5	2019-04-03 21:24:45.846+02	Stimmen diese Angaben für Sie?
284	1	5	2019-04-03 21:24:46.943+02	Ja
285	2	5	2019-04-03 21:24:46.95+02	Möchten sie mir noch eine oder mehrere der folgenden Zusatzinformationen geben?
286	1	5	2019-04-03 21:24:47.702+02	Keine weiteren Angaben
287	2	5	2019-04-03 21:24:47.818+02	Ich habe folgende Kurse gefunden
288	2	5	2019-04-03 21:24:47.819+02	Der Kurs wird am Montag 08.04.2019 durchgeführt.
289	2	5	2019-04-03 21:24:47.82+02	Möchten sie weitere Informationen zu einem dieser Kurse?
290	2	5	2019-04-03 21:24:47.821+02	Der Kurs Startet um 09:00:00 Uhr und endet um 11:00:00 Uhr.
291	1	5	2019-04-03 21:24:48.786+02	Ja, weitere Informationen anzeigen
292	2	5	2019-04-03 21:24:48.886+02	Ich habe folgende Kurse gefunden
293	2	5	2019-04-03 21:24:48.887+02	Der Kurs wird am Montag 08.04.2019 durchgeführt.
294	2	5	2019-04-03 21:24:48.89+02	Kurs Beschreibung: Lockere Konversation
295	2	5	2019-04-03 21:24:48.891+02	Kurs Zweck: Konversation
296	2	5	2019-04-03 21:24:48.892+02	Der Kurs Startet um 09:00:00 Uhr und endet um 11:00:00 Uhr.
297	2	5	2019-04-03 21:24:48.893+02	Kurs Anbieter: Nosotras Aargau
298	2	5	2019-04-03 21:24:48.895+02	E-Mail: info@nosotras-aargau.ch
299	2	5	2019-04-03 21:24:48.896+02	Website: www.nosotras-aargau.ch
300	2	5	2019-04-03 21:24:48.897+02	Waren sie mit dem Bot zufrieden? Ich würde mich sehr auf Ihr Fedback freuen.
301	2	5	2019-04-03 21:24:48.898+02	Kontaktperson: Frau Vogt Ligia, +41793350661
302	1	5	2019-04-03 21:24:49.734+02	Sehr zufrieden
303	2	5	2019-04-03 21:26:21.655+02	Guten Tag! Wie kann ich Ihenen helfen?
304	1	5	2019-04-03 21:26:23.212+02	Deutschkurs suchen
305	2	5	2019-04-03 21:26:23.213+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
306	2	5	2019-04-03 21:26:23.219+02	Was für eine Kursintensität suchen Sie?
307	1	5	2019-04-03 21:26:24.45+02	Wochenkurs
308	2	5	2019-04-03 21:26:24.45+02	Für welches Adressatengruppe soll der Kurs sein?
309	1	5	2019-04-03 21:26:25.156+02	Frauen
310	2	5	2019-04-03 21:26:25.157+02	Wo soll der Deutschkurs stattfinden?
311	1	5	2019-04-03 21:26:26.223+02	Deutschkurs in Baden
312	2	5	2019-04-03 21:26:26.224+02	Was für einen Zweck soll der Kurs erfüllen?
313	1	5	2019-04-03 21:26:27.117+02	Konversation
314	2	5	2019-04-03 21:26:27.117+02	Für welches Sprachniveau suchen Sie den Kurs?
315	1	5	2019-04-03 21:26:27.99+02	Anfänger
316	2	5	2019-04-03 21:26:27.991+02	Sie Suchen somit einen Wochenkurs für Frauen in Baden. Der Kurs Zweck ist Konversation und entspricht dem Niveau Anfänger.
317	2	5	2019-04-03 21:26:27.999+02	Stimmen diese Angaben für Sie?
318	1	5	2019-04-03 21:26:29.312+02	Ja
319	2	5	2019-04-03 21:26:29.317+02	Möchten sie mir noch eine oder mehrere der folgenden Zusatzinformationen geben?
320	1	5	2019-04-03 21:26:30.054+02	Keine weiteren Angaben
321	2	5	2019-04-03 21:26:30.181+02	Der Kurs wird am Montag 08.04.2019 durchgeführt.
322	2	5	2019-04-03 21:26:30.182+02	Ich habe folgende Kurse gefunden
323	2	5	2019-04-03 21:26:30.185+02	Der Kurs Startet um 09:00:00 Uhr und endet um 11:00:00 Uhr.
324	2	5	2019-04-03 21:26:30.185+02	Möchten sie weitere Informationen zu einem dieser Kurse?
325	1	5	2019-04-03 21:26:31.296+02	Ja, weitere Informationen anzeigen
326	2	5	2019-04-03 21:26:31.394+02	Ich habe folgende Kurse gefunden
327	2	5	2019-04-03 21:26:31.395+02	Kurs Beschreibung: Lockere Konversation
328	2	5	2019-04-03 21:26:31.395+02	Der Kurs wird am Montag 08.04.2019 durchgeführt.
329	2	5	2019-04-03 21:26:31.396+02	Kurs Zweck: Konversation
330	2	5	2019-04-03 21:26:31.397+02	Der Kurs Startet um 09:00:00 Uhr und endet um 11:00:00 Uhr.
331	2	5	2019-04-03 21:26:31.4+02	Kurs Anbieter: Nosotras Aargau
332	2	5	2019-04-03 21:26:31.401+02	E-Mail: info@nosotras-aargau.ch
333	2	5	2019-04-03 21:26:31.401+02	Website: www.nosotras-aargau.ch
334	2	5	2019-04-03 21:26:31.404+02	Kontaktperson: Frau Vogt Ligia, +41793350661
335	2	5	2019-04-03 21:26:31.405+02	Waren sie mit dem Bot zufrieden? Ich würde mich sehr auf Ihr Fedback freuen.
336	2	5	2019-04-03 21:28:29.042+02	Guten Tag! Wie kann ich Ihenen helfen?
337	1	5	2019-04-03 21:28:30.167+02	Deutschkurs suchen
338	2	5	2019-04-03 21:28:30.168+02	Super, gerne helfe ich Ihnen ein Deutschkurs zu suchen. Dafür benötige ich noch folgende Angaben: Ort, Tag, Uhrzeit und Kursniveau.
339	2	5	2019-04-03 21:28:30.174+02	Was für eine Kursintensität suchen Sie?
340	1	5	2019-04-03 21:28:31.354+02	Wochenkurs
341	2	5	2019-04-03 21:28:31.355+02	Für welches Adressatengruppe soll der Kurs sein?
342	1	5	2019-04-03 21:28:32.084+02	Frauen
343	2	5	2019-04-03 21:28:32.085+02	Wo soll der Deutschkurs stattfinden?
344	1	5	2019-04-03 21:28:33.166+02	Deutschkurs in Baden
345	2	5	2019-04-03 21:28:33.17+02	Was für einen Zweck soll der Kurs erfüllen?
346	1	5	2019-04-03 21:28:34.25+02	Konversation
347	2	5	2019-04-03 21:28:34.252+02	Für welches Sprachniveau suchen Sie den Kurs?
348	1	5	2019-04-03 21:28:35.205+02	Anfänger
349	2	5	2019-04-03 21:28:35.206+02	Sie Suchen somit einen Wochenkurs für Frauen in Baden. Der Kurs Zweck ist Konversation und entspricht dem Niveau Anfänger.
350	2	5	2019-04-03 21:28:35.213+02	Stimmen diese Angaben für Sie?
351	1	5	2019-04-03 21:28:36.419+02	Ja
352	2	5	2019-04-03 21:28:36.42+02	Möchten sie mir noch eine oder mehrere der folgenden Zusatzinformationen geben?
353	1	5	2019-04-03 21:28:37.07+02	Keine weiteren Angaben
354	2	5	2019-04-03 21:28:37.191+02	Ich habe folgende Kurse gefunden
355	2	5	2019-04-03 21:28:37.191+02	Der Kurs wird am Montag 08.04.2019 durchgeführt.
356	2	5	2019-04-03 21:28:37.193+02	Der Kurs Startet um 09:00:00 Uhr und endet um 11:00:00 Uhr.
357	2	5	2019-04-03 21:28:37.193+02	Möchten sie weitere Informationen zu einem dieser Kurse?
358	1	5	2019-04-03 21:28:38.119+02	Ja, weitere Informationen anzeigen
359	2	5	2019-04-03 21:28:38.225+02	Ich habe folgende Kurse gefunden
360	2	5	2019-04-03 21:28:38.225+02	Der Kurs wird am Montag 08.04.2019 durchgeführt.
361	2	5	2019-04-03 21:28:38.226+02	Kurs Beschreibung: Lockere Konversation
362	2	5	2019-04-03 21:28:38.231+02	Kurs Zweck: Konversation
363	2	5	2019-04-03 21:28:38.233+02	Kurs Anbieter: Nosotras Aargau
364	2	5	2019-04-03 21:28:38.234+02	Der Kurs Startet um 09:00:00 Uhr und endet um 11:00:00 Uhr.
365	2	5	2019-04-03 21:28:38.235+02	E-Mail: info@nosotras-aargau.ch
366	2	5	2019-04-03 21:28:38.237+02	Website: www.nosotras-aargau.ch
367	2	5	2019-04-03 21:28:38.238+02	Kontaktperson: Frau Vogt Ligia, +41793350661
368	2	5	2019-04-03 21:28:38.238+02	Waren sie mit dem Bot zufrieden? Ich würde mich sehr auf Ihr Fedback freuen.
369	1	5	2019-04-03 21:28:38.991+02	Sehr zufrieden
370	2	5	2019-04-03 21:28:38.992+02	Das freut mich, dass Sie sehr zufrieden sind.
371	2	5	2019-04-03 21:28:38.999+02	Kann ich Ihnen weiterhin behilflich sein?
372	2	5	2019-04-03 21:28:40.908+02	Auf wiedersehen
373	1	5	2019-04-03 21:28:40.905+02	Nein
\.


--
-- Data for Name: bot_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bot_log (id, level, erfasst_am, eintrag) FROM stdin;
1	2	2019-04-02 21:52:08.492+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
2	2	2019-04-02 21:52:08.787+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with a35a46c4-e7a4-cf5b-4a37-1625c47ba45f
3	2	2019-04-02 21:52:08.793+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with a35a46c4-e7a4-cf5b-4a37-1625c47ba45f
4	2	2019-04-02 21:52:58.777+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
5	2	2019-04-02 21:53:01.148+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with a35a46c4-e7a4-cf5b-4a37-1625c47ba45f
6	2	2019-04-02 21:53:01.157+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with a35a46c4-e7a4-cf5b-4a37-1625c47ba45f
7	2	2019-04-02 21:53:54.6+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
8	2	2019-04-02 21:53:54.795+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with a35a46c4-e7a4-cf5b-4a37-1625c47ba45f
9	2	2019-04-02 21:53:54.804+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with a35a46c4-e7a4-cf5b-4a37-1625c47ba45f
10	2	2019-04-02 21:53:58.332+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with a35a46c4-e7a4-cf5b-4a37-1625c47ba45f
11	2	2019-04-02 21:53:58.339+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
12	2	2019-04-02 21:53:58.342+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
13	2	2019-04-02 21:53:58.345+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
14	2	2019-04-02 21:53:58.379+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Entity found for Type kursSprache
15	2	2019-04-02 21:53:58.38+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
16	2	2019-04-02 21:53:58.381+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Ret Val: Deutsch,deutsch
17	2	2019-04-02 21:55:58.403+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with a35a46c4-e7a4-cf5b-4a37-1625c47ba45f
18	2	2019-04-03 19:48:32.291+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
19	2	2019-04-03 19:48:37.394+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
20	2	2019-04-03 19:48:37.405+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
21	2	2019-04-03 19:48:39.346+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
22	2	2019-04-03 19:48:39.347+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
23	2	2019-04-03 19:48:39.348+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
24	2	2019-04-03 19:48:39.349+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
25	2	2019-04-03 19:48:39.375+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:50:38) - Entity found for Type kursSprache
26	2	2019-04-03 19:48:39.376+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:50:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
27	2	2019-04-03 19:48:39.377+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:50:38) - Ret Val: Deutsch,deutsch
28	2	2019-04-03 19:48:41.563+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Entity found for Type kursOrt
29	2	2019-04-03 19:48:41.568+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - {entity:baden,type:kursOrt,startIndex:15,endIndex:19,resolution:{values:[Baden]}}
30	2	2019-04-03 19:48:41.573+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Ret Val: Baden,baden
31	2	2019-04-03 19:48:44.763+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Entity found for Type kursAdressatengruppe
32	2	2019-04-03 19:48:44.767+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - {entity:frauen,type:kursAdressatengruppe,startIndex:0,endIndex:5,resolution:{values:[Frauen]}}
33	2	2019-04-03 19:48:44.775+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Ret Val: Frauen,frauen
34	2	2019-04-03 19:50:44.805+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
35	2	2019-04-03 19:56:01.406+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
36	2	2019-04-03 19:56:01.726+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
37	2	2019-04-03 19:56:01.733+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
38	2	2019-04-03 19:56:02.928+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
39	2	2019-04-03 19:56:02.942+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
40	2	2019-04-03 19:56:02.952+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
41	2	2019-04-03 19:56:02.953+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
42	2	2019-04-03 19:56:02.984+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:50:38) - Entity found for Type kursSprache
43	2	2019-04-03 19:56:02.986+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:50:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
44	2	2019-04-03 19:56:02.988+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:50:38) - Ret Val: Deutsch,deutsch
45	2	2019-04-03 19:56:04.243+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Entity found for Type kursOrt
46	2	2019-04-03 19:56:04.249+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - {entity:baden,type:kursOrt,startIndex:15,endIndex:19,resolution:{values:[Baden]}}
47	2	2019-04-03 19:56:04.253+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Ret Val: Baden,baden
48	2	2019-04-03 19:56:05.302+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Entity found for Type kursAdressatengruppe
49	2	2019-04-03 19:56:05.313+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - {entity:frauen,type:kursAdressatengruppe,startIndex:0,endIndex:5,resolution:{values:[Frauen]}}
50	2	2019-04-03 19:56:05.319+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Ret Val: Frauen,frauen
51	2	2019-04-03 19:59:42.784+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
52	2	2019-04-03 19:59:44.577+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
53	2	2019-04-03 19:59:44.584+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
54	2	2019-04-03 19:59:45.993+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
55	2	2019-04-03 19:59:45.995+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
56	2	2019-04-03 19:59:45.996+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
57	2	2019-04-03 19:59:46.023+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:50:38) - Entity found for Type kursSprache
58	2	2019-04-03 19:59:45.997+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
59	2	2019-04-03 19:59:46.025+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:50:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
60	2	2019-04-03 19:59:46.026+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:50:38) - Ret Val: Deutsch,deutsch
61	2	2019-04-03 19:59:52.709+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Entity found for Type kursOrt
62	2	2019-04-03 19:59:52.716+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - {entity:lenzburg,type:kursOrt,startIndex:0,endIndex:7,resolution:{values:[Lenzburg]}}
63	2	2019-04-03 19:59:52.721+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Ret Val: Lenzburg,lenzburg
64	2	2019-04-03 19:59:56.764+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Entity found for Type kursAdressatengruppe
65	2	2019-04-03 19:59:56.77+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - {entity:frauen,type:kursAdressatengruppe,startIndex:0,endIndex:5,resolution:{values:[Frauen]}}
66	2	2019-04-03 19:59:56.776+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Ret Val: Frauen,frauen
67	2	2019-04-03 20:01:04.97+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
68	2	2019-04-03 20:01:05.426+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
69	2	2019-04-03 20:01:05.434+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
70	2	2019-04-03 20:01:06.458+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
71	2	2019-04-03 20:01:06.46+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
72	2	2019-04-03 20:01:06.463+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
73	2	2019-04-03 20:01:06.464+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
74	2	2019-04-03 20:01:06.485+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:50:38) - Entity found for Type kursSprache
75	2	2019-04-03 20:01:06.487+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:50:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
76	2	2019-04-03 20:01:06.488+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:50:38) - Ret Val: Deutsch,deutsch
77	2	2019-04-03 20:01:08.251+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Entity found for Type kursOrt
78	2	2019-04-03 20:01:08.259+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - {entity:baden,type:kursOrt,startIndex:15,endIndex:19,resolution:{values:[Baden]}}
79	2	2019-04-03 20:01:08.267+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Ret Val: Baden,baden
80	2	2019-04-03 20:01:09.29+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Entity found for Type kursAdressatengruppe
81	2	2019-04-03 20:01:09.298+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - {entity:frauen,type:kursAdressatengruppe,startIndex:0,endIndex:5,resolution:{values:[Frauen]}}
82	2	2019-04-03 20:01:09.325+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Ret Val: Frauen,frauen
83	2	2019-04-03 20:55:19.966+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
84	2	2019-04-03 20:55:28.872+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
85	2	2019-04-03 20:55:28.882+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
86	2	2019-04-03 20:55:33.114+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
87	2	2019-04-03 20:55:33.12+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
88	2	2019-04-03 20:55:33.123+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
89	2	2019-04-03 20:55:33.127+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
90	2	2019-04-03 20:55:33.183+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Entity found for Type kursSprache
91	2	2019-04-03 20:55:33.184+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
92	2	2019-04-03 20:55:33.186+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Ret Val: Deutsch,deutsch
93	2	2019-04-03 20:55:35.592+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Entity found for Type kursIntensitaet
94	2	2019-04-03 20:55:35.593+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - {entity:wochen kurs,type:kursIntensitaet,startIndex:0,endIndex:9,resolution:{values:[0]}}
95	2	2019-04-03 20:55:35.594+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Ret Val: 0,wochen kurs
96	2	2019-04-03 20:57:35.611+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
97	2	2019-04-03 21:05:09.583+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
98	2	2019-04-03 21:05:10.107+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
99	2	2019-04-03 21:05:10.116+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
100	2	2019-04-03 21:05:11.605+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
101	2	2019-04-03 21:05:11.61+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
102	2	2019-04-03 21:05:11.611+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
103	2	2019-04-03 21:05:11.648+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Entity found for Type kursSprache
104	2	2019-04-03 21:05:11.613+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
105	2	2019-04-03 21:05:11.649+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
106	2	2019-04-03 21:05:11.651+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Ret Val: Deutsch,deutsch
107	2	2019-04-03 21:05:13.448+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Entity found for Type kursIntensitaet
108	2	2019-04-03 21:05:13.45+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - {entity:wochen kurs,type:kursIntensitaet,startIndex:0,endIndex:9,resolution:{values:[Wochenkurs]}}
109	2	2019-04-03 21:05:13.453+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Ret Val: Wochenkurs,wochen kurs
110	2	2019-04-03 21:06:53.905+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
111	2	2019-04-03 21:06:54.573+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
112	2	2019-04-03 21:06:54.603+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
113	2	2019-04-03 21:06:55.682+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
114	2	2019-04-03 21:06:55.688+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
115	2	2019-04-03 21:06:55.694+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
116	2	2019-04-03 21:06:55.697+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
117	2	2019-04-03 21:06:55.736+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Entity found for Type kursSprache
118	2	2019-04-03 21:06:55.738+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
119	2	2019-04-03 21:06:55.739+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Ret Val: Deutsch,deutsch
120	2	2019-04-03 21:06:56.714+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Entity found for Type kursIntensitaet
121	2	2019-04-03 21:06:56.716+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - {entity:wochen kurs,type:kursIntensitaet,startIndex:0,endIndex:9,resolution:{values:[Wochenkurs]}}
122	2	2019-04-03 21:06:56.719+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Ret Val: Wochenkurs,wochen kurs
123	2	2019-04-03 21:06:57.816+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - {entity:frauen,type:kursAdressatengruppe,startIndex:0,endIndex:5,resolution:{values:[Frauen]}}
124	2	2019-04-03 21:06:57.815+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Entity found for Type kursAdressatengruppe
125	2	2019-04-03 21:06:57.817+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Ret Val: Frauen,frauen
126	2	2019-04-03 21:07:00.509+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Entity found for Type kursOrt
166	2	2019-04-03 21:09:21.1+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
127	2	2019-04-03 21:07:00.511+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - {entity:baden,type:kursOrt,startIndex:15,endIndex:19,resolution:{values:[Baden]}}
128	2	2019-04-03 21:07:00.512+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Ret Val: Baden,baden
129	2	2019-04-03 21:07:10.288+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - {entity:deutsch lesen und schreiben,type:kursZweck,startIndex:0,endIndex:26,resolution:{values:[Deutsch Lesen und Schreiben]}}
130	2	2019-04-03 21:07:10.296+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Ret Val: Deutsch Lesen und Schreiben,deutsch lesen und schreiben
131	2	2019-04-03 21:07:10.284+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Entity found for Type kursZweck
133	2	2019-04-03 21:07:14.469+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - {entity:anfänger,type:kursNiveau,startIndex:0,endIndex:7,resolution:{values:[Anfänger]}}
132	2	2019-04-03 21:07:14.467+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Entity found for Type kursNiveau
134	2	2019-04-03 21:07:14.471+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Ret Val: Anfänger,anfänger
135	2	2019-04-03 21:07:14.475+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
136	2	2019-04-03 21:08:07.3+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
137	2	2019-04-03 21:08:07.89+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
138	2	2019-04-03 21:08:07.93+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
139	2	2019-04-03 21:08:09.399+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
140	2	2019-04-03 21:08:09.397+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
141	2	2019-04-03 21:08:09.4+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
142	2	2019-04-03 21:08:09.402+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
143	2	2019-04-03 21:08:09.423+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Entity found for Type kursSprache
145	2	2019-04-03 21:08:09.425+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Ret Val: Deutsch,deutsch
144	2	2019-04-03 21:08:09.424+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
146	2	2019-04-03 21:08:10.932+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Entity found for Type kursIntensitaet
147	2	2019-04-03 21:08:10.936+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - {entity:wochen kurs,type:kursIntensitaet,startIndex:0,endIndex:9,resolution:{values:[Wochenkurs]}}
148	2	2019-04-03 21:08:10.939+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Ret Val: Wochenkurs,wochen kurs
149	2	2019-04-03 21:08:12.397+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Entity found for Type kursAdressatengruppe
150	2	2019-04-03 21:08:12.402+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - {entity:frauen,type:kursAdressatengruppe,startIndex:0,endIndex:5,resolution:{values:[Frauen]}}
151	2	2019-04-03 21:08:12.405+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Ret Val: Frauen,frauen
152	2	2019-04-03 21:08:13.505+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Entity found for Type kursOrt
153	2	2019-04-03 21:08:13.509+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - {entity:baden,type:kursOrt,startIndex:15,endIndex:19,resolution:{values:[Baden]}}
154	2	2019-04-03 21:08:13.513+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Ret Val: Baden,baden
155	2	2019-04-03 21:08:14.515+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Entity found for Type kursZweck
156	2	2019-04-03 21:08:14.518+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - {entity:konversation,type:kursZweck,startIndex:0,endIndex:11,resolution:{values:[Konversation]}}
157	2	2019-04-03 21:08:14.528+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Ret Val: Konversation,konversation
158	2	2019-04-03 21:08:15.441+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Entity found for Type kursNiveau
159	2	2019-04-03 21:08:15.445+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - {entity:anfänger,type:kursNiveau,startIndex:0,endIndex:7,resolution:{values:[Anfänger]}}
160	2	2019-04-03 21:08:15.447+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Ret Val: Anfänger,anfänger
161	2	2019-04-03 21:09:19.076+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
162	2	2019-04-03 21:09:19.662+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
163	2	2019-04-03 21:09:19.669+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
164	2	2019-04-03 21:09:21.096+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
165	2	2019-04-03 21:09:21.092+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
167	2	2019-04-03 21:09:21.153+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Entity found for Type kursSprache
168	2	2019-04-03 21:09:21.102+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
169	2	2019-04-03 21:09:21.158+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
170	2	2019-04-03 21:09:21.159+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Ret Val: Deutsch,deutsch
171	2	2019-04-03 21:09:22.181+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Entity found for Type kursIntensitaet
172	2	2019-04-03 21:09:22.183+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - {entity:wochen kurs,type:kursIntensitaet,startIndex:0,endIndex:9,resolution:{values:[Wochenkurs]}}
173	2	2019-04-03 21:09:22.184+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Ret Val: Wochenkurs,wochen kurs
174	2	2019-04-03 21:09:23.175+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Entity found for Type kursAdressatengruppe
175	2	2019-04-03 21:09:23.176+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - {entity:frauen,type:kursAdressatengruppe,startIndex:0,endIndex:5,resolution:{values:[Frauen]}}
176	2	2019-04-03 21:09:23.177+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Ret Val: Frauen,frauen
177	2	2019-04-03 21:09:24.243+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Entity found for Type kursOrt
178	2	2019-04-03 21:09:24.247+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - {entity:baden,type:kursOrt,startIndex:15,endIndex:19,resolution:{values:[Baden]}}
179	2	2019-04-03 21:09:24.253+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Ret Val: Baden,baden
180	2	2019-04-03 21:09:25.23+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Entity found for Type kursZweck
181	2	2019-04-03 21:09:25.233+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - {entity:konversation,type:kursZweck,startIndex:0,endIndex:11,resolution:{values:[Konversation]}}
182	2	2019-04-03 21:09:25.255+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Ret Val: Konversation,konversation
183	2	2019-04-03 21:09:26.508+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Entity found for Type kursNiveau
184	2	2019-04-03 21:09:26.511+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - {entity:anfänger,type:kursNiveau,startIndex:0,endIndex:7,resolution:{values:[Anfänger]}}
185	2	2019-04-03 21:09:26.513+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Ret Val: Anfänger,anfänger
186	2	2019-04-03 21:12:35.761+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
187	2	2019-04-03 21:12:38.087+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
188	2	2019-04-03 21:12:38.099+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
189	2	2019-04-03 21:12:39.524+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
190	2	2019-04-03 21:12:39.528+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
191	2	2019-04-03 21:12:39.534+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
192	2	2019-04-03 21:12:39.539+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
193	2	2019-04-03 21:12:39.579+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Entity found for Type kursSprache
194	2	2019-04-03 21:12:39.58+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
195	2	2019-04-03 21:12:39.583+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Ret Val: Deutsch,deutsch
196	2	2019-04-03 21:12:40.678+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Entity found for Type kursIntensitaet
197	2	2019-04-03 21:12:40.682+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - {entity:wochen kurs,type:kursIntensitaet,startIndex:0,endIndex:9,resolution:{values:[Wochenkurs]}}
198	2	2019-04-03 21:12:40.687+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Ret Val: Wochenkurs,wochen kurs
199	2	2019-04-03 21:12:41.837+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Entity found for Type kursAdressatengruppe
200	2	2019-04-03 21:12:41.844+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - {entity:frauen,type:kursAdressatengruppe,startIndex:0,endIndex:5,resolution:{values:[Frauen]}}
201	2	2019-04-03 21:12:41.846+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Ret Val: Frauen,frauen
202	2	2019-04-03 21:12:42.752+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - {entity:aarau,type:kursOrt,startIndex:15,endIndex:19,resolution:{values:[Aarau]}}
203	2	2019-04-03 21:12:42.745+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Entity found for Type kursOrt
204	2	2019-04-03 21:12:42.759+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Ret Val: Aarau,aarau
205	2	2019-04-03 21:12:43.861+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - {entity:konversation,type:kursZweck,startIndex:0,endIndex:11,resolution:{values:[Konversation]}}
206	2	2019-04-03 21:12:43.852+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Entity found for Type kursZweck
207	2	2019-04-03 21:12:43.867+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Ret Val: Konversation,konversation
208	2	2019-04-03 21:12:44.988+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Entity found for Type kursNiveau
209	2	2019-04-03 21:12:45.007+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Ret Val: Anfänger,anfänger
210	2	2019-04-03 21:12:45+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - {entity:anfänger,type:kursNiveau,startIndex:0,endIndex:7,resolution:{values:[Anfänger]}}
211	2	2019-04-03 21:14:09.469+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
212	2	2019-04-03 21:14:09.957+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
213	2	2019-04-03 21:14:09.965+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
214	2	2019-04-03 21:14:11.126+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
215	2	2019-04-03 21:14:11.133+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
216	2	2019-04-03 21:14:11.134+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
217	2	2019-04-03 21:14:11.163+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Entity found for Type kursSprache
218	2	2019-04-03 21:14:11.164+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
219	2	2019-04-03 21:14:11.168+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Ret Val: Deutsch,deutsch
220	2	2019-04-03 21:14:11.129+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
221	2	2019-04-03 21:14:14.208+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Ret Val: Wochenkurs,wochen kurs
222	2	2019-04-03 21:14:14.207+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - {entity:wochen kurs,type:kursIntensitaet,startIndex:0,endIndex:9,resolution:{values:[Wochenkurs]}}
223	2	2019-04-03 21:14:14.206+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Entity found for Type kursIntensitaet
224	2	2019-04-03 21:14:15.363+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Entity found for Type kursAdressatengruppe
225	2	2019-04-03 21:14:15.365+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - {entity:frauen,type:kursAdressatengruppe,startIndex:0,endIndex:5,resolution:{values:[Frauen]}}
226	2	2019-04-03 21:14:15.366+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Ret Val: Frauen,frauen
227	2	2019-04-03 21:14:17.188+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Entity found for Type kursOrt
228	2	2019-04-03 21:14:17.192+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - {entity:baden,type:kursOrt,startIndex:15,endIndex:19,resolution:{values:[Baden]}}
229	2	2019-04-03 21:14:17.2+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Ret Val: Baden,baden
230	2	2019-04-03 21:14:18.249+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Entity found for Type kursZweck
231	2	2019-04-03 21:14:18.251+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - {entity:konversation,type:kursZweck,startIndex:0,endIndex:11,resolution:{values:[Konversation]}}
232	2	2019-04-03 21:14:18.252+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Ret Val: Konversation,konversation
233	2	2019-04-03 21:14:19.252+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Entity found for Type kursNiveau
234	2	2019-04-03 21:14:19.259+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - {entity:anfänger,type:kursNiveau,startIndex:0,endIndex:7,resolution:{values:[Anfänger]}}
235	2	2019-04-03 21:14:19.262+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Ret Val: Anfänger,anfänger
236	2	2019-04-03 21:14:26.459+02	Query.handleReadyForQuery (C:Workspacechatbotschatbot_hallo_aargaunode_modulespglibquery.js:125:10) - Gefundene Kurse DB Response:
237	2	2019-04-03 21:14:26.462+02	Query.handleReadyForQuery (C:Workspacechatbotschatbot_hallo_aargaunode_modulespglibquery.js:125:10) - [{id:1,kurs_beschreibung:Lockere Konversation,niveau:Anfänger,sprachnachweis:nein,anbieter_offizieller_name:Nosotras Aargau,anbieter_strasse:null,anbieter_ort:null,anbieter_plz:null,anbieter_mail:info@nosotras-aargau.ch,anbieter_telefon:null,anbieter_url:www.nosotras-aargau.ch,konversation:Lockere Konversation,intensitaet:Wochenkurs,zweck:Konversation,reihenfolge:2,tag:2019-04-07T22:00:00.000Z,tag_name:Monday,tag_nummer:1,start_zeit:09:00:00,end_zeit:11:00:00,ort:Baden,ort_strasse:Zürcherstrasse 1,ort_plz:5400,ort_raum:Nosotras Aargau,adressatengruppe:Frauen,kontaktperson_anrede:Frau,kontaktperson_name:Vogt,kontaktperson_vorname:Ligia,kontaktperson_telefon:+41793350661}]
238	2	2019-04-03 21:15:49.045+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
239	2	2019-04-03 21:15:54.275+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
240	2	2019-04-03 21:15:54.285+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
241	2	2019-04-03 21:15:57.05+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
242	2	2019-04-03 21:15:57.053+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
243	2	2019-04-03 21:15:57.054+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
244	2	2019-04-03 21:15:57.056+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
245	2	2019-04-03 21:15:57.082+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Entity found for Type kursSprache
246	2	2019-04-03 21:15:57.084+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
247	2	2019-04-03 21:15:57.085+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Ret Val: Deutsch,deutsch
248	2	2019-04-03 21:15:58.955+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Entity found for Type kursIntensitaet
249	2	2019-04-03 21:15:58.957+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - {entity:wochen kurs,type:kursIntensitaet,startIndex:0,endIndex:9,resolution:{values:[Wochenkurs]}}
250	2	2019-04-03 21:15:58.963+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Ret Val: Wochenkurs,wochen kurs
251	2	2019-04-03 21:15:59.938+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Entity found for Type kursAdressatengruppe
252	2	2019-04-03 21:15:59.941+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - {entity:frauen,type:kursAdressatengruppe,startIndex:0,endIndex:5,resolution:{values:[Frauen]}}
253	2	2019-04-03 21:15:59.948+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Ret Val: Frauen,frauen
254	2	2019-04-03 21:16:01.02+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Entity found for Type kursOrt
255	2	2019-04-03 21:16:01.023+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - {entity:baden,type:kursOrt,startIndex:15,endIndex:19,resolution:{values:[Baden]}}
256	2	2019-04-03 21:16:01.028+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Ret Val: Baden,baden
257	2	2019-04-03 21:16:02.019+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - {entity:konversation,type:kursZweck,startIndex:0,endIndex:11,resolution:{values:[Konversation]}}
258	2	2019-04-03 21:16:02.01+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Entity found for Type kursZweck
259	2	2019-04-03 21:16:02.025+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Ret Val: Konversation,konversation
260	2	2019-04-03 21:16:03.03+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Entity found for Type kursNiveau
261	2	2019-04-03 21:16:03.032+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - {entity:anfänger,type:kursNiveau,startIndex:0,endIndex:7,resolution:{values:[Anfänger]}}
262	2	2019-04-03 21:16:03.033+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Ret Val: Anfänger,anfänger
263	2	2019-04-03 21:16:07.51+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:81:46) - Entity found for Type kursOrt
264	2	2019-04-03 21:16:07.515+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:81:46) - {entity:baden,type:kursOrt,startIndex:15,endIndex:19,resolution:{values:[Baden]}}
265	2	2019-04-03 21:16:07.518+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:81:46) - Ret Val: Baden,baden
266	2	2019-04-03 21:16:09.981+02	Query.handleReadyForQuery (C:Workspacechatbotschatbot_hallo_aargaunode_modulespglibquery.js:125:10) - Gefundene Kurse DB Response:
267	2	2019-04-03 21:16:09.983+02	Query.handleReadyForQuery (C:Workspacechatbotschatbot_hallo_aargaunode_modulespglibquery.js:125:10) - [{id:1,kurs_beschreibung:Lockere Konversation,niveau:Anfänger,sprachnachweis:nein,anbieter_offizieller_name:Nosotras Aargau,anbieter_strasse:null,anbieter_ort:null,anbieter_plz:null,anbieter_mail:info@nosotras-aargau.ch,anbieter_telefon:null,anbieter_url:www.nosotras-aargau.ch,konversation:Lockere Konversation,intensitaet:Wochenkurs,zweck:Konversation,reihenfolge:2,tag:2019-04-07T22:00:00.000Z,tag_name:Monday,tag_nummer:1,start_zeit:09:00:00,end_zeit:11:00:00,ort:Baden,ort_strasse:Zürcherstrasse 1,ort_plz:5400,ort_raum:Nosotras Aargau,adressatengruppe:Frauen,kontaktperson_anrede:Frau,kontaktperson_name:Vogt,kontaktperson_vorname:Ligia,kontaktperson_telefon:+41793350661}]
268	2	2019-04-03 21:17:24.09+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
269	2	2019-04-03 21:17:26.204+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
270	2	2019-04-03 21:17:26.211+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
271	2	2019-04-03 21:17:27.673+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
272	2	2019-04-03 21:17:27.676+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
273	2	2019-04-03 21:17:27.677+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
274	2	2019-04-03 21:17:27.714+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Entity found for Type kursSprache
275	2	2019-04-03 21:17:27.679+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
276	2	2019-04-03 21:17:27.716+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
277	2	2019-04-03 21:17:27.717+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Ret Val: Deutsch,deutsch
278	2	2019-04-03 21:17:28.648+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - {entity:wochen kurs,type:kursIntensitaet,startIndex:0,endIndex:9,resolution:{values:[Wochenkurs]}}
279	2	2019-04-03 21:17:28.653+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Ret Val: Wochenkurs,wochen kurs
280	2	2019-04-03 21:17:28.638+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Entity found for Type kursIntensitaet
281	2	2019-04-03 21:17:29.566+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Entity found for Type kursAdressatengruppe
282	2	2019-04-03 21:17:29.574+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - {entity:frauen,type:kursAdressatengruppe,startIndex:0,endIndex:5,resolution:{values:[Frauen]}}
283	2	2019-04-03 21:17:29.583+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Ret Val: Frauen,frauen
284	2	2019-04-03 21:17:30.847+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Entity found for Type kursOrt
285	2	2019-04-03 21:17:30.851+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - {entity:baden,type:kursOrt,startIndex:15,endIndex:19,resolution:{values:[Baden]}}
286	2	2019-04-03 21:17:30.857+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Ret Val: Baden,baden
287	2	2019-04-03 21:17:32.049+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Entity found for Type kursZweck
288	2	2019-04-03 21:17:32.053+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - {entity:konversation,type:kursZweck,startIndex:0,endIndex:11,resolution:{values:[Konversation]}}
289	2	2019-04-03 21:17:32.062+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Ret Val: Konversation,konversation
290	2	2019-04-03 21:17:32.817+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - {entity:anfänger,type:kursNiveau,startIndex:0,endIndex:7,resolution:{values:[Anfänger]}}
291	2	2019-04-03 21:17:32.815+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Entity found for Type kursNiveau
292	2	2019-04-03 21:17:32.819+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Ret Val: Anfänger,anfänger
293	2	2019-04-03 21:17:35.41+02	Query.handleReadyForQuery (C:Workspacechatbotschatbot_hallo_aargaunode_modulespglibquery.js:125:10) - [{id:1,kurs_beschreibung:Lockere Konversation,niveau:Anfänger,sprachnachweis:nein,anbieter_offizieller_name:Nosotras Aargau,anbieter_strasse:null,anbieter_ort:null,anbieter_plz:null,anbieter_mail:info@nosotras-aargau.ch,anbieter_telefon:null,anbieter_url:www.nosotras-aargau.ch,konversation:Lockere Konversation,intensitaet:Wochenkurs,zweck:Konversation,reihenfolge:2,tag:2019-04-07T22:00:00.000Z,tag_name:Monday,tag_nummer:1,start_zeit:09:00:00,end_zeit:11:00:00,ort:Baden,ort_strasse:Zürcherstrasse 1,ort_plz:5400,ort_raum:Nosotras Aargau,adressatengruppe:Frauen,kontaktperson_anrede:Frau,kontaktperson_name:Vogt,kontaktperson_vorname:Ligia,kontaktperson_telefon:+41793350661}]
294	2	2019-04-03 21:17:35.408+02	Query.handleReadyForQuery (C:Workspacechatbotschatbot_hallo_aargaunode_modulespglibquery.js:125:10) - Gefundene Kurse DB Response:
295	2	2019-04-03 21:17:55.523+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
296	2	2019-04-03 21:17:57.688+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
297	2	2019-04-03 21:17:57.699+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
298	2	2019-04-03 21:17:58.93+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
299	2	2019-04-03 21:17:58.936+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
300	2	2019-04-03 21:17:58.942+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
301	2	2019-04-03 21:17:58.944+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
302	2	2019-04-03 21:17:58.992+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Entity found for Type kursSprache
303	2	2019-04-03 21:17:58.995+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
304	2	2019-04-03 21:17:58.997+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Ret Val: Deutsch,deutsch
305	2	2019-04-03 21:18:00.575+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Entity found for Type kursIntensitaet
306	2	2019-04-03 21:18:00.58+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - {entity:wochen kurs,type:kursIntensitaet,startIndex:0,endIndex:9,resolution:{values:[Wochenkurs]}}
307	2	2019-04-03 21:18:00.586+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Ret Val: Wochenkurs,wochen kurs
308	2	2019-04-03 21:18:01.474+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Entity found for Type kursAdressatengruppe
309	2	2019-04-03 21:18:01.481+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - {entity:frauen,type:kursAdressatengruppe,startIndex:0,endIndex:5,resolution:{values:[Frauen]}}
310	2	2019-04-03 21:18:01.495+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Ret Val: Frauen,frauen
311	2	2019-04-03 21:18:02.486+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Entity found for Type kursOrt
312	2	2019-04-03 21:18:02.488+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - {entity:baden,type:kursOrt,startIndex:15,endIndex:19,resolution:{values:[Baden]}}
313	2	2019-04-03 21:18:02.489+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Ret Val: Baden,baden
314	2	2019-04-03 21:18:03.417+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Entity found for Type kursZweck
348	2	2019-04-03 21:24:47.811+02	Query.handleReadyForQuery (C:Workspacechatbotschatbot_hallo_aargaunode_modulespglibquery.js:125:10) - Gefundene Kurse DB Response:
315	2	2019-04-03 21:18:03.426+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - {entity:konversation,type:kursZweck,startIndex:0,endIndex:11,resolution:{values:[Konversation]}}
316	2	2019-04-03 21:18:03.432+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Ret Val: Konversation,konversation
318	2	2019-04-03 21:18:04.42+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - {entity:anfänger,type:kursNiveau,startIndex:0,endIndex:7,resolution:{values:[Anfänger]}}
317	2	2019-04-03 21:18:04.419+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Entity found for Type kursNiveau
319	2	2019-04-03 21:18:04.422+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Ret Val: Anfänger,anfänger
320	2	2019-04-03 21:18:07.712+02	Query.handleReadyForQuery (C:Workspacechatbotschatbot_hallo_aargaunode_modulespglibquery.js:125:10) - Gefundene Kurse DB Response:
321	2	2019-04-03 21:18:07.714+02	Query.handleReadyForQuery (C:Workspacechatbotschatbot_hallo_aargaunode_modulespglibquery.js:125:10) - [{id:1,kurs_beschreibung:Lockere Konversation,niveau:Anfänger,sprachnachweis:nein,anbieter_offizieller_name:Nosotras Aargau,anbieter_strasse:null,anbieter_ort:null,anbieter_plz:null,anbieter_mail:info@nosotras-aargau.ch,anbieter_telefon:null,anbieter_url:www.nosotras-aargau.ch,konversation:Lockere Konversation,intensitaet:Wochenkurs,zweck:Konversation,reihenfolge:2,tag:2019-04-07T22:00:00.000Z,tag_name:Monday,tag_nummer:1,start_zeit:09:00:00,end_zeit:11:00:00,ort:Baden,ort_strasse:Zürcherstrasse 1,ort_plz:5400,ort_raum:Nosotras Aargau,adressatengruppe:Frauen,kontaktperson_anrede:Frau,kontaktperson_name:Vogt,kontaktperson_vorname:Ligia,kontaktperson_telefon:+41793350661}]
322	2	2019-04-03 21:22:21.517+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
323	2	2019-04-03 21:22:23.722+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
324	2	2019-04-03 21:22:23.732+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
325	2	2019-04-03 21:24:35.649+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
326	2	2019-04-03 21:24:35.657+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
327	2	2019-04-03 21:24:35.66+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
328	2	2019-04-03 21:24:35.671+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
329	2	2019-04-03 21:24:35.698+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Entity found for Type kursSprache
330	2	2019-04-03 21:24:35.7+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
331	2	2019-04-03 21:24:35.701+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Ret Val: Deutsch,deutsch
332	2	2019-04-03 21:24:40.091+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Entity found for Type kursIntensitaet
333	2	2019-04-03 21:24:40.094+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - {entity:wochen kurs,type:kursIntensitaet,startIndex:0,endIndex:9,resolution:{values:[Wochenkurs]}}
334	2	2019-04-03 21:24:40.11+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Ret Val: Wochenkurs,wochen kurs
335	2	2019-04-03 21:24:41.49+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Entity found for Type kursAdressatengruppe
336	2	2019-04-03 21:24:41.498+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - {entity:frauen,type:kursAdressatengruppe,startIndex:0,endIndex:5,resolution:{values:[Frauen]}}
337	2	2019-04-03 21:24:41.504+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Ret Val: Frauen,frauen
338	2	2019-04-03 21:24:43.83+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - {entity:baden,type:kursOrt,startIndex:15,endIndex:19,resolution:{values:[Baden]}}
339	2	2019-04-03 21:24:43.827+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Entity found for Type kursOrt
340	2	2019-04-03 21:24:43.832+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Ret Val: Baden,baden
341	2	2019-04-03 21:24:44.802+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Entity found for Type kursZweck
342	2	2019-04-03 21:24:44.805+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - {entity:konversation,type:kursZweck,startIndex:0,endIndex:11,resolution:{values:[Konversation]}}
343	2	2019-04-03 21:24:44.808+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Ret Val: Konversation,konversation
344	2	2019-04-03 21:24:45.825+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Entity found for Type kursNiveau
345	2	2019-04-03 21:24:45.83+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - {entity:anfänger,type:kursNiveau,startIndex:0,endIndex:7,resolution:{values:[Anfänger]}}
346	2	2019-04-03 21:24:45.832+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Ret Val: Anfänger,anfänger
347	2	2019-04-03 21:24:47.812+02	Query.handleReadyForQuery (C:Workspacechatbotschatbot_hallo_aargaunode_modulespglibquery.js:125:10) - [{id:1,kurs_beschreibung:Lockere Konversation,niveau:Anfänger,sprachnachweis:nein,anbieter_offizieller_name:Nosotras Aargau,anbieter_strasse:null,anbieter_ort:null,anbieter_plz:null,anbieter_mail:info@nosotras-aargau.ch,anbieter_telefon:null,anbieter_url:www.nosotras-aargau.ch,konversation:Lockere Konversation,intensitaet:Wochenkurs,zweck:Konversation,reihenfolge:2,tag:2019-04-07T22:00:00.000Z,tag_name:Monday,tag_nummer:1,start_zeit:09:00:00,end_zeit:11:00:00,ort:Baden,ort_strasse:Zürcherstrasse 1,ort_plz:5400,ort_raum:Nosotras Aargau,adressatengruppe:Frauen,kontaktperson_anrede:Frau,kontaktperson_name:Vogt,kontaktperson_vorname:Ligia,kontaktperson_telefon:+41793350661}]
349	2	2019-04-03 21:26:17.65+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
350	2	2019-04-03 21:26:21.528+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
351	2	2019-04-03 21:26:21.536+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
352	2	2019-04-03 21:26:23.153+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
353	2	2019-04-03 21:26:23.158+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
354	2	2019-04-03 21:26:23.162+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
355	2	2019-04-03 21:26:23.164+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
356	2	2019-04-03 21:26:23.199+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Entity found for Type kursSprache
357	2	2019-04-03 21:26:23.2+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
358	2	2019-04-03 21:26:23.203+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Ret Val: Deutsch,deutsch
359	2	2019-04-03 21:26:24.44+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - {entity:wochen kurs,type:kursIntensitaet,startIndex:0,endIndex:9,resolution:{values:[Wochenkurs]}}
360	2	2019-04-03 21:26:24.428+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Entity found for Type kursIntensitaet
361	2	2019-04-03 21:26:24.446+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Ret Val: Wochenkurs,wochen kurs
362	2	2019-04-03 21:26:25.148+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Entity found for Type kursAdressatengruppe
363	2	2019-04-03 21:26:25.149+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - {entity:frauen,type:kursAdressatengruppe,startIndex:0,endIndex:5,resolution:{values:[Frauen]}}
364	2	2019-04-03 21:26:25.152+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Ret Val: Frauen,frauen
365	2	2019-04-03 21:26:26.217+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Entity found for Type kursOrt
366	2	2019-04-03 21:26:26.218+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - {entity:baden,type:kursOrt,startIndex:15,endIndex:19,resolution:{values:[Baden]}}
367	2	2019-04-03 21:26:26.22+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Ret Val: Baden,baden
368	2	2019-04-03 21:26:27.106+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - {entity:konversation,type:kursZweck,startIndex:0,endIndex:11,resolution:{values:[Konversation]}}
369	2	2019-04-03 21:26:27.103+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Entity found for Type kursZweck
370	2	2019-04-03 21:26:27.11+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Ret Val: Konversation,konversation
371	2	2019-04-03 21:26:27.964+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Entity found for Type kursNiveau
372	2	2019-04-03 21:26:27.976+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - {entity:anfänger,type:kursNiveau,startIndex:0,endIndex:7,resolution:{values:[Anfänger]}}
373	2	2019-04-03 21:26:27.982+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Ret Val: Anfänger,anfänger
374	2	2019-04-03 21:26:30.173+02	Query.handleReadyForQuery (C:Workspacechatbotschatbot_hallo_aargaunode_modulespglibquery.js:125:10) - Gefundene Kurse DB Response:
375	2	2019-04-03 21:26:30.175+02	Query.handleReadyForQuery (C:Workspacechatbotschatbot_hallo_aargaunode_modulespglibquery.js:125:10) - [{id:1,kurs_beschreibung:Lockere Konversation,niveau:Anfänger,sprachnachweis:nein,anbieter_offizieller_name:Nosotras Aargau,anbieter_strasse:null,anbieter_ort:null,anbieter_plz:null,anbieter_mail:info@nosotras-aargau.ch,anbieter_telefon:null,anbieter_url:www.nosotras-aargau.ch,konversation:Lockere Konversation,intensitaet:Wochenkurs,zweck:Konversation,reihenfolge:2,tag:2019-04-07T22:00:00.000Z,tag_name:Monday,tag_nummer:1,start_zeit:09:00:00,end_zeit:11:00:00,ort:Baden,ort_strasse:Zürcherstrasse 1,ort_plz:5400,ort_raum:Nosotras Aargau,adressatengruppe:Frauen,kontaktperson_anrede:Frau,kontaktperson_name:Vogt,kontaktperson_vorname:Ligia,kontaktperson_telefon:+41793350661}]
376	2	2019-04-03 21:28:27.905+02	Module._compile (internal/modules/cjs/loader.js:689:30) - I AM ONLINE! COME TALK TO ME: http://localhost:3000
377	2	2019-04-03 21:28:28.925+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
378	2	2019-04-03 21:28:28.933+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
379	2	2019-04-03 21:28:30.118+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation started with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
380	2	2019-04-03 21:28:30.121+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Recieved Message: Deutschkurs suchen
381	2	2019-04-03 21:28:30.126+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Top Intent: Deutschkurs Suchen
382	2	2019-04-03 21:28:30.128+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1423:13 - Score: 0.997424841
383	2	2019-04-03 21:28:30.152+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - {entity:deutsch,type:kursSprache,startIndex:0,endIndex:6,resolution:{values:[Deutsch]}}
384	2	2019-04-03 21:28:30.15+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Entity found for Type kursSprache
385	2	2019-04-03 21:28:30.156+02	Object.kursSuchen (C:Workspacechatbotschatbot_hallo_aargauconversationskurskurs.js:51:38) - Ret Val: Deutsch,deutsch
386	2	2019-04-03 21:28:31.349+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - {entity:wochen kurs,type:kursIntensitaet,startIndex:0,endIndex:9,resolution:{values:[Wochenkurs]}}
387	2	2019-04-03 21:28:31.35+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Ret Val: Wochenkurs,wochen kurs
388	2	2019-04-03 21:28:31.347+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursIntensitaet.js:36:47) - Entity found for Type kursIntensitaet
389	2	2019-04-03 21:28:32.068+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Entity found for Type kursAdressatengruppe
390	2	2019-04-03 21:28:32.07+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - {entity:frauen,type:kursAdressatengruppe,startIndex:0,endIndex:5,resolution:{values:[Frauen]}}
391	2	2019-04-03 21:28:32.078+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursAdressatengruppe.js:42:47) - Ret Val: Frauen,frauen
392	2	2019-04-03 21:28:33.162+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Entity found for Type kursOrt
393	2	2019-04-03 21:28:33.163+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - {entity:baden,type:kursOrt,startIndex:15,endIndex:19,resolution:{values:[Baden]}}
394	2	2019-04-03 21:28:33.164+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursOrt.js:33:46) - Ret Val: Baden,baden
395	2	2019-04-03 21:28:34.242+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Entity found for Type kursZweck
396	2	2019-04-03 21:28:34.244+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - {entity:konversation,type:kursZweck,startIndex:0,endIndex:11,resolution:{values:[Konversation]}}
397	2	2019-04-03 21:28:34.247+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursZweck.js:43:46) - Ret Val: Konversation,konversation
398	2	2019-04-03 21:28:35.189+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Entity found for Type kursNiveau
399	2	2019-04-03 21:28:35.193+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - {entity:anfänger,type:kursNiveau,startIndex:0,endIndex:7,resolution:{values:[Anfänger]}}
400	2	2019-04-03 21:28:35.198+02	Object.callback (C:Workspacechatbotschatbot_hallo_aargauconversationskursnotwendigeInformationenkursNiveau.js:43:46) - Ret Val: Anfänger,anfänger
401	2	2019-04-03 21:28:37.181+02	Query.handleReadyForQuery (C:Workspacechatbotschatbot_hallo_aargaunode_modulespglibquery.js:125:10) - Gefundene Kurse DB Response:
402	2	2019-04-03 21:28:37.184+02	Query.handleReadyForQuery (C:Workspacechatbotschatbot_hallo_aargaunode_modulespglibquery.js:125:10) - [{id:1,kurs_beschreibung:Lockere Konversation,niveau:Anfänger,sprachnachweis:nein,anbieter_offizieller_name:Nosotras Aargau,anbieter_strasse:null,anbieter_ort:null,anbieter_plz:null,anbieter_mail:info@nosotras-aargau.ch,anbieter_telefon:null,anbieter_url:www.nosotras-aargau.ch,konversation:Lockere Konversation,intensitaet:Wochenkurs,zweck:Konversation,reihenfolge:2,tag:2019-04-07T22:00:00.000Z,tag_name:Monday,tag_nummer:1,start_zeit:09:00:00,end_zeit:11:00:00,ort:Baden,ort_strasse:Zürcherstrasse 1,ort_plz:5400,ort_raum:Nosotras Aargau,adressatengruppe:Frauen,kontaktperson_anrede:Frau,kontaktperson_name:Vogt,kontaktperson_vorname:Ligia,kontaktperson_telefon:+41793350661}]
403	2	2019-04-03 21:28:39.093+02	Query.handleReadyForQuery (C:Workspacechatbotschatbot_hallo_aargaunode_modulespglibquery.js:125:10) - Feedback DB Response:
404	2	2019-04-03 21:28:39.094+02	Query.handleReadyForQuery (C:Workspacechatbotschatbot_hallo_aargaunode_modulespglibquery.js:125:10) - {command:INSERT,rowCount:1,oid:0,rows:[],fields:[],_parsers:[],RowCtor:null,rowAsArray:false}
405	2	2019-04-03 21:28:40.899+02	C:Workspacechatbotschatbot_hallo_aargaunode_modulesbotkitlibCoreBot.js:1411:56 - A conversation ended with 7c44b2a1-35fd-8cad-49d6-6d71ddd8870d
\.


--
-- Data for Name: botkit_channels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.botkit_channels (id, json) FROM stdin;
\.


--
-- Data for Name: botkit_teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.botkit_teams (id, json) FROM stdin;
\.


--
-- Data for Name: botkit_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.botkit_users (id, json) FROM stdin;
\.


--
-- Data for Name: durchfuehrungsort; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.durchfuehrungsort (id, code, strasse, plz, ort, raum) FROM stdin;
1	1	Zürcherstrasse 1	5400	Baden	Nosotras Aargau
2	2	Rain 24	5000	Aarau	Anlaufstelle Integration Aargau (2. Stock)
3	3	\N	\N	Aarau	\N
4	4	\N	\N	Baden	\N
5	5	Bahnhofstrasse 44	5400	Baden	\N
\.


--
-- Data for Name: durchfuehrungszeit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.durchfuehrungszeit (id, fk_kurs, fk_durchfuerungsort, reihenfolge, tag, zeit_start, zeit_ende, pause_start, pause_ende) FROM stdin;
1	1	1	1	2019-04-02	09:00:00	11:00:00	\N	\N
2	1	1	2	2019-04-08	09:00:00	11:00:00	\N	\N
3	1	1	3	2019-04-15	09:00:00	11:00:00	\N	\N
4	1	1	4	2019-04-22	09:00:00	11:00:00	\N	\N
5	1	1	5	2019-04-29	09:00:00	11:00:00	\N	\N
6	2	2	1	2019-04-02	14:00:00	16:00:00	\N	\N
7	3	3	1	\N	18:45:00	21:00:00	\N	\N
8	4	4	1	\N	19:00:00	21:00:00	\N	\N
9	5	3	1	\N	19:30:00	21:30:00	\N	\N
10	6	5	1	2019-04-02	07:30:00	09:00:00	\N	\N
11	7	5	1	2019-04-02	07:30:00	09:00:00	\N	\N
12	8	5	1	2019-04-02	07:30:00	09:00:00	\N	\N
13	9	5	1	2019-04-02	18:30:00	20:00:00	\N	\N
14	10	5	1	2019-04-02	07:30:00	09:00:00	\N	\N
15	11	5	1	\N	09:00:00	12:30:00	\N	\N
16	12	5	1	2019-04-01	17:30:00	19:00:00	\N	\N
17	13	5	1	2019-04-02	19:30:00	21:00:00	\N	\N
18	14	5	1	2019-04-02	17:30:00	19:00:00	\N	\N
19	15	5	1	2019-04-01	19:00:00	21:05:00	\N	\N
20	16	5	1	2019-04-01	18:30:00	20:00:00	\N	\N
21	17	\N	1	2019-04-02	07:30:00	09:00:00	\N	\N
22	18	\N	1	2019-04-02	09:00:00	12:30:00	\N	\N
23	19	\N	1	2019-04-01	19:00:00	20:30:00	\N	\N
24	20	\N	1	2019-04-01	19:00:00	20:30:00	\N	\N
25	21	5	1	2019-04-02	17:30:00	19:00:00	\N	\N
26	22	5	1	2019-04-02	18:30:00	20:00:00	\N	\N
27	23	5	1	2019-04-02	17:30:00	19:00:00	\N	\N
28	24	5	1	\N	08:00:00	11:30:00	\N	\N
29	25	5	1	2019-04-01	19:00:00	20:30:00	\N	\N
30	26	5	1	2019-04-02	18:35:00	20:05:00	\N	\N
31	27	5	1	2019-04-02	17:30:00	19:00:00	\N	\N
32	28	5	1	2019-04-01	18:35:00	20:05:00	\N	\N
33	29	5	1	2019-04-02	19:35:00	21:05:00	\N	\N
\.


--
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.feedback (id, fk_benutzer, fk_stern, erfasst_am, nachricht) FROM stdin;
2	5	5	2019-04-03 21:28:38.985+02	
\.


--
-- Data for Name: intensitaet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.intensitaet (id, code, wert, beschreibung) FROM stdin;
1	1	Wochenkurs	
2	2	Intensivkurs	
\.


--
-- Data for Name: kontaktperson; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kontaktperson (id, fk_anbieter, fk_stellvertreter, fk_anrede, name, vorname, telefon) FROM stdin;
1	1	\N	1	Vogt	Ligia	+41793350661
\.


--
-- Data for Name: konversation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.konversation (id, code, wert, beschreibung) FROM stdin;
1	1	Lockere Konversation	
2	2	Formale Konversation	
\.


--
-- Data for Name: kosten; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kosten (id, fk_kurs, fk_kostenart, betrag) FROM stdin;
1	1	1	0.00
2	2	1	0.00
3	3	1	400.00
4	4	1	400.00
5	5	1	440.00
6	6	1	1440.00
7	7	1	1440.00
8	8	1	1440.00
9	9	1	1440.00
10	10	1	1440.00
11	11	1	1180.00
12	12	1	510.00
13	13	1	1440.00
14	14	1	1440.00
15	15	1	1080.00
16	16	1	1440.00
17	17	1	1440.00
18	18	1	1180.00
19	19	1	1440.00
20	20	1	1440.00
21	21	1	1440.00
22	22	1	1440.00
23	23	1	1440.00
24	24	1	1180.00
25	25	1	1440.00
26	26	1	1080.00
27	27	1	20.00
28	28	1	1440.00
29	29	1	1440.00
\.


--
-- Data for Name: kostenart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kostenart (id, code, wert, beschreibung) FROM stdin;
1	1	Gesamtkurs	
2	2	Lehrmaterial	
3	3	Einzelkurs	
4	4	Einstufungstest	
\.


--
-- Data for Name: kurs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kurs (id, fk_niveau, fk_sprachnachweis, fk_anbieter, fk_konversation, fk_intensitaet, fk_zweck, beschreibung, einstufungstest, einzelunterricht, subventioniert) FROM stdin;
1	1	1	1	1	1	1	Lockere Konversation	f	f	f
2	1	1	1	1	1	1	Lockere Konversation	f	f	f
3	2	3	2	\N	1	2	Sie haben Mühe, Wörter und Sätze zu lesen oder zu schreiben. Die Schriftsprache wird von Grund auf gelernt. Es wird mit Themen aus dem Alltag gearbeitet.	f	t	f
4	2	3	2	\N	1	2	Sie haben Mühe, Wörter und Sätze zu lesen oder zu schreiben.Die Schriftsprache wird von Grund auf gelernt.Es wird mit Themen aus dem Alltag gearbeitet.	f	t	f
5	2	3	2	\N	1	2	Sie wollen mehr Sicherheit im Schreiben erlangen.Regeln der Rechtschreibung und Grammatik werden vertieft.Es wird mit Texten aus Beruf und Alltag gearbeitet.	f	t	f
6	5	4	3	\N	1	6	Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.	t	t	f
7	5	4	3	\N	1	6	Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.	t	t	f
8	5	4	3	\N	1	6	Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.	t	t	f
9	5	4	3	\N	1	6	Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.	t	t	f
10	5	4	3	\N	1	6	Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.	t	t	f
11	5	5	3	\N	2	6	Der Kurs Geschäftsdeutsch B2 richtet sich an Deutschlernende, die ihre Fähigkeiten im Bereich schriftlicher und mündlicher Kommunikation für die Arbeit im Büro verbessern möchten.	t	t	f
12	5	6	3	2	1	6	Sie haben eine solide Basis im Deutschen und möchten Ihre mündliche Ausdrucksfähigkeit verbessernNULL Im Fokuskurs Besser Sprechen B2 üben Sie das Sprechen in authentischen Situationen und über Themen Ihrer Wahl in Paaren, Kleingruppen und im Plenum und gewinnen so weiter an sprachlicher Sicherheit, um sich spontan und fliessend auszudrücken. Ihr Wortschatz erweitert sich und Sie formulieren Ihre Beiträge grammatikalisch korrekter.	t	t	f
13	5	4	3	\N	1	6	Vertiefung ist angesagt: Mit dem Deutschkurs B2 festigen Sie Ihre Kenntnisse so, dass Sie sich mit Muttersprachlern problemlos unterhalten können. Sie üben, über eine Reihe von Themen zu diskutieren, erweitern dabei Ihren Wortschatz und vertiefen die Grammatik.	t	t	f
14	5	2	3	\N	1	6	Jetzt starten: Legen Sie mit dem Anfängerkurs Deutsch A1 den Grundstein für eine erfolgreiche Kommunikation in Deutsch. Der Sprachkurs vermittelt Ihnen die Basics des modernen Alltagsdeutsch und zeigt Ihnen kulturelle Besonderheiten der deutschsprachigen Länder auf.	t	t	f
15	7	7	3	\N	1	11	Auf die Details kommt es an: Im Deutschkurs auf Niveaustufe C2 konzentrieren Sie sich auf die Feinheiten der deutschen Sprache. Ihr bereits sehr gutes Deutsch wird am Ende dieser Niveaustufe auf ein fast perfektes und fliessendes Deutsch angehoben, das einer mutter-sprachlichen Verwendung der Sprache gleicht.	t	t	f
16	7	7	3	\N	1	11	Auf die Details kommt es an: Im Deutschkurs auf Niveaustufe C2 konzentrieren Sie sich auf die Feinheiten der deutschen Sprache. Ihr bereits sehr gutes Deutsch wird am Ende dieser Niveaustufe auf ein fast perfektes und fliessendes Deutsch angehoben, das einer mutter-sprachlichen Verwendung der Sprache gleicht.	t	t	f
17	4	8	3	\N	1	4	Bleiben Sie dran: Auf der Niveaustufe B1 erweitern Sie Ihre bisherige Sprachkompetenz. Sie erlangen Gewandtheit im Sprechen und Schreiben und sind in der Lage, Ihr erstes Buch auf Englisch zu lesen oder sich auf Reisen im Alltag zu verständigen.	t	t	f
18	4	9	3	\N	2	4	Bleiben Sie dran: Auf der Niveaustufe B1 erweitern Sie Ihre bisherige Sprachkompetenz. Sie erlangen Gewandtheit im Sprechen und Schreiben und sind in der Lage, Ihr erstes Buch auf Englisch zu lesen oder sich auf Reisen im Alltag zu verständigen.	t	t	f
19	4	8	3	\N	1	4	Bleiben Sie dran: Auf der Niveaustufe B1 erweitern Sie Ihre bisherige Sprachkompetenz. Sie erlangen Gewandtheit im Sprechen und Schreiben und sind in der Lage, Ihr erstes Buch auf Englisch zu lesen oder sich auf Reisen im Alltag zu verständigen.	t	t	f
20	4	8	3	\N	1	4	Bleiben Sie dran: Auf der Niveaustufe B1 erweitern Sie Ihre bisherige Sprachkompetenz. Sie erlangen Gewandtheit im Sprechen und Schreiben und sind in der Lage, Ihr erstes Buch auf Englisch zu lesen oder sich auf Reisen im Alltag zu verständigen.	t	t	f
21	5	1	3	\N	1	6	Jetzt starten: Legen Sie mit dem Anfängerkurs Deutsch A1 den Grundstein für eine erfolgreiche Kommunikation in Deutsch. Der Sprachkurs vermittelt Ihnen die Basics des modernen Alltagsdeutsch und zeigt Ihnen kulturelle Besonderheiten der deutschsprachigen Länder auf.	t	t	f
22	3	10	3	\N	1	3	Jetzt starten: Legen Sie mit dem Anfängerkurs Deutsch A1 den Grundstein für eine erfolgreiche Kommunikation in Deutsch. Der Sprachkurs vermittelt Ihnen die Basics des modernen Alltagsdeutsch und zeigt Ihnen kulturelle Besonderheiten der deutschsprachigen Länder auf.	t	t	f
23	3	10	3	\N	1	3	Die erste Hürde ist gemeistert: Sie haben bereits die Basics gelernt und können jetzt auf der Niveaustufe A2 Ihre Grundkenntnisse erweitern. Sie bauen Ihren Wortschatz aus, verbessern Ihre Aussprache und lernen, in alltäglichen Situationen natürlich zu kommunizieren.	t	t	f
24	3	11	3	\N	2	3	Die erste Hürde ist gemeistert: Sie haben bereits die Basics gelernt und können jetzt auf der Niveaustufe A2 Ihre Grundkenntnisse erweitern. Sie bauen Ihren Wortschatz aus, verbessern Ihre Aussprache und lernen, in alltäglichen Situationen natürlich zu kommunizieren.	t	t	f
25	3	10	3	\N	1	3	Die erste Hürde ist gemeistert: Sie haben bereits die Basics gelernt und können jetzt auf der Niveaustufe A2 Ihre Grundkenntnisse erweitern. Sie bauen Ihren Wortschatz aus, verbessern Ihre Aussprache und lernen, in alltäglichen Situationen natürlich zu kommunizieren.	t	t	f
26	6	12	3	\N	1	9	Mit grossen Schritten vorwärts: Auf der Niveaustufe C1 konzentrieren Sie sich auf die Benutzung der deutschen Sprache im Fortgeschrittenenbereich. Ihr bereits gutes Deutsch wird besonders in den Bereichen Sprechen und Schreiben verbessert.	t	t	f
27	6	13	3	2	1	9	Sie sprechen bereits sehr gut Deutsch und möchten Ihre mündliche Ausdrucksfähigkeit weiter verbessernNULL Im Fokuskurs Besser Sprechen C1 üben Sie das Sprechen in authentischen Situationen und über Themen Ihrer Wahl in Paaren, Kleingruppen und im Plenum und gewinnen so themenunabhängig an sprachlicher Sicherheit, ohne nach Worten suchen zu müssen. Ihr Wortschatz erweitert sich und Sie formulieren Ihre Beiträge grammatikalisch korrekter.	t	t	f
28	6	12	3	\N	1	9	Mit grossen Schritten vorwärts: Auf der Niveaustufe C1 konzentrieren Sie sich auf die Benutzung der deutschen Sprache im Fortgeschrittenenbereich. Ihr bereits gutes Deutsch wird besonders in den Bereichen Sprechen und Schreiben verbessert. 	t	t	f
29	6	12	3	\N	1	9	Mit grossen Schritten vorwärts: Auf der Niveaustufe C1 konzentrieren Sie sich auf die Benutzung der deutschen Sprache im Fortgeschrittenenbereich. Ihr bereits gutes Deutsch wird besonders in den Bereichen Sprechen und Schreiben verbessert. 	t	t	f
\.


--
-- Data for Name: kurs_adressatengruppe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kurs_adressatengruppe (id_kurs, id_adressatengruppe) FROM stdin;
1	1
2	1
3	3
4	3
5	3
6	4
7	4
8	4
9	4
10	4
11	4
12	5
13	4
14	2
15	6
16	6
17	8
18	8
19	8
20	8
21	2
22	9
23	2
24	2
25	2
26	7
27	7
28	7
29	7
\.


--
-- Data for Name: log_level; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.log_level (id, code, wert, beschreibung) FROM stdin;
1	1	DEBUG	\N
2	2	INFO	\N
3	3	WARN	\N
4	4	ERROR	\N
\.


--
-- Data for Name: nachricht_typ; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nachricht_typ (id, code, wert, beschreibung) FROM stdin;
1	1	USER_MESSAGE	\N
2	2	BOT_MESSAGE	\N
\.


--
-- Data for Name: niveau; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.niveau (id, code, wert, beschreibung) FROM stdin;
1	1	Anfänger	Personen mit gar keinen oder nur wenigen Deutschkenntnissen
2	2	Schriftliche Kentnisse	Für Personen mit Kenntnis der lateinischen Schrift
3	3	A1	Für Personen mit Deutsschniveau A1
4	4	A2	Für Personen mit Deutsschniveau A2
5	5	B1	Für Personen mit Deutsschniveau B1
6	6	B2	Für Personen mit Deutsschniveau B2
7	7	C1	Für Personen mit Deutsschniveau C1
8	8	C2	Für Personen mit Deutsschniveau C2
\.


--
-- Data for Name: sprachnachweis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sprachnachweis (id, code, wert, beschreibung) FROM stdin;
1	1	nein	nein
2	2	ja	ja
3	3	muttersprache	Deutcher Muttersprache oder gute mündliche Deutschkenntnisse
4	4	B1	Deutsch B1
5	5	B1_Intensiv	Geschäftsdeutsch B1 Intensiv
6	6	B1_Konversation	Deutsch Konversation B1
7	7	C1	Deutsch C1
8	8	A2	Deutsch A2
9	9	A2_Intensiv	Deutsch A2 (Intensiv)
10	10	A1	Deutsch A1
11	11	A1_Intensiv	Deutsch A1 (Intensiv)
12	12	B2	Deutsch B2
13	13	B2_Konversation	Deutsch Konversation B2
\.


--
-- Data for Name: stern; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stern (id, code, wert, beschreibung) FROM stdin;
1	1	1 Stern	Sehr zufrieden
2	2	2 Sterne	Zufrieden
3	3	3 Sterne	Mittelmässig zufrieden
4	4	4 Sterne	Eher nicht zufrieden
5	5	5 Sterne	Gar nicht zufrieden
\.


--
-- Data for Name: zweck; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zweck (id, code, wert, beschreibung) FROM stdin;
1	1	Konversation	
2	2	Deutsch Lesen und Schreiben	
3	3	Deutsch A1	
4	4	Deutsch A2	
5	5	Deutsch A2 (Intensiv)	
6	6	Deutsch B1	
7	7	Deutsch B1 (Intensiv)	
8	8	Konversation B2	
9	9	Deutsch B2	
10	10	Geschäftsdeutsch B2	
11	11	Deutsch C1	
12	12	Deutsch C2	
\.


--
-- Name: adressatengruppe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.adressatengruppe_id_seq', 9, true);


--
-- Name: anbieter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.anbieter_id_seq', 3, true);


--
-- Name: anrede_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.anrede_id_seq', 1, true);


--
-- Name: benutzer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.benutzer_id_seq', 38, true);


--
-- Name: benutzer_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.benutzer_log_id_seq', 373, true);


--
-- Name: bot_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bot_log_id_seq', 405, true);


--
-- Name: durchfuehrungsort_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.durchfuehrungsort_id_seq', 5, true);


--
-- Name: durchfuehrungszeit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.durchfuehrungszeit_id_seq', 33, true);


--
-- Name: feedback_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.feedback_id_seq', 2, true);


--
-- Name: intensitaet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.intensitaet_id_seq', 2, true);


--
-- Name: kontaktperson_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kontaktperson_id_seq', 1, true);


--
-- Name: konversation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.konversation_id_seq', 2, true);


--
-- Name: kosten_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kosten_id_seq', 29, true);


--
-- Name: kostenart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kostenart_id_seq', 4, true);


--
-- Name: kurs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kurs_id_seq', 29, true);


--
-- Name: log_level_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.log_level_id_seq', 4, true);


--
-- Name: nachricht_typ_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nachricht_typ_id_seq', 2, true);


--
-- Name: niveau_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.niveau_id_seq', 8, true);


--
-- Name: sprachnachweis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sprachnachweis_id_seq', 13, true);


--
-- Name: stern_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stern_id_seq', 5, true);


--
-- Name: zweck_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.zweck_id_seq', 12, true);


--
-- Name: adressatengruppe adressatengruppe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adressatengruppe
    ADD CONSTRAINT adressatengruppe_pkey PRIMARY KEY (id);


--
-- Name: anbieter anbieter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anbieter
    ADD CONSTRAINT anbieter_pkey PRIMARY KEY (id);


--
-- Name: anrede anrede_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anrede
    ADD CONSTRAINT anrede_pkey PRIMARY KEY (id);


--
-- Name: benutzer benutzer_benutzer_kennung_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.benutzer
    ADD CONSTRAINT benutzer_benutzer_kennung_key UNIQUE (benutzer_kennung);


--
-- Name: benutzer_log benutzer_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.benutzer_log
    ADD CONSTRAINT benutzer_log_pkey PRIMARY KEY (id);


--
-- Name: benutzer benutzer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.benutzer
    ADD CONSTRAINT benutzer_pkey PRIMARY KEY (id);


--
-- Name: bot_log bot_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bot_log
    ADD CONSTRAINT bot_log_pkey PRIMARY KEY (id);


--
-- Name: botkit_channels botkit_channels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.botkit_channels
    ADD CONSTRAINT botkit_channels_pkey PRIMARY KEY (id);


--
-- Name: botkit_teams botkit_teams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.botkit_teams
    ADD CONSTRAINT botkit_teams_pkey PRIMARY KEY (id);


--
-- Name: botkit_users botkit_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.botkit_users
    ADD CONSTRAINT botkit_users_pkey PRIMARY KEY (id);


--
-- Name: durchfuehrungsort durchfuehrungsort_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.durchfuehrungsort
    ADD CONSTRAINT durchfuehrungsort_pkey PRIMARY KEY (id);


--
-- Name: durchfuehrungszeit durchfuehrungszeit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.durchfuehrungszeit
    ADD CONSTRAINT durchfuehrungszeit_pkey PRIMARY KEY (id);


--
-- Name: feedback feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (id);


--
-- Name: intensitaet intensitaet_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intensitaet
    ADD CONSTRAINT intensitaet_pkey PRIMARY KEY (id);


--
-- Name: kontaktperson kontaktperson_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kontaktperson
    ADD CONSTRAINT kontaktperson_pkey PRIMARY KEY (id);


--
-- Name: konversation konversation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.konversation
    ADD CONSTRAINT konversation_pkey PRIMARY KEY (id);


--
-- Name: kosten kosten_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kosten
    ADD CONSTRAINT kosten_pkey PRIMARY KEY (id);


--
-- Name: kostenart kostenart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kostenart
    ADD CONSTRAINT kostenart_pkey PRIMARY KEY (id);


--
-- Name: kurs kurs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kurs
    ADD CONSTRAINT kurs_pkey PRIMARY KEY (id);


--
-- Name: log_level log_level_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.log_level
    ADD CONSTRAINT log_level_pkey PRIMARY KEY (id);


--
-- Name: nachricht_typ nachricht_typ_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nachricht_typ
    ADD CONSTRAINT nachricht_typ_pkey PRIMARY KEY (id);


--
-- Name: niveau niveau_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.niveau
    ADD CONSTRAINT niveau_pkey PRIMARY KEY (id);


--
-- Name: sprachnachweis sprachnachweis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sprachnachweis
    ADD CONSTRAINT sprachnachweis_pkey PRIMARY KEY (id);


--
-- Name: stern stern_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stern
    ADD CONSTRAINT stern_pkey PRIMARY KEY (id);


--
-- Name: zweck zweck_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zweck
    ADD CONSTRAINT zweck_pkey PRIMARY KEY (id);


--
-- Name: benutzer_log_benutzer_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX benutzer_log_benutzer_idx ON public.benutzer_log USING btree (benutzer);


--
-- Name: benutzer_log_nachricht_typ_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX benutzer_log_nachricht_typ_idx ON public.benutzer_log USING btree (nachricht_typ);


--
-- Name: bot_log_level_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bot_log_level_idx ON public.bot_log USING btree (level);


--
-- Name: durchfuehrungszeit_fk_durchfuerungsort_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX durchfuehrungszeit_fk_durchfuerungsort_idx ON public.durchfuehrungszeit USING btree (fk_durchfuerungsort);


--
-- Name: durchfuehrungszeit_fk_kurs_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX durchfuehrungszeit_fk_kurs_idx ON public.durchfuehrungszeit USING btree (fk_kurs);


--
-- Name: kontaktperson_fk_anbieter_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX kontaktperson_fk_anbieter_idx ON public.kontaktperson USING btree (fk_anbieter);


--
-- Name: kontaktperson_fk_anrede_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX kontaktperson_fk_anrede_idx ON public.kontaktperson USING btree (fk_anrede);


--
-- Name: kontaktperson_fk_stellvertreter_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX kontaktperson_fk_stellvertreter_idx ON public.kontaktperson USING btree (fk_stellvertreter);


--
-- Name: kosten_fk_kostenart_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX kosten_fk_kostenart_idx ON public.kosten USING btree (fk_kostenart);


--
-- Name: kosten_fk_kurs_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX kosten_fk_kurs_idx ON public.kosten USING btree (fk_kurs);


--
-- Name: kurs_fk_anbieter_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX kurs_fk_anbieter_idx ON public.kurs USING btree (fk_anbieter);


--
-- Name: kurs_fk_intensitaet_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX kurs_fk_intensitaet_idx ON public.kurs USING btree (fk_intensitaet);


--
-- Name: kurs_fk_konversation_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX kurs_fk_konversation_idx ON public.kurs USING btree (fk_konversation);


--
-- Name: kurs_fk_niveau_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX kurs_fk_niveau_idx ON public.kurs USING btree (fk_niveau);


--
-- Name: kurs_fk_sprachnachweis_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX kurs_fk_sprachnachweis_idx ON public.kurs USING btree (fk_sprachnachweis);


--
-- Name: kurs_fk_zweck_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX kurs_fk_zweck_idx ON public.kurs USING btree (fk_zweck);


--
-- PostgreSQL database dump complete
--

