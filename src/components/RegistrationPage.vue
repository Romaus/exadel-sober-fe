<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5" cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

          <v-text-field v-model="password" :rules="passwordRules" label="Password" required></v-text-field>

          <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
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
export default {
  name: 'Registration-Page',

  data: () => ({
    valid: false,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length <= 10) || 'Password must be less than 10 characters',
    ],

  }),
  methods: {
    validate() {
      this.$refs.form.validate();
      this.registration();
    },
    async registration() {
      axios.post(`http://localhost:8080/user/add`, { name: this.name, email: this.email, password: this.password });
      this.$router.push('/login')
    }
  },
}
</script>
