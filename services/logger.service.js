const winston = require('winston');
require('dotenv').config();

const dateFormat = () => {
  return new Date(Date.now()).toLocaleString();
};

class loggerService {
  constructor(route) {
    this.route = route;
    const logger = winston.createLogger({
      level: 'debug',
      format: winston.format.printf((info) => {
        var message = `${dateFormat()} | ${info.level.toUpperCase()} | ${info.message
          } | `;
        message = info.obj
          ? message + `data ${JSON.stringify(info.obj)} | `
          : message;
        return message;
      }),
      transports: [
        new winston.transports.File({
          filename: `${process.env.LOG_FOLDER}/${route}.log`,
        }),
      ],
    });

    this.logger = logger;
    if (process.env.NODE_ENV !== 'production') {
      logger.add(new winston.transports.Console());
    }
  }

  async info(message) {
    this.logger.log('info', message);
  }
  async info(message, obj) {
    this.logger.log('info', message, { obj });
  }
  async error(message) {
    this.logger.log('error', message);
  }
  async error(message, obj) {
    this.logger.log('error', message, { obj });
  }
  async debug(message) {
    this.logger.log('debug', message);
  }
  async debug(message, obj) {
    this.logger.log('debug', message, { obj });
  }
}

module.exports = loggerService;
