/* global clockAidLang*/
/**
 * Version: 1.0
 * Build Date: 20-12-2013
 * Copyright (c) 2013, Drukkerij Teeuwen. (http://www.drukkerijteeuwen.nl/). All rights reserved.
 */

clockAidLang['nb-NO'] = 
{
	/* Culture Name */
    name: "nb-NO",
    englishName: "Norwegian, Bokm&aring;l (Norway)",
    nativeName: "norsk, bokm&aring;l (Norge)",
    
	monthNames : ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"],
    monthNamesShort : ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"],
    dayNames : ["s&oslash;ndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "l&oslash;rdag"],
    dayNamesShort :  ["s&oslash;", "ma", "ti", "on", "to", "fr", "l&oslash;"],
	dayNamesMin :["s&oslash;", "ma", "ti", "on", "to", "fr", "l&oslash;"],
	dateFormat: 'dd/mm/yy',
	dayPeriodText : ['natt', 'morgen', 'formiddag', 'ettermiddag', 'kveld'],
	sesionPeriodText : ["vår", "sommer", "høst", "vinter"],
	off : "av",
	
	
	icons : [
		{val : "icoon1", text: 'ANDRE'},
		{val : "icoon2", text: 'MEDISIN'},
		{val : "icoon3", text: 'BES&Oslash;K'},
		{val : "icoon4", text: 'SPISE'},
		{val : "icoon5", text: 'SOVE'},
		{val : "icoon6", text: 'LEGE'},
		{val : "icoon7", text: 'DUSJ'}
	],
	iconsDefault : 'ANDRE',

	/* Digital Clock */
	digitNames : ["nul", "en", "to", "tre", "fire", "fem", "seks", "syv", "&aring;tte", "ni"],
	digitTimeFormat : ['h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'],
	
	/* MobiScroll */
	dateOrder: 'dmmy',
    timeWheels: 'Hii',
    timeFormat: 'H:ii',
    monthText: 'MM&aring;ned',
    dayText: 'Dag',
    yearText: '&Aring;r',
    hourText: 'Kl.',
    hourText2: 'Kl.',
    minuteText: '',
    secText: 'Sek.',
    ampmText: '&nbsp;',
    nowText: 'Na',
	selectedText: ' Valgt',
	closeText: 'Avslutt',
    setText: 'Sted',
	cancelText : 'Avbryt',
    clearText: 'Tomt',
    ariaDesc: 'Velg et alternativ',
    
	/* Calender */
	doneText: 'Ferdig',
	prevText: 'Forrige',
    nextText: 'Neste',
    currentText: 'I dag',
	CALENDAR_EVENTS : 'aktiviteter',
    CALENDAR_NO_ROWS: '<ul><li>Ingen aktiviteter ble funnet for denne datoen.</li></ul>',
	CALENDAR_SORT_BY: 'sorter etter:',
	CALENDAR_TIME: 'tid',
	CALENDAR_TITLE: 'tittel',
	CALENDAR_PRIORITY: 'prioritet',
	weekHeader: 'Wk',
	firstDay: 0,
	addText : "Legg til aktivitet",
	saveText : "lagre",
	saveText2 : "fyll ut",
	herhaal : [' GJENTA HVER DAG', ' GJENTA HVER UKE', ' GJENTA HVER M&Aring;NED', ' IKKE GJENTA'],
	herhaalText : "gjenta",
	defaultMessage : "ANDRE",
	
	
	/* Menu */
	calander : "kalender",
	setting : "innstillinger",
	
	
	/* Settings */
	typeclock : "klokketype",
	typeclockdigitaal : "digital",
	typeclockmodern : "moderne",
	typeclockclassic : "klassisk",
	clocksound : "tikkelyd",
	clocksoundOn : "p&aring;",
	fontName : "beskjedlinje",
	fontNameSmall : "liten",
	fontNameNormal : "normal",
	fontNameBig : "stor",
	blinkTime: "varsel-blinke",
	alarmTime: "melodi",
	sound : "varselyd",
	sound4 : "melodi",
	sound7 : "fugler",
	sound8 : "bell",
	sound9 : "harpe",
	sound10 : "alarm",
	sound11 : "marimba",
	sound12 : "kurs",
	
	
	backgroundColor : "bakgrunn",
	backgroundColorWhite: "hvit",
	backgroundColorBlack: "svart",
	backgroundColorGray: "gr&aring;",
	fotoType : "bildet",
	fotoTypeNone: "inget",
	fotoTypeSeason: "&aringrstid",
	fotoTypeOwn: "eget",
	fotoPosition : "bildeplass",
	fotoPositionClock: "i klokken",
	fotoPositionPlane: "bakgrunn",
	addFoto: "legg til bilde",
	removeFotoText: "bildet har blitt fjernet",
	weerText: "v&aelig;r",
	taalText: "spr&aring;k",
	noorsText: "norsk",
	engelsText: "engelsk",
	nederlandsText: "nederlandsk",
	upgradeText: "oppgradere",
	emailText: "e-post",
	serialText: "serienummer",
	bevestigText: "bekrefte",
	foutieveInputText: "Du har lagt inn ugyldig informasjon",
	serialTakenText: "Denne serienummer er allerede i bruk",
	correcteInputText: "Oppgraderingen var vellykket. Lykke til med bruken!",
	upgradeGuidance: '<br><br><a href="http://clockaid.com/?lang=5">Klikk her</a> for mer informasjon og for å kjøpe det ønskede Clockaid produktet!'
};
