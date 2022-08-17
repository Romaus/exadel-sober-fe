import Vue from 'vue';
import Vuex from 'vuex';
import addiction from './modules/addiction'
import user from './modules/user'
import promise from './modules/promise'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user, 
        addiction, 
        promise
    }
}) 