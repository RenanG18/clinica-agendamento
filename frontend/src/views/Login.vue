<template>

<div>

<h2>Login</h2>

<input v-model="email" placeholder="Email"/>
<input v-model="password" type="password"/>

<button @click="login">Entrar</button>

</div>

</template>

<script>

import axios from "axios"

export default{

data(){
return{
email:"",
password:""
}
},

methods:{

async login(){

const response = await axios.post(
"http://localhost:3000/auth/login",
{
email:this.email,
password:this.password
}
)

localStorage.setItem("token",response.data.token)

}

}

}

</script>