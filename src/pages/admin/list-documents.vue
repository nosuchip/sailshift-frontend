<template>
      <v-data-table
        :headers="headers"
        :items="documents.data"
        sort-by="calories"
        class="elevation-1 fill-height flex-grow-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Documents</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn outlined color="secondary" dark @click="handleCreate">New Item</v-btn>

            <v-dialog v-model="dialog" max-width="800px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text v-if="currentDocument">
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-file-input
                          v-if="!currentDocument.id"
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
                          :value="currentDocument.url"
                        />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field dense v-model="currentDocument.title" label="Title"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field dense v-model="currentDocument.organization" label="Organization"></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-text-field dense v-model="currentDocument.description" label="Description"></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          dense
                          v-model="currentDocument.text"
                          label="Parsed file text excerpts (about first page)"
                          :disabled="!currentDocument.id"
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
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation, Action } from "vuex-class";
import { mutations, actions } from "@/plugins/store";
import { PaginatedApiResult } from "@/typing/paginations";
import { Watch, Mixins } from "vue-property-decorator";
import { CurrentDocumentMutationType, LoadingMutationType } from "@/typing/state/mutations";
import { Document } from "@/typing/document";
import { getEmptyDocument } from "@/plugins/store/store";
import {
  DocumentCreateActionType,
  DocumentUpdateActionType,
  DocumentDeleteActionType,
  DocumentloadActionType
} from "@/typing/state/actions";
import AsyncOpsControl from "@/mixins/async-ops-control.vue";

@Component({})
export default class ListDocuments extends Mixins(AsyncOpsControl) {
  @State("documents")
  documents!: PaginatedApiResult<Document>

  @Action(actions.ADMIN_CREATE_DOCUMENT)
  createDocument!: DocumentCreateActionType;

  @Action(actions.ADMIN_UPDATE_DOCUMENT)
  updateDocument!: DocumentUpdateActionType;

  @Action(actions.ADMIN_DELETE_DOCUMENT)
  deleteDocument!: DocumentDeleteActionType;

  @Action(actions.ADMIN_LOAD_DOCUMENTS)
  loadDocuments!: DocumentloadActionType;

  defaultHeader = { text: "", sortable: false, filterable: false }

  headers: any[] = [
    { ...this.defaultHeader, text: "ID", value: "id" },
    { ...this.defaultHeader, text: "Title", value: "title" },
    { ...this.defaultHeader, text: "Organization", value: "organization" },
    { ...this.defaultHeader, text: "Description", value: "description" },
    { ...this.defaultHeader, value: "actions" }
  ];
  dialog: boolean = false;
  file: File | null = null
  currentDocument: Document | null = null;

  get formTitle () {
    return this.currentDocument && this.currentDocument.id ? "Edit document" : "Create document";
  }

  mounted () {
    this.loadDocuments({});
  }

  @Watch("dialog", { immediate: true })
  handleDialogChange (val: boolean, prevVal: boolean) {
    if (typeof prevVal !== "undefined") {
      if (!val) {
        this.$nextTick(() => {
          this.currentDocument = null;
          this.file = null;
        });
      }
    }
  }

  @Watch("file", { immediate: true })
  handleFileChange (val: File) {
    if (!this.currentDocument) return;

    if (!this.currentDocument.title) {
      this.currentDocument.title = val.name;
    }
  }

  handleEdit (document: Document) {
    this.currentDocument = document;
    this.dialog = true;
  }

  handleCreate () {
    this.handleEdit(getEmptyDocument());
  }

  async handleSave () {
    const document = this.currentDocument;
    console.log(">> handleSave", document);

    if (!document) return;

    await this.runWithLoading(async () => {
      const result = document.id
        ? await this.updateDocument(document)
        : await this.createDocument({ ...document, file: this.file as File });

      if (result) {
        this.dialog = false;
      }
    });
  }

  handleDelete (document: Document) {
    if (confirm("Do you really want to delete document? This action cannot be reverted.")) {
      this.deleteDocument(document);
    }
  }
}
</script>
