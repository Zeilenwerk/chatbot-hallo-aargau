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

	INSERT INTO public.deutschkurs(
	"Gesamtkurs_Start", "Gesamtkurs_Ende", "Gesamtkurs_Dauer_Tage", "Gesamtkurs_Dauer_Stunden", "Einzelkurs_Start", "Einzelkurs_Ende", "Einzelkurs_Dauer_Minuten", id_durchfuehrungsort, id_anbieter, id_kosten)
	VALUES ('Gesamtkurs_Start 2', 'Gesamtkurs_Ende 2', 'Gesamtkurs_Dauer_Tage 2', 'Gesamtkurs_Dauer_Stunden 2', 'Einzelkurs_Start 2', 'Einzelkurs_Ende 2', 'Einzelkurs_Dauer_Minuten 2', 1,1,1);

	INSERT INTO public.deutschkurs(
	"Gesamtkurs_Start", "Gesamtkurs_Ende", "Gesamtkurs_Dauer_Tage", "Gesamtkurs_Dauer_Stunden", "Einzelkurs_Start", "Einzelkurs_Ende", "Einzelkurs_Dauer_Minuten", id_durchfuehrungsort, id_anbieter, id_kosten)
	VALUES ('Gesamtkurs_Start 3', 'Gesamtkurs_Ende 3', 'Gesamtkurs_Dauer_Tage 3', 'Gesamtkurs_Dauer_Stunden 3', 'Einzelkurs_Start 3', 'Einzelkurs_Ende 3', 'Einzelkurs_Dauer_Minuten 3', 1,1,1);


	INSERT INTO public.deutschkurs(
	"Gesamtkurs_Start", "Gesamtkurs_Ende", "Gesamtkurs_Dauer_Tage", "Gesamtkurs_Dauer_Stunden", "Einzelkurs_Start", "Einzelkurs_Ende", "Einzelkurs_Dauer_Minuten", id_durchfuehrungsort, id_anbieter, id_kosten)
	VALUES ('Gesamtkurs_Start 4', 'Gesamtkurs_Ende 4', 'Gesamtkurs_Dauer_Tage 4', 'Gesamtkurs_Dauer_Stunden 4', 'Einzelkurs_Start 4', 'Einzelkurs_Ende 4', 'Einzelkurs_Dauer_Minuten 4', 1,1,1);








