<template>
    <div>
        <user-addictions-form></user-addictions-form>
        <user-addictions-list></user-addictions-list>
    </div>
</template>
<script lang="ts">
import UserAddictionsForm from './UserAddictionsForm.vue'
import UserAddictionsList from './UserAddictionsList.vue'
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