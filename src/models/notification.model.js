const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Notification = sequelize.define("Notification", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    type: {
        type: DataTypes.ENUM("info", "warning", "success", "error"),
        defaultValue: "info",
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },

    // Foreign keys
    leadId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "lead", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    quotationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "quotations", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },

    // Optional: store quotationNo (string) directly for quick lookup
    quotationNo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "notifications",
    timestamps: true,
});

// Associations
Notification.associate = (models) => {
    Notification.belongsTo(models.Lead, { foreignKey: "leadId", as: "lead" });
    Notification.belongsTo(models.Quotation, { foreignKey: "quotationId", as: "quotation" });
};

module.exports = Notification;
