const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require('path');
const dotenv = require("dotenv");
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { connectDB, createTables, closeDB } = require("./src/db/db");
const fs = require('fs');
const adminRouter = require("./src/routes/admin.routes");

dotenv.config();
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const publicPath = path.join(__dirname, "public");

// Check if folder exists, if not create it
if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
    console.log("✅ Public folder created at:", publicPath);
}

// Middleware
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.io = io;
    next();
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('🔌 User connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('❌ User disconnected:', socket.id);
    });
    socket.on('joinAdminRoom', () => {
        socket.join('admin');
        console.log('Admin joined room');
    });
});

//routes
app.use('/getFiles', express.static(path.join(__dirname, '')));
app.use('/', adminRouter)
app.get("/", (request, response) => {
    response.status(200).json({
        message: "Let's CRM backend is running 🏃‍♂️🏃‍♂️",
    });
});


// ✅ Catch-all for any method (GET, POST, PUT, DELETE, etc.)
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Handle shutdown gracefully by disconnecting from the database
process.on('SIGINT', async () => {
    await closeDB()
    process.exit(0);
});

// Connect DB & Create Tables
// connectDB().then(() => {
// createTables();
// });

(async () => {
    await connectDB();
    // await createTables(); // ✅ ensures tables exist
})();

// listen on PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🏃‍♂️`);
});