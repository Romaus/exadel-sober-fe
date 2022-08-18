<template>
    <v-container>
        <v-row class="text-right">
            <v-alert type="error" dismissible v-model="alert">
                    {{this.ErrorMessage}}
            </v-alert>
        </v-row>
        <v-row class="text-center">
            <v-col class="mb-5" cols="12">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field 
                        v-model="email" 
                        :rules="emailRules" 
                        label="E-mail" required>
                    </v-text-field>
                    <v-text-field 
                        v-model="password" 
                        :rules="passwordRules" 
                        label="Password" 
                        required></v-text-field>
                    <v-btn  
                        color="success" 
                        class="mr-4" 
                        @click="registration">
                            Registration
                    </v-btn>
                    <v-btn 
                        :disabled="!valid" 
                        color="success" 
                        class="mr-4" 
                        @click="authentification">
                            Login
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import config from '@/config';
export default {
    name: 'Login-Page',
    computed: mapGetters(['getUser', 'getUserName', 'getUserId']),
    data: () => ({
        alert: false,
        ErrorMessage: '',
        valid: false,
        email: '',
        emailRules: [
            v => !!v || config.validateErrors.required.email,
            v => /.+@.+\..+/.test(v) || config.validateErrors.valid.email,
        ],
        password: '',
        passwordRules: [
            v => !!v || config.validateErrors.required.password
        ],

    }),
    methods: {
        ...mapActions(['login']),
        async authentification() {
            this.$refs.form.validate();
            await this.login({
                email: this.email,
                password: this.password
            })
            this.$router.push(`/personal/${this.getUserId}`)
        },
        registration() {
            this.$router.push(`/registration`)
        },
        
    },
}
</script>