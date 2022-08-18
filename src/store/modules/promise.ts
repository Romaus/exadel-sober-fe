import axios from 'axios';
import config from '../../config';
import { Reason, Promise } from '@/types';

export default {
    actions: {
        async loadPromiseFromServer(ctx: { commit: (arg0: string, arg1: any) => void; }, userId: string) {
            const answer = await axios.get(`${config.backendURL}/promises/?userId=${userId}`);
            const ListPromises = await answer.data;
            ctx.commit('updatePromiseList', ListPromises)
        },
        async addPromise(ctx: { commit: (arg0: string, arg1: any) => void; }, newPromise: Promise) {
            const answer = await axios.post(`${config.backendURL}/promises`, newPromise);
            const ListPromises: Promise[] = await answer.data;
            ctx.commit('updatePromiseList', ListPromises)
        },
        async addReasonForPromise(
                ctx: { 
                    commit: (arg0: string, arg1: any) => void; 
                    getters: { getCurrentPromise: { promiseId: number; }; }; 
                    }, newReason: Reason) {
            const answer = await axios.post(`${config.backendURL}/promises/addReason`, newReason);
            const ListPromises: Promise[] = await answer.data;
            ctx.commit('updatePromiseList', ListPromises)
            const currPromises: Promise[] = ListPromises.filter((promise: { promiseId: number; }) => promise.promiseId === ctx.getters.getCurrentPromise.promiseId);
            ctx.commit('updateReasonsList', currPromises[0].reasons)
        },
        async removePromise(ctx: { commit: (arg0: string, arg1: any) => void; }, promiseId: number) {
            const answer = await axios.delete(`${config.backendURL}/promises?promiseId=${promiseId}`);
            const ListPromises: Promise[] = await answer.data;
            ctx.commit('updatePromiseList', ListPromises)
        },
        chooseCurrentPromise(ctx: { commit: (arg0: string, arg1: any) => void; }, currentPromise: { reasons: Reason[]; }){
            ctx.commit('setCurrentPromise', currentPromise);
            ctx.commit('setReasonsForCurrentPromise', currentPromise?.reasons)
        }
    },
    mutations: {
        updatePromiseList(state: { promises: Promise[]; }, newPromisesList: Promise[]) {
            state.promises = newPromisesList
        },
        setCurrentPromise(state: { currentPromise: Promise; }, currentPromise: Promise) {
            state.currentPromise = currentPromise
        },
        setReasonsForCurrentPromise(state: { reasonsForCurrentPromise: Reason[]; }, reasons: Reason[]) {
            state.reasonsForCurrentPromise = reasons
        },
        updateReasonsList(state: { reasonsForCurrentPromise: Reason[]; }, reasons: Reason[]) {
            state.reasonsForCurrentPromise = reasons
        }
    },
    state: {
        promises: [] as Promise[],
        currentPromise: {} as Promise,
        reasonsForCurrentPromise:[] as Reason[]
    },
    getters: {
        getAllPromisesFromStore(state: { promises: Promise[]; }): Promise[] {
            return state.promises
        },
        getCurrentPromise(state: { currentPromise: Promise; }): Promise {
            return state.currentPromise
        },
        getCurrentPromiseName(state: { currentPromise: { name: string; }; }): string {
            return state.currentPromise?.name
        },
        getReasonsForCurrentPromise(state: { reasonsForCurrentPromise: Reason[]; }): Reason[] {
            return state.reasonsForCurrentPromise
        }
    }
}