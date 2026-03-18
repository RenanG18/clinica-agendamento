const router = require("express").Router()
const controller = require("../controllers/appointmentController")

router.post("/",controller.create)

module.exports = router