const NotFound = require('./not-found');

const notFoundHandler = (err, req, res, next) => {
  if (err instanceof NotFound) {
    res.sendStatus(404);
    next();
  } else {
    next(err);
  }
};

module.exports = notFoundHandler;
