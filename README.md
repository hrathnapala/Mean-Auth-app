## Instructions to Deploy and Build application

# Simple MEAN Stack Application

This app uses Angular/Node.js/Express/MongoDB

## Usage

Create a config folder and add 2 files as database.js and passport.js
in database.js -> module.exports = {
  database:
    "URL",
  secret: "Secret",
};

in passport.js ->
const JwtStratergy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../config/database");
const User = require("../models/user");
const passport = require("passport");

module.exports = () => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
  passport.use(
    new JwtStratergy(opts, function (jwt_payload, done) {
      User.getUserById(jwt_payload._id, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};



```
# Install dependencies
npm install for both server and client

# Run in development
npm start in the root directory

# Run in production
npm start in the root directory
```
