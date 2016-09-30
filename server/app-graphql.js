import express from 'express';
var graphqlHTTP = require('express-graphql');
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import Schema from './graphql/queries/schema';

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../public')));

app.use('/graphql', graphqlHTTP({schema: Schema, graphiql: false}));

app.use((req, res, next) => {
    var err = new Error('Oooooops :(');
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

export default app