// function createUserrRoute(app) {

// const express = express();
// const {Router}= express.router;

const { Router } = require('express');

const userRouter = Router();


userRouter.post('/signup', function (req, res) {
    res.json({
        msg: "you are singned up"
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