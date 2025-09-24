const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false },
    },
    logging: false,
});

// Connect DB
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Connected to Neon PostgreSQL successfully.");
    } catch (error) {
        console.error("❌ Unable to connect to Neon PostgreSQL:", error.message);
        process.exit(1);
    }
};

// Create tables (optional, dev mode)
const createTables = async (options = { alter: true }) => {
    try {
        await sequelize.sync(options); // alter: true updates tables if needed
        console.log("✅ All tables created successfully.");
    } catch (error) {
        console.error("❌ Error creating tables:", error.message);
        throw error;
    }
};

// Close connection
const closeDB = async () => {
    try {
        await sequelize.close();
        console.log("🔌 Neon PostgreSQL connection closed.");
    } catch (error) {
        console.error("❌ Error closing Neon connection:", error.message);
    }
};

module.exports = { sequelize, connectDB, createTables, closeDB };
