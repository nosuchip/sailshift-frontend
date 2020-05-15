<template>
  <v-container fluid class="fill-height white">
    <div v-if="document">

      <v-row class="document-heading">
        <v-col>
          {{ document ? document.organization : "..." }} | {{ document ? document.department : "..." }}
        </v-col>
      </v-row>

      <!-- <v-row class="document-title pl-8">
        <h1 class="heading">{{ document ? document.title : "..." }}</h1>
      </v-row> -->

      <v-row class="document-main flex-row">
        <v-col sm="12" md="8" lg="9">
          <v-card class="pl-4 pr-4">
            <v-card-title class="justify-center">
              <h2 class="heading">{{ document ? document.title : "..." }}</h2>
            </v-card-title>

            <v-card-text>
              <p :style="{ textAlign: 'justify' }">{{ document ? document.text : "..." }}</p>
            </v-card-text>

            <v-card-actions class="justify-center pb-4">
              <v-btn color="primary" @click="handlePurchase">Purchase to download full version</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col sm="12" md="4" lg="3">
          <v-card>
            <v-card-subtitle>
              Upon payment link to download document will be sent to your email.
              Also document appears under your profile "active documents" section.
            </v-card-subtitle>

            <v-card-title class="display-3 justify-center">
              ${{ price }}
            </v-card-title>

            <v-card-actions class="justify-center">
              <v-btn color="primary" @click="handlePurchase">Purchase document</v-btn>
            </v-card-actions>

            <v-card-subtitle class="pa-2 text-center font-weight-light">
              Proudly secured by Stripe
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

    </div>

    <v-row class="justify-center" v-else-if="user">
        <v-progress-circular
          indeterminate
          size="24"
          color="indigo darken-2"
        ></v-progress-circular>
        <div class="ml-4 body-2">Loading document...</div>
    </v-row>

    <v-row class="justify-center pa-8" v-else>
      <h1 class="display-3">Please login</h1>
      <h3 class="display-1">
        Document preview available only for registered users. Please login or
        register via button above.
      </h3>
    </v-row>

    <top-purchases title="Popular documents" :maxHeight="180" :maxWidth="180" />
  </v-container>
</template>

<style lang="scss" scoped>
  .document-heading {
    margin-right: 16px;
    margin-left: 16px;
    border-bottom-color: blue;
    border-bottom-style: solid;
    border-bottom-width: 1px;
  }
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TopPurchases from "@/components/TopPurchases.vue";
import { State, Action } from "vuex-class";
import { actions } from "@/plugins/store";
import { DocumentLoadActionType } from "@/typing/state/actions";
import { User } from "@/typing/user";

@Component({
  components: { TopPurchases }
})
export default class Application extends Vue {
  @State("user")
  user!: User | null;

  @State("currentDocument")
  document!: Document | null;

  @Action(actions.LOAD_DOCUMENT)
  loadDocument!: DocumentLoadActionType;

  documentId: string = "";
  price: number = 19.99;

  mounted () {
    if (this.user) {
      this.documentId = this.$route.params.documentId;
      console.log(`Document preview mounted with document ID ${this.documentId}`);
      this.fetch();
    }
  }

  async fetch () {
    await this.loadDocument(this.documentId);
  }

  handlePurchase () {
    // Send prepayment to backend
    // Get client secret
    // Send  user to payment page with client secred
  }
}
</script>
actio
