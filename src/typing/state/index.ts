import { Commit, Dispatch } from "vuex";
import { State } from "./state";

export interface ActionParam<S = State> {
  commit: Commit;
  dispatch: Dispatch;
  state: S;
}

export { State } from "./state";
