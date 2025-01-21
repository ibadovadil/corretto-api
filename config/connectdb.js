const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        //Connecting with MongoDB Driver

        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@corretto-cluster.swdmd.mongodb.net/?retryWrites=true&w=majority&appName=corretto-cluster`);
        console.log(`MongoDB Connected Successfully`);
    }
    catch (err) {
        console.error(`Error: ${err.message}`);
    }
}
module.exports = connectDB;