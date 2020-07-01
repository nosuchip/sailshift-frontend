<template>
  <v-container fluid class="fill-height white">
    <div v-if="document">

      <v-row class="document-heading">
        <v-col>
          {{ document ? document.organization : "..." }} | {{ document && document.department || "&mdash;" }}
        </v-col>
      </v-row>

      <v-row class="document-main flex-row">
        <v-col sm="12" md="8" lg="9">
          <v-card class="pl-4 pr-4">
            <v-card-title class="justify-center">
              <h2 class="heading">{{ document ? document.title : "..." }}</h2>
            </v-card-title>

            <v-card-text>
              <p :style="{ textAlign: 'justify' }" v-html="document ? document.text : '...'"></p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col sm="12" md="4" lg="3">
          <v-card>
            <v-card-subtitle>
              Upon payment document appears under your profile "active documents" section.
            </v-card-subtitle>

            <v-card-title class="display-3 justify-center">
              ${{ document ? document.price.toFixed(2) : "..." }}
            </v-card-title>

            <v-card-actions class="justify-center">
              <purchase-dialog
                v-if="user && user.id"
                title="Purchase document"
                :user="user"
                :document="document"
                :onPurchase="handlePurchase"
                :onClose="handleClose"
              />

              <v-btn
                v-else
                color="red lighten-1"
                dark
                :to="{ name: 'account.login' }"
              >Please login to purchase</v-btn>

            </v-card-actions>

            <v-card-subtitle class="pa-2 text-center font-weight-light">
              Proudly secured by Stripe
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

    </div>

    <v-row class="justify-center" v-else>
      <div
        class="d-flex"
        v-if="!documentNotFound"
      >
        <v-progress-circular
          indeterminate
          size="24"
          color="indigo darken-2"
        ></v-progress-circular>
        <div class="ml-4 body-2">Loading document...</div>
      </div>

      <div v-else>
        <h3 class="ml-4 red--text lighten-4 display-2">Document you searching for not found.</h3>
        <h4 class="text-center mt-4">You could try to <router-link :to="{ name: 'document.search' }">search using another conditions</router-link></h4>
      </div>
    </v-row>

    <top-purchases title="Popular documents" :maxHeight="180" :maxWidth="180" />
  </v-container>
</template>

<style lang="scss" scoped>
  .document-heading {
    margin-right: 16px;
    margin-left: 16px;
    border-bottom-color: #aaa;
    border-bottom-style: solid;
    border-bottom-width: 1px;
  }
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TopPurchases from "@/components/TopPurchases.vue";
import PurchaseDialog from "@/components/PurchaseDialog.vue";
import { State, Action, Mutation } from "vuex-class";
import { Watch } from "vue-property-decorator";
import { actions, mutations } from "@/plugins/store";
import { DocumentLoadActionType } from "@/typing/state/actions";
import { CurrentDocumentMutationType } from "@/typing/state/mutations";
import { Document } from "@/typing/document";
import { User } from "@/typing/user";
import { Route } from "vue-router";
import _get from "lodash.get";
import { Dictionary } from "../../typing/generics";
import { MetaInfo } from "vue-meta";
import { Meta } from "@sophosoft/vue-meta-decorator";

@Component<PreviewDocument>({
  components: { TopPurchases, PurchaseDialog }
})
export default class PreviewDocument extends Vue {
  @State("user")
  user!: User | null;

  @State("token")
  token!: string | null;

  @State("currentDocument")
  document!: Document | null;

  @Action(actions.LOAD_DOCUMENT)
  loadDocument!: DocumentLoadActionType;

  @Mutation(mutations.CURRENT_DOCUMENT)
  setCurrentDocument!: CurrentDocumentMutationType;

  documentId: string = "";
  documentNotFound: boolean = false;

  created () {

  }

  @Watch("$route", { immediate: true, deep: true })
  onUrlChange (newRoute: Route, oldRoute: Route) {
    const newDocId = _get(newRoute, "params.documentId");
    const prevDocId = _get(oldRoute, "params.documentId");

    if (newDocId !== prevDocId) {
      this.setCurrentDocument({ document: null });
      this.documentId = this.$route.params.documentId;
      this.fetch();
    }
  }

  async fetch () {
    const result = await this.loadDocument(this.documentId);
    this.documentNotFound = !result;
  }

  handlePurchase () {
    console.log("Purchased");
    // Send prepayment to backend
    // Get client secret
    // Send  user to payment page with client secred
  }

  handleClose () {
    console.log("Not purchased");
  }

  @Meta
  getMetaInfo (): MetaInfo {
    const doc: Dictionary = this.document || {};

    const title = this.document ? this.document.title : "Sailshift: Document preview";

    return {
      title,
      htmlAttrs: {
        lang: "en",
        amp: "true"
      },
      meta: [
        { charset: "utf-8" },
        { name: "description", content: doc.text ? doc.text.slice(0, 100) : "Sailshift: Document description" },
        { name: "organization", content: doc.organization || "" },
        { name: "department", content: doc.department || "" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:title", content: title },
        { property: "og:description", content: doc.text ? doc.text.slice(0, 100) : "Sailshift: Document description" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://sailshift.com/${this.$route.fullPath}` },
        { property: "og:image", content: "https://sailshift.com/static/img/icons/android-chrome-512x512.png" },
        { name: "meta-ready", content: doc.title ? "true" : "" }
      ]
    };
  }
}
</script>
