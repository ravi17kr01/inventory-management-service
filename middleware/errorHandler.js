const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    logger.error('Unhandled exception', {
        message: err.message,
        stack: err.stack,
        route: req.originalUrl,
        method: req.method,
    });

    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        success: false,
        message,
    });
};

module.exports = errorHandler;