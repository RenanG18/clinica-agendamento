const express = require("express")
const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")
const Appointment = require("../models/Appointment")

// CRIAR CONSULTA
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { patient, date, time, cep, logradouro, cidade, estado } = req.body

    if (!patient || !date || !time) {
      return res.status(400).json({ message: "Preencha todos os campos" })
    }

    const existe = await Appointment.findOne({ date, time })

    if (existe) {
      return res.status(400).json({ message: "Horário já está ocupado" })
    }

    const nova = new Appointment({
      patient,
      date,
      time,
      cep,
      logradouro,
      cidade,
      estado,
      userId: req.user.id
    })

    await nova.save()

    res.json({ message: "Consulta criada com sucesso" })

  } catch (error) {
    res.status(500).json({ message: "Erro ao criar consulta" })
  }
})

// LISTAR CONSULTAS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const consultas = await Appointment.find({ userId: req.user.id })
    res.json(consultas)

  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar consultas" })
  }
})

// HORÁRIOS OCUPADOS
router.get("/available/:date", authMiddleware, async (req, res) => {
  try {
    const consultas = await Appointment.find({ date: req.params.date })
    const horarios = consultas.map(c => c.time)

    res.json(horarios)

  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar horários" })
  }
})

module.exports = router