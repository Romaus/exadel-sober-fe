<template>
    <v-container>
        Welcome {{ this.$route.params.userName }}
        <v-container class="px-0" fluid>
            <v-switch v-model="switchAddictionPromises"
                :label="`${switchAddictionPromises ? 'Addiction' : 'Promises'}`">
            </v-switch>
        </v-container>
        <template v-if="this.switchAddictionPromises">
            <v-col class="d-flex justify-space-around" cols="12">
                <v-container class="pa-2">
                    <v-text-field v-model="name" label="name" required></v-text-field>
                    <v-text-field v-model="description" label="description" required></v-text-field>
                    <v-btn color="success" class="mr-4" :disabled="!name || !description" @click="addNewAddiction">
                        Add new Addiction
                    </v-btn>
                </v-container>
                <v-container class="pa-6">
                    <v-card max-width="400" tile>
                        <v-list-item two-line v-for="a in addictions" :key="a.id">
                            <v-list-item-content>
                                <v-list-item-title>{{ a.name }}</v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ a.description }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-container>
            </v-col>
        </template>
        <template v-if="!this.switchAddictionPromises">
            <v-container class="d-flex justify-space-between">
                <v-card class="pa-4" max-width="900" tile>
                    <v-list-item two-line v-for="p in promises" :key="p.user_id">
                        <v-list-item-content>
                            <v-list-item-title>{{ p.name }} to {{ new Date(p.expiredDate) }}</v-list-item-title>
                            <v-list-item-subtitle>
                                {{ p.description }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-btn color="primary" dark @click="loadReasons(p)">
                            Show reasons
                        </v-btn>
                        <v-btn color="primary" dark @click="deletePromise(p)">
                            Delete
                        </v-btn>
                    </v-list-item>
                </v-card>
                <v-container class="pa-2">
                    <v-select v-model="addiction" :hint="`${addiction.description}`" :items="addictions"
                        item-text="name" item-value="id" return-object single-line filled label="Choose addiction">
                    </v-select>
                    <v-text-field type="number" v-model="days" label="days" required></v-text-field>
                    <v-btn color="success" class="mr-4" :disabled="!addiction || !days" @click="addNewPromise">
                        Add new Promise
                    </v-btn>
                </v-container>
            </v-container>
        </template>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Reasons for {{ promise.name }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                    </v-container>
                    <v-text-field v-model="reasonDescription" label="Description" required></v-text-field>
                    <v-btn color="success" class="mr-4" :disabled="!reasonDescription" @click="addNewReason()">
                        Add new Reason
                    </v-btn>
                    <v-list-item one-line v-for="r in reasons" :key="r.promise_id">
                        <v-list-item-content>
                            <v-list-item-title>{{ r.description }} </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = closeReasonsDialog()">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script >
import axios from 'axios';
export default {
    name: 'Personal-Page',
    data: () => ({
        addictions: [],
        addiction: "",
        promises: [],
        promise: "",
        reasons: [],
        reasonDescription: "",
        name: '',
        description: '',
        days: "",
        dialog: false,
        switchAddictionPromises: false,
    }),
    methods: {
        async loadAddictions() {
            const answer = axios.get(`http://localhost:8080/addiction/all`);
            answer.then(body => {
                this.addictions = body.data;
            }
            )
        },
        async loadPromises() {
            const answer = axios.get(`http://localhost:8080/user/getPromises?userName=${this.$route.params.userName}`);
            answer.then(body => {
                this.promises = body.data;
            }
            )
        },
        async addNewAddiction() {
            const answer = axios.post(`http://localhost:8080/addiction/add`, { name: this.name, description: this.description });
            answer.then(body => {
                this.addictions = body.data;
            }
            )
            this.name = '';
            this.description = '';
        },
        async addNewPromise() {
            const answer = axios.post(`http://localhost:8080/user/addPromise?userName=${this.$route.params.userName}&addiction_id=${this.addiction.addictionId}&days=${this.days}`);
            answer.then(body => {
                this.promises = body.data;
            }
            )
            this.addiction = '';
            this.days = '';
        },
        async deletePromise(promise) {
            const answer = axios.post(`http://localhost:8080/promise/deletePromise?userName=${this.$route.params.userName}&promiseId=${promise.promiseId}`);
            answer.then(body => {
                this.promises = body.data;
            }
            )
            this.addiction = '';
            this.days = '';
        },
        async loadReasons(promise) {
            const answer = axios.get(`http://localhost:8080/reason/getReasons?promiseId=${promise.promiseId}`);
            answer.then(body => {
                this.reasons = body.data;
            }
            )
            this.promise = promise;
            console.log(this.promise)
            this.dialog = true
        },

        async addNewReason() {
            const answer = axios.post(`http://localhost:8080/reason/addReason?promiseId=${this.promise.promiseId}&description=${this.reasonDescription}`);
            answer.then(body => {
                this.reasons = body.data;
            }
            )
            this.reasonDescription = '';
        },

        closeReasonsDialog() {
            this.promise = "";
            this.reasons = [];
            this.dialog = false;
        }
    },
    mounted() {
        this.loadAddictions();
        this.loadPromises();
    }
}
</script>