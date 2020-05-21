import Vue from "vue";
import { StripePaymentIntentResult } from "vue-stripe-checkout";

export interface Dictionary<V = any> {
    [key: string]: V;
}

export interface ValidatableElement extends Vue {
  resetValidation: () => void;
  validate: () => boolean;
}

export interface StripeElement extends Vue {
  card: any;
  stripe: any;

  submit: () => void;
  confirmCardPayment: (clientSecret: string, options: Dictionary) => Promise<StripePaymentIntentResult>;
}

export interface Option<T = any> {
  title: string;
  value: T;
}
