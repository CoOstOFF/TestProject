import express from 'express';
import path from 'path'
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import expressSession from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local'
import RememberMeStrategy from 'passport-remember-me'
import routes from './routes/index';
import query from './routes/query';
import db from './database/database';
import User from './User'
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../public')));

app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.authenticate('remember-me'));

mongoose.connect(db.url);

passport.use('local-signup',
    new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    }, function (req, name, password, done) {
        let userData = {
            name: name.trim(),
            password: password.trim(),
        };

        let newUser = new User(userData);
        newUser.save(function (err) {
            if (err) {
                return done(err);
            }

            return done(null);
        });
    })
);

app.use('/', routes);
app.use('/query', query);

app.post('/signup', (req, res, next) => {
    let validationResult = validateSignUpForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message
        });
    }

    passport.authenticate('local-signup', (err, info) => {
        if (err) {
            if (err.name === "MongoError" && err.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: "This name has already taken.",
                });
            }

            return res.status(400).json({success: false, message: "Could not process the form."});
        }

        return res.status(200).json({
            success: true,
            message: 'You have successfully signed up! Now you should be able to log in.'
        });
    })(req, res, next);
});

app.post('/login', (req, res, next) => {
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Oooooops :(');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.statusMessage = err.message;
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.statusMessage = err.message;
    res.render('error', {
        message: err.message,
        error: {}
    });
});

function validateSignUpForm(payload) {
    let isFormValid = true;
    let message = '';

    if (!payload.name) {
        isFormValid = false;
        message = "Please provide a correct name.";
    }

    if (!payload.password) {
        isFormValid = false;
        message = "Please provide a correct password.";
    }

    return {
        success: isFormValid,
        message: message
    };
}

export {app}
