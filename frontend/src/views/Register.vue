<template>
  <div class="container">
    <div class="card">
      <h2>📝 Cadastro</h2>

      <input v-model="name" placeholder="Nome" />
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Senha" />

      <button @click="register">Cadastrar</button>

      <p class="link">
        Já tem conta?
        <router-link to="/">Fazer login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import api from "../services/api"

export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    }
  },

  methods: {
    async register() {
      try {
        if (!this.name || !this.email || !this.password) {
          alert("Preencha todos os campos!")
          return
        }

        await api.post("/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password
        })

        alert("Cadastro realizado com sucesso!")

        // ✅ CORRETO
        this.$router.push("/")

      } catch (error) {
        console.error("Erro no cadastro:", error)
        alert("Erro ao cadastrar usuário")
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

h2 {
  margin-bottom: 20px;
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
  font-size: 14px;
}

a {
  color: #2c7be5;
  text-decoration: none;
  font-weight: bold;
}
</style>