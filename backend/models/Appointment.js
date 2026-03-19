const mongoose = require("mongoose")

const AppointmentSchema = new mongoose.Schema({
  patient: String,
  date: String,
  time: String,
  cep: String,
  logradouro: String,
  cidade: String,
  estado: String,
  userId: String
})

module.exports = mongoose.model("Appointment", AppointmentSchema)