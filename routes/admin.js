const { Router } = require("express");

const { adminModel, userModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");
const { userMiddleware } = require("../middleware/user");
const { adminMiddleware } = require("../middleware/admin");

const adminRouter = Router();

// Admin signup
adminRouter.post("/signup", async function (req, res) {
    // TODO: Add zod validation
    // TODO: Hash or bcrypt the password so that plain text password is not stored in the db
    // TODO: Add a try-catch block

    const { email, password, firstName, lastName } = req.body;

    try {
        await adminModel.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        });

        res.json({
            msg: "admin is signed up successfully"
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error signing up admin",
            error: err.message
        });
    }
});

// Admin signin
adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    try {
        const admin = await adminModel.findOne({
            email: email,
            password: password
        });

        if (admin) {
            const token = jwt.sign(
                { id: admin._id },
                JWT_ADMIN_SECRET
            );
            res.json({
                msg: "admin is signed in successfully",
                token
            });
        } else {
            res.status(403).json({
                msg: "incorrect credential"
            });
        }
    } catch (err) {
        res.status(500).json({
            msg: "Error signing in admin",
            error: err.message
        });
    }
});

// Create course (should use adminMiddleware, not userMiddleware)
adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const { title, description, price, imageUrl } = req.body;

    try {
        const course = await courseModel.create({
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            creatorId: adminId
        });

        res.json({
            msg: "course created",
            courseId: course._id
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error creating course",
            error: err.message
        });
    }
});

// Update course
adminRouter.put("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const { title, description, price, imageUrl, courseId } = req.body;

    try {
        const course = await courseModel.findOneAndUpdate(
            {
                _id: courseId,
                creatorId: adminId
            },
            {
                title: title,
                description: description,
                price: price,
                imageUrl: imageUrl
            },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({
                msg: "Course not found or not authorized"
            });
        }

        res.json({
            msg: "course updated",
            courseId: course._id
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error updating course",
            error: err.message
        });
    }
});

// Get all courses created by this admin
adminRouter.post("/course/bulk", adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    try {
        const courses = await courseModel.find({
            creatorId: adminId
        });

        res.json({
            msg: "all courses of this creator",
            courses
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error fetching courses",
            error: err.message
        });
    }
});

module.exports = {
    adminRouter: adminRouter
}