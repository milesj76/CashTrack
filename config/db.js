const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = `${process.env.MONGO_URI_PREFIX}${process.env.MONGO_CLIENT_ID}:${process.env.MONGO_CLIENT_SECRET}${process.env.MONGO_URI_SUFFIX}`;
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
    } catch (err) {
        console.log(`Error: ${err.message}`.red);
        process.exit(1);
    }
}

module.exports = connectDB;