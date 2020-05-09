<script lang="ts" >
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation, Action } from "vuex-class";
import { mutations, actions } from "@/plugins/store";
import { PaginatedApiResult } from "@/typing/paginations";
import { Watch } from "vue-property-decorator";
import { CurrentDocumentMutationType, LoadingMutationType } from "@/typing/state/mutations";
import { Document } from "@/typing/document";
import { getEmptyDocument } from "@/plugins/store/store";
import { DocumentCreateActionType, DocumentUpdateActionType, DocumentDeleteActionType } from "@/typing/state/actions";

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
