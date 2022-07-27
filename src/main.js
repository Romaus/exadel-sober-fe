import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueRouter from 'vue-router'
import RegistrationPage from './components/RegistrationPage'
import LoginPage from './components/LoginPage'
import PersonalPage from './components/PersonalPage'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: "/registration",
      component: RegistrationPage
    },
    {
      path: "/login",
      component: LoginPage
    },
    {
      path: "/personal/:userName",
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
  render: h => h(App)
}).$mount('#app')