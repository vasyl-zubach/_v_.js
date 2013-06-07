$( document ).ready( function (){
	goto_permalink();
	code_style();
	social();
	demo_init();
	resize();
} );

$( document ).on( 'click', '.permalink', function (){
	goto_permalink();
} );

$( window ).on( 'resize', function (){
	resize();
} );

var resize = function (){
	var sw = $( document ).width() - 40;
	var sh = $( '.content' ).height();
	$( '.section' ).css( {'width': sw, 'height': sh} );
}

var hash;
setInterval( function (){
	var new_hash = window.location.hash
	if ( hash != new_hash ) {
		hash = new_hash;
		onpopstate();
	}
}, 30 );


/**
 *
 * @type {{current: string, arr: Array, get: Function, set: Function, gether: Function}}
 */
var url = {
	current: '',
	arr    : [],
	page   : [],

	get: function ( num ){
		var hash = window.location.hash;
		if ( url.current != hash ) {
			url.current = hash;
			url.arr = hash.replace( '#', '' ).split( '/' );
		}
		return url.arr[num - 1] || '';
	},

	set: function ( obj ){
		for ( var key in obj ) {
			url.arr[key - 1] = obj[key];
		}
		var url_str = url.gether();
		window.location.hash = url_str;
	},

	gether: function (){
		return url.arr.join( '/' );
	}
}


var goto_permalink = function (){
	var hash_1 = url.get( 1 );
	var hash_2 = url.get( 2 );
	var hash_3 = url.get( 3 );
	var $main = $( '.section[data-page="' + hash_1 + '"]' );

	var permalink = hash_1;
	permalink += (hash_2) ? '_' + hash_2 : '';
	permalink += (hash_3) ? '_' + hash_3 : '';

	var $permalink = $( '[data-permalink="' + permalink + '"]' );
	if ( permalink && $permalink.length > 0 ) {
		$main.stop().animate( {
			scrollTop: $permalink[0].offsetTop - 20
		}, 200 );
	} else {
		$main.stop().animate( {
			scrollTop: 0
		}, 100 );
	}
};

var onpopstate = function onpopstate(){
	var page = url.get( 1 );
	if ( !page ) {
		page = 'about';
	}

	if ( url.page == page ) {
		goto_permalink();
		return;
	}
	url.page = page;

	$( '.navbar a' ).removeClass( 'on' );
	$( '.navbar a[data-page="' + page + '"]' ).addClass( 'on' );

	var $was = $( '.section.in' );
	$was.addClass( 'out' );
	setTimeout( function (){
		$was.removeClass( 'fade' );
		$was.removeClass( 'in' );
		$was.removeClass( 'out' );
	}, 300 );
	$( '.section[data-page="' + page + '"]' ).removeClass( 'fade out' ).addClass( 'fade in' );
	goto_permalink();
};

var code_style = function (){
	$( 'code:not(.prettyprint)' ).addClass( 'prettyprint' ).addClass( 'linenums' );
	prettyPrint();
};


var soc_counter;
var social = function (){
	$( '.share, .sociall_btns' ).on( 'mouseenter',function (){
		clearTimeout( soc_counter );
		$( '.sociall_btns' ).addClass( 'on' );
	} ).on( 'mouseleave', function (){
			soc_counter = setTimeout( function (){
				$( '.sociall_btns' ).removeClass( 'on' );
			}, 1000 );
		} );
};


var get_var = function ( _var ){
	return $( '[data-var="_v_' + _var + '"]' ).text();
};

var set_result = function ( _var, value ){
	$( '[data-var="_v_' + _var + '_result"]' ).text( value );
}

var demo_init = function (){
	demo1();
	$( '.demo1' ).find( '[data-var]' ).off( 'input' ).on( 'input', function (){
		demo1();
	} );
	demo2();
	$( '.demo2' ).find( '[data-var]' ).off( 'input' ).on( 'input', function (){
		demo2();
	} );
	demo3();
	$( '.demo3' ).find( '[data-var]' ).off( 'input' ).on( 'input', function (){
		demo3();
	} );
	demo4();
	$( '.demo4' ).find( '[data-var]' ).off( 'input' ).on( 'input', function (){
		demo4();
	} );
	demo5();
	$( '.demo5' ).find( '[data-var]' ).off( 'input' ).on( 'input', function (){
		demo5();
	} );
};

var demo1 = function (){
	var _v_value1 = get_var( 'value1' ),
		_v_separate1 = get_var( 'separate1' ),
		_v_rules1 = get_var( 'rules1' ),
		_v_addrule1 = get_var( 'addrule1' ),
		_v_delrule1 = get_var( 'delrule1' ),
		_v_hasrule1 = get_var( 'hasrule1' );

	var test1 = _v_( _v_value1 ).separate( _v_separate1 ).rules( _v_rules1 );

	set_result( 'addrule1', test1.addRule( _v_addrule1 ).rule );

	set_result( 'delrule1', test1.delRule( _v_delrule1 ).rule );

	set_result( 'hasrule1', test1.hasRule( _v_hasrule1 ) ? 'true' : 'false' );

	set_result( 'validate1', test1.validate() ? 'true' : 'false' );

	set_result( 'value1', test1.value );
	set_result( 'rule1', test1.rule );
	set_result( 'separator1', test1.separator );
	set_result( 'parsedrules1', function (){
		var rules = test1.parsedRules;
		var str = '{';
		for ( var key in rules ) {
			var rules_str = rules[key];
			if ( $.isArray( rules_str ) ) {
				rules_str = '[ ' + rules_str.join( ', ' ) + ' ]'
			}
			str += '\n\t\t' + key + ' : ' + rules_str;
		}
		str += '\n\t}';
		return str;
	} );
};


var demo2 = function (){
	var _v_value2 = get_var( 'value2' ),
		_v_separate2 = get_var( 'separate2' ),
		_v_rules2 = get_var( 'rules2' ),
		_v_addrule2 = get_var( 'addrule2' ),
		_v_delrule2 = get_var( 'delrule2' ),
		_v_hasrule2 = get_var( 'hasrule2' );

	var test2 = _v_( _v_value2 ).separate( _v_separate2 ).rules( _v_rules2 ).addRule( _v_addrule2 ).delRule( _v_delrule2 );

	set_result( 'hasrule2', test2.hasRule( _v_hasrule2 ) ? 'true' : 'false' );

	set_result( 'validate2', test2.validate() ? 'true' : 'false' );
};

var demo3 = function (){
	var _v_value3 = get_var( 'value3' ),
		_v_validate3 = get_var( 'validate3' );
	set_result( 'validate3', _v_( _v_value3 ).validate( _v_validate3 ) ? 'true' : 'false' );
};

var demo4 = function (){
	_v_().extend( 'ip||url', function (){
		var test = this.value;
		return _v_( test ).validate( 'ip' ) || _v_( test ).validate( 'url' );
	} );

	var _v_value41 = get_var( 'value41' ),
		_v_value42 = get_var( 'value42' );
	set_result( 'validate41', _v_( _v_value41 ).validate( 'ip||url' ) ? 'true' : 'false' );
	set_result( 'validate42', _v_( _v_value42 ).validate( 'ip||url' ) ? 'true' : 'false' );
};

var demo5 = function (){
	_v_().extend( '%', function ( num ){
		return this.value % num == 0;
	} );

	var _v_value5 = get_var( 'value5' ),
		_v_rules5 = get_var( 'rules5' );
	set_result( 'validate5', _v_( _v_value5 ).validate( _v_rules5 ) ? 'true' : 'false' );
};