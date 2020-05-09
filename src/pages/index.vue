<template>
  <default-layout>
  </default-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DefaultLayout from "@/layouts/default.vue";

@Component({
  components: { DefaultLayout }
})
export default class Contact extends Vue {
}
</script>
