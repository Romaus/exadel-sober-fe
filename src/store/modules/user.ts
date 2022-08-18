import axios from 'axios';
import config from '../../config';
import { User } from '@/types';

export default {
    actions: {
        async login(ctx: { commit: (arg0: string, arg1: any) => void; }, { email, password}: User) {
            const answer = await axios.post(`${config.backendURL}/user/login`, { email: email, password: password });
            const user: User = await answer.data;
            ctx.commit('setCurrentUser', user)
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
        setCurrentUser(state: { currentUser: User; }, currentUser: User): void {
            state.currentUser = currentUser
        },
        setStateDialog(state: { stateDialog: boolean; }, show: boolean): void {
            state.stateDialog = show
        }
    },
    state: {
        currentUser: {} as User,
        stateDialog: false as boolean
    },
    getters: {
        getUser(state: { currentUser: User; }): User {
            return state.currentUser
        },
        getUserName(state: { currentUser: { name: string; }; }): string {
            return state.currentUser?.name
        },
        getUserId(state: { currentUser: { userId: number; }; }): number {
            return state.currentUser.userId
        },
        getDialogState(state: { stateDialog: boolean; }): boolean {
            return state.stateDialog
        }
    }
}