const express = require("express")
const router = express.Router()
const restaurant = require("./modules/restaurant")
const home = require("./modules/home")

router.use("/", home)
router.use("/restaurant", restaurant)
module.exports = router