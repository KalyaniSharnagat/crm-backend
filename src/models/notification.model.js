const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Notification = sequelize.define("Notification", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM("info", "warning", "success", "error"),
        defaultValue: "info"
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    recipientId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, // kis user ko bhejna hai
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true
    }     // kisne action kiya
}, {
    tableName: "notifications",
    timestamps: true
});

module.exports = Notification;
