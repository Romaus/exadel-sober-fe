import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import RegistrationPage from './components/RegistrationPage.vue'
import LoginPage from './components/LoginPage.vue'
import PersonalPage from './components/PersonalPage.vue'
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
  router,
  store,
  render: h => h(App)
}).$mount('#app')