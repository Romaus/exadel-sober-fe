import axios from 'axios';
import config from '../../config';

export default {
    actions: {
        async loadPromiseFromServer(ctx, userId) {
            const answer = await axios.get(`${config.backendURL}/promises/?userId=${userId}`);
            const ListPromises = await answer.data;
            ctx.commit('updatePromiseList', ListPromises)
        },
        async addPromise(ctx, {userId, addictionId, days}) {
            const answer = await axios.post(`${config.backendURL}/promises`,{
                userId, 
                addictionId,
                startDate: Date.parse(new Date()), 
                expiredDate: days*24*3600*1000 + Date.parse(new Date())
            });
            const ListPromises = await answer.data;
            ctx.commit('updatePromiseList', ListPromises)
        },
        async addReasonForPromise(ctx, {promiseId, reasonDescription}) {
            const answer = await axios.post(`${config.backendURL}/promises/addReason`, {promiseId, description:reasonDescription});
            const ListPromises = await answer.data;
            ctx.commit('updatePromiseList', ListPromises)
            const currPromise = ListPromises.filter(promise => promise.promiseId === this.getters.getCurrentPromise.promiseId);
            ctx.commit('updateReasonsList', currPromise[0].reasons)
        },
        async removePromise(ctx, promiseId) {
            const answer = await axios.delete(`${config.backendURL}/promises?promiseId=${promiseId}`);
            const ListPromises = await answer.data;
            ctx.commit('updatePromiseList', ListPromises)
        },
        chooseCurrentPromise(ctx, currentPromise){
            ctx.commit('setCurrentPromise', currentPromise);
            ctx.commit('setReasonsForCurrentPromise', currentPromise?.reasons)
        }
    },
    mutations: {
        updatePromiseList(state, newPromisesList) {
            state.promises = newPromisesList
        },
        setCurrentPromise(state, currentPromise) {
            state.currentPromise = currentPromise
        },
        setReasonsForCurrentPromise(state, reasons) {
            state.reasonsForCurrentPromise = reasons
        },
        updateReasonsList(state, reasons) {
            state.reasonsForCurrentPromise = reasons
        }
    },
    state: {
        promises: [],
        currentPromise: [],
        reasonsForCurrentPromise:[]
    },
    getters: {
        getAllPromisesFromStore(state) {
            return state.promises
        },
        getCurrentPromise(state) {
            return state.currentPromise
        },
        getCurrentPromiseName(state) {
            return state.currentPromise?.name
        },
        getReasonsForCurrentPromise(state) {
            return state.reasonsForCurrentPromise
        }
    }
}