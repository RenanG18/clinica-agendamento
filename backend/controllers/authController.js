const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req,res)=>{

const {name,email,password,role} = req.body

const hash = await bcrypt.hash(password,10)

const user = new User({
name,
email,
password:hash,
role
})

await user.save()

res.json(user)

}
exports.login = async (req,res)=>{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user){
return res.status(400).json("Usuário não encontrado")
}

const valid = await bcrypt.compare(password,user.password)

if(!valid){
return res.status(400).json("Senha inválida")
}

const token = jwt.sign(
{ id:user._id },
"segredo",
{ expiresIn:"1d"}
)

res.json({token})

}