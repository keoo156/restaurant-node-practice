const express = require("express")
const app = express()
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const Restaurant = require("./models/resList")

app.engine("handlebars", exphbs({defaultLayout:"main"}))
app.set("view engine", "handlebars")
app.use(express.static("public"))
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


app.get("/",(req,res)=>{
    Restaurant.find()
    .lean()
    .then(rests => res.render("index",{rests}))
    .catch(e=> console.log(e))
})




app.listen(3000,()=>{
    console.log("listening")
})