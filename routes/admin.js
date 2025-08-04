const { Router } = require("express");

const { adminModel, userModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");
const { userMiddleware } = require("../middleware/user");
const { adminMiddleware } = require("../middleware/admin");


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

    const { title, description, price, imageUrl  } = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    })

    res.json({
        msg: "course created",
        courseId : course._id
    })




})

adminRouter.put("/course",adminMiddleware,async function (req, res) {

     const adminId = req.userId;

    const { title, description, price, imageUrl, courseId } = req.body;

    const course = await courseModel.updateOne({
        _id : courseId,
        creatorId:adminId
    },{

        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        // creatorId: adminId

    })

    res.json({
        msg: "course updated",
        courseId : course._id
    })
   
})

adminRouter.post("/course/bulk", adminMiddleware,async function (req, res) {
    const adminId = req.userId;
    const courses =await courseModel.find({
        creatorId : adminId
    });

    res.json({
        msg:"all couse of this creator is here baby ",
        courses
    })
 
})



module.exports = {
    adminRouter: adminRouter
}