<template>
    <v-card class="purchase-card">
      <v-card-title
        class="headline teal lighten-3 mb-4"
        primary-title
      >
        Payment details
      </v-card-title>

      <v-card-text v-if="stripePublishableKey">
        <stripe-elements
          ref="stripeRef"
          :pk="stripePublishableKey"
          :amount="amount"
        />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="handleConfirm"
        >
          Pay ${{amount / 100}}
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
import { State } from "vuex-class";
import { Document } from "@/typing/document";
import { StripeElements, StripeError, StripePaymentIntent } from "vue-stripe-checkout";
import { Dictionary, StripeElement } from "@/typing/generics";
import { User } from "../../typing/user";

@Component({
  components: {
    StripeElements
  }
})
export default class PurchaseCard extends Vue {
  @State("stripePublishableKey")
  stripePublishableKey!: string | null;

  @State("user")
  user!: User | null;

  @Prop(Function)
  readonly onCancel!: () => void;

  @Prop(Function)
  readonly onConfirm!: (stripe: any, paymentPayload: Dictionary) => void;

  @Prop(Object)
  document!: Document | null;

  // NOTE: Only USD supported
  get amount () {
    return this.document ? Math.floor(this.document.price * 100) : 0;
  }

  get stripeElement (): StripeElement {
    return this.$refs.stripeRef as StripeElement;
  }

  handleConfirm () {
    if (!this.user) {
      return;
    }

    const { stripe } = this.stripeElement;

    this.onConfirm(stripe, {
      payment_method: {
        card: this.stripeElement.card,
        billing_details: {
          name: this.user.name
        }
      }
    });
  }
}
</script>
