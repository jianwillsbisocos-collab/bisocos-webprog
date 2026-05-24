const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error("MONGO_URI is not set. Check your .env file.");
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let isConnected = false;

const connectDB = async () => {
    console.log('Connecting to MongoDB Atlas...');
    console.log(`URI: ${uri.replace(/[^@]+:.*@/, '****:****@')}`);

    try {
        // First, connect using the MongoDB driver for the connection
        await client.connect();

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });

        isConnected = true;
        console.log('✅ MongoDB Connected Successfully!');
        console.log('   Pinged your deployment. You successfully connected to MongoDB!');

        // Also connect Mongoose to the same database for models to work
        // Mongoose will use the same connection
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 45000,
        });

        console.log('   Mongoose connected.');

        return client;
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        throw error;
    }
};

// Export both client and connect function
module.exports = { connectDB, client, getClient: () => client };

// Handle process termination
process.on('SIGINT', async () => {
    if (isConnected) {
        await client.close();
        console.log('MongoDB connection closed.');
    }
    process.exit(0);
});
