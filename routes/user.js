// function createUserrRoute(app) {

// const express = express();
// const {Router}= express.router;

const { Router } = require('express');
const { userModel, purchaseModel } = require("../db");
const userRouter = Router();

const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");
const { userMiddleware } = require('../middleware/user');



userRouter.post('/signup', async function (req, res) {

    const { email, password, firstName, lastName } = req.body;

    // TODO: zod validation
    // TODO: hash or bcrypt the password so that plain text password is not stored in the db
    // TODO: add a try-catch block

    await userModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    });

    res.json({
        msg: "you are signed up successfully"
    });
})

userRouter.post('/signin', async function (req, res) {

    // TODO: ideally the password is hashed so we can't compare the DB password and the user provided password directly in future 

    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email,
        password: password
    });

    if (user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_SECRET);


        res.json({
            token: token
        });
    }
    else {

        res.status(403).json({
            msg: "incorrect credential"
        });
    }
});

userRouter.get('/purchases', userMiddleware, async function (req, res) {

    const userid = req.userId;

    const purchases = await purchaseModel.find({
        userId: userid
    });


    res.json({
        purchases: purchases
    });
});


module.exports = {
    userRouter: userRouter
}