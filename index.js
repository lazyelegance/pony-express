const express = require('express');
const jsonBodyParser = require('./lib/json-body-parser');
const logger = require('./lib/logger');
const notFoundHandler = require('./lib/not-found-handler');
const emailsRouter = require('./routes/emails');
const usersRouter = require('./routes/users');

let app = express();

app.use(logger);
app.use('/users', usersRouter);
app.use('/emails', emailsRouter);
app.use(notFoundHandler);

app.listen(3000);
