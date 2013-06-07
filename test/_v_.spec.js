describe( "_v_ methods", function () {

	describe( "separate", function () {
		it( 'set the separator symbol to _v_ rules', function () {
			expect( _v_().separate( '|' ).rules( '*|@' ).rule ).toBe( '*|@' );
		} );
		it( 'rules excepts only values extended to _v_ object', function () {
			expect( _v_().rules( 'some rules' ).rule ).not.toBe( 'some rules' );
		} );
	} );

	describe( "rules", function () {
		it( 'set validation rules', function () {
			expect( _v_().rules( '* @' ).rule ).toBe( '* @' );
		} );
		it( 'rules excepts only values extended to _v_ object', function () {
			expect( _v_().rules( 'some rules' ).rule ).not.toBe( 'some rules' );
		} );
	} );

	describe( "addRule", function () {
		it( 'single rule add', function () {
			expect( _v_( 'test' ).rules( '*' ).addRule( '@' ).parsedRules.hasOwnProperty( '@' ) ).toBe( true );
		} );

		it( 'single rule added to allready defined single rule. result is multiple rule', function () {
			expect( _v_( 'test' ).rules( '=3' ).addRule( '=4' ).parsedRules['='].join( ',' ) ).toBe( '3,4' );
		} );

		it( 'single rule added to allready defined multiple rule', function () {
			expect( _v_( 'test' ).rules( '=[3,4]' ).addRule( '=5' ).parsedRules['='].join( ',' ) ).toBe( '3,4,5' );
		} );

		it( 'multiple rule added to allready defined single rule', function () {
			expect( _v_( 'test' ).rules( '=3' ).addRule( '=[4,5]' ).parsedRules['='].join( ',' ) ).toBe( '3,4,5' );
		} );

		it( 'multiple rule added to allready defined multiple rule', function () {
			expect( _v_( 'test' ).rules( '=[3,4]' ).addRule( '=[3,4,5]' ).parsedRules['='].join( ',' ) ).toBe( '3,4,5' );
		} );
	} );

	describe( "delRule", function () {

		it( 'deleting single rule', function () {
			expect( _v_( 'test' ).rules( '*' ).delRule( '*' ).rule ).toBe( '' );
			expect( _v_( 'test' ).rules( '* @ =10' ).delRule( '*' ).rule ).toBe( '@ =10' );
		} );

		it( 'fully deleting rule that has compare value', function () {
			expect( _v_( 'test' ).rules( '* =[12,13,14]' ).delRule( '=' ).rule ).toBe( '*' );
			expect( _v_( 'test' ).rules( '* >10' ).delRule( '>' ).rule ).toBe( '*' );
		} );

		it( 'delete one values from multiple rule', function () {
			expect( _v_( 'test' ).rules( '* =[12,13,14]' ).delRule( '=12' ).rule ).toBe( '* =[13,14]' );
		} );

		it( 'delete multiple values from multiple rule', function () {
			expect( _v_( 'test' ).rules( '* =[12,13,14,15]' ).delRule( '=[12,15]' ).rule ).toBe( '* =[13,14]' );
		} );

		it( 'delete one or multiple values from multiple rule ald left one value', function () {
			expect( _v_( 'test' ).rules( '* =[12,13,14,15]' ).delRule( '=[12,13,15]' ).rule ).toBe( '* =14' );
		} );

		it( 'delete all multiple values from rule', function () {
			expect( _v_( 'test' ).rules( '* =[12,13,14,15]' ).delRule( '=[12,13,15,14]' ).rule ).toBe( '*' );
		} );

		it('delete chain', function(){
			_v_('test string').rules('* a').delRule('=10');
			expect( _v_('test string').rules('* a').delRule('=10').rule ).toBe( '* a' );
		})

	} );

	describe( "hasRule", function () {
		xit( 'check if such rule exist', function () {
			expect( _v_( 'some' ).rules( "=[12,13]" ).hasRule( '=' ) ).toBeTruthy();
		} );
		xit( 'check if such rule with such value exist', function () {
			expect( _v_( 'some' ).rules( "=[12,13]" ).hasRule( '=12' ) ).toBeTruthy();
			expect( _v_( 'some' ).rules( "=[12,13]" ).hasRule( '=13' ) ).toBeTruthy();
			expect( _v_( 'some' ).rules( "=[12,13]" ).hasRule( '=[12,13]' ) ).toBeTruthy();
			expect( _v_( 'some' ).rules( "=[12,13]" ).hasRule( '=[12,13,14]' ) ).toBeFalsy();
		} );
		it( 'check few rules', function () {
			expect( _v_( 'some' ).rules( "* @ =[12,13]" ).hasRule( '=12 *' ) ).toBeTruthy();
			expect( _v_( 'some' ).rules( "@ * =[12,13]" ).hasRule( '=13 * @' ) ).toBeTruthy();
			expect( _v_( 'some' ).rules( "@ >10 =[12,13]" ).hasRule( '>10 @ =13' ) ).toBeTruthy();
			expect( _v_( 'some' ).rules( "* l>5 =[12,13]" ).hasRule( '= *' ) ).toBeTruthy();
		} );
	} );

	describe( "parseRules", function () {
		it( 'parse rules string and return object with rules keys and their values', function () {
			var test = _v_( 'as' ).rules( '* @ l>10' ).parseRules();
			expect( test.hasOwnProperty( '*' ) ).toBeTruthy();
			expect( test.hasOwnProperty( '@' ) ).toBeTruthy();
			expect( test.hasOwnProperty( 'l>' ) ).toBeTruthy();
			expect( test['l>'] ).toBe( '10' );
		} );
	} );

	describe( "validate", function () {
		it( 'validate with empty rules - true', function () {
			expect( _v_( 'some' ).validate() ).toBeTruthy();
		} )
	} );

	describe( "extend", function () {
		it( 'extends main _v_ object with new rules and functions for validation', function () {
			// as it already used we can check keys;
			expect( _v_().keys.hasOwnProperty( '*' ) ).toBeTruthy();
			expect( _v_().keys.hasOwnProperty( 'reg=' ) ).toBeTruthy();
		} );
	} );

} );

describe( "_v_ rules", function () {

	describe( "* - required", function () {
		it( 'field should not be empty', function () {
			expect( _v_( '1' ).validate( '*' ) ).toBe( true );
			expect( _v_( '' ).validate( '*' ) ).toBe( false );
		} );
	} );


	describe( "a - alpha", function () {
		it( 'should contain only a-zA-Z symbols', function () {
			var test = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase()).split( '' );

			for ( var i = 0; i < 100; i++ ) {
				var length = Math.floor( Math.random() * 100 );
				var str = 'A';
				for ( var j = 0; j < length; j++ ) {
					var symbol = Math.floor( Math.random() * test.length - 5 );
					str += test[symbol];
				}
				expect( _v_( str ).validate( 'a' ) ).toBe( true );
			}
		} );
	} );


	describe( "a1 - alpha and numeric", function () {
		it( 'can contain symbols and numbers', function () {
			var test = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ' + '0123456789' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase()).split( '' );

			for ( var i = 0; i < 100; i++ ) {
				var length = Math.floor( Math.random() * 100 );
				var str = 'A';
				for ( var j = 0; j < length; j++ ) {
					var symbol = Math.floor( Math.random() * test.length - 5 );
					str += test[symbol];
				}
				expect( _v_( str ).validate( 'a1' ) ).toBe( true );
			}
		} );
	} );


	describe( "a_ - alpha and dash", function () {
		it( 'can contain A-Za-z and _ symbol', function () {
			var test = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase()).split( '' ).join( '_' ).split( '' );

			for ( var i = 0; i < 100; i++ ) {
				var length = Math.floor( Math.random() * 100 );
				var str = 'A';
				for ( var j = 0; j < length; j++ ) {
					var symbol = Math.floor( Math.random() * test.length - 5 );
					str += test[symbol];
				}
				expect( _v_( str ).validate( 'a_' ) ).toBe( true );
			}
		} );
	} );


	describe( "a1_ - alpha, numeric and dash", function () {
		it( 'can contain A-Za-z and _ symbol', function () {
			var test = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase()).split( '' ).join( '_' ).split( '' );

			for ( var i = 0; i < 100; i++ ) {
				var length = Math.floor( Math.random() * 100 );
				var str = 'A';
				for ( var j = 0; j < length; j++ ) {
					var symbol = Math.floor( Math.random() * test.length - 5 );
					str += test[symbol];
				}
				expect( _v_( str ).validate( 'a1_' ) ).toBe( true );
			}
		} );
	} );


	describe( "@ - validate email", function () {
		it( "should contain only 1 '@' symbol", function () {
			expect( _v_( 'i@@macpaw.com' ).validate( '@' ) ).not.toBe( true );
			expect( _v_( 'i@tjrus.com' ).validate( '@' ) ).toBe( true );
		} );
	} );


	describe( "@s - validate emails", function () {
		it( "separated with ',' by default", function () {
			expect( _v_( 'tjrus@macpaw.com,i@tjrus.com' ).validate( '@s' ) ).toBe( true );
		} );
	} );


	describe( "ip - validate ip address", function () {
		it( "should be valid IP address", function () {
			expect( _v_( '123.123.123.123' ).validate( 'ip' ) ).toBe( true );
		} );
	} );


	describe( "b64 - validate base64 string", function () {
		it( "should be valid Base64 string", function () {
			expect( _v_( 'YmFzZTY0IHRlc3QgaXM=' ).validate( 'b64' ) ).toBe( true );
		} );
	} );


	describe( "url - validate url", function () {
		it( "should be valid URL string", function () {
			expect( _v_( 'http://tjrus.com' ).validate( 'url' ) ).toBe( true );
		} );
	} );

	describe( "int - is Integer", function () {
		it( "should contain only digits", function () {
			var test = ['123', 123, '0000123'];
			for ( var i = 0; i < test.length; i++ ) {
				expect( _v_( test[i] ).validate( 'int' ) ).toBe( true );
			}
		} );
	} );

	describe( "dec - is Decimal", function () {
		it( "should contain only digits", function () {
			var test = ['123', 123, '0000123'];
			for ( var i = 0; i < test.length; i++ ) {
				expect( _v_( test[i] ).validate( 'dec' ) ).toBe( true );
			}
		} );
	} );

	describe( "nat - is Natural", function () {
		it( "should contain", function () {
			var test = ['123', 123, '0000123'];
			for ( var i = 0; i < test.length; i++ ) {
				expect( _v_( test[i] ).validate( 'nat' ) ).toBe( true );
			}
		} );
	} );

	describe( "num - is Numeric", function () {
		it( "should contain", function () {
			var test = ['123', 123, '0000123'];
			for ( var i = 0; i < test.length; i++ ) {
				expect( _v_( test[i] ).validate( 'num' ) ).toBe( true );
			}
		} );
	} );

	describe( 'l= - length equals to', function () {
		it( 'length should be equal to some value', function () {
			expect( _v_( 'ololo' ).validate( 'l=5' ) ).toBe( true );
		} );
	} );

	describe( 'l> - length is more than', function () {
		it( 'length should be more then some value', function () {
			expect( _v_( 'olol11234o' ).validate( 'l>5' ) ).toBe( true );
		} );
	} );

	describe( 'l>= - langth is more or equals to', function () {
		it( 'length should be equal or more then some value', function () {
			expect( _v_( 'ololo' ).validate( 'l>=5' ) ).toBe( true );
			expect( _v_( 'olol11234o' ).validate( 'l>=5' ) ).toBe( true );
			expect( _v_( 'olo' ).validate( 'l>=5' ) ).not.toBe( true );
		} );
	} );

	describe( 'l< length is less than', function () {
		it( 'length should be less then some value', function () {
			expect( _v_( 'olol11234o' ).validate( 'l<5' ) ).not.toBe( true );
			expect( _v_( 'olol' ).validate( 'l<5' ) ).toBe( true );
		} );
	} );

	describe( 'l<= length is less or equals to', function () {
		it( 'length should be equal or less then some value', function () {
			expect( _v_( 'olol11234o' ).validate( 'l<=5' ) ).not.toBe( true );
			expect( _v_( 'ololo' ).validate( 'l<=5' ) ).toBe( true );
			expect( _v_( 'olol' ).validate( 'l<=5' ) ).toBe( true );
		} );
	} );

	describe( 'lr= - length is in range', function () {
		it( 'length is in defined range', function () {
			expect( _v_( 'asdf' ).validate( 'lr=[3,5]' ) ).toBe( true );
			expect( _v_( 'asdf' ).validate( 'lr=[4,4]' ) ).toBe( true );
			expect( _v_( 'asdf' ).validate( 'lr=[5,6]' ) ).toBe( false );
			expect( _v_( 'asdf' ).validate( 'lr=[1,3]' ) ).toBe( false );
		} );
	} );


	describe( '> more than', function () {
		it( 'length should be greater then some value', function () {
			expect( _v_( '10' ).validate( '>5' ) ).toBe( true );
			expect( _v_( '6' ).validate( '>5' ) ).toBe( true );
			expect( _v_( 1 ).validate( '>5' ) ).not.toBe( true );
		} );
	} );

	describe( '>= more or equals to', function () {
		it( 'length should be greater or equal to some value', function () {
			expect( _v_( '10' ).validate( '>=5' ) ).toBe( true );
			expect( _v_( '5' ).validate( '>=5' ) ).toBe( true );
			expect( _v_( 1 ).validate( '>=5' ) ).not.toBe( true );
		} );
	} );

	describe( '< less than', function () {
		it( 'length should be less or equal to some value', function () {
			expect( _v_( '10' ).validate( '<5' ) ).not.toBe( true );
			expect( _v_( '5' ).validate( '<5' ) ).not.toBe( true );
			expect( _v_( 4 ).validate( '<5' ) ).toBe( true );
		} );
	} );

	describe( '<= - lass or equals to', function () {
		it( 'length should be less or equal to some value', function () {
			expect( _v_( '10' ).validate( '<=5' ) ).not.toBe( true );
			expect( _v_( '5' ).validate( '<=5' ) ).toBe( true );
			expect( _v_( 4 ).validate( '<=5' ) ).toBe( true );
		} );
	} );

	describe( 'r= - value should be in range', function () {
		it( 'value is in defined range', function () {
			expect( _v_( 12 ).validate( 'r=[10,100]' ) ).toBe( true );
			expect( _v_( 10 ).validate( 'r=[10,100]' ) ).toBe( true );
			expect( _v_( 9 ).validate( 'r=[10,100]' ) ).toBe( false );
			expect( _v_( 101 ).validate( 'r=[10,100]' ) ).toBe( false );
		} );
	} );


	describe( 'reg= - regular expression validation', function () {
		it( 'validation with regular expression', function () {
			expect( new _v_( 'kjdh.asdf.asd' ).validate( 'reg=^([a-z]{2,4})(((\\.)([A-Za-z0-9-]+))+)$' ) ).toBe( true );
			expect( new _v_( 'kjsddh.asdf.asd' ).validate( 'reg=^([a-z]{2,4})(((\\.)([A-Za-z0-9-]+))+)$' ) ).toBe( false );
			expect( new _v_( 'kjdh.asdf.asd.' ).validate( 'reg=^([a-z]{2,4})(((\\.)([A-Za-z0-9-]+))+)$' ) ).toBe( false );
		} );
	} );


	describe( '= - matches to', function () {
		it( 'matches to defined value (string or number)', function () {
			expect( _v_( 12 ).validate( '=12' ) ).toBe( true );
			expect( _v_( 11 ).validate( '=12' ) ).toBe( false );
			expect( _v_( '12' ).validate( '=12' ) ).toBe( true );
			expect( _v_( 11 ).validate( '=12' ) ).toBe( false );
			expect( _v_( 'absasd' ).validate( '=ba' ) ).toBe( false );
			expect( _v_( 'ba' ).validate( '=ba' ) ).toBe( true );
		} );

		it( 'value can be array of elements', function () {
			expect( _v_( 'asdf' ).validate( '=[asdf,asdfasdfasd]' ) ).toBe( true );
			expect( _v_( 'asdfasdfasd' ).validate( '=[asdf,asdfasdfasd]' ) ).toBe( true );
			expect( _v_( 'asdfasdfasd' ).validate( '=[asdf,as]' ) ).toBe( false );
		} );

		it( 'included \'#element_id\' to compare with some element value', function () {
			$( '#unique_test_id' ).val( 'asdf' );
			expect( _v_( 'asdf' ).validate( '=[#unique_test_id,asd]' ) ).toBe( true );
			expect( _v_( 'asd' ).validate( '=[#unique_test_id,asd]' ) ).toBe( true );
			expect( _v_( 'assd' ).validate( '=[#unique_test_id,asd]' ) ).toBe( false );
		} );
	} );


	describe( '=# - matches to ID', function () {
		it( 'matches to defined element (id) value', function () {
			$( '#unique_test_id' ).val( '' );
			expect( _v_( '' ).validate( '=#unique_test_id' ) ).toBe( true );

			$( '#unique_test_id' ).val( '1234' );
			expect( _v_( '' ).validate( '=#unique_test_id' ) ).toBe( false );
			expect( _v_( '1234' ).validate( '=#unique_test_id' ) ).toBe( true );
			expect( _v_( 1234 ).validate( '=#unique_test_id' ) ).toBe( true );
			expect( _v_( 1234 ).validate( '=#unique_test_id' ) ).toBe( true );
		} );

		it( 'id can be array of ids', function () {
			$( '#unique_test_id' ).val( '' );
			$( '#unique_test_id2' ).val( '1234' );
			expect( _v_( '' ).validate( '=[#unique_test_id,#unique_test_id2]' ) ).toBe( true );
			expect( _v_( '1234' ).validate( '=[#unique_test_id,#unique_test_id2]' ) ).toBe( true );
			expect( _v_( '34' ).validate( '=[#unique_test_id,#unique_test_id2]' ) ).toBe( false );
		} );
	} );


	describe( '!= - not matches', function () {
		it( 'not matches to defined value (string or number)', function () {
			expect( _v_( 12 ).validate( '!=12' ) ).not.toBe( true );
			expect( _v_( 11 ).validate( '!=12' ) ).not.toBe( false );
			expect( _v_( '12' ).validate( '!=12' ) ).not.toBe( true );
			expect( _v_( 11 ).validate( '!=12' ) ).not.toBe( false );
			expect( _v_( 'absasd' ).validate( '!=ba' ) ).not.toBe( false );
			expect( _v_( 'ba' ).validate( '!=ba' ) ).not.toBe( true );
		} );

		it( 'value can be array of elements', function () {
			expect( _v_( 'asdf' ).validate( '!=[asdf,asdfasdfasd]' ) ).not.toBe( true );
			expect( _v_( 'asdfasdfasd' ).validate( '!=[asdf,asdfasdfasd]' ) ).not.toBe( true );
			expect( _v_( 'asdfasdfasd' ).validate( '!=[asdf,as]' ) ).not.toBe( false );
		} );

		it( 'included \'#element_id\' to compare with some element value', function () {
			$( '#unique_test_id' ).val( 'asdf' );
			expect( _v_( 'asdf' ).validate( '!=[#unique_test_id,asd]' ) ).not.toBe( true );
			expect( _v_( 'asd' ).validate( '!=[#unique_test_id,asd]' ) ).not.toBe( true );
			expect( _v_( 'assd' ).validate( '!=[#unique_test_id,asd]' ) ).not.toBe( false );
		} );
	} );


	describe( '! - no cantain', function () {
		it( 'not contain defined value (string or number)', function () {
			expect( _v_( 12 ).validate( '!12' ) ).toBe( false );
			expect( _v_( '11' ).validate( '!12' ) ).toBe( true );
			expect( _v_( 11 ).validate( '!12' ) ).toBe( true );
			expect( _v_( 'absasd' ).validate( '!ba' ) ).toBe( true );
			expect( _v_( 11 ).validate( '!1' ) ).toBe( false );
			expect( _v_( 11 ).validate( '!1' ) ).toBe( false );
			expect( _v_( '11' ).validate( '!1' ) ).toBe( false );
		} );

		it( 'not contain defined values in array', function () {
			expect( _v_( 12 ).validate( '![12,32]' ) ).toBe( false );
			expect( _v_( '12' ).validate( '![12,32]' ) ).toBe( false );
			expect( _v_( 11 ).validate( '![12,32]' ) ).toBe( true );
			expect( _v_( 11 ).validate( '![1]' ) ).toBe( false );
		} );
	} );


	describe( 'c - validate cards (all types)', function () {
		it( 'All Visa card numbers start with a 4. New cards have 16 digits. Old cards have 13', function () {
			for ( var i = 0; i < 100; i++ ) {
				var value = '4' + (Math.random() * 1).toString().substr( 2, 15 );
				if ( value.length == 16 ) {
					expect( _v_( value ).validate( 'c' ) ).toBe( true );
				}
			}
		} );

		it( 'All MasterCard numbers start with the numbers 51 through 55. All have 16 digits', function () {
			for ( var i = 0; i < 100; i++ ) {
				var value = (Math.random() * 1).toString().substr( 2, 14 );
				if ( value.length == 14 ) {
					expect( _v_( '51' + value ).validate( 'c' ) ).toBe( true );
					expect( _v_( '52' + value ).validate( 'c' ) ).toBe( true );
					expect( _v_( '53' + value ).validate( 'c' ) ).toBe( true );
					expect( _v_( '54' + value ).validate( 'c' ) ).toBe( true );
					expect( _v_( '55' + value ).validate( 'c' ) ).toBe( true );
				}
			}
		} );

		it( 'American Express card numbers start with 34 or 37 and have 15 digits', function () {
			for ( var i = 0; i < 100; i++ ) {
				var value = (Math.random() * 1).toString().substr( 2, 13 );
				if ( value.length == 14 ) {
					expect( _v_( '34' + value ).validate( 'c' ) ).toBe( true );
					expect( _v_( '37' + value ).validate( 'c' ) ).toBe( true );
				}
			}
		} );

		it( 'Discover card numbers begin with 6011 or 65. All have 16 digits', function () {
			for ( var i = 0; i < 100; i++ ) {
				var value = (Math.random() * 1).toString().substr( 2, 14 );
				if ( value.length == 14 ) {
					expect( _v_( '65' + value ).validate( 'c' ) ).toBe( true );
					expect( _v_( '6011' + value.substr( 0, 12 ) ).validate( 'c' ) ).toBe( true );
				}
			}
		} );
	} );


	describe( 'cv - validate Visa cards', function () {
		it( 'All Visa card numbers start with a 4. New cards have 16 digits. Old cards have 13', function () {
			for ( var i = 0; i < 100; i++ ) {
				var value = '4' + (Math.random() * 1).toString().substr( 2, 15 );
				if ( value.length == 16 ) {
					expect( _v_( value ).validate( 'cv' ) ).toBe( true );
					expect( _v_( value.substr( 0, 13 ) ).validate( 'cv' ) ).toBe( true );
				}
			}
			for ( var i = 0; i < 100; i++ ) {
				var value = (Math.random() * 1).toString().substr( 2, 16 );
				if ( parseInt( value[0] ) != 4 ) {
					expect( _v_( value ).validate( 'cv' ) ).not.toBe( true );
					expect( _v_( value.substr( 0, 13 ) ).validate( 'cv' ) ).not.toBe( true );
				}
			}
		} );
	} );


	describe( 'cm - validate Master cards', function () {
		it( 'All MasterCard numbers start with the numbers 51 through 55. All have 16 digits', function () {
			for ( var i = 0; i < 100; i++ ) {
				var value = (Math.random() * 1).toString().substr( 2, 14 );
				if ( value.length == 14 ) {
					expect( _v_( '51' + value ).validate( 'cm' ) ).toBe( true );
					expect( _v_( '52' + value ).validate( 'cm' ) ).toBe( true );
					expect( _v_( '53' + value ).validate( 'cm' ) ).toBe( true );
					expect( _v_( '54' + value ).validate( 'cm' ) ).toBe( true );
					expect( _v_( '55' + value ).validate( 'cm' ) ).toBe( true );

					var v2 = (Math.random() * 1).toString().substr( 2, 2 );
					if ( parseInt( v2, 10 ) < 51 || parseInt( v2, 10 ) > 55 ) {
						expect( _v_( v2 + value ).validate( 'cm' ) ).not.toBe( true );
					}
				}
			}
		} );
	} );


	describe( 'ca - validate Amex cards', function () {
		it( 'American Express card numbers start with 34 or 37 and have 15 digits', function () {
			for ( var i = 0; i < 100; i++ ) {
				var value = (Math.random() * 1).toString().substr( 2, 13 );
				if ( value.length == 14 ) {
					expect( _v_( '34' + value ).validate( 'ca' ) ).toBe( true );
					expect( _v_( '37' + value ).validate( 'ca' ) ).toBe( true );

					var v2 = (Math.random() * 1).toString().substr( 2, 2 );
					if ( parseInt( v2, 10 ) < 51 || parseInt( v2, 10 ) > 55 ) {
						expect( _v_( v2 + value ).validate( 'ca' ) ).not.toBe( true );
					}
				}
			}
		} );
	} );


	describe( 'cd - validate Discover cards', function () {
		it( 'Discover card numbers begin with 6011 or 65. All have 16 digits', function () {
			for ( var i = 0; i < 100; i++ ) {
				var value = (Math.random() * 1).toString().substr( 2, 14 );
				if ( value.length == 14 ) {
					expect( _v_( '65' + value ).validate( 'cd' ) ).toBe( true );
					expect( _v_( '6011' + value.substr( 0, 12 ) ).validate( 'cd' ) ).toBe( true );

					var v2 = (Math.random() * 1).toString().substr( 2, 4 );
					if ( parseInt( v2, 10 ) != 6011 ) {
						expect( _v_( v2 + value ).validate( 'cd' ) ).not.toBe( true );
					}
					if ( parseInt( v2.substr( 0, 2 ), 10 ) != 65 ) {
						expect( _v_( v2 + value.substr( 0, 2 ) ).validate( 'cd' ) ).not.toBe( true );
					}
				}
			}
		} );
	} );


	describe( 'D= - validate date in different formats', function () {
		it( '`D=Y-M-D R:I:S` - maximum example', function () {
			for ( var i = 0; i < 100; i++ ) {
				var YYYY = (parseInt( (Math.random() * 1).toString().substr( 2, 4 ), 10 )).toString();
				var MM = parseInt( (Math.random() * 12).toString().split( '.' )[0], 10 ) + 1;
				var DD = parseInt( (Math.random() * 28).toString().split( '.' )[0], 10 ) + 1;
				var RR = parseInt( (Math.random() * 24).toString().split( '.' )[0], 10 );
				var II = parseInt( (Math.random() * 60).toString().split( '.' )[0], 10 );
				var SS = parseInt( (Math.random() * 60).toString().split( '.' )[0], 10 );
				if ( YYYY.length == 4 ) {
					expect( _v_( YYYY + '-' + MM + '-' + DD + ' ' + RR + ':' + II + ':' + SS ).separate( '|' ).validate( 'D=Y-M-D R:I:S' ) ).toBe( true );
				}
			}
		} )

		it( '`D=Y-M-D H:I:S A` - maximum example', function () {
			for ( var i = 0; i < 100; i++ ) {
				var YYYY = (parseInt( (Math.random() * 1).toString().substr( 2, 4 ), 10 )).toString();
				var MM = parseInt( (Math.random() * 12).toString().split( '.' )[0], 10 ) + 1;
				var DD = parseInt( (Math.random() * 28).toString().split( '.' )[0], 10 ) + 1;
				var HH = parseInt( (Math.random() * 12).toString().split( '.' )[0], 10 ) + 1;
				var II = parseInt( (Math.random() * 60).toString().split( '.' )[0], 10 );
				var SS = parseInt( (Math.random() * 60).toString().split( '.' )[0], 10 );
				var AA = (Math.random() * 2 > 1) ? 'PM' : 'AM';
				if ( YYYY.length == 4 ) {
					expect( _v_( YYYY + '-' + MM + '-' + DD + ' ' + HH + ':' + II + ':' + SS + ' ' + AA ).separate( '|' ).validate( 'D=Y-M-D H:I:S A' ) ).toBe( true );
				}
			}
		} )


		it( 'and other combinations of `Y`,`y`,`M`,`m`,`N`,`n`,`W`,`w`,`H`,`h`,`R`,`r`,`I`,`i`,`S`,`s`,`A`,`a` and their separators', function () {
			expect( new _v_( '2012-1-1 1:1:1 PM' ).separate( '|' ).validate( 'D=Y-M-D H:I:S A' ) ).toBe( true );
			expect( new _v_( '2012-1-1 1:1:1 pm' ).separate( '|' ).validate( 'D=Y-M-D H:I:S a' ) ).toBe( true );
			expect( new _v_( '2012-1-1 10:01:01 pm' ).separate( '|' ).validate( 'D=Y-M-D h:i:s A' ) ).toBe( true );
			expect( new _v_( '2012-1-1 1:1:1 pm' ).separate( '|' ).validate( 'D=Y-M-D h:i:s A' ) ).toBe( true );

			// TODO: add more tests here. but everything is working fine :)
		} );

	} );
} );



