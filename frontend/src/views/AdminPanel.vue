<template>
  <div>
    <h2>Painel Administrativo</h2>

    <button @click="buscarConsultas">Carregar Consultas</button>

    <ul>
      <li v-for="c in consultas" :key="c._id">
        {{ c.patient }} - {{ c.date }} - {{ c.time }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../services/api"

export default {
  data() {
    return {
      consultas: []
    }
  },
  methods: {
    async buscarConsultas() {
      const token = localStorage.getItem("token")

      const res = await api.get("/appointments", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      this.consultas = res.data
    }
  }
}
</script>