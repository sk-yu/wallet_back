var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
db = require('./models/db/mongodb');
var app = express();

// swagger
var swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./routes/swagger/swagger');
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//정적파일 사용
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(cookieParser());


app.use(function (req, res, next) {
    var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
    ip = ip.split(',')[0];
    ip = ip.split(':').slice(-1);
    
    console.log(ip[0], process.pid, req.originalUrl, JSON.stringify(req.body));
    next();
});

var cors = require('cors')();
app.use(cors);

//modules
const property = require('./configs/property');
retcode = require('./configs/retcode');
// db = require('./models/db/mongodb');
// eth = require('./modules/wallet/eth');
// mongoose = require('./modules/db/mongodb');
// users = require('./modules/db/users');

//routes
// const index = require('./routes/index');
const usersRouter = require('./routes/usersRouter');
const ethRouter = require('./routes/wallet/ethRouter');
const ethErc20Router = require('./routes/wallet/erc20Router');
const txHistoryRouter = require('./routes/txHistoryRouter');

app.use(`${property.apiPrePath}/account`, usersRouter);
app.use(`${property.apiPrePath}/eth`, ethRouter);
app.use(`${property.apiPrePath}/token`, ethErc20Router);
app.use(`${property.apiPrePath}/history`, txHistoryRouter);

module.exports = app;
