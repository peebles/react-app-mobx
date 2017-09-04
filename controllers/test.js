"use strict";

module.exports = function( app ) {
  let lib = {};

  lib.errors = (req, res, cb) => {
    res.status( req.body.statusCode || 400 ).send( req.body.statusMessage || 'No message' );
  }

  lib.exceptions = (req, res, cb) => {
    let foo = bar.x.y;
  }

  lib.fallbacks = (req, res, cb) => {
    cb( new app.lib.error( 400, 'This is a fallback error' ) );
  }

  lib.success = (req, res, cb) => {
    res.json( req.body );
  }

  lib.login = (req, res, cb) => {
    let { username, password } = req.body;
    if ( username && password ) {
      res.json({ username, name: 'Andrew Peebles' });
    }
    else {
      res.status( 403 ).send( 'Authentication Failure!' );
    }
  }

  lib.logout = (req, res, cb) => {
    res.status( 200 ).end();
  }

  return lib;
}
