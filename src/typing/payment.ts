import { Dictionary } from "./generics";

export interface Payment {
  clientSecret?: string;

  intent: Dictionary;
}
