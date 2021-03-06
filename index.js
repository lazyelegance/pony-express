const express = require('express');
const compress = require('compression');
const serveStatic = require('serve-static');
const path = require('path');
const logger = require('./lib/logger');
const notFoundHandler = require('./lib/not-found-handler');
const emailsRouter = require('./routes/emails');
const usersRouter = require('./routes/users');
const basicAuth = require('./lib/basic-auth');
const findUser = require('./lib/find-user');
const tokensRouter = require('./routes/tokens');
const tokenAuth = require('./lib/token-auth');
require('dotenv').config();

let app = express();

app.use(logger);
app.use(compress());
app.use(serveStatic(path.join(__dirname, 'public')));
app.use('/uploads', serveStatic(path.join(__dirname, 'uploads')));
app.use('/tokens', tokensRouter);
app.use(tokenAuth(findUser.byToken));
app.use(basicAuth(findUser.byCredentials));
app.use('/users', usersRouter);
app.use('/emails', emailsRouter);
app.use(notFoundHandler);

app.listen(3000);
