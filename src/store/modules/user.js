import axios from 'axios';
import config from '../../config';

export default {
    actions: {
        async login(ctx, {email, password}) {
            const answer = await axios.post(`${config.backendURL}/user/login`, { email: email, password: password });
            const data = await answer.data;
            ctx.commit('setCurrentUser', data)
        },
        async logout(ctx) {
            ctx.commit('setCurrentUser', null)
        },
        showDialog(ctx) {
            ctx.commit('setStateDialog', true)
        },
        hideDialog(ctx) {
            ctx.commit('setStateDialog', false)
        }
    },
    mutations: {
        setCurrentUser(state, currentUser) {
            state.currentUser = currentUser
        },
        setStateDialog(state, show) {
            state.stateDialog = show
        }
    },
    state: {
        currentUser: null,
        stateDialog: false
    },
    getters: {
        getUser(state) {
            return state.currentUser
        },
        getUserName(state) {
            return state.currentUser?.name
        },
        getUserId(state) {
            return state.currentUser.userId
        },
        getDialogState(state) {
            return state.stateDialog
        }
    }
}