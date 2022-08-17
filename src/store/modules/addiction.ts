import axios from 'axios';
import config from '../../config';

export default {
    actions: {
        async loadAddictionsFromServer(ctx: { commit: (arg0: string, arg1: any) => void; }) {
            const answer = await axios.get(`${config.backendURL}/addictions`);
            const ListAddiction = await answer.data;
            ctx.commit('updateAddictionList', ListAddiction)
        },
        async addAddiction(ctx: { commit: (arg0: string, arg1: any) => void; }, {name, description}: any) {
            const answer = await axios.post(`${config.backendURL}/addictions`, { name, description });
            const ListAddiction = await answer.data;
            ctx.commit('updateAddictionList', ListAddiction)
        }
    },
    mutations: {
        updateAddictionList(state: { addictions: any; }, newAddictionsList: any) {
            state.addictions = newAddictionsList
        }
    },
    state: {
        addictions: []
    },
    getters: {
        getAllAddictionsFromStore(state: { addictions: any; }) {
            return state.addictions
        }
    }
}