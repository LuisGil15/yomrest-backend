import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'user',
    passwordField: 'pass'
}, (user: any, pass: any, done: any) => {

    User.findOne({ user: user }, (err: any, user: any) => {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        if (!user.validPassword(pass)) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    });   
}));

