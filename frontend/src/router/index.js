import { createRouter, createWebHistory } from "vue-router"

import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Appointment from "../views/Appointment.vue"
import AdminPanel from "../views/AdminPanel.vue"

const routes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/appointment", component: Appointment },
  { path: "/admin", component: AdminPanel }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router