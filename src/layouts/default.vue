<template>
    <v-app dark>
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            app
        >
            <v-list>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar :clipped-left="clipped" fixed app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title v-text="title" />
            <v-spacer />
            <account-button />
        </v-app-bar>
        <v-content>
            <v-container fluid class="fill-height">
                <router-view></router-view>
            </v-container>
        </v-content>
        <v-footer app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dictionary } from "@/typing/generics";
import AccountButton from "@/components/AccountButton.vue";

@Component({
  components: { AccountButton }
})
export default class DefaultLayout extends Vue {
    drawer: boolean = false;
    miniVariant: boolean = false;
    clipped: boolean = false;
    title: string = "Sailshift";

    items: Dictionary[] = [
      {
        icon: "mdi-apps",
        title: "Welcome",
        to: "/"
      },
      {
        icon: "mdi-chart-bubble",
        title: "Inspire",
        to: "/inspire"
      }
    ];
}
</script>
