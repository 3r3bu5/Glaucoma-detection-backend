const redis = require('../config/redis.config');
// error handling
const APIError = require('../error/api.error');
const ErrorStatus = require('../error/errorStatusCode');
const ErrorType = require('../error/errorType');
exports.rateLimiter = async (req, res, next) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const numberOfRequests = await redis.incr(ip);
    let ttl;
    if (numberOfRequests === 1) {
      await redis.expire(ip, 60);
    } else {
      ttl = await redis.ttl(ip);
    }
    if (numberOfRequests > 20) {
      throw new APIError(
        ErrorType.RATE_LIMIT_ERROR,
        ErrorStatus.SERVICE_UNAVALIABLE,
        `Too many requests! please slow down, service will be avaliable again after ${ttl} seconds`,
        true
      );
    }
    return next();
  } catch (err) {
    return next(err);
  }
};
