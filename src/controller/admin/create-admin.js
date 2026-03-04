const bcrypt = require("bcrypt");
const adminService = require("../../services/admin.service");
const { createAdminValidationSchema } = require("../../utils/validation/admin.validation");


const addUser = async (request, response) => {
    try {
        const { username, email, mobile, password, role } = request.body;

        // Validation
        const validationResult = await createAdminValidationSchema.validate(
            { username, email, mobile: mobile?.toString(), password },
            { abortEarly: true }
        );

        if (validationResult.error) {
            return response.status(200).json({
                status: "FAILED",
                message: validationResult.error.details[0].message,
            });
        }

        //  Normalize role
        const userRole = role
            ? ["Admin",
                "Manager",
                "Sales Team",
                "Team Leader",
                "Director",
                "Tech Head",
                "CEO",
                "Sales Head",
                "HR",
                "Admin"
            ].find(r => r.toLowerCase() === role.trim().toLowerCase())
            : "Admin"; // default role

        if (!userRole) {
            return response.status(200).json({
                status: "FAILED",
                message: `Invalid role. Allowed roles are: ${allowedRoles.join(", ")}`
            });
        }

        //  Check if user exists
        const isUserExist = await adminService.getAdminByEmail(email);
        if (isUserExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "User already exists with this Email, Please try with another Email",
            });
        }

        //  Hash password
        const hashPassword = await bcrypt.hash(password, 12);

        // Prepare data
        const dataToInsert = {
            username: username?.toLowerCase(),
            email,
            mobile: mobile?.toString(),
            password: hashPassword,
            role: userRole,
            isActive: true,
        };

        //  Insert user
        const result = await adminService.createAdmin(dataToInsert);

        if (result) {
            return response.status(200).json({
                status: "SUCCESS",
                message: `${userRole} created successfully`,
                data: {
                    id: result.id,
                    username: result.username,
                    email: result.email,
                    mobile: result.mobile,
                    role: result.role
                }
            });
        }

        return response.status(200).json({
            status: "FAILED",
            message: "Failed to create user, Please try again!",
        });

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = addUser;
