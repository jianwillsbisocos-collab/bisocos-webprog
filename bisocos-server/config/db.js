const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error("MONGO_URI is not set. Check your .env file.");
}

let isConnected = false;
let connectionPromise = null;

const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    console.log('Connecting to MongoDB Atlas...');
    console.log(`URI: ${uri.replace(/[^@]+:.*@/, '****:****@')}`);

    connectionPromise = mongoose.connect(uri, {
        tls: true,
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 45000,
        retryWrites: true,
    });

    try {
        await connectionPromise;
        isConnected = true;
        console.log('MongoDB Connected Successfully!');
        return mongoose.connection;
    } catch (error) {
        connectionPromise = null;
        console.error('MongoDB connection failed:', error.message);
        throw error;
    }
};

module.exports = { connectDB, getClient: () => mongoose.connection };

process.on('SIGINT', async () => {
    if (isConnected) {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
    process.exit(0);
});
