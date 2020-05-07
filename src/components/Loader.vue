<template>
  <v-overlay :value="loading" z-index="999">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  computed: mapState({
    loading: "loading"
  })
});
</script>
