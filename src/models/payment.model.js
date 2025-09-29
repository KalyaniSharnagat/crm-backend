const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");


const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    projectName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    clientName: {
        type: DataTypes.STRING,
        // allowNull: false,
    },

    paymentId: {
        type: DataTypes.STRING, // पहले INTEGER था
        allowNull: false,
        unique: true
    },

    installmentNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    paidDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    paymentMethod: {
        type: DataTypes.ENUM("Cash", "Card", "UPI", "Bank Transfer", "Cheque"),
        allowNull: false,
    },

    installmentCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },

    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM("Pending", "Partially Paid", "Completed"),
        defaultValue: "Pending",
    },

    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    }

}, {
    tableName: "payment",
    freezeTableName: true,
    timestamps: true,
    // defaultScope: {
    //     raw: true   // this makes all queries return plain JSON
    // }
});

// association 
Payment.associate = (models) => {
    Payment.belongsTo(models.Lead, { foreignKey: "leadId", as: "lead", onDelete: "CASCADE", onUpdate: "CASCADE" });
}
module.exports = Payment;
