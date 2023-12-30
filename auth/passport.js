//Import
const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const User = require("../models/userModel");
//Configure Passport
passport.use(
  new StrategyJwt(
    {
        // Specify JWT from request
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      // Providesecret key 
      secretOrKey: process.env.JWT_SECRET,
    },
    //Function to verify JWT and find user
    async function (jwtPayload, done) {
      return User.findOne({ _id: jwtPayload._id })
        .then((user) => {
            //If user found, auth ok
          return done(null, user);
        }) //If error auth not ok
        .catch((error) => {
          return done(error);
        });
    }
  )
);
