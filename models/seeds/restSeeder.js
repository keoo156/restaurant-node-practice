const mongoose = require("mongoose")
const Restaurant = require("../resList")
const resLists = require("/Users/user/Desktop/restaurantDatabasever/restaurant.json")
const lists = resLists.results
const db = require("../../config/mongoose")

db.once("open", ()=>{
lists.forEach(list=>{
    Restaurant.create(
        {name:list.name,
        name_en:list.name_en,
        category:list.category,
        image:list.image,
        location:list.location,
        phone:list.phone,
        rating:list.rating,
        description:list.description})
})
    console.log("success")
})

// lists.forEach(list=>{
//     console.log(typeof list.name_en)
// })
