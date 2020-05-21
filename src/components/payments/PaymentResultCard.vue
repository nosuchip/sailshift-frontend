<template>
    <v-card class="payment-result-card">
      <v-card-title
        class="headline teal lighten-3 mb-4"
        primary-title
      >
        Payment results
      </v-card-title>

      <v-card-text>
        <div v-if="error">

        </div>

        <div v-if="intent">
          <p>
            Your payment <b>{{ intent.id }}</b> received and now processing. You could close this popup safely,
            when payment procesed - document appears in your profile for predefined time.
            Otherwise you can wait, we perform payment status check for you in a moment.
          </p>

          <v-progress-linear indeterminate size="32" v-if="!purchase"></v-progress-linear>

          <div>
            <span v-html="message"></span>
          </div>
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
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { StripeError, StripePaymentIntent } from "vue-stripe-checkout";
import { Dictionary } from "@/typing/generics";
import { State, Action } from "vuex-class";
import { actions } from "@/plugins/store";
import { CheckPurchaseActionType } from "@/typing/state/actions";
import { Purchase } from "@/typing/purchase";

@Component({ })
export default class PaymentResultCard extends Vue {
  message?: string = "Checking payment status...";

  timer: NodeJS.Timeout | null = null;
  timeoutInterval = 3000;
  dontSetTimeout: boolean = false;

  purchase: Purchase | null = null
  checking: boolean = false;
  checkAttempts = 0;
  readonly checkAttemptsWarn = 4;
  readonly checkAttemptsStop = 6;

  @Prop(Function)
  readonly onConfirm!: () => void;

  @Prop(Object)
  readonly error!: StripeError | null;

  @Prop(Object)
  readonly intent!: StripePaymentIntent | null;

  @Action(actions.CHECK_PURCHASE_DOCUMENT)
  readonly checkPurchase!: CheckPurchaseActionType;

  get paymentId () {
    return this.intent && this.intent.data && this.intent.data.object ? this.intent.data.object.id : null;
  }

  stopTimer () {
    if (this.timer) {
      this.dontSetTimeout = true;
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  async timerHandler () {
    if (this.checkAttempts >= this.checkAttemptsWarn) {
      this.message = "Payment processeing takes a little bit longer time...";
    }

    if (this.checkAttempts >= this.checkAttemptsStop) {
      console.log(`>> Payment wasn't confirmed after ${this.checkAttemptsStop} attemps, stop further checking`);
      this.stopTimer();
      return;
    }

    if (this.paymentId) {
      this.message = `Checking payment ${this.paymentId} status...`;

      try {
        const result = await this.checkPurchase(this.paymentId);
        this.purchase = result.purchase || {};
      } catch (error) {
        console.log(">> check purchase faile with error", error);
        this.purchase = null;
      }

      if (this.purchase && this.purchase.paymentStatus === "failed") {
        this.message = `Payment failed, please contact us with payment Id ${this.paymentId}`;
        return;
      }

      if (this.purchase && this.purchase.paymentStatus === "success") {
        this.message = `Payment successful! Here is <a _target="blank" href="${this.purchase.downloadUrl}">link to ` +
                       "document download.</a>. Also you can find this document on your profile page. " +
                       `Document was purchased at ${this.purchase.purchasedAt} (UTC) and ` +
                       `will be available until ${this.purchase.validUntil} (UTC)`;
        return;
      }

      this.message = `Payment ${this.paymentId} not processed yet, waiting...`;
    } else {
      console.log(">> No payment id");
    }

    this.timer = setTimeout(() => {
      this.checkAttempts++;
      this.timerHandler();
    }, this.timeoutInterval);
  }

  mounted () {
    console.log(">> PaymentResultCard mounted");

    this.timer = setTimeout(() => this.timerHandler(), this.timeoutInterval);
  }

  beforeDestroy () {
    console.log(">> PaymentResultCard going to be destroyed");

    this.stopTimer();
  }
}
</script>
