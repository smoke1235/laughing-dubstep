/* global clockAidLang*/
/**
 * Version: 1.0
 * Build Date: 20-12-2013
 * Copyright (c) 2013, Drukkerij Teeuwen. (http://www.drukkerijteeuwen.nl/). All rights reserved.
 */

clockAidLang["en-EN"] = 
{
    name : "en-EN",
    englishName: "English (United States)",
    nativeName: "English (United States)",
	
	monthNames : ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
    monthNamesShort : ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
    dayNames : ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    dayNamesShort : ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
	dayNamesMin : ["su", "mo", "tu", "we", "th", "fr", "sa"],
	dateFormat: 'dd/mm/yy',
	dayPeriodText : ['night', 'morning', 'morning', 'noon', 'evening'],
	sesionPeriodText : ["spring", "summer", "autumn", "winter"],
	off : "off",
	
	icons : [
		{val : "icoon1", text: 'OTHER'},
		{val : "icoon2", text: 'MEDICINE'},
		{val : "icoon3", text: 'VISITOR'},
		{val : "icoon4", text: 'EAT'},
		{val : "icoon5", text: 'SLEEP'},
		{val : "icoon6", text: 'PHYSICIAN'},
		{val : "icoon7", text: 'BATHE'}
	],
	iconsDefault : 'OTHER',

	/* Digital Clock */
	digitNames : ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],  
	digitTimeFormat : ['h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'],
	
	/* MobiScroll */
	dateOrder: 'dmmy',
    timeWheels: 'Hii',
    timeFormat: 'H:ii',
    monthText: 'Month',
    dayText: 'Day',
    yearText: 'Year',
    hourText: 'Hour',
    hourText2: 'O`Clock',
    minuteText: 'Min',
    secText: 'Seconds',
    ampmText: '&nbsp;',
    nowText: 'Now',
	selectedText: ' Selected',
	closeText: 'Close',
    setText: 'Set',
	cancelText : 'Cancel',
    clearText: 'Clear',
    ariaDesc: 'Select option',
    
	/* Calender */
	doneText: 'ready',
	prevText: 'previous',
    nextText: 'next',
    currentText: 'today',
	CALENDAR_EVENTS : 'activities',
    CALENDAR_NO_ROWS: '<ul><li>no events found for this date.</li></ul>',
	CALENDAR_SORT_BY: 'sort by:',
	CALENDAR_TIME: 'time',
	CALENDAR_TITLE: 'title',
	CALENDAR_PRIORITY: 'priority',
	weekHeader: 'Wk',
	firstDay: 0,
	addText : "add activity",
	saveText : "save",
	saveText2 : "fill out",
	herhaal : [' REPEAT EVERY DAY', ' REPEAT EVERY WEEK', ' REPEAT EVERY MONTH', ' DO NOT REPEAT'],
	herhaalText : "repeat",
	defaultMessage : "OTHER",
	
	
	/* Menu */
	calander : "activity calendar",
	setting : "settings",
	
	
	/* Settings */
	typeclock : "clock type",
	typeclockdigitaal : "digital",
	typeclockmodern : "modern",
	typeclockclassic : "classic",
	clocksound : "clock audio",
	clocksoundOn : "on",
	fontName : "notification bar",
	fontNameSmall : "small",
	fontNameNormal : "normal",
	fontNameBig : "big",
	blinkTime: "blink time",
	alarmTime: "alarm time",
	sound : "sound notification",
	sound4 : "melody",
	sound7 : "birds",
	sound8 : "bell",
	sound9 : "harp",
	sound10 : "alarm",
	sound11 : "mariba",
	sound12 : "loop",
	
	
	backgroundColor : "background color",
	backgroundColorWhite: "white",
	backgroundColorBlack: "black",
	backgroundColorGray: "gray",
	fotoType : "photo type",
	fotoTypeNone: "none",
	fotoTypeSeason: "season",
	fotoTypeOwn: "own",
	fotoPosition : "photo position",
	fotoPositionClock: "clock",
	fotoPositionPlane: "plane",
	addFoto: "add photo",
	removeFotoText: "the photo has been removed",
	weerText: "weather",
	taalText: "language",
	noorsText: "norse",
	engelsText: "english",
	nederlandsText: "dutch",
	upgradeText: "upgrade",
	emailText: "mail",
	serialText: "serial nr",
	bevestigText: "confirm",
	foutieveInputText: "An invalid value is entered",
	serialTakenText: "Serial is already in use",
	correcteInputText: "Upgrade completed. We wish you good benefit!",
	upgradeGuidance: '<br><br><a href="http://clockaid.com/?lang=2">click here</a> for more information and to purchase the right Clockaid product!'
	
};
