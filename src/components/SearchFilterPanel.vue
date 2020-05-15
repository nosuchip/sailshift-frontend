<template>
  <v-row class="filter-row">
    <v-col cols="12" xs="12" sm="2" class="filter-col">
      <h1 class="headline mb-4 pl-2">Filters:</h1>
    </v-col>

    <v-col cols="12" xs="12" sm="3" class="filter-col">
      <v-text-field
        v-model="filters.query"
        label="Query"
        dense
        clearable
      />
    </v-col>

    <v-col cols="12" xs="12" sm="2" class="filter-col">
      <v-select
        v-model="filters.organization"
        :items="organizations"
        label="School"
        item-text="title"
        item-value="value"
        dense
      ></v-select>
    </v-col>

    <v-col cols="12" xs="12" sm="2" class="filter-col">
      <v-select
        v-model="filters.department"
        :items="departments"
        label="Department"
        item-text="title"
        item-value="value"
        dense
      ></v-select>
    </v-col>

    <v-col cols="12" xs="12" sm="3" class="filter-col">
      <v-btn
        color="red"
        icon
        large
        @click="handleReset"
      ><v-icon>mdi-close</v-icon></v-btn>
      <v-btn
        color="green"
        icon
        large
        @click="handleSearch"
      ><v-icon>mdi-magnify</v-icon></v-btn>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
  .filter-row {
    padding-left: 8px;
    padding-right: 8px;
  }

  .filter-col {
    padding-bottom: 0;
  }

  @media (max-width: 600px) {
    .filter-col {
      padding-top: 0;
      margin-left: 12px;
    }
  }
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Filters } from "@/typing/search";
import { Option } from "@/typing/generics";

@Component({})
export default class SearchFilterPanel extends Vue {
  @Prop(Function)
  readonly onSearch!: (filters: Filters) => void;

  @Prop(Function)
  readonly onReset!: () => void;

  @Prop(Array)
  readonly organizations!: Option[];

  @Prop(Array)
  readonly departments!: Option[];

  @Prop(Object)
  readonly filters!: Filters;

  handleSearch () {
    this.onSearch(this.filters);
  }

  handleReset () {
    this.onReset();
  }
}
</script>
