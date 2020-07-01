<template>
  <router-link
    class="document-car-outer"
    :to="{ name: 'document.document', params: { documentId: document.id} }"
  >
    <v-card :max-width="maxWidth" :max-height="maxHeight" class="document-card">
      <v-card-title class="headline text-truncate">{{ document.title }}</v-card-title>

      <v-card-subtitle class="pb-0">{{ document.organization }}</v-card-subtitle>

      <v-card-text class="text--primary text-fade card-text" v-html="document.text"></v-card-text>

      <v-card-actions v-if="showPurchase">
        <v-btn color="primary" @click="onPurchase">Purchase document</v-btn>
      </v-card-actions>
    </v-card>
  </router-link>
</template>

<style lang="scss" scoped>
.document-car-outer {
  text-decoration: none;

  .document-card {
    overflow: hidden;

    .one-line {
      // overflow: hidden;
      // text-overflow: ellipsis;
      white-space: nowrap;
    }

    .card-text {
      font-size: 0.7rem;
      line-height: 0.7rem;
      text-align: justify;
    }

    .text-fade:before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: linear-gradient(transparent 10px, white);
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Document } from "@/typing/document";

@Component({})
export default class DocumentCard extends Vue {
  @Prop({ default: 200 })
  readonly maxHeight!: Number;

  @Prop({ default: 200 })
  readonly maxWidth!: Number;

  @Prop(Document)
  readonly document!: Document;

  @Prop({ default: false })
  readonly showPurchase!: boolean;

  @Prop(Function)
  readonly onPurchase!: (document: Document) => void;
}
</script>
