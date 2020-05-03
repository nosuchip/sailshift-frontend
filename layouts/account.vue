<template>
    <v-app dark>
        <v-content>
            <v-container class="fill-height">
                <nuxt />
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Toasted from '~/mixins/toasted.vue';

@Component({
    components: {},
    mixins: [Toasted]
})
export default class AccountLayout extends Vue {}
</script>
