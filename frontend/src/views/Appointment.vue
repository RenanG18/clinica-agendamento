<template>

<div>

<h2>Agendar Consulta</h2>

<input v-model="patient" placeholder="Paciente"/>
<input v-model="date" type="date"/>
<input v-model="time" type="time"/>
<input v-model="cep" placeholder="CEP"/>

<button @click="schedule">Agendar</button>

</div>

</template>

<script>

import axios from "axios"

export default{

data(){
return{
patient:"",
date:"",
time:"",
cep:""
}
},

methods:{

async schedule(){

await axios.post(
"http://localhost:3000/appointments",
{
patient:this.patient,
date:this.date,
time:this.time,
cep:this.cep
}
)

alert("Consulta marcada!")

}

}

}

</script>