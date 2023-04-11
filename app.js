const express = require("express")
const app = express()
const mongoose = require("mongoose")

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
    res.render("index")
})




app.listen(3000,()=>{
    console.log("listening")
})