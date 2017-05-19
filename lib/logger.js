const winston = require('winston');

/**
 * Logger module based on winston.
 */
function createLogger() {
  return new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        level: 'debug'
      })
    ]
  });
}

module.exports = { createLogger };
