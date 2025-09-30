const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");
const Admin = require("./admin.model");
const Assign = require("./assign.model");

const Lead = sequelize.define("Lead", {
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

    mobile: {
        type: DataTypes.STRING,
        allowNull: true
    },

    company: {
        type: DataTypes.STRING,
        allowNull: true
    },

    leadSource: {
        type: DataTypes.ENUM("Website", "Referral", "Cold Call", "Other"),
        defaultValue: "Other"
    },

    status: {
        type: DataTypes.STRING,
        allowNull: true
    },

    assignByUser: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Admin, key: "id"
        }
    },

    assignedTo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Admin, key: "id"
        }
    },

    isAssigned: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },

    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    projectName: { type: DataTypes.STRING, allowNull: true },
    interestPercentage: { type: DataTypes.INTEGER, allowNull: true, validate: { min: 0, max: 100, isInt: true } },
}, {
    tableName: "lead",
    timestamps: true
});

// Correct associations
Assign.belongsTo(Lead, { foreignKey: "leadId", as: "lead", onDelete: "CASCADE", onUpdate: "CASCADE" });
Lead.hasMany(Assign, { foreignKey: "leadId", as: "assigns", onDelete: "CASCADE", onUpdate: "CASCADE" });

module.exports = Lead;
