
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
const getAssignList = require("../controller/assign/assign-list");
const createAssign = require("../controller/assign/create-assign");
const createGenerationLog = require("../controller/generation-log/create-log-generation");
const addPayment = require("../controller/payment/add-payment");
const updatePayment = require("../controller/payment/update-payment");
const getPaymentById = require("../controller/payment/get-payment-by-id");
const getPayments = require("../controller/payment/get-payment");
const deletePayment = require("../controller/payment/delete-payment");
const markPaymentPaid = require("../controller/payment/mark-payment-paid");
const getPaymentList = require("../controller/payment/get-payment-list");



const adminRouter = require("express").Router();

adminRouter.post("/login", login);
adminRouter.post("/create-admin", createAdmin);
adminRouter.post("/delete-admin", authenticateAdminJwt, deleteAdmin);
adminRouter.get("/get-all-admin-details", authenticateAdminJwt, getAllAdminDetails);

//lead routes

adminRouter.post("/create-lead", authenticateAdminJwt, createLead);
adminRouter.post("/update-lead", authenticateAdminJwt, updateLead);
adminRouter.post("/delete-lead", authenticateAdminJwt, deleteLead);
adminRouter.post("/get-lead-list", authenticateAdminJwt, getLeadList);
adminRouter.post("/get-lead-by-id", authenticateAdminJwt, getLeadById);

// assign routes
adminRouter.post("/assign-list", authenticateAdminJwt, getAssignList);
adminRouter.post("/create-assign", authenticateAdminJwt, createAssign);

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


// log-generation route
adminRouter.post("/create-log-generation", authenticateAdminJwt, createGenerationLog);

// payment routes
adminRouter.post("/add-payment", authenticateAdminJwt, addPayment);
adminRouter.post("/update-payment", authenticateAdminJwt, updatePayment);
adminRouter.post("/delete-payment", authenticateAdminJwt, deletePayment);
adminRouter.post("/get-payment-list", authenticateAdminJwt, getPaymentList);
// adminRouter.post("/get-payment", authenticateAdminJwt, );
adminRouter.get("/get-payment", authenticateAdminJwt, getPayments);
adminRouter.post("/get-payment-by-id", authenticateAdminJwt, getPaymentById);
adminRouter.post("/mark-payment-paid", authenticateAdminJwt, markPaymentPaid);

module.exports = adminRouter;