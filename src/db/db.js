const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL, {
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
        console.log("✅ PostgreSQL connected successfully.");
    } catch (error) {
        console.error("❌ Unable to connect to PostgreSQL:", error.message);
    }
};

// Create/Update Tables
async function createTables() {
    try {
        await sequelize.sync({ alter: true }); // safe migration
        console.log("✅ All tables created/updated successfully.");
    } catch (error) {
        console.error("❌ Error creating tables:", error.message);
    }
}

// Close DB
async function closeDB() {
    try {
        await sequelize.close();
        console.log("🔌 PostgreSQL connection closed.");
    } catch (error) {
        console.error("❌ Error closing PostgreSQL connection:", error.message);
    }
}

module.exports = { sequelize, connectDB, createTables, closeDB };
