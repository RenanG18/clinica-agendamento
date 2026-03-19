require("dotenv").config()


const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const appointmentRoutes = require("./routes/appointmentRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/appointments", appointmentRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Banco conectado"))
.catch(err => console.log("Erro no banco:", err))

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})