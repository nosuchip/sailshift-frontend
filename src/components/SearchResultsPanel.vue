<template>
  <v-row v-if="hasDocuments" class="mr-2 ml-2">
    <div
      class="ma-2"
      v-for="(document, index) in documents"
      :key="index"
    >
      <document-card
        :document="document"
      />
    </div>
  </v-row>

  <v-row v-else>
    <v-col>
      <h1 class="text-center">No documents matched criteria</h1>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import DocumentCard from "@/components/DocumentCard.vue";

@Component({
  components: { DocumentCard }
})
export default class SerchResultsPanel extends Vue {
  @Prop(Array)
  readonly documents!: Document[];

  get hasDocuments () {
    return Array.isArray(this.documents) && this.documents.length;
  }
}
</script>
