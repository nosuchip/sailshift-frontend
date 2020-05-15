<template>
  <v-row justify="center">
    <v-col>
      <v-row justify="center">
        <v-col lg="6" md="6" sm="12">
          <form @submit.prevent="search" class="heading">
            <h1 class="display-4 text-center mb-8">SAILSHIFT</h1>
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

      <v-row class="popular">
        <v-col>
          <v-row>
            <v-col>
              <h3 class="headline text-center">Top documents</h3>
            </v-col>
          </v-row>

          <v-row>
            <v-col v-for="(document, index) in popularDocuments" :key="index">
              <document-card
                :document="document"
                :showPurchase="false"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
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
import { State, Action } from "vuex-class";
import { actions } from "@/plugins/store";
import { LoadPopularDocumentsType } from "@/typing/state/actions";
import { Document } from "@/typing/document";
import DocumentCard from "@/components/DocumentCard.vue";

@Component({
  components: { DocumentCard }
})
export default class Home extends Vue {
  @State("popularDocuments")
  popularDocuments!: Document[];

  @Action(actions.DOCUMENTS_LOAD_POPULAR)
  loadPopularDocuments!: LoadPopularDocumentsType;

  query: string = "";

  mounted () {
    this.loadPopularDocuments();
  }

  search () {
    this.$router.push({ name: "document.search", query: { query: this.query } });
  }
}
</script>
