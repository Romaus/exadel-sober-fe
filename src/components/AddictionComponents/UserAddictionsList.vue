<template>
    <v-container class="pa-6">
        <v-card max-width="400" tile>
            <v-list-item two-line v-for="addiction in getAllAddictionsFromStore" :key="addiction.id">
                <v-list-item-content>
                    <v-list-item-title>{{ addiction.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                        {{ addiction.description }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </v-container>
</template>
<script lang="ts">
import { mapGetters } from 'vuex'
export default {
    name: 'Addiction-Form',
    components: {
},
    computed: mapGetters(
        ['getAllAddictionsFromStore']),
    data: () => ({
    }),
}
</script>