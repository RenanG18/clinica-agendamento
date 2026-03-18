const fs = require("fs")

const folders = [
"controllers",
"models",
"routes",
"middleware",
"services"
]

const files = {
"controllers":["authController.js","appointmentController.js"],
"models":["User.js","Appointment.js"],
"routes":["authRoutes.js","appointmentRoutes.js"],
"middleware":["authMiddleware.js"],
"services":["cepService.js","weatherService.js"],
"":[ "server.js" ]
}

folders.forEach(folder=>{
if(!fs.existsSync(folder)){
fs.mkdirSync(folder)
}
})

for(const folder in files){

files[folder].forEach(file=>{

const path = folder ? `${folder}/${file}` : file

if(!fs.existsSync(path)){
fs.writeFileSync(path,"")
}

})

}

console.log("Estrutura criada com sucesso!")