<template>
    <div>
        <user-promises-form></user-promises-form>
        <user-promises-list></user-promises-list>
    </div>
</template>
<script >
import userPromisesForm from './UserPromisesForm'
import userPromisesList from './UserPromisesList'
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