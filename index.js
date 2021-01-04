const express = require('express');
const compress = require('compression');
const serveStatic = require('serve-static');
const path = require('path');
const logger = require('./lib/logger');
const notFoundHandler = require('./lib/not-found-handler');
const emailsRouter = require('./routes/emails');
const usersRouter = require('./routes/users');

let app = express();

app.use(logger);
app.use(compress());
app.use(serveStatic(path.join(__dirname, 'public')));
app.use('/uploads', serveStatic(path.join(__dirname, 'uploads')));
app.use('/users', usersRouter);
app.use('/emails', emailsRouter);
app.use(notFoundHandler);

app.listen(3000);
