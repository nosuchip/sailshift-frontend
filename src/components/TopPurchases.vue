<template>
  <v-row class="popular">
    <v-col>
      <v-row>
        <v-col>
          <h3 class="headline text-center">{{ title }}</h3>
        </v-col>
      </v-row>

      <v-row v-if="hasPopular">
        <v-col v-for="(document, index) in popularDocuments" :key="index">
          <document-card
            :document="document"
            :maxHeight="maxHeight"
            :maxWidth="maxWidth"
            :showPurchase="false"
          />
        </v-col>
      </v-row>

      <v-row class="justify-center" v-else>
        <v-progress-circular
          indeterminate
          size="24"
          color="indigo darken-2"
        ></v-progress-circular>
        <div class="ml-4 body-2">Loading popular...</div>
      </v-row>
    </v-col>
  </v-row>

</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Document } from "@/typing/document";
import { State, Action } from "vuex-class";
import { actions } from "@/plugins/store";
import { LoadPopularDocumentsType } from "@/typing/state/actions";
import DocumentCard from "@/components/DocumentCard.vue";

@Component({
  components: { DocumentCard }
})
export default class TopPurchases extends Vue {
  @Prop({ default: "Top purchased" })
  readonly title!: string;

  @Prop({ default: 200 })
  readonly maxHeight!: Number;

  @Prop({ default: 200 })
  readonly maxWidth!: Number;

  @State("popularDocuments")
  popularDocuments!: Document[];

  @Action(actions.DOCUMENTS_LOAD_POPULAR)
  loadPopularDocuments!: LoadPopularDocumentsType;

  get hasPopular () {
    return this.popularDocuments && this.popularDocuments.length;
  }

  mounted () {
    this.loadPopularDocuments();
  }
}
</script>
