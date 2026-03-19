const express = require("express")
const router = express.Router()

const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" })
    }

   
    const userExistente = await User.findOne({ email: email.toLowerCase() })

    if (userExistente) {
      return res.status(400).json({ message: "Usuário já existe" })
    }

    
    const senhaCriptografada = await bcrypt.hash(password, 10)

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: senhaCriptografada
    })

    await user.save()

    res.status(201).json({ message: "Usuário criado com sucesso" })

  } catch (error) {
    console.error("Erro no cadastro:", error)
    res.status(500).json({ message: "Erro no cadastro" })
  }
})



router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    
    if (!email || !password) {
      return res.status(400).json({ message: "Preencha email e senha" })
    }

    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" })
    }

    let senhaValida = false

    
    if (user.password.startsWith("$2b$")) {
      senhaValida = await bcrypt.compare(password, user.password)
    } else {
      senhaValida = password === user.password
    }

    if (!senhaValida) {
      return res.status(400).json({ message: "Senha inválida" })
    }

    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({
      message: "Login realizado com sucesso",
      token
    })

  } catch (error) {
    console.error("Erro no login:", error)
    res.status(500).json({ message: "Erro no login" })
  }
})

module.exports = router