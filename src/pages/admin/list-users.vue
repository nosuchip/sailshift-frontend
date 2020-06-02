<template>
  <v-container fluid class="fill-height white list--users">
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1 fill-height flex-grow-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Users</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-btn outlined color="secondary" dark @click="fetch">Refresh</v-btn>

          <v-dialog v-model="dialog" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text v-if="editUser">
                <v-container>
                  <v-row>
                    <v-col>
                      <v-file-input
                        v-if="!editUser.id"
                        v-model="file"
                        dense
                        chips
                        show-size
                        label="Document to upload"
                        accept="application/pdf"
                      ></v-file-input>

                      <v-text-field
                        v-else
                        disabled
                        label="Uploaded document URL"
                        :value="editUser.url"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field dense v-model="editUser.title" label="Title"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field dense v-model="editUser.organization" label="Organization"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-text-field dense v-model="editUser.description" label="Description"></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        dense
                        v-model="editUser.text"
                        label="Parsed file text excerpts (about first page)"
                        :disabled="!editUser.id"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="handleSave">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="handleEdit(item)"
        >
          mdi-pencil
        </v-icon>

        <v-icon
          small
          @click="handleDelete(item)"
        >
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        Loading data...
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation, Action } from "vuex-class";
import { mutations, actions } from "@/plugins/store";
import { Pagination } from "@/typing/paginations";
import { Watch, Mixins } from "vue-property-decorator";
import { CurrentDocumentMutationType, LoadingMutationType } from "@/typing/state/mutations";
import { Document } from "@/typing/document";
import {
  UserUpdateActionType,
  UserDeleteActionType,
  UserToggleActionType,
  UsersLoadActionType
} from "@/typing/state/actions";
import AsyncOpsControl from "@/mixins/async-ops-control.vue";
import { User } from "../../typing/user";

@Component({})
export default class ListUsers extends Mixins(AsyncOpsControl) {
  pagination: Pagination = { page: 0 }

  @State("users")
  users!: Document

  @Action(actions.ADMIN_UPDATE_USER)
  updateUser!: UserUpdateActionType;

  @Action(actions.ADMIN_DELETE_USER)
  deleteUser!: UserDeleteActionType;

  @Action(actions.ADMIN_LOAD_USERS)
  loadUsers!: UsersLoadActionType;

  defaultHeader = { text: "", sortable: false, filterable: false }

  headers: any[] = [
    { ...this.defaultHeader, text: "ID", value: "id" },
    { ...this.defaultHeader, text: "Email", value: "email" },
    { ...this.defaultHeader, text: "Name", value: "name" },
    { ...this.defaultHeader, text: "Activated at", value: "activated_at" },
    { ...this.defaultHeader, text: "Role", value: "role" },
    { ...this.defaultHeader, value: "actions" }
  ];
  dialog: boolean = false;
  editUser: User | null = null;

  get formTitle () {
    return "Edit user";
  }

  mounted () {
    this.fetch();
  }

  @Watch("dialog", { immediate: true })
  handleDialogChange (val: boolean, prevVal: boolean) {
    if (typeof prevVal !== "undefined") {
      if (!val) {
        this.$nextTick(() => {
          this.editUser = null;
        });
      }
    }
  }

  fetch () {
    this.loadUsers({});
  }

  handleEdit (user: User) {
    this.editUser = user;
    this.dialog = true;
  }

  async handleSave () {
    const user = this.editUser;

    if (!user) return;

    await this.runWithLoading(async () => {
      const result = await this.updateUser(user);

      if (result) {
        this.dialog = false;
        this.loadUsers({});
      }
    });
  }

  async handleDelete (user: User) {
    if (!confirm("Do you really want to delete user? This action cannot be reverted.")) {
      return;
    }

    await this.runWithLoading(() => this.deleteUser(user));
  }
}
</script>
