
const { Router } = require("express");

const courseRouter = Router();
courseRouter.post('/purchase', function (req, res) {
    // it would expect the user to pay 
    res.json({
        msg: "you are singned up"
    })
})

courseRouter.get('/preview', function (req, res) {
    res.json({
        msg: "you are singned up"
    })
})



module.exports = {
    courseRouter: courseRouter
}