INSERT INTO public.deutschkurs_kosten(
	"Kosten_Lehrmaterial", "Kosten_Gesamtkurs", "Kosten_Einzelkurs", "Kosten_Einstufungstest", "Kosten_subventioniert")
	VALUES ('Kosten_Lehrmaterial', 'Kosten_Gesamtkurs', 'Kosten_Einzelkurs', 'Kosten_Einstufungstest', 'Kosten_subventioniert');


	INSERT INTO public.deutschkurs_durchfuerungsort(
	"Durchfuehrungsort_Strasse", "Durchfuehrungsort_PLZ", "Durchfuehrungsort_Ortschaft", "Durchfuehrungsort_Raum")
	VALUES ('Durchfuehrungsort_Strasse', 'Durchfuehrungsort_PLZ', 'Durchfuehrungsort_Ortschaft', 'Durchfuehrungsort_Raum');


	INSERT INTO public.deutschkurs_anbieter(
	"Anbieter_Name", "Anbieter_Beschreibung", "Anbieter_Webseite", "Anbieter_EMail", "Anbieter_Tel", "Anbieter_Strasse", "Anbieter_PLZ", "Anbieter_Ort", "Anbieter_Kontakt", "Kontakt_Tel")
	VALUES ('Anbieter_Name', 'Anbieter_Beschreibung', 'Anbieter_Webseite', 'Anbieter_EMail', 'Anbieter_Tel', 'Anbieter_Strasse', 'Anbieter_PLZ', 'Anbieter_Ort', 'Anbieter_Kontakt', 'Kontakt_Tel');

	INSERT INTO public.deutschkurs(
	"Gesamtkurs_Start", "Gesamtkurs_Ende", "Gesamtkurs_Dauer_Tage", "Gesamtkurs_Dauer_Stunden", "Einzelkurs_Start", "Einzelkurs_Ende", "Einzelkurs_Dauer_Minuten", id_durchfuehrungsort, id_anbieter, id_kosten)
	VALUES ('Gesamtkurs_Start', 'Gesamtkurs_Ende', 'Gesamtkurs_Dauer_Tage', 'Gesamtkurs_Dauer_Stunden', 'Einzelkurs_Start', 'Einzelkurs_Ende', 'Einzelkurs_Dauer_Minuten', 1,1,1);

