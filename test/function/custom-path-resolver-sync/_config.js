var path = require( 'path' );
var assert = require( 'assert' );

module.exports = {
	description: 'uses a custom path resolver (synchronous)',
	options: {
		plugins: [{
			resolveId: function ( importee, importer ) {
				if ( path.normalize(importee) === path.resolve( __dirname, 'main.js' ) ) return importee;
				if ( importee === 'foo' ) return path.resolve( __dirname, 'bar.js' );

				return false;
			}
		}]
	},
	warnings: function ( warnings ) {
		assert.deepEqual( warnings, [
			"Treating 'path' as external dependency"
		]);
	},
	exports: function ( exports ) {
		assert.strictEqual( exports.path, require( 'path' ) );
	}
};
