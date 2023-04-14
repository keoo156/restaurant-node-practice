const express = require("express")
const router = express.Router()

const Restaurant = require("../../models/resList")

//路由首頁
router.get("/",(req,res)=>{
    Restaurant.find()
    .lean()
    .then(rests =>{ 
        res.render("index",{rests})
    })
    
    .catch(e=> console.log(e))
})

module.exports = router