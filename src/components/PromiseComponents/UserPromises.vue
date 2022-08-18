<template>
    <div>
        <user-promises-form></user-promises-form>
        <user-promises-list></user-promises-list>
    </div>
</template>
<script lang="ts">
import userPromisesForm from './UserPromisesForm.vue'
import userPromisesList from './UserPromisesList.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Promises-Page',
    components: {
        userPromisesForm,
        userPromisesList
    },
    computed: mapGetters(
        ['getUserId']),
    data: () => ({
    }),
    methods: {
        ...mapActions(
            ['loadPromiseFromServer']),
        async loadPromisesToStore() {
            const userId = this.getUserId ? this.getUserId : this.$route.params.userId;
            await this.loadPromiseFromServer(userId)
        },
    },
    mounted() {
        this.loadPromisesToStore();
    }
}
</script>