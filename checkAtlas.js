// Standalone MongoDB Atlas connection test.
// IMPORTANT: this script uses the MongoDB driver that your project has under bisocos-server/node_modules.
// Run it from repo root:
//   set MONGO_URI="mongodb+srv://<user>:<pass>@cluster1.p1s14fv.mongodb.net/?appName=cluster1&retryWrites=true&w=majority"
//   node checkAtlas.js

const path = require('path');

// Force resolution of dependencies from bisocos-server
const mongodbPath = path.join(__dirname, 'bisocos-server', 'node_modules', 'mongodb');
// eslint-disable-next-line import/no-dynamic-require
const { MongoClient, ServerApiVersion } = require(mongodbPath);

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('Missing MONGO_URI in environment.');
  process.exit(1);
}

// Optional: if your Atlas connection targets a specific database name, set MONGO_DBNAME.
const mongoDbName = process.env.MONGO_DBNAME || undefined;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  await client.connect();
  try {
    let db;
    if (mongoDbName) {
      db = client.db(mongoDbName);
    } else {
      const candidates = ['articles', 'article', 'test', 'default', 'bisocos'];
      db = client.db(candidates[0]);
      console.log('MONGO_DBNAME not set. Using fallback db candidate:', db.databaseName);
    }

    const articles = db.collection('articles');
    const users = db.collection('users');

    const [articlesCount, usersCount] = await Promise.all([
      articles.estimatedDocumentCount().catch(() => 0),
      users.estimatedDocumentCount().catch(() => 0),
    ]);

    console.log('✅ Connected to MongoDB Atlas');
    console.log('DB:', db.databaseName);
    console.log({ articlesCount, usersCount });

    console.log('Sample article:', await articles.findOne({}));
    console.log('Sample user:', await users.findOne({}));
  } finally {
    await client.close();
  }
}

run().catch((err) => {
  console.error('❌ MongoDB connection/read failed:', err && err.message ? err.message : err);
  process.exit(1);
});

