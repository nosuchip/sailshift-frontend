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

@Component({
  components: {}
})
export default class AccountLayout extends Vue {}
</script>
