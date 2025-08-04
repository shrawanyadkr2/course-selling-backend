
const { Router } = require("express");
const { use } = require("react");
const { purchaseModel } = require("../db");
const { courseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");

const courseRouter = Router();
courseRouter.post('/purchase',userMiddleware,async function (req, res) {

    const userId =  req.userId   ;
    const courseId = req.body.courseid;
    
    await purchaseModel.create({
        userId: userId,
        courseId: courseId
    })
    res.json({
        msg: "you successfully purchased the course"
    })
})

courseRouter.get('/preview',async function (req, res) {


    const courses = await courseModel.find({})

    res.json({
        courses: courses
    })
})



module.exports = {
    courseRouter: courseRouter
}