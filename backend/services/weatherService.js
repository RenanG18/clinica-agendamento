const axios = require("axios")

exports.getWeather = async (city)=>{

const key = "52a73cfe1093cc1f472f6f80a15349b0"

const response = await axios.get(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
)

return response.data

}