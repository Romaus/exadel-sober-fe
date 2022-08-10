<template>
    <v-container class="d-flex justify-space-between">
        <v-card class="pa-4" max-width="900" min-width="900" tile>
            <v-list-item 
                v-for="promise in getAllPromisesFromStore" 
                :key="promise.user_id"
                two-line>
                <v-list-item-content>
                    <v-list-item-title>{{ promise.name }} to {{ new Date(promise.expiredDate) }}</v-list-item-title>
                </v-list-item-content>
                <v-btn 
                    color="primary" 
                    dark 
                    @click="showReasons(promise)">
                        Show reasons
                </v-btn>
                <v-btn 
                    color="primary" 
                    dark 
                    @click="deletePromise(promise)">
                        Delete
                </v-btn>
            </v-list-item>
        </v-card>
    </v-container>
</template>
<script >
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Promise-List',
    components: {

    },
    computed: mapGetters(
        ['getAllPromisesFromStore',]),
    data: () => ({
    }),
    methods: {
        ...mapActions(
            ['removePromise',
            'chooseCurrentPromise',
            'showDialog']),
        async deletePromise(promise) {
            this.removePromise(promise.promiseId)
        },
        async showReasons(promise) {
            await this.chooseCurrentPromise(promise);
            this.showDialog();
        },
    }
}
</script>