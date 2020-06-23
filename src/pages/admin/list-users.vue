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
          <v-btn small outlined color="secondary" dark @click="fetch">Refresh</v-btn>

          <v-dialog v-model="dialog" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text v-if="editUser">
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="Name"
                        v-model="editUser.name"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        type="password"
                        label="Password"
                        v-model="editUser.password"
                        placeholder="********"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-text-field
                        label="Name"
                        v-model="editUser.email"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        type="password"
                        label="Password confirmation"
                        v-model="editUser.confirmation"
                        placeholder="********"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-select
                        v-model="editUser.role"
                        :items="roles"
                        label="Role"
                        item-text="title"
                        item-value="value"
                        dense
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-switch
                        label="Activated"
                        v-model="editUser.active"
                      ></v-switch>
                    </v-col>
                  </v-row>

                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="handleSave">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

    <template v-slot:item.activatedAt="{ item }">
      <span v-if="item.active">{{ item.activatedAt }}</span>
      <span v-else class="red--text lighten-3">-- inactive --</span>
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
    { ...this.defaultHeader, text: "Activated at", value: "activatedAt" },
    { ...this.defaultHeader, text: "Role", value: "role" },
    { ...this.defaultHeader, value: "actions" }
  ];
  dialog: boolean = false;
  editUser: User | null = null;

  get formTitle () {
    return "Edit user";
  }

  get roles () {
    return [{
      title: "User",
      value: "user"
    }, {
      title: "Admin",
      value: "admin"
    }];
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
    this.editUser = { ...user };
    this.dialog = true;
  }

  async handleSave () {
    const user = this.editUser;

    if (!user) return;

    if (user.password || user.confirmation) {
      if (user.password && user.password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
      }

      if (user.confirmation !== user.password) {
        alert("Password and confirmation must match");
        return;
      }
    }

    await this.runWithLoading(async () => {
      const result = await this.runWithLoading<any>(() => this.updateUser({ user }));

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
