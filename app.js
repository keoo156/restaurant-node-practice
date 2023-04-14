const express = require("express")
const app = express()
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const Restaurant = require("./models/resList")
const bodyParser = require("body-parser")
const Swal = require('sweetalert2')
const methodOverride = require("method-override")


app.engine("handlebars", exphbs({defaultLayout:"main"}))
app.set("view engine", "handlebars")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))

if (process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true,useUnifiedTopology: true })
const db = mongoose.connection
db.on("error",()=>{
    console.log("error")
})
db.once("open", ()=>{
    console.log("success")
})

//首頁路由 ok
app.get("/",(req,res)=>{
    Restaurant.find()
    .lean()
    .then(rests =>{ 
        res.render("index",{rests})
    })
    
    .catch(e=> console.log(e))
})
//前往新增頁面的路由 ok
app.get("/restaurant/new", (req,res)=>{
    res.render("add")
})
//新增資料的路由 ok
app.post("/restaurant", (req,res)=>{
    const {name, category, image, location, phone, rating, description} = req.body
    return Restaurant.create({name, category, image, location, phone, rating, description})
    .then(()=> res.redirect("/"))
    .catch((e)=> console.log(e))
})
//顯示詳細頁面的路由 ok
app.get("/restaurants/:id", (req,res)=>{
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
app.delete("/restaurant/:id",(req,res)=>{
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
app.get("/restaurant/edit/:id", (req,res)=>{
    const id = req.params.id
    return Restaurant.findById(id)
    .lean()
    .then((data)=>{
        res.render("edit",{data})
    })
    .catch((e)=>console.log(e))
})
//儲存更新資料
app.put("/restaurant/:id",(req,res)=>{
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
app.get("/search", (req,res)=>{
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

app.listen(3000,()=>{
    console.log("listening")
})