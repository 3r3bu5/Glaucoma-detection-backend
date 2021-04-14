const mongoose = require('mongoose');
var loggerService = require('../services/logger.service');
var logger = new loggerService('db.connection');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL_STRING, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });

        logger.info('Connected to DB successfully');
    } catch (error) {
        logger.error('Error connecting to DB', error);
        process.exit(1);
    }
};

module.exports = connectDB;