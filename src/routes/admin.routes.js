
const createAdmin = require("../controller/admin/create-admin");
const deleteAdmin = require("../controller/admin/delete-admin");
const getAllAdminDetails = require("../controller/admin/get-all-admin-details");
const login = require("../controller/admin/login-admin");
const createLead = require("../controller/lead/create-lead");
const deleteLead = require("../controller/lead/delete-lead");
const getLeadById = require("../controller/lead/get-lead-by-id");
const getLeadList = require("../controller/lead/get-lead-list");
const updateLead = require("../controller/lead/update-lead");
const createWork = require("../controller/work/create-work");
const createQuotation = require("../controller/quotation/createQuotation");
const deleteQuotation = require("../controller/quotation/deleteQuotation");
const getAllQuotations = require("../controller/quotation/getAllQuotations");
const getQuotationById = require("../controller/quotation/getQuotationById");
const getQuotationList = require("../controller/quotation/getQuotationList");
const updateQuotation = require("../controller/quotation/updateQuotation");


const authenticateAdminJwt = require("../utils/middleware/authentication-admin-jwt");
const updateWork = require("../controller/work/update-work");

const addFollowUp = require("../controller/followup/add-follow-up");
const updateFollowUp = require("../controller/followup/update-follow-up");
const approveFollowUp = require("../controller/followup/approve-follow-up");
const rejectFollowUp = require("../controller/followup/reject-follow-up");


const createGenerationLog = require("../controller/generation-log/create-log-generation");
const addPayment = require("../controller/payment/add-payment");
const updatePayment = require("../controller/payment/update-payment");
const getPaymentById = require("../controller/payment/get-payment-by-id");
const getPayments = require("../controller/payment/get-payment");
const deletePayment = require("../controller/payment/delete-payment");
const markPaymentPaid = require("../controller/payment/mark-payment-paid");
const getPaymentList = require("../controller/payment/get-payment-list");

const getAssignList = require("../controller/assign/lead-assign-list");
const updateAssign = require("../controller/assign/update-lead-assign");
const deleteAssign = require("../controller/assign/delete-lead-assign");
const downloadPaymentReceipt = require("../controller/payment/download-payment-receipt");
const getAdminList = require("../controller/admin/get-list-admin");
const createNotification = require("../controller/notification/add-lead-notification");

const createUser = require("../controller/user/add-user");
const getUserList = require("../controller/user/get-user-list");
const updateUser = require("../controller/user/update-user");
const deleteUser = require("../controller/user/delete-user");
const toggleUserStatus = require("../controller/user/toggle-status");
const getUserById = require("../controller/user/get-user-by-id");
const ApproveLeadNotification = require("../controller/notification/approve-lead-notification");
const QuotationAddNotification = require("../controller/notification/add-quotation-notification");
const DeleteNotification = require("../controller/notification/delete-notification");
const getAllNotification = require("../controller/notification/get-all-notification");
const leadAddedNotification = require("../controller/notification/add-lead-notification");
const assignLead = require("../controller/assign/lead-assign");
const getTotalLeadsCount = require("../controller/lead/get-status-wise-lead-list");
const getClientWiseFollowUpList = require("../controller/followup/get-client-wise-follow-up-list");
const getUserAssignList = require("../controller/user/get-user-assign-list");
const getNotificationById = require("../controller/notification/get-notification-by-id");






const adminRouter = require("express").Router();


//admin route

adminRouter.post("/login", login);
adminRouter.post("/create-admin", createAdmin);
adminRouter.post("/get-list-admin", authenticateAdminJwt, getAdminList);
adminRouter.post("/delete-admin", authenticateAdminJwt, deleteAdmin);
adminRouter.get("/get-all-admin-details", authenticateAdminJwt, getAllAdminDetails);

//user route
adminRouter.post("/add-user", authenticateAdminJwt, createUser);
adminRouter.post("/get-user-list", authenticateAdminJwt, getUserList);
adminRouter.post("/update-user", authenticateAdminJwt, updateUser);
adminRouter.post("/delete-user", authenticateAdminJwt, deleteUser);
adminRouter.post("/get-user-by-id", authenticateAdminJwt, getUserById);
adminRouter.post("/toggle-status", authenticateAdminJwt, toggleUserStatus);
adminRouter.post("/get-user-assign-list", authenticateAdminJwt, getUserAssignList);


//lead routes

adminRouter.post("/create-lead", authenticateAdminJwt, createLead);
adminRouter.post("/update-lead", authenticateAdminJwt, updateLead);
adminRouter.post("/delete-lead", authenticateAdminJwt, deleteLead);
adminRouter.post("/get-lead-list", authenticateAdminJwt, getLeadList);
adminRouter.post("/get-lead-by-id", authenticateAdminJwt, getLeadById);
adminRouter.get("/get-status-wise-lead-list", authenticateAdminJwt, getTotalLeadsCount);

// assign routes
adminRouter.post("/lead-assign-list", authenticateAdminJwt, getAssignList);
adminRouter.post("/lead-assign", authenticateAdminJwt, assignLead);
adminRouter.post("/update-lead-assign", authenticateAdminJwt, updateAssign);
adminRouter.post("/delete-lead-assign", authenticateAdminJwt, deleteAssign);

//quotation routes

adminRouter.post("/create-quotation", authenticateAdminJwt, createQuotation);
adminRouter.post("/update-quotation", authenticateAdminJwt, updateQuotation);
adminRouter.post("/delete-quotation", authenticateAdminJwt, deleteQuotation);
adminRouter.get("/get-all-quotations", authenticateAdminJwt, getAllQuotations);
adminRouter.post("/get-quotation-by-id", authenticateAdminJwt, getQuotationById);
adminRouter.post("/get-quotation-list", authenticateAdminJwt, getQuotationList);


// work route
adminRouter.post("/create-work", authenticateAdminJwt, createWork);
adminRouter.post("/update-work", authenticateAdminJwt, updateWork);



// follow-up route
adminRouter.post("/add-follow-up", authenticateAdminJwt, addFollowUp);
adminRouter.post("/update-follow-up", authenticateAdminJwt, updateFollowUp);
adminRouter.post("/approve-follow-up", authenticateAdminJwt, approveFollowUp);
adminRouter.post("/reject-follow-up", authenticateAdminJwt, rejectFollowUp);
adminRouter.get("/get-client-wise-follow-up-list", authenticateAdminJwt, getClientWiseFollowUpList);


// log-generation route
adminRouter.post("/create-log-generation", authenticateAdminJwt, createGenerationLog);

// payment routes
adminRouter.post("/add-payment", authenticateAdminJwt, addPayment);
adminRouter.post("/update-payment", authenticateAdminJwt, updatePayment);
adminRouter.post("/delete-payment", authenticateAdminJwt, deletePayment);
adminRouter.post("/get-payment-list", authenticateAdminJwt, getPaymentList);
adminRouter.post("/download-payment-receipt", authenticateAdminJwt, downloadPaymentReceipt);
adminRouter.get("/get-payment", authenticateAdminJwt, getPayments);
adminRouter.post("/get-payment-by-id", authenticateAdminJwt, getPaymentById);
adminRouter.post("/mark-payment-paid", authenticateAdminJwt, markPaymentPaid);


// notification route
adminRouter.post("/add-lead-notification", authenticateAdminJwt, leadAddedNotification);
adminRouter.post("/approve-lead-notification", authenticateAdminJwt, ApproveLeadNotification);
adminRouter.post("/add-quotation-notification", authenticateAdminJwt, QuotationAddNotification);
adminRouter.post("/delete-notification", authenticateAdminJwt, DeleteNotification);
adminRouter.get("/get-all-notification", authenticateAdminJwt, getAllNotification);
adminRouter.post("/get-notification-by-id", authenticateAdminJwt, getNotificationById);


module.exports = adminRouter;