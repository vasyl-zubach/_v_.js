define( function ( require ) {
	'use strict';

	require( '../../src/_v_.js' );

	describe( "_v_ methods", function () {

		describe( "separate", function () {
			it( 'set the separator symbol to _v_ rules', function () {
				_v_().separate( '|' ).rules( '*|@' ).rule.should.equal( "*|@" );
			} );
			it( 'set the separator symbol to _v_ rules', function () {
				_v_().separator.should.equal( ' ' );
			} );
		} );

		describe( "rules", function () {
			it( 'set validation rules', function () {
				_v_().rules( '* @' ).rule.should.equal( '* @' );
			} );
			it( 'rules excepts only values extended to _v_ object', function () {
				_v_().rules( 'some rules' ).rule
					.should.not.equal( 'some rules' );

				_v_().rules( 'some rules' ).rule
					.should.equal( '' );
			} );
		} );

		describe( "addRule", function () {
			it( 'single rule add', function () {
				_v_( 'test' ).rules( '*' ).addRule( '@' ).parsedRules.hasOwnProperty( '@' )
					.should.equal( true );
			} );

			it( 'single rule added to allready defined single rule. result is multiple rule', function () {
				_v_( 'test' ).rules( '=3' ).addRule( '=4' ).parsedRules['='].join( ',' )
					.should.equal( '3,4' );
			} );

			it( 'single rule added to allready defined multiple rule', function () {
				_v_( 'test' ).rules( '=[3,4]' ).addRule( '=5' ).parsedRules['='].join( ',' )
					.should.equal( '3,4,5' );
			} );

			it( 'multiple rule added to allready defined single rule', function () {
				_v_( 'test' ).rules( '=3' ).addRule( '=[4,5]' ).parsedRules['='].join( ',' )
					.should.equal( '3,4,5' );
			} );

			it( 'multiple rule added to allready defined multiple rule', function () {
				_v_( 'test' ).rules( '=[3,4]' ).addRule( '=[3,4,5]' ).parsedRules['='].join( ',' )
					.should.equal( '3,4,5' );
			} );
		} );

		describe( "delRule", function () {

			it( 'deleting single rule', function () {
				_v_( 'test' ).rules( '*' ).delRule( '*' ).rule
					.should.equal( '' );

				_v_( 'test' ).rules( '* @ =10' ).delRule( '*' ).rule
					.should.equal( '@ =10' );
			} );

			it( 'fully deleting rule that has compare value', function () {
				_v_( 'test' ).rules( '* =[12,13,14]' ).delRule( '=' ).rule
					.should.equal( '*' );

				_v_( 'test' ).rules( '* >10' ).delRule( '>' ).rule
					.should.equal( '*' );
			} );

			it( 'delete one values from multiple rule', function () {
				_v_( 'test' ).rules( '* =[12,13,14]' ).delRule( '=12' ).rule
					.should.equal( '* =[13,14]' );
			} );

			it( 'delete multiple values from multiple rule', function () {
				_v_( 'test' ).rules( '* =[12,13,14,15]' ).delRule( '=[12,15]' ).rule
					.should.equal( '* =[13,14]' );
			} );

			it( 'delete one or multiple values from multiple rule ald left one value', function () {
				_v_( 'test' ).rules( '* =[12,13,14,15]' ).delRule( '=[12,13,15]' ).rule
					.should.equal( '* =14' );
			} );

			it( 'delete all multiple values from rule', function () {
				_v_( 'test' ).rules( '* =[12,13,14,15]' ).delRule( '=[12,13,15,14]' ).rule
					.should.equal( '*' );
			} );

			it( 'delete chain', function () {
				_v_( 'test string' ).rules( '* a' ).delRule( '=10' );
				_v_( 'test string' ).rules( '* a' ).delRule( '=10' ).rule
					.should.equal( '* a' );
			} );

		} );

		describe( "hasRule", function () {
			it( 'check if such rule exist', function () {
				_v_( 'some' ).rules( "=[12,13]" ).hasRule( '=' ).should.equal( true );
			} );
			it( 'check if such rule with such value exist', function () {
				_v_( 'some' ).rules( "=[12,13]" ).hasRule( '=12' ).should.equal( true );
				_v_( 'some' ).rules( "=[12,13]" ).hasRule( '=13' ).should.equal( true );
				_v_( 'some' ).rules( "=[12,13]" ).hasRule( '=[12,13]' ).should.equal( true );
				_v_( 'some' ).rules( "=[12,13]" ).hasRule( '=[12,13,14]' ).should.equal( false );
			} );
			it( 'check few rules', function () {
				_v_( 'some' ).rules( "* @ =[12,13]" ).hasRule( '=12 *' ).should.equal( true );
				_v_( 'some' ).rules( "@ * =[12,13]" ).hasRule( '=13 * @' ).should.equal( true );
				_v_( 'some' ).rules( "@ >10 =[12,13]" ).hasRule( '>10 @ =13' ).should.equal( true );
				_v_( 'some' ).rules( "* l>5 =[12,13]" ).hasRule( '= *' ).should.equal( true );
			} );
		} );

		describe( "parseRules", function () {
			it( 'parse rules string and return object with rules keys and their values', function () {
				var test = _v_( 'as' ).rules( '* @ l>10' ).parseRules();
				test.hasOwnProperty( '*' )
					.should.equal( true );

				test.hasOwnProperty( '@' )
					.should.equal( true );

				test.hasOwnProperty( 'l>' )
					.should.equal( true );

				test['l>']
					.should.equal( '10' );
			} );
		} );

		describe( "validate", function () {
			it( 'validate with empty rules - true', function () {
				_v_( 'some' ).validate()
					.should.equal( true );
			} );
		} );

		describe( "extend", function () {
			it( 'extends main _v_ object with new rules and functions for validation', function () {
				_v_().keys.hasOwnProperty( '*' )
					.should.equal( true );

				_v_().keys.hasOwnProperty( 'reg=' )
					.should.equal( true );
			} );
		} );

	} );

	describe( "_v_ rules", function () {

		describe( "* - required", function () {
			it( 'field should not be empty', function () {
				_v_( '1' ).validate( '*' )
					.should.equal( true );

				_v_( '' ).validate( '*' )
					.should.equal( false );
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

					_v_( str ).validate( 'a' )
						.should.equal( true );
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

					_v_( str ).validate( 'a1' )
						.should.equal( true );
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

					_v_( str ).validate( 'a_' )
						.should.equal( true );
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

					_v_( str ).validate( 'a1_' )
						.should.equal( true );
				}
			} );
		} );


		describe( "@ - validate email", function () {
			it( "should contain only 1 '@' symbol", function () {
				_v_( 'i@@macpaw.com' ).validate( '@' )
					.should.equal( false );

				_v_( 'i@tjrus.com' ).validate( '@' )
					.should.equal( true );
			} );
		} );


		describe( "@s - validate emails", function () {
			it( "separated with ',' by default", function () {
				_v_( 'tjrus@macpaw.com,i@tjrus.com' ).validate( '@s' ).should.equal( true );
			} );
		} );


		describe( "ip - validate ip address", function () {
			it( "should be valid IP address", function () {
				_v_( '123.123.123.123' ).validate( 'ip' ).should.equal( true );
			} );
		} );


		describe( "b64 - validate base64 string", function () {
			it( "should be valid Base64 string", function () {
				_v_( 'YmFzZTY0IHRlc3QgaXM=' ).validate( 'b64' ).should.equal( true );
			} );
		} );


		describe( "url - validate url", function () {
			it( "should be valid URL string", function () {
				_v_( 'http://tjrus.com' ).validate( 'url' ).should.equal( true );
			} );
		} );

		describe( "int - is Integer", function () {
			it( "should contain only digits", function () {
				var test = ['123', 123, '0000123'];
				for ( var i = 0; i < test.length; i++ ) {
					_v_( test[i] ).validate( 'int' ).should.equal( true );
				}
			} );
		} );

		describe( "dec - is Decimal", function () {
			it( "should contain only digits", function () {
				var test = ['123', 123, '0000123'];
				for ( var i = 0; i < test.length; i++ ) {
					_v_( test[i] ).validate( 'dec' ).should.equal( true );
				}
			} );
		} );

		describe( "nat - is Natural", function () {
			it( "should contain", function () {
				var test = ['123', 123, '0000123'];
				for ( var i = 0; i < test.length; i++ ) {
					_v_( test[i] ).validate( 'nat' ).should.equal( true );
				}
			} );
		} );

		describe( "num - is Numeric", function () {
			it( "should contain", function () {
				var test = ['123', 123, '0000123'];
				for ( var i = 0; i < test.length; i++ ) {
					_v_( test[i] ).validate( 'num' ).should.equal( true );
				}
			} );
		} );

		describe( 'l= - length equals to', function () {
			it( 'length should be equal to some value', function () {
				_v_( 'ololo' ).validate( 'l=5' ).should.equal( true );
			} );
		} );

		describe( 'l> - length is more than', function () {
			it( 'length should be more then some value', function () {
				_v_( 'olol11234o' ).validate( 'l>5' ).should.equal( true );
			} );
		} );

		describe( 'l>= - langth is more or equals to', function () {
			it( 'length should be equal or more then some value', function () {
				_v_( 'ololo' ).validate( 'l>=5' ).should.equal( true );
				_v_( 'olol11234o' ).validate( 'l>=5' ).should.equal( true );
				_v_( 'olo' ).validate( 'l>=5' ).should.equal( false );
			} );
		} );

		describe( 'l< length is less than', function () {
			it( 'length should be less then some value', function () {
				_v_( 'olol11234o' ).validate( 'l<5' ).should.equal( false );
				_v_( 'olol' ).validate( 'l<5' ).should.equal( true );
			} );
		} );

		describe( 'l<= length is less or equals to', function () {
			it( 'length should be equal or less then some value', function () {
				_v_( 'olol11234o' ).validate( 'l<=5' ).should.equal( false );
				_v_( 'ololo' ).validate( 'l<=5' ).should.equal( true );
				_v_( 'olol' ).validate( 'l<=5' ).should.equal( true );
			} );
		} );

		describe( 'lr= - length is in range', function () {
			it( 'length is in defined range', function () {
				_v_( 'asdf' ).validate( 'lr=[4,4]' ).should.equal( true );
				_v_( 'asdf' ).validate( 'lr=[3,5]' ).should.equal( true );
				_v_( 'asdf' ).validate( 'lr=[5,6]' ).should.equal( false );
				_v_( 'asdf' ).validate( 'lr=[1,3]' ).should.equal( false );
			} );
		} );


		describe( '> more than', function () {
			it( 'length should be greater then some value', function () {
				_v_( '10' ).validate( '>5' ).should.equal( true );
				_v_( '6' ).validate( '>5' ).should.equal( true );
				_v_( 1 ).validate( '>5' ).should.equal( false );
			} );
		} );

		describe( '>= more or equals to', function () {
			it( 'length should be greater or equal to some value', function () {
				_v_( '10' ).validate( '>=5' ).should.equal( true );
				_v_( '5' ).validate( '>=5' ).should.equal( true );
				_v_( 1 ).validate( '>=5' ).should.equal( false );
			} );
		} );

		describe( '< less than', function () {
			it( 'length should be less or equal to some value', function () {
				_v_( '10' ).validate( '<5' ).should.equal( false );
				_v_( '5' ).validate( '<5' ).should.equal( false );
				_v_( 4 ).validate( '<5' ).should.equal( true );
			} );
		} );

		describe( '<= - lass or equals to', function () {
			it( 'length should be less or equal to some value', function () {
				_v_( '10' ).validate( '<=5' ).should.equal( false );
				_v_( '5' ).validate( '<=5' ).should.equal( true );
				_v_( 4 ).validate( '<=5' ).should.equal( true );
			} );
		} );

		describe( 'r= - value should be in range', function () {
			it( 'value is in defined range', function () {
				_v_( 12 ).validate( 'r=[10,100]' ).should.equal( true );
				_v_( 10 ).validate( 'r=[10,100]' ).should.equal( true );
				_v_( 9 ).validate( 'r=[10,100]' ).should.equal( false );
				_v_( 101 ).validate( 'r=[10,100]' ).should.equal( false );
			} );
		} );


		describe( 'reg= - regular expression validation', function () {
			it( 'validation with regular expression', function () {
				_v_( 'kjdh.asdf.asd' ).validate( 'reg=^([a-z]{2,4})(((\\.)([A-Za-z0-9-]+))+)$' ).should.equal( true );
				_v_( 'kjsddh.asdf.asd' ).validate( 'reg=^([a-z]{2,4})(((\\.)([A-Za-z0-9-]+))+)$' ).should.equal( false );
				_v_( 'kjdh.asdf.asd.' ).validate( 'reg=^([a-z]{2,4})(((\\.)([A-Za-z0-9-]+))+)$' ).should.equal( false );
			} );
		} );


		describe( '= - matches to', function () {
			it( 'matches to defined value (string or number)', function () {
				_v_( 12 ).validate( '=12' ).should.equal( true );
				_v_( 11 ).validate( '=12' ).should.equal( false );
				_v_( '12' ).validate( '=12' ).should.equal( true );
				_v_( 11 ).validate( '=12' ).should.equal( false );
				_v_( 'absasd' ).validate( '=ba' ).should.equal( false );
				_v_( 'ba' ).validate( '=ba' ).should.equal( true );
			} );

			it( 'value can be array of elements', function () {
				_v_( 'asdf' ).validate( '=[asdf,asdfasdfasd]' ).should.equal( true );
				_v_( 'asdfasdfasd' ).validate( '=[asdf,asdfasdfasd]' ).should.equal( true );
				_v_( 'asdfasdfasd' ).validate( '=[asdf,as]' ).should.equal( false );
			} );

			it( 'included \'#element_id\' to compare with some element value', function () {
				var input = document.createElement( 'input' );
				input.setAttribute( 'id', 'unique_test_id' );
				input.setAttribute( 'type', 'hidden' );
				input.value = 'asd';
				document.body.appendChild( input );
				_v_( 'asdf' ).validate( '=[#unique_test_id,asd]' ).should.equal( false );
				_v_( 'asd' ).validate( '=[#unique_test_id,asd]' ).should.equal( true );
				_v_( 'assd' ).validate( '=[#unique_test_id,asd]' ).should.equal( false );
				document.body.removeChild( input );
			} );
		} );


		describe( '=# - matches to ID', function () {
			it( 'matches to defined element (id) value', function () {
				var input = document.createElement( 'input' );
				input.setAttribute( 'id', 'unique_test_id' );
				input.setAttribute( 'type', 'hidden' );
				document.body.appendChild( input );
				input.value = '';
				_v_( '' ).validate( '=#unique_test_id' ).should.equal( true );

				input.value = '1234';
				_v_( '' ).validate( '=#unique_test_id' ).should.equal( false );
				_v_( '1234' ).validate( '=#unique_test_id' ).should.equal( true );
				_v_( 1234 ).validate( '=#unique_test_id' ).should.equal( true );
				_v_( 1234 ).validate( '=#unique_test_id' ).should.equal( true );
				document.body.removeChild( input );
			} );

			it( 'id can be array of ids', function () {
				var input1 = document.createElement( 'input' );
				input1.setAttribute( 'id', 'unique_test_id' );
				input1.setAttribute( 'type', 'hidden' );
				document.body.appendChild( input1 );
				input1.value = '';
				var input2 = document.createElement( 'input' );
				input2.setAttribute( 'id', 'unique_test_id2' );
				input2.setAttribute( 'type', 'hidden' );
				document.body.appendChild( input2 );
				input2.value = '1234';
				_v_( ' ' ).validate( '=[#unique_test_id,#unique_test_id2]' ).should.equal( false );
				_v_( '1234' ).validate( '=[#unique_test_id,#unique_test_id2]' ).should.equal( true );
				_v_( '34' ).validate( '=[#unique_test_id,#unique_test_id2]' ).should.equal( false );
				document.body.removeChild( input1 );
				document.body.removeChild( input2 );
			} );
		} );


		describe( '!= - not matches', function () {
			it( 'not matches to defined value (string or number)', function () {
				_v_( 12 ).validate( '!=12' ).should.equal( false );
				_v_( 11 ).validate( '!=12' ).should.equal( true );
				_v_( '12' ).validate( '!=12' ).should.equal( false );
				_v_( 11 ).validate( '!=12' ).should.equal( true );
				_v_( 'absasd' ).validate( '!=ba' ).should.equal( true );
				_v_( 'ba' ).validate( '!=ba' ).should.equal( false );
			} );

			it( 'value can be array of elements', function () {
				_v_( 'asdf' ).validate( '!=[asdf,asdfasdfasd]' ).should.equal( false );
				_v_( 'asdfasdfasd' ).validate( '!=[asdf,asdfasdfasd]' ).should.equal( false );
				_v_( 'asdfasdfasd' ).validate( '!=[asdf,as]' ).should.equal( true );
			} );

			it( 'included \'#element_id\' to compare with some element value', function () {
				var input = document.createElement( 'input' );
				input.setAttribute( 'id', 'unique_test_id' );
				input.setAttribute( 'type', 'hidden' );
				document.body.appendChild( input );
				input.value = 'asdf';
				_v_( 'asdf' ).validate( '!=[#unique_test_id,asd]' ).should.equal( false );
				_v_( 'asd' ).validate( '!=[#unique_test_id,asd]' ).should.equal( false );
				_v_( 'assd' ).validate( '!=[#unique_test_id,asd]' ).should.equal( true );
				document.body.removeChild( input );
			} );
		} );


		describe( '! - no cantain', function () {
			it( 'not contain defined value (string or number)', function () {
				_v_( 12 ).validate( '!12' ).should.equal( false );
				_v_( '11' ).validate( '!12' ).should.equal( true );
				_v_( 11 ).validate( '!12' ).should.equal( true );
				_v_( 'absasd' ).validate( '!ba' ).should.equal( true );
				_v_( 11 ).validate( '!1' ).should.equal( false );
				_v_( 11 ).validate( '!1' ).should.equal( false );
				_v_( '11' ).validate( '!1' ).should.equal( false );
			} );

			it( 'not contain defined values in array', function () {
				_v_( 12 ).validate( '![12,32]' ).should.equal( false );
				_v_( '12' ).validate( '![12,32]' ).should.equal( false );
				_v_( 11 ).validate( '![12,32]' ).should.equal( true );
				_v_( 11 ).validate( '![1]' ).should.equal( false );
			} );
		} );


		describe( 'c - validate cards (all types)', function () {
			it( 'All Visa card numbers start with a 4. New cards have 16 digits. Old cards have 13', function () {
				for ( var i = 0; i < 100; i++ ) {
					var value = '4' + Math.random().toString().substr( 2, 15 );
					if ( value.length === 16 ) {
						_v_( value ).validate( 'c' ).should.equal( true );
					}
				}
			} );

			it( 'All MasterCard numbers start with the numbers 51 through 55. All have 16 digits', function () {
				for ( var i = 0; i < 100; i++ ) {
					var value = Math.random().toString().substr( 2, 14 );
					if ( value.length === 14 ) {
						for ( var j = 1; j <= 5; j++ ) {
							_v_( '5' + j + value ).validate( 'c' ).should.equal( true );
						}
					}
				}
			} );

			it( 'American Express card numbers start with 34 or 37 and have 15 digits', function () {
				for ( var i = 0; i < 100; i++ ) {
					var value = Math.random().toString().substr( 2, 13 );
					if ( value.length === 13 ) {
						_v_( '34' + value ).validate( 'c' ).should.equal( true );
						_v_( '37' + value ).validate( 'c' ).should.equal( true );

						var v2 = Math.random().toString().substr( 2, 2 );
						if ( [34, 37].indexOf( parseInt( v2, 10 ) ) === -1 ) {
							_v_( v2 + value ).validate( 'c' ).should.equal( false );
						}
					}
				}
			} );

			it( 'Discover card numbers begin with 6011 or 65. All have 16 digits', function () {
				for ( var i = 0; i < 100; i++ ) {
					var value = Math.random().toString().substr( 2, 14 );
					if ( value.length === 14 ) {
						_v_( '65' + value ).validate( 'c' ).should.equal( true );
						_v_( '6011' + value.substr( 0, 12 ) ).validate( 'c' ).should.equal( true );
					}
				}
			} );
		} );


		describe( 'cv - validate Visa cards', function () {
			it( 'All Visa card numbers start with a 4. New cards have 16 digits. Old cards have 13', function () {
				for ( var i = 0; i < 100; i++ ) {
					var value = '4' + Math.random().toString().substr( 2, 15 );
					if ( value.length === 16 ) {
						_v_( value ).validate( 'cv' ).should.equal( true );
						_v_( value.substr( 0, 13 ) ).validate( 'cv' ).should.equal( true );
					}
				}
				for ( var i = 0; i < 100; i++ ) {
					var value = Math.random().toString().substr( 2, 16 );
					if ( parseInt( value[0] ) !== 4 ) {
						_v_( value ).validate( 'cv' ).should.equal( false );
						_v_( value.substr( 0, 13 ) ).validate( 'cv' ).should.equal( false );
					}
				}
			} );
		} );


		describe( 'cm - validate Master cards', function () {
			it( 'All MasterCard numbers start with the numbers 51 through 55. All have 16 digits', function () {
				for ( var i = 0; i < 100; i++ ) {
					var value = Math.random().toString().substr( 2, 14 );
					if ( value.length === 14 ) {
						for ( var j = 1; j <= 5; j++ ) {
							_v_( '5' + j + value ).validate( 'cm' ).should.equal( true );
						}

						var v2 = (Math.random() * 1).toString().substr( 2, 2 );
						if ( parseInt( v2, 10 ) < 51 || parseInt( v2, 10 ) > 55 ) {
							_v_( v2 + value ).validate( 'cm' ).should.equal( false );
						}
					}
				}
			} );
		} );


		describe( 'ca - validate Amex cards', function () {
			it( 'American Express card numbers start with 34 or 37 and have 15 digits', function () {
				for ( var i = 0; i < 100; i++ ) {
					var value = Math.random().toString().substr( 2, 13 );
					if ( value.length === 13 ) {
						_v_( '34' + value ).validate( 'ca' ).should.equal( true );
						_v_( '37' + value ).validate( 'ca' ).should.equal( true );

						var v2 = Math.random().toString().substr( 2, 2 );
						if ( [34, 37].indexOf( parseInt( v2, 10 ) ) === -1 ) {
							_v_( v2 + value ).validate( 'ca' ).should.equal( false );
						}
					}
				}
			} );
		} );


		describe( 'cd - validate Discover cards', function () {
			it( 'Discover card numbers begin with 6011 or 65. All have 16 digits', function () {
				for ( var i = 0; i < 100; i++ ) {
					var value = Math.random().toString().substr( 2, 14 );
					if ( value.length === 14 ) {
						_v_( '65' + value ).validate( 'cd' ).should.equal( true );
						_v_( '6011' + value.substr( 0, 12 ) ).validate( 'cd' ).should.equal( true );

						var v2 = Math.random().toString().substr( 2, 4 );
						if ( parseInt( v2, 10 ) !== 6011 ) {
							_v_( v2 + value ).validate( 'cd' ).should.equal( false );
						}
						if ( parseInt( v2.substr( 0, 2 ), 10 ) !== 65 ) {
							_v_( v2 + value.substr( 0, 2 ) ).validate( 'cd' ).should.equal( false );
						}
					}
				}
			} );
		} );


		describe( 'D= - validate date in different formats', function () {
			it( '`D=Y-M-D R:I:S` - maximum example', function () {
				for ( var i = 0; i < 100; i++ ) {
					var YYYY = (parseInt( Math.random().toString().substr( 2, 4 ), 10 )).toString();
					var MM = parseInt( (Math.random() * 12).toString().split( '.' )[0], 10 ) + 1;
					var DD = parseInt( (Math.random() * 28).toString().split( '.' )[0], 10 ) + 1;
					var RR = parseInt( (Math.random() * 24).toString().split( '.' )[0], 10 );
					var II = parseInt( (Math.random() * 60).toString().split( '.' )[0], 10 );
					var SS = parseInt( (Math.random() * 60).toString().split( '.' )[0], 10 );
					if ( YYYY.length === 4 ) {
						_v_( YYYY + '-' + MM + '-' + DD + ' ' + RR + ':' + II + ':' + SS ).separate( '|' ).validate( 'D=Y-M-D R:I:S' )
							.should.equal( true );
					}
				}
			} );

			it( '`D=Y-M-D H:I:S A` - maximum example', function () {
				for ( var i = 0; i < 100; i++ ) {
					var YYYY = (parseInt( Math.random().toString().substr( 2, 4 ), 10 )).toString();
					var MM = parseInt( (Math.random() * 12).toString().split( '.' )[0], 10 ) + 1;
					var DD = parseInt( (Math.random() * 28).toString().split( '.' )[0], 10 ) + 1;
					var HH = parseInt( (Math.random() * 12).toString().split( '.' )[0], 10 ) + 1;
					var II = parseInt( (Math.random() * 60).toString().split( '.' )[0], 10 );
					var SS = parseInt( (Math.random() * 60).toString().split( '.' )[0], 10 );
					var AA = (Math.random() * 2 > 1) ? 'PM' : 'AM';
					if ( YYYY.length === 4 ) {
						_v_( YYYY + '-' + MM + '-' + DD + ' ' + HH + ':' + II + ':' + SS + ' ' + AA ).separate( '|' ).validate( 'D=Y-M-D H:I:S A' )
							.should.equal( true );
					}
				}
			} );


			it( 'and other combinations of `Y`,`y`,`M`,`m`,`N`,`n`,`W`,`w`,`H`,`h`,`R`,`r`,`I`,`i`,`S`,`s`,`A`,`a` and their separators', function () {
				new _v_( '2012-1-1 1:1:1 PM' ).separate( '|' ).validate( 'D=Y-M-D H:I:S A' ).should.equal( true );
				new _v_( '2012-1-1 1:1:1 pm' ).separate( '|' ).validate( 'D=Y-M-D H:I:S a' ).should.equal( true );
				new _v_( '2012-1-1 10:01:01 pm' ).separate( '|' ).validate( 'D=Y-M-D h:i:s A' ).should.equal( true );
				new _v_( '2012-1-1 1:1:1 pm' ).separate( '|' ).validate( 'D=Y-M-D h:i:s A' ).should.equal( true );

				// TODO: add more tests here. but everything is working fine :)
			} );

		} );
	} );

} );