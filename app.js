const express = require("express")
const app = express()
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const Restaurant = require("./models/resList")
const bodyParser = require("body-parser")
const Swal = require('sweetalert2')
const methodOverride = require("method-override")
const routes = require("./routes")
require("./config/mongoose")


app.engine("handlebars", exphbs({defaultLayout:"main"}))
app.set("view engine", "handlebars")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.use(routes)





app.listen(3000,()=>{
    console.log("listening")
})