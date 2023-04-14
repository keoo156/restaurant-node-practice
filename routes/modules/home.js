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

router.get("/name",(req,res)=>{
    Restaurant.find()
    .lean()
    .sort({name:"desc"})
    .collation({ locale: "zh"})
    .then(rests =>{ 
        res.render("index",{rests})
    })
    
    .catch(e=> console.log(e))
})

router.get("/category",(req,res)=>{
    Restaurant.find()
    .lean()
    .sort({category:"asc"})
    .collation({ locale: "zh"})
    .then(rests =>{ 
        res.render("index",{rests})
    })
    
    .catch(e=> console.log(e))
})

router.get("/location",(req,res)=>{
    Restaurant.find()
    .lean()
    .sort({location:"asc"})
    .collation({ locale: "zh"})
    .then(rests =>{ 
        res.render("index",{rests})
    })
    
    .catch(e=> console.log(e))
})

module.exports = router