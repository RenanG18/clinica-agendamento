const mongoose = require("mongoose")

const AppointmentSchema = new mongoose.Schema({
    patient: String,
    date: String,
    time: String,
    cep: String,
    address: String
})

module.exports = mongoose.model("Appointment", AppointmentSchema)