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

  async runWithLoading (fn: Function) {
    this.loading(true);

    try {
      await fn();
    } finally {
      this.loading(false);
    }
  }
}
</script>
