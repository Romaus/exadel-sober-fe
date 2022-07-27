<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mb-5" cols="12">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

                    <v-text-field v-model="password" :rules="passwordRules" label="Password" required></v-text-field>

                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
                        Login
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script >
import axios from 'axios';
export default {
    name: 'Login-Page',
    data: () => ({
        valid: false,
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length <= 10) || 'Password must be less than 10 characters',
        ],

    }),
    methods: {
        login() {
            this.$refs.form.validate();
            this.registration();
        },
        async registration() {
            const answer = axios.post(`http://localhost:8080/user/login`, { name: this.name, password: this.password });
            answer.then(text => {
                if (text.data !== "credential invalid") {
                    this.$router.push(`/personal/${text.data}`)
                }
                else {
                    console.log("credential invalid")
                }
            }
            )
        }
    },
}
</script>