<template>
    <div>
        <user-addictions-form></user-addictions-form>
        <user-addictions-list></user-addictions-list>
    </div>
</template>
<script >
import UserAddictionsForm from './UserAddictionsForm'
import UserAddictionsList from './UserAddictionsList'
import { mapActions } from 'vuex'
export default {
    name: 'Addiction-Page',
    components: {
        UserAddictionsForm,
        UserAddictionsList
    },
    data: () => ({
    }),
    methods: {
        ...mapActions(
            ['loadAddictionsFromServer']),
        async loadAddictionsToStore() {
            await this.loadAddictionsFromServer()
        }
    },
    mounted() {
        this.loadAddictionsToStore();
    }
}
</script>