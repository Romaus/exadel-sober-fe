import axios from 'axios';

const backendURL =  "http://localhost:8080";

export default {
    actions: {
        async loadAddictionsFromServer(ctx) {
            const answer = await axios.get(`${backendURL}/addictions`);
            const ListAddiction = await answer.data;
            ctx.commit('updateAddictionList', ListAddiction)
        },
        async addAddiction(ctx, {name, description}) {
            const answer = await axios.post(`${backendURL}/addictions`, { name, description });
            const ListAddiction = await answer.data;
            ctx.commit('updateAddictionList', ListAddiction)
        }
    },
    mutations: {
        updateAddictionList(state, newAddictionsList) {
            state.addictions = newAddictionsList
        }
    },
    state: {
        addictions: []
    },
    getters: {
        getAllAddictionsFromStore(state) {
            return state.addictions
        }
    }
}