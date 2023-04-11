const mongoose = require("mongoose")
const Schema = mongoose.Schema
const resSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    name_en:{
        type:String,
        required: true
    },
    category:{
        type:String
    },
    image:{
        type:String
    },
    location:{
        type:String,
        required: true
    },
    phone:{
        type:Number
    },
    rating:{
        type:Number
    },
    description:{
        type:String
    }
})
module.exports = mongoose.model("Restaurant", resSchema)