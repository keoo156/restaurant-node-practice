const express = require("express")
const router = express.Router()
const Restaurant = require("../../models/resList")

router.get("/new", (req,res)=>{
    res.render("add")
})
//新增資料的路由 ok
router.post("/", (req,res)=>{
    const {name, category, image, location, phone, rating, description} = req.body
    return Restaurant.create({name, category, image, location, phone, rating, description})
    .then(()=> res.redirect("/"))
    .catch((e)=> console.log(e))
})
//顯示詳細頁面的路由 ok
router.get("/:id", (req,res)=>{
    const id = req.params.id
    return Restaurant.findById(id)
    .lean()
    .then((data)=>{
        res.render("show", {data})
    })
    .catch((e)=>{
        console.log(e)
    })
})
//刪除資料的路由
router.delete("/:id",(req,res)=>{
    const id = req.params.id
    return Restaurant.findById(id)
    .then(data => {
        data.remove()
    })
    .then(() => {
        res.redirect("/")
    })
    .catch((e)=> {
        console.log(e)
    })
})
//更改餐廳資料的路由
router.get("/edit/:id", (req,res)=>{
    const id = req.params.id
    return Restaurant.findById(id)
    .lean()
    .then((data)=>{
        res.render("edit",{data})
    })
    .catch((e)=>console.log(e))
})
//儲存更新資料
router.put("/:id",(req,res)=>{
    const id = req.params.id
    let {name, category, image, location, phone, rating, description} = req.body
    return Restaurant.findById(id)
    .then((data)=>{
        data.name = name,
        data.category = category,
        data.image = image,
        data.location = location,
        data.phone = phone,
        data.rating = rating,
        data.description = description,
        data.save()
    })
    .then(() => {
        res.redirect("/")
    })
    .catch((e) => {

    })
})
//搜尋餐廳
router.get("/search", (req,res)=>{
    const keyword = req.query.keyword
    return Restaurant.find({"$or" :[{name:{$regex:keyword}},{category:{$regex:keyword}}]})
    .lean()
    .then((rests)=>{
        rests.length ? res.render("index", {rests,keyword}) : res.render("empty")
    })
    .catch((e)=>{
        console.log(e)
    })
})

module.exports = router