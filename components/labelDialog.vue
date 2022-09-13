<template>
  <div>
    <v-card
      class="mx-auto pa-0 border-r-0"
      max-width="auto"
      width="255"
      height="auto"
    >
      <v-card-subtitle> label Note</v-card-subtitle>
      <v-container class="py-0 my-0" fluid>
        <v-row align="center" justify="start" class="pa-0 ma-0">
          <v-col cols="12" class="pa-0 ma-0">
            <v-text-field
              ref="search"
              v-model="search"
              full-width
              hide-details
              dense
              single-line
              solo
              small
              style="color: #c1a3a3"
            >
              <template v-slot:append-outer class="shadow-2xl">
                <v-icon small>mdi-magnify</v-icon>
              </template>
              <template v-slot:label> Enter Label Name </template></v-text-field
            >
            <v-divider class="pa-0 ma-0"></v-divider>
          </v-col>
          <v-list class="pa-0 ma-0">
            <template v-for="label in categories">
              <v-list-item
                v-if="!selected.includes(label) && label.id"
                :key="label.id"
                :disabled="loading"
                @click="
                  selected.push(label);
                  updateTasksLabel(label);
                "
                class="pa-1 ma-0 "
              >
                <v-list-item-title
                  v-text="label.name"
                  class="pa-0 ma-0 text-xs rounded-full"
                ></v-list-item-title>
              </v-list-item>
            </template>
          </v-list>

          <v-list class="pa-0 ma-0">
            <template v-for="label in categories">
              <v-list-item
                v-if="!label.id"
                :key="label"
                @click="addLabel"
                dense
              >
                <v-list-item-icon><v-icon> mdi-plus</v-icon></v-list-item-icon>
                <v-list-item-titlesi
                  class="pa-0 ma-0 text-xs"
                  v-text="'Create `' + search + '`'"
                ></v-list-item-titlesi>
              </v-list-item>
            </template>
          </v-list>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  mounted() {
    this.$store.dispatch(
      "Task/initLabels",
      window.localStorage.getItem("_labels_")
    );
  },
  data: () => ({
    loading: false,
    search: "",
    selected: [],
  }),
  props: {
    taskId: {
      type: Number,
      default: "",
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      labels: "Task/labels",
      selectedLabels: "Task/selectedLabels",
    }),
    thing() {
      return this.selectedLabels(this.taskId);
      // retrun console.log(this.selectedLabels(this.taskId));
    },

    allSelected() {
      return this.selected.length === this.labels.length;
    },
    categories() {
      const search = this.search.toLowerCase();

      if (!search) return this.labels;

      let a = this.labels.filter((label) => {
        const text = label.name.toLowerCase();
        return text.indexOf(search) > -1;
      });

      if (!a.length > 0) {
        return { name: `Create ${search}` };
      } else {
        return a;
      }
    },
  },

  watch: {
    selected() {
      this.search = "";
    },
  },

  methods: {
    addLabel() {
      this.$store.dispatch("Task/addlabel", this.search);
      this.search = "";
    },
    deleteLabel(id) {
      this.$store.dispatch("Task/deleteLabelFromTask", {
        taskid: this.taskId,
        labelid: id,
      });
    },
    updateTasksLabel(e) {
      this.$store.dispatch("Task/updateTasksLabel", {
        id: this.taskId,
        labels: e,
      });
    },
  },
};
</script>
<style scoped>
.v-list-item__title {
  font-size: 0.85rem !important;
}
.v-list-item__title:hover {
  background: none !important;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
  padding: 0 !important;
  background-color: transparent !important;
}
</style>