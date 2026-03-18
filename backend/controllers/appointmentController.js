const Appointment = require("../models/Appointment")
const {getAddress} = require("../services/cepService")

exports.create = async (req,res)=>{

const {patient,date,time,cep} = req.body

const addressData = await getAddress(cep)

const appointment = new Appointment({
patient,
date,
time,
cep,
address:addressData.logradouro
})

await appointment.save()

res.json(appointment)

}