const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");
const Lead = require("../models/lead.model");

const Assign = sequelize.define('Assign', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    leadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Leads",
            key: "id"
        }
    },
    assignedTo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    assignedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM("Pending", "In Progress", "Completed"),
        defaultValue: "Pending"
    }
}, {
    tableName: "assign",
    freezeTableName: true,
    timestamps: true,
    defaultScope: {
        raw: true   // this makes all queries return plain JSON
    }
});

// association 
Assign.associate = (models) => {
    Assign.belongsTo(models.Lead, { foreignKey: "leadId", as: "lead", onDelete: "CASCADE", onUpdate: "CASCADE" });
}
module.exports = Assign;
