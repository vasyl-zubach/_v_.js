var allTestFiles = [];

for ( var file in window.__karma__.files ) {
	if ( /spec\.js$/.test( file ) ) {
		allTestFiles.push( file.replace( /^\/base\//, 'http://localhost:9876/base/' ) );
	}
}

require.config( {
	// Karma serves files under /base, which is the basePath from your config file
	baseUrl: 'http://localhost:9876/base',

	urlArgs: "bust=" + (new Date()).getTime(),

	// dynamically load all test files
	deps: allTestFiles,

	// we have to kickoff jasmine, as it is asynchronous
	callback: function () {
		require( [
			],
			function ( ) {
				//window._v_ = _v_;
				window.__karma__.start();
			} );
	}
	//callback: window.__karma__.start

} );
