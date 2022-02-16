const mongoose = require('mongoose'); 

/**
 * connectDb to create a connection between our app and the database
 * we're using the mongodb Atlas service here...
 */
const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb connected: ${conn.connection.host}`.blue.underline);
    } catch (error) {
       console.log(error); 
       process.exit(1);
    }
}
 module.exports = connectDB;