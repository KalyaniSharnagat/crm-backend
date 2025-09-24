const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Crm = sequelize.define("Crm", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // Basic info
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    // CRM status
    status: {
        type: DataTypes.ENUM("lead", "prospect", "customer", "lost"),
        defaultValue: "lead",
    },
    source: {
        type: DataTypes.STRING, // e.g., referral, website, cold call
        allowNull: true,
    },
    priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        defaultValue: "medium",
    },

    // Quotation & sales tracking
    quotation_sent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    quotation_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    payment_status: {
        type: DataTypes.ENUM("pending", "partial", "paid"),
        defaultValue: "pending",
    },
    expected_close_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    // Follow-up & notes
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    last_followup_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    next_followup_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    // Address info
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
    defaultScope: {
        raw: true   // 👈 this makes all queries return plain JSON
    }
});

module.exports = Crm;
