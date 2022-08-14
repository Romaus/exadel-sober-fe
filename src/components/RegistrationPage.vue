<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5" cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field 
            v-model="name" 
            :counter="10" 
            :rules="nameRules" 
            label="Name" 
            required>
          </v-text-field>
          <v-text-field 
            v-model="email" 
            :rules="emailRules" 
            label="E-mail" 
            required>
          </v-text-field>
          <v-text-field 
            v-model="password" 
            :rules="passwordRules" 
            label="Password" 
            required>
          </v-text-field>
          <v-btn 
            :disabled="!valid" 
            color="success" 
            class="mr-4" 
            @click="validate">
              Registration
          </v-btn>
        </v-form>
      </v-col>
      <v-col class="mb-5" cols="12">
      </v-col>
      <v-col class="mb-5" cols="12">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import config from '@/config';
export default {
  name: 'Registration-Page',

  data: () => ({
    valid: false,
    name: '',
    nameRules: [
      v => !!v || config.validateErrors.required.name,
      v => (v && v.length <= 10) || config.validateErrors.length.name,
    ],
    email: '',
    emailRules: [
      v => !!v || config.validateErrors.required.email,
      v => /.+@.+\..+/.test(v) || config.validateErrors.valid.email,
    ],
    password: '',
    passwordRules: [
      v => !!v || config.validateErrors.required.password,
      v => (v && v.length <= 10) || config.validateErrors.length.password,
    ],

  }),
  methods: {
    validate() {
      this.$refs.form.validate();
      this.registration();
    },
    async registration() {
      axios.post(`${config.backendURL}/user`, { name: this.name, email: this.email, password: this.password });
      this.$router.push('/login')
    }
  },
}
</script>
