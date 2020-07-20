var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

db = require('./models/db/mongodb');


//modules
const property = require('./configs/property');
retcode = require('./configs/retcode');
// eth = require('./modules/wallet/eth');
// mongoose = require('./modules/db/mongodb');
// users = require('./modules/db/users');

//routes
const usersRouter = require('./routes/usersRouter');
const ethRouter = require('./routes/wallet/ethRouter');
const ethErc20Router = require('./routes/wallet/erc20Router');
const txHistoryRouter = require('./routes/txHistoryRouter');

app.use(`${property.apiPrePath}/account`, usersRouter);
app.use(`${property.apiPrePath}/eth`, ethRouter);
app.use(`${property.apiPrePath}/token`, ethErc20Router);
app.use(`${property.apiPrePath}/history`, txHistoryRouter);


module.exports = app;
