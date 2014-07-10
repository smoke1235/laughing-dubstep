/*jshint -W004 */
/*jshint -W003 */
/*jshint -W038 */
/*jshint -W064 */
/*jshint -W027 */
/*jshint -W046 */
/*jshint -W083 */
/*jshint -W020 */
/*jslint eqeq: true*/
/*jshint eqeqeq:false*/
/*global	$, 
			androidVERSION, 
			iosVERSION, 
			clockAidLang, 
			lang, 
			apiDebug, 
			userID, 
			api, 
			serverAdres, 
			loadSettingsIsDone, 
			clockType, saveText
			intervalTimeCheck, 
			paddingContentBox, 
			season, 
			moment, 
			calender, 
			closeMenu, 
			swithView, 
			saveSetting, 
			saveEvent, 
			clockTypeRemember, 
			addFoto,
			editEvent,
			calendarArray,
			length2Org,
			firstCounter,
			clockArray,
			myAnalogClock,
			AnalogClock,
			CoolClock,daySplit,
			objDay,
			nowDay,
			AlarmHasBeen,
			finalIsPlayed,
			ReminderIsPlayed,
			soundStart,
			soundStop,
			c,
			d,
			timeTime,
			blinkerTime,
			blinktime,
			alarmTimer,
			alarmTime,
			store,
			alert,
			clockStart, 
			clockStop, 
			setCurrentSeason, 
			placeWeather, 
			Search_Array,
			calendar_items,
			resetScrollHeight,
			weatherPlaceID, 
			self,
			checkIfUpdateNeeded,
			newItemsLength,
			Android,
			createjs,
			playing, 
			fotoPos, 
			playing:false, 
			tempPlay:false, 
			binInPlaceSelectBoxesWeather:false, 
			binInPlaceSelectBoxesWeatherOnce:false, 
			weatherPlaceIDChanged:false,
			internet,
			apiScroll,
			weatherContinentID:1, 
			weatherCountryID:21,
			weatherProvinceID:11115,
			weatherPlaceID:186884,
			mail_client,
			productType,
			langBefore,
			intervalTimeCheck,
			isAndroid,
			width,
			height,
			tikclock,
			unset
*/

/////////////////////////////////////////
////// BEGIN ALWAYS THE SAME VARS ///////
/////////////////////////////////////////

var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/),
	weekday = new Array(7),
	months = new Array(12),
	curTime,
	dayNight,
	dayNight2,
	TimerEnded = "no",
	settingTimer = 0,
	httpPath = "http://clockaid-work.onegoal.nl/",
	nacht = "",
	orientationchangeJaNee = "nee",
	i = 1,
	playList = [],
	currentSongIndex = 0,
	tikTakIndex = "",
	repeatTheSong = 0,
	photoList = [];
	
// Week Dagen
weekday[0] = "zondag";
weekday[1] = "maandag";
weekday[2] = "dinsdag";
weekday[3] = "woensdag";
weekday[4] = "donderdag";
weekday[5] = "donderdag";
weekday[6] = "zaterdag";

// Maanden	
months[1] = "januari";
months[2] = "februari";
months[3] = "maart";
months[4] = "april";
months[5] = "mei";
months[6] = "juni";
months[7] = "juli";
months[8] = "augustus";
months[9] = "september";
months[10] = "oktober";
months[11] = "november";
months[12] = "december";

/////////////////////////////////////////
/////// BEGIN STANDAARD FUNCTIONS ///////
/////////////////////////////////////////

/**
 * Check of a object is empty
 *
 * @param Object obj
 * @return true/false
 */
function isObjectEmpty(obj)
{
    for(var key in obj)
	{
        if(obj.hasOwnProperty(key)){
            return false;
		}
    }
    return true;
}

/**
 * I Need Commpent
 *
 * @param * width
 * @param * height
 * @param * rotateOrSpec
 */
function daySeasonDate(width, height, rotateOrSpec)
{
	var streepjeJaNee = "",	
		br = " ",
		enterJaNee = "",
		streepje = '<span class="streepje"> | </span>',
		bk_backupdate = jQuery("#backupDate").html(),
		streepjeJaNee = "",
		orient = getOrientation();
	
	if(rotateOrSpec || bk_backupdate !== jQuery("#textHolder #text").html())
	{
		if(orient === "horz")
		{
			if(parseInt(clockType, 10) === 0)
			{
				streepjeJaNee = '<span class="streepje"> | </span>';	
			}
			else
			{
				br = "<br>";
				enterJaNee = "<br>";	
			}
		}
		else
		{
			enterJaNee = "<br>";	
		}
		
		var firstDate = new Date(),
			month = firstDate.getMonth(),
			dateContent = firstDate.getUTCDate()+" "+ clockAidLang[lang].monthNames[month] +" "+firstDate.getFullYear(),
			hours = firstDate.getHours(),
			minutes = firstDate.getMinutes(),
			dayName = clockAidLang[lang].dayNames[firstDate.getDay()],
			seasonName = setCurrentSeason(false);
		
		setCurrentTimePart(hours, minutes);
		dayNight = setCurrentDayPart(curTime);
		jQuery("#backupDate #dateContent").html(dateContent);
		jQuery("#backupDate #dayNight").html('<span class="dayName">'+dayName+br+"</span>"+dayNight+streepje+seasonName+enterJaNee+streepjeJaNee);
		
		if(bk_backupdate !== jQuery("#backupDate").html())
		{
			jQuery("#textHolder #dateContent").html(dateContent);
			jQuery("#textHolder #dayNight").html('<span class="dayName">'+dayName+br+"</span>"+dayNight+streepje+seasonName+enterJaNee+streepjeJaNee);
		}
	}
}

/**
 * I Need Commpent
 *
 * @param * id
 * @param * valueText
 */
function placeSelectBoxesWeather(id, valueText)
{
	if (parseInt(internet, 10) === 0)
	{
		$("#Continents").show();
		$("#Countries").show();
		$("#Provinces").show();
		$("#Places").show();
		
		if(!id || id === "undefined")
		{
			id = "";
		}
		
		if(!valueText || valueText === "undefined")
		{
			valueText = "";
		}
		if(binInPlaceSelectBoxesWeather === true)
		{
			var valueContinent = $(".continent").scroller("getValue"),
				valueCountry = $(".country").scroller("getValue"),
				valueProvince = $(".province").scroller("getValue"),
				valuePlace = $(".place").scroller("getValue");
		}
		else
		{
			var valueContinent = weatherContinentID,
				valueCountry = weatherCountryID,
				valueProvince = weatherProvinceID,
				valuePlace = weatherPlaceID;
		}
		if(id === "country"){
			valueProvince = false;
			valuePlace = false;
		}
		else if(id === "province"){
			valuePlace = false;
		}
		
		if(!binInPlaceSelectBoxesWeather){
			binInPlaceSelectBoxesWeather = true;
		}
			binInPlaceSelectBoxesWeatherOnce = true;
		$.ajax(
		{
			type: "POST",
			url: httpPath + "weather_place.php",
			data:{
				//"langID" : lang, 
				"id" : id, 
				"value" : valueText, 
				"valueContinent" : valueContinent, 
				"valueCountry" : valueCountry, 
				"valueProvince" : valueProvince, 
				"valuePlace" : valuePlace 
			}
		}).done(function( msg )
		{	
			var obj = jQuery.parseJSON( msg );
			//console.info("verdieping ="+obj.verdieping);
			if(obj.error)
			{
				$("#Continents").hide();
				$("#Countries").hide();
				$("#Provinces").hide();
				$("#Places").hide();
			}
			else
			{
				$("#Continents").html(obj.selectbox[0]);
				
				if(obj.verdieping < 2)
				{
					$("#Countries").html(obj.selectbox[1]);
				}
				
				if(obj.verdieping < 3)
				{
					$("#Provinces").html(obj.selectbox[2]);
				}
				
				$("#Places").html(obj.selectbox[3]);
				
				var settings =	{
					theme: "ios", 
					mode: "scroller", 
					display: "inline"
				};
				
				$(".continent, .country, .province, .place").scroller("destroy").scroller(
					$.extend({ 
						preset: "select",
						height: 35
					}, 
					settings,
					{
						onChange: function(valueText, inst)
						{
							placeSelectBoxesWeather(this.id, '"'+valueText+'"');
						}
					})
				);
				
				$("#continent_dummy").hide();
				$("#country_dummy").hide();
				$("#province_dummy").hide();
				$("#place_dummy").hide();
			}
		});
	}
	else
	{
		$("#Continents").hide();
		$("#Countries").hide();
		$("#Provinces").hide();
		$("#Places").hide();
	}
}

/**
 * I Need Commpent
 *
 * @param * clockTypeID
 * @param * mainCall
 * @param * height
 * @param * width  
 */
function placeWeather(clockTypeID, mainCall, height, width)
{
	if (parseInt(productType, 10) > 2 && parseInt(internet, 10) === 0)
	{
		var weatherColor = $("#weather").css("color"),
			showBgColor = "yes",
			orient = getOrientation(),
			colorImage = "green";

		if(orient === "horz")
		{
			if(parseInt(clockType, 10) !== 0)
			{
				showBgColor = "no";
			}
		}
		if(weatherColor === "rgb(255, 255, 255)")
		{
			colorImage = "white";
		}
		
		$.ajax({
			type: "POST",
			url: httpPath + "weather_3.php",
			data: {
				"langID" : lang, 
				"orient" : jQuery("body").attr("class"), 
				"clockTypeID" : clockTypeID, 
				"colorImage": colorImage, 
				"weatherPlaceID": weatherPlaceID
			}
		}).done(function( msg )
		{
			var obj = jQuery.parseJSON( msg );
			$("#weather").html(obj.html);
			
			if(showBgColor === "yes")
			{
				$("#weather_container").css("background-color", $(".color").val());
			}
			else
			{
				$("#weather_container").css("background-color", "transparent");
			}
		});
	
		if(mainCall)
		{
			setTimeout(function()
			{
				placeWeather(clockType, true, height, width);
			}, 1800000);
		}
		
		weatherShow();
	}
}

/**
 * I Need Commpent
 *
 */
function serialChange() 
{
	var valueUpgradeKey2 = $("#upgradeKey").val();
	var valueUpgradeKey = valueUpgradeKey2.replace(" ", "");
	var count = valueUpgradeKey.length;
		
	if($("#upgradeKey").attr("count") < count)
	{
		if(count === 5 || count === 11 || count === 17 || count === 23 || count === 29 || count === 35)
		{
			$("#upgradeKey").val(valueUpgradeKey+"-");
		}
		else
		{
			$("#upgradeKey").val(valueUpgradeKey);
		}
	}
	
	$("#upgradeKey").attr("count", count);
}

/**
 * I Need Commpent
 *
 */
function saveNewType()
{
	if (parseInt(internet, 10) === 0)
	{
		var code = $("#upgradeKey").val(),
			email = $("#emailUpgrade").val(),
			foutieveInputText		= clockAidLang[lang].foutieveInputText,
			serialTakenText		= clockAidLang[lang].serialTakenText,
			correcteInputText		= clockAidLang[lang].correcteInputText;
		
		$.ajax({
			type: "POST",
			url: httpPath + "saveCode.php",
			data: {
				"foutieveInputText" : foutieveInputText, 
				"serialTakenText" : serialTakenText, 
				"correcteInputText" : correcteInputText, 
				"code" : code, 
				"email" : email
			}
		}).done(function( msg )
		{
			var obj = jQuery.parseJSON( msg );
			
			if(obj.error)
			{
				if (window.Android)
				{
					// Action to show the android message
					Android.showAlert(obj.error);
				}
				else
				{
					alert(obj.error);
				}
				
				$("#upgradeKey").val("");
				$("#emailUpgrade").val("");
			}
			else
			{
				productType = obj.newType;
				mail_client = obj.mail;
				
				// Update the iPad/Android Tablet met een nieuwe serial code
				if (window.Android)
				{
					// Action to show the android message
					Android.showAlert(obj.message);
					
					// doe Android action here
					Android.call(code);
				}
				else
				{
					alert(obj.message);
					NativeBridge.call(code);
				}
				
				saveSetting();
				swithView("clock");
				$("#coverBegin").removeClass("RotateBack");
				$("body").attr("SpecialAction", true);
			}
		});
	}
}

/**
 * I Need Commpent
 *
 */
function weatherShow()
{
	if(loadSettingsIsDone && !jQuery("#weather").hasClass("hide") && jQuery("div.current").attr("id") === "container")
	{
		$("#weather_container").show();
		$("#weather_container").transition({
			y: 0,
			rotateX: "0deg",
			duration: 3000
		});
		
		setTimeout(function()
		{
			$("#weather_container").transition({
				y: -$("#weather_container").innerHeight(),
				rotateX: "180deg",
				duration: 3000
			});
		}, 5000);
		setTimeout(function(){weatherShow();}, 22000);
	}
	else
	{
		$("#weather_container").transition({
			y: -$("#weather_container").innerHeight(),
			rotateX: "180deg",
			duration: 3000
		});
		setTimeout(function(){weatherShow();}, 17000);
	}
}

/**
 * Check IOS Version
 *
 */
function iOSversion()
{
	var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
	if(v)
	{
		return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
	}
}

/**
 * I Need Commpent
 *
 * @param * hours
 * @param * minutes 
 */
function setCurrentTimePart(hours, minutes)
{
	if(minutes.toString().length === 0)
	{
		curTime = parseInt(hours+"00", 10);
	}
	else if(minutes.toString().length === 1)
	{
		curTime = parseInt(hours+"0"+minutes, 10);
	}
	else
	{
		curTime = parseInt(hours+""+minutes, 10);
	}
}

/**
 * I Need Commpent
 *
 * @param * time
 */
function setCurrentDayPart(time)
{
	time = parseInt(time, 10);
	if(time >= 0 && time < 600)
	{
		dayNight2 = clockAidLang[lang].dayPeriodText[0];
		nacht = "ja";
	}
	else if(time >= 600 && time < 900)
	{
		dayNight2 = clockAidLang[lang].dayPeriodText[1];
		nacht = "nee";
	}
	else if(time >= 900 && time < 1200)
	{
		dayNight2 = clockAidLang[lang].dayPeriodText[2];
		nacht = "nee";
	}
	else if(time >= 1200 && time < 1800)
	{
		dayNight2 = clockAidLang[lang].dayPeriodText[3];
		nacht = "nee";
	}
	else if(time >= 1800 && time < 2399)
	{
		dayNight2 = clockAidLang[lang].dayPeriodText[4];
		nacht = "ja";
	}
	
	if(nacht === "ja")
	{
		$("html").addClass("nacht");
	}
	else
	{
		$("html").removeClass("nacht");
	}
	
	return dayNight2;
}

/**
 * Set the currerent season
 *
 * @param * forImage
 */
function setCurrentSeason(forImage)
{
	//Meteorologische seizoenen
	//Lente: 1 maart t/m 31 mei
	//Zomer: 1 juni t/m 31 augustus
	//Herfst: 1 september t/m 30 november
	//Winter: 1 december t/m 28 februari
	
	//Astronomische seizoenen
	//Lente: 21 maart t/m 20 juni
	//Zomer: 21 juni t/m 20 september
	//Herfst: 21 september t/m 20 december
	//Winter: 21 december t/m 20 maart
	
	var seasonDate = new Date(),
		seasonMonth = seasonDate.getMonth() + 1;
	
	if(forImage)
	{
		if(seasonMonth >= 3 && seasonMonth <= 5)
		{
			season = "lente";
		}
		else if(seasonMonth >= 6 && seasonMonth <= 8)
		{
			season = "zomer";
		}
		else if(seasonMonth >= 9 && seasonMonth <= 11)
		{
			season = "herfst";
		}
		else if(seasonMonth === 12 || seasonMonth <= 2)
		{
			season = "winter";
		}
	}
	else
	{
		if(seasonMonth >= 3 && seasonMonth <= 5)
		{
			season = clockAidLang[lang].sesionPeriodText[0];
		}
		else if(seasonMonth >= 6 && seasonMonth <= 8)
		{
			season = clockAidLang[lang].sesionPeriodText[1];
		}
		else if(seasonMonth >= 9 && seasonMonth <= 11)
		{
			season = clockAidLang[lang].sesionPeriodText[2];
		}
		else if(seasonMonth === 12 || seasonMonth <= 2)
		{
			season = clockAidLang[lang].sesionPeriodText[3];
		}
	}
	
	return season;
}



/**
 * I Need Commpent
 *
 * @param * arrayArr
 */
function sortByTime(arrayArr)
{
	arrayArr.sort(function(a, b)
	{
		var a = a.time;
		var b = b.time;
		return a === b ? 0 : (a < b ? -1 : 1);
	});    
}

/**
 * I Need Commpent
 *
 * @param * arrayArr
 */
function sortByTimeDigits(arrayArr)
{
	arrayArr.sort(function(a, b)
	{
		var a = a.time.length;
		var b = b.time.length;
		return a === b ? 0 : (a < b ? -1 : 1);
	});  
}

/**
 * I Need Commpent
 *
 * @param * arrayArr
 */
function removeDubbleTimes(arrayArr)
{
	var out = [],
		len = arrayArr.length - 1,
		j = 0;
	
	if (len >= 0) 
	{
		for (var i = 0;i < len; i++) 
		{
			if (arrayArr[i].time !== arrayArr[i+1].time) 
			{
				out[j] = arrayArr[i];
				j++;
			}
		}
		out[j] = arrayArr[len];
	}
	return out;          
}

/**
 * I Need Commpent
 *
 * @param * id
 */
function digitalClock(id)
{
	var clock = $("#"+id),
	
	// Map digits to their names (this will be an array)
	digit_to_name = "zero one two three four five six seven eight nine".split(" "),

	// This object will hold the digit elements
	digits = {},

	// Positions for the hours, minutes, and seconds
	positions = [
		"h1", "h2", ":", "m1", "m2", ":", "s1", "s2"
	],
	
	// Generate the digits with the needed markup,
	// and add them to the clock
	digit_holder = clock.find(".digits");
	
	clock.html('<div class="display"><div class="ampm"></div><div class="digits"></div></div>');
	
	$.each(positions, function()
	{
		if(this === ":")
		{
			digit_holder.append('<div class="dots">');
		}
		else
		{
			var pos = $("<div>");
			for(var i=1; i<8; i++)
			{
				pos.append('<span class="d' + i + '">');
			}

			// Set the digits as key:value pairs in the digits object
			digits[this] = pos;

			// Add the digit elements to the page
			digit_holder.append(pos);
		}
	});
	// Run a timer every second and update the clock

	(function update_time()
	{
		// Use moment.js to output the current time as a string
		// hh is for the hours in 12-hour format, HH is for the hours in 24-hour format,
		// mm - minutes, ss-seconds (all with leading zeroes),
		// d is for day of week and A is for AM/PM
		var now = moment().format("HHmmss");
		
		////// REMOVE THIS TO SEE THE SECONDS AGAIN //////
		////// REMOVE THIS TO SEE THE SECONDS AGAIN //////
		$(".digits div:nth-child(6)").last().hide();
		$(".digits div:nth-child(7)").last().hide();
		$(".digits div:nth-child(8)").last().hide();
		////// REMOVE THIS TO SEE THE SECONDS AGAIN //////
		////// REMOVE THIS TO SEE THE SECONDS AGAIN //////
		
		//original
		digits.h1.attr("class", digit_to_name[now[0]]);
		digits.h2.attr("class", digit_to_name[now[1]]);
		digits.m1.attr("class", digit_to_name[now[2]]);
		digits.m2.attr("class", digit_to_name[now[3]]);
		digits.s1.attr("class", digit_to_name[now[4]]);
		digits.s2.attr("class", digit_to_name[now[5]]);

		// The library returns Sunday as the first day of the week.
		// Stupid, I know. Lets shift all the days one position down, 
		// and make Sunday last

		var dow = now[6];
		dow--;
		
		// Sunday!
		if(dow < 0)
		{
			// Make it last
			dow = 6;
		}
		// Schedule this function to be run again in 1 sec
		setTimeout(update_time, 1000);
	})();
}

/**
 * I Need Commpent
 *
 * @param * id
 */
function numberClock(id)
{
	var clock = $("#"+id);
	clock.html('<div id="cijfersClockSpecial" class="display"><span class="uur1"></span><span class="uur2"></span><span class="dubbelepunt">:</span><span class="min1"></span><span class="min2"></span><span class="dubbelepuntSec">:</span><span class="sec1"></span><span class="sec2"></span></div>');
	
	////// REMOVE THIS TO SEE THE SECONDS AGAIN //////
	////// REMOVE THIS TO SEE THE SECONDS AGAIN //////
	$("#cijfersClockSpecial .dubbelepuntSec").last().hide();
	$("#cijfersClockSpecial .sec1").last().hide();
	$("#cijfersClockSpecial .sec2").last().hide();
	////// REMOVE THIS TO SEE THE SECONDS AGAIN //////
	////// REMOVE THIS TO SEE THE SECONDS AGAIN //////
		
	// Run a timer every second and update the clock
	(function update_NumberTime()
	{
		// Use moment.js to output the current time as a string
		// hh is for the hours in 12-hour format, HH is for the hours in 24-hour format,
		// mm - minutes, ss-seconds (all with leading zeroes),
		// d is for day of week and A is for AM/PM
		var now = moment().format("HHmmss");
		$(".uur1").html(now[0]);
		$(".uur2").html(now[1]);
		$(".min1").html(now[2]);
		$(".min2").html(now[3]);
		$(".sec1").html(now[4]);
		$(".sec2").html(now[5]);

		// Schedule this function to be run again in 1 sec
		setTimeout(function(){update_NumberTime();}, 1000);
	})();
}

/**
 * I Need Commpent
 *
 */
function getOrientation()
{
	if(isAndroid)
	{
		window.isPortrait=(window.innerHeight/window.innerWidth)>1;
		
		if(!window.isPortrait || height < width)
		{
			return "horz";
		}
		else
		{
			return "vert";
		}
	}
	else
	{
		if(window.orientation === 90 || window.orientation === -90 || height < width)
		{
			return "horz";
		}
		else
		{
			return "vert";
		}
	}
}

/**
 * I Need Commpent
 *
 */
function loadAgenda()
{
	$("#calendar").calendar({
		events_array: calendarArray,
		show_iScroller: true,
		order_by: 1
	});
	
	calender = $("#calendar").data("calendar");
}

/////////////////////////////////////////
/////// EINDE ALWAYS THE SAME VARS //////
/////////////////////////////////////////

/**
 * I Need Commpent
 *
 */
function loadLanguages()
{
	// Translate Action
	langBefore = lang;
	var setting					= clockAidLang[lang].setting,
		calander				= clockAidLang[lang].calander,
		typeclock				= clockAidLang[lang].typeclock,
		clocktypedigitaal		= clockAidLang[lang].typeclockdigitaal,
		clocktypemodern			= clockAidLang[lang].typeclockmodern,
		clocktypeclassic		= clockAidLang[lang].typeclockclassic,
		clocksound				= clockAidLang[lang].clocksound,
		clocksoundON			= clockAidLang[lang].clocksoundOn,
		off						= clockAidLang[lang].off,
		fontName				= clockAidLang[lang].fontName,
		fontNameSmall			= clockAidLang[lang].fontNameSmall,
		fontNameNormal			= clockAidLang[lang].fontNameNormal,
		fontNameBig				= clockAidLang[lang].fontNameBig,
		blinktimeName			= clockAidLang[lang].blinkTime,
		alarmtime				= clockAidLang[lang].alarmTime,
		sound					= clockAidLang[lang].sound,
		sound4					= clockAidLang[lang].sound4,
		sound7					= clockAidLang[lang].sound7,
		sound8					= clockAidLang[lang].sound8,
		sound9					= clockAidLang[lang].sound9,
		sound10					= clockAidLang[lang].sound10,
		sound11					= clockAidLang[lang].sound11,
		sound12					= clockAidLang[lang].sound12,
		backgroundColor			= clockAidLang[lang].backgroundColor,
		backgroundColorWhite	= clockAidLang[lang].backgroundColorWhite,
		backgroundColorBlack	= clockAidLang[lang].backgroundColorBlack,
		backgroundColorGray		= clockAidLang[lang].backgroundColorGray,
		fotoType				= clockAidLang[lang].fotoType,
		fotoTypeNone			= clockAidLang[lang].fotoTypeNone,
		fotoTypeSeason			= clockAidLang[lang].fotoTypeSeason,
		fotoTypeOwn				= clockAidLang[lang].fotoTypeOwn,
		fotoPosition			= clockAidLang[lang].fotoPosition,
		fotoPositionClock		= clockAidLang[lang].fotoPositionClock,
		fotoPositionPlane		= clockAidLang[lang].fotoPositionPlane,
		addFoto					= clockAidLang[lang].addFoto,
		weerText				= clockAidLang[lang].weerText,
		taalText				= clockAidLang[lang].taalText,
		noorsText				= clockAidLang[lang].noorsText,
		engelsText				= clockAidLang[lang].engelsText,
		nederlandsText			= clockAidLang[lang].nederlandsText,
		upgradeText				= clockAidLang[lang].upgradeText,
		emailText				= clockAidLang[lang].emailText,
		serialText				= clockAidLang[lang].serialText,
		bevestigText			= clockAidLang[lang].bevestigText,
		upgradeGuidance			= clockAidLang[lang].upgradeGuidance;
	
	$(".agendaClick").html(calander);
	$(".settingsClick").html(setting);
	$(".calender .page_title").html(calander);
	$(".settings .page_title").html(setting);
	$(".addFotoText").html(addFoto);
	
	// Clock Type Setting
	$(".typeclock").attr("name", typeclock);
	$(".typeclock .digitaal").html(clocktypedigitaal);
	$(".typeclock .modern").html(clocktypemodern);
	$(".typeclock .classic").html(clocktypeclassic);
	
	// Clock Audio Setting
	$(".tikclock").attr("name", clocksound);
	$(".tikclock .on").html(clocksoundON);
	$(".tikclock .off").html(off);
	
	// Melding bar Setting
	$(".font").attr("name", fontName);
	$(".font .small").html(fontNameSmall);
	$(".font .normal").html(fontNameNormal);
	$(".font .big").html(fontNameBig);
	
	// Blink Setting
	$(".blinktime").attr("name", blinktimeName);
	
	// Alarm setting
	$(".alarmtime").attr("name", alarmtime);										
	
	// Sound Setting
	$(".sound").attr("name", sound);											
	$(".sound .off").html(off);
	$(".sound .sound4").html(sound4);
	$(".sound .sound7").html(sound7);
	$(".sound .sound8").html(sound8);
	$(".sound .sound9").html(sound9);
	$(".sound .sound10").html(sound10);
	$(".sound .sound11").html(sound11);
	$(".sound .sound12").html(sound12);
	
	// Upgrade page
	$("#container_upgrade .page_title").html(upgradeText);
	$("#upgradeTxt").html(upgradeGuidance);
	$("#updateButton1").html(upgradeText);
	$("#updateButton2").html(upgradeText);
	$("#emailUpgrade").attr("placeholder", emailText);	
	$("#upgradeKey").attr("placeholder", upgradeText);	
	$("#upgradeButton").html(bevestigText);
	
	
	// Weer Setting
	$(".continent").attr("name", weerText);
	
	// Language Setting
	$(".language").attr("name", taalText);
	$(".language .nl").html(nederlandsText);
	$(".language .en").html(engelsText);
	$(".language .nb").html(noorsText);
	
	// Color Setting
	$(".color").attr("name", backgroundColor);
	$(".color .white").html(backgroundColorWhite);
	$(".color .black").html(backgroundColorBlack);
	$(".color .gray").html(backgroundColorGray);
            
	// Foto Type Setting
	$(".foto").attr("name", fotoType);
	$(".foto .none").html(fotoTypeNone);
	$(".foto .season").html(fotoTypeSeason);
	$(".foto .own").html(fotoTypeOwn);
	
	// Foto Position
	$(".fototype").attr("name", fotoPosition);
	$(".fototype .fotoClock").html(fotoPositionClock);
	$(".fototype .fotoPlane").html(fotoPositionPlane);
	setTimeout(function()
	{
		if(parseInt(productType, 10) === 6)
		{
            var settings =	{
				theme: "ios", 
				mode: "scroller", 
				display: "inline"
				};
           
			$(".color, .fototype, .tikclock, .typeclock, .foto, .language").scroller("destroy").scroller(
                $.extend({ 
                    preset: "select",
                    height: 35
                }, 
                settings,
                {
                    onChange: function(valueText, inst)
					{
                        if(valueText === "Geen" || valueText === "geen" || valueText === clockAidLang[lang].fotoTypeNone)
						{
                            $("#container_settings .filesdynamic").hide();
                            //$("#container_settings .div_nav").css("visibility", "hidden");
                        }
						else if(valueText === "Eigen" || valueText === "eigen" || valueText === clockAidLang[lang].fotoTypeOwn)
						{
                           $(".ownImages").show();
                           $(".seasonImages").hide();
                           $("#container_settings .filesdynamic").show();
                           //$("#container_settings .div_nav").css("visibility", "visible");
                        }
						else if(valueText === "Seizoen" || valueText === "seizoen" || valueText === clockAidLang[lang].fotoTypeSeason || valueText === "âˆšâ€¢rstid")
						{	
                            $(".ownImages").hide();
                            $(".seasonImages").show();
                            $("#container_settings .filesdynamic").show();
                            //$("#container_settings .div_nav").css("visibility", "hidden");
                        }
						else if(valueText === "Digitaal" || valueText === "digitaal" || valueText === clockAidLang[lang].typeclockdigitaal)
						{
                            $(".fototype").scroller("setValue", "fotobg");
                            $(".tikclock").scroller("setValue", "0");
                        }
                    }
                })
            );
			
            $("#color_dummy").hide();
            $("#fototype_dummy").hide();
            $("#fontsize").hide();
            $("#clocktype_dummy").hide();
            $("#clocktik_dummy").hide();
            $("#blinktime").hide();
            $("#alarmtime").hide();
            $("#sound").hide();
            $("#foto_dummy").hide();
            $("#language_dummy").hide();
			$(".dw-select").css("margin-top", "50px");
		}
		else
		{
            var settings =	{
				theme: "ios", 
				mode: "scroller", 
				display: "inline"
			};
            
			$(".color, .fototype, .tikclock, .font, .typeclock, .blinktime, .alarmtime, .sound, .foto, .language").scroller("destroy").scroller(
                $.extend({ 
                    preset: "select",
                    height: 35
                }, 
                settings,
                {
                    onChange: function(valueText, inst)
					{
                        if(valueText === "Geen" || valueText === "geen" || valueText === clockAidLang[lang].fotoTypeNone)
						{
                            $("#container_settings .filesdynamic").hide();
                            //$("#container_settings .div_nav").css("visibility", "hidden");
                        }
						else if(valueText === "Eigen" || valueText === "eigen" || valueText === clockAidLang[lang].fotoTypeOwn)
						{
                            $(".ownImages").show();
                            $(".seasonImages").hide();
                            $("#container_settings .filesdynamic").show();
                            //$("#container_settings .div_nav").css("visibility", "visible");
                        }
						else if(valueText === "Seizoen" || valueText === "seizoen" || valueText === clockAidLang[lang].fotoTypeSeason || valueText === "âˆšâ€¢rstid")
						{	
                            $(".ownImages").hide();
                            $(".seasonImages").show();
                            $("#container_settings .filesdynamic").show();
                            //$("#container_settings .div_nav").css("visibility", "hidden");
                        }
						else if(valueText === "Digitaal" || valueText === "digitaal" || valueText === clockAidLang[lang].typeclockdigitaal)
						{
                            $(".fototype").scroller("setValue", "fotobg");
                            $(".tikclock").scroller("setValue", "0");
                        }
                    }
                })
            );
			
            $("#color_dummy").hide();
            $("#fototype_dummy").hide();
            $("#fontsize_dummy").hide();
            $("#clocktype_dummy").hide();
            $("#clocktik_dummy").hide();
            $("#blinktime_dummy").hide();
            $("#alarmtime_dummy").hide();
            $("#sound_dummy").hide();
            $("#foto_dummy").hide();
            $("#language_dummy").hide();
			$(".dw-select").css("margin-top", "50px");
		}
		
	}, 500);
}

/**
 * I Need Commpent
 *
 * @param * byTheSaveSettings
 */
function startTheWholeProcess(byTheSaveSettings)
{
	if(loadSettingsIsDone)
	{
	
		if(isMobile)
		{
			height = jQuery(window).height();
			width = jQuery(window).width();
		}
		else
		{
			height = 786;
			width = 1024;
			jQuery("body").addClass("browser");
		}
		
		var orient = getOrientation();
		
		if(parseInt(productType, 10) <= 2 && parseInt(internet, 10) === 0)
		{
			$("#updateButton1").show();
			$("#updateButton2").hide();
		}
		else if(parseInt(productType, 10) > 2 && parseInt(internet, 10) === 0 && parseInt(productType, 10) !== 4)
		{
			$("#updateButton1").hide();
			$("#updateButton2").show();
		}
		else
		{
			$("#updateButton1").hide();
			$("#updateButton2").hide();
		}
		
		daySeasonDate(width, height, true);			
		jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo, #textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
			height : "0px"
		});
		

		if(parseInt(clockType, 10) === 0)
		{
			TextCalculationDigitalClock(height, width, true, true);
		}
		else
		{
			TextCalculation(height, width, true);
		}
		
		if(orient === "horz")
		{
			jQuery("body").attr("class", "horizontaal");
			
			if(jQuery("div.current").attr("id") === "containter_content_holder" || jQuery("div.current").attr("id") === "container_settings")
			{
				$("#coverBegin").removeClass("RotateBack");
			}
		}
		else
		{
			jQuery("body").attr("class", "verticaal");
			
			if(jQuery("div.current").attr("id") === "containter_content_holder" || jQuery("div.current").attr("id") === "container_settings")
			{
				$("#coverBegin").addClass("RotateBack");
			}
		}
	
		if(!byTheSaveSettings)
		{
			setTimeout(function()
			{
				checkOutTime(intervalTimeCheck);
				//soundStart(true);
			}, 3000);
		}
		
		loadAgenda();
		
		var slideMenuWidth = $(window).width() - (paddingContentBox * 2);
		$("#slidedownmenu").width(slideMenuWidth);
		$("#slidedownmenu").css("padding", "0px "+paddingContentBox+"px");
		$("#slidedownmenu .slidedownmenuBox").width(slideMenuWidth+"px");
		
		if(jQuery("div.current").attr("id") !== "containter_content_holder" && jQuery("div.current").attr("id") !== "container_settings")
		{
			$("#coverBegin").removeClass("RotateBack");
		}
		
		if(byTheSaveSettings)
		{
			checkIfUpdateNeeded(false);
		}
		else
		{
			checkIfUpdateNeeded(true);
		}
		
		if(!binInPlaceSelectBoxesWeatherOnce)
		{
			placeSelectBoxesWeather("", "");
		}
		setTimeout(function(){
			if(parseInt(internet, 10) === 0)
			{
				if(byTheSaveSettings)
				{
					placeWeather(clockType, false, height, width);
				}
				else
				{
					placeWeather(clockType, true, height, width);
				}
			}
			
			setTimeout(function()
			{
				$("#coverBegin").hide();
				$("#imageClock").show();
			}, 5000);
		}, 6000);
			
		if(parseInt(productType, 10) <= 2 && parseInt(internet, 10) === 0)
		{
			$("#updateButton1").show();
			$("#updateButton2").hide();
		}
		else if(parseInt(productType, 10) > 2 && parseInt(internet, 10) === 0 && parseInt(productType, 10) !== 4)
		{
			$("#updateButton1").hide();
			$("#updateButton2").show();
		}
		else
		{
			$("#updateButton1").hide();
			$("#updateButton2").hide();
		}
	}
}

/**
 * I Need Commpent
 *
 */
$(document).ready(function() 
{
	//get params
	var $_GET = get_query(),
		client = parseInt($_GET["client"], 10);
	
	internet = parseInt($_GET["internet"], 10);
	userID = client;
	isAndroid = navigator.userAgent.match(/(Android)/);
	if(isAndroid){
		tikTakIndex = "5";
	}else{
		tikTakIndex = "3";
	}
	
	$("#imageClock").hide();
	
	store.get("languageID", function(ok, val)
	{
		if (ok)
		{
			if (val === null)
			{
				if($_GET["lang"])
				{
					lang = $_GET["lang"];
					$(".language").val($_GET["lang"]);
				}
				else
				{
					lang = "nl-NL";
					$(".language").val("nl-NL");
				}
			}
			else
			{
				lang = val;
				$(".language").val(val);
			}
		}
	});
	
	store.set("languageID", lang);
	$.cookie("languageID", lang);	
	
	store.set("tikclock", tikclock);
	$.cookie("tikclock", tikclock);
    if(isAndroid)
	{
		androidVERSION = navigator.userAgent.match(/Android\s+([\d\.]+)/)[1];
    }
	else
	{
		var ver = iOSversion();
		if(ver)
		{
			iosVERSION = ver[0];
		}
    }
	
	loadLanguages();
	
	// TODO::Make nickname dynamic
	$("body").update({debug:apiDebug, autoStart:true,nickname:"User1", clientID : userID});
	api = $("body").data("update");
	api.setServerAdres(serverAdres);
	api.getEvents();
	
	//api.debug("Internet : " + internet);
	NativeBridge.setType(parseInt($_GET["typeID"], 10));
	if(parseInt(internet, 10) !== 0)
	{
		// Get the iPad/Android events
		if (window.Android)
		{
			Android.getEvents();
		}
		else
		{
			NativeBridge.getEvents();
		}
	}
	
	jQuery("body").attr("Alarm", "no");	
	jQuery("body").attr("orientationchange", "no");	
	jQuery("body").attr("switchtruefalse", "no");	
	jQuery("body").attr("showCurrentDate", "yes");
	jQuery("body").attr("firsttimeloading", "yes");
	jQuery("body").attr("firstTime", "yes");
	jQuery("body").attr("clockpage", "yes");
	jQuery("body").attr("HideAlert", "no");
	jQuery("body").attr("placeItemTextYesNo", "no");
	jQuery("body").attr("specialAlarmStyling", "no");
	jQuery("body").attr("placeItemTextYesNoSpec", "no");
	jQuery("body").attr("specialalarm", "no");

	$.fx.speeds._default = 600;
	if (!$.support.transition)
	{
		$.fn.transition = $.fn.animate;
	}
	
	startTheWholeProcess(false);
});


var clickObject = 
{
	flag: false,
    isAlreadyClicked: function () 
	{
		var wasClicked = clickObject.flag;
        clickObject.flag = true;
        setTimeout(function () { clickObject.flag = false; }, 100);
        return wasClicked;
    },
	
	test : function(o)
	{
		var currentTarget = o.target;
		var $this = $(currentTarget);
		var clickCounter = $this.data("clickCounter") || 0;

		if (o.type !== "touchmove")
		{
			clickCounter += 1;
		}

		$this.data("clickCounter", clickCounter);

		if (clickCounter === 2)
		{
			return true;
		}
	}
};

//target the entire page, and listen for touch events
$("html, body, .item, #footer, .text").on("tap taphold swipe swiperight swipeleft touchstart touchmove dblclick", function(event)
{
	var currentTarget = event.target,
		t = event.originalEvent.touches[0],
		scrolling = t.clientX,
		orient = getOrientation();
	
	if ($(currentTarget).hasClass("liDay"))	
	{
		calender.ulListDaysOnClick(currentTarget);
	}
	else if ($(currentTarget).hasClass("add") || $(currentTarget).hasClass("addIcon") || $(currentTarget).hasClass("addText"))	
	{
		calender.addEvent();
	}
	else if ($(currentTarget).hasClass("remove"))
	{
		removeEvent($(currentTarget).attr("id"));
	}
	else if ($(currentTarget).attr("id") === "next_month")
	{
		calender.nextMonthOnClick(event);
	}
	else if ($(currentTarget).attr("id") === "prev_month")
	{
		calender.prevMonthOnClick(event);
	}
	else if ($(currentTarget).hasClass("menuClose"))
	{
		closeMenu();
	}
	else if ($(currentTarget).hasClass("item")  && event.originalEvent.type === "touchstart" && event.originalEvent.type !== "touchmove" && event.originalEvent.layerX < 150 || $(currentTarget).hasClass("text") && event.originalEvent.type !== "touchmove" && event.originalEvent.type === "touchstart" && event.originalEvent.layerX < 150)
	{
		placeItemText(event.target.attributes[1].nodeValue);
	}
	else if ($(currentTarget).hasClass("agendaClick"))
	{
		swithView("calender");
		
		if(orient === "vert" && height > width)
		{
			$("#coverBegin").addClass("RotateBack");
		}
		else
		{
			resetScrollHeight();
		}
	}
	else if ($(currentTarget).hasClass("clockClick"))
	{
			swithView("clock");
			saveSetting();
			$("#coverBegin").removeClass("RotateBack");
			$("body").attr("SpecialAction", true);
	}
	else if ($(currentTarget).hasClass("settingsClick"))
	{
		swithView("settings");
		resetScrollHeight();
		if(orient === "vert" && height > width)
		{	
			$("#coverBegin").addClass("RotateBack");
		}
	}
	else if ($(currentTarget).hasClass("saveIcon") || $(currentTarget).hasClass("saveText"))
	{
		saveEvent();
	}
	else if ($(currentTarget).hasClass("saveSetting"))
	{
		saveSetting();
		clockTypeRemember = 99999999;
	}
	else if ($(currentTarget).hasClass("addFoto") || $(currentTarget).hasClass("addFotoIcon") || $(currentTarget).hasClass("addFotoText"))
	{
		NativeBridge.showPhotoView();
		
		/*
		addFoto();		
		$(".ownImages").show();
		$(".seasonImages").hide();
		$("#container_settings .filesdynamic").show();
		$(".foto").scroller("setValue", "eigenfoto");
		*/
	}
	else if (($(currentTarget).hasClass("urgent") || $(currentTarget).hasClass("time") || $(currentTarget).hasClass("icon") || $(currentTarget).hasClass("eventText")) && clickObject.test(event))
	{
		editEvent(currentTarget);
	}
	else if ($(currentTarget).hasClass("upgradeButton"))
	{
		saveNewType();
	}
	else if ($(currentTarget).hasClass("removeFoto"))
	{
		removeFoto(currentTarget);
	}
	else if($(currentTarget).attr("id") === "updateButton")
	{
		NativeBridge.call("12345");
	}
	else if (($(currentTarget).hasClass("updateButton") || $(currentTarget).attr("id") === "updateButton1" || $(currentTarget).attr("id") === "updateButton2"))
	{
		swithView("upgrade");
		if(orient === "vert" && height > width)
		{
			$("#coverBegin").addClass("RotateBack");
		}
		else
		{
			resetScrollHeight();
		}
	}
	
	if ($(currentTarget).attr("id") === "hid" || $(currentTarget).hasClass("input"))
	{
	}
	else
	{
		event.preventDefault();
	}
});
	
window.addEventListener("orientationchange", function() 
{
	closeMenu();
	
	var showBgColor = "yes",
	slideMenuWidth = $(window).width() - (paddingContentBox * 2);
	
	$("body").attr("SpecialAction", true);
	orientationchangeJaNee = "ja";
	clockTypeRemember = 99999999;
	
	$("#slidedownmenu").width(slideMenuWidth);
	$("#slidedownmenu").css("padding", "0px "+paddingContentBox+"px");
	$("#slidedownmenu .slidedownmenuBox").width(slideMenuWidth+"px");
	// Announce the new orientation number
	$("body").attr("orientationChange", "yes");
	
	if(length2Org > 3)
	{
		var apiScroll = jQuery("#footerScroller").data("scrollable");
		apiScroll.seekTo(firstCounter);
	}
	
	
	if(isMobile)
	{
		height = jQuery(window).height();
		width = jQuery(window).width();
	}
	else
	{
		height = 786;
		width = 1024;
		jQuery("body").addClass("browser");
	}
	
	var orient = getOrientation();
	
	if(orient === "horz")
	{
		jQuery("body").attr("class", "horizontaal");
		
		if(jQuery("div.current").attr("id") === "containter_content_holder" || jQuery("div.current").attr("id") === "container_settings")
		{
			$("#coverBegin").removeClass("RotateBack");
		}
		
		if(parseInt(clockType, 10) !== 0)
		{
			showBgColor = "no";
		}
	}
	else
	{
		if(jQuery("div.current").attr("id") === "containter_content_holder" || jQuery("div.current").attr("id") === "container_settings")
		{
			$("#coverBegin").addClass("RotateBack");
		}
		
		jQuery("body").attr("class", "verticaal");
	}
	
	if(jQuery("div.current").attr("id") !== "containter_content_holder" && jQuery("div.current").attr("id") !== "container_settings")
	{
		$("#coverBegin").removeClass("RotateBack");
	}
	
	if(showBgColor === "yes")
	{
		$("#weather_container").css("background-color", $(".color").val());
	}
	else
	{
		$("#weather_container").css("background-color", "transparent");
	}
	
	$("body").attr("SpecialAction", true);
	checkIfUpdateNeeded(false);
	
	setTimeout(function()
	{
		if(parseInt(clockType, 10) === 0)
		{
			TextCalculationDigitalClock(height, width, false, true);
		}
		else
		{
			TextCalculation(height, width, false);
		}
		
		resetScrollHeight();
		
		if(parseInt(internet, 10) === 0)
		{
			placeWeather(clockType, false, height, width);
		}
	}, 1000);
}, false);

/**
 * I Need Commpent
 *
 * @param * ArrayObj
 * @param * SearchFor
 */
function Search_Array(ArrayObj, SearchFor)
{
	var Found = false;
	
	for (var i = 0; i < ArrayObj.length; i++)
	{
		if (ArrayObj[i].time === SearchFor)
		{
			return true;
			var Found = true;
			break;
		}
		else if ((i === (ArrayObj.length - 1)) && (!Found))
		{
			if (ArrayObj[i].time !== SearchFor)
			{
				return false;
			}
		}
	}
}

/**
 * I Need Commpent
 *
 * @param * aantal
 * @param * id
 * @param * time
 * @param * day
 * @param * icon
 * @param * message
 * @param * repeate
 */
function saveToPage(aantal, id, time, day, icon, message, repeate)
{
	//api.debug("saveToPage");
	
	var d = 0,
		pushItem = true,
		melding = {},
		DateNow = new Date(),
		checkArray = [],
		nowMonth = DateNow.getMonth() + 1,
		nowToday = DateNow.getUTCDate()+"-"+nowMonth+"-"+DateNow.getFullYear(),
		clockArrayLength = clockArray.length;
	
	if(!repeate)
	{
		repeate = "not";
		message = icon;
	}
	
	// make a nice object for the clock
	melding.id = i;
	melding.time = time;
	melding.day = day;
	melding.icon = icon;
	melding.message = message;
	melding.repeate = repeate;
	
	i++;
	
	//SETTING UP ARRAY
	for (var e = 0; e < clockArrayLength; e++)
	{
		if(clockArray[e].day === day)
		{
			checkArray[d] = clockArray[e];
			d++;
		}
	}
	
	if (Search_Array(checkArray, melding.time))
	{
		pushItem = false;
	}
	
	if(pushItem)
	{
		clockArray.push(melding);
		calendarArray.push(melding);
	}
	else
	{
		//console.info(melding.message + "dont add");
		//api.debug(melding.message + "dont add");
	}
}

/**
 * I Need Commpent
 *
 */
function resetScrollHeight()
{
	if(jQuery("div.current").attr("id") === "containter_content_holder" && jQuery("#coverBegin").attr("class") !== "RotateBack")
	{
		var contentBoxWidth =  width - (paddingContentBox * 2),
			contentBoxHeight =  height - (paddingContentBox * 2),
			scrollerHeight = height - (100 + (paddingContentBox * 3));
		
		$("#containter_content_holder").css({height : height+"px", width : width+"px"});
		$("#calendar .calendar_list").css({height : scrollerHeight+"px"});
		$("#calendar #list_scroller").css({height : scrollerHeight+"px"});
		
		jQuery("#containter_content_holder .page_content_box").css({
			width: contentBoxWidth+"px", 
			height: contentBoxHeight+"px",
			"margin" : paddingContentBox+"px"
		});
	}
	else if(jQuery("div.current").attr("id") === "containter_content_holder")
	{
		setTimeout(function()
		{
			resetScrollHeight();
		}, 500);
	}
	
	if(jQuery("div.current").attr("id") === "container_settings")
	{
		jQuery("#container_settings").css({
			width: width+"px", 
			height: height+"px"
		});
		
		var contentBoxWidth =  width - (paddingContentBox * 2),
			contentBoxHeight =  height - (paddingContentBox * 2),
			scrollerHeight = height - (100 + (paddingContentBox * 3));
		
		$("#container_settings .file_list").css({height : scrollerHeight+"px"});
		$("#container_settings #file_scroll_listDing").css({height : scrollerHeight+"px"});
		
		jQuery("#container_settings .page_content_box").css({
			width: contentBoxWidth+"px", 
			height: contentBoxHeight+"px",
			"margin" : paddingContentBox+"px"
		});
	}
	
	if(jQuery("div.current").attr("id") === "container_upgrade")
	{
		jQuery("#container_upgrade").css({
			width: width+"px", 
			height: height+"px"
		});
		
		var contentBoxWidth =  width - (paddingContentBox * 2),
			contentBoxHeight =  height - (paddingContentBox * 2);
		
		jQuery("#container_upgrade .page_content_box").css({
			width: contentBoxWidth+"px", 
			height: contentBoxHeight+"px",
			"margin" : paddingContentBox+"px"
		});
	}
}

/**
 * I Need Commpent
 *
 * @param * height
 * @param * width
 * @param * mainCallTextCalc
 * @param * SpecialAction
 */
function TextCalculationDigitalClock(height, width, mainCallTextCalc, SpecialAction)
{
	jQuery("#textHolder #text").removeAttr("style");
	jQuery("#backupDate #text").removeAttr("style");
	jQuery("#textHolder #InformatieBlok").removeAttr("style");
	jQuery("#backupDate #InformatieBlok").removeAttr("style");
	jQuery("#textHolder #ItemInfoBlok").removeAttr("style");
	jQuery("#backupDate #ItemInfoBlok").removeAttr("style");
	jQuery("#textHolder #ItemInfo").removeAttr("style");
	jQuery("#backupDate #ItemInfo").removeAttr("style");
	
	// extra check clocktype
	if(parseInt(clockType, 10) !== 0)
	{
		TextCalculation(height, width, mainCallTextCalc);
		return;
	}
	
	jQuery("#textHolder #text").removeAttr("style");
	daySeasonDate(width, height, true);
	
	var orientation = getOrientation();
	
	if(jQuery("div.current").attr("id") === "container")
	{
		if(SpecialAction && jQuery("body").attr("placeItemTextYesNo") === "no" && jQuery("body").attr("specialalarm") === "no" && jQuery("body").attr("Alarm") !== "yes")
		{
			setTimeout(function()
			{
				var BignessClass = jQuery("body").attr("id"),
					clockCalculation = width - 96,
					clockCalculation2 = width - 72,
					textHolderCalculationH = height - (jQuery("#footerHolder").height() + 2),
					scheidingCalculationW = width - 45;
				
				jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo, #textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
					height : "0px"
				});
				
				jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo").css({
					"padding-bottom" : "0px"
				});				
				
				jQuery(".display").css({
					width : clockCalculation2+"px"
				}); 
				
				jQuery("#textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
					width : scheidingCalculationW+"px"
				});
				
				jQuery("#textHolder #text, #backupDate #text").css({
					width : width+"px",
					"margin-top" : "0px"
				});
				
				jQuery("#textHolder, #backupDate").css({
					width : width+"px", 
					"position" : "absolute", 
					"bottom" : jQuery("#footerHolder").height()+"px",
					"z-index" : "999994"
				});
				
				jQuery("#textHolder #ItemInfoBlok, #backupDate #ItemInfoBlok").css({
					width : width+"px",
					height : "0px"
				});
				
				setTimeout(function()
				{
					jQuery("#textHolder #InformatieBlok, #backupDate #InformatieBlok").css({
						width : width+"px",
						height : jQuery("#textHolder #infoCollectBox").innerHeight()+"px"
					});
					
					setTimeout(function()
					{
						var textCalculationH = jQuery("#textHolder #InformatieBlok").height();
						
						jQuery("#textHolder #text, #backupDate #text").css({
							height : textCalculationH+"px"
						});
						
						jQuery("#textHolder, #backupDate").css({
							height : jQuery("#textHolder #text").innerHeight()
						});
						
						jQuery("#textHolder #text, #backupDate #text").css({
							"padding-bottom" : "20px"
						});
					},50);
				},50);
			}, 800);
		}
		else
		{
			if(jQuery("body").attr("placeItemTextYesNo") === "no" && jQuery("body").attr("specialalarm") === "no")
			{
				jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo, #textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
					height : "0px"
				});
				
				jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo").css({
					"padding-bottom" : "0px"
				});
			}
			else
			{
				jQuery("#textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
					height : "8px"
				});
				
				jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo").css({
					"padding-bottom" : "15px"
				});
			}	
			
			var BignessClass = jQuery("body").attr("id"),
				clockCalculation2 = width - 72,
				clockCalculation = width - 96,
				scheidingCalculationW = width - 45,
				textHolderCalculationH = height - (jQuery("#footerHolder").height() + clockCalculation + 98);

			jQuery(".display").css({width : clockCalculation2+"px"});
			
			jQuery("#textHolder #text, #backupDate #text").css({
				width : width+"px",
				"margin-top" : "0px"
			});
			
			jQuery("#textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
				width : scheidingCalculationW+"px"
			});
			
			jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo").css({
				width : scheidingCalculationW+"px",
				"margin-top" : "0px"
			});

			setTimeout(function()
			{
				if(orientationchangeJaNee === "ja" && jQuery("body").attr("placeItemTextYesNo") === "no" && jQuery("body").attr("specialalarm") === "no")
				{
					jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo, #textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
						height : "0px"
					});
					
					var contentText2Height = 0;
					orientationchangeJaNee = "nee";
				}
				else
				{
					if(jQuery("body").attr("placeItemTextYesNo") === "no" && jQuery("body").attr("specialalarm") === "no")
					{
						jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo, #textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
							height : "0px"
						});
						
						var contentText2Height = 0;
					}
					else
					{
						jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo, #textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
							height : "8px"
						});
						
						if(orientation === "horz")
						{
							var contentText2Height = jQuery("#textHolder #ItemInfo").innerHeight() + 25;
						}
						else
						{
							var contentText2Height = jQuery("#textHolder #ItemInfo").innerHeight() + 65;
						}
					}
				}

				jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo").css({
					height : contentText2Height+"px" 
				});
				
				var HeightInfoCollectBox = jQuery("#textHolder #infoCollectBox").innerHeight();
				
				jQuery("#textHolder #InformatieBlok, #backupDate #InformatieBlok").css({
					width : width+"px",
					height : HeightInfoCollectBox+"px"
				});
				
				jQuery("#textHolder #ItemInfoBlok, #backupDate #ItemInfoBlok").css({
					width : width+"px"
				});
				
				setTimeout(function()
				{			
					if(jQuery("body").attr("placeItemTextYesNo") === "no" && jQuery("body").attr("specialalarm") === "no")
					{
						var heightInfoBlok = 0;
					}
					else
					{
						var heightInfoBlok = 8 + contentText2Height;
					}
					
					jQuery("#textHolder #ItemInfoBlok, #backupDate #ItemInfoBlok").css({
						height : heightInfoBlok+"px"
					});
					
					var textCalculationH = HeightInfoCollectBox + contentText2Height;
					
					jQuery("#textHolder #text, #backupDate #text").css({
						height : textCalculationH+"px"
					});
					
					if(mainCallTextCalc)
					{
						jQuery("#textHolder #text, #backupDate #text").css({
							"padding-bottom" : "20px"
						});
					}
					
					jQuery("#textHolder, #backupDate").css({
						width : width+"px", 
						height : jQuery("#textHolder #text").innerHeight(), 
						"position" : "absolute", 
						"bottom" : jQuery("#footerHolder").height()+"px",
						"z-index" : "999994"
					});	
				}, 50);
			}, 50);
		}
	}
}

/**
 * I Need Commpent
 *
 * @param * height
 * @param * width
 * @param * mainCallTextCalc
 */
function TextCalculation(height, width, mainCallTextCalc)
{
	jQuery("#textHolder #text").removeAttr("style");
	jQuery("#backupDate #text").removeAttr("style");
	jQuery("#textHolder #InformatieBlok").removeAttr("style");
	jQuery("#backupDate #InformatieBlok").removeAttr("style");
	jQuery("#textHolder #ItemInfoBlok").removeAttr("style");
	jQuery("#backupDate #ItemInfoBlok").removeAttr("style");
	jQuery("#textHolder #ItemInfo").removeAttr("style");
	jQuery("#backupDate #ItemInfo").removeAttr("style");
	
	// extra check clocktype
	if(parseInt(clockType, 10) === 0)
	{
		TextCalculationDigitalClock(height, width, mainCallTextCalc);
		return;
	}
	
	var orient = getOrientation();
	
	daySeasonDate(width, height, true);
	
	if(jQuery("div.current").attr("id") === "container")
	{
		if(jQuery("body").attr("placeItemTextYesNo") === "no" && jQuery("body").attr("specialalarm") === "no")
		{
			jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo, #textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
				height : "0px"
			});
			
			jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo").css({
				"padding-bottom" : "0px"
			});
		}
		else
		{
			jQuery("#textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
				height : "8px"
			});
			
			jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo").css({
				"padding-bottom" : "15px"
			});
		}	
	
		var BignessClass = jQuery("body").attr("id"),
			bgColorBK = jQuery("#textHolder, #backupDate").css("background-color");
		jQuery("#textHolder, #backupDate").removeAttr("style");
		jQuery("#textHolder, #backupDate").css("background-color", bgColorBK);
		jQuery("#text").css("background-color", bgColorBK);
		
		if(orient === "horz")
		{
			var clockCalculation2 = height - (jQuery("#footerHolder").height() + 72),
				clockCalculation = height - (jQuery("#footerHolder").height() + 96);
			
			if(BignessClass === "bigSizedFooter")
			{
				if(jQuery("#clockHolder").width() > 200)
				{	
					var textCalculationW = width - (height - (jQuery("#footerHolder").height()));
				}
				else
				{
					var textCalculationW = width - (jQuery("#footerHolder").height() + (clockCalculation2));
				}
			}
			else
			{
				if(jQuery("#clockHolder").width() > 200)
				{
					var textCalculationW = width - (height - (jQuery("#footerHolder").height()));
				}
				else
				{
					var textCalculationW = width - (jQuery("#footerHolder").height() + (clockCalculation2 + 45));
				}
			}
			
			if(fotoPos === "fotoclock")
			{
				textCalculationW += 36;
			}
			
			var scheidingCalculationW = textCalculationW - 45,
				textCalculationH = height - jQuery("#footerHolder").height();
			
			jQuery("#textHolder, #backupDate").css({
				width : textCalculationW+"px",
				height : clockCalculation2+"px"
			});
			
			jQuery("#textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
				width : scheidingCalculationW+"px"
			});
			
			jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo").css({
				width : scheidingCalculationW+"px",
				"padding-bottom" : "0px"
			});
			
			jQuery("#textHolder #text, #backupDate #text").css({
				width : textCalculationW+"px",
				"padding-bottom" : "0px"
			});
			
			jQuery("#textHolder #InformatieBlok, #backupDate #InformatieBlok").css({
				width : textCalculationW+"px"
			});
			
			jQuery("#textHolder #ItemInfoBlok, #backupDate #ItemInfoBlok").css({
				width : textCalculationW+"px"
			});
			
			setTimeout(function()
			{
				if(jQuery("body").attr("placeItemTextYesNo") === "no" && jQuery("body").attr("specialalarm") === "no")
				{
					jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo, #textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
						height : "0px"
					});
					
					var contentText2Height = 0;
				}
				else
				{
					jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo, #textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
						height : "8px"
					});
					
					var contentText2Height = jQuery("#textHolder #ItemInfo").innerHeight() + 65;
				}

				jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo").css({
					height : contentText2Height+"px"
				});
				
				setTimeout(function()
				{
					var contentTextHeight = jQuery("#textHolder #InformatieBlok").innerHeight()  + contentText2Height;
					var newTextCalH = (textCalculationH - (contentTextHeight + 72)) / 2;
					
					jQuery("#textHolder #text, #backupDate #text").css({
						height : contentTextHeight+"px" 
					});
					
					if(newTextCalH > 36)
					{
						jQuery("#textHolder #text, #backupDate #text").css({
							"margin-top" : newTextCalH+"px"
						});
					}
					
					if(newTextCalH <= 36)
					{
						jQuery("#textHolder #text, #backupDate #text").css({
							"margin-top" : "36px"
						});
					}
				},50);
			},50);
		}
		else
		{
			var clockCalculation2 = width - 72;
			var clockCalculation = width - 96;
		
			var textCalculationW = width;
			var scheidingCalculationW = textCalculationW - 45;
			
			if(jQuery("body").attr("firsttimeloading") === "yes")
			{
				var footerHolderHeight = jQuery("#overlayUl span").height() + 98;
			}
			else
			{
				var footerHolderHeight = jQuery("#overlayUl span").height() + 73;
			}
			var textHolderCalculationH = height - (footerHolderHeight + clockCalculation + 72);
			
			jQuery("#textHolder, #backupDate").css(
			{
				width : textCalculationW+"px", 
				height : textHolderCalculationH+"px"
			});
			
			jQuery("#textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
				width : scheidingCalculationW+"px"
			});
			
			jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo").css({
				width : scheidingCalculationW+"px",
				"margin-top" : "0px"
			});
			
			jQuery("#textHolder #text, #backupDate #text").css({
				width : textCalculationW+"px",
				"margin-top" : "0px"
			});
			
			setTimeout(function()
			{
				if(orientationchangeJaNee === "ja" && jQuery("body").attr("placeItemTextYesNo") === "no" && jQuery("body").attr("specialalarm") === "no")
				{
					jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo, #textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
						height : "0px"
					});
					
					var contentText2Height = 0;
					orientationchangeJaNee = "nee";
				}
				else
				{
					if(jQuery("body").attr("placeItemTextYesNo") === "no" && jQuery("body").attr("specialalarm") === "no")
					{
						jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo, #textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
							height : "0px"
						});
						var contentText2Height = 0;
					}
					else
					{
						jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo, #textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
							height : "8px"
						});
						
						var contentText2Height = jQuery("#textHolder #ItemInfo").innerHeight() + 65;
					}
				}
				
				jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo").css({
					height : contentText2Height+"px" 
				});
				
				setTimeout(function()
				{
					var textCalculationH = jQuery("#textHolder #InformatieBlok").innerHeight() + contentText2Height;
					var paddingText = (textHolderCalculationH - textCalculationH) / 2;
					
					jQuery("#textHolder #text, #backupDate #text").css({
						height : textCalculationH+"px"
					});
					
					if(mainCallTextCalc)
					{
						jQuery("#textHolder #text, #backupDate #text, #ItemInfo").css({
							"padding-bottom" : paddingText+"px"
						});
					}
				},50);
			},50);
		}
	}
}

/**
 * I Need Commpent
 *
 * @param * windoworientation
 * @param * height
 * @param * width
 * @param * firstTime
 */
function setHeightWidth(height, width, firstTime)
{
	var BignessClass = jQuery("body").attr("id"),
		orient = getOrientation();
	
	if(parseInt(clockType, 10) === 0)
	{
		// Het is de digitale klok
		if(orient === "horz")
		{
			var clockCalculation2 = height - (jQuery("#footerHolder").height()),
				clockCalculationwidth = width,
				imageSpecCal = height - jQuery("#footerHolder").height(),
				clockCalculation = height - (jQuery("#footerHolder").height() +24),
				shadowCalculationH = height - (jQuery("#footerHolder").height() + 72),
				clockCalculationSpecial = height - (jQuery("#footerHolder").height() + 96);
		}
		else
		{
			var clockCalculation2 = height - jQuery("#footerHolder").height(),
				clockCalculationwidth = width,
				imageSpecCal = height - jQuery("#footerHolder").height(),
				clockCalculation = width - 96,
				shadowCalculationH1 = height - (jQuery("#footerHolder").height() + clockCalculation + 96),
				shadowCalculationH = height - (jQuery("#footerHolder").height() + 72),
				clockCalculationSpecial = width - 126;
		}
		
		if(firstTime === "yes")
		{
			if(orient === "horz")
			{
				var clockCalculation = clockCalculation - 10;
			}
			else
			{
				var clockCalculation = clockCalculation;
			}
		}
		
		$("#clock").removeAttr("style");
		$("#logoClock").removeAttr("style");
		$("#shade").removeAttr("style");
		$("#shade").removeClass("hide");
		$("#clockHolder").removeAttr("style");
		
		jQuery("#clockHolder").css({
			height : clockCalculation2+"px",
			width : width+"px", 
			"margin" : "0px", 
			"padding" : "0px"
		});
		
		jQuery(".backstretch").css({
			height : imageSpecCal+"px", 
			width : width+"px"
		});
		
		jQuery(".backstretch img").css({
			height : imageSpecCal+"px", 
			width : width+"px", 
			"left" : "0px"
		});
		
		jQuery("#shadow_clock_tekst").css({
			height : shadowCalculationH+"px"
		});
		
		jQuery("#shade").css({
			height : clockCalculation2+"px", 
			width : width+"px", 
			"margin" : "0px"
		});
		
		jQuery("#clock").css({
			height : clockCalculation+"px", 
			width : width+"px"
		});
		
		jQuery("#imageClock").css({
			height : clockCalculation+"px", 
			width : clockCalculation+"px"
		});
		
		jQuery("#logoClock").css({
			height : clockCalculation+"px", 
			width : width+"px"
		});
		
		if(parseInt(clockTypeRemember, 10) !== parseInt(clockType, 10))
		{
			$("#imageClock").addClass("hide");
			$("#clock").addClass("light");
			$("#clock").addClass("digitalClock");
			$("#logoClock").addClass("digitalLogoClock");
			numberClock("clock");
		}
		
		if(orient === "horz")
		{
			if($("body").attr("SpecialAction"))
			{
				var margTopDisplay = height - ($("#clock .display").height() + jQuery("#footerHolder").height()) / 2,
					margTopDisplay = (clockCalculation - ($("#clock .display").height() + jQuery("#footerHolder").height() + 135)) / 2;
				$("#clock .display").css({"margin-top": margTopDisplay+"px","background-image": "none"});
				
				$("body").attr("SpecialAction", false);
			}
			else
			{
				var margTopDisplay = (clockCalculation - ($("#clock .display").height() + jQuery("#footerHolder").height() + 135)) / 2;
			}
			
			$("#clock .display").css({"margin-top": margTopDisplay+"px","background-image": "none"});
			jQuery("#clock .display").css({"background-image": "transparent !important"});
			var margTopDisplay = (clockCalculationSpecial - ($("#clock .display").height() + jQuery("#footerHolder").height() + 205)) / 2;
		}
		else
		{
			var margTopDisplay = (clockCalculation - ($("#clock .display").height() + 135)) / 2;
			$("#clock .display").removeAttr("style");
			$("#clock .display").css("margin-top", margTopDisplay+"px");
			var margTopDisplay = (clockCalculationSpecial - ($("#clock .display").height() + 180)) / 2;
		}
		
		jQuery("#logoClock").css({
			height : $("#clock .display").height()+"px", 
			width : width+"px",
			"margin-top" : margTopDisplay+"px",
			"background-size" : "22%",
			"margin-left" : " 15px"
		});
	}
	else
	{
		if(orient === "horz")
		{
			var clockCalculation2 = height - (jQuery("#footerHolder").height() + 72),
				imageSpecCal = height - jQuery("#footerHolder").height(),
				clockCalculation = height - (jQuery("#footerHolder").height() + 96),
				shadowCalculationH = height - (jQuery("#footerHolder").height() + 72),
				clockCalculationSpecial = height - (jQuery("#footerHolder").height() + 96);
		}
		else
		{
			var clockCalculation2 = width - 72,
				imageSpecCal = width,
				clockCalculation = width - 96,
				shadowCalculationH1 = height - (jQuery("#footerHolder").height() + clockCalculation + 96),
				shadowCalculationH = height - (jQuery("#footerHolder").height() + 72),
				clockCalculationSpecial = width - 126;
		}
		
		var clockCalculation3 = clockCalculation2 + 72;
		$("#clockHolder").removeAttr("style");
		$("#shade").removeAttr("style");
		
		if(firstTime === "yes")
		{
			if(orient === "horz")
			{
				var clockCalculation = clockCalculation - 10;
			}
			else
			{
				var clockCalculation = clockCalculation;
			}
		}
		
		jQuery("#clockHolder").css({
			height : clockCalculation2+"px", 
			width : clockCalculation2+"px"
		});
		
		jQuery("#shadow_clock_tekst").css({
			height : shadowCalculationH+"px"
		});
		
		jQuery("#shade").css({
			height : clockCalculation+"px", 
			width : clockCalculation+"px"
		});
		
		jQuery("#clock").css({
			height : clockCalculation+"px", 
			width : clockCalculation+"px"
		});
		
		jQuery("#imageClock").css({
			height : clockCalculation+"px", 
			width : clockCalculation+"px"
		});
		
		jQuery("#logoClock").css({
			height : clockCalculation+"px", 
			width : clockCalculation+"px",
			"margin-top" : "0px"
		});
		
		// analoge clock
		if(parseInt(clockTypeRemember, 10) !== parseInt(clockType, 10)){
			jQuery("#clock").html("");			
			var configClock = {
				divId: "clock",
				useSecondHand: "true",
				clockWidthAndHeight: clockCalculation,
				clockWidthAndHeight2: clockCalculation+210,
				shadeHighResImg: "images/shade.png",
				clockFaceHighResImg: "images/bg_clock.png",
				clockFaceHighResImg2: "images/bg_clock2.png",
				hourHandHighResImg: "images/hourHandHighRes.png",
				minuteHandHighResImg: "images/minuteHandHighRes.png",
				secondHandHighResImg: "images/secondHandHighRes.png", 
				smoothRotation: "false",
				secondHandSpeed: "100"
			};
			var myAnalogClock = new AnalogClock(configClock);
		}
		
		$("#shade").addClass("hide");
		$("#imageClock").removeClass("hide");
		$("#logoClock").removeClass("digitalLogoClock");
		$("#clock").removeClass("light");
		$("#clock").removeClass("digitalClock");
		
		jQuery("#shadeClock").css({
			"border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-moz-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-webkit-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-khtml-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "
		});
		
		jQuery("#clock").css({
			"border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-moz-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-webkit-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-khtml-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "
		});
		
		jQuery("#shade").css({
			"border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-moz-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-webkit-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-khtml-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "
		});
		
		if(fotoPos === "fotobg"){
			jQuery(".backstretch").css({
				height : clockCalculation3+"px", 
				width : clockCalculation3+"px",
				"left": "-36px",
				"top": "-36px"
			});
			
			jQuery(".backstretch img").css({
				height : clockCalculation3+"px", 
				width : clockCalculation3+"px", 
				"clip" : "auto",
				"left" : "0px"
			});
		}else{
			
			
			jQuery(".backstretch").css({
				height : clockCalculation+"px", 
				width : clockCalculation+"px",
				"border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
				"-moz-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
				"-webkit-border-top-left-radius" : clockCalculation+"px ",
				"-webkit-border-top-right-radius" : clockCalculation+"px ",
				"-webkit-border-bottom-left-radius" : clockCalculation+"px ",
				"-webkit-border-bottom-right-radius" : clockCalculation+"px ",
				"-khtml-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "

			});
			
			jQuery(".backstretch img").css({
				height : clockCalculation+"px", 
				width : clockCalculation+"px", 
				"left" : "0px",
				"clip" : "rect(0px "+clockCalculation+"px "+clockCalculation+"px 0px)",
				"border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
				"-moz-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
				"-webkit-border-top-left-radius" : clockCalculation+"px ",
				"-webkit-border-top-right-radius" : clockCalculation+"px ",
				"-webkit-border-bottom-left-radius" : clockCalculation+"px ",
				"-webkit-border-bottom-right-radius" : clockCalculation+"px ",
				"-khtml-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "
			});
		}
		
		/*jQuery(".backstretch").css({
			"border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-moz-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-webkit-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-khtml-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"overflow" : "hidden"
		});*/
	
		jQuery("#imageClock").css({
			"border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-moz-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-webkit-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-khtml-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "
		});
		jQuery("#logoClock").css({
			"border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-moz-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-webkit-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px ",
			"-khtml-border-radius" : clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "+clockCalculation+"px "
		});
	}
	if($("body").attr("SwitchTrueFalse") === "yes")
	{
		$("body").attr("SwitchTrueFalse", "no");
	}
	
	if($("body").attr("orientationChange") === "yes")
	{
		$("body").attr("orientationChange", "no");
	}
	clockTypeRemember = clockType;
}

/**
 * I Need Commpent
 *
 * @param * windoworientation
 * @param * newArray
 * @param * length2Org
 * @param * firstCounter
 * @param * screenHeight
 * @param * screenWidth
 */
function setMenu(newArray, length2Org, firstCounter, screenHeight, screenWidth)
{
	var BignessClass = jQuery("body").attr("id");
	jQuery("#footerHolder").removeAttr("style");
	jQuery("#footerScroller").removeAttr("style");
	jQuery("div#item_overlay").removeAttr("style");
	jQuery("#overlayUl").removeAttr("style");
	jQuery("#footer").removeAttr("style");
	jQuery(".item").removeAttr("style");
	jQuery(".day").removeAttr("style");

	if(jQuery("div.current").attr("id") === "containter_content_holder")
	{
		jQuery("html, body").animate({scrollTop:0}, 0, "linear");
	}
	
	if(!isMobile)
	{
		var ruimteBoven = (height - screenHeight) / 2;
		jQuery("body").addClass("browser");
		jQuery("#container").height(screenHeight);
		jQuery("#container").width(screenWidth);
		jQuery("#container").css({"margin":"0px auto", border: "1px solid"});
		
		if(ruimteBoven > 0)
		{
			jQuery("#container").css({"margin-top": ruimteBoven+"px"});
		}
	}
	
	jQuery(".clock").width(screenWidth);
	jQuery(".clock").height(screenHeight);
	jQuery(".calender").width(screenWidth);
	jQuery(".calender").height(screenHeight);
	jQuery(".settings").width(screenWidth);
	jQuery(".settings").height(screenHeight);
	jQuery(".upgrade").width(screenWidth);
	jQuery(".upgrade").height(screenHeight);
	
	var menuCountArr = jQuery("#footer div").size() - 1,
		menuWidth = 0,
		menuCount = jQuery("#footerScroller div").size(),
		OriginalLength = newArray.length,
		PastItemsLength = jQuery("#footerScroller div.past").size(),
		firstTime = jQuery("body").attr("firstTime"),
		orient = getOrientation();
	var fontSizeA = $("#footerHolder .item span").css("font-size");
	var fontSizeB = fontSizeA.replace("px", "");
	var lineHeight = parseInt(fontSizeB, 10) * 1.2;

	if(OriginalLength === PastItemsLength)
	{
		jQuery("#footer .past").last().addClass("specialLast");
	}
	
	if(orient === "horz")
	{
		var newHeight = jQuery("#overlayUl span").height() + 30;
	}
	else
	{
		var newHeight = jQuery("#overlayUl span").height() + 35;
	}
	
	if(BignessClass === "extraBigSizedFooter")
	{
		var lineHeightCal = (lineHeight + 55) / 2,
			itemLineHeight = (newHeight + lineHeightCal) / 2;
	}
	else if(BignessClass === "bigSizedFooter")
	{
		var lineHeightCal = (lineHeight + 20) / 2,
			itemLineHeight = (newHeight + lineHeightCal) / 2;
	}
	else
	{
		var lineHeightCal = (lineHeight + 10) / 2,
			itemLineHeight = (newHeight + lineHeightCal) / 2;
	}
	
	var overlayUlH = newHeight - 3,
		firstItemHeight = newHeight - 23;
	
	jQuery("#footerHolder").height(newHeight+"px");
	jQuery("#overlayUl").height(overlayUlH+"px");
	jQuery("#footerScroller").height(overlayUlH+"px");
	jQuery("#footer").height(overlayUlH+"px");
	jQuery("#overlayUl img").height(overlayUlH+"px");
	jQuery("#item_overlay").height(firstItemHeight+"px");
	jQuery("#footerHolder .item").height(firstItemHeight+"px");
	jQuery("#footerHolder .item img").height(firstItemHeight+"px");
	jQuery("#footerHolder .item span").css({"line-height": itemLineHeight+"px"});
	jQuery("#footerHolder .item .dayname").css({"line-height": itemLineHeight+"px"});
	
	if(orient === "horz")
	{
		if(BignessClass === "bigSizedFooter")
		{
			var padding = 37,
				padding1 = 5,
				padding2 = 0,
				paddingMenu = 5,
				paddingMenu2 = 30,
				divideBy = 3,
				minusmenuCount = 5;
		}
		else if(BignessClass === "extraBigSizedFooter")
		{
			var padding = 27,
				padding1 = 5,
				padding2 = 0,
				paddingMenu = 5,
				paddingMenu2 = 25,
				divideBy = 2,
				minusmenuCount = 2;
		}
		else
		{
			var padding = 37,
				padding1 = 5,
				padding2 = 0,
				paddingMenu = 0,
				paddingMenu2 = 40,
				divideBy = 4,
				minusmenuCount = 4;
		}
	}
	else
	{
		if(BignessClass === "bigSizedFooter")
		{
			var padding = 37,
				padding1 = 5,
				padding2 = 0,
				paddingMenu = 5,
				paddingMenu2 = 30,
				divideBy = 2,
				minusmenuCount = 4;
		}
		else if(BignessClass === "extraBigSizedFooter")
		{
			var padding = 27,
				padding1 = 5,
				padding2 = 0,
				paddingMenu = 5,
				paddingMenu2 = 25,
				divideBy = 1,
				minusmenuCount = 2;
		}
		else
		{
			var padding = 37,
				padding1 = 5,
				padding2 = 0,
				paddingMenu = 0,
				paddingMenu2 = 40,
				divideBy = 3,
				minusmenuCount = 5;
		}
	}	

	// original width x height = 110 x 207
	var imageResizedPerc = overlayUlH / 207,
		newImgWidth = imageResizedPerc * 110;
	jQuery("#overlayUl img").width(Math.round(newImgWidth)+"px");
	
	var dayMenuItemWidth2 = jQuery("#item_overlay").width() - paddingMenu2;
	jQuery("div#item_overlay").width(dayMenuItemWidth2+"px");
	var dayMenuItemWidth = jQuery("#overlayUl").width();
	jQuery("#overlayUl").width(dayMenuItemWidth+"px");
	
	var widthLeft = screenWidth - dayMenuItemWidth;
	jQuery("#footerScroller").width(widthLeft+"px");
	var itemWidth = widthLeft / divideBy;
	itemWidth = Math.round(itemWidth);
	// loop menu items 
	for (var i = 0; i < menuCount; i++)
	{
		if(i === menuCountArr)
		{
			jQuery("div#item_"+i).addClass("last");
		}
		else if(i !== 0)
		{
			if(i === 1)
			{
				var newMenuWidth = itemWidth - padding;
			}
			else
			{
				var newMenuWidth = itemWidth - padding;
			}
			
			jQuery("div#item_"+i).width(newMenuWidth+"px");
			
			if(i === 1  || i === 2)
			{
				jQuery("div#fake_"+i).width(newMenuWidth+"px");
			}
		}
		else
		{
			var newMenuWidth = itemWidth - padding;
			jQuery("div#item_"+i).width(newMenuWidth+"px");
		}
	}
			
	//var menuWidth = (itemWidth - ( paddingMenu + paddingMenu2)) * menuCount;	
	var menuWidth = itemWidth * menuCount;	
	jQuery("#footer").width(menuWidth+"px");
	
	setTimeout(function()
	{
		var newSize = menuCount - minusmenuCount;
		if(firstCounter > newSize)
		{
			var newSize = menuCount - minusmenuCount + 1;
			
			jQuery("#footerScroller").scrollable({
				items: ".item",
				setSize: newSize,
				minimumScroll: 100,
				draggable : true
			});
			
			var apiScroll = jQuery("#footerScroller").data("scrollable");
			
			if(length2Org > 3)
			{
				apiScroll.end();
			}
		}
		else
		{
			jQuery("#footerScroller").scrollable({
				items: ".item",
				setSize: newSize,
				minimumScroll: 100,
				draggable : true
			});
			
			var apiScroll = jQuery("#footerScroller").data("scrollable");
			apiScroll.seekTo(firstCounter);
		}
	},100);
	
	setTimeout(function()
	{
		setHeightWidth(screenHeight, screenWidth, firstTime);
	},100);	
	
	if(firstTime === "yes")
	{
		jQuery("body").attr("firstTime", "nee");
	}
}

/**
 * Date uitbreiding
 *
 * @param * firstDayOfWeek
 */
Date.prototype.getWeekOfYear = function (firstDayOfWeek){
    var y = this.getFullYear(),
        m = this.getMonth(),
        d = this.getDate();
    var dow = firstDayOfWeek || 0;
    var offset = 7 + 1 - new Date(y, 0, 1).getDay();
    
	if (offset === 8)
	{
        offset = 1;
    }
    var daynum = ((Date.UTC(y, m, d, 0, 0, 0) - Date.UTC(y, 0, 1, 0, 0, 0)) / 86400000) + 1;
    var w = Math.floor((daynum - offset + 7) / 7);
    
	if (w === dow) 
	{
        y--;
        var prevOffset = 7 + 1 - new Date(y, 0, 1).getDay();
        if (prevOffset === 2 || prevOffset === 8) 
		{
            w = 53;
        }
		else
		{
            w = 52;
        }
    }
    return w;
};

/**
 * Date uitbreiding
 *
 * @param * year
 */
Date.isLeapYear = function (year){
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};

/**
 * Date uitbreiding
 *
 * @param * year
 * @param * month
 */
Date.getDaysInMonth = function (year, month){
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

/**
 * I Need Commpent
 *
 * @param * MainCall
 */
function checkIfUpdateNeeded(MainCall)
{
	if(loadSettingsIsDone)
	{
		daySeasonDate(width, height, true);
		
		var now = new Date(),
			day = now.getUTCDate(),
			month = now.getMonth() + 1,
			monthName = now.getMonth(),
			year = now.getFullYear(),
			today = day+"-"+month+"-"+year,
			dayName = clockAidLang[lang].dayNames[now.getDay()],
			monthName = clockAidLang[lang].monthNames[monthName], 
			hours = now.getHours(),
			minutes = now.getMinutes(),
			currenSize = jQuery("#footer .realItem").size(),
			length = clockArray.length,
			newArray = [],
			overArray = [],
			j = 0,
			k = 0,
			showCurrentDate = jQuery("body").attr("showCurrentDate"),
			SwitchTrueFalse = jQuery("body").attr("SwitchTrueFalse"),
			firstTimeLoading = jQuery("body").attr("firstTimeLoading"),
			clockPage = jQuery("body").attr("clockPage"),
			Alarm = jQuery("body").attr("Alarm"),
			backupDate = jQuery("#backupDate").html();
	
		if(clockPage === "yes")
		{
			//SETTING UP ARRAY
			for (var i = 0; i < length; i++)
			{
				if(clockArray[i].id)
				{
					if(clockArray[i].day === today)
					{
						newArray[j] = clockArray[i];
						j++;
					}
					else
					{
						overArray[k] = clockArray[i];
						k++;
					}
				}
			}
			
			for (var a = 0; a < overArray.length; a++)
			{
				if(overArray[a].repeate === "maand")
				{
					daySplit = overArray[a].day.split("-");
					
					var jaar = daySplit[2],
						maand = parseInt(daySplit[1], 10) -1,
						dag = parseInt(daySplit[0], 10),
						objDate = new Date();
					
					objDate.setMonth(maand);
					objDate.setFullYear(jaar);
					objDate.setDate(dag);
					
					if (day === objDate.getDate())
					{
						newArray[j] = overArray[a];
						j++;
					}
				}
				else if(overArray[a].repeate === "dag")
				{
					newArray[j] = overArray[a];
					j++;
				}
				else if(overArray[a].repeate === "week")
				{
					daySplit = overArray[a].day.split("-");
					
					var jaar = daySplit[2],
						maand = parseInt(daySplit[1], 10) -1,
						dag = parseInt(daySplit[0], 10),
						objDate = new Date();
					
					objDate.setMonth(maand);
					objDate.setFullYear(jaar);
					objDate.setDate(dag);
					objDay = objDate.getDay();
					nowDay = now.getDay();
					
					if (objDay === nowDay)
					{
						newArray[j] = overArray[a];
						j++;
					}
				}
			}
			
			sortByTime(newArray);
			sortByTimeDigits(newArray);
			newArray = removeDubbleTimes(newArray);
			var newLength = newArray.length;
			
			if(newLength !== currenSize || SwitchTrueFalse === "yes" || $("body").attr("orientationChange") === "yes" || firstTimeLoading === "yes" || TimerEnded === "yes")
			{
				if(TimerEnded === "yes")
				{
					TimerEnded = "no";
					jQuery("#backupDate #ItemInfo").html("");
					jQuery("#textHolder #ItemInfo").html("");	
					jQuery("#textHolder #ItemInfoScheiding").addClass("hide");
					jQuery("#backupDate #ItemInfoScheiding").addClass("hide");	
				}
				
				if(firstTimeLoading === "yes")
				{
					jQuery("body").attr("firstTimeLoading", "no");
				}
				
				var dayNight = "",
					html = "",
					BignessClass = jQuery("body").attr("id"),
					orient = getOrientation();
				
				firstCounter = 0;
				
				if(orient === "horz")
				{
					if(BignessClass === "bigSizedFooter")
					{
						var amountOfItems = 3;
					}
					else
					{
						var amountOfItems = 4;
					}
				}
				else
				{
					if(BignessClass === "bigSizedFooter")
					{
						var amountOfItems = 2;
					}
					else
					{
						var amountOfItems = 3;
					}
				}	
		
				var length2 = newArray.length,
					length2Org = newArray.length - 1,
					tellerTotNuToeTellen = 0;
				
				for (var a = 0; a < length2; a++)
				{
					var firstItem = "",
						itemTime = parseInt(newArray[a].time,10),
						imageTitle = "unactive",
						classItem = "",
						newTime = "",
						firstAttr = 'firstItem="no"',
						timeSplitted = newArray[a].time.split(""),
						lengthTime = timeSplitted.length,
						placement = 2,
						specialClassItem = "";
					
					if(a === 0 && itemTime < curTime)
					{
						classItem = "first past";
						firstItem = '<div id="firstColor"></div>';
						firstCounter++;
						imageTitle = "active";
					}
					else if(a === 0)
					{
						classItem = "first";
						firstItem = '<div id="firstColor"></div>';
						firstAttr = 'firstItem="yes"';
						imageTitle = "active";
					}
					else if(itemTime < curTime)
					{
						var classItem = "past";
						imageTitle = "active";
						firstCounter++;
					}
					else if(a === firstCounter)
					{
						classItem = "first";
						imageTitle = "active";
						firstAttr = 'firstItem="yes"';
					}
					else if(a === length2Org)
					{
						classItem = "last";
					}
					
					if(itemTime >= curTime)
					{
						specialClassItem = "currentFutureItem";
					}
					
					if(lengthTime === 3)
					{
						placement = 1;
					}
					
					for(var b = 0; b < lengthTime; b++)
					{
						if(b === placement)
						{
							newTime += ".";
						}
						
						newTime += timeSplitted[b];
					}
					
					var hourText2 = clockAidLang[lang].hourText2;
					
					if(lang === "nb-NO")
					{
						var timeVar = hourText2+" "+newTime;
					}
					else
					{
						var timeVar = newTime+" "+hourText2;
					}
					
					html += '<div id="item_'+a+'" class="'+classItem+' item realItem '+specialClassItem+'" itemID="'+newArray[a].id+'" onclick="placeItemText('+newArray[a].id+');" '+firstAttr+' activeClick="no">'+firstItem+'<span class="text" itemID="'+newArray[a].id+'" onclick="placeItemText('+newArray[a].id+');">'+timeVar+' <img src="images/'+newArray[a].icon+'_'+imageTitle+'.png" /></span></div>';
					
				}
				
				jQuery("#footer").html(html);
				
				var totalRealItems = jQuery(".currentFutureItem").length;
				
				if(totalRealItems < amountOfItems)
				{
					totalRealItems = amountOfItems - totalRealItems;
				}
				
				var a2 = 1,
					tellerTotNuToe = length2;
					
				for (var a = 0; a < totalRealItems; a++) 
				{
					if(a2 === totalRealItems)
					{
						html += '<div id="item_'+tellerTotNuToe+'" class="item extraItem last"><span class="text"></span><img src="images/icoon1_active.png" /></div>';
					}
					else
					{
						html += '<div id="item_'+tellerTotNuToe+'" class="item extraItem"><span class="text"></span><img src="images/icoon1_active.png" /></div>';
					}
					
					a2++;
					tellerTotNuToe++;
				}
				
				jQuery("#footer").html(html);
				jQuery("#footer .past").last().addClass("pastLast");
				
				if ($("#footer").size() === 1)
				{
					$("#footer .realItem").each(function (i)
					{
						if ($(this).hasClass("past"))
						{
							var apiScroll = jQuery("#footerScroller").data("scrollable");
							if(apiScroll)
							{
								apiScroll.next();
							}
						}
					});
				}
				
				setMenu(newArray, length2Org, firstCounter, height, width);
			}
		}
		
		
		var hours = now.getHours(),
			minutes = now.getMinutes(),
			dateContent = day+" "+monthName+" "+year,
			seasonName = setCurrentSeason(),
			dayNight = setCurrentDayPart(curTime),
			br = " ",
			enterJaNee = "",
			streepjeJaNee = "",
			streepje = "",
			orient = getOrientation();
		
		setCurrentTimePart(hours, minutes);
		
		if(orient === "horz")
		{
			streepje = '<span class="streepje"> | </span>';	
			jQuery("body").attr("class", "horizontaal");
			
			if(parseInt(clockType, 10) === 0)
			{
				streepjeJaNee = '<span class="streepje"> | </span>';	
			}
			else
			{
				br = "<br>";
				enterJaNee = "<br>";	
			}
		}
		else
		{
			enterJaNee = "<br>";
			streepje = '<span class="streepje"> | </span>';	
			jQuery("body").attr("class", "verticaal");
		}
		
		if(Alarm === "no" && showCurrentDate === "yes" || firstTimeLoading === "yes" || jQuery("body").attr("HideAlert") === "yes")
		{
			var currentContent = jQuery("#textHolder #dayNight").html();
			if(!currentContent)
			{
				var contentLength = 0;
			}
			else
			{
				var contentLength = currentContent.length;
			}
			
			jQuery("#backupDate #dayNight").html('<span class="dayName">'+dayName+br+"</span>"+dayNight+streepje+seasonName+enterJaNee+streepjeJaNee);
			
			jQuery("#backupDate #dateContent").html(dateContent);
			if(jQuery("body").attr("placeItemTextYesNo") === "no" )
			{
				if(jQuery("#backupDate").html() !== backupDate || firstTimeLoading === "yes" || jQuery("body").attr("HideAlert") === "yes")
				{
					if(jQuery("body").attr("HideAlert", "yes"))
					{
						jQuery("body").attr("HideAlert", "no");
					}
					
					jQuery("#textHolder #text").html(jQuery("#backupDate").html());
					
					if(jQuery("#backupDate").html() !== backupDate)
					{
						setTimeout(function()
						{
							if(parseInt(clockType, 10) === 0)
							{
								if(AlarmHasBeen)
								{
									TextCalculationDigitalClock(height, width, true, true);
								}
								else
								{
									TextCalculationDigitalClock(height, width, true, false);
								}
							}
							else
							{
								TextCalculation(height, width, true);
							}
						}, 500);
					}
				}
			}
		}
		
		jQuery("#item_overlay .dayname").html(dayName);
		
		if(MainCall)
		{
			setTimeout(function()
			{
				checkIfUpdateNeeded(true);
			}, 5000);
		}
	}
}

/**
 * I Need Commpent
 *
 * @param * id
 */
function placeItemText(id)
{
	AlarmHasBeen = true;
	jQuery("body").attr("placeItemTextYesNo", "yes");
	jQuery("body").attr("HideAlert", "yes");
	jQuery("body").attr("showCurrentDate", "no");
	jQuery("body").attr("placeItemTextYesNoSpec", "yes");
	jQuery("#weather").addClass("outerPosition");
	
	
	var clickedItem = {},
		length = clockArray.length,
		orient = getOrientation();
	
	//SETTING UP ARRAY
	for (var i = 0; i < length; i++) 
	{
		if(parseInt(clockArray[i].id, 10) ===  parseInt(id, 10))
		{
			clickedItem = clockArray[i];
		}
	}
	
	if(jQuery("#textHolder #ItemInfo").html() !== clickedItem.message && jQuery("body").attr("specialAlarmStyling") === "no")
	{
		jQuery("#textHolder #ItemInfo").html(clickedItem.message);
		jQuery("#backupDate #ItemInfo").html(clickedItem.message);
		jQuery("#textHolder #ItemInfoScheiding").removeClass("hide");
		jQuery("#backupDate #ItemInfoScheiding").removeClass("hide");
		jQuery("#textHolder #ItemInfo").css("line-height","10px !important");
		jQuery("#backupDate #ItemInfo").css("line-height","10px !important");
		
		jQuery("#textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css({
			height : "8px"
		});
		
		setTimeout(function()
		{
			if(parseInt(clockType, 10) === 0)
			{
				TextCalculationDigitalClock(height, width, false, false);
			}
			else
			{
				TextCalculation(height, width, false);
			}
		}, 50);
	}
	
	setTimeout(function()
	{
		setTimeout(function()
		{
			jQuery("body").attr("showCurrentDate", "yes");
			jQuery("body").attr("placeItemTextYesNo", "no");
			alarmClick("", true, false);
		}, 7000);
	}, 50);
}

/**
 * I Need Commpent
 *
 * @param * id
 * @param * specialAlarm
 * @param * AlarmEnd
 */
function alarmClick(id, specialAlarm, AlarmEnd)
{
	if(id && !specialAlarm)
	{
		AlarmHasBeen = true;
		jQuery("body").attr("HideAlert", "yes");
		jQuery("body").attr("specialalarm", "yes");
		jQuery("body").attr("showCurrentDate", "no");
		
		setTimeout(function()
		{
			jQuery("body").attr("showCurrentDate", "yes");
		}, 7000);
		
		var clickedItem = {},
			length = clockArray.length,
			orient = getOrientation();
		
		//SETTING UP ARRAY
		for (var i = 0; i < length; i++)
		{
			if(clockArray[i].id === parseInt(id, 10))
			{
				clickedItem = clockArray[i];
			}
		}
		
		if(jQuery("#textHolder #ItemInfo").html() !== clickedItem.message)
		{
			jQuery("#textHolder #ItemInfo").html(clickedItem.message);
			jQuery("#backupDate #ItemInfo").html(clickedItem.message);
			jQuery("#textHolder #ItemInfo").css("line-height","10px !important");
			jQuery("#backupDate #ItemInfo").css("line-height","10px !important");
			jQuery("#weather").addClass("outerPosition");
			
			jQuery("#textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css(
			{
				height : "8px"
			});
			
			jQuery("#textHolder #ItemInfoScheiding").removeClass("hide");
			jQuery("#backupDate #ItemInfoScheiding").removeClass("hide");
			
			setTimeout(function(){
				
				if(parseInt(clockType, 10) === 0)
				{
					TextCalculationDigitalClock(height, width, false, false);
				}
				else
				{
					TextCalculation(height, width, false);
				}
			}, 50);
		}
	}
	else if(specialAlarm)
	{
		if(jQuery("body").attr("Alarm") === "no" && jQuery("body").attr("placeItemTextYesNo") === "no" && !finalIsPlayed && jQuery("body").attr("specialAlarmStyling") === "no" || AlarmEnd)
		{
			jQuery("body").attr("specialalarm", "no");
			jQuery("body").attr("specialAlarmStyling", "yes");
			
			if(jQuery("body").attr("placeItemTextYesNoSpec") === "yes")
			{
				jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo, #textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css(
				{
					height : "0px"
				});
				
				jQuery("#backupDate #ItemInfo").html("");
				jQuery("#textHolder #ItemInfo").html("");
				jQuery("#textHolder #ItemInfoScheiding").addClass("hide");
				jQuery("#backupDate #ItemInfoScheiding").addClass("hide");
				
				if(parseInt(clockType, 10) === 0)
				{
					TextCalculationDigitalClock(height, width, false, true);
				}
				else
				{
					TextCalculation(height, width, false);
				}
				
				setTimeout(function()
				{
					jQuery("#weather").removeClass("outerPosition");
				}, 1500);
				
				jQuery("body").attr("specialAlarmStyling", "no");
				jQuery("body").attr("placeItemTextYesNoSpec", "no");
			}
			else
			{
				setTimeout(function()
				{
					jQuery("#textHolder #ItemInfo, #backupDate #ItemInfo, #textHolder #ItemInfoScheiding, #backupDate #ItemInfoScheiding").css(
					{
						height : "0px"
					});
					
					jQuery("#backupDate #ItemInfo").html("");
					jQuery("#textHolder #ItemInfo").html("");
					jQuery("#textHolder #ItemInfoScheiding").addClass("hide");
					jQuery("#backupDate #ItemInfoScheiding").addClass("hide");
					
					if(parseInt(clockType, 10) === 0)
					{
						TextCalculationDigitalClock(height, width, false, true);
					}
					else
					{
						TextCalculation(height, width, false);
					}
					
					setTimeout(function()
					{
						jQuery("#weather").removeClass("outerPosition");
					}, 1500);
					
					jQuery("body").attr("specialAlarmStyling", "no");
				}, 7000);
			}
		}
	}
}

/**
 * I Need Commpent
 *
 * @param * minutes
 * @param * timeVal
 */
function controleTimeAlarmFinal(minutes, timeVal)
{
	if(minutes === 00 || minutes === 0)
	{
		var val = timeVal - 39;	
	}
	else
	{
		var val = timeVal + 1;
	}
	
	return val;

}

/**
 * I Need Commpent
 *
 * @param * itemTime
 * @param * checkTime
 */
function controleTime(itemTime, checkTime)
{
	var settedTime = 0000,
		itemTimeMinutes = itemTime.toString()[3]+itemTime.toString()[4],
		cal1 = parseInt(itemTime, 10) - checkTime;
	
	if(cal1 < 0)
	{
		settedTime = itemTime - (40 + checkTime);
	}
	else
	{
		settedTime = itemTime - checkTime;
	}
	
	return settedTime;
}

/**
 * I Need Commpent
 *
 */
function playReminder()
{
	if(!ReminderIsPlayed)
	{
		ReminderIsPlayed = true;
		//api.debug("PLAY");
		soundStart(true);
		
		setTimeout(function()
		{
			//api.debug("STOP");
			soundStop(true);
			if(jQuery("#textHolder #ItemInfo").html() !== "")
			{
				alarmClick("", true, false);
			}
		}, 60000);
	}
}

/**
 * I Need Commpent
 *
 * @param * intervalTime
 */
function checkOutTime(intervalTime)
{
	var clockPage = jQuery("body").attr("clockPage");
	
	if(clockPage === "yes")
	{
		var timeNow = new Date(),
			hours = timeNow.getHours(),
			minutes = timeNow.getMinutes(),
			soundIntervalFinal = false,
			soundInterval = false,
			soundIsPlayed = false,
			itemsLength = jQuery("#footer .realItem").size();
		
		setCurrentTimePart(hours, minutes);
		dayNight = setCurrentDayPart(curTime);
		
		for(c = 0; c < itemsLength; c++)
		{
			var nextOne = c + 1,
				beforeOne = c - 1,
				firstItem = jQuery("#item_"+c).attr("firstitem"),
				scrollToNext = false,
				Blink = false;
			
			if(firstItem === "yes")
			{
				var inIntervalTime = "no",
					itemTimeStr = jQuery("#item_"+c+" .text").text();
				var itemTimeStr2 = itemTimeStr.replace(".", "");
				var itemTimeStr3 = itemTimeStr2.replace("uur", "");
				var itemTime = parseInt(itemTimeStr3.replace(" ", ""), 10);
				
				for(d=0; d < intervalTime; d++)
				{
					var checkControle = (parseInt(curTime, 10) + d) % 100;	
					
					if(checkControle >= 60)
					{
						var time = parseInt(curTime, 10) + d,
							controle = time + 40;		
					}
					else
					{
						var controle = parseInt(curTime, 10) + d;	
					}
								
					timeTime = controleTimeAlarmFinal(minutes, parseInt(curTime, 10));
					blinkerTime = controleTime(itemTime, parseInt(blinktime, 10));
					alarmTimer = controleTime(itemTime, parseInt(alarmTime, 10));

					if(itemTime === timeTime)
					{
						soundIntervalFinal = true;
					}
					
					if(parseInt(curTime, 10) === parseInt(blinkerTime, 10))
					{
							Blink = true;
					}
					
					if(parseInt(curTime, 10) === alarmTimer)
					{
						var soundInterval = true;
					}
					
					if(parseInt(itemTime, 10) < parseInt(curTime, 10) && soundInterval === false && soundIntervalFinal === false){
						TimerEnded = "yes";
						soundStop(false);
						if(jQuery("#textHolder #ItemInfo").html() !== "")
						{
							alarmClick("", true, false);
						}

					}else if(parseInt(itemTime, 10) > parseInt(curTime, 10))
					{
						TimerEnded = "no";
					}
					
					if(Blink || soundInterval || soundIntervalFinal)
					{
						var inIntervalTime = "yes";
					}
					else if(parseInt(itemTime, 10) <= parseInt(curTime, 10))
					{
						var vervolgItem = false;
						ReminderIsPlayed = false;
						var objectEmpty = isObjectEmpty(jQuery("#item_"+nextOne));
						inIntervalTime = "no";
						
						if(!objectEmpty)
						{
							if(jQuery("#item_"+nextOne).hasClass("currentFutureItem"))
							{
								jQuery("#item_"+c).attr("firstitem", "no");
								jQuery("#item_"+c).addClass("past");
								jQuery("#item_"+c).removeClass("first");
								jQuery("#item_"+c).removeClass("currentFutureItem");
								jQuery("#item_"+c).removeClass("alarm");
								jQuery(".item.pastLast").removeClass("pastLast");
								jQuery("#item_"+c).addClass("pastLast");
								jQuery("#item_"+c).attr("activeClick", "no");
								jQuery("#item_"+nextOne).addClass("first");
								jQuery("#shade").removeClass("shadeSpecial");	
								
								if(parseInt(clockType, 10) !== 0)
								{
									// Old clock blink replacing
									//jQuery("#clock .display").removeClass("shadeSpecial2");
									jQuery("#shadeClock").attr("src", "images/shade.png");	
								}
								
								if(jQuery("#item_"+nextOne+" .text img").attr("src"))
								{
									var srcStr = jQuery("#item_"+nextOne+" .text img").attr("src");
									var src = srcStr.replace("unactive", "active");
									jQuery("#item_"+nextOne+" .text img").attr("src", src);
									jQuery("#item_"+nextOne).attr("firstitem", "yes");
								}
								var vervolgItem = true;
							}
							
							scrollToNext = true;
							soundStop(false);
							
							if(jQuery("#textHolder #ItemInfo").html() !== "")
							{
								alarmClick("", true, true);
							}	
						}
						
						if(!vervolgItem)
						{	
							jQuery(".item.pastLast").removeClass("pastLast");
							jQuery("#item_"+c).removeClass("currentFutureItem");
							jQuery("#item_"+c).removeClass("first");
							jQuery("#item_"+c).removeClass("alarm");
							jQuery("#item_"+c).addClass("pastLast");
							jQuery("#item_"+c).addClass("specialLast");
							jQuery("#item_"+c).addClass("past");
							jQuery("#item_"+c).attr("activeClick", "no");
							jQuery("#item_"+c).attr("firstitem", "no");
							
							if(jQuery("#textHolder #ItemInfo").html() !== "")
							{
								alarmClick("", true, true);
							}	

							jQuery("#shade").removeClass("shadeSpecial");	
							
							if(parseInt(clockType, 10) !== 0)
							{
								// Old clock blink replacing
								//jQuery("#clock .display").removeClass("shadeSpecial2");
								jQuery("#shadeClock").attr("src", "images/shade.png");	
							}
							
							scrollToNext = true;
							soundStop(false);
						}
					}
				}
				
				if(soundInterval)
				{
					soundIsPlayed = true;
					playReminder();
				}
				else if(!soundIntervalFinal && !soundInterval)
				{
					soundStop(false);
					
					if(jQuery("#textHolder #ItemInfo").html() !== "")
					{
						alarmClick("", true, false);
					}
				}
				
				if(scrollToNext)
				{
					var apiScroll = jQuery("#footerScroller").data("scrollable");
					apiScroll.next();
				}
				
				if(inIntervalTime === "yes")
				{
					if(soundIntervalFinal)
					{
						soundStart(false);
					}
					
					if(Blink)
					{	
						if(jQuery("#item_"+c).hasClass("alarm"))
						{
							jQuery("#item_"+c).removeClass("alarm");	
							jQuery("#shade").removeClass("shadeSpecial");								
							
							if(parseInt(clockType, 10) !== 0){
								// Old clock blink replacing
								//jQuery("#clock .display").removeClass("shadeSpecial2");
								jQuery("#shadeClock").attr("src", "images/shade.png");	
							}
							
							if(beforeOne >= 0){
								jQuery("#item_"+beforeOne).addClass("pastLast");
							}	
						}
						else
						{
							jQuery("#item_"+c).addClass("alarm");
							
							if(Blink)
							{
								jQuery("#shade").addClass("shadeSpecial");
								
								if(parseInt(clockType, 10) !== 0)
								{
									// Old clock blink replacing
									//jQuery("#clock .display").addClass("shadeSpecial2");	
									jQuery("#shadeClock").attr("src", "images/shade2_red.png");	
								}
							}
							
							if(beforeOne >= 0)
							{
								jQuery("#item_"+beforeOne).removeClass("pastLast");		
							}
						}
					}
					
					if(jQuery("#item_"+c).attr("activeClick") === "no")
					{
						alarmClick(jQuery("#item_"+c).attr("itemID"), false, false);
						jQuery("#item_"+c).attr("activeClick", "yes");
						jQuery("body").attr("Alarm", "yes");	
					}
				}
				else
				{
					if(jQuery("body").attr("Alarm") === "yes")
					{
						soundStop(false);
						
						if(jQuery("#textHolder #ItemInfo").html() !== "")
						{
							alarmClick("", true, false);
						}

						jQuery(".item.alarm").removeClass("alarm");
						jQuery("body").attr("Alarm", "no");	
						jQuery("#shade").removeClass("shadeSpecial");
						
						if(parseInt(clockType, 10) !== 0)
						{
							// Old clock blink replacing
							//jQuery("#clock .display").removeClass("shadeSpecial2");
							jQuery("#shadeClock").attr("src", "images/shade.png");	
						}
					}
					else if(finalIsPlayed || soundIsPlayed)
					{
						soundStop(true);
						finalIsPlayed = false;
						
						if(jQuery("#textHolder #ItemInfo").html() !== "")
						{
							alarmClick("", true, false);
						}
					}
				}
			}
			else
			{
				var aan = false;
				
				$("#footer .realItem").each(function( index )
				{
					if(jQuery("#textHolder #ItemInfo").html() !== "")
					{
						alarmClick("", true, false);
					}
					
					if($(this).attr("firstitem") === "yes")
					{
						aan = true;
					}
				});
				
				if (!aan)
				{
					if(jQuery("#textHolder #ItemInfo").html() !== "")
					{
						soundStop(false);
						alarmClick("", true, false);
					}
					
					finalIsPlayed = false;
					jQuery("#shade").removeClass("shadeSpecial");
					
					if(parseInt(clockType, 10) !== 0)
					{
						// Old clock blink replacing
						//jQuery("#clock .display").removeClass("shadeSpecial2");
						jQuery("#shadeClock").attr("src", "images/shade.png");	
					}
					
					jQuery("body").attr("Alarm", "no");
					
				}
			}
		}
	}
	
	setTimeout(function()
	{
		checkOutTime(intervalTimeCheck);
	}, 1000);
}

/**
 * Het verwijderen van een event
 *
 * @param * id
 */
function removeEvent(id)
{
	api.removeEvent(id);
	var length = clockArray.length;
	
	for (var i = 0; i < length; i++)
	{
		if(clockArray[i].id === id)
		{
			var thisID = clockArray[i].id;
			setTimeout(function()
			{
				delete clockArray[i];
				delete calendarArray[i];
				calender.removeOutOfArray(thisID);
				
				setTimeout(function(){
					calender.resetList();
					resetCalendarAndClockArray(clockArray);
					resetScrollHeight();
				}, 150);
			}, 100);
			break;
		}
	}
}

/**
 * I Need Commpent
 *
 * @param * CalendarAndClockArray
 */
function resetCalendarAndClockArray(CalendarAndClockArray)
{
	var length = CalendarAndClockArray.length,
		newArray = [],
		j = 0;
	
	for (var i = 0; i < length; i++) 
	{
		if(!CalendarAndClockArray[i])
		{
			i++;
		}
		
		newArray[j] = CalendarAndClockArray[i];
		j++;
	}
	
	clockArray = newArray;
	calendarArray = newArray;
}

/**
 * Remove Foto
 *
 * @param * e
 */
function removeFoto(e)
{
	var imageName = $(e).attr("name");
	
	// Uiteindelijk dit is echte functie maken
	if (window.Android)
	{
		var res = imageName.split("_"),
			fotoID = res[1],
			fotoHtml = "";
			
			NativeBridge.removePhoto(fotoID);
			
			unset(photoList[fotoID]);
			
			$(".filesdynamic").html("");
			
			$.each(photoList, function( index, value ) 
			{
				fotoHtml = fotoHtml + '<li class="ownImages" name="foto_' + index + '">';
				fotoHtml = fotoHtml + '<img src="' + value +'" width="50" height="50" style="float:left" />';
				fotoHtml = fotoHtml + '<h1>Foto ' + index + '</h1>';
				fotoHtml = fotoHtml + '<span class="removeFoto" name="foto_' + index + '"></span>';
				fotoHtml = fotoHtml + '<div class="clear"></div></li>';
		
				$(".filesdynamic").append(fotoHtml);
		});
	}
	else
	{
		$.ajax(
		{
			url: "removeFoto.php?foto="+imageName
		})
		.done(function( msg ) 
		{
			var obj = jQuery.parseJSON( msg );
		
			if (obj.html === "removed")
			{
				// laad images
				$.ajax(
				{
					url: httpPath + "getimages.php"
				})
				.done(function( msg ) 
				{
					var obj = jQuery.parseJSON( msg );
					store.set("images", obj.images);
					store.set("settingImages", obj.html);
				});
			
				$(".ownImages").each(function (i)
				{
					if ($(this).attr("name") === imageName)
					{
						$(this).attr("id", "removeFile");
					}
				});
			
				$(".filesdynamic #removeFile").remove();
		
				if (window.Android)
				{
					// Action to show the android message
					Android.showAlert(clockAidLang[lang].removeFotoText);
				}
				else
				{
					alert(clockAidLang[lang].removeFotoText);
				}
			}
		});
	}
}

// Twofingers
var imageUploadON = false,
	imageUpload = [];

$(document).ready(function(e) 
{
	document.addEventListener("touchstart", function(e) 
	{
		var t = e.touches[0];
		touch.x = t.clientX;
		touch.y = t.clientY;
		
	}, false);
	
	var vertical = true,
		touch = {},
		twofingermove = 0,
		totalTouches = 0;
	
	document.addEventListener("touchmove", function(e) 
	{
		e.preventDefault();

		var t = e.touches[0],
			deltaX = touch.x - t.clientX,
			deltaY = touch.y - t.clientY;
		if (e.touches.length === 3 && parseInt(productType, 10) !== 2)
		{
			if (deltaY > 0)
			{
				twofingermove += 1;
			}
			else
			{
				twofingermove -= 1;
			}
		}
		totalTouches = e.touches.length;
	}, false);
	
	document.addEventListener("touchend", function(e) 
	{
		var orient = getOrientation();	
		if(orient === "horz")
		{
			if(isAndroid){
				if(twofingermove >= 5 && totalTouches === 3)
				{
					setPosition("open");
				}
				else if(twofingermove <= -5 && totalTouches === 3)
				{
					setPosition("close");
				}
			}else{
				if(twofingermove >= 8)
				{
					setPosition("open");
				}
				else if(twofingermove <= -8)
				{
					setPosition("close");
				}
			}
		}
		twofingermove = 0;
		totalTouches = 0;
	}, false);
});

/**
 * I Need Commpent
 *
 * @param * action
 */
function setPosition(action) 
{
	var container = $("#slidedownmenu");
	
	if (action === "open")
	{
		$( container).show();
		$( container).animate(
		{
			bottom: "0px"
		}, 100 );
	}
	else
	{
		$( container).hide();
		$( container).animate(
		{
			bottom: "-200px"
		}, 100 );
	}
}

/**
 * I Need Commpent
 *
 */
function closeMenu()
{
	setPosition("close");
}

/**
 * I Need Commpent
 *
 */
function saveSetting()
{
	
	
	// Get all setting options
	var clockTypeA = $(".typeclock").val();					// Klok type
	tikclock = parseInt($(".tikclock").val(), 10);						// Geluid van klok
	
	if(parseInt(productType, 10) !== 6)
	{
		var fontSize = $(".font").val();					// Letter grote
		blinktime = $(".blinktime").val();					// Blink klok
		alarmTime = parseInt($(".alarmtime").val(), 10);	// Alarm interval
		
	}	
	
	var kleur = $(".color").val(),							// Achtergrond Kleur
		fototype = $(".foto").val(),						// Type foto
		fotopos = $(".fototype").val(),						// Posietie foto
		languageID = $(".language").val(),					// Taal 
		weatherContinentID = $(".continent").val(),			// weer continent
		weatherCountryID = $(".country").val(),				// weer country
		weatherProvinceID = $(".province").val(),			// weer province
		weatherPlaceIDValue = $(".place").val(),			// weer place
		sound = $(".sound").val();							// Alarm sound
	
	weatherPlaceIDChanged = false;
	
	if(weatherPlaceIDValue && weatherPlaceIDValue !== "")
	{
		weatherPlaceID = weatherPlaceIDValue;
		weatherPlaceIDChanged = true;
	}
	
	if(clockTypeA === 0)
	{
		tikclock = 0;
	}
	
	// Set all setting options
	$(".typeclock").val(clockTypeA);
	$(".tikclock").val(tikclock);
	
	if(parseInt(productType, 10) !== 6)
	{
		$(".font").val(fontSize);
		$(".alarmtime").val(parseInt(alarmTime, 10));
		$(".blinktime").val(blinktime);
		$(".sound").val(sound);
	}
	
	$(".color").val(kleur);
	$(".foto").val(fototype);
	$(".fototype").val(fotopos);
	$(".language").val(languageID);
	$(".continent").val(weatherContinentID);
	$(".country").val(weatherCountryID);
	$(".province").val(weatherProvinceID);
	$(".place").val(weatherPlaceIDValue);
		
	api.insertMessage("me", "Klok type : " + clockTypeA, "", "", true);
	api.insertMessage("me", "Geluid van klok : " + tikclock, "", "", true);

	if(parseInt(productType, 10) !== 6)
	{
		api.insertMessage("me", "Letter grote : " + fontSize, "", "", true);
		api.insertMessage("me", "Alarm knipper interval : " + blinktime, "", "", true);
		api.insertMessage("me", "Alarm interval : "+ alarmTime, "", "", true);
		api.insertMessage("me", "Alarm sound : " + sound, "", "", true);
	}
	
	api.insertMessage("me", "Achtergrond Kleur : " + kleur, "", "", true);
	api.insertMessage("me", "Type foto : " + fototype, "", "", true);
	api.insertMessage("me", "Posietie foto : " + fotopos, "", "", true);
	api.insertMessage("me", "weer continent : " + weatherContinentID, "", "", true);
	api.insertMessage("me", "weer country : " + weatherCountryID, "", "", true);
	api.insertMessage("me", "weer province : " + weatherProvinceID, "", "", true);
	api.insertMessage("me", "weer place : " + weatherPlaceIDValue, "", "", true);
	
	$.cookie("clockType", clockTypeA);						// Klok type
	$.cookie("tikclock", tikclock);							// Geluid van klok
	
	if(parseInt(productType, 10) !== 6)
	{
		$.cookie("fontSize", fontSize);						// Letter Grote
		$.cookie("blinktime", blinktime);					// Knipperen klok en item
		$.cookie("alarmTime", alarmTime);					// Alarm interval
		$.cookie("sound", sound);							// Geuid
	}
	
	$.cookie("color", kleur);								// Achtergrond kleur
	$.cookie("fototype", fototype);							// Type foto
	$.cookie("fotopos", fotopos);							// Posietie foto
	$.cookie("languageID", languageID);						// Taal
	$.cookie("weatherContinentID", weatherContinentID);		// weer continent
	$.cookie("weatherCountryID", weatherCountryID);			// weer country
	$.cookie("weatherProvinceID", weatherProvinceID);		// weer province
	$.cookie("weatherPlaceID", weatherPlaceIDValue);		// weer place
	
	// save data in store
	store.set("clockType", clockTypeA);
	store.set("tikclock", tikclock);
	
	if(parseInt(productType, 10) !== 6)
	{
		store.set("fontSize", fontSize);
		store.set("blinktime", blinktime);
		store.set("alarmTime", alarmTime);
		store.set("sound", sound);
	}
	
	store.set("color", kleur);
	store.set("fototype", fototype);
	store.set("fotopos", fotopos);
	store.set("languageID", languageID);
	store.set("weatherContinentID", weatherContinentID);
	store.set("weatherCountryID", weatherCountryID);
	store.set("weatherProvinceID", weatherProvinceID);
	store.set("weatherPlaceID", weatherPlaceIDValue);
	
	binInPlaceSelectBoxesWeather = false;
	startTheWholeProcess(true);
}

function loadSettings()
{
	if(parseInt(productType, 10) !== 6)
	{
		store.get("blinktime", function(ok, val) 
		{
			if (ok)
			{
				if (val == null)
				{
					$(".blinktime").val(1);
				}
				else
				{
					$(".blinktime").val(val);
				}
			}
		});
	
		// Alarm tijd
		store.get("alarmTime", function(ok, val) 
		{
			if (ok)
			{
				if (val == null)
				{
					// Default setting
					$(".alarmtime").val(1);
				}
				else
				{
					 
					$(".alarmtime").val(val);
				}
			}
			
		});
	
		store.get("sound", function(ok, val) 
		{
			if (ok)
			{
				if (val == null)
				{
					$(".sound").val(6);
				}
				else
				{
					$(".sound").val(val);
				}
			}
		});
	}
	
	store.get("fototype", function(ok, val) 
	{
		var fotoTypeVal = "";
		if (ok)
		{
			if (val === null)
			{
				$(".foto").val("seizoen");
				fotoTypeVal = "seizoen";
			}
			else
			{
				$(".foto").val(val);
				fotoTypeVal = val;
			}
			
			if(fotoTypeVal === "geen"){
				$("#container_settings .filesdynamic").hide();
				$("#clockHolder").addClass("noBGimage");
				//$("#container_settings .div_nav").css("visibility", "hidden");
			}else if(fotoTypeVal === "eigenfoto"){
				$(".ownImages").show();
				$(".seasonImages").hide();
				$("#container_settings .filesdynamic").show();
				$("#clockHolder").addClass("noBGimage");
				//$("#container_settings .div_nav").css("visibility", "visible");
			}else if(fotoTypeVal === "seizoen"){
				$(".ownImages").hide();
				$("#clockHolder").removeClass("noBGimage");
				$(".seasonImages").show();
				$("#container_settings .filesdynamic").show();
				//$("#container_settings .div_nav").css("visibility", "hidden");
			}

		}
	});
	
	store.get("fotopos", function(ok, val) 
	{
		if (ok)
		{
			if (val === null)
			{
				$(".fototype").val("fotoclock");
			}
			else
			{
				$(".fototype").val(val);
			}
		}
	});
	
	store.get("languageID", function(ok, val) 
	{
		if (ok)
		{
			if (val === null)
			{
				lang = "nl-NL";
				$(".language").val("nl-NL");
			}
			else
			{
				lang = val;
				$(".language").val(val);
			}
		}
	});
	
	if(langBefore != lang){
		loadLanguages();
	}
	
	// Tiktak Tiktak
	store.get("tikclock", function(ok, val) 
	{
		var sound;
		if (ok)
		{
			if (val === null)
			{
				sound = 0;
				// Default setting
				clockStart();
			}
			else
			{
				sound = val;
				
				if (parseInt(sound, 10) === 1)
				{
					setTimeout(function(){
						clockStart();
					}, 3000);
				}
				else
				{
					clockStop();
				}
			}
		}
		
		$(".tikclock").val(sound);
		
	});
	
	// Klok Type
	// 0 = digital
	// 1 = analoog
	// 2 = analoog classic
	store.get("clockType", function(ok, val) 
	{
		if (ok)
		{
			if (val === null)
			{
				// Default setting
				clockType = 2;
			}
			else
			{
				clockType = val;
				
				if (parseInt(clockType, 10) === 0)
				{
					clockStop();
				}
			}
		}
		
		$(".typeclock").val(clockType);
		
	});
	
	if(parseInt(productType, 10) !== 6)
	{
		// Font size
		store.get("fontSize", function(ok, val) 
		{
			var fontSize;
			if (ok)
			{
				if (val === null)
				{
					fontSize = "normal";
					// Default setting
					$("body").attr("id","bigSizedFooter");
				}
				else
				{
					fontSize = val;
			
					if (fontSize === "small")
					{
						$("body").attr("id","normalSizedFooter");
					}
					else if (fontSize === "normal")
					{
						$("body").attr("id","bigSizedFooter");
					}
					else if (fontSize === "big")
					{
						$("body").attr("id","extraBigSizedFooter");
					}
				}
			}
		
			$(".font").val(fontSize);
		
		});
	}
	
	store.get("weatherContinentID", function(ok, val) 
	{
		if (ok)
		{
			if (val === null)
			{
				$(".continent").val("1");
			}
			else
			{
					$(".continent").val(val);
			}
		}
	});
	
	store.get("weatherCountryID", function(ok, val) 
	{
		if (ok)
		{
			if (val === null)
			{
				$(".country").val("21");
			}
			else
			{
					$(".country").val(val);
			}
		}
	});
	
	store.get("weatherProvinceID", function(ok, val) 
	{
		if (ok)
		{
			if (val === null)
			{
				$(".province").val("11115");
			}
			else
			{
					$(".province").val(val);
			}
		}
	});
	
	store.get("weatherPlaceID", function(ok, val) 
	{
		if (ok)
		{
			if (val === null)
			{
				$(".place").val("186884");
			}
			else
			{
					$(".place").val(val);
			}
		}
	});
	
	
	var showBgColorWeather = "yes",
		orient = getOrientation();	
	
	if(orient === "horz")
	{
		if(parseInt(clockType, 10) !== 0)
		{
			showBgColorWeather = "no";
		}
	}
	
	// Achtergrond kleur
	store.get("color", function(ok, val) 
	{
		var bgColor;
		if (ok)
		{
			if (val === null)
			{
				// Default setting
				bgColor = "#FFFFFF";
				$(".clock").css("background-color",bgColor);
				$("#textHolder").css("background-color", bgColor);
				if(showBgColorWeather === "yes"){
					$("#weather_container").css("background-color", bgColor);
				}else{
					$("#weather_container").css("background-color", "transparent");
				}
				$("#clockHolder").css("background-color", bgColor);
				$("#text").css("background-color", bgColor);
			}
			else
			{
				bgColor = val;
		
				if (bgColor === "#000000")
				{
					$("#InformatieBlok").css("color","#FFFFFF");
					$("#weather").css("color","#FFFFFF");
				}
				else
				{
					$("#InformatieBlok").css("color","#00918a");
					$("#weather").css("color","#00918a");
				}
				
				$(".clock").css("background-color", bgColor);
				$("#textHolder").css("background-color", bgColor);
				if(showBgColorWeather === "yes"){
					$("#weather_container").css("background-color", bgColor);
				}else{
					$("#weather_container").css("background-color", "transparent");
				}
				$("#clockHolder").css("background-color", bgColor);
				$("#text").css("background-color", bgColor);
			}
		}
		
		$(".color").val(bgColor);
		
	});
	
	// Achtergrond kleur
	store.get("images", function(ok, val) 
	{
		
		var images,
			seasonImages,
			fotoType,
			aantalImages = 0,
			aantalSeasonImages = 0,
			clockHolderSlider = $("#clockHolder").data("backstretch"),
			imageClockSlider = $("#imageClock").data("backstretch"),
			seizoen = setCurrentSeason(true),
			imageUrl1;
		
		if (ok)
		{
			if (val === null)
			{
				// laad images
				$.ajax(
				{
					url: httpPath + "getimages.php"
				})
				.done(function( msg ) 
				{
					var obj = jQuery.parseJSON( msg );
					store.set("images", obj.images);
					store.set("settingImages", obj.html);
					loadSettings();
					
				});
			}
			else
			{
				// Plaatjez zijn er al
				images = val.split(",");
				
				$.each(images, function( index, value ) 
				{
					aantalImages = aantalImages + 1;
				});
				
				
			}
		}
		
		
		
		store.get("seasonImages", function(ok, val) 
		{
			if (ok)
			{
				if (val === null)
				{
					// laad images
					$.ajax(
					{
						type: "get",
						url: "http://clockaid-work.onegoal.nl/getSeasons.php"
					})
					.done(function( msg ) 
					{
						//api.debug(msg);
						var obj = $.parseJSON( msg );
						
						store.set("seasonImages", obj.seasonImages);
						seasonImages = obj.seasonImages;
						store.set("seasonImagesHtml", obj.html);
						loadSettings();
					});
				}
				else
				{
					// Plaatjez zijn er al
					seasonImages = val.split(",");
					$.each(seasonImages, function( index, value )
					{
						aantalSeasonImages = aantalSeasonImages + 1;
					});
				}
			}	
		});
		
		
		
		store.get("fotopos", function(ok, val) 
		{
			if (ok)
			{
				if (val === null)
				{
					// Default setting
					fotoPos = "fotoclock";
				}
				else
				{
					fotoPos = val;
				}
			}
		});
		
		store.get("fototype", function(ok, val) 
		{
			if (ok)
			{
				if (val === null)
				{
					// Default setting
					fotoType = "seizoen";
				}
				else
				{
					fotoType = val;
				}
			}
			
			if(parseInt(clockType, 10) === 0 && fotoPos === "fotoclock")
			{
				fotoPos = "fotobg";
				store.set("fotopos", fotoPos);
			}
			
			if (fotoType === "geen") // Plaats geen foto
			{
				$("#clockHolder").css("background-image", "none");
				$("#imageClock").css("background-image", "none");
				
				if (clockHolderSlider)
				{
					clockHolderSlider.destroy();
				}
				
				if (imageClockSlider)
				{
					imageClockSlider.destroy();
				}
					
				$("#clockHolder").backstretch("destroy");
				$("#imageClock").backstretch("destroy");
			}
			else if(fotoType === "eigenfoto") // Plaats eigen foto
			{
				if (photoList.length < 1)
				{
					// Er zijn geen foto`s plaats een sezioen plaatje 
					imageUrl1 = "images/"+seizoen+".png";
				}
				else
				{
					$.each(photoList, function( index, value ) 
					{
						if (parseInt(index, 10) === 0)
						{
							imageUrl1 = value;
						}
					});
				}
			
				if (fotoPos === "fotoclock")
				{
					$("#clockHolder").addClass("noBGimage");
					
					if (clockHolderSlider)
					{
						clockHolderSlider.destroy();
					}
					
					if (imageClockSlider)
					{
						imageClockSlider.destroy();
					}
					
					
					if(iosVERSION < 6){
						$("#imageClock").css("background-image", imageUrl1);
					}else{
						$("#imageClock").backstretch(imageUrl1,
						{
							fade: 750,
							duration: 60000
						});
							
						imageClockSlider = $("#imageClock").data("backstretch");
						
						if (photoList.length > 1)
						{				
							$.each(photoList, function( index, value ) 
							{
								imageClockSlider.images.push(value);
							});
						}
					}
				}
				else
				{
					$("#clockHolder").removeClass("noBGimage");
					$("#imageClock").css("background-image", "none");
					
					if (clockHolderSlider)
					{
						clockHolderSlider.destroy();
					}
					
					if (imageClockSlider)
					{
						imageClockSlider.destroy();
					}
					
					if(iosVERSION < 6){
						setTimeout(function(){
							$("#clockHolder").css("background-image", "url('"+imageUrl1+"')");
						},500);
					}else{
						$("#clockHolder").backstretch(imageUrl1, 
						{
							fade: 750,
							duration: 60000
						});
						
						clockHolderSlider = $("#clockHolder").data("backstretch");
						
						if (photoList.length > 1)
						{				
							$.each(photoList, function( index, value ) 
							{
								clockHolderSlider.images.push(value);
							});
						}
					}
				}
			}
			else if(fotoType === "seizoen")
			{
				
				if (aantalSeasonImages < 1)
				{
					// Er zijn geen fotozs plaats een sezioen plaatje 
					imageUrl1 = "images/"+seizoen+".png";
				}
				else
				{
					$.each(seasonImages, function( index, value ) 
					{
						if (parseInt(index, 10) === 0)
						{
							imageUrl1 = value;
						}
					});
				}
				
				if (fotoPos === "fotoclock")
				{
					$("#clockHolder").css("background-image", "none");
					
					if (clockHolderSlider)
					{
						clockHolderSlider.destroy();
					}
					
					if (imageClockSlider)
					{
						imageClockSlider.destroy();
					}
					
					if(iosVERSION < 6){
						setTimeout(function(){
							$("#imageClock").css("background-image", "url('"+imageUrl1+"')");
						},500);
					}else{
						$("#imageClock").backstretch(imageUrl1,
						{
							fade: 750,
							duration: 60000
						});
					
						imageClockSlider = $("#imageClock").data("backstretch");
					
						if (aantalSeasonImages > 1)
						{
							$.each(seasonImages, function( index, value ) 
							{
								imageClockSlider.images.push(value);
							});
						}
					}
					
				}
				else
				{
					$("#imageClock").css("background-image", "none");
					
					if (clockHolderSlider)
					{
						clockHolderSlider.destroy();
					}
					
					if (imageClockSlider)
					{
						imageClockSlider.destroy();
					}
					
					if(iosVERSION < 6){
						setTimeout(function(){
							$("#clockHolder").css("background-image", "url('"+imageUrl1+"')");
						},500);
					}else{
						$("#clockHolder").backstretch(imageUrl1, 
						{
							fade: 750,
							duration: 60000
						});
						
						clockHolderSlider = $("#clockHolder").data("backstretch");
						
						if (aantalSeasonImages > 1)
						{
							$.each(seasonImages, function( index, value ) 
							{
								clockHolderSlider.images.push(value);
							});
						}
					}
				}
			}
		});
	});
	if(parseInt(productType, 10) === 6){
		$(".slidedownmenuBox .agendaClick").hide();
		$(".slidedownmenuBox .liSeparator").hide();
		$(".slidedownmenuBox .settingsClick").css("width", "100%");
	}else{
		$(".slidedownmenuBox .agendaClick").removeAttr("style");
		$(".slidedownmenuBox .liSeparator").removeAttr("style");
		$(".slidedownmenuBox .settingsClick").removeAttr("style");
	}
	jQuery("body").attr("firstTimeLoading", "yes");
	loadSettingsIsDone = true;
	startTheWholeProcess(true);
	
	if(parseInt(internet, 10) === 0){
		placeWeather(clockType, false, height, width);
	}
}

$(document).ready(function()
{
    loadSettings();
});


var arr = [
	{val : "icoon1", text: "ANDERS"},
	{val : "icoon2", text: "MEDICIJNEN"},
	{val : "icoon3", text: "BEZOEK"},
	{val : "icoon4", text: "ETEN"},
	{val : "icoon5", text: "SLAPEN"},
	{val : "icoon6", text: "DOKTER"},
	{val : "icoon7", text: "WASSEN"}
];


/**
 * I Need Commpent
 *
 */
function saveEvent()
{
	$(".add").show();
	$(".save").hide();
	var time,
		day,
		icon,
		message,
		newID,
		update,
		radio,
		melding = {},
		pushItem = true,
		DateNow = new Date(),
		nowMonth = DateNow.getMonth() + 1,
		nowToday = DateNow.getUTCDate()+"-"+nowMonth+"-"+DateNow.getFullYear(),
		checkArray = [],
		clockArrayLength = clockArray.length,
		d = 0;
	
	update = $("#hidden").val();
	time = $(".timevul").val();
	
	if (time === "")
	{
		// time empty
		//get current time
		var now = new Date(),
			hours = now.getHours(),
			minutes = now.getMinutes();
		time = hours+":"+minutes;
	}
	time = time.toString();
	time = time.replace(":", "");
	day = $("#day").val();
	icon = $("#icon").val();
	message = $("#message").val();
	radio = $("input[name='herhaal']:checked").val();

	if(!radio)
	{
		var	radio  = "not";
	}
	
	var repeate = radio;
	
	if (message === "")
	{
		$(clockAidLang[lang].icons).each(function()
		{
			if(this.val === icon)
			{
				message = this.text;
			}
		});
	}
	if (message === "")
	{
		if(icon === "icon")
		{
			message = clockAidLang[lang].iconsDefault;
		}
	}
	
	
	if (window.Android)
	{
		Android.addEvent(time, day, icon, message, repeate);
	}
	else
	{
		NativeBridge.addEvent(time, day, icon, message, repeate);
	}
	
	// make a nice object for the clock
	if (update === "ja")
	{
		pushItem = false;
		melding.id = $("#id").val();
	}
	else
	{
		melding.id = calendarArray.length;
	}
	
	melding.time = time;
	melding.day = day;
	melding.icon = icon;
	melding.message = message;
	melding.repeate = repeate;
	if (parseInt(internet, 10) === 0)
	{
		if (update === "ja")
		{
			api.updateEvent(melding.id, melding.time, melding.day, melding.icon, melding.message, melding.repeate);
			calender.updateInArray(melding);
			updateInArray(melding);
		}
		else
		{
			api.saveEvent(melding.id, melding.time, melding.day, melding.icon, melding.message, melding.repeate);
			calender.placeInArray(melding);
		}
	}
	
	var arr = clockArray;
	var newArr = [];
			
	for (var index in arr)
	{
		if( arr[index] )
		{
			newArr.push( arr[index] );
		}
	}
				
	clockArray = newArr;
	
	//SETTING UP ARRAY4
	for (var e = 0; e < clockArrayLength; e++)
	{
		if (typeof clockArray[e] !== "undefined") 
		{	
			if(clockArray[e].day === day)
			{
				checkArray[d] = clockArray[e];
				d++;
			}
		}
	}
	
	if (Search_Array(checkArray, melding.time))
	{
		pushItem = false;
	}

	if(pushItem)
	{
		calendarArray.push(melding);
		calendar_items.push(melding);
	}
	
	setTimeout(function()
	{
		calender.resetList();
		resetScrollHeight();
	}, 150);
}

/**
 * I Need Commpent
 *
 * @param * newItem
 */
function updateInArray (newItem)
{
	var length = clockArray.length;
	
	for (var i = 0; i < length; i++)
	{
		if(clockArray[i].id === newItem.id)
		{
			clockArray[i] = newItem;
		}
	}
	
	setTimeout(function()
	{
		self.resetTheArray();
	}, 100);
}

/**
 * I Need Commpent
 *
 */
function resetTheArray()
{
	var length = clockArray.length,
		newArray = [],
		j = 0;
	
	for (var i = 0; i < length; i++)
	{
		if(!clockArray[i])
		{
			i++;
		}
		
		newArray[j] = clockArray[i];
		j++;
	}
	
	clockArray = newArray;
}

/**
 * I Need Commpent
 *
 * @param * view
 */
function swithView(view)
{
	loadSettingsIsDone = false;
	closeMenu();
	
	$(".current").removeClass("current");
	$("."+view).addClass("current");
	
	if(view === "settings")
	{
		settingTimer = setTimeout(function(){swithView("clock");}, 300000);
	}
	else
	{
		if(settingTimer)
		{
			clearTimeout(settingTimer);
			settingTimer = 0;
		}
	}
	
	if(view === "clock")
	{
		$("body").attr("SwitchTrueFalse", "yes");
		$("body").attr("clockPage", "yes");
		setTimeout(function()
		{
			loadSettings();
			checkIfUpdateNeeded(false);
		},500);
	}
	else
	{
		$("body").attr("clockPage", "no");
		if(view === "upgrade")
		{
			var upgradeHeight = $(".upgradeBox").innerHeight();
			$(".upgradeBox").height(upgradeHeight);
			$(".upgradeBox form").height(upgradeHeight);
			var upgradeMarg = (height - (upgradeHeight + 95)) / 2;
			$(".upgradeBox form").css("margin-top", upgradeMarg+"px");
		}
		else
		{
			calender.resetList();
			resetScrollHeight();
			if(view === "settings")
			{
				$(".filesdynamic").html("");
				store.get("seasonImagesHtml", function(ok, val)
				{
					if (ok)
					{
						$(".filesdynamic").append(val);
					}
				});
				store.get("settingImages", function(ok, val)
				{
					if (ok)
					{
						$(".filesdynamic").append(val);
					}
				});
				
				$.each(photoList, function( index, value ) 
				{
					console.log(value);
					var foto = "";
					foto = foto + '<li class="ownImages" name="foto_' + index + '" >';
					foto = foto + '<img src="' + value + '" width="50" height="50" style="float:left" />';
					foto = foto + '<h1>Foto ' + index + '</h1>';
					foto = foto + '<span class="removeFoto" name="foto_' + index + '"></span>';
					foto = foto + '<div class="clear"></div></li>';
								
					$(".filesdynamic").append(foto);
				});				
				
				store.get("fototype", function(ok, val) 
				{
					var fotoTypeVal = "";
					if (ok)
					{
						if (val === null)
						{
							$(".foto").val("seizoen");
							fotoTypeVal = "seizoen";
						}
						else
						{
							$(".foto").val(val);
							fotoTypeVal = val;
						}
						
						if(fotoTypeVal === "geen")
						{
							$("#container_settings .filesdynamic").hide();
						}
						else if(fotoTypeVal === "eigenfoto")
						{
							$(".ownImages").show();
							$(".seasonImages").hide();
							$("#container_settings .filesdynamic").show();
						}
						else if(fotoTypeVal === "seizoen")
						{
							$(".ownImages").hide();
							$(".seasonImages").show();
							$("#container_settings .filesdynamic").show();
						}
					}
				});
				
				setTimeout(function()
				{
					$(".ownImages").first().css("padding-top", "20px");
					calender.iScroller2();
				}, 50);
			}
		}
		
		if(view === "clock")
		{
			setTimeout(function()
			{
				newItemsLength = calendar_items.length;
				for (var i = 0; i < newItemsLength; i++) 
				{
					clockArray.push(calendar_items[i]);
				}
				calendar_items = [];
			}, 900);
		}
	}
}

/**
 * I Need Commpent
 *
 */
function addFoto()
{
	$("#hid").trigger("click");
}

$("#hid").live("change", function()
{
	$("#file_list_form").ajaxForm(
	{
		beforeSubmit:	showRequest,  // pre-submit callback 
		success:		showResponse,  // post-submit callback 
		url:			"comment.php" ,
		clearForm:		true 
	}).submit();
});
 
/**
 * post-submit callback 
 *
 * @param * responseText
 * @param * statusText
 * @param * xhr
 * @param * $form
 */
function showResponse(responseText, statusText, xhr, $form)
{
	var obj = $.parseJSON( responseText ),
		outHtml = obj.html;
	
	$(".filesdynamic").append(outHtml);
	//api.debug("status: " + statusText + "\n\nresponseText: \n" + responseText + "\n\nThe output div should have already been updated with the responseText."); 
}

/**
 * I Need Commpent
 *
 * @param * formData
 * @param * jqForm
 * @param * options
 */
function showRequest(formData, jqForm, options)
{ 
    var queryString = $.param(formData); 
	return true; 
} 

/**
 * I Need Commpent
 *
 * @param * obj
 */
function editEvent(obj)
{
	var id;
	
	if ($(obj).attr("id"))
	{
		id = $(obj).attr("id");
    }
	else
	{
		id = $(obj).parent().attr("id");
    }
	
	var res = id.split("_");
	calender.editEvent(res[1]);	
}

//// Sound js
/**
 * Start de alarm
 *
 * @param * temp
 */
function soundStart(temp)
{
	if (temp)
	{
		tempPlay = true;
	}
	
	var soundType;
	store.get("sound", function(ok, val) 
	{
		if (ok)
		{
			if (val == null)
			{
				// Default setting
				soundType = 0;	
			}
			else
			{
				soundType = val;
			}
		}
	});
	
	if(!playing)
	{
		if (soundType !== 0)
		{
			//Stop all sounds 
			clockStop();
			
			// start the sound
			NativeBridge.setRepeat(true);
			NativeBridge.setPlay(soundType);
			playing = true;
		}
	}
}

/**
 * Stop de alarm
 *
 * @param * tempoff
 */
function soundStop(tempoff)
{
	var stopYes = false;
	
	if(tempPlay && tempoff)
	{
		stopYes = true;
	}
	
	if(tempPlay === false)
	{
		stopYes = true;
	}
	
	if(playing && stopYes)
	{
		playing = false;
		clockStop();
		NativeBridge.setRepeat(true);
		NativeBridge.setPlay(tikTakIndex);
		
		store.get("tikclock", function(ok, val)
		{
			if (ok)
			{
				if (parseInt(val, 10) === 0)
				{
					clockStop();
				}
			}
		});
	}
}

/**
 * Start de clock
 *
 */
function clockStart()
{
	if(jQuery("body").attr("Alarm") === "no" )
	{
		clockStop();
		NativeBridge.setRepeat(true);
		NativeBridge.setPlay(tikTakIndex);
		
		store.get("tikclock", function(ok, val)
		{
			if (ok)
			{
				//console.info(parseInt(val, 10));

				if (parseInt(val, 10) === 0)
				{
					clockStop();
				}
			}
		});
	}
}

/**
 * Stop de clock
 *
 */
function clockStop()
{
	NativeBridge.setStop();
}

//// Native Bridge
var NativeBridge = 
{
	/**
	 * I Need Commpent
	 *
	 * @param * token
	 */
	call : function call(token) 
	{
		var args = {}; 
		args.code = token;

		var parms = "iphoneTools:update:"+ encodeURIComponent(JSON.stringify(args));
		window.location = parms;
	},
	
	/**
	 * I Need Commpent
	 *
	 * @param * token
	 */
	update : function update(token)
	{
		api.saveToken(token);
	},
	
	/**
	 * I Need Commpent
	 *
	 * @param * time
	 * @param * day
	 * @param * icon
	 * @param * message
	 * @param * herhaal
	 */
	addEvent : function addEvent(time, day, icon, message, herhaal)
	{
		var args		= {}; 
		args.time		= time;
		args.day		= day;
		args.icon		= icon;
		args.message	= message;
		args.repate		= herhaal;
		
		var parms = "iphoneTools:addEvent:"+ encodeURIComponent(JSON.stringify(args));
		//api.debug(parms);
		window.location = parms;
	},
	
	/**
	 * I Need Commpent
	 *
	 * @param * type
	 */
	setType : function(type)
	{
		//api.debug(type);
		productType = type;
		
		if (userID === 0)
		{
			if (window.Android)
			{
				Android.checkUser();
			}
		}
	},
	
	/**
	 * I Need Commpent
	 *
	 */
	getEvents : function()
	{
		var args	= {}; 
		args.test = "test";
		var parms = "iphoneTools:getEvents:"+ encodeURIComponent(JSON.stringify(args));
		//api.debug(parms);
		window.location = parms;
	},
	
	/**
	 * I Need Commpent
	 *
	 * @param * taal
	 */
	updateTaal : function(taal)
	{
		//api.debug(taal);
		lang = taal;
	},
	
	/**
	 * I Need Commpent
	 *
	 * @param * id
	 */
	setClient : function(id)
	{
		userID = id;
		api.setClientID(id);
		api.start();
	},
	
	/**
	 * Load the iPad update view
	 *
	 * @param * id
	 */
	loadUpdateView: function () 
	{
		var args = {};
		args.test = "test";
		var parms = "iphoneTools:inAppUpdate:" + encodeURIComponent(JSON.stringify(args));
		window.location = parms;
	},
	
	/**
	 * Get all loaded sounds from the app
	 *
	 * @param array sounds
	 */
	setSounds : function(sounds)
	{
		$.each(sounds, function( index, value ) 
		{
			playList.push(value.songName);
		});
		
		
	},
	
	/**
	 * I Need Commpent
	 *
	 * @param * id
	 */
	setPlay : function (soundIndex)
	{
		if (window.Android)
		{
			Android.soundPlay(soundIndex);
		}
		else
		{
			var args = {};
			args.soundID = soundIndex;
			args.repeat = repeatTheSong;
			var parms = "iphoneTools:playSound:" + encodeURIComponent(JSON.stringify(args));
		
			window.location = parms;
		}
	},
	
	/**
	 * I Need Commpent
	 *
	 * @param * id
	 */
	setStop : function ()
	{
		if (window.Android)
		{
			Android.soundStop();
		}
		else
		{
			var args = {};
			args.test = "test";
			var parms = "iphoneTools:stopSound:" + encodeURIComponent(JSON.stringify(args));
		
			window.location = parms;
		}
	},
	
	/**
	 * I Need Commpent
	 *
	 * @param * id
	 */
	setRepeat : function (option)
	{
		if (window.Android)
		{
			Android.setRepeat(option);
		}
		else
		{
			repeatTheSong = option;
			/* Ging te snel waardoor deze functie niet werd uitgevoerd nu samengevoegd in setPlay
			var args = {};
			args.repeat = option;
			var parms = "iphoneTools:setRepeat:" + encodeURIComponent(JSON.stringify(args));
		
			window.location = parms;
			*/
		}
	},
	
	/**
	 * I Need Commpent
	 *
	 * @param * id
	 */
	setPhoto : function (photos)
	{
		var obj = jQuery.parseJSON(photos);
		$.each(photos, function( index, value ) 
		{
			var id = value.id,
				fotoHtml = "",
				photo = value.photo;
			
			photoList.push(photo);
			
			fotoHtml = fotoHtml + '<li class="ownImages" name="foto_' + id + '">';
			fotoHtml = fotoHtml + '<img src="'+ photo +'" width="50" height="50" style="float:left" />';
			fotoHtml = fotoHtml + '<h1>Foto ' + id + '</h1>';
			fotoHtml = fotoHtml + '<span class="removeFoto" name="foto_' + id + '"></span>';
			fotoHtml = fotoHtml + '<div class="clear"></div></li>';
		
			$(".filesdynamic").append(fotoHtml);
			
		});
	},
	
	/**
	 * I Need Commpent
	 *
	 * @param * id
	 */
	setPhotos : function (photos)
	{
		var obj = jQuery.parseJSON(photos);
		$.each(obj, function( index, value ) 
		{
			photoList.push(value.photoPath);
		});
		console.log(photoList);
	},
	
	/**
	 * I Need Commpent
	 *
	 * @param * id
	 */
	getPhotos : function()
	{
		if (window.Android)
		{
			// TODO: Deze function word niet meer gebuikt
			//Android.getFotos();
		}
		else
		{
			var args = {};
			args.test = "test";
			var parms = "iphoneTools:getFotos:" + encodeURIComponent(JSON.stringify(args));
		
			window.location = parms;
		}
	},
	
	/**
	 * I Need Commpent
	 *
	 * @param * id
	 */
	removePhoto : function (id)
	{
		if (window.Android)
		{
			Android.removePhoto(id);
		}
		else
		{
			var args = {};
			args.test = "test";
			var parms = "iphoneTools:getFotos:" + encodeURIComponent(JSON.stringify(args));
		
			window.location = parms;
		}
	},
	
	/**
	 * I Need Commpent
	 *
	 * @param * id
	 */
	showPhotoView : function()
	{
		if (window.Android)
		{
			Android.showFotoView();
		}
		else
		{
			var args = {};
			args.test = "test";
			var parms = "iphoneTools:showFotoView:" + encodeURIComponent(JSON.stringify(args));
		
			window.location = parms;
		}
	}
};

// clock js
var clockWidthHeight,//width and height of the clock
	clockWidthHeight2,
	clockDiv,
	secondHand,
	minuteHand,
	hourHand,
	imgsLoaded = 0,
	secondHandSpeed,
	smoothRotation = false,
	useSecondHand = true,
	imagesToLoad = 4,
	callInterval = 1000;
	
/**
 * I Need Commpent
 *
 * @param * config
 */
AnalogClock = function(config)
{
	imgsLoaded = 0;
	clockDiv = $("#" + config.divId);
	clockWidthHeight = config.clockWidthAndHeight;
	clockWidthHeight2 = config.clockWidthAndHeight2;
	secondHandSpeed = config.secondHandSpeed;
	
	if(config.useSecondHand === "false")
	{
		useSecondHand = false;
		imagesToLoad = 3;
	}	
	
	if(config.smoothRotation === "true" && useSecondHand)
	{
		smoothRotation = true;
		callInterval = 50;
	}
	
	//set clock holder css
	clockDiv.css({"height":clockWidthHeight + "px", "width":clockWidthHeight + "px"});
	
	//add graphical elements 
	clockDiv.append('<img id="shadeClock" src="' + config.shadeHighResImg + '" height="'+clockWidthHeight2+'" width="'+clockWidthHeight2+'" />');
	
	if(parseInt(clockType, 10) === 2)
	{
		clockDiv.append('<img id="bgClock" src="' + config.clockFaceHighResImg + '" height="'+clockWidthHeight2+'" width="'+clockWidthHeight2+'" />');
	}
	else
	{
		clockDiv.append('<img id="bgClock" src="' + config.clockFaceHighResImg2 + '" height="'+clockWidthHeight2+'" width="'+clockWidthHeight2+'" />');
	}
	
	clockDiv.append('<img id="hourHand" src="' + config.hourHandHighResImg + '" height="'+clockWidthHeight2+'" />');
	clockDiv.append('<img id="minuteHand" src="' + config.minuteHandHighResImg + '" height="'+clockWidthHeight2+'" />');
	if(useSecondHand) 
	{
		clockDiv.append('<img id="secondHand" src="' + config.secondHandHighResImg + '" height="'+clockWidthHeight2+'" />');
	}
	
	//define elements
	if(useSecondHand)
	{
		secondHand = $("#secondHand");
	}
	
	minuteHand = $("#minuteHand");
	hourHand = $("#hourHand");
	
	//check to see if the images are loaded
	
	$("#bgClock").load(function()
	{
		checkIfImagesLoaded();
	});
	
	if(useSecondHand)
	{
		secondHand.load(function()
		{
			checkIfImagesLoaded();
		});
	}
	
	minuteHand.load(function()
	{
		checkIfImagesLoaded();
	});
	
	hourHand.load(function()
	{
		checkIfImagesLoaded();
	});
	
	//set clock css
	var handIds = $("#" + config.divId + " #shadeClock, #bgClock, #hourHand, #minuteHand, #secondHand");
	handIds.css({"position":"absolute"});
	//handIds.css({"position":"absolute"});
};

/**
 * I Need Commpent
 *
 */
function checkIfImagesLoaded()
{
	imgsLoaded++;
	if(imgsLoaded === imagesToLoad)//once all the images are loaded
	{
		if(useSecondHand)
		{ 
			secondHand.css({ 
				"height":secondHand.height()/2, 
				"width":secondHand.width()/2 
			});
		}
		
		minuteHand.css({ 
			"height":minuteHand.height()/2, 
			"width":minuteHand.width()/2 
		});
		
		hourHand.css({ 
			"height":hourHand.height()/2, 
			"width":hourHand.width()/2 
		});

		if(useSecondHand)
		{
			//set x and y pos
			secondHand.css({
				"left": (clockWidthHeight - (secondHand.width() - 3))/2 + "px", 
				"top": (clockWidthHeight - (secondHand.height() - 2))/2 + "px" 
			});
		}
		
		//set x and y pos
		minuteHand.css({
			"left": (clockWidthHeight - minuteHand.width())/2 + "px", 
			"top": (clockWidthHeight - minuteHand.height())/2 + "px"
		});
		
		//set x and y pos
		hourHand.css({
			"left": (clockWidthHeight - hourHand.width())/2 + "px", 
			"top": (clockWidthHeight - hourHand.height())/2 + "px" 
		});	
			
		if(useSecondHand)
		{
			setSecondStart();
		}
		
		//call rotatehands function
		setInterval(function()
		{
			rotateHands();
		}, callInterval);//1000 = 1 second
			
		rotateHands();//make sure they start in the right position
	}
}

/**
 * I Need Commpent
 *
 */
function setSecondStart()
{
	var now = new Date(),
		secondAngle = 6 * now.getSeconds();//turn the time into angle
	secondHand.rotate(secondAngle, "abs");//set the hand angle
}

/**
 * I Need Commpent
 *
 */
function rotateHands()
{
	//get current time/date from local computer
	var now = new Date(),
		smoothSecondAngle,
		minuteAngle,
		hourAngle,
		
		//set the second hand
		secondAngle = 6 * now.getSeconds();//turn the time into angle
	
	if(useSecondHand)
	{
		if(smoothRotation)
		{
			smoothSecondAngle = now.getMilliseconds()/1000 * 6 + secondAngle;
			secondHand.rotate(smoothSecondAngle, "abs");//set the hand angle
		}
		else
		{
			if(secondAngle === 0)
			{
				secondHand.rotate(-6, "abs");//set the hand angle
			}
			secondHand.rotate({ animateTo:secondAngle, duration:secondHandSpeed}, "abs");
		}
	}
	
	//set the minute hand
	minuteAngle = 6 * now.getMinutes() + secondAngle/60;//turn the time into angle
	minuteHand.rotate(minuteAngle, "abs");//set the hand angle
	
	//set the hour hand
	hourAngle = 360/12 * now.getHours();//turn the time into angle
	hourHand.rotate((hourAngle + minuteAngle/12)%360, "abs"); //set the hand angle	
}

/**
 * I Need Commpent
 *
 */
function get_query()
{
    var url = location.href,
		qs = url.substring(url.indexOf("?") + 1).split("&");
    
	for(var i = 0, result = {}; i < qs.length; i++)
	{
        qs[i] = qs[i].split("=");
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
	}
    return result;
}
