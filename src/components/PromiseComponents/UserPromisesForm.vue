<template>
    <v-container class="pa-2">
        <v-select 
            v-model="addiction" 
            :hint="`${addiction.description}`" :items="getAllAddictionsFromStore"
            item-text="name" 
            item-value="id" 
            return-object 
            single-line 
            filled 
            label="Choose addiction">
        </v-select>
        <v-text-field 
            type="number" 
            v-model="days" 
            label="days" 
            required>
        </v-text-field>
        <v-btn 
            color="success" 
            class="mr-4" 
            :disabled="!addiction || !days" 
            @click="addNewPromise">
                Add new Promise
        </v-btn>
    </v-container>
</template>
<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Promises-Form',
    components: {
    },
    computed: mapGetters(
        ['getAllAddictionsFromStore']),
    data: () => ({
        addiction: "",
        days: "",
    }),
    methods: {
        ...mapActions(['addPromise']),
        async addNewPromise() {
            const userId = this.getUserId ? this.getUserId : this.$route.params.userId;
            await this.addPromise({
                userId,
                addictionId: this.addiction.addictionId,
                startDate: Date.parse(new Date().toString()),
                expiredDate: this.days*24*3600*1000 + Date.parse(new Date().toString())
            });
            this.addiction = '';
            this.days = '';
        }
    }
}
</script>