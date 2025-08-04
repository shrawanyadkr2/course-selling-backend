// function createUserrRoute(app) {

// const express = express();
// const {Router}= express.router;

const { Router } = require('express');
const { userModel } = require("../db");
const userRouter = Router();

const jwt = require("jsonwebtoken");

const { JWT_USER_SECRET } = require("../config")



userRouter.post('/signup', async function (req, res) {

    const { email, password, firstName, lastName } = req.body;

    //todo : zod validation 
    //todo : hash or bycript the password so that plain text password could not be added in the db
    //todo : add a try catch block 

    await userModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })

    res.json({
        msg: "you are singned up successfully"
    })
})

userRouter.post('/signin', async function (req, res) {

    // Todo: ideally the password is hashed so we can't compare the DB password and the user provided password diretly in future 

    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email,
        password: password
    })

    if (user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_SECRET);
        // either do the cookies logic here

        res.json({
            token: token
        })
    }
    else {

        res.status(403).json({
            msg: "incorrect credential"
        })

    }

})

userRouter.get('/purchases', function (req, res) {
    res.json({
        msg: "you purchased that courses"
    })
})


module.exports = {
    userRouter: userRouter
}