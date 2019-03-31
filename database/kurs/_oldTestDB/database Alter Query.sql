ALTER TABLE public.deutschkurs_durchfuerungsort
  ADD COLUMN "id" serial NOT NULL,
	ADD COLUMN "Durchfuehrungsort_Strasse" text,
	ADD COLUMN "Durchfuehrungsort_PLZ" text,
	ADD COLUMN "Durchfuehrungsort_Ortschaft" text,
	ADD COLUMN "Durchfuehrungsort_Raum" text,
  ADD PRIMARY KEY (id)


ALTER TABLE public.deutschkurs_anbieter
  ADD COLUMN "id" serial NOT NULL,
	ADD COLUMN "Anbieter_Name" text,
	ADD COLUMN "Anbieter_Beschreibung" text,
	ADD COLUMN "Anbieter_Webseite" text,
	ADD COLUMN "Anbieter_EMail" text,
	ADD COLUMN "Anbieter_Tel" text,
	ADD COLUMN "Anbieter_Strasse" text,
	ADD COLUMN "Anbieter_PLZ" text,
	ADD COLUMN "Anbieter_Ort" text,
	ADD COLUMN "Anbieter_Kontakt" text,
	ADD COLUMN "Kontakt_Tel" text,
	ADD PRIMARY KEY (id)


ALTER TABLE public.deutschkurs_kosten
  ADD COLUMN "id" serial NOT NULL,
	ADD COLUMN "Kosten_Lehrmaterial" text,
	ADD COLUMN "Kosten_Gesamtkurs" text,
	ADD COLUMN "Kosten_Einzelkurs" text,
	ADD COLUMN "Kosten_Einstufungstest" text,
	ADD COLUMN "Kosten_subventioniert" text,
	ADD PRIMARY KEY (id)

ALTER TABLE public.deutschkurs
	ADD COLUMN "id" serial NOT NULL,
  ADD COLUMN "Gesamtkurs_Start" text,
	ADD COLUMN "Gesamtkurs_Ende" text,
	ADD COLUMN "Gesamtkurs_Dauer_Tage" text,
	ADD COLUMN "Gesamtkurs_Dauer_Stunden" text,
	ADD COLUMN "Einzelkurs_Start" text,
	ADD COLUMN "Einzelkurs_Ende" text,
	ADD COLUMN "Einzelkurs_Dauer_Minuten" text,
	ADD COLUMN "id_durchfuehrungsort" integer NOT NULL,
	ADD COLUMN "id_anbieter" integer NOT NULL,
	ADD COLUMN "id_kosten" integer NOT NULL,
  ADD PRIMARY KEY (id),
  ADD FOREIGN KEY (id_durchfuehrungsort) REFERENCES deutschkurs_durchfuerungsort (id),
  ADD FOREIGN KEY (id_anbieter) REFERENCES deutschkurs_anbieter (id),
  ADD FOREIGN KEY (id_kosten) REFERENCES deutschkurs_kosten (id)
