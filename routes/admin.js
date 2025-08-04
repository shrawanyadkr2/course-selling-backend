const {Router} = require("express");

const adminRouter = Router();

adminRouter.post("/signup",function(req,res){
    res.json({
        msg:"admin is singned up "
    })
})
adminRouter.post("/signin",function(req,res){
    res.json({
        msg:"admin is singned in "
    })
})

adminRouter.post("/course",function(req,res){
    res.json({
        msg:"copurse end point  "
    })
})

adminRouter.put("/course",function(req,res){
    res.json({
        msg:"generating new course"
    })
})

adminRouter.post("/course/bulk",function(req,res){
    res.json({
        msg:"course bulk end point"
    })
})



module.exports={
    adminRouter:adminRouter
}