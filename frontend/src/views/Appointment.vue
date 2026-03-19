<template>
  <div class="container">
    <div class="card">
      <h2>Agendar Consulta</h2>

      <input v-model="patient" placeholder="Nome do paciente" />

      <input 
        v-model="date" 
        type="date" 
        @change="carregarHorarios(); verificarClima()" 
      />

      
      <select v-model="time">
        <option disabled value="">Selecione um horário</option>

        <option
          v-for="h in horariosFixos"
          :key="h"
          :value="h"
          :disabled="horariosOcupados.includes(h)"
        >
          {{ h }} {{ horariosOcupados.includes(h) ? '(Ocupado)' : '' }}
        </option>
      </select>

      <input v-model="cep" placeholder="CEP" @blur="buscarCEP" />

      <input v-model="logradouro" placeholder="Rua" disabled />
      <input v-model="cidade" placeholder="Cidade" disabled />
      <input v-model="estado" placeholder="Estado" disabled />

      
      <div v-if="climaCarregado">
        <p v-if="vaiChover" class="alerta">
           Atenção: previsão de chuva no dia!
        </p>
        <p v-else class="ok">
           Clima favorável
        </p>
      </div>

      <button @click="agendar">Agendar Consulta</button>
    </div>
  </div>
</template>

<script>
import api from "../services/api"

export default {
  data() {
    return {
      patient: "",
      date: "",
      time: "",
      cep: "",
      logradouro: "",
      cidade: "",
      estado: "",

      
      vaiChover: false,
      climaCarregado: false,

      
      horariosFixos: [
        "08:00","09:00","10:00","11:00",
        "14:00","15:00","16:00","17:00"
      ],
      horariosOcupados: []
    }
  },

  methods: {

    
    async buscarCEP() {
      if (this.cep.length < 8) return

      try {
        const res = await fetch(`https://viacep.com.br/ws/${this.cep}/json/`)
        const data = await res.json()

        this.logradouro = data.logradouro
        this.cidade = data.localidade
        this.estado = data.uf

        this.verificarClima()

      } catch (error) {
        console.error("Erro CEP:", error)
      }
    },

    
    async verificarClima() {
      if (!this.cidade || !this.date) return

      try {
        const API_KEY = "06497a16064c6278a7341697ddd522f6"

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${this.cidade}&appid=${API_KEY}&units=metric&lang=pt_br`
        )

        const data = await res.json()

        if (data.cod !== "200") return

        const previsoesDoDia = data.list.filter(item =>
          item.dt_txt.startsWith(this.date)
        )

        const temChuva = previsoesDoDia.some(item =>
          item.weather[0].main === "Rain"
        )

        this.vaiChover = temChuva
        this.climaCarregado = true

      } catch (error) {
        console.error("Erro clima:", error)
      }
    },

    
    async carregarHorarios() {
      if (!this.date) return

      try {
        const token = localStorage.getItem("token")

        const res = await api.get(`/appointments/available/${this.date}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        this.horariosOcupados = res.data

      } catch (error) {
        console.error("Erro horários:", error)
      }
    },

    
    async agendar() {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          alert("Você precisa estar logado!")
          return
        }

        if (!this.time) {
          alert("Selecione um horário!")
          return
        }

        
        if (this.horariosOcupados.includes(this.time)) {
          alert("Esse horário já está ocupado!")
          return
        }

        await api.post("/appointments", {
          patient: this.patient,
          date: this.date,
          time: this.time,
          cep: this.cep,
          logradouro: this.logradouro,
          cidade: this.cidade,
          estado: this.estado
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        alert("Consulta agendada com sucesso!")

        
        this.carregarHorarios()

      } catch (error) {
        console.error("Erro completo:", error)

        
        if (error.response && error.response.data.message) {
          alert(error.response.data.message)
        } else {
          alert("Erro ao agendar consulta!")
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
  margin-top: 40px;
}

.card {
  width: 340px;
  padding: 20px;
  border-radius: 12px;
  background: #f4f6f8;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  text-align: center;
}

input, select {
  width: 100%;
  margin-bottom: 10px;
  padding: 9px;
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

.alerta {
  color: red;
  font-weight: bold;
}

.ok {
  color: green;
  font-weight: bold;
}
</style>