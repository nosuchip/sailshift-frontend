<template>
  <v-container fill-height fluid class="user=purchases white pa-4 align-start">
    <v-expansion-panels multiple v-model="panels">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h3 class="font-weight-light">Available documents</h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Document</th>
                  <th class="text-left">Purchased at</th>
                  <th class="text-left">Valid until</th>
                  <th class="text-left">Download</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!current.length">
                  <td class="text-center" colspan="4">No documents loaded</td>
                </tr>

                <tr v-else v-for="doc in current" :key="doc.id">
                  <td>{{ doc.document.title }}</td>
                  <td>{{ doc.purchased_at }}</td>
                  <td>{{ doc.valid_until }}</td>
                  <td>
                    <v-btn v-if="doc.download_url" :href="doc.download_url" icon>
                      <v-icon>mdi-download</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <h3 class="font-weight-light">Past (expired) documents</h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Document</th>
                  <th class="text-left">Organization</th>
                  <th class="text-left">Department</th>
                  <th class="text-left">Purchased at</th>
                  <th class="text-left">Valid until</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!past.length">
                  <td class="text-center" colspan="4">No documents loaded</td>
                </tr>

                <tr v-else v-for="doc in past" :key="doc.id">
                  <td>{{ doc.document.title }}</td>
                  <td>{{ doc.document.organization }}</td>
                  <td>{{ doc.document.department }}</td>
                  <td>{{ doc.purchased_at }}</td>
                  <td>{{ doc.valid_until }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- <v-row class="flex-column fill-height">
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
    </v-row> -->
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Mixins } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { actions } from "@/plugins/store";
import AsyncOpsControl from "@/mixins/async-ops-control.vue";
import { GetUserDocumentsActionType } from "@/typing/state/actions";
import { UserDocuments } from "../../typing/user";

@Component({})
export default class Application extends Mixins(AsyncOpsControl) {
  userDocuments: UserDocuments | null = null
  panels = [0]

  @Action(actions.GET_USER_DOCUMENTS)
  getUserDocuments!: GetUserDocumentsActionType

  mounted () {
    this.fetch();
  }

  async fetch () {
    this.userDocuments = await this.getUserDocuments();
  }

  get current () {
    return this.userDocuments && this.userDocuments.current ? this.userDocuments.current : [];
  }

  get past () {
    return this.userDocuments && this.userDocuments.past ? this.userDocuments.past : [];
  }
}
</script>
