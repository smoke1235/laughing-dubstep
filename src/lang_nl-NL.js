/* global clockAidLang*/
/**
 * Version: 1.0
 * Build Date: 20-12-2013
 * Copyright (c) 2013, Drukkerij Teeuwen. (http://www.drukkerijteeuwen.nl/). All rights reserved.
 */

clockAidLang['nl-NL'] = 
{
    name : "nl-NL",
    englishName : "Dutch (Netherlands)",
    nativeName : "Nederlands (Nederland)",
	
	monthNames : ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
    monthNamesShort : ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
    dayNames : ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
    dayNamesShort : ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
	dayNamesMin : ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
	dateFormat: 'dd/mm/yy',
	dayPeriodText : ['nacht', 'ochtend', 'ochtend', 'middag', 'avond'],
	sesionPeriodText : ["lente", "zomer", "herfst", "winter"],
	off : "uit",
	
	
	icons : [
		{val : "icoon1", text: 'ANDERS'},
		{val : "icoon2", text: 'MEDICIJNEN'},
		{val : "icoon3", text: 'BEZOEK'},
		{val : "icoon4", text: 'ETEN'},
		{val : "icoon5", text: 'SLAPEN'},
		{val : "icoon6", text: 'DOKTER'},
		{val : "icoon7", text: 'WASSEN'}
	],
	iconsDefault : 'ANDERS',

	/* Digital Clock */
	digitNames : ["nul", "een", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht", "negen"],
	digitTimeFormat : ['h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'],
	
	/* MobiScroll */
	dateOrder: 'dmmy',
    timeWheels: 'Hii',
    timeFormat: 'H:ii',
    monthText: 'Maand',
    dayText: 'Dag',
    yearText: 'Jaar',
    hourText: 'Uur',
    hourText2: 'uur',
    minuteText: 'Min',
    secText: 'Seconds',
    ampmText: '&nbsp;',
    nowText: 'Nu',
	selectedText: ' Geslecteerd',
	closeText: 'Sluit',
    setText: 'Plaats',
	cancelText : 'Annuleer',
    clearText: 'Leeg',
    ariaDesc: 'Selecteer een optie',
    
	/* Calender */
	doneText: 'gereed',
	prevText: 'vorige',
    nextText: 'volgende',
    currentText: 'vandaag',
	CALENDAR_EVENTS : 'activiteiten',
    CALENDAR_NO_ROWS: '<ul><li style="padding-left: 23px; font-size: 23px; font-weight:normal;">geen activiteiten gevonden voor deze datum.</li></ul>',
	CALENDAR_SORT_BY: 'soorteer op:',
	CALENDAR_TIME: 'tijd',
	CALENDAR_TITLE: 'titel',
	CALENDAR_PRIORITY: 'prioriteit',
	weekHeader: 'Wk',
	firstDay: 0,
	addText : "voeg activiteit toe",
	saveText : "bewaar",
	saveText2 : "vul hier in",
	herhaal : [' herhaal elke dag', ' herhaal elke maand', ' herhaal elke week', ' herhaal niet'],
	herhaalText : "herhaal",
	defaultMessage : "ANDERS",
	
	
	/* Menu */
	calander : "activiteiten agenda",
	setting : "instellingen",
	
	
	/* Settings */
	typeclock : "klok type",
	typeclockdigitaal : "digitaal",
	typeclockmodern : "modern",
	typeclockclassic : "klassiek",
	clocksound : "klok geluid",
	clocksoundOn : "aan",
	fontName : "melding balk",
	fontNameSmall : "klein",
	fontNameNormal : "normaal",
	fontNameBig : "groot",
	blinkTime: "knipperen",
	alarmTime: "melding",
	sound : "geluid",
	sound4 : "melodie",
	sound7 : "vogels",
	sound8 : "bel",
	sound9 : "harp",
	sound10 : "alarm",
	sound11 : "marimba",
	sound12 : "loop",
	
	
	backgroundColor : "achtergrond",
	backgroundColorWhite: "wit",
	backgroundColorBlack: "zwart",
	backgroundColorGray: "grijs",
	fotoType : "foto",
	fotoTypeNone: "geen",
	fotoTypeSeason: "seizoen",
	fotoTypeOwn: "eigen",
	fotoPosition : "positie foto",
	fotoPositionClock: "klok",
	fotoPositionPlane: "vlak",
	addFoto: "voeg foto toe",
	removeFotoText: "de foto is verwijderd",
	weerText: "weer",
	taalText: "taal",
	noorsText: "noors",
	engelsText: "engels",
	nederlandsText: "nederlands",
	upgradeText: "upgrade",
	emailText: "email",
	serialText: "serienummer",
	bevestigText: "bevestig",
	foutieveInputText: "Er is een ongeldige waarde ingevuld",
	serialTakenText: "Deze serienummer is al in gebruik",
	correcteInputText: "Het upgraden is geslaagd. Wij wensen u veel gebruiksgemak",
	upgradeGuidance: '<br><br><a href="http://clockaid.com">klik hier</a> voor meer informatie en de aanschaf van het gewenste Clockaid product!'
	
};
