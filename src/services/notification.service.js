// const { sequelize } = require("../db/db"); // agar transaction use karna ho
const Lead = require('../models/lead.model');
const Notification = require('../models/notification.model');
const Quotation = require('../models/quotation.model');
const sequelize = require('../db/db').sequelize;
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
            message: `Lead added By: ${leadData.clientName}`,
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
            message: `Lead approved By: ${leadData.clientName}`,
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
            message: `Quotation added By: ${quotationData.clientName}`,
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

    // getNotificationList: async ({ page = 1, limit = 10, search = "" }) => {
    //     const offset = (page - 1) * limit;

    //     // 🔍 Search condition
    //     const whereCondition = search
    //         ? {
    //             [Op.or]: [
    //                 { title: { [Op.iLike]: `%${search}%` } },
    //                 { description: { [Op.iLike]: `%${search}%` } },
    //             ],
    //         }
    //         : {};

    //     // 🔢 Count total notifications
    //     const totalCount = await Notification.count({ where: whereCondition });

    //     // 📄 Fetch paginated notifications
    //     const notifications = await Notification.findAll({
    //         where: whereCondition,
    //         order: [["created_at", "DESC"]],
    //         offset,
    //         limit,
    //     });

    //     return { notifications, totalCount };
    // },

    getNotificationCount: async () => {
        const leadCount = await Lead.count();          // Leads ka total
        const quotationCount = await Quotation.count(); // Quotations ka total

        const totalCount = leadCount + quotationCount;  // Dono ka sum
        console.log("🔍 Notification Count:", totalCount);

        return totalCount;
    },
};

module.exports = notificationService;
