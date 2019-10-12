const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, cb) {
        return UserModel.findOne({ email, password }).then(user => {
            if (!user) {
                return cb(null, false, { messgae: 'Incorrect email or password!' });
            }
            return cb(null, user, { message: 'Logged in successfully' });
        }).catch(err => cb(err));
    }
));

passport.user(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: '1612175'
},
    function (jwtPayload, cb) {
        return UserModel.findOneById(jwtPayload.id).then(user => {
            return cb(null, user);
        }).catch(err => {
            return cb(err);
        });
    }
));