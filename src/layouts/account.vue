<template>
    <v-app dark>
        <v-content>
            <v-container class="fill-height">
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Toasted from "@/mixins/Toasted.vue";

@Component({
  components: {},
  mixins: [Toasted]
})
export default class AccountLayout extends Vue {}
</script>
