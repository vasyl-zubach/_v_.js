/**
 * _v_.js - validator
 * http://github.com/TjRus/_v_.js
 * (c) 2013 Vasiliy Zubach (aka TjRus) - http://tjrus.com/
 * _v_ may be freely distributed under the MIT license.
 */
"use strict";

(function ( window, document, undefined ) {

	/**
	 * _v_ - Validator
	 */
	var regex = {
		ruleArray   : /^\[(.+)\]$/,
		email       : /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
		url         : /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
		alpha       : /^[a-z]+$/i,
		alphaNumeric: /^[a-z0-9]+$/i,
		alphaDash   : /^[a-z_-]+$/i,
		alphaNumDash: /^[a-z0-9_-]+$/i,
		ip          : /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
		base64      : /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{4})$/,
		integer     : /^\-?[0-9]+$/,
		numeric     : /^[0-9]+$/,
		natural     : /^[0-9]+$/i,
		decimal     : /^\-?[0-9]*\.?[0-9]+$/,

		card                 : /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
		card_visa            : /^4[0-9]{12}(?:[0-9]{3})?$/,
		card_mastercard      : /^5[1-5][0-9]{14}$/,
		card_american_express: /^3[47][0-9]{13}$/,
		card_discover        : /^6(?:011|5[0-9]{2})[0-9]{12}$/,
		card_jcb             : /^(?:2131|1800|35\d{3})\d{11}$/
	};

	var keys = {
		'*'  : 'required',
		'@'  : 'isValidEmail',
		'@s' : 'isValidEmails',
		'ip' : 'isValidIP',
		'b64': 'isValidBase64',

		'url': 'isValidUrl',

		'c' : 'isValidCard',
		'cv': 'isValidVisa',
		'cm': 'isValidMastercard',
		'ca': 'isValidAmex',
		'cd': 'isValidDiscover',

		'a'  : 'isAlpha',
		'a1' : 'isAlphaNumeric',
		'a1_': 'isAlphaNumDash',
		'a_' : 'isAlphaDash',

		'num': 'isNumeric',
		'int': 'isInteger',
		'dec': 'isDecimal',
		'nat': 'isNatural',

		'l=' : 'lengthEq',
		'l>' : 'lengthMore',
		'l>=': 'lengthEqOrMore',
		'l<' : 'lengthLess',
		'l<=': 'lengthEqOrLess',

		'lr=': 'lengthInRange',

		'reg=': 'validateRegular',

		'r=': 'inRange',

		'>=': 'greaterOrEq',
		'<=': 'lessOrEq',
		'>' : 'greaterThen',
		'<' : 'lessThen',
		'=#': 'matchesToId',
		'=' : 'matchesTo',

		'!=': 'notMatches',
		'!' : 'notContain',

		'D=': 'isValidDate'
	};
	var rules_order = ['lr=', 'l=', 'l>=', 'l<=', 'l>', 'l<', 'reg=', 'r=', '>=', '<=', '>', '<', '=#', '=', '!=', '!', 'D='];

	/**
	 * Validator constructor
	 *
	 * @constructor
	 * @param value
	 * @returns {*}
	 * @private
	 */
	var _v_ = function ( value ) {
		if ( !(this instanceof _v_) ) {
			return new _v_( value );
		}
		this.value = value;
		return this;
	};
	var _v_proto = _v_.prototype;

	_v_proto.required = function () {
		return (this.value.length !== 0) ? true : false;
	};
	_v_proto.validateRegular = function ( regExpression ) {
		var reg = new RegExp( regExpression, 'i' );
		return reg.test( this.value );
	};

	_v_proto.isValidUrl = function () {
		return regex.url.test( this.value );
	};

	_v_proto.isValidEmail = function () {
		return regex.email.test( this.value.replace( /^\s+|\s+$/g, '' ) );
	};

	_v_proto.isValidEmails = function ( separator ) {
		var emails = this.value.split( separator || ',' );
		for ( var i = 0; i < emails.length; i++ ) {
			if ( !_v_( emails[i] ).isValidEmail() ) {
				return false;
			}
		}
		return true;
	};

	_v_proto.isValidCard = function () {
		return regex.card.test( this.value );
	};

	_v_proto.isValidVisa = function () {
		return regex.card_visa.test( this.value );
	};

	_v_proto.isValidMastercard = function () {
		return regex.card_mastercard.test( this.value );
	};

	_v_proto.isValidAmex = function () {
		return regex.card_american_express.test( this.value );
	};

	_v_proto.isValidDiscover = function () {
		return regex.card_discover.test( this.value );
	};

	_v_proto.isAlpha = function () {
		return regex.alpha.test( this.value );
	};

	_v_proto.isAlphaNumeric = function () {
		return regex.alphaNumeric.test( this.value );
	};

	_v_proto.isAlphaDash = function () {
		return regex.alphaDash.test( this.value );
	};

	_v_proto.isAlphaNumDash = function () {
		return regex.alphaNumDash.test( this.value );
	};

	_v_proto.isValidIP = function () {
		return regex.ip.test( this.value );
	};

	_v_proto.isValidBase64 = function () {
		return regex.base64.test( this.value );
	};

	_v_proto.isInteger = function () {
		return regex.integer.test( this.value );
	};

	_v_proto.isDecimal = function () {
		return regex.decimal.test( this.value );
	};

	_v_proto.isNumeric = function () {
		return regex.numeric.test( this.value );
	};

	_v_proto.isNatural = function () {
		return regex.natural.test( this.value );
	};

	_v_proto.lengthEq = function ( length ) {
		if ( typeof(length) == 'number' || typeof(length) == 'string' ) {
			return this.value.length == length;
		} else {
			for ( var key in length ) {
				if ( this.value.length == length[key] ) return true;
			}
		}
		return false;
	};

	_v_proto.lengthMore = function ( length ) {
		return this.value.length > length;
	};

	_v_proto.lengthEqOrMore = function ( length ) {
		return this.value.length >= length;
	};

	_v_proto.lengthLess = function ( length ) {
		return this.value.length < length;
	};

	_v_proto.lengthEqOrLess = function ( length ) {
		return this.value.length <= length;
	};

	_v_proto.lengthInRange = function ( range ) {
		return (this.value.length >= range[0] && this.value.length <= range[1]);
	};

	_v_proto.greaterThen = function ( value ) {
		return (_v_( this.value.toString() ).isDecimal() && parseFloat( this.value ) > parseFloat( value )) ? true : false;
	};

	_v_proto.greaterOrEq = function ( value ) {
		return (_v_( this.value.toString() ).isDecimal() && parseFloat( this.value ) >= parseFloat( value )) ? true : false;
	};

	_v_proto.lessThen = function ( value ) {
		return (_v_( this.value.toString() ).isDecimal() && parseFloat( this.value ) < parseFloat( value )) ? true : false;
	};

	_v_proto.lessOrEq = function ( value ) {
		return (_v_( this.value.toString() ).isDecimal() && parseFloat( this.value ) <= parseFloat( value )) ? true : false;
	};

	_v_proto.inRange = function ( value ) {
		return (_v_( this.value.toString() ).isDecimal() && parseFloat( this.value ) >= parseFloat( value[0] ) && parseFloat( this.value ) <= parseFloat( value[1] )) ? true : false;
	};

	_v_proto.matchesToId = function ( value ) {
		if ( typeof value == 'string' || typeof value == 'number' ) {
			value = value.split( ' ' );
			var el = document.getElementById( value );
			if ( !el ) {
				return false;
			}
			return this.value == el.value;
		} else {
			for ( var i = 0; i < value.length; i++ ) {
				var el = document.getElementById( value[i] );
				if ( el && this.value == el.value ) {
					return true;
				}
			}
		}
		return false;
	};

	_v_proto.matchesTo = function ( value ) {
		if ( typeof value == 'string' || typeof value == 'number' ) {
			return this.value == value;
		} else {
			for ( var i = 0, valueLength = value.length; i < valueLength; i++ ) {
				if ( value[i].indexOf( '#' ) === 0 ) {
					var el = document.getElementById( value[i].replace( '#', '' ) );
					if ( !el ) {
						return false;
					}
					if ( this.value == el.value ) return true;
				} else {
					if ( this.value == value[i] ) return true;
				}
			}
		}
		return false;
	};

	_v_proto.notMatches = function ( value ) {
		return !(_v_( this.value ).matchesTo( value ));
	};

	_v_proto.notContain = function ( value ) {
		if ( typeof value == 'string' || typeof value == 'number' ) {
			return (this.value).toString().indexOf( value.toString() ) === -1;
		} else {
			for ( var key in value ) {
				if ( ~(this.value).toString().indexOf( value[key].toString() ) ) {
					return false;
				}
			}
		}
		return true;
	};

	_v_proto.isValidDate = function ( date_formar ) {
		return (__toDate( this.value, date_formar )) ? true : false;
	};

	_v_proto.validateMethods = function ( separator ) {
		var validate_options = _v_( this.value ).parseValidateOptions( separator );
		var validate_methods = [];
		for ( var i = 0, vo_length = validate_options.length; i < vo_length; i++ ) {
			validate_methods[i] = validate_options[i][0];
		}
		return validate_methods;
	};

	_v_proto.parseValidateOptions = function ( separator ) {
		var options = this.value.split( separator || ' ' ),
			parsed_options = [];

		for ( var i = 0; i < options.length; i++ ) {
			var option = options[i],
				func = '',
				param = '';

			if ( keys[ option ] ) {
				func = keys[ option ];
			} else {
				for ( var j = 0, roLength = rules_order.length; j < roLength; j++ ) {
					if ( option.indexOf( rules_order[j] ) === 0 ) {
						param = option.replace( rules_order[j], '' );
						func = keys[rules_order[j]];
						break;
					}
				}
			}
			if ( func ) {
				parsed_options.push( [func, param] );
			}
		}
		return parsed_options;
	};

	/**
	 *
	 * @param options
	 * options.value_separator
	 * options.rule_separator
	 * options.result
	 * @returns {*}
	 */
	_v_proto.validateWithRules = function ( options ) {
		var rules = (typeof options == 'string') ? options : options.rules;
		var value_separator = options.value_separator || ',';
		var rule_separator = options.rule_separator || ' ';
		var result = options.result;
		if ( !rules ) {
			return true;
		}
		var parsedRules = _v_( rules ).parseValidateOptions( rule_separator );
		var errors = [];

		for ( var i = 0, rulesLength = parsedRules.length; i < rulesLength; i++ ) {
			// request goes in the end
			if ( parsedRules[i][0] == 'request' || !parsedRules[i][0] ) {
				continue;
			}

			var method = parsedRules[i][0],
				param = parsedRules[i][1];

			// get param options as array
			var paramArray = regex.ruleArray.exec( param );
			if ( paramArray ) param = paramArray[1].split( ',' );

			if ( !_v_( (this.value).toString() )[method]( param || value_separator ) ) {
				errors.push( [method, param] );
			}
		}

		if ( result == 'array' ) {
			return errors;
		}
		return (errors.length > 0) ? false : true;
	};

	window._v_ = _v_;


	// private stuff and helper functions

	// Date functions
	var __dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var __shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var __dayChars = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	// Full, short and single character names for the months.  Override these to provide multi-language support.
	var __monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var __shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var __monthChars = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

	var __daysInMonth = function ( month, year ) {
		// If February, check for leap year
		if ( (month == 1) && (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) ) {
			return 29;
		}
		else {
			var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			return days[month];
		}
	};

	/**
	 * Attempts to convert a string into a date based on a given format.  Fields will
	 * match either the long or short form, except in the case of the year, where the
	 * string must match either a 2-digit or 4-digit format.  Ranges are checked.  Day
	 * names are expected if they are included in the format string, but are otherwise
	 * ignored.  Use ^ to force the use of a literal character. In other words, to
	 * have the character Y appear instead of the actual year, use ^Y.
	 *
	 * Field        | Full Form           | Short Form
	 * -------------+---------------------+-------------------
	 * Year         | Y (4 digits)        | y (2 digits)
	 * Month        | M (1 or 2 digits)   | m (1 or 2 digits)
	 * Month Name   | N (full name)       | n (abbr)
	 * Day of Month | D (1 or 2 digits)   | d (1 or 2 digits)
	 * Day Name     | W (full name)       | w (abbr)
	 * Hour (1-12)  | H (1 or 2 digits)   | h (1 or 2 digits)
	 * Hour (0-23)  | R (1 or 2 digits)   | r (1 or 2 digits)
	 * Minute       | I (1 or 2 digits)   | i (1 or 2 digits)
	 * Second       | S (1 or 2 digits)   | s (1 or 2 digits)
	 * AM/PM        | A (upper case)      | a (lower case)
	 *
	 * @param {Date} date Date that we should transform.
	 * @param {string} format The basic format of the string.
	 * @return {Date} The string as a date object.
	 */
	var __toDate = function ( date, format ) {
		// Default values set to midnight Jan 1 of the current year.
		var year = new Date().getFullYear(),
			month = 0,
			day = 1,
			hours = 0,
			minutes = 0,
			seconds = 0;

		// Positions of each date element within the source string.  Use to know
		// which backreference to check after a successful match.
		var yearPos = -1,
			monthPos = -1,
			dayPos = -1,
			hoursPos = -1,
			minutesPos = -1,
			secondsPos = -1,
			amPmPos = -1;

		var monthStyle = 'm',       // How we interpret the month, digits (M/m) or names (N/n)
			hoursStyle = 'h';       // How we interpret the hours, 12-hour (h) or 24-hour (r)

		var position = 1,           // Position of the current date element (year, month, day, etc.) in the source string
			pattern = '';           // Date pattern to be matched.

		// Remove extraneous whitespace from source string and format string.
		var str = date.replace( /\s+/g, ' ' );
		format = format.replace( /\s+/g, ' ' );

		// Loop throught the format string, and build the regex pattern
		// for extracting the date elements.
		for ( var i = 0, len = format.length; i < len; i++ ) {
			var c = format.charAt( i );
			switch ( c ) {
				case 'Y' :
					pattern += '(\\d{4})';
					yearPos = position++;
					break;
				case 'y' :
					pattern += '(\\d{2})';
					yearPos = position++;
					break;
				case 'M' :
				case 'm' :
					pattern += '(\\d{1,2})';
					monthPos = position++;
					monthStyle = 'm';
					break;
				case 'N' :
					pattern += '(' + __monthNames.join( '|' ) + ')';
					monthPos = position++;
					monthStyle = 'N';
					break;
				case 'n' :
					pattern += '(' + __shortMonthNames.join( '|' ) + ')';
					monthPos = position++;
					monthStyle = 'n';
					break;
				case 'D' :
				case 'd' :
					pattern += '(\\d{1,2})';
					dayPos = position++;
					break;
				case 'W' : // We'll match W, but won't do anything with it.
					pattern += '(' + __dayNames.join( '|' ) + ')';
					position++;
					break;
				case 'w' : // We'll match w, but won't do anything with it.
					pattern += '(' + __shortDayNames.join( '|' ) + ')';
					position++;
					break;
				case 'H' :
				case 'h' :
					pattern += '(\\d{1,2})';
					hoursPos = position++;
					hoursStyle = 'h';
					break;
				case 'R' :
				case 'r' :
					pattern += '(\\d{1,2})';
					hoursPos = position++;
					hoursStyle = 'r';
					break;
				case 'I' :
				case 'i' :
					pattern += '(\\d{1,2})';
					minutesPos = position++;
					break;
				case 'S' :
				case 's' :
					pattern += '(\\d{1,2})';
					secondsPos = position++;
					break;
				case 'A' :
				case 'a' :
					pattern += '(AM|am|PM|pm)';
					amPmPos = position++;
					break;
				default :
					pattern += (c == '^' ? format.charAt( ++i ) : c);
			}
		}

		// Pull out the date elements from the input string
		var matches = str.match( new RegExp( pattern ) );
		if ( !matches ) {
			return null;
		}

		// Now we have to interpret each of those parts...

		if ( yearPos > -1 ) {
			year = parseInt( matches[yearPos], 10 );
			year = (year < 50 ? year + 2000 : (year < 100 ? year + 1900 : year));
		}

		if ( monthPos > -1 ) {
			switch ( monthStyle ) {
				case 'm':
					month = parseInt( matches[monthPos], 10 ) - 1;    // JavaScript months are zero based, user input generally is not.
					if ( month > 11 )
						return null;
					break;
				case 'N':
					month = parseInt( __monthNumbers[matches[monthPos]], 10 );
					if ( isNaN( month ) )
						return null;
					break;
				case 'n':
					month = parseInt( __shortMonthNumbers[matches[monthPos]], 10 );
					if ( isNaN( month ) )
						return null;
					break;
			}
		}

		if ( dayPos > -1 ) {
			day = parseInt( matches[dayPos], 10 );
			if ( (day < 1) || (day > __daysInMonth( month, year )) )
				return null;
		}

		if ( hoursPos > -1 ) {
			hours = parseInt( matches[hoursPos], 10 );
			if ( hoursStyle == 'h' && (hours === 0 || hours > 12) )
				return null;
			else if ( hours > 23 )
				return null;
		}

		if ( minutesPos > -1 ) {
			minutes = parseInt( matches[minutesPos], 10 );
			if ( minutes > 59 )
				return null;
		}

		if ( secondsPos > -1 ) {
			seconds = parseInt( matches[secondsPos], 10 );
			if ( seconds > 59 )
				return null;
		}

		// Convert 12-hour time, if used, to 24-hour time.
		if ( amPmPos > -1 ) {
			var amPm = matches[amPmPos];
			if ( (amPm == 'pm' || amPm == 'PM') && (hours < 12) )
				hours += 12;
		}

		return new Date( year, month, day, hours, minutes, seconds );
	};


	/**
	 * is array function
	 * @returns {boolean}
	 */
	var __isArray = function ( obj ) {
		return Object.prototype.toString.call( obj ) == '[object Array]';
	};


	/**
	 * detects is defined array has some value
	 * @param array
	 * @param value
	 * @returns {number}
	 * @private
	 */
	var __inArray = function ( array, value ) {
		var index = -1,
			length = array ? array.length : 0;
		while ( ++index < length ) {
			if ( array[index] === value ) {
				return index;
			}
		}
		return -1;
	};

	/**
	 * is array function
	 * @returns {boolean}
	 */
	var __isObject = function ( obj ) {
		return toString.call( obj ) == '[object Object]';
	};

})( window, document );