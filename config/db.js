const mongoose = require('mongoose');

let options = {useNewUrlParser: true, useUnifiedTopology: true};

//Iinitializing MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("*********MongoDB Connected********");
    } catch (error) {
        console.error(error.message || "Failed to connect to MongoDB!");
        process.exit(1);
    }
} 

module.exports = connectDB;