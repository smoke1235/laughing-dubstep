/*jshint -W044 */
/*jshint -W004 */
/*jshint -W038 */
/*jshint -W107 */
/*jshint -W020 */
/*jshint -W003 */
/*jshint -W018 */

/*global	r, 
			px,
			iScroll, 
			startDateB, 
			ul_list_days, 
			clockAidLang, 
			lang, 
			div_dates, 
			cl_sort_by,
			day_name,
			toggleDP,
			ul_list,
			added_events,
			event_to_time,
			event_to_time_date_selected,
			event_to_time_end,
			endDate,
			event_date,
			event_month,
			event_year,
			recurring_frecuency_active,
			li_event_icon,
			clear,
			prev_month,
			next_month,
			addIcon,
			addText,
			saveIcon,
			saveText,
			saveText2,
			save,
			add,
			nav,
			div_info,
			div_nav,
			dayNamesLength,
			d,
			div_days,
			list_days,
			calendar_list,
			li_time,
			li_title,
			li_priority,
			h2_sort_by,
			ul_list_box,
			saveEvent,
			resetScrollHeight,
			date_selected,
			$dp,
			addClick,
			$, 
			binHere
*/

/**
 * Version: 1.0 Alpha-1
 * Build Date: 13-Nov-2007
 * Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.
 * Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
 */
Date.CultureInfo = {
    name: "en-US",
    englishName: "English (United States)",
    nativeName: "English (United States)",
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],
    monthNames: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
    abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
    amDesignator: "AM",
    pmDesignator: "PM",
    firstDayOfWeek: 0,
    twoDigitYearMax: 2029,
    dateElementOrder: "mdy",
    formatPatterns: {
        shortDate: "M/d/yyyy",
        longDate: "dddd, MMMM dd, yyyy",
        shortTime: "h:mm tt",
        longTime: "h:mm:ss tt",
        fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt",
        sortableDateTime: "yyyy-MM-ddTHH:mm:ss",
        universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",
        rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",
        monthDay: "MMMM dd",
        yearMonth: "MMMM, yyyy"
    },
    regexPatterns: {
        jan: /^jan(uary)?/i,
        feb: /^feb(ruary)?/i,
        mar: /^mar(ch)?/i,
        apr: /^apr(il)?/i,
        may: /^may/i,
        jun: /^jun(e)?/i,
        jul: /^jul(y)?/i,
        aug: /^aug(ust)?/i,
        sep: /^sep(t(ember)?)?/i,
        oct: /^oct(ober)?/i,
        nov: /^nov(ember)?/i,
        dec: /^dec(ember)?/i,
        sun: /^su(n(day)?)?/i,
        mon: /^mo(n(day)?)?/i,
        tue: /^tu(e(s(day)?)?)?/i,
        wed: /^we(d(nesday)?)?/i,
        thu: /^th(u(r(s(day)?)?)?)?/i,
        fri: /^fr(i(day)?)?/i,
        sat: /^sa(t(urday)?)?/i,
        future: /^next/i,
        past: /^last|past|prev(ious)?/i,
        add: /^(\+|after|from)/i,
        subtract: /^(\-|before|ago)/i,
        yesterday: /^yesterday/i,
        today: /^t(oday)?/i,
        tomorrow: /^tomorrow/i,
        now: /^n(ow)?/i,
        millisecond: /^ms|milli(second)?s?/i,
        second: /^sec(ond)?s?/i,
        minute: /^min(ute)?s?/i,
        hour: /^h(ou)?rs?/i,
        week: /^w(ee)?k/i,
        month: /^m(o(nth)?s?)?/i,
        day: /^d(ays?)?/i,
        year: /^y((ea)?rs?)?/i,
        shortMeridian: /^(a|p)/i,
        longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i,
        timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt)/i,
        ordinalSuffix: /^\s*(st|nd|rd|th)/i,
        timeContext: /^\s*(\:|a|p)/i
    },
    abbreviatedTimeZoneStandard: {
        GMT: "-000",
        EST: "-0400",
        CST: "-0500",
        MST: "-0600",
        PST: "-0700"
    },
    abbreviatedTimeZoneDST: {
        GMT: "-000",
        EDT: "-0500",
        CDT: "-0600",
        MDT: "-0700",
        PDT: "-0800"
    }
};
Date.getMonthNumberFromName = function (name) {
    var n = Date.CultureInfo.monthNames,
        m = Date.CultureInfo.abbreviatedMonthNames,
        s = name.toLowerCase();
    for (var i = 0; i < n.length; i++) {
        if (n[i].toLowerCase() === s || m[i].toLowerCase() === s) {
            return i;
        }
    }
    return -1;
};
Date.getDayNumberFromName = function (name) {
    var n = Date.CultureInfo.dayNames,
        m = Date.CultureInfo.abbreviatedDayNames,
        o = Date.CultureInfo.shortestDayNames,
        s = name.toLowerCase();
    for (var i = 0; i < n.length; i++) {
        if (n[i].toLowerCase() === s || m[i].toLowerCase() === s) {
            return i;
        }
    }
    return -1;
};
Date.isLeapYear = function (year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};
Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};
Date.getTimezoneOffset = function (s, dst) {
    return (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST[s.toUpperCase()] : Date.CultureInfo.abbreviatedTimeZoneStandard[s.toUpperCase()];
};
Date.getTimezoneAbbreviation = function (offset, dst) {
    var n = (dst || false) ? Date.CultureInfo.abbreviatedTimeZoneDST : Date.CultureInfo.abbreviatedTimeZoneStandard,
        p;
    for (p in n) {
        if (n[p] === offset) {
            return p;
        }
    }
    return null;
};
Date.prototype.clone = function () {
    return new Date(this.getTime());
};
Date.prototype.compareTo = function (date) {
    if (isNaN(this)) {
        throw new Error(this);
    }
    if (date instanceof Date && !isNaN(date)) {
        return (this > date) ? 1 : (this < date) ? -1 : 0;
    } else {
        throw new TypeError(date);
    }
};
Date.prototype.equals = function (date) {
    return (this.compareTo(date) === 0);
};
Date.prototype.between = function (start, end) {
    var t = this.getTime();
    return t >= start.getTime() && t <= end.getTime();
};
Date.prototype.addMilliseconds = function (value) {
    this.setMilliseconds(this.getMilliseconds() + value);
    return this;
};
Date.prototype.addSeconds = function (value) {
    return this.addMilliseconds(value * 1000);
};
Date.prototype.addMinutes = function (value) {
    return this.addMilliseconds(value * 60000);
};
Date.prototype.addHours = function (value) {
    return this.addMilliseconds(value * 3600000);
};
Date.prototype.addDays = function (value) {
    return this.addMilliseconds(value * 86400000);
};
Date.prototype.addWeeks = function (value) {
    return this.addMilliseconds(value * 604800000);
};
Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};
Date.prototype.addYears = function (value) {
    return this.addMonths(value * 12);
};
Date.prototype.add = function (config) {
    if (typeof config === "number") {
        this._orient = config;
        return this;
    }
    var x = config;
    if (x.millisecond || x.milliseconds) {
        this.addMilliseconds(x.millisecond || x.milliseconds);
    }
    if (x.second || x.seconds) {
        this.addSeconds(x.second || x.seconds);
    }
    if (x.minute || x.minutes) {
        this.addMinutes(x.minute || x.minutes);
    }
    if (x.hour || x.hours) {
        this.addHours(x.hour || x.hours);
    }
    if (x.month || x.months) {
        this.addMonths(x.month || x.months);
    }
    if (x.year || x.years) {
        this.addYears(x.year || x.years);
    }
    if (x.day || x.days) {
        this.addDays(x.day || x.days);
    }
    return this;
};
Date._validate = function (value, min, max, name) {
    if (typeof value !== "number") {
        throw new TypeError(value + " is not a Number.");
    } else if (value < min || value > max) {
        throw new RangeError(value + " is not a valid value for " + name + ".");
    }
    return true;
};
Date.validateMillisecond = function (n) {
    return Date._validate(n, 0, 999, "milliseconds");
};
Date.validateSecond = function (n) {
    return Date._validate(n, 0, 59, "seconds");
};
Date.validateMinute = function (n) {
    return Date._validate(n, 0, 59, "minutes");
};
Date.validateHour = function (n) {
    return Date._validate(n, 0, 23, "hours");
};
Date.validateDay = function (n, year, month) {
    return Date._validate(n, 1, Date.getDaysInMonth(year, month), "days");
};
Date.validateMonth = function (n) {
    return Date._validate(n, 0, 11, "months");
};
Date.validateYear = function (n) {
    return Date._validate(n, 1, 9999, "seconds");
};
Date.prototype.set = function (config) {
    var x = config;
    if (!x.millisecond && x.millisecond !== 0) {
        x.millisecond = -1;
    }
    if (!x.second && x.second !== 0) {
        x.second = -1;
    }
    if (!x.minute && x.minute !== 0) {
        x.minute = -1;
    }
    if (!x.hour && x.hour !== 0) {
        x.hour = -1;
    }
    if (!x.day && x.day !== 0) {
        x.day = -1;
    }
    if (!x.month && x.month !== 0) {
        x.month = -1;
    }
    if (!x.year && x.year !== 0) {
        x.year = -1;
    }
    if (x.millisecond !== -1 && Date.validateMillisecond(x.millisecond)) {
        this.addMilliseconds(x.millisecond - this.getMilliseconds());
    }
    if (x.second !== -1 && Date.validateSecond(x.second)) {
        this.addSeconds(x.second - this.getSeconds());
    }
    if (x.minute !== -1 && Date.validateMinute(x.minute)) {
        this.addMinutes(x.minute - this.getMinutes());
    }
    if (x.hour !== -1 && Date.validateHour(x.hour)) {
        this.addHours(x.hour - this.getHours());
    }
    if (x.month !== -1 && Date.validateMonth(x.month)) {
        this.addMonths(x.month - this.getMonth());
    }
    if (x.year !== -1 && Date.validateYear(x.year)) {
        this.addYears(x.year - this.getFullYear());
    }
    if (x.day !== -1 && Date.validateDay(x.day, this.getFullYear(), this.getMonth())) {
        this.addDays(x.day - this.getDate());
    }
    if (x.timezone) {
        this.setTimezone(x.timezone);
    }
    if (x.timezoneOffset) {
        this.setTimezoneOffset(x.timezoneOffset);
    }
    return this;
};
Date.prototype.clearTime = function () {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
    return this;
};
Date.prototype.isLeapYear = function () {
    var y = this.getFullYear();
    return (((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0));
};
Date.prototype.isWeekday = function () {
    return !(this.is().sat() || this.is().sun());
};
Date.prototype.getDaysInMonth = function () {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};
Date.prototype.moveToFirstDayOfMonth = function () {
    return this.set({
        day: 1
    });
};
Date.prototype.moveToLastDayOfMonth = function () {
    return this.set({
        day: this.getDaysInMonth()
    });
};
Date.prototype.moveToDayOfWeek = function (day, orient) {
    var diff = (day - this.getDay() + 7 * (orient || +1)) % 7;
    return this.addDays((diff === 0) ? diff += 7 * (orient || +1) : diff);
};
Date.prototype.moveToMonth = function (month, orient) {
    var diff = (month - this.getMonth() + 12 * (orient || +1)) % 12;
    return this.addMonths((diff === 0) ? diff += 12 * (orient || +1) : diff);
};
Date.prototype.getDayOfYear = function () {
    return Math.floor((this - new Date(this.getFullYear(), 0, 1)) / 86400000);
};
Date.prototype.getWeekOfYear = function (firstDayOfWeek) {
    var y = this.getFullYear(),
        m = this.getMonth(),
        d = this.getDate();
    var dow = firstDayOfWeek || Date.CultureInfo.firstDayOfWeek;
    var offset = 7 + 1 - new Date(y, 0, 1).getDay();
    if (offset === 8) {
        offset = 1;
    }
    var daynum = ((Date.UTC(y, m, d, 0, 0, 0) - Date.UTC(y, 0, 1, 0, 0, 0)) / 86400000) + 1;
    var w = Math.floor((daynum - offset + 7) / 7);
    if (w === dow) {
        y--;
        var prevOffset = 7 + 1 - new Date(y, 0, 1).getDay();
        if (prevOffset === 2 || prevOffset === 8) {
            w = 53;
        } else {
            w = 52;
        }
    }
    return w;
};
Date.prototype.isDST = function () {
    console.log('isDST');
    return this.toString().match(/(E|C|M|P)(S|D)T/)[2] === "D";
};
Date.prototype.getTimezone = function () {
    return Date.getTimezoneAbbreviation(this.getUTCOffset, this.isDST());
};
Date.prototype.setTimezoneOffset = function (s) {
    var here = this.getTimezoneOffset(),
        there = Number(s) * -6 / 10;
    this.addMinutes(there - here);
    return this;
};
Date.prototype.setTimezone = function (s) {
    return this.setTimezoneOffset(Date.getTimezoneOffset(s));
};
Date.prototype.getUTCOffset = function () {
    var n = this.getTimezoneOffset() * -10 / 6,
        r;
    if (n < 0) {
        r = (n - 10000).toString();
        return r[0] + r.substr(2);
    } else {
        r = (n + 10000).toString();
        return "+" + r.substr(1);
    }
};
Date.prototype.getDayName = function (abbrev) {
    return abbrev ? Date.CultureInfo.abbreviatedDayNames[this.getDay()] : Date.CultureInfo.dayNames[this.getDay()];
};
Date.prototype.getMonthName = function (abbrev) {
    return abbrev ? Date.CultureInfo.abbreviatedMonthNames[this.getMonth()] : Date.CultureInfo.monthNames[this.getMonth()];
};
Date.prototype._toString = Date.prototype.toString;
Date.prototype.toString = function (format) {
    var self = this;
    var p = function p(s) {
        return (s.toString().length === 1) ? "0" + s : s;
    };
    return format ? format.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g, function (format) {
        switch (format) {
        case "hh":
            return p(self.getHours() < 13 ? self.getHours() : (self.getHours() - 12));
        case "h":
            return self.getHours() < 13 ? self.getHours() : (self.getHours() - 12);
        case "HH":
            return p(self.getHours());
        case "H":
            return self.getHours();
        case "mm":
            return p(self.getMinutes());
        case "m":
            return self.getMinutes();
        case "ss":
            return p(self.getSeconds());
        case "s":
            return self.getSeconds();
        case "yyyy":
            return self.getFullYear();
        case "yy":
            return self.getFullYear().toString().substring(2, 4);
        case "dddd":
            return self.getDayName();
        case "ddd":
            return self.getDayName(true);
        case "dd":
            return p(self.getDate());
        case "d":
            return self.getDate().toString();
        case "MMMM":
            return self.getMonthName();
        case "MMM":
            return self.getMonthName(true);
        case "MM":
            return p((self.getMonth() + 1));
        case "M":
            return self.getMonth() + 1;
        case "t":
            return self.getHours() < 12 ? Date.CultureInfo.amDesignator.substring(0, 1) : Date.CultureInfo.pmDesignator.substring(0, 1);
        case "tt":
            return self.getHours() < 12 ? Date.CultureInfo.amDesignator : Date.CultureInfo.pmDesignator;
        case "zzz":
        case "zz":
        case "z":
            return "";
        }
    }) : this._toString();
};
Date.now = function () {
    return new Date();
};
Date.today = function () {
    return Date.now().clearTime();
};
Date.prototype._orient = +1;
Date.prototype.next = function () {
    this._orient = +1;
    return this;
};
Date.prototype.last = Date.prototype.prev = Date.prototype.previous = function () {
    this._orient = -1;
    return this;
};
Date.prototype._is = false;
Date.prototype.is = function () {
    this._is = true;
    return this;
};
Number.prototype._dateElement = "day";
Number.prototype.fromNow = function () {
    var c = {};
    c[this._dateElement] = this;
    return Date.now().add(c);
};
Number.prototype.ago = function () {
    var c = {};
    c[this._dateElement] = this * -1;
    return Date.now().add(c);
};
(function () {
    var $D = Date.prototype,
        $N = Number.prototype;
    var dx = ("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),
        mx = ("januari februari maart april mei juni juli augustus september oktober november december").split(/\s/),
        px = ("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),
        de;
    var df = function (n) {
        return function () {
            if (this._is) {
                this._is = false;
                return this.getDay() === n;
            }
            return this.moveToDayOfWeek(n, this._orient);
        };
    };
    for (var i = 0; i < dx.length; i++) {
        $D[dx[i]] = $D[dx[i].substring(0, 3)] = df(i);
    }
    var mf = function (n) {
        return function () {
            if (this._is) {
                this._is = false;
                return this.getMonth() === n;
            }
            return this.moveToMonth(n, this._orient);
        };
    };
    for (var j = 0; j < mx.length; j++) {
        $D[mx[j]] = $D[mx[j].substring(0, 3)] = mf(j);
    }
    var ef = function (j) {
        return function () {
            if (j.substring(j.length - 1) !== "s") {
                j += "s";
            }
            return this["add" + j](this._orient);
        };
    };
    var nf = function (n) {
        return function () {
            this._dateElement = n;
            return this;
        };
    };
    for (var k = 0; k < px.length; k++) {
        de = px[k].toLowerCase();
        $D[de] = $D[de + "s"] = ef(px[k]);
        $N[de] = $N[de + "s"] = nf(de);
    }
}());
Date.prototype.toJSONString = function () {
    return this.toString("yyyy-MM-ddThh:mm:ssZ");
};
Date.prototype.toShortDateString = function () {
    return this.toString(Date.CultureInfo.formatPatterns.shortDatePattern);
};
Date.prototype.toLongDateString = function () {
    return this.toString(Date.CultureInfo.formatPatterns.longDatePattern);
};
Date.prototype.toShortTimeString = function () {
    return this.toString(Date.CultureInfo.formatPatterns.shortTimePattern);
};
Date.prototype.toLongTimeString = function () {
    return this.toString(Date.CultureInfo.formatPatterns.longTimePattern);
};
Date.prototype.getOrdinal = function () {
    switch (this.getDate()) {
    case 1:
    case 21:
    case 31:
        return "st";
    case 2:
    case 22:
        return "nd";
    case 3:
    case 23:
        return "rd";
    default:
        return "th";
    }
};
(function () {
    Date.Parsing = {
        Exception: function (s) {
            this.message = "Parse error at '" + s.substring(0, 10) + " ...'";
        }
    };
    var $P = Date.Parsing;
    var _ = $P.Operators = {
        rtoken: function (r) {
            return function (s) {
                var mx = s.match(r);
                if (mx) {
                    return ([mx[0], s.substring(mx[0].length)]);
                } else {
                    throw new $P.Exception(s);
                }
            };
        },
        token: function (s) {
            return function (s) {
                return _.rtoken(new RegExp("^\s*" + s + "\s*"))(s);
            };
        },
        stoken: function (s) {
            return _.rtoken(new RegExp("^" + s));
        },
        until: function (p) {
            return function (s) {
                var qx = [],
                    rx = null;
                while (s.length) {
                    try {
                        rx = p.call(this, s);
                    } catch (e) {
                        qx.push(rx[0]);
                        s = rx[1];
                        continue;
                    }
                    break;
                }
                return [qx, s];
            };
        },
        many: function (p) {
            return function (s) {
                var rx = [],
                    r = null;
                while (s.length) {
                    try {
                        r = p.call(this, s);
                    } catch (e) {
                        return [rx, s];
                    }
                    rx.push(r[0]);
                    s = r[1];
                }
                return [rx, s];
            };
        },
        optional: function (p) {
            return function (s) {
                var r = null;
                try {
                    r = p.call(this, s);
                } catch (e) {
                    return [null, s];
                }
                return [r[0], r[1]];
            };
        },
        not: function (p) {
            return function (s) {
                try {
                    p.call(this, s);
                } catch (e) {
                    return [null, s];
                }
                throw new $P.Exception(s);
            };
        },
        ignore: function (p) {
            return p ? function (s) {
                var r = null;
                r = p.call(this, s);
                return [null, r[1]];
            } : null;
        },
        product: function () {
            var px = arguments[0],
                qx = Array.prototype.slice.call(arguments, 1),
                rx = [];
            for (var i = 0; i < px.length; i++) {
                rx.push(_.each(px[i], qx));
            }
            return rx;
        },
        cache: function (rule) {
            var cache = {}, r = null;
            return function (s) {
                try {
                    r = cache[s] = (cache[s] || rule.call(this, s));
                } catch (e) {
                    r = cache[s] = e;
                }
                if (r instanceof $P.Exception) {
                    throw r;
                } else {
                    return r;
                }
            };
        },
        any: function () {
            var px = arguments;
            return function (s) {
                var r = null;
                for (var i = 0; i < px.length; i++) {
                    if (px[i] == null) {
                        continue;
                    }
                    try {
                        r = (px[i].call(this, s));
                    } catch (e) {
                        r = null;
                    }
                    if (r) {
                        return r;
                    }
                }
                throw new $P.Exception(s);
            };
        },
        each: function () {
            var px = arguments;
            return function (s) {
                var rx = [],
                    r = null;
                for (var i = 0; i < px.length; i++) {
                    if (px[i] == null) {
                        continue;
                    }
                    try {
                        r = (px[i].call(this, s));
                    } catch (e) {
                        throw new $P.Exception(s);
                    }
                    rx.push(r[0]);
                    s = r[1];
                }
                return [rx, s];
            };
        },
        all: function () {
            var px = arguments,
                _ = _;
            return _.each(_.optional(px));
        },
        sequence: function (px, d, c) {
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            if (px.length === 1) {
                return px[0];
            }
            return function (s) {
                var r = null,
                    q = null;
                var rx = [];
                for (var i = 0; i < px.length; i++) {
                    try {
                        r = px[i].call(this, s);
                    } catch (e) {
                        break;
                    }
                    rx.push(r[0]);
                    try {
                        q = d.call(this, r[1]);
                    } catch (ex) {
                        q = null;
                        break;
                    }
                    s = q[1];
                }
                if (!r) {
                    throw new $P.Exception(s);
                }
                if (q) {
                    throw new $P.Exception(q[1]);
                }
                if (c) {
                    try {
                        r = c.call(this, r[1]);
                    } catch (ey) {
                        throw new $P.Exception(r[1]);
                    }
                }
                return [rx, (r ? r[1] : s)];
            };
        },
        between: function (d1, p, d2) {
            d2 = d2 || d1;
            var _fn = _.each(_.ignore(d1), p, _.ignore(d2));
            return function (s) {
                var rx = _fn.call(this, s);
                return [[rx[0][0], r[0][2]], rx[1]];
            };
        },
        list: function (p, d, c) {
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            return (p instanceof Array ? _.each(_.product(p.slice(0, -1), _.ignore(d)), p.slice(-1), _.ignore(c)) : _.each(_.many(_.each(p, _.ignore(d))), px, _.ignore(c)));
        },
        set: function (px, d, c) {
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            return function (s) {
                var r = null,
                    p = null,
                    q = null,
                    rx = null,
                    best = [
                        [], s
                    ],
                    last = false;
                for (var i = 0; i < px.length; i++) {
                    q = null;
                    p = null;
                    r = null;
                    last = (px.length === 1);
                    try {
                        r = px[i].call(this, s);
                    } catch (e) {
                        continue;
                    }
                    rx = [
                        [r[0]], r[1]
                    ];
                    if (r[1].length > 0 && !last) {
                        try {
                            q = d.call(this, r[1]);
                        } catch (ex) {
                            last = true;
                        }
                    } else {
                        last = true;
                    }
                    if (!last && q[1].length === 0) {
                        last = true;
                    }
                    if (!last) {
                        var qx = [];
                        for (var j = 0; j < px.length; j++) {
                            if (i !== j) {
                                qx.push(px[j]);
                            }
                        }
                        p = _.set(qx, d).call(this, q[1]);
                        if (p[0].length > 0) {
                            rx[0] = rx[0].concat(p[0]);
                            rx[1] = p[1];
                        }
                    }
                    if (rx[1].length < best[1].length) {
                        best = rx;
                    }
                    if (best[1].length === 0) {
                        break;
                    }
                }
                if (best[0].length === 0) {
                    return best;
                }
                if (c) {
                    try {
                        q = c.call(this, best[1]);
                    } catch (ey) {
                        throw new $P.Exception(best[1]);
                    }
                    best[1] = q[1];
                }
                return best;
            };
        },
        forward: function (gr, fname) {
            return function (s) {
                return gr[fname].call(this, s);
            };
        },
        replace: function (rule, repl) {
            return function (s) {
                var r = rule.call(this, s);
                return [repl, r[1]];
            };
        },
        process: function (rule, fn) {
            return function (s) {
                var r = rule.call(this, s);
                return [fn.call(this, r[0]), r[1]];
            };
        },
        min: function (min, rule) {
            return function (s) {
                var rx = rule.call(this, s);
                if (rx[0].length < min) {
                    throw new $P.Exception(s);
                }
                return rx;
            };
        }
    };
    var _generator = function (op) {
        return function () {
            var args = null,
                rx = [];
            if (arguments.length > 1) {
                args = Array.prototype.slice.call(arguments);
            } else if (arguments[0] instanceof Array) {
                args = arguments[0];
            }
            if (args) {
                for (var i = 0, px = args.shift(); i < px.length; i++) {
                    args.unshift(px[i]);
                    rx.push(op.apply(null, args));
                    args.shift();
                    return rx;
                }
            } else {
                return op.apply(null, arguments);
            }
        };
    };
    var gx = "optional not ignore cache".split(/\s/);
    for (var i = 0; i < gx.length; i++) {
        _[gx[i]] = _generator(_[gx[i]]);
    }
    var _vector = function (op) {
        return function () {
            if (arguments[0] instanceof Array) {
                return op.apply(null, arguments[0]);
            } else {
                return op.apply(null, arguments);
            }
        };
    };
    var vx = "each any all".split(/\s/);
    for (var j = 0; j < vx.length; j++) {
        _[vx[j]] = _vector(_[vx[j]]);
    }
}());
(function () {
    var flattenAndCompact = function (ax) {
        var rx = [];
        for (var i = 0; i < ax.length; i++) {
            if (ax[i] instanceof Array) {
                rx = rx.concat(flattenAndCompact(ax[i]));
            } else {
                if (ax[i]) {
                    rx.push(ax[i]);
                }
            }
        }
        return rx;
    };
    Date.Grammar = {};
    Date.Translator = {
        hour: function (s) {
            return function () {
                this.hour = Number(s);
            };
        },
        minute: function (s) {
            return function () {
                this.minute = Number(s);
            };
        },
        second: function (s) {
            return function () {
                this.second = Number(s);
            };
        },
        meridian: function (s) {
            return function () {
                this.meridian = s.slice(0, 1).toLowerCase();
            };
        },
        timezone: function (s) {
            return function () {
                var n = s.replace(/[^\d\+\-]/g, "");
                if (n.length) {
                    this.timezoneOffset = Number(n);
                } else {
                    this.timezone = s.toLowerCase();
                }
            };
        },
        day: function (x) {
            var s = x[0];
            return function () {
                this.day = Number(s.match(/\d+/)[0]);
            };
        },
        month: function (s) {
            return function () {
                this.month = ((s.length === 3) ? Date.getMonthNumberFromName(s) : (Number(s) - 1));
            };
        },
        year: function (s) {
            return function () {
                var n = Number(s);
                this.year = ((s.length > 2) ? n : (n + (((n + 2000) < Date.CultureInfo.twoDigitYearMax) ? 2000 : 1900)));
            };
        },
        rday: function (s) {
            return function () {
                switch (s) {
                case "yesterday":
                    this.days = -1;
                    break;
                case "tomorrow":
                    this.days = 1;
                    break;
                case "today":
                    this.days = 0;
                    break;
                case "now":
                    this.days = 0;
                    this.now = true;
                    break;
                }
            };
        },
        finishExact: function (x) {
            x = (x instanceof Array) ? x : [x];
            var now = new Date();
            this.year = now.getFullYear();
            this.month = now.getMonth();
            this.day = 1;
            this.hour = 0;
            this.minute = 0;
            this.second = 0;
            for (var i = 0; i < x.length; i++) {
                if (x[i]) {
                    x[i].call(this);
                }
            }
            this.hour = (this.meridian === "p" && this.hour < 13) ? this.hour + 12 : this.hour;
            if (this.day > Date.getDaysInMonth(this.year, this.month)) {
                throw new RangeError(this.day + " is not a valid value for days.");
            }
            var r = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second);
            if (this.timezone) {
                r.set({
                    timezone: this.timezone
                });
            } else if (this.timezoneOffset) {
                r.set({
                    timezoneOffset: this.timezoneOffset
                });
            }
            return r;
        },
        finish: function (x) {
            x = (x instanceof Array) ? flattenAndCompact(x) : [x];
            if (x.length === 0) {
                return null;
            }
            for (var i = 0; i < x.length; i++) {
                if (typeof x[i] === "function") {
                    x[i].call(this);
                }
            }
            if (this.now) {
                return new Date();
            }
            var today = Date.today();
            var method = null;
            var expression = !! (this.days !== null || this.orient || this.operator);
            if (expression) {
                var gap, mod, orient;
                orient = ((this.orient === "past" || this.operator === "subtract") ? -1 : 1);
                if (this.weekday) {
                    this.unit = "day";
                    gap = (Date.getDayNumberFromName(this.weekday) - today.getDay());
                    mod = 7;
                    this.days = gap ? ((gap + (orient * mod)) % mod) : (orient * mod);
                }
                if (this.month) {
                    this.unit = "month";
                    gap = (this.month - today.getMonth());
                    mod = 12;
                    this.months = gap ? ((gap + (orient * mod)) % mod) : (orient * mod);
                    this.month = null;
                }
                if (!this.unit) {
                    this.unit = "day";
                }
                if (this[this.unit + "s"] == null || this.operator != null) {
                    if (!this.value) {
                        this.value = 1;
                    }
                    if (this.unit === "week") {
                        this.unit = "day";
                        this.value = this.value * 7;
                    }
                    this[this.unit + "s"] = this.value * orient;
                }
                return today.add(this);
            } else {
                if (this.meridian && this.hour) {
                    this.hour = (this.hour < 13 && this.meridian === "p") ? this.hour + 12 : this.hour;
                }
                if (this.weekday && !this.day) {
                    this.day = (today.addDays((Date.getDayNumberFromName(this.weekday) - today.getDay()))).getDate();
                }
                if (this.month && !this.day) {
                    this.day = 1;
                }
                return today.set(this);
            }
        }
    };
    var _ = Date.Parsing.Operators,
        g = Date.Grammar,
        t = Date.Translator,
        _fn;
    g.datePartDelimiter = _.rtoken(/^([\s\-\.\,\/\x27]+)/);
    g.timePartDelimiter = _.stoken(":");
    g.whiteSpace = _.rtoken(/^\s*/);
    g.generalDelimiter = _.rtoken(/^(([\s\,]|at|on)+)/);
    var _C = {};
    g.ctoken = function (keys) {
        var fn = _C[keys];
        if (!fn) {
            var c = Date.CultureInfo.regexPatterns;
            var kx = keys.split(/\s+/),
                px = [];
            for (var i = 0; i < kx.length; i++) {
                px.push(_.replace(_.rtoken(c[kx[i]]), kx[i]));
            }
            fn = _C[keys] = _.any.apply(null, px);
        }
        return fn;
    };
    g.ctoken2 = function (key) {
        return _.rtoken(Date.CultureInfo.regexPatterns[key]);
    };
    g.h = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/), t.hour));
    g.hh = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/), t.hour));
    g.H = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/), t.hour));
    g.HH = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/), t.hour));
    g.m = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.minute));
    g.mm = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.minute));
    g.s = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.second));
    g.ss = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.second));
    g.hms = _.cache(_.sequence([g.H, g.mm, g.ss], g.timePartDelimiter));
    g.t = _.cache(_.process(g.ctoken2("shortMeridian"), t.meridian));
    g.tt = _.cache(_.process(g.ctoken2("longMeridian"), t.meridian));
    g.z = _.cache(_.process(_.rtoken(/^(\+|\-)?\s*\d\d\d\d?/), t.timezone));
    g.zz = _.cache(_.process(_.rtoken(/^(\+|\-)\s*\d\d\d\d/), t.timezone));
    g.zzz = _.cache(_.process(g.ctoken2("timezone"), t.timezone));
    g.timeSuffix = _.each(_.ignore(g.whiteSpace), _.set([g.tt, g.zzz]));
    g.time = _.each(_.optional(_.ignore(_.stoken("T"))), g.hms, g.timeSuffix);
    g.d = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
    g.dd = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
    g.ddd = g.dddd = _.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"), function (s) {
        return function () {
            this.weekday = s;
        };
    }));
    g.M = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/), t.month));
    g.MM = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/), t.month));
    g.MMM = g.MMMM = _.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"), t.month));
    g.y = _.cache(_.process(_.rtoken(/^(\d\d?)/), t.year));
    g.yy = _.cache(_.process(_.rtoken(/^(\d\d)/), t.year));
    g.yyy = _.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/), t.year));
    g.yyyy = _.cache(_.process(_.rtoken(/^(\d\d\d\d)/), t.year));
    _fn = function () {
        return _.each(_.any.apply(null, arguments), _.not(g.ctoken2("timeContext")));
    };
    g.day = _fn(g.d, g.dd);
    g.month = _fn(g.M, g.MMM);
    g.year = _fn(g.yyyy, g.yy);
    g.orientation = _.process(g.ctoken("past future"), function (s) {
        return function () {
            this.orient = s;
        };
    });
    g.operator = _.process(g.ctoken("add subtract"), function (s) {
        return function () {
            this.operator = s;
        };
    });
    g.rday = _.process(g.ctoken("yesterday tomorrow today now"), t.rday);
    g.unit = _.process(g.ctoken("minute hour day week month year"), function (s) {
        return function () {
            this.unit = s;
        };
    });
    g.value = _.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/), function (s) {
        return function () {
            this.value = s.replace(/\D/g, "");
        };
    });
    g.expression = _.set([g.rday, g.operator, g.value, g.unit, g.orientation, g.ddd, g.MMM]);
    _fn = function () {
        return _.set(arguments, g.datePartDelimiter);
    };
    g.mdy = _fn(g.ddd, g.month, g.day, g.year);
    g.ymd = _fn(g.ddd, g.year, g.month, g.day);
    g.dmy = _fn(g.ddd, g.day, g.month, g.year);
    g.date = function (s) {
        return ((g[Date.CultureInfo.dateElementOrder] || g.mdy).call(this, s));
    };
    g.format = _.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/), function (fmt) {
        if (g[fmt]) {
            return g[fmt];
        } else {
            throw Date.Parsing.Exception(fmt);
        }
    }), _.process(_.rtoken(/^[^dMyhHmstz]+/), function (s) {
        return _.ignore(_.stoken(s));
    }))), function (rules) {
        return _.process(_.each.apply(null, rules), t.finishExact);
    });
    var _F = {};
    var _get = function (f) {
        return _F[f] = (_F[f] || g.format(f)[0]);
    };
    g.formats = function (fx) {
        if (fx instanceof Array) {
            var rx = [];
            for (var i = 0; i < fx.length; i++) {
                rx.push(_get(fx[i]));
            }
            return _.any.apply(null, rx);
        } else {
            return _get(fx);
        }
    };
    g._formats = g.formats(["yyyy-MM-ddTHH:mm:ss", "ddd, MMM dd, yyyy H:mm:ss tt", "ddd MMM d yyyy HH:mm:ss zzz", "d"]);
    g._start = _.process(_.set([g.date, g.time, g.expression], g.generalDelimiter, g.whiteSpace), t.finish);
    g.start = function (s) {
        try {
            var r = g._formats.call({}, s);
            if (r[1].length === 0) {
                return r;
            }
        } catch (e) {}
        return g._start.call({}, s);
    };
}());
Date._parse = Date.parse;
Date.parse = function (s) {
    var r = null;
    if (!s) {
        return null;
    }
    try {
        r = Date.Grammar.start.call({}, s);
    } catch (e) {
        return null;
    }
    return ((r[1].length === 0) ? r[0] : null);
};
Date.getParseFunction = function (fx) {
    var fn = Date.Grammar.formats(fx);
    return function (s) {
        var r = null;
        try {
            r = fn.call({}, s);
        } catch (e) {
            return null;
        }
        return ((r[1].length === 0) ? r[0] : null);
    };
};
Date.parseExact = function (s, fx) {
    return Date.getParseFunction(fx)(s);
};

/**
 * @license 
 * jQuery Tools @VERSION Scrollable - New wave UI design
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/scrollable.html
 *
 * Since: March 2008
 * Date: @DATE 
 */
 
 
(function($) { 
	// static constructs
	$.tools = $.tools || {version: '@VERSION'};
	$.tools.calendar = {
		conf: {
			events_array: [],
			date_selected: new Date(),
			order_by: 1,
			No_Marg: 7,
			show_datepicker: false,
			show_priorities: false,
			show_sort_by: false,
			show_iScroller: false,
			onChangeMonth: function () {},
			onChangeDay: function () {},
			onClickMonthName: function () {},
			onClickEvents: function () {},
			link_color: '#00918a',
			prev_month : "prev_month",
			next_month : "next_month",
			list_days : "list_days",
			cl_sort_by : "cl_sort_by",
			list : "list",
			calendar_list : "calendar_list",
			regional : {
				closeText: 'gereed',
				prevText: 'vorige',
				nextText: 'volgende',
				currentText: 'vandaag',
				monthNames: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
				monthNamesShort: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
				dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
				dayNamesShort: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
				dayNamesMin: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
				CALENDAR_EVENTS: 'evenementen',
				CALENDAR_NO_ROWS: '<ul><li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;geen activiteiten gevonden voor deze datum.</li></ul>',
				CALENDAR_SORT_BY: 'soorteer op:',
				CALENDAR_TIME: 'tijd',
				CALENDAR_TITLE: 'title',
				CALENDAR_PRIORITY: 'prioriteit'
			}
		} 
	};
					
	// get hidden element's width or height even though it's hidden
	function dim(el, key){
		var v = parseInt(el.css(key), 10);
		if (v) { return v; }
		var s = el[0].currentStyle; 
		return s && s.width && parseInt(s.width, 10);	
	}

	function find(root, query) { 
		var el = $(query);
		return el.length < 2 ? el : root.parent().find(query);
	}
	var current;		
	
	// constructor
	function Calendar(root, conf) {   
		// current instance
		var self = this, 
			fire = root.add(self),
			itemWrap = root.children(),
			index = 0;
				
		if (!current) { 
			current = self; 
		} 
		
		// methods
		$.extend(self, {
			getConf: function(){
				return conf;	
			},	
			
			iScroller2 : function()
			{
				var myScroll5;
				$(".file_scroll_listDing").css("min-height", $(".filesdynamic").innerHeight());
				setTimeout(function(){
					myScroll5 = new iScroll("file_scroll_listDing", { hScrollbar: false, vScrollbar: true, scrollbarClass: "scroller", iScroll : true, snap : true, draggableScrollbars : true, bounce:false  });
				}, 500);
			},
			
			iScroller : function(){
				if (conf.show_iScroller === true){
					var myScroll4;
					$("#list").css("min-height", $("#list").innerHeight());
					setTimeout(function(){
						myScroll4 = new iScroll("list_scroller", { hScrollbar: false, vScrollbar: true, scrollbarClass: "scroller", iScroll : true, snap : true, draggableScrollbars : true, bounce:false  });
					}, 50);
				}
				
			},

			str_pad : function(input, pad_length, pad_string, pad_type){
				var half = '',
					pad_to_go, str_pad_repeater;
            
				str_pad_repeater = function (s, len) 
				{
					var collect = '',
						i;

					while (collect.length < len) 
					{
						collect += s;
					}
                
					collect = collect.substr(0, len);
					return collect;
				};
			
				input += '';
				pad_string = pad_string !== undefined ? pad_string : ' ';
            
				if (pad_type !== 'STR_PAD_LEFT' && pad_type !== 'STR_PAD_RIGHT' && pad_type !== 'STR_PAD_BOTH'){
					pad_type = 'STR_PAD_RIGHT';
				}
            
				if ((pad_to_go = pad_length - input.length) > 0){
					if (pad_type === 'STR_PAD_LEFT'){
						input = str_pad_repeater(pad_string, pad_to_go) + input;
					}else if (pad_type === 'STR_PAD_RIGHT'){
						input = input + str_pad_repeater(pad_string, pad_to_go);
					}else if (pad_type === 'STR_PAD_BOTH'){
						half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
						input = half + input + half;
						input = input.substr(0, pad_length);
					}
				}
				return input;
			},


			in_array : function(needle, haystack, argStrict) 
			{
				var key = '',
					strict = !! argStrict;
            
				if (strict){
					for (key in haystack){
						if (haystack[key] === needle){
							return true;
						}
					}
				}else{
					for (key in haystack){
						if (haystack[key] === needle){
							return true;
						}
					}
				}
				return false;
			},

			removeOutOfArray : function(id)
			{
				self.resetTheArray();
				
				var arr = conf.events_array;
				var newArr = [];
				
				for (var index in arr)
				{
					if( arr[index] )
					{
						newArr.push( arr[index] );
					}
				}
				
				conf.events_array = newArr;

				var length = conf.events_array.length;
				for (var i = 0; i < length; i++)
				{
					if(conf.events_array[i].id === id)
					{
						delete conf.events_array[i];
					}
					
				}
				setTimeout(function(){
					self.resetTheArray();
				}, 100);
			},
			
			placeInArray : function(newItem){				
				var newLength = conf.events_array.length + 1;
				conf.events_array[newLength] = newItem;
				setTimeout(function(){
					self.resetTheArray();
				}, 100);
			},
			
			updateInArray : function(newItem){				
				var length = conf.events_array.length;
				for (var i = 0; i < length; i++){
					if(conf.events_array[i].id === newItem.id){
						conf.events_array[i] = newItem;
					}
				}
				setTimeout(function(){
					self.resetTheArray();
				}, 100);
			},
			
			resetTheArray : function(){
				var length = conf.events_array.length;
				var newArray = [];
				var j = 0;
				for (var i = 0; i < length; i++){
					if(!conf.events_array[i]){
						i++;
					}
					newArray[j] = conf.events_array[i];
					j++;
					
				}
				conf.events_array = newArray;
			},
			
			getByTodayDate : function (arr3)
			{
				var now = new Date();
				var day = now.getUTCDate();
				var month = now.getMonth() + 1;
				var year = now.getFullYear();
				var todayDate = day+"-"+month+"-"+year;
				var out2 = [];
				var len2 = arr3.length;
				var j = 0;
				if (len2 >= 0)
				{
					for (var i = 0;i < len2; i++)
					{
						if (typeof arr3[i] !== 'undefined') 
						{
							if (arr3[i].day === todayDate)
							{
								out2[j] = arr3[i];
								j++;
							}
						}
					}
				}
				return out2;
			},
			
			getAllNotTodayDate : function (arr2){
				var now = new Date();
				var day = now.getUTCDate();
				var month = now.getMonth() + 1;
				var year = now.getFullYear();
				var todayDate = day+"-"+month+"-"+year;
				var out2 = [];
				var len2 = arr2.length - 1;
				var j = 0;
				if (len2 >= 0){
					for (var i = 0;i < len2; i++){
						if (arr2[i].day !== todayDate){
							out2[j] = arr2[i];
							j++;
						}
					}
				}
				return out2;
			},
			sortByTime2 : function (arr2){
				arr2.sort(function(a, b){
					var a = a.time;
					var b = b.time;
					return a === b ? 0 : (a < b ? -1 : 1);
				});            
			},
			sortByTimeDigits2 : function (arr2){
				arr2.sort(function(a, b){
					var a = a.time.length;
					var b = b.time.length;
					return a === b ? 0 : (a < b ? -1 : 1);
				});            
			},
			 
			removeDubbleTimes2 : function (arr2)
			{
				var outFinal = [];
				self.sortByTime2(arr2);
				self.sortByTimeDigits2(arr2);
				
				var array1 = self.getByTodayDate(arr2);
				
				var arrayLeftItems = self.getAllNotTodayDate(arr2);
				
				var len = array1.length;
				var j = 0;
				if (len > 1)
				{
					for (var i = 0; i < len; i++)
					{
						if (i+1 >= len)
						{
							outFinal[j] = array1[i];
							j++;
						}
						else if (array1[i].time !== array1[i+1].time)
						{
							outFinal[j] = array1[i];
							j++;
						}
					}
					
					outFinal[j] = array1[len];
				}
				else
				{
					outFinal[j] = array1[0];
					j++;
				}
				
				outFinal = outFinal.concat(arrayLeftItems);
							
				return outFinal;          
			},		
			
			order : function()
			{
				if (conf.order_by === 1){
					conf.events_array.sort(function (a, b){
						var objDayA = a["day"],
							objTimeA = a["time"],
							objDayB = b["day"],
							objTimeB = b["time"],
							daySplitA,
							timeSplitA,
							startDateA,
							daySplitB,
							timeSplitB,
							startDateC,
							hourA,
							minitsA,
							hourB,
							minitsB;
							
						daySplitA = objDayA.split("-");
						timeSplitA = objTimeA.split("");
						daySplitB = objDayB.split("-");
						timeSplitB = objTimeB.split("");
						
						for(var i=0; i < timeSplitA.length; i++){
							if (i === 0){
								hourA = timeSplitA[i];
							}else if(i === 1){
								if (timeSplitA.length === 3){
									minitsA = timeSplitA[i];
								}else{
									hourA = hourA + "" +timeSplitA[i];
								}
							}else if(i === 3 && timeSplitA.length === 4){
								minitsA = timeSplitA[i];
							}else{
								minitsA = minitsA + "" +timeSplitA[i];
							}
						}
						
						for(var i=0; i < timeSplitB.length; i++){
							if (i === 0){
								hourB = timeSplitB[i];
							}else if(i === 1){
								if (timeSplitB.length === 3){
									minitsB = timeSplitB[i];
								}else{
									hourB = hourB + "" +timeSplitB[i];
								}
							}else if(i === 3 && timeSplitB.length === 4){
								minitsB = timeSplitB[i];
							}else{
								minitsB = minitsB + "" +timeSplitB[i];
							}
						}
						
						var jaarA = daySplitA[2];
						var maandA = parseInt(daySplitA[1], 10) -1;
						var dagA = parseInt(daySplitA[0], 10);
						var jaarB = daySplitB[2];
						var maandB = parseInt(daySplitB[1], 10) -1;
						var dagB = parseInt(daySplitB[0], 10);
						
						startDateA = new Date(jaarA, maandA, dagA, hourA, minitsA);
						startDateB = new Date(jaarB, maandB, dagB, hourB, minitsB);
						
						a = startDateA.getTime();
						b = startDateB.getTime();
						
						
						//return a == b ? 0 : (a < b ? -1 : 1);
						return a.UTC > b.UTC ? 1 : a.UTC < b.UTC ? -1 : 0;
						
					});
				}
            
				if (conf.order_by === 2){
					conf.events_array.sort(function (a, b){
						a = a["message"].toLowerCase();
						b = b["message"].toLowerCase();
						return a === b ? 0 : (a < b ? -1 : 1);
					});
				}
			
				if (conf.order_by === 3){
					conf.events_array.sort(function (a, b){
						a = a["priority"];
						b = b["priority"];
						return a === b ? 0 : (a > b ? -1 : 1);
					});
				}
			},
			
			calculeDates : function(){
				if($(".current").attr("id") !== "container_settings"){
					$(ul_list_days).html("");
					var newLI, 
						newText, 
						i,
						curr_day = conf.date_selected.getDay(),
						//curr_day_name = conf.regional.dayNames[curr_day],
						curr_day_name = clockAidLang[lang].dayNames[curr_day],
						curr_date = conf.date_selected.getDate(),
						curr_month = conf.date_selected.getMonth(),
						//curr_month_name = conf.regional.monthNames[curr_month],
						curr_month_name = clockAidLang[lang].monthNames[curr_month],
						//curr_month_name_short = conf.regional.monthNamesShort[curr_month],
						urr_month_name_short = clockAidLang[lang].monthNamesShort[curr_month],
						curr_year = conf.date_selected.getFullYear();
				
					
					var arrayTest = self.getByTodayDate(conf.events_array);
					if(arrayTest.length > 0){
						var mainTest = conf.events_array;
						conf.events_array = self.removeDubbleTimes2(mainTest);
					}
					
					self.order();
					
					var currentTime = new Date();
					var day = currentTime.getDate();
					var month = currentTime.getMonth();
					var year = currentTime.getFullYear();
					var currentDate = new Date(year, month, day).getTime();
					var count = 1;
					var extraBeforeCount = -1;
				
					for (i = 1; i <= new Date(curr_year, (curr_month + 1), 0).getDate(); i++){
						
						newLI = $('<li />');
						$(newLI).addClass("liDay");
						
						if (curr_date === i){
							$(newLI).addClass("active");
						}
						
						var dateToSet = new Date(curr_year, curr_month, i).getTime();
						
						
						var day = new Date(curr_year, curr_month, i).getDay();
						var dayCheck = new Date(curr_year, curr_month, i).getDay() - 1;
						var monthBeforeDays = new Date(curr_year, (curr_month), 0).getDate();
						var datesBefore = [];
						if(day !== 0 && i === 1){
							var extraLis = "";
							var differenceDates = new Date(curr_year, (curr_month), 0).getDate() - dayCheck;
							for(var h = differenceDates; h <= monthBeforeDays; h++){
								extraLis += '<li class="liPastFutureDay" id="eventCalendar_li_0" style="color: rgb(0, 145, 138);">'+h+'</li>';
							}
							$(ul_list_days).append(extraLis);
							count += day;
							extraBeforeCount += day;
						}
						
						
						if(currentDate === dateToSet){
							$(newLI).addClass("currentDate");
						}
					
						newText = document.createTextNode(self.str_pad(i, 2, "0", "STR_PAD_LEFT"));
						$(newLI).html(newText).attr('id', 'eventCalendar_li_' + dateToSet);
					
						if(count === conf.No_Marg){
							$(newLI).addClass("No_Marg");
							count = 0;
						}
						
						$(ul_list_days).append(newLI);
						var datesBefore = [];
						if(count < conf.No_Marg && count !== 0 && i === new Date(curr_year, (curr_month + 1), 0).getDate()){
							var extraLis = "";
							var differenceCount = conf.No_Marg - count;
							for(var h = 1; h <= differenceCount; h++){
								if(differenceCount === h ){
									var classExtra = "No_Marg";
								}else{
									var classExtra = "";	
								}
								extraLis += '<li class="liPastFutureDay '+classExtra+'" id="eventCalendar_li_0" style="color: rgb(0, 145, 138);">0'+h+'</li>';
							}
							$(ul_list_days).append(extraLis);
						}
						
						count++;
					}
				
					jQuery($(div_dates).find("li")).css("color", conf.link_color);
					jQuery($(cl_sort_by).find("li")).css("color", conf.link_color);
				
					$(day_name).html("");
					$(day_name).append('<span class="span_day_name">' + curr_day_name + '</span><span class="span_day">' + self.str_pad(curr_date, 2, "0", "STR_PAD_LEFT") + '</span><span class="span_month">' + curr_month_name + '</span>');
					//$dp.datepicker("setDate", conf.date_selected);
					$(toggleDP).html(curr_month_name + " " + curr_year);
					$(ul_list).html("<div class='loading'></div>");
					added_events = 0;
					
					$(conf.events_array).each(function (i){
						if (typeof (this) === "object" && this['id']){
							var title = this["message"],
								icon = this['icon'],
								objDay = this["day"],
								daySplit = this["daySplit"],
								objTime = this["time"],
								timeSplit = this["timeSplit"],
								itemID = this["id"],
								hour = null,
								minits,
								frecuency = 0,
								startDate,
								repeate = this["repeate"];
								
							
							if(!daySplit && objDay){
								daySplit = objDay.split("-");
							}
							if(!timeSplit && objTime){
								timeSplit = objTime.split("");
							}
							
							for(var i=0; i < timeSplit.length; i++){
								if (i === 0){
									hour = timeSplit[i];
								}else if(i === 1){
									if (timeSplit.length === 3){
										minits = timeSplit[i];
									}else{
										hour = hour + "" +timeSplit[i];
									}
								}else if(i === 2 && timeSplit.length === 4){
									minits = timeSplit[i];
								}else{
									minits = minits + "" +timeSplit[i];
								}
							}
							
							var jaar = daySplit[2];
							var maand = parseInt(daySplit[1], 10) -1;
							var dag = parseInt(daySplit[0], 10);
							startDate = new Date(jaar, maand, dag, hour, minits);
							event_to_time = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
							event_to_time_date_selected = new Date(conf.date_selected.getFullYear(), conf.date_selected.getMonth(), conf.date_selected.getDate()).getTime();
							
							if (typeof (endDate) === "object"){
								event_to_time_end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime();
							}else{
								event_to_time_end = event_to_time_date_selected + 9999999999;
							}
							
							event_date = startDate.getDate();
							event_month = startDate.getMonth();
							event_year = startDate.getFullYear();
							recurring_frecuency_active = false;
							
							//if (curr_year === startDate.getFullYear() && curr_month === startDate.getMonth()){
								/*console.dir($(ul_list_days).children("li")[(startDate.getDate() - 1)]);
								var classa = "";
								if ($(ul_list_days).children("li")[(startDate.getDate() - 1)].className == "active"){ classa = "active";}else{ classa = "has_events";}
								$(ul_list_days).children("li")[(startDate.getDate() - 1)].addClass(classa);*/
							//}
						
							$(ul_list_days).find('li').each(function (i){
								var li_events_time = $(this).attr('id').replace('eventCalendar_li_', '');
								if (li_events_time > event_to_time && li_events_time <= event_to_time){
									$(this).addClass($(this).hasClass('active') ? "active" : "has_events");
								}
							});
							// Dit is er bijgekomen op 4-2-2014 BEGIN
							if (curr_year === startDate.getFullYear() && curr_month === startDate.getMonth()) {
								//console.info(extraBeforeCount);
								//$(ul_list_days).children("li")[(startDate.getDate() + extraBeforeCount)].className = $(ul_list_days).children("li")[(startDate.getDate() + extraBeforeCount)].className == "active" ? "active" : "has_events";
								var classesBefore = $(ul_list_days).children("li")[(startDate.getDate() + extraBeforeCount)].className;
								$(ul_list_days).children("li")[(startDate.getDate() + extraBeforeCount)].className = $(ul_list_days).children("li")[(startDate.getDate() + extraBeforeCount)].className === "active" ? "active" : "has_events";
								$(ul_list_days).children("li")[(startDate.getDate() + extraBeforeCount)].className = $(ul_list_days).children("li")[(startDate.getDate() + extraBeforeCount)].className +" "+classesBefore;
								//console.info($(ul_list_days).children("li")[(startDate.getDate() + extraBeforeCount)].className);
							}
							// Dit is er bijgekomen op 4-2-2014 EINDE

							
							if (repeate === "maand"){
								if (conf.date_selected.getDate() === startDate.getDate()){
									recurring_frecuency_active = true;
								}
							}
								
								
							if ((new Date(conf.date_selected.getFullYear(), conf.date_selected.getMonth(), conf.date_selected.getDate()).getTime() === new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime()) || recurring_frecuency_active ||repeate === "dag" ) 
							{
								var li_event, 
									li_event_time, 
									li_event_title, 
									li_event_description;
							
								if (added_events === 0){
									$(ul_list).html("");
								}
							
								added_events++;
								li_event = $('<li />');
								$(li_event).addClass("urgent").attr("id", "item_"+itemID);
								$(ul_list).append(li_event);
								li_event_time = $('<div />').addClass('time');
								li_event_icon = $('<div />').addClass('icon').css("background-image", "url(images/"+icon+"_unactive.png)");
								
								if (!conf.format_ampm){
									$(li_event_time).html(self.str_pad(startDate.getHours(), 2, "0", "STR_PAD_LEFT") + ":" + self.str_pad(startDate.getMinutes(), 2, "0", "STR_PAD_LEFT"));
								}else {
									$(li_event_time).html((startDate.getHours() > 12 ? "PM" : "AM") + " " + self.str_pad((startDate.getHours() > 12 ? (startDate.getHours() - 12) : startDate.getHours()), 2, "0", "STR_PAD_LEFT") + ":" + self.str_pad(startDate.getMinutes(), 2, "0", "STR_PAD_LEFT"));
								}
								
								var removebtn = $('<span />').addClass('remove').attr("itemID", itemID).attr("id", itemID);
								li_event_title = $('<h1 />').addClass("eventText");
								var res = "";
								var text = this["message"];
								
								if (text.length >= 7){
									res = text.substr(0,7) + "...";
								}else{
									res = text;
								}
								
								$(li_event_title).append(res);
								clear = $('<div />').addClass('clear');
								li_event_description = $('<p />');
								$(li_event_description).html(this["message"]);
								$(li_event).append(li_event_time);
								$(li_event).append(li_event_icon);
								$(li_event).append(li_event_title);
								$(li_event).append(removebtn);
								$(li_event).append(clear);
								$(li_event).append(li_event_description);
							}
						}
						
						self.iScroller();
					
					});
				
					if (added_events === 0) 
					{
						//$(ul_list).html(conf.regional.CALENDAR_NO_ROWS);
						$(ul_list).html(clockAidLang[lang].CALENDAR_NO_ROWS);
						
						self.iScroller();
					}
					
					$("#" + conf.list_days + " li").on("click" , function(e) { if($(this).attr("class") !== "liPastFutureDay"){ e.stopPropagation(); self.ulListDaysOnClick(this); }});
					$("#" + conf.cl_sort_by + " li").on("click" , function(e) { if($(this).attr("class") !== "liPastFutureDay"){ e.stopPropagation(); self.sortByOnClick(this); } });
					//$("#" + conf.list + " li").on("click" , function(e) {e.stopPropagation(); self.onclick(this);});
			
				}
			},

			run: function()
			{
				root.addClass("calendar");
				root.html("");
				
				prev_month = $('<a />').attr({ href: 'javascript:void(0);', id: conf.prev_month }).html('&laquo;');
				toggleDP = $('<a />').attr({ href: 'javascript:void(0);', id: 'toggleDP' });
				next_month = $('<a />').attr({ href: 'javascript:void(0);',  id: conf.next_month }).html('&raquo;');
				
				
				// add Item
				addIcon = $('<div />').addClass('addIcon');
				//addText = $('<div />').addClass('addText').html("voeg activiteit toe");
				addText = $('<div />').addClass('addText').html(clockAidLang[lang].addText);
				
				
				saveIcon = $('<div />').addClass('saveIcon');
				//saveText = $('<span />').addClass('saveText').html("bewaar");
				saveText = $('<span />').addClass('saveText').html(clockAidLang[lang].saveText);
				//saveText2 = $('<div />').addClass('addText').html("vul hier in");
				saveText2 = $('<div />').addClass('addText').html(clockAidLang[lang].saveText2);
				
				$(saveIcon).append(saveText);
				
				save = $('<div />').addClass('save').hide();
				$(save).append(saveIcon);
				$(save).append(saveText2);
				
				
				add = $('<div />').addClass('add');
				$(add).append(addIcon);
				$(add).append(addText);
				
				nav = $('<div />').addClass('main_date');
				$(nav).append(prev_month);
				$(nav).append(toggleDP);
				$(nav).append(next_month);
				
				
				
				div_info = $('<div />').addClass('div_info');
				day_name = $('<div />').addClass('day_name').attr('id', 'day_name');
				$(div_info).append(day_name);
				
				div_nav = $('<div />').addClass('div_nav');
				$(div_nav).append(div_info);
				//$(div_nav).append(nav);
				$(div_nav).append(add);
				$(div_nav).append(save);
				
				root.append(div_nav);
				
				dayNamesLength = conf.regional.dayNamesShort.length;
				var div_dayNames = "";
				var NoMargClass = "";
				for(d = 0; d < dayNamesLength; d++){
					if(d === 6){
						NoMargClass = "No_Marg_2";
					}
					div_dayNames += '<div class="daynames '+NoMargClass+'">'+clockAidLang[lang].dayNamesMin[d]+'</div>';
				}
				div_days = $('<div />').addClass('div_days');
				$(div_days).append(div_dayNames);
				
				clear = $('<div />').addClass('clear');
				
				div_dates = $('<div />').addClass('div_dates');
				list_days = $('<ul />').attr('id', conf.list_days);
				ul_list_days = list_days;		
				$(div_dates).append(div_days);	
				$(div_dates).append(ul_list_days);
				$(div_dates).append(nav);
				root.append(div_dates);
				
				
				calendar_list = $('<div />').addClass(conf.calendar_list);
				cl_sort_by = $('<ul />').attr('id', conf.cl_sort_by);
				li_time = $('<li />');
	
				if (conf.order_by === 1) 
				{
					li_time.addClass("active");
				}
				
				//$(li_time).html(conf.regional.CALENDAR_TIME);
				$(li_time).html(clockAidLang[lang].CALENDAR_TIME);
				li_title = $('<li />');
	
				if (conf.order_by === 2) 
				{
					li_title.addClass("active");
				}
				
				//$(li_title).html(conf.regional.CALENDAR_TITLE);
				$(li_title).html(clockAidLang[lang].CALENDAR_TITLE);
				li_priority = $('<li />');
	
				if (conf.order_by === 3) 
				{
					li_priority.addClass("active");
				}
	
				//$(li_priority).html(conf.regional.CALENDAR_PRIORITY);
				$(li_priority).html(clockAidLang[lang].CALENDAR_PRIORITY);
				$(cl_sort_by).append(li_time);
				$(cl_sort_by).append(li_title);
	
				if (conf.show_priorities) 
				{
					$(cl_sort_by).append(li_priority);
				}
	
				ul_list = $('<ul />').attr('id', conf.list);
				ul_list_box = $('<div />').attr('id', 'list_scroller').append(ul_list);
				if (conf.show_sort_by) 
				{
					h2_sort_by = $('<h2 />');
					//$(h2_sort_by).html(conf.regional.CALENDAR_SORT_BY);
					$(h2_sort_by).html(clockAidLang[lang].CALENDAR_SORT_BY);
					$(calendar_list).append(h2_sort_by);
					$(calendar_list).append(cl_sort_by);
				}
				else 
				{
					h2_sort_by = $('<h2 />');
					//$(h2_sort_by).html(conf.regional.CALENDAR_EVENTS);
					$(h2_sort_by).html(clockAidLang[lang].CALENDAR_EVENTS);
					
					//$(calendar_list).append(h2_sort_by);
				}
				
				
				
				$(calendar_list).append(clear);
				$(calendar_list).append(ul_list_box);
				$(calendar_list).append($("<div />").attr("class", "scroller"));
				root.append(calendar_list);
				setTimeout(function(){
					self.calculeDates();
				},50);
			},
		
		
		
		
			onclick : function(e)
			{
				if ($(e).find("p").css("display") === "none") 
				{
					$(e).find("p").slideDown(300);
				}
				else 
				{
					$(e).find("p").slideUp(300);
				}
			
				self.iScroller();
			},
			
			addEvent : function()
			{
				// get curernt list
				
				var currentYear		= conf.date_selected.getFullYear(),
					currentMonth	= conf.date_selected.getMonth() +1, 
					currentDay		= conf.date_selected.getDate();
					
				var date = currentDay+"-"+currentMonth+"-"+currentYear;
				
				$("." + conf.calendar_list).html("");
				
				
				// Hidden day
				var dayInput = $('<input />');
				$(dayInput).attr("name", "day").attr("type", "hidden").attr("id","day");
				$(dayInput).val(date);
				
				
				var updateInput = $('<input />');
				$(updateInput).attr("name", "update").attr("type", "hidden").attr("id","hidden").val("nee");
				
				// Time 
				var timeInput = $('<input />');
				$(timeInput).attr("name", "time").attr("id","time").addClass("timevul").attr("type", "hidden");
				
				var option2 = $('<input />');
				var option3 = $('<input />');
				var option4 = $('<input />');
				var option1 = $('<input />');
				
				var option2div = $('<div />').addClass('repate').addClass('firstRepate');
				var option4div = $('<div />').addClass('repate');
				var option3div = $('<div />').addClass('repate').addClass('firstRepate');
				var option1div = $('<div />').addClass('repate');
				
				
				$(option2).attr("name", "herhaal").attr("id","herhaal_1").attr("type", "radio").val("dag");
				$(option2).on("touchstart", function(e){e.stopPropagation();});
				$(option2).on("touchmove", function(){});
				
				$(option3).attr("name", "herhaal").attr("id","herhaal_2").attr("type", "radio").val("maand");
				$(option3).on("touchstart", function(e){e.stopPropagation();});
				$(option3).on("touchmove", function(){});
				
				$(option4).attr("name", "herhaal").attr("id","herhaal_3").attr("type", "radio").val("week");
				$(option4).on("touchstart", function(e){e.stopPropagation();});
				$(option4).on("touchmove", function(){});
				
				$(option1).attr("name", "herhaal").attr("id","herhaal_0").attr("type", "radio").val("not");
				$(option1).on("touchstart", function(e){e.stopPropagation();});
				$(option1).on("touchmove", function(){});
				
				
				$(option2div).append(option2);
				//$(option2div).append(" HERHAAL ELKE DAG");
				$(option2div).append(clockAidLang[lang].herhaal[0]);
				
				
				$(option3div).append(option3);
				//$(option3div).append(" HERHAAL ELKE MAAND");
				$(option3div).append(clockAidLang[lang].herhaal[1]);
				
				$(option4div).append(option4);
				//$(option4div).append(" HERHAAL ELKE WEEK");
				$(option4div).append(clockAidLang[lang].herhaal[2]);
				
				$(option1div).append(option1);
				//$(option1div).append(" HERHAAL NIET");
				$(option1div).append(clockAidLang[lang].herhaal[3]);
				
				// Message
				var messageInput = $('<input />');
				$(messageInput).attr("name", "message").attr("type", "text").attr("id","message");
				
				var messageTextarea = $('<textarea />');
				$(messageTextarea).attr("name", "message").attr("cols", "30").attr("rows","5").addClass("textArea").attr("id", "message");
				$(messageTextarea).on("touchstart", function(e){e.stopPropagation();});
				$(messageTextarea).on("touchmove", function(){});
				
				// Icon
				var iconInput = $('<select />');
				$(iconInput).attr("name", clockAidLang[lang].CALENDAR_EVENTS).attr("data-role", "none").attr("id","icon").addClass("icon-select").attr("type", "hidden");
				
				var arr = [
					{val : "icoon1", text: 'ANDERS'},
					{val : "icoon2", text: 'MEDICIJNEN'},
					{val : "icoon3", text: 'BEZOEK'},
					{val : "icoon4", text: 'ETEN'},
					{val : "icoon5", text: 'SLAPEN'},
					{val : "icoon6", text: 'DOKTER'},
					{val : "icoon7", text: 'WASSEN'}
				 
				];
				
				$(clockAidLang[lang].icons).each(function() 
				{
					iconInput.append($("<option>").attr('value',this.val).text(this.text));
				});
				
				// Clear
				var clear = $('<div />').addClass('clear');
				var clear2 = $('<div />').addClass('clear');
				
				// Save btn
				var saveBtn = $('<div />').addClass('saveBtn');
				$(saveBtn).on("touchstart", function(e){saveEvent();});
				$(saveBtn).on("click", function(e){saveEvent();});
				
				
				// Form
				var form = $('<form />');
				$(form).attr("action", "#").attr("method", "post").attr("id","addForm");
				
				$(form).append(updateInput);
				$(form).append(dayInput);
				$(form).append(timeInput);
				$(form).append(iconInput);
				$(form).append(clear2);
				$(form).append("<br />");
				$(form).append("<br />");
				//$(form).append($('<span />').html("herhaal").addClass("repateMainText"));
				$(form).append("<br />");
				$(form).append(clear2);
				$(form).append(option2div);
				$(form).append(option4div);
				$(form).append(clear2);
				$(form).append(option3div);
				$(form).append(option1div);
				$(form).append(clear);
				$(form).append("<br />");
				$(form).append("<br />");
				$(form).append(messageTextarea);
				$(form).append("<br /><br />");
				//$(form).append(saveBtn);
				
				var html = $("#vulveld").html();
				
				$("." + conf.calendar_list).html(form);
				
				var opt = 
				{
					'time': 
					{
						preset: 'time'
					},
					
					'select': 
					{
						preset: 'select'
					}
					
				};
				
				$('.timevul').scroller('destroy').scroller($.extend(opt["time"], 
				{
					theme: "default",
					mode: "mixed",
					display: "inline"
				}));
				
				$('.icon-select').scroller('destroy').scroller($.extend(opt["select"], 
				{
					theme: "default",
					mode: "mixed",
					display: "inline"
				}));
				
				$('.dw-inline:first').css("padding-left","15px");
				
				$("#icon_dummy").hide();
				$(".add").hide();
				$(".save").show();
				
			},
			
			resetList : function()
			{
				$("." + conf.calendar_list).html("");
				clear = $('<div />').addClass('clear');
				ul_list = $('<ul />').attr('id', conf.list);
				ul_list_box = $('<div />').attr('id', 'list_scroller').append(ul_list);
				
				if (conf.show_sort_by) 
				{
					h2_sort_by = $('<h2 />');
					$(h2_sort_by).html(conf.regional.CALENDAR_SORT_BY);
					$(h2_sort_by).html(clockAidLang[lang].CALENDAR_SORT_BY);
					//$(calendar_list).append(h2_sort_by);
					$(calendar_list).append(cl_sort_by);
				}
				else 
				{
					h2_sort_by = $('<h2 />');
					//$(h2_sort_by).html(conf.regional.CALENDAR_EVENTS);
					$(h2_sort_by).html(clockAidLang[lang].CALENDAR_EVENTS);
					//$(calendar_list).append(h2_sort_by);
				}
				
				$("." + conf.calendar_list).append(clear);
				$("." + conf.calendar_list).append(ul_list_box);
				$("." + conf.calendar_list).append($("<div />").attr("class", "scroller"));
				setTimeout(function(){
					self.calculeDates();
					resetScrollHeight();
				},100);
				
			},
			
			
			prevMonthOnClick : function(e)
			{
				conf.date_selected = conf.date_selected.add(-1).month();
				setTimeout(function(){
					self.calculeDates();
				},50);
					
			},
			
			
			nextMonthOnClick : function(e)
			{
				date_selected = conf.date_selected.add(1).month();
				setTimeout(function(){
					self.calculeDates();
				},50);
			},
			
			
			datePickerOnClick :function (e) 
			{
				if (conf.show_datepicker === true) 
				{
					if ($dp.datepicker('widget').is(':hidden')) 
					{
						$dp.datepicker("show");
						$dp.datepicker("widget").position(
						{
							my: "top",
							at: "top",
							of: root
						});
					}
					else 
					{
						$dp.hide();
					}
				}
					
				e.preventDefault();
			},
			
			editEvent : function(id)
			{
				// get curernt list
				if(conf.events_array.length > 0)
				{
					var mainTest = conf.events_array;
					conf.events_array = self.removeDubbleTimes2(mainTest);
				}
				
				var length = conf.events_array.length;
				var i;

				for(i = 0; i < length; i++ )
				{
					conf.events_array[i] && conf.events_array.push(conf.events_array[i]);  // copy non-empty values to the end of the array
				}

				conf.events_array.splice(0 , length);  // cut the array and leave only the non-empty values
					
				var selectedEvent;
				var selectedEventa = $.each(conf.events_array, function( index, value )
				{
					if(value.id === id)
					{
						selectedEvent = value;
						return value;
					}
				});
				
				var date = selectedEvent.day;
				var time = selectedEvent.time;
				var message = selectedEvent.message;
				var icon = selectedEvent.icon;
				var id = selectedEvent.id;
				
				$("." + conf.calendar_list).html("");
				
				var updateInput = $('<input />');
				$(updateInput).attr("name", "update").attr("type", "hidden").attr("id","hidden").val("ja");
				
				var idInput = $('<input />');
				$(idInput).attr("name", "id").attr("type", "hidden").attr("id","id").val(id);
				
				
				// Hidden day
				var dayInput = $('<input />');
				$(dayInput).attr("name", "day").attr("type", "hidden").attr("id","day");
				$(dayInput).val(date);
				
				///////// HIER WAS IK
				var newTime = "";
				
				var timeSplitted = time.split("");
				var lengthTime = timeSplitted.length;
			
				if(lengthTime < 4){
					for(var b = 0; b < lengthTime; b++)
					{
						if(b === 0){
							newTime += 0;
						}
						newTime += timeSplitted[b];
					}
					time = newTime;
				}
	
				// Time 
				var timeInput = $('<input />');
				$(timeInput).attr("name", "time").attr("id","time").addClass("timevul").attr("type", "hidden").val(time);
				
				// Message
				var messageInput = $('<input />');
				$(messageInput).attr("name", "message").attr("type", "text").attr("id","message").val(message);
				
				// Herhaling
				var option2 = $('<input />');
				var option3 = $('<input />');
				var option4 = $('<input />');
				var option1 = $('<input />');
				var option2div = $('<div />').addClass('repate').addClass('firstRepate');
				var option4div = $('<div />').addClass('repate');
				var option3div = $('<div />').addClass('repate').addClass('firstRepate');
				var option1div = $('<div />').addClass('repate');
				
				$(option2).attr("name", "herhaal").attr("id","herhaal_1").attr("type", "radio").val("dag");
				$(option2).on("touchstart", function(e){e.stopPropagation();});
				$(option2).on("touchmove", function(){});
				
				$(option3).attr("name", "herhaal").attr("id","herhaal_2").attr("type", "radio").val("maand");
				$(option3).on("touchstart", function(e){e.stopPropagation();});
				$(option3).on("touchmove", function(){});
				
				$(option4).attr("name", "herhaal").attr("id","herhaal_3").attr("type", "radio").val("week");
				$(option4).on("touchstart", function(e){e.stopPropagation();});
				$(option4).on("touchmove", function(){});
				
				$(option1).attr("name", "herhaal").attr("id","herhaal_0").attr("type", "radio").val("not");
				$(option1).on("touchstart", function(e){e.stopPropagation();});
				$(option1).on("touchmove", function(){});

				
				$(option2div).append(option2);
				$(option2div).append(" HERHAAL ELKE DAG");
				
				$(option3div).append(option3);
				$(option3div).append(" HERHAAL ELKE MAAND");
				
				$(option4div).append(option4);
				$(option4div).append(" HERHAAL ELKE WEEK");
				
				$(option1div).append(option1);
				$(option1div).append(" HERHAAL NIET");
				
				var messageTextarea = $('<textarea />');
				$(messageTextarea).attr("name", "message").attr("cols", "30").attr("rows","5").addClass("textArea").attr("id", "message").val(message);
				$(messageTextarea).on("touchstart", function(e){e.stopPropagation();});
				$(messageTextarea).on("touchmove", function(){});
				
				// Icon
				var iconInput = $('<select />');
				$(iconInput).attr("name", "activiteiten").attr("data-role", "none").attr("id","icon").addClass("icon-select").attr("type", "hidden");
				
				var arr = [
					{val : "icoon1", text: 'ANDERS'},
					{val : "icoon2", text: 'MEDICIJNEN'},
					{val : "icoon3", text: 'BEZOEK'},
					{val : "icoon4", text: 'ETEN'},
					{val : "icoon5", text: 'SLAPEN'},
					{val : "icoon6", text: 'DOKTER'},
					{val : "icoon7", text: 'WASSEN'}

				];
				
				$(arr).each(function() 
				{
					var iconOption = $("<option>").attr('value',this.val).text(this.text);
					if (icon === this.val)
					{
						$(iconOption).attr('selected', true);
					}
					iconInput.append(iconOption);
				});
				
				// Clear
				var clear = $('<div />').addClass('clear');
				var clear2 = $('<div />').addClass('clear');
				
				// Save btn
				var saveBtn = $('<div />').addClass('saveBtn');
				$(saveBtn).on("touchstart", function(e){saveEvent();});
				$(saveBtn).on("click", function(e){saveEvent();});
				
				// Form
				var form = $('<form />');
				$(form).attr("action", "#").attr("method", "post").attr("id","addForm");
				
				$(form).append(updateInput);
				$(form).append(idInput);
				$(form).append(dayInput);
				$(form).append(timeInput);
				$(form).append(iconInput);
				$(form).append(clear);
				$(form).append("<br />");
				$(form).append("<br />");
				//$(form).append($('<span />').html("herhaal").addClass("repateMainText"));
				$(form).append("<br />");
				$(form).append(clear2);
				$(form).append(option2div);
				$(form).append(option4div);
				$(form).append(clear2);
				$(form).append(option3div);
				$(form).append(option1div);
				$(form).append(clear);
				$(form).append("<br />");
				$(form).append("<br />");
				$(form).append(messageTextarea);
				$(form).append("<br /><br />");
				//$(form).append(saveBtn);
				
				var html = $("#vulveld").html();
				
				$("." + conf.calendar_list).html(form);
				
				var opt = 
				{
					'time': 
					{
						preset: 'time'
					},
					
					'select': 
					{
						preset: 'select'
					}
				};
				
				$('.timevul').scroller('destroy').scroller($.extend(opt["time"], 
				{
					theme: "default",
					mode: "mixed",
					display: "inline"
				}));
				
				$('.icon-select').scroller('destroy').scroller($.extend(opt["select"], 
				{
					theme: "default",
					mode: "mixed",
					display: "inline"
				}));
				
				$('.dw-inline:first').css("padding-left","15px");
				
				$("#icon_dummy").hide();
				$(".add").hide();
				$(".save").show();
			},
			
			ulListDaysOnClick : function (e) 
			{
				var curr_year = conf.date_selected.getFullYear(),
					curr_month = conf.date_selected.getMonth();
				
				var day = $(e).html();
				var id = $(e).attr("id");
				self.resetList();
				conf.date_selected = new Date(curr_year, curr_month, day);
				$("#"+conf.list_days + " li").removeClass("active");
									
				$("#"+ id).addClass("active");
				setTimeout(function(){
					self.calculeDates();
				},50);
			},
			
			sortByOnClick : function(e)
			{
				$("#"+conf.cl_sort_by + " li").removeClass("active");
				$(e).addClass("active");
				setTimeout(function(){
					self.calculeDates();
				},50);
			}
		});
				
		self.run();
		// next/prev buttons
		var prev = find(root, conf.prev).click(function(e) { e.stopPropagation(); self.prev(); }),
			next = find(root, conf.next).click(function(e) { e.stopPropagation(); self.next(); }),
			prevMonthClick = $("#"+conf.prev_month).click(function(e) { e.stopPropagation(); self.prevMonthOnClick(e); }),
			nextMonthClick = $("#"+conf.next_month).click(function(e) { e.stopPropagation(); self.nextMonthOnClick(e); }),
			datePickerClick = $(toggleDP).click(function(e) { e.stopPropagation(); self.datePickerOnClick(e); });
			addClick = $(".add").click(function(e) { e.stopPropagation(); self.addEvent(); });
	} 

	// jQuery plugin implementation
	$.fn.calendar = function(conf){ 
		// already constructed --> return API
		var el = this.data("calendar");
		if (el)	{
			return el; 
		}

		conf = $.extend({}, $.tools.calendar.conf, conf); 
		this.each(function(){	
			el = new Calendar($(this), conf);
			$(this).data("calendar", el);	
		});
		
		return conf.api ? el: this; 
	};
})(jQuery);


