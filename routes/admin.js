const { Router } = require("express");

const { adminModel, userModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");
const { userMiddleware } = require("../middleware/user");


const adminRouter = Router();



adminRouter.post("/signup", async function (req, res) {

    // todo : zod validation 
    //todo : hash or bycript the password so that plain text password could not be added in the db
    //todo : add a try catch block 

    const { email, password, firstName, lastName } = req.body;

    await adminModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })


    res.json({
        msg: "admin is singned up succesfully"
    })
})
adminRouter.post("/signin", function (req, res) {

    const { email, password } = req.body;

    const admin = adminModel.findOne({
        email: email,
        password: password
    })

    if (admin) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_SECRET);
        res.json({
            msg: "admin is singned in successfully"
        })

    }
    else {
        res.status(403).json({
            msg: "incorrect credential"
        })
    }


})

adminRouter.post("/course", userMiddleware, async function (req, res) {

    const adminId = req.userId;

    const { title, description, price, imageUrl, creatorId } = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: creatorId
    })

    res.json({
        msg: "course created",
        courseId : course._id
    })




})

adminRouter.put("/course", function (req, res) {
    res.json({
        msg: "generating new course"
    })
})

adminRouter.post("/course/bulk", function (req, res) {
    res.json({
        msg: "course bulk end point"
    })
})



module.exports = {
    adminRouter: adminRouter
}