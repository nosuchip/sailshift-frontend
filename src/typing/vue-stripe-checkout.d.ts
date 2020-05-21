import Vue from "vue";
import { Dictionary } from "@/typing/generics";

declare module "vue-stripe-checkout" {
  export class StripeCheckout extends Vue {
    pk: String;
    items: [];
    successUrl: String;
    cancelUrl: String;
    submitType: String;
    billingAddressCollection: String;
    clientReferenceId: String;
    customerEmail: String;
    sessionId: String;
    locale: String;

    redirectToCheckout (): void;
  }

  export class StripeElements extends Vue {
    pk: String;
    amount: Number;
    stripeAccount: String;
    apiVersion: String;
    locale: String;

    submit (): HTMLElement;
  }

  export interface PaymentIntent {
    status: string;
  }

  export interface StripePaymentIntentResult {
    error?: Error;
    paymentIntent?: PaymentIntent;
  }

  export interface StripeError {
    type: string;
    charge: string;
    code: string;
    // eslint-disable-next-line camelcase
    decline_code: string;
    // eslint-disable-next-line camelcase
    doc_url: string;
    message: string;
    // eslint-disable-next-line camelcase
    payment_method: Dictionary;
    // eslint-disable-next-line camelcase
    payment_intent: Dictionary;
  }

  export interface StripePaymentIntent extends Dictionary {}
}
