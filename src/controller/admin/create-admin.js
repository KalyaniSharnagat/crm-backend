const express = require("express");
const bcrypt = require("bcrypt");
const adminService = require("../../services/admin.service");
const { createAdminValidationSchema } = require("../../utils/validation/admin.validation");

const createAdmin = async (req, res) => {
    try {
        const { username, email, mobile, password } = req.body;

        // ============ Debug: Log incoming request ============
        // console.log("Request Body:", req.body);

        // ================= Validation =================
        const { error } = createAdminValidationSchema.validate(
            {
                username: username?.trim(),
                email: email?.trim(),
                mobile: mobile ? mobile.toString().trim() : "",
                password,
            },
            { abortEarly: false } // Return all errors
        );

        if (error) {
            console.log("Validation Errors:", error.details);
            const messages = error.details.map(d => d.message);
            return res.status(400).json({
                status: "FAILED",
                message: "Validation error",
                errors: messages,
            });
        }

        // ================ Check if user exists =================
        const isUserExist = await adminService.getAdminByEmail(email);
        if (isUserExist) {
            return res.status(409).json({
                status: "FAILED",
                message: "User already exists with this Email, please try another Email",
            });
        }

        // ================= Hash password =================
        const hashedPassword = await bcrypt.hash(password, 12);

        const dataToInsert = {
            username: username.toLowerCase(),
            email,
            mobile: mobile?.toString(),
            password: hashedPassword,
            isActive: true,
        };

        // ================= Create Admin =================
        const result = await adminService.createAdmin(dataToInsert);
        if (result) {
            return res.status(200).json({
                status: "SUCCESS",
                message: "Admin created successfully",
                data: {
                    id: result.id,
                    username: result.username,
                    email: result.email,
                    mobile: result.mobile,
                },
            });
        }

        // Fallback if creation fails
        return res.status(500).json({
            status: "FAILED",
            message: "Failed to create Admin, please try again!",
        });

    } catch (error) {
        console.error("Server Error:", error); // detailed log
        return res.status(500).json({
            status: "FAILED",
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

module.exports = createAdmin;
