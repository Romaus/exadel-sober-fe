import axios from 'axios';
import config from '../../config';

export default {
    actions: {
        async loadPromiseFromServer(ctx: { commit: (arg0: string, arg1: any) => void; }, userId: any) {
            const answer = await axios.get(`${config.backendURL}/promises/?userId=${userId}`);
            const ListPromises = await answer.data;
            ctx.commit('updatePromiseList', ListPromises)
        },
        async addPromise(ctx: { commit: (arg0: string, arg1: any) => void; }, {userId, addictionId, days}: any) {
            const answer = await axios.post(`${config.backendURL}/promises`,{
                userId, 
                addictionId,
                startDate: Date.parse(new Date().toString()), 
                expiredDate: days*24*3600*1000 + Date.parse(new Date().toString())
            });
            const ListPromises = await answer.data;
            ctx.commit('updatePromiseList', ListPromises)
        },
        async addReasonForPromise(ctx: { commit: (arg0: string, arg1: any) => void; getters: { getCurrentPromise: { promiseId: any; }; }; }, {promiseId, reasonDescription}: any) {
            const answer = await axios.post(`${config.backendURL}/promises/addReason`, {promiseId, description:reasonDescription});
            const ListPromises = await answer.data;
            ctx.commit('updatePromiseList', ListPromises)
            const currPromise = ListPromises.filter((promise: { promiseId: any; }) => promise.promiseId === ctx.getters.getCurrentPromise.promiseId);
            ctx.commit('updateReasonsList', currPromise[0].reasons)
        },
        async removePromise(ctx: { commit: (arg0: string, arg1: any) => void; }, promiseId: any) {
            const answer = await axios.delete(`${config.backendURL}/promises?promiseId=${promiseId}`);
            const ListPromises = await answer.data;
            ctx.commit('updatePromiseList', ListPromises)
        },
        chooseCurrentPromise(ctx: { commit: (arg0: string, arg1: any) => void; }, currentPromise: { reasons: any; }){
            ctx.commit('setCurrentPromise', currentPromise);
            ctx.commit('setReasonsForCurrentPromise', currentPromise?.reasons)
        }
    },
    mutations: {
        updatePromiseList(state: { promises: any; }, newPromisesList: any) {
            state.promises = newPromisesList
        },
        setCurrentPromise(state: { currentPromise: any; }, currentPromise: any) {
            state.currentPromise = currentPromise
        },
        setReasonsForCurrentPromise(state: { reasonsForCurrentPromise: any; }, reasons: any) {
            state.reasonsForCurrentPromise = reasons
        },
        updateReasonsList(state: { reasonsForCurrentPromise: any; }, reasons: any) {
            state.reasonsForCurrentPromise = reasons
        }
    },
    state: {
        promises: [],
        currentPromise: [],
        reasonsForCurrentPromise:[]
    },
    getters: {
        getAllPromisesFromStore(state: { promises: any; }) {
            return state.promises
        },
        getCurrentPromise(state: { currentPromise: any; }) {
            return state.currentPromise
        },
        getCurrentPromiseName(state: { currentPromise: { name: any; }; }) {
            return state.currentPromise?.name
        },
        getReasonsForCurrentPromise(state: { reasonsForCurrentPromise: any; }) {
            return state.reasonsForCurrentPromise
        }
    }
}