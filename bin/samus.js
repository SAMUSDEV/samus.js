//IE 7/8
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}function trace() {
	var msg = "[TRACE] ";
    for (var i=0; i < arguments.length; i++) {
	msg += arguments[i];
	if(i != arguments.length - 1)
	    msg += ", ";
    };

    window.console.log(msg);
}

//oop
/*Function.prototype.extend = function(parentClassOrObject){ 
	if(parentClassOrObject.constructor == Function) 
	{ 
		//normal inheritance 
		this.prototype = new parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype._super = parentClassOrObject.prototype;
	} 
	else 
	{ 
		//pure virtual inheritance 
		this.prototype = parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype._super = parentClassOrObject;
	} 
	return this;
};*/JSON = {};
JSON.parse = function(json) {
	return eval('(' + json + ')');
};function isNumber(number) {
	return !isNaN(Number(number));
}//oop
Function.prototype.extend = function(_class) {
	this.prototype._super = function() {
		var _super = new _class(arguments[0],
								arguments[1],
								arguments[2],
								arguments[3],
								arguments[4],
								arguments[5],
								arguments[6],
								arguments[7],
								arguments[8],
								arguments[9]
								);
								
		for (var key in _super)
			if(this[key] == undefined)
				this[key] = _super[key];
	}
	
	return this;
}

/*
Function.prototype.extend = function(parentClassOrObject){ 
	if(parentClassOrObject.constructor == Function) 
	{ 
		//normal inheritance 
		this.prototype = new parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype._super = parentClassOrObject.prototype;
		//this.prototype.super = function() { this.constructor(); };
	} 
	else 
	{ 
		//pure virtual inheritance 
		this.prototype = parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype._super = parentClassOrObject;
		//this.prototype.super = function() { this.constructor(); };
	} 
	return this;
};*/DateTime.convertMillisecondsToHours = function(milliseconds) {
	return Math.round(milliseconds / (60*60*1000));
}

DateTime.getNow = function() {
	return new DateTime();
}

function DateTime(date) {
	var _date = date;
	var self = this;
	
	if(!_date)
		_date = new Date();
		
	this.getDay = function() {
		return _date.getDate();
	};
	
	this.setDay = function(value) {
		_date.setDate(value);
	};
	
	this.getTime = function() { return _date.getTime(); };
	this.setTime = function(value) {
		_date.setTime(value);
	};
	
	this.getHours = function() { return _date.getHours(); };
	this.setHours = function(value) {
		_date.setHours(value);
	};
	
	this.getMonth = function() { return _date.getMonth(); };
	this.setMonth = function(value) {
		_date.setMonth(value);
	};
	
	this.getFullMonth = function() { return new Month(self.getMonth(), self.getYear()); };
	
	this.getYear = function() { return _date.getFullYear(); };
	this.setYear = function(value) {
		_date.setFullYear(value);
	};
	
	this.getFullYear = function() { return new Year(self.getYear()); };
	
	this.toString = function(format) {
		if(!format)
			format = "mm/dd/yyyy";
			
		return DateUtil.toString(_date, format);
	};
	
	this.toDate = function() {
		return _date;
	};
	
	return this;
}
Month.JANUARY 	= 0;
Month.FEBRUARY 	= 1;
Month.MARCH 	= 2;
Month.APRIL 	= 3;
Month.MAY 		= 4;
Month.JUNE 		= 5;
Month.JULY 		= 6;
Month.AUGUST 	= 7;
Month.SEPTEMBER = 8;
Month.OCTOBER 	= 9;
Month.NOVEMBER 	= 10;
Month.DECEMBER 	= 11;

function Month(month, year) {
	var _month = month;
	var _year = year;
	var _date = new Date();
	var _days = 1;
	var _month_names = {};
	
	_date.setMonth(month);
	_date.setFullYear(year);
	
	_date.setDate(1);
	
	while(_date.getMonth() == _month) {
		_date.setDate(_days);
		_days ++;	
	}
	
	_days -= 2;
	
	_date.setMonth(_month);
	_date.setDate(1);
	_date.setFullYear(_year);
	
	_month_names[LangEnum.PT_BR] = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
	_month_names[LangEnum.EN_US] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
	this.getName = function(lang) {
		if(!lang)
			lang = LangEnum.PT_BR;
			
		return _month_names[lang][_month];
	};
	
	this.getMonth = function() {
		return _month;
	};
	
	this.getDays = function() {
		return _days;
	};
	
	return this;
	
}
function Year(year) {
	var _date 	= new Date();
	this.months = [];
	
	_date.setFullYear(year);
	
	for (var i = 0; i < 12; i++)
		this.months.push(new Month(i, year));
	
	return this;
}
GLog = { };
GLog.enabled = true;
GLog.log = function() {
	if(!GLog.enabled)
		return;
		
	var msg = "[GLOG] ";
    for (var i=0; i < arguments.length; i++) {
	msg += arguments[i];
	if(i != arguments.length - 1)
	    msg += ", ";
    };

    window.console.log(msg);
};LangEnum = {
	PT_BR: "pt-br",
	EN_US: "en-us",
	EN_UK: "en-uk",
	IT_IT: "it-it",
	ES_ES: "es-es"
};
Assert = {};
Assert.isFunction = function(fn, desc) {
	Assert.assert(typeof(fn) == "function", desc);
};

Assert.isNumber = function(number, desc) {
	Assert.assert(!isNaN(Number(number)), desc);
};

Assert.isEquals = function(val1, val2, desc) {
	Assert.assert(val1 == val2, desc);
};



Assert.assert = function(expression, description) {
	if(!expression)
		throw "Assert Failed: " + description;
};KeyBoard = {
	BACKSPACE: 8,
	TAB: 9,
	ENTER: 13,
	SHIFT: 16,
	CTRL: 17,
	ALT: 18,
	PAUSE_BREAK: 19,
	CAPSLOCK: 20,
	ESCAPE: 27,
	PAGE_UP: 33,
	SPACEBAR: 32,
	PAGE_DOWN: 34,
	END: 35,
	HOME: 36,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	INSERT: 45,
	DELETE: 46,
	
	NUMPAD_0: 96,
	NUMPAD_1: 97,
	NUMPAD_2: 98,
	NUMPAD_3: 99,
	NUMPAD_4: 100,
	NUMPAD_5: 101,
	NUMPAD_6: 102,
	NUMPAD_7: 103,
	
	NUMPAD_8: 104,
	NUMPAD_9: 105,
	MULTIPLY: 106,
	ADD: 107,
	SUBTRACT: 109,
	DECIMAL_POINT: 110,
	DIVIDE: 111,
	
	F1: 112,
	F2: 113,
	F3: 114,
	F4: 115,
	F5: 116,
	F6: 117,
	F7: 118,
	F8: 119,
	F9: 120,
	F10: 121,
	F11: 122,
	F12: 123,
	NUMLOCK: 144,
	SCROLLLOCK: 145,
	SEMI_COLON: 186,
	EQUAL_SIGN: 187,
	COMMA: 188,
	DASH: 189,
	PERIOD: 190,
	FORWARD_SLASH: 191,
	GRAVE_ACCENT: 192,
	OPEN_BRACKET: 219,
	BACK_SLASH: 220,
	CLOSE_BRAKET: 221,
	SINGLE_QUOTE: 222,
	
	ASTERISK: 56,
	E_COMMERCIAL: 55
	
};

/*
0	 48
1	 49
2	 50
3	 51
4	 52
5	 53
6	 54
7	 55
8	 56
9	 57
A	 65
B	 66
C	 67
D	 68
 	
KEY	 CODE
E	 69
F	 70
G	 71
H	 72
I	 73
J	 74
K	 75
L	 76
M	 77
N	 78
O	 79
P	 80
Q	 81
R	 82
S	 83
T	 84
U	 85
V	 86
W	 87
X	 88
Y	 89
Z	 90
LEFT WINDOW KEY	 91
RIGHT WINDOW KEY	 92
SELECT KEY	 93

 	
KEY	 CODE
*/

DateUtil = {};
DateUtil.toString = function(date, format) {
	if(!format)
		format = "mm/dd/yyyy";
		
	format = format.replace("mm", 	NumberFormatter.addLeadingZero(Number(date.getMonth().toString()) + 1));
	format = format.replace("dd", 	NumberFormatter.addLeadingZero(Number(date.getDate().toString())));
	format = format.replace("yyyy", date.getFullYear().toString());
		
	return format;
}

DateUtil.fromString = function(date, format) {	
	if(!format)
		format = "mm/dd/yyyy";
	
	var day		= Number(String(date.charAt(format.indexOf("d"))) + String(date.charAt(format.indexOf("d") + 1)));
	var month	= Number(String(date.charAt(format.indexOf("m"))) + String(date.charAt(format.indexOf("m") + 1)));	
	
	month --;
	
	var year = (
				String(date.charAt(format.indexOf("y"))) + 
				String(date.charAt(format.indexOf("y") + 1)) + 
				String(date.charAt(format.indexOf("y") + 2)) + 
				String(date.charAt(format.indexOf("y") + 3))
				);
				
	return new Date(year, month, day);
}


DateUtil.dateRange = function(start, end) {
  var format  = "yyyy-mm-dd";
  var dates   = [];
  var current = SDateUtil.clone(start);

  dates.push(current);

  while(SDateUtil.toString(current, format) != SDateUtil.toString(end, format)) {
    current = SDateUtil.clone(current);
    current.setDate(current.getDate() + 1);
    dates.push(current);
  }

  return dates;
}

DateUtil.clone = function(date) {
  var format  = "yyyy-mm-dd";
  date        = SDateUtil.toString(date, format);
  date        = SDateUtil.fromString(date, format);

  return date;
}
FunctionUtil = { };
FunctionUtil.functionDelay = function(fn, delay) {
	setTimeout(fn, delay * 1000);
};

FunctionUtil.executeSequential = function(functions, onComplete) {
	if (onComplete == null)
		onComplete = function(){};
		
	var current = -1;
	
	exec();
	
	function exec() {
		current ++;
		
		if(current != functions.length - 1)
			functions[current](exec);
		else
			functions[current](onComplete);
	}
};NumberFormatter = {};
NumberFormatter.addLeadingZero = function(number) {
	if(number < 10)
		return "0" + String(number);
		
	return number.toString();
};StringUtil = {};
StringUtil.replace = function(text, find, replacement) {
	while(text.indexOf(find) != -1)
		text = text.replace(find, replacement);
		
	return text;
};TextUtil = {};
TextUtil.replaceSpecialCaracters = function(text) {
	text = StringUtil.replace(text, "ç", "c");
	text = StringUtil.replace(text, "ã", "a");
	text = StringUtil.replace(text, "á", "a");
	text = StringUtil.replace(text, "à", "a");
	text = StringUtil.replace(text, "â", "a");
	text = StringUtil.replace(text, "ä", "a");
	
	text = StringUtil.replace(text, "é", "e");
	text = StringUtil.replace(text, "è", "e");
	text = StringUtil.replace(text, "ê", "e");
	
	text = StringUtil.replace(text, "í", "i");
	text = StringUtil.replace(text, "ì", "i");
	text = StringUtil.replace(text, "î", "i");
	
	text = StringUtil.replace(text, "ó", "o");
	text = StringUtil.replace(text, "ò", "o");
	text = StringUtil.replace(text, "õ", "o");
	text = StringUtil.replace(text, "ô", "o");
	
	text = StringUtil.replace(text, "ú", "u");
	text = StringUtil.replace(text, "ù", "u");
	text = StringUtil.replace(text, "û", "u");
	
	return text;
};

TextUtil.removeWhiteSpaces = function(text, replacement) {
	if(replacement == "") 
		return StringUtil.replace(text, " ", "");
	else 
		return StringUtil.replace(text, " ", replacement);	
};

TextUtil.formatURL = function(text) {
	text = TextUtil.replaceSpecialCaracters(text);
	text = TextUtil.removeWhiteSpaces(text,"-");
	
	return text.toLowerCase();
};