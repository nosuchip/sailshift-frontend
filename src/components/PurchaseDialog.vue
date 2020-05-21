<template>
  <v-dialog
    v-model="open"
    max-width="700"
    @input="handleDialogInput"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="red lighten-2"
        dark
        v-on="on"
      >
        {{ title || "Purchase" }}
      </v-btn>
    </template>

    <prepurchase-card
      v-if="paymentStep === 'intent'"
      :document="document"
      :onConfirm="handlePrepurchase"
      :onCancel="handleClose"
    />

    <purchase-card
      v-if="paymentStep === 'payment'"
      :document="document"
      :user="user"
      :onConfirm="handlePurchase"
      :onCancel="handleClose"
    />

    <payment-result-card
      v-if="paymentStep === 'done'"
      :error="paymentError"
      :intent="paymentIntent"
      :onConfirm="handleResult"
    />

  </v-dialog>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Mixins } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { actions } from "@/plugins/store";
import { User } from "@/typing/user";
import { Document } from "@/typing/document";
import { PurchasePrepaymentActionType } from "@/typing/state/actions";
import AsyncOpsControl from "@/mixins/async-ops-control.vue";
import PrepurchaseCard from "@/components/payments/PrepurchaseCard.vue";
import PurchaseCard from "@/components/payments/PurchaseCard.vue";
import PaymentResultCard from "@/components/payments/PaymentResultCard.vue";
import { Dictionary } from "@/typing/generics";
import { StripeError, StripePaymentIntent } from "vue-stripe-checkout";

type PaymentState = "intent" | "payment" | "done";

@Component({
  components: {
    PrepurchaseCard,
    PurchaseCard,
    PaymentResultCard
  }
})
export default class PurchaseDialog extends Mixins(AsyncOpsControl) {
  open: boolean = false;
  paymentStep: PaymentState = "intent";
  clientSecret: string | null = null;

  paymentError: StripeError | null = null;
  paymentIntent: StripePaymentIntent | null = null;

  @Prop(String)
  readonly title!: string;

  @Prop(Function)
  readonly onPurchase!: () => void;

  @Prop(Function)
  readonly onClose!: () => void;

  @Prop(Object)
  user!: User | null;

  @Prop(Object)
  document!: Document | null;

  @Action(actions.PRE_PURCHASE_DOCUMENT)
  prepurchase!: PurchasePrepaymentActionType;

  mounted () {
    this.paymentIntent = {
      "id": "evt_1GkvJDJtdDvmMFZWHlYXqnjE",
      "object": "event",
      "api_version": "2020-03-02",
      "created": 1589994143,
      "data": {
        "object": {
          "id": "pi_1Gl5zOJtdDvmMFZWLRQ9UBIq",
          "object": "payment_intent",
          "amount": 2150,
          "amount_capturable": 0,
          "amount_received": 2150,
          "application": null,
          "application_fee_amount": null,
          "canceled_at": null,
          "cancellation_reason": null,
          "capture_method": "automatic",
          "charges": {
            "object": "list",
            "data": [
              {
                "id": "ch_1GkvJDJtdDvmMFZW4Fe7EDGt",
                "object": "charge",
                "amount": 2150,
                "amount_refunded": 0,
                "application": null,
                "application_fee": null,
                "application_fee_amount": null,
                "balance_transaction": "txn_1GkvJDJtdDvmMFZWKc6sgxBg",
                "billing_details": {
                  "address": {
                    "city": null,
                    "country": null,
                    "line1": null,
                    "line2": null,
                    "postal_code": "12312",
                    "state": null
                  },
                  "email": null,
                  "name": "Alex The First",
                  "phone": null
                },
                "calculated_statement_descriptor": "Stripe",
                "captured": true,
                "created": 1589994143,
                "currency": "usd",
                "customer": null,
                "description": null,
                "destination": null,
                "dispute": null,
                "disputed": false,
                "failure_code": null,
                "failure_message": null,
                "fraud_details": {},
                "invoice": null,
                "livemode": false,
                "metadata": {
                  "purchase_id": "26"
                },
                "on_behalf_of": null,
                "order": null,
                "outcome": {
                  "network_status": "approved_by_network",
                  "reason": null,
                  "risk_level": "normal",
                  "risk_score": 19,
                  "seller_message": "Payment complete.",
                  "type": "authorized"
                },
                "paid": true,
                "payment_intent": "pi_1Gl5zOJtdDvmMFZWLRQ9UBIq",
                "payment_method": "pm_1GkvJCJtdDvmMFZW94DLrWBD",
                "payment_method_details": {
                  "card": {
                    "brand": "visa",
                    "checks": {
                      "address_line1_check": null,
                      "address_postal_code_check": "pass",
                      "cvc_check": "pass"
                    },
                    "country": "US",
                    "exp_month": 11,
                    "exp_year": 2023,
                    "fingerprint": "xLMBPWFOLLET9ku4",
                    "funding": "credit",
                    "installments": null,
                    "last4": "4242",
                    "network": "visa",
                    "three_d_secure": null,
                    "wallet": null
                  },
                  "type": "card"
                },
                "receipt_email": "nosuchip@gmail.com",
                "receipt_number": null,
                "receipt_url": "https://pay.stripe.com/receipts/acct_184PqDJtdDvmMFZW/ch_1GkvJDJtdDvmMFZW4Fe7EDGt/rcpt_HJYQB5cuADKQYXKpCVRmIW3ZVEQn3EQ",
                "refunded": false,
                "refunds": {
                  "object": "list",
                  "data": [],
                  "has_more": false,
                  "total_count": 0,
                  "url": "/v1/charges/ch_1GkvJDJtdDvmMFZW4Fe7EDGt/refunds"
                },
                "review": null,
                "shipping": null,
                "source": null,
                "source_transfer": null,
                "statement_descriptor": null,
                "statement_descriptor_suffix": null,
                "status": "succeeded",
                "transfer_data": null,
                "transfer_group": null
              }
            ],
            "has_more": false,
            "total_count": 1,
            "url": "/v1/charges?payment_intent=pi_1Gl5zOJtdDvmMFZWLRQ9UBIq"
          },
          "client_secret": "pi_1Gl5zOJtdDvmMFZWLRQ9UBIq_secret_kf73A6xJS5vlJVEJMpBiCdB03",
          "confirmation_method": "automatic",
          "created": 1589994130,
          "currency": "usd",
          "customer": null,
          "description": null,
          "invoice": null,
          "last_payment_error": null,
          "livemode": false,
          "metadata": {
            "purchase_id": "26"
          },
          "next_action": null,
          "on_behalf_of": null,
          "payment_method": "pm_1GkvJCJtdDvmMFZW94DLrWBD",
          "payment_method_options": {
            "card": {
              "installments": null,
              "request_three_d_secure": "automatic"
            }
          },
          "payment_method_types": ["card"],
          "receipt_email": "nosuchip@gmail.com",
          "review": null,
          "setup_future_usage": null,
          "shipping": null,
          "source": null,
          "statement_descriptor": null,
          "statement_descriptor_suffix": null,
          "status": "succeeded",
          "transfer_data": null,
          "transfer_group": null
        }
      },
      "livemode": false,
      "pending_webhooks": 1,
      "request": {
        "id": "req_4NneSQNEJYyFMP",
        "idempotency_key": null
      },
      "type": "payment_intent.succeeded"
    };
  }

  handleDialogInput (opened: boolean) {
    if (opened) {
      this.paymentStep = "intent";
    }
  }

  async handlePrepurchase () {
    if (!this.document) {
      return;
    }

    const payload = {
      documentId: this.document.id,
      amount: this.document.price,
      currency: "usd",
      paymentMethod: "card"
    };

    console.log(">> prepayment payload:", payload);

    await this.runWithLoading(async () => {
      const { clientSecret } = await this.prepurchase(payload);
      this.clientSecret = clientSecret;
      this.paymentStep = "payment";
    });
  }

  async handlePurchase (stripe: any, payload: Dictionary) {
    console.log(">> purchase");

    const { error, paymentIntent } = await stripe.confirmCardPayment(this.clientSecret, payload);

    this.paymentError = error || null;
    this.paymentIntent = paymentIntent || null;
    this.paymentStep = "done";
  }

  handleResult () {
    this.open = false;
    this.onPurchase();
  }

  handleClose () {
    this.open = false;
    this.onClose();
  }
}
</script>
