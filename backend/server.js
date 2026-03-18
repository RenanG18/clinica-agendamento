const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(
"mongodb://renangsrodrigues_db_user:7gsZ1FasKV7NpS2o@ac-jgqqshb-shard-00-00.mrcssvx.mongodb.net:27017,ac-jgqqshb-shard-00-01.mrcssvx.mongodb.net:27017,ac-jgqqshb-shard-00-02.mrcssvx.mongodb.net:27017/?ssl=true&replicaSet=atlas-13innz-shard-0&authSource=admin&appName=Cluster0"
)
.then(()=>console.log("Banco conectado"))
.catch(err=>console.log("Erro no banco:",err))

app.listen(3000,()=>{
console.log("Servidor rodando na porta 3000")
})