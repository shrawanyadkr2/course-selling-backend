const { Router } = require("express");

const { adminModel, userModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET_PASSWORD = "5674admin";


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
        }, JWT_SECRET_PASSWORD);
        res.json({
            msg: "admin is singned in successfully"
        })

    }
    else{
        res.status(403).json({
            msg:"incorrect credential"
        })
    }


})

adminRouter.post("/course", function (req, res) {
    res.json({
        msg: "copurse end point  "
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