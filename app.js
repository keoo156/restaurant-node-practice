const express = require("express")
const app = express()
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const Restaurant = require("./models/resList")
const bodyParser = require("body-parser")
const Swal = require('sweetalert2')


app.engine("handlebars", exphbs({defaultLayout:"main"}))
app.set("view engine", "handlebars")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

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
app.get("/addNew", (req,res)=>{
    res.render("add")
})
//新增資料的路由 ok
app.post("/sendNew", (req,res)=>{
    const name = req.body.name
    const category = req.body.category
    const image = req.body.image
    const location = req.body.location
    const phone = req.body.phone
    const rating = req.body.rating
    const description = req.body.description
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
    .catch((e)=> console.log(e))
})
//刪除資料的路由
app.get("/delete/:id",(req,res)=>{
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
app.get("/edit/:id", (req,res)=>{
    const id = req.params.id
    return Restaurant.findById(id)
    .lean()
    .then((data)=>{
        res.render("edit",{data})
    })
    .catch((e)=>console.log(e))
})
//儲存更新資料
app.post("/newEdited/:id",(req,res)=>{
    const id = req.params.id
    const name = req.body.name
    const category = req.body.category
    const image = req.body.image
    const location = req.body.location
    const phone = req.body.phone
    const rating = req.body.rating
    const description = req.body.description
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
        res.render("index", {rests,keyword})
    })
    .catch((e)=>{
        console.log(e)
    })
})
//測試
app.get("/123", (req,res)=>{
    res.send("123")
})
app.listen(3000,()=>{
    console.log("listening")
})