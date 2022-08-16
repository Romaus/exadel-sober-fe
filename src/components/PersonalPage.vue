<template>
    <v-container>
        Welcome {{ getUserName }}
        <v-btn color="primary" dark @click="quit()">
            Log Out
        </v-btn>
        <v-container class="px-0" fluid>
            <v-switch 
                v-model="switchAddictionPromises"
                :label="`${switchAddictionPromises ? 'Addiction' : 'Promises'}`">
            </v-switch>
        </v-container>
        <user-addictions 
            v-if="switchAddictionPromises">
        </user-addictions>
        <user-promises 
            v-if="!switchAddictionPromises">
        </user-promises>
        <v-dialog 
            v-model="getDialogState" 
            persistent 
            max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Reasons for {{ getCurrentPromiseName }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                    </v-container>
                    <v-text-field 
                        v-model="reasonDescription" 
                        label="Description" 
                        required>
                    </v-text-field>
                    <v-btn 
                        color="success" 
                        class="mr-4" 
                        :disabled="!reasonDescription" 
                        @click="addNewReason()">
                            Add new Reason
                    </v-btn>
                    <v-list-item 
                        v-for="reason in getReasonsForCurrentPromise" 
                        :key="reason.promise_id"
                        one-line>
                        <v-list-item-content>
                            <v-list-item-title>{{ reason.description }} </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        color="blue darken-1" 
                        text 
                        @click="dialog = closeReasonsDialog()">
                            Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script >
import { mapGetters, mapActions } from 'vuex'
import UserAddictions from './AddictionComponents/UserAddictions'
import UserPromises from './PromiseComponents/UserPromises'
export default {
    name: 'Personal-Page',
    components: {
        UserAddictions,
        UserPromises
    },
    computed: mapGetters(
        ['getUser',
            'getUserName',
            'getCurrentPromise',
            'getCurrentPromiseName',
            'getReasonsForCurrentPromise',
            'getDialogState']),
    data: () => ({
        reasonDescription: "",
        switchAddictionPromises: true,
    }),
    methods: {
        ...mapActions(
            ['addReasonForPromise',
                'chooseCurrentPromise',
                'logout',
                'hideDialog']),
        async addNewReason() {
            await this.addReasonForPromise({
                promiseId: this.getCurrentPromise.promiseId,
                reasonDescription: this.reasonDescription
            })
            this.reasonDescription = '';
        },
        async closeReasonsDialog() {
            await this.chooseCurrentPromise(null);
            this.hideDialog()
        },
        checkLogin() {
            if (!this.getUser) { this.$router.push(`/login`) }
        },
        async quit() {
            await this.logout();
            this.checkLogin();
        }
    },
    mounted() {
        this.checkLogin();
    }
}
</script>