// const { sequelize } = require("../db/db"); // agar transaction use karna ho
const Notification = require('../models/notification.model');

const notifications = [];
const notificationService = {

    // addNotification: async (data, transaction = null) => {
    //     try {
    //         return await Notification.create(data, { transaction });
    //     } catch (err) {
    //         console.error("Error adding notification:", err);
    //         throw err;
    //     }
    // },
    leadAdded: async (leadData) => {
        const notification = {
            id: notifications.length + 1,
            type: "lead",
            action: "added",
            message: `Lead added: ${leadData.name}`,
            data: leadData,
            createdAt: new Date(),
        };
        notifications.push(notification);
        return notification;
    },
    leadApproved: async (leadData) => {
        const notification = {
            id: notifications.length + 1,
            type: "lead",
            action: "approved",
            message: `Lead approved: ${leadData.name}`,
            data: leadData,
            createdAt: new Date(),
        };
        notifications.push(notification);
        return notification;
    },
    quotationAdded: async (quotationData) => {
        const notification = {
            id: notifications.length + 1,
            type: "quotation",
            action: "added",
            message: `Quotation added for: ${quotationData.clientName}`,
            data: quotationData,
            createdAt: new Date(),
        };
        notifications.push(notification);
        return notification;
    },

    deleteNotification: async (data) => {
        const notification = {
            id: notifications.length + 1,
            type: data.type,
            action: "deleted",
            message: `${data.type} deleted (ID: ${data.id})`,
            data: data,
            createdAt: new Date(),
        }
    },
    addNotification: async ({ type, action, message, data }) => {
        const newNotification = {
            id: notifications.length + 1,
            type,
            action,
            message,
            data,
            createdAt: new Date()
        };
        notifications.push(newNotification);
        console.log("Notification added:", newNotification);
        return newNotification;
    },


    getAllNotifications: async () => {
        return notifications;
    },

    getNotificationById: async (id) => {
        try {
            const notification = await Notification.findOne({
                where: { id }
            });

            if (!notification) {
                throw new Error("Notification not found");
            }

            return notification;
        } catch (error) {
            console.error("Error in getNotificationById service:", error);
            throw error;
        }
    },


};

module.exports = notificationService;
