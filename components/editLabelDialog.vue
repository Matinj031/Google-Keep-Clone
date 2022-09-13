<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="300px">
        <v-card tile>
          <v-card-title>
            <span class="text-base">Edit labels</span>
          </v-card-title>
          <v-card-text class="pa-0 ma-0">
            <v-container fluid class="pa-2 m-0 overflow-hidden">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    dense
                    class="pa-0 ma-0 px-3"
                    v-model="message"
                    :append-outer-icon="iconCheck"
                    :prepend-icon="icon"
                    placeholder="Create new label"
                    type="text"
                    @click="setClearIcon()"
                    @click:append-outer="
                      sendMessage;
                      addlabel();
                    "
                    @click:prepend="changeIcon"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" v-for="label in labels" :key="label.id">
                  <v-text-field
                    dense
                    class="pa-0 ma-0 px-3"
                    :append-outer-icon="iconCheckLabel"
                    prepend-icon="mdi-delete"
                    placeholder="Enter lable Name"
                    type="text"
                    :value="label.name"
                    @input="updateMessageLabel"
                    ref="input"
                    @click:prepend="deletelabel(label.id)"
                    @click:append-outer="changeIconlabel(label.id)"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-divider class="mt-3"></v-divider>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn
              depressed
              plain
              small
              class="ml-52 my-3"
              @click="dialog = false ; "
            >
              Done
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: true,
    message: "",


    rules: {
        required: value => !!value || 'Required.'
    },

    labelMessage: "",
    iconIndex: 0,
    icons: ["mdi-close", "mdi-plus"],

    iconIndexForItem: 0,
    iconsItem: ["mdi-pencil-outline", "mdi-check"],
  }),
  computed: {
    ...mapGetters({
      labels: "Task/labels",
    }),
    icon() {
      return this.icons[this.iconIndex];
    },
    iconCheck() {
      return this.iconIndex === 0 ? "mdi-check" : "";
    },
    iconCheckLabel() {
      return this.iconsItem[this.iconIndexForItem];
    },
  },
  methods: {
    setClearIcon() {
      this.iconIndex = 0;
    },
    changeIconlabel(id) {
      this.iconIndexForItem === this.iconsItem.length - 1
        ? (this.iconIndexForItem = 0)
        : this.iconIndexForItem++;

      if (this.iconIndexForItem == 1) {
        let inputEl = this.$refs.input[0].$el.querySelector("input");
        inputEl.select();
      } else {
        this.updatelabel(id);
      }
    },
    sendMessage() {
      this.resetIcon();
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : (this.iconIndex++, (this.message = ""));
    },
    addlabel() {
      this.$store.dispatch("Task/addlabel", this.message);
      this.message = "";
    },
    deletelabel(id) {
      this.$store.dispatch("Task/deletelabel", id);
    },

    updateMessageLabel(val) {
      this.labelMessage = val;
    },
    updatelabel(id) {
      if (!!id) {
        this.$store.dispatch("Task/updateLabel", {
          id: id,
          newValue: this.labelMessage,
        });
      }
    },
  },
  mounted() {
    this.$store.dispatch(
      "Task/initLabels",
      window.localStorage.getItem("_labels_")
    );
    this.$nuxt.$on("textOfSearchbar", (searchQuery) => {
      this.searchedtext = searchQuery;
    });
  },
};
</script>
<style scoped></style>