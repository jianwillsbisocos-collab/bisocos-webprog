const dotenv = require("dotenv");
// Force dotenv to read bisocos-server/.env explicitly.
dotenv.config({ path: require("path").join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const { connectDB } = require("./config/db");

const userRoutes = require("./routes/UserRoutes");
const articleRoutes = require("./routes/ArticleRoutes");

const app = express();

// Database Connection (block startup until Mongo is connected)
// Note: connectDB() throws/exit on failure.

app.use(express.json());

//Middleware
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// vercel options
const corsOptions = {
    origin: "*", // Allow all origins
    credentials: true, // Allow credentials
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204, // For legacy browser support
};
// Express v5 + path-to-regexp may not support wildcard patterns here.
// We already use global CORS middleware above, so preflight handler is optional.
app.use(cors(corsOptions));


// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Bisocos API is running" });
});

app.use("/api", async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({ message: error.message || "Database connection failed" });
    }
});

app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Server Error" });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    // Start Express first so the server is always reachable locally.
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Connect to MongoDB after Express is up (non-blocking).
connectDB().catch((err) => {
    console.error('Failed to connect to MongoDB on startup:', err?.message || err);
    console.error('Server is running but DB-dependent routes will fail until reconnected.');
});

module.exports = app;
