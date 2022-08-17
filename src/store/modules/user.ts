import axios from 'axios';
import config from '../../config';

export default {
    actions: {
        async login(ctx: { commit: (arg0: string, arg1: any) => void; }, {email, password}: any) {
            const answer = await axios.post(`${config.backendURL}/user/login`, { email: email, password: password });
            const data = await answer.data;
            ctx.commit('setCurrentUser', data)
        },
        async logout(ctx: { commit: (arg0: string, arg1: null) => void; }) {
            ctx.commit('setCurrentUser', null)
        },
        showDialog(ctx: { commit: (arg0: string, arg1: boolean) => void; }) {
            ctx.commit('setStateDialog', true)
        },
        hideDialog(ctx: { commit: (arg0: string, arg1: boolean) => void; }) {
            ctx.commit('setStateDialog', false)
        }
    },
    mutations: {
        setCurrentUser(state: { currentUser: any; }, currentUser: any) {
            state.currentUser = currentUser
        },
        setStateDialog(state: { stateDialog: any; }, show: any) {
            state.stateDialog = show
        }
    },
    state: {
        currentUser: null,
        stateDialog: false
    },
    getters: {
        getUser(state: { currentUser: any; }) {
            return state.currentUser
        },
        getUserName(state: { currentUser: { name: any; }; }) {
            return state.currentUser?.name
        },
        getUserId(state: { currentUser: { userId: any; }; }) {
            return state.currentUser.userId
        },
        getDialogState(state: { stateDialog: any; }) {
            return state.stateDialog
        }
    }
}