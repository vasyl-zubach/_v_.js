requirejs.config( {
	baseUrl: '../src',
	paths  : {
		mocha: '../node_modules/mocha/mocha',
		chai : '../node_modules/chai/chai'
	},
	shim   : {
		mocha: {
			exports: 'mocha'
		},
		chai : {
			exports: 'chai'
		}
	}
} );

define( function ( require ) {
	'use strict';

	var chai = require( 'chai' ),
		mocha = require( 'mocha' ),
		specList = require( './spec-list.js' );

	window.assert = chai.assert;
	window.expect = chai.expect;

	var should = chai.should();
	//chai.use(sinonChai);

	mocha.setup( 'bdd' );
	require( specList, function ( require ) {
		mocha.run();
	} );
} );