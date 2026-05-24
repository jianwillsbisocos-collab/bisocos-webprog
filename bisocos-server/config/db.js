const dns = require('dns');
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
    console.warn('⚠️ Warning: Failed to set custom DNS servers, using system default.', e.message);
}

const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error("MONGO_URI is not set. Check your .env file.");
}

let isConnected = false;

const connectDB = async () => {
    console.log('Connecting to MongoDB Atlas...');
    console.log(`URI: ${uri.replace(/[^@]+:.*@/, '****:****@')}`);

    try {
        // Use Mongoose only (avoid dual driver TLS handshakes)
        await mongoose.connect(uri, {
            // Atlas requires TLS
            tls: true,

            // Timeouts
            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 45000,

            // Keep compatibility for retryable writes
            retryWrites: true,

            // If you still get TLS errors, you may temporarily set:
            // tlsAllowInvalidCertificates: true
            // (NOT recommended for production)
        });

        isConnected = true;
        console.log('✅ MongoDB Connected Successfully!');
        return mongoose.connection;
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
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

