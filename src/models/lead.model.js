const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Lead = sequelize.define('Lead', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    company: {
        type: DataTypes.STRING,
        allowNull: true
    },
    leadSource: {
        type: DataTypes.ENUM('Website', 'Referral', 'Cold Call', 'Other'), defaultValue: 'Other'
    },
    status: {
        type: DataTypes.ENUM('New', 'Contacted', 'Positive', 'Lost'),
        defaultValue: 'New'
    },

    assignedTo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // notes: {
    //     type: DataTypes.TEXT,
    //     allowNull: true
    // },
}, {
    tableName: "crm",
    timestamps: true,
    defaultScope: {
        raw: true   // 👈 this makes all queries return plain JSON
    }
});

module.exports = Lead;
