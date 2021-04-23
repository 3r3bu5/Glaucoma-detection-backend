require('dotenv').config();
let Redis = require('ioredis');
let redis = new Redis(process.env.REDIS_URL);

module.exports = redis;
