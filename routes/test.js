"use strict";
module.exports = function( app ) {
  const test = app.controllers.test;

  app.post( '/test/errors', test.errors );
  app.post( '/test/exceptions', test.exceptions );
  app.post( '/test/fallbacks', test.fallbacks );
  app.post( '/test/success', test.success );

  app.post( '/test/login', test.login );
  app.post( '/test/logout', test.logout );
}
