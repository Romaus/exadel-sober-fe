import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueRouter from 'vue-router'
import RegistrationPage from './components/RegistrationPage'
import LoginPage from './components/LoginPage'
import PersonalPage from './components/PersonalPage'
import store from './store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: "/registration",
      component: RegistrationPage
    },
    {
      path: "/login",
      component: LoginPage
    },
    {
      path: "/personal/:userId",
      component: PersonalPage
    }

  ],
  mode: "history"
})

export default router

Vue.config.productionTip = false

new Vue({
  vuetify,
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')