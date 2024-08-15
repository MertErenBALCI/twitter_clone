const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const expressJSDocSwagger = require('express-jsdoc-swagger');

const app = express();
const constants = require('./src/constants');
const helpers = require('./src/helpers');
const middlewares = require('./src/middlewares');
const db = require('./src/db');

let port = constants.config.PORTS.PROD_PORT;
if (process.env.NODE_ENV === constants.config.ENV.production) {
    console.log('aa');
    app.use(
        logger(function (tokens, req, res) {
            if (['304', '200'].includes(tokens.status(req, res)) === false) {
                helpers.error.logger(
                    {
                        method: tokens.method(req, res),
                        url: tokens.url(req, res),
                        status: tokens.status(req, res),
                        length: tokens.res(req, res, 'content-length'),
                        responseTime: tokens['response-time'](req, res) + ' ms',
                        headers: req.headers,
                        body: req.body,
                        params: req.params,
                        query: req.query
                    }
                );
            }
        })
    );
}

app.use(cors());

if (process.env.NODE_ENV === constants.config.ENV.development) {
    port = constants.config.PORTS.DEV_PORT;
    app.use(logger('dev'));
}

app.use(logger('dev'));


app.use(express.json({ limit: 50000000 }));
app.use(express.urlencoded({ extended: false }));

// connectors for db, cache etc.;
db.mongodb.connector();
// helpers.cache.redis.connector();

expressJSDocSwagger(app)(middlewares.swagger);
app.use(express.json({ limit: '50mb' }));

//routes;
app.get('/', (req, res) => {
    return res.json({ status: true, desc: `${process.env.NODE_ENV} twitter service ` });
});

app.use(require('./src/routes'));

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        helpers.error.logger(err);
        let response = constants.response.SERVER_ERROR();
        response.desc = err.message;
        return res.status(response.httpStatus).send(response); // Bad request
    }
    return next();
});



/**
 * 404
 */
app.use(function (req, res) {
    return res.status(constants.response.NOT_FOUND().httpStatus).json(
        constants.response.NOT_FOUND_EP()
    );
});


app.listen(port, () => {
    console.log(`twitter (${process.env.NODE_ENV}) - PORT: ${port}`);
});