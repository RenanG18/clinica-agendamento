const axios = require("axios")

exports.getAddress = async (cep)=>{

const response = await axios.get(
`https://viacep.com.br/ws/${cep}/json/`
)

return response.data

}