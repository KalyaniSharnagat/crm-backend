const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Quotation = sequelize.define(
    "Quotation",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        quotationNo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        clientName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clientCompany: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        clientEmail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        clientMobile: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        validUntil: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Draft', 'Sent', 'Approved', 'Rejected', 'Expired'),
            allowNull: false,
            defaultValue: 'Draft',
        },
        items: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },
        terms: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        discount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0.00,
        },
        tax: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0.00,
        },
        finalAmount: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: true,
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'admin',
        },
        updatedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        pdfPath: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        emailSent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        emailSentAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "quotations",
        timestamps: true,
    }
);

module.exports = Quotation;
