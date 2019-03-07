--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

-- Started on 2019-03-08 00:47:57

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
-- TOC entry 206 (class 1259 OID 16596)
-- Name: botkit_channels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.botkit_channels (
    id character(50) NOT NULL,
    json text NOT NULL
);


ALTER TABLE public.botkit_channels OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16580)
-- Name: botkit_teams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.botkit_teams (
    id character(50) NOT NULL,
    json text NOT NULL
);


ALTER TABLE public.botkit_teams OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16588)
-- Name: botkit_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.botkit_users (
    id character(50) NOT NULL,
    json text NOT NULL
);


ALTER TABLE public.botkit_users OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 16494)
-- Name: deutschkurs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deutschkurs (
    id integer NOT NULL,
    "Gesamtkurs_Start" text,
    "Gesamtkurs_Ende" text,
    "Gesamtkurs_Dauer_Tage" text,
    "Gesamtkurs_Dauer_Stunden" text,
    "Einzelkurs_Start" text,
    "Einzelkurs_Ende" text,
    "Einzelkurs_Dauer_Minuten" text,
    id_durchfuehrungsort integer NOT NULL,
    id_anbieter integer NOT NULL,
    id_kosten integer NOT NULL
);


ALTER TABLE public.deutschkurs OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16488)
-- Name: deutschkurs_anbieter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deutschkurs_anbieter (
    id integer NOT NULL,
    "Anbieter_Name" text,
    "Anbieter_Beschreibung" text,
    "Anbieter_Webseite" text,
    "Anbieter_EMail" text,
    "Anbieter_Tel" text,
    "Anbieter_Strasse" text,
    "Anbieter_PLZ" text,
    "Anbieter_Ort" text,
    "Anbieter_Kontakt" text,
    "Kontakt_Tel" text
);


ALTER TABLE public.deutschkurs_anbieter OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16512)
-- Name: deutschkurs_anbieter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.deutschkurs_anbieter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.deutschkurs_anbieter_id_seq OWNER TO postgres;

--
-- TOC entry 2880 (class 0 OID 0)
-- Dependencies: 201
-- Name: deutschkurs_anbieter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.deutschkurs_anbieter_id_seq OWNED BY public.deutschkurs_anbieter.id;


--
-- TOC entry 196 (class 1259 OID 16483)
-- Name: deutschkurs_durchfuerungsort; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deutschkurs_durchfuerungsort (
    id integer NOT NULL,
    "Durchfuehrungsort_Strasse" text,
    "Durchfuehrungsort_PLZ" text,
    "Durchfuehrungsort_Ortschaft" text,
    "Durchfuehrungsort_Raum" text
);


ALTER TABLE public.deutschkurs_durchfuerungsort OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16497)
-- Name: deutschkurs_durchfuerungsort_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.deutschkurs_durchfuerungsort_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.deutschkurs_durchfuerungsort_id_seq OWNER TO postgres;

--
-- TOC entry 2881 (class 0 OID 0)
-- Dependencies: 200
-- Name: deutschkurs_durchfuerungsort_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.deutschkurs_durchfuerungsort_id_seq OWNED BY public.deutschkurs_durchfuerungsort.id;


--
-- TOC entry 203 (class 1259 OID 16549)
-- Name: deutschkurs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.deutschkurs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.deutschkurs_id_seq OWNER TO postgres;

--
-- TOC entry 2882 (class 0 OID 0)
-- Dependencies: 203
-- Name: deutschkurs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.deutschkurs_id_seq OWNED BY public.deutschkurs.id;


--
-- TOC entry 198 (class 1259 OID 16491)
-- Name: deutschkurs_kosten; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deutschkurs_kosten (
    id integer NOT NULL,
    "Kosten_Lehrmaterial" text,
    "Kosten_Gesamtkurs" text,
    "Kosten_Einzelkurs" text,
    "Kosten_Einstufungstest" text,
    "Kosten_subventioniert" text
);


ALTER TABLE public.deutschkurs_kosten OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16527)
-- Name: deutschkurs_kosten_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.deutschkurs_kosten_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.deutschkurs_kosten_id_seq OWNER TO postgres;

--
-- TOC entry 2883 (class 0 OID 0)
-- Dependencies: 202
-- Name: deutschkurs_kosten_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.deutschkurs_kosten_id_seq OWNED BY public.deutschkurs_kosten.id;


--
-- TOC entry 2725 (class 2604 OID 16551)
-- Name: deutschkurs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deutschkurs ALTER COLUMN id SET DEFAULT nextval('public.deutschkurs_id_seq'::regclass);


--
-- TOC entry 2723 (class 2604 OID 16514)
-- Name: deutschkurs_anbieter id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deutschkurs_anbieter ALTER COLUMN id SET DEFAULT nextval('public.deutschkurs_anbieter_id_seq'::regclass);


--
-- TOC entry 2722 (class 2604 OID 16499)
-- Name: deutschkurs_durchfuerungsort id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deutschkurs_durchfuerungsort ALTER COLUMN id SET DEFAULT nextval('public.deutschkurs_durchfuerungsort_id_seq'::regclass);


--
-- TOC entry 2724 (class 2604 OID 16529)
-- Name: deutschkurs_kosten id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deutschkurs_kosten ALTER COLUMN id SET DEFAULT nextval('public.deutschkurs_kosten_id_seq'::regclass);


--
-- TOC entry 2874 (class 0 OID 16596)
-- Dependencies: 206
-- Data for Name: botkit_channels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.botkit_channels (id, json) FROM stdin;
\.


--
-- TOC entry 2872 (class 0 OID 16580)
-- Dependencies: 204
-- Data for Name: botkit_teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.botkit_teams (id, json) FROM stdin;
\.


--
-- TOC entry 2873 (class 0 OID 16588)
-- Dependencies: 205
-- Data for Name: botkit_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.botkit_users (id, json) FROM stdin;
\.


--
-- TOC entry 2867 (class 0 OID 16494)
-- Dependencies: 199
-- Data for Name: deutschkurs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deutschkurs (id, "Gesamtkurs_Start", "Gesamtkurs_Ende", "Gesamtkurs_Dauer_Tage", "Gesamtkurs_Dauer_Stunden", "Einzelkurs_Start", "Einzelkurs_Ende", "Einzelkurs_Dauer_Minuten", id_durchfuehrungsort, id_anbieter, id_kosten) FROM stdin;
1	Gesamtkurs_Start	Gesamtkurs_Ende	Gesamtkurs_Dauer_Tage	Gesamtkurs_Dauer_Stunden	Einzelkurs_Start	Einzelkurs_Ende	Einzelkurs_Dauer_Minuten	1	1	1
\.


--
-- TOC entry 2865 (class 0 OID 16488)
-- Dependencies: 197
-- Data for Name: deutschkurs_anbieter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deutschkurs_anbieter (id, "Anbieter_Name", "Anbieter_Beschreibung", "Anbieter_Webseite", "Anbieter_EMail", "Anbieter_Tel", "Anbieter_Strasse", "Anbieter_PLZ", "Anbieter_Ort", "Anbieter_Kontakt", "Kontakt_Tel") FROM stdin;
1	Anbieter_Name	Anbieter_Beschreibung	Anbieter_Webseite	Anbieter_EMail	Anbieter_Tel	Anbieter_Strasse	Anbieter_PLZ	Anbieter_Ort	Anbieter_Kontakt	Kontakt_Tel
\.


--
-- TOC entry 2864 (class 0 OID 16483)
-- Dependencies: 196
-- Data for Name: deutschkurs_durchfuerungsort; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deutschkurs_durchfuerungsort (id, "Durchführungsort_Strasse", "Durchführungsort_PLZ", "Durchführungsort_Ortschaft", "Durchführungsort_Raum") FROM stdin;
1	Durchführungsort_Strasse	Durchführungsort_PLZ	Durchführungsort_Ortschaft	Durchführungsort_Raum
\.


--
-- TOC entry 2866 (class 0 OID 16491)
-- Dependencies: 198
-- Data for Name: deutschkurs_kosten; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deutschkurs_kosten (id, "Kosten_Lehrmaterial", "Kosten_Gesamtkurs", "Kosten_Einzelkurs", "Kosten_Einstufungstest", "Kosten_subventioniert") FROM stdin;
1	Kosten_Lehrmaterial	Kosten_Gesamtkurs	Kosten_Einzelkurs	Kosten_Einstufungstest	Kosten_subventioniert
\.


--
-- TOC entry 2884 (class 0 OID 0)
-- Dependencies: 201
-- Name: deutschkurs_anbieter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.deutschkurs_anbieter_id_seq', 1, true);


--
-- TOC entry 2885 (class 0 OID 0)
-- Dependencies: 200
-- Name: deutschkurs_durchfuerungsort_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.deutschkurs_durchfuerungsort_id_seq', 1, true);


--
-- TOC entry 2886 (class 0 OID 0)
-- Dependencies: 203
-- Name: deutschkurs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.deutschkurs_id_seq', 1, true);


--
-- TOC entry 2887 (class 0 OID 0)
-- Dependencies: 202
-- Name: deutschkurs_kosten_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.deutschkurs_kosten_id_seq', 1, true);


--
-- TOC entry 2739 (class 2606 OID 16603)
-- Name: botkit_channels botkit_channels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.botkit_channels
    ADD CONSTRAINT botkit_channels_pkey PRIMARY KEY (id);


--
-- TOC entry 2735 (class 2606 OID 16587)
-- Name: botkit_teams botkit_teams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.botkit_teams
    ADD CONSTRAINT botkit_teams_pkey PRIMARY KEY (id);


--
-- TOC entry 2737 (class 2606 OID 16595)
-- Name: botkit_users botkit_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.botkit_users
    ADD CONSTRAINT botkit_users_pkey PRIMARY KEY (id);


--
-- TOC entry 2729 (class 2606 OID 16516)
-- Name: deutschkurs_anbieter deutschkurs_anbieter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deutschkurs_anbieter
    ADD CONSTRAINT deutschkurs_anbieter_pkey PRIMARY KEY (id);


--
-- TOC entry 2727 (class 2606 OID 16501)
-- Name: deutschkurs_durchfuerungsort deutschkurs_durchfuerungsort_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deutschkurs_durchfuerungsort
    ADD CONSTRAINT deutschkurs_durchfuerungsort_pkey PRIMARY KEY (id);


--
-- TOC entry 2731 (class 2606 OID 16531)
-- Name: deutschkurs_kosten deutschkurs_kosten_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deutschkurs_kosten
    ADD CONSTRAINT deutschkurs_kosten_pkey PRIMARY KEY (id);


--
-- TOC entry 2733 (class 2606 OID 16553)
-- Name: deutschkurs deutschkurs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deutschkurs
    ADD CONSTRAINT deutschkurs_pkey PRIMARY KEY (id);


--
-- TOC entry 2741 (class 2606 OID 16559)
-- Name: deutschkurs deutschkurs_id_anbieter_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deutschkurs
    ADD CONSTRAINT deutschkurs_id_anbieter_fkey FOREIGN KEY (id_anbieter) REFERENCES public.deutschkurs_anbieter(id);


--
-- TOC entry 2740 (class 2606 OID 16554)
-- Name: deutschkurs deutschkurs_id_durchfuehrungsort_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deutschkurs
    ADD CONSTRAINT deutschkurs_id_durchfuehrungsort_fkey FOREIGN KEY (id_durchfuehrungsort) REFERENCES public.deutschkurs_durchfuerungsort(id);


--
-- TOC entry 2742 (class 2606 OID 16564)
-- Name: deutschkurs deutschkurs_id_kosten_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deutschkurs
    ADD CONSTRAINT deutschkurs_id_kosten_fkey FOREIGN KEY (id_kosten) REFERENCES public.deutschkurs_kosten(id);


-- Completed on 2019-03-08 00:47:57

--
-- PostgreSQL database dump complete
--

