const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const GenerationLog = sequelize.define(
    "GenerationLog",
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        leadId: { type: DataTypes.INTEGER, allowNull: false },
        action: { type: DataTypes.ENUM("APPROVED", "REJECTED"), allowNull: false },
        message: { type: DataTypes.TEXT },
        reason: { type: DataTypes.TEXT }
    },
    {
        tableName: "generation_log",
        freezeTableName: true,
        timestamps: true
    }

);

module.exports = GenerationLog;
