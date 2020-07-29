const express = require('express')
const app = express()
const http = require('http')
const appConfig=require('./config/appConfig');
const fs=require('fs');
const mongoose=require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const globalErrorMiddleware=require('./middlewares/appErrorHandler');
const routeLoggerMiddleware=require('./middlewares/routeLogger');
var helmet=require('helmet');
const logger = require('./libs/loggerLib')

//app.get('/home', (req, res) => res.send('Hello World!'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(globalErrorMiddleware.globalErrorHandler);
app.use(routeLoggerMiddleware.logIp);
app.use(helmet());


/****NOTE:-require statements for models should come prior to routes*/
let modelsPath='./models';
fs.readdirSync(modelsPath).forEach(function(file)
{
    if(file.indexOf('.js'))
    {
        require(modelsPath+'/'+file);
    }
});

let routesPath='./routes';
fs.readdirSync(routesPath).forEach(function(file)
{
    if(file.indexOf('.js'))
    {
        console.log("Including the file:");
        console.log(routesPath+'/'+file);
        let route=require(routesPath+'/'+file);
        route.setRouter(app);
    }
});

app.use(globalErrorMiddleware.globalNotFoundHandler);

/**
 * Create HTTP server.
 */

const server = http.createServer(app)
// start listening to http server
console.log(appConfig)
server.listen(appConfig.port)
server.on('error', onError)
server.on('listening', onListening)

// end server listening code

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
        throw error
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(error.code + ':elevated privileges required', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        case 'EADDRINUSE':
            logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        default:
            logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10)
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind)
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10)
    let db = mongoose.connect(appConfig.db.url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
})

//Handling database connectivity failure
mongoose.connection.on('error',function(err)
{
    console.log("Database connection error!!!!");
    console.log(err);
});

//Handling database connectivity success
mongoose.connection.on('open',function(err)
{
    if(err)
    {
        console.log("Database error!!!!");
        console.log(err);
    }
    else
    {
        console.log("Database connection success!!!!");
    }
});