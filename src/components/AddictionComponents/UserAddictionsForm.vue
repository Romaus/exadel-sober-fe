<template>
    <v-container class="pa-2">
        <v-text-field 
            v-model="name" 
            label="name" 
            required>
        </v-text-field>
        <v-text-field 
            v-model="description" 
            label="description" 
            required>
        </v-text-field>
        <v-btn 
            color="success" 
            class="mr-4" 
            :disabled="!name || !description" 
            @click="addNewAddiction">
                Add new Addiction
        </v-btn>
    </v-container>
</template>
<script >
import { mapActions } from 'vuex'
export default {
    name: 'Addiction-Form',
    components: {
    },
    data: () => ({
        name: '',
        description: '',
    }),
    methods: {
        ...mapActions(['addAddiction']),
        async addNewAddiction() {
            await this.addAddiction({
                name: this.name,
                description: this.description,
            })
            this.name = '';
            this.description = '';
        },
    },
    mounted() { }
}
</script>