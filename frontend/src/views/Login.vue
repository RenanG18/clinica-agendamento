<template>
  <div class="container">
    <div class="card">
      <h2>Login</h2>

      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Senha" />

      <button @click="login">Entrar</button>

      <p class="link">
        Não tem conta?
        <router-link to="/register">Cadastrar</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import api from "../services/api"

export default {
  data() {
    return {
      email: "",
      password: ""
    }
  },

  methods: {
    async login() {
      try {
        const res = await api.post("/auth/login", {
          email: this.email,
          password: this.password
        })

        console.log("RESPOSTA BACKEND:", res.data)

        
        localStorage.setItem("token", res.data.token)

        alert("Login realizado com sucesso!")

        
        this.$router.push("/appointment")

      } catch (error) {
        console.error("ERRO COMPLETO:", error)

        if (error.response && error.response.data.message) {
          alert(error.response.data.message)
        } else {
          alert("Erro ao fazer login")
        }
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.card {
  width: 320px;
  padding: 25px;
  border-radius: 12px;
  background: #f4f6f8;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  text-align: center;
}

input {
  width: 100%;
  margin-bottom: 12px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background: #2c7be5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #1a5edb;
}

.link {
  margin-top: 15px;
}
</style>