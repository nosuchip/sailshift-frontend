<template>
    <v-card class="pre-purchase-card">
      <v-card-title
        class="headline teal lighten-3 mb-4"
        primary-title
      >
        Purchase review and data collection policy
      </v-card-title>

      <v-card-text>
        <div>
          <p>You're going to purchase following document:</p>
          <div class="title">Document: <b>{{ document.title }}</b></div>
          <div class="title">Price: <b>${{ document.price.toFixed(2) }}</b></div>
        </div>

        <div>
          <p>All payments are performed through Stripe and we do not store any of your credit card data.</p>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="onConfirm"
        >
          Confirm
        </v-btn>
        <v-btn
          color="default"
          text
          @click="onCancel"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Document } from "@/typing/document";

@Component({})
export default class PrepurchaseCard extends Vue {
  @Prop(Function)
  readonly onCancel!: () => void;

  @Prop(Function)
  readonly onConfirm!: () => void;

  @Prop(Object)
  document!: Document | null;
}
</script>
