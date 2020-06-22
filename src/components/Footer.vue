<template>
  <v-footer
    color="indigo"
    app
  >
    <span class="white--text">&copy; 2019</span>
    <v-spacer />

    <div>
      <v-btn
        color="white"
        small
        text
        rounded
        :to="{ name: 'home' }"
      >
        Home
      </v-btn>

      <v-btn
        color="white"
        small
        text
        rounded
        :to="{ name: 'privacy_policy' }"
      >
        Privacy policy
      </v-btn>

      <v-btn
        color="white"
        small
        text
        rounded
        :to="{ name: 'contact' }"
      >
        Contact us
      </v-btn>
    </div>

  </v-footer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Footer"
});
</script>
