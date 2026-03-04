const FollowUp = require("../models/followup.model");
const { Op } = require("sequelize");
const Lead = require("../models/lead.model");
const { uploadquotation } = require("../utils/multer/upload-quotation-file");
const path = require("path");
const fs = require("fs");

const followUpService = {

    createFollowUp: async (data) => {
        return await FollowUp.create(data);
    },

    getFollowUpByLead: async (leadId, followUpDate) => {
        return await FollowUp.findOne({ where: { leadId } });
    },

    updateFollowUp: async (id, data) => {
        const [rowsUpdated, [updatedFollowUp]] = await FollowUp.update(data, {
            where: { id },
            returning: true
        });
        return rowsUpdated ? updatedFollowUp : null;
    },

    getFollowUpById: async (id) => {
        return await FollowUp.findOne({ where: { id } });
    },

    approveFollowUp: async (id, approvedBy) => {
        const [rowsUpdated, [updatedFollowUp]] = await FollowUp.update(
            {
                status: "Approved",
                approvedBy,
                approvalDate: new Date()
            },
            {
                where: { id },
                returning: true
            }
        );
        return rowsUpdated ? updatedFollowUp : null;
    },

    rejectFollowUp: async (id, rejectedBy, rejectionReason) => {
        const [rowsUpdated, [updatedFollowUp]] = await FollowUp.update(
            {
                status: "Rejected",
                rejectedBy,
                rejectionReason,
                rejectionDate: new Date()
            },
            {
                where: { id },
                returning: true
            }
        );
        return rowsUpdated ? updatedFollowUp : null;
    },

    getFollowUpsByLeadId: async (leadId) => {
        return await FollowUp.findAll({
            where: { leadId },
            order: [["followUpDate", "DESC"]],
        });
    },

    savefollowupImages: async function (dataToInsert) {
        try {
            return await FollowUp.bulkCreate(dataToInsert)
        } catch (error) {
            throw error;
        }
    },

    getAllFollowUps: async () => {
        return await FollowUp.findAll();
    },

    getTotalFollowUpCount: async () => {
        return await FollowUp.count();
    },

    getAllFollowUps: async ({ offset, limit, searchString }) => {
        const whereClause = {};

        if (searchString && searchString.trim() !== "") {
            whereClause[Op.or] = [
                { followUpByName: { [Op.iLike]: `%${searchString}%` } },
                { remark: { [Op.iLike]: `%${searchString}%` } },
            ];
        }

        return FollowUp.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: Lead,
                    as: "lead",
                },
                {
                    model: FollowupFile,
                    as: "files",
                    attributes: ["id", "fileUrl"]
                }
            ],
            order: [["createdAt", "DESC"]],
            offset,
            limit,
        });
    },


    countFollowUps: async (filter = {}) => {
        const where = {};

        if (filter.search) {
            where[Op.or] = [
                { clientName: { [Op.iLike]: `%${filter.search}%` } },
                { projectName: { [Op.iLike]: `%${filter.search}%` } },
                { followUpByName: { [Op.iLike]: `%${filter.search}%` } },
            ];
        }

        if (filter.status) {
            where.status = filter.status;
        }

        if (filter.fromDate && filter.toDate) {
            where.followUpDate = { [Op.between]: [filter.fromDate, filter.toDate] };
        } else if (filter.fromDate) {
            where.followUpDate = { [Op.gte]: filter.fromDate };
        } else if (filter.toDate) {
            where.followUpDate = { [Op.lte]: filter.toDate };
        }

        return await FollowUp.count({ where });
    },


    // getAllFollowUpList: async (page = 1, searchString = "", limit = 10) => {
    //     const offset = (page - 1) * limit;

    //     const whereClause = searchString && searchString.trim() !== ""
    //         ? {
    //             [Op.or]: [
    //                 { remark: { [Op.iLike]: `%${searchString}%` } }, // adjust column
    //                 { title: { [Op.iLike]: `%${searchString}%` } },  // optional, if exists
    //             ],
    //         }
    //         : {};

    //     const { rows: followUps, count: totalCount } = await FollowUp.findAndCountAll({
    //         where: whereClause,
    //         limit,
    //         offset,
    //         order: [["createdAt", "DESC"]],
    //     });

    //     const totalPages = Math.ceil(totalCount / limit);

    //     return {
    //         followUps,
    //         totalCount,
    //         totalPages,
    //         currentPage: page,
    //     };
    // },

    getAllFollowUpList: async (page = 1, searchString = "", limit = 10) => {
        const offset = (page - 1) * limit;

        const whereClause = searchString ? {
            [Op.or]: [
                { remark: { [Op.iLike]: `%${searchString}%` } },
                { followUpByName: { [Op.iLike]: `%${searchString}%` } },
            ]
        } : {};

        const { rows: followUps, count: totalCount } = await FollowUp.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [["createdAt", "DESC"]],
        });

        // Add files from filesystem
        const followUpsWithFiles = followUps.map(followUp => {
            const followUpId = followUp.id;
            const folderPath = path.join(__dirname, "../../public/followup");
            let files = [];
            if (fs.existsSync(folderPath)) {
                files = fs.readdirSync(folderPath)
                    .filter(file => file.includes(`${followUpId}-`)) // optionally prefix file with followUpId
                    .map(file => ({
                        fileUrl: `${process.env.BASE_URL || "http://localhost:3000"}/followup/${file}`,
                    }));
            }

            return {
                ...followUp.toJSON(),
                files,
            };
        });

        const totalPages = Math.ceil(totalCount / limit);

        return {
            followUps: followUpsWithFiles,
            totalCount,
            totalPages,
            currentPage: page,
        };
    },

};

module.exports = followUpService;
