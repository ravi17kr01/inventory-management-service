const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

/*****Signup Method*******/
const signUp = async(req, res) => {
    try {
        const { username, password } = req.body;
        logger.info('Signup request received', { username });

        //validating inputs
        if(!username || !password){
            logger.warn('Signup validation failed: username or password missing');
            return res.status(400).json({message: "Username and password required!"});
        }
        
        //check if user already exists
        const userExists = await User.findOne({username: username});

        if(userExists){
            logger.warn(`Signup failed: Username '${username}' already exists`);
            return res.status(400).json({message: "Username already exists!"})
        }

        //if user doesn't exists, then hash the password and create new entry for that user 
        const hashedPassword =  await bcrypt.hash(password, 10);
        const user = new User({username: username, password: hashedPassword});
        await user.save();

        logger.info(`User '${username}' registered successfully`);
        res.status(200).json({message: "User registered successfully!"});

    } catch (error) {
        logger.error('Error during signup', { error });
        throw new Error('Internal server error!');
    }
}

/********Login Method*********/
const login = async (req, res) => {
    try {
        
        const { username, password } = req.body;
        logger.info('Login request received', { username });
    
        //validating inputs
        if(!username || !password){
            logger.warn('Login validation failed: username or password missing');
            return res.status(400).json({message: "Username and password required!"});
        }
    
        //checking in DB
        const user = await User.findOne({username: username});
    
        if(!user){
            logger.warn(`Login failed: Invalid username '${username}'`);
            return res.status(400).json({message: "Invalid username!"});
        }
    
        const passwordMatched = await bcrypt.compare(password, user.password);
    
        if(!passwordMatched){
            logger.warn(`Login failed: Invalid password for username '${username}'`);
            return res.status(400).json({message: "Invalid password!"})
        }
    
        //returning auth token for subsequent api request 
        const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        
        logger.info(`User '${username}' logged in successfully`);
        res.status(200).json({message: "Logged in succesfully!", token: token}); 

    } catch (error) {
        logger.error('Error during login', { error });        
        throw new Error('Internal server error!');
    }
}

module.exports = {signUp, login};