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
    mobile: {
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
        type: DataTypes.INTEGER,
        require: true,
    },
    leadId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    assignedTo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    projectName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    interestPercentage: {
        type: DataTypes.INTEGER, // 0 - 100
        allowNull: true,
        validate: {
            min: 0,
            max: 100,
            isInt: { msg: "Interest percentage must be an integer between 0 and 100" }
        }
    },
}, {
    tableName: "lead",
    timestamps: true,
    defaultScope: {
        raw: true   // this makes all queries return plain JSON
    }
});


module.exports = Lead;
