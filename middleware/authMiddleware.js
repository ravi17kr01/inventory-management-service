const jwt = require('jsonwebtoken');
const logger = require('../utils/logger'); 

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token){
        logger.warn('Access denied: No token provided');
        return res.status(401).json({ message: 'Access Denied. No token provided!' });
    }

    try {
        const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedValue; //{id: user.id}
        logger.info('Token verified successfully', { userId: decodedValue.id });
        next();
    } catch (error) {
        logger.error('Invalid token provided', { error });
        res.status(400).json({message: "Invalid Token!"})
    }

}

module.exports = authMiddleware;