"use strict";

const express = require( 'express' );
const spa = require( 'express-spa' );
const path = require( 'path' );

module.exports = function( app ) {


  app.use( require( 'compression' )() ); // serve gziped static content
  app.use( express.static( path.join( __dirname, '/../build' ) ) );

  // This is a SPA https://github.com/aj0strow/express-spa
  app.use( spa( __dirname + '/../build/index.html' ) );

  // The endpoint logger
  app.use( app.lib.rlog );
}
