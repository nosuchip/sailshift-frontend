<template>
  <v-row justify="center">
    <v-col>
      <v-row justify="center">
        <v-col lg="6" md="6" sm="12">
          <form @submit.prevent="search" class="heading">
            <h1 :class="titleClass">SAILSHIFT</h1>
            <h3 class="headline text-center mb-8">Get Help with your Homework Today</h3>
            <v-text-field
              outlined
              class="search-input pb-8"
              v-model="query"
              append-outer-icon="mdi-magnify"
              clear-icon="mdi-close-circle"
              clearable
              label
              type="text"
              @click:append-outer="search"
            ></v-text-field>
          </form>
        </v-col>
      </v-row>

      <top-purchases title="Top documents" />
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.search-input {
  font-size: 2rem;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TopPurchases from "@/components/TopPurchases.vue";

@Component({
  components: { TopPurchases }
})
export default class Home extends Vue {
  query: string = "";

  search () {
    this.$router.push({ name: "document.search", query: { query: this.query } });
  }

  get titleClass () {
    switch (this.$vuetify.breakpoint.name) {
      case "xs":
        return "display-2 text-center mb-8";
      default:
        return "display-4 text-center mb-8";
    };
  }
}
</script>
