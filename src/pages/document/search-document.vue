<template>
  <v-container fill-height fluid class="search-pane-container white pa-4 align-start">
    <v-row class="flex-column fill-height">
        <search-filter-panel
          class="flex-0"
          :onSearch="handleSearch"
          :onReset="handleReset"
          :filters="filters"
          :organizations="organizations"
          :departments="departments"
        />

        <search-results-panel
          :documents="documents"
        />

        <v-row class="pagination-container flex-0">
          <v-col>
            <v-pagination
              v-model="pagination.page"
              :page="pagination.page"
              :length="pagination.pages"
              :total-visible="paginationTotalVisible"
              @input="handlePageChanged"
            />
          </v-col>
        </v-row>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
  .search-pane-container {
    .flex-0 {
      flex: 0 !important;
    }
  }
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Action } from "vuex-class";
import { Mixins } from "vue-property-decorator";

import SearchFilterPanel from "@/components/SearchFilterPanel.vue";
import SearchResultsPanel from "@/components/SearchResultsPanel.vue";
import { Filters } from "@/typing/search";
import { Option, Dictionary } from "@/typing/generics";
import { actions } from "@/plugins/store";
import { Document } from "@/typing/document";
import { DocumentSearchActionType } from "@/typing/state/actions";
import { Pagination, PaginatedResponse } from "@/typing/paginations";
import AsyncOpsControl from "@/mixins/async-ops-control.vue";

@Component({
  components: {
    SearchFilterPanel,
    SearchResultsPanel
  }
})
export default class SearchDocumentPage extends Mixins(AsyncOpsControl) {
  pagination: Dictionary = {
    page: 1,
    pages: 1,
    total: 0
  }
  paginationTotalVisible: number = 7;
  paginationLength: number = 10;

  @State("documents")
  documents!: Document[];

  @Action(actions.SEARCH_DOCUMENTS)
  searchDocuments!: DocumentSearchActionType;

  filters: Filters = {
    query: "",
    organization: "",
    department: ""
  }

  organizations: Option[] = [];
  departments: Option[] = [];

  handlePageChanged (page: number) {
    this.fetch();
  }

  mounted () {
    this.urlToFilters();
    this.fetch();
  }

  urlToFilters () {
    if (this.$route.query.query) this.filters.query = this.$route.query.query as string;
    if (this.$route.query.organization) this.filters.organization = this.$route.query.organization as string;
    if (this.$route.query.department) this.filters.department = this.$route.query.department as string;
  }

  filtersToUrl () {
    const filters: Dictionary = {};

    if (this.filters.query) filters.query = this.filters.query;
    if (this.filters.organization) filters.organization = this.filters.organization;
    if (this.filters.department) filters.department = this.filters.department;

    const currentQuery = this.$route.query;

    if (
      currentQuery.query !== filters.query ||
      currentQuery.organization !== filters.organization ||
      currentQuery.department !== filters.department
    ) {
      this.$router.push({ name: "document.search", query: filters });
      return true;
    }

    return false;
  }

  async fetch () {
    await this.runWithLoading(async () => {
      const { pagination }: { pagination: PaginatedResponse } = await this.searchDocuments(this.filters, {
        ...this.pagination,
        page: (this.pagination.page || 1) - 1
      });

      pagination.page += 1;

      this.pagination = { ...this.pagination, ...pagination };
    });
  }

  handleSearch (filters: Filters) {
    this.filtersToUrl();
    this.fetch();
  }

  handleReset () {
    this.filters.query = "";
    this.filters.organization = "";
    this.filters.department = "";
  }
}
</script>
