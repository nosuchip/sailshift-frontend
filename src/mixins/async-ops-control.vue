<script lang="ts" >
import Vue from "vue";
import Component from "vue-class-component";
import { Mutation } from "vuex-class";
import { mutations } from "@/plugins/store";
import { LoadingMutationType } from "@/typing/state/mutations";

@Component({})
export default class AsyncOpsControl extends Vue {
  @Mutation(mutations.LOADING)
  loading!: LoadingMutationType;

  async runWithLoading<T = void> (fn: Function, catchFn?: Function) {
    this.loading(true);

    try {
      const res: T = await fn();
      return res;
    } catch (err) {
      if (catchFn) catchFn(err);
    } finally {
      this.loading(false);
    }
  }

  async awaitForConditionAndRun (condition: () => boolean, fn: Function) {
    let attemptsRemains = 5;
    let timeout = 300;
    const MULTIPLIER = 1.2;
    let flag = false;

    while (attemptsRemains >= 0) {
      attemptsRemains--;

      console.log(">> 1", flag);

      if (flag) {
        return fn();
      }

      console.log(">> 2", condition());

      if (condition()) {
        flag = true;
      }

      await new Promise(resolve => setTimeout(() => resolve(), timeout));
      timeout = timeout * MULTIPLIER;
      console.log(">> 3", timeout);
    }
  }
}
</script>
