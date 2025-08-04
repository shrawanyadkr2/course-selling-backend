// function createUserrRoute(app) {

// const express = express();
// const {Router}= express.router;

const { Router } = require('express');
const { userModel } = require("../db");
const userRouter = Router();


userRouter.post('/signup',async function (req, res) {

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

userRouter.post('/signin', function (req, res) {
    res.json({
        msg: "you are singned in"
    })
})

userRouter.get('/purchases', function (req, res) {
    res.json({
        msg: "you purchased that courses"
    })
})


module.exports = {
    userRouter: userRouter
}