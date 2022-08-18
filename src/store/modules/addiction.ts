import axios from 'axios';
import config from '../../config';
import { Addiction } from '@/types';

export default {
    actions: {
        async loadAddictionsFromServer(ctx: { commit: (arg0: string, arg1: any) => void; }) {
            const answer = await axios.get(`${config.backendURL}/addictions`);
            const ListAddiction = await answer.data;
            ctx.commit('updateAddictionList', ListAddiction)
        },
        async addAddiction(ctx: { commit: (arg0: string, arg1: any) => void; }, newAddiction: Addiction) {
            const answer = await axios.post(`${config.backendURL}/addictions`, newAddiction);
            const ListAddiction = await answer.data;
            ctx.commit('updateAddictionList', ListAddiction)
        }
    },
    mutations: {
        updateAddictionList(state: { addictions: Addiction[]; }, newAddictionsList: Addiction[]) {
            state.addictions = newAddictionsList
        }
    },
    state: {
        addictions: [] as Addiction[]
    },
    getters: {
        getAllAddictionsFromStore(state: { addictions: Addiction[]; }): Addiction[] {
            return state.addictions
        }
    }
}