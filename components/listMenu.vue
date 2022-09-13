<template>
  <div>
    <v-row justify="center">
      <v-list elevation="2" dense v-if="value" v-click-outside="setShowFalse">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="checkWichFunctionCalled(i)"
        >
          <v-list-item-title style="color: #3c4043">
            {{
              i == 1
                ? task.labels.length > 0
                  ? "Edit Label"
                  : "add Label"
                : item.title
            }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-row>
    <label-dialog
      v-if="showLabelDialog == true"
      v-click-outside="clickOutSide"
      class="absolute top-full left-3/4 z-50"
      :taskId="task.id"
    />
  </div>
</template>
<script>
export default {
  data: () => ({
    showListItems: false,
    showLabelDialog: false,
    items: [
      {
        title: "Delete Note",
      },
      {
        title: "Change Labels",
      },
      {
        title: "Add Drawing",
      },
      {
        title: "Make a Copy",
      },
      {
        title: "Copy to Google Docs",
      },
    ],
  }),
  props: ["value", "task"],
  mounted() {
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    clickOutSide(e) {
      if (!!e) {
        this.showLabelDialog = false;
      }
    },

    checkWichFunctionCalled(index) {
      if (index == 0) {
        return this.deleteTask();
      }
      if (index == 1) {
        return this.checkLabels();
      }
      if (index == 3) {
        this.$store.dispatch("Task/makeAcopy", this.task.id);
      }
    },
    checkLabels() {
      if (this.task.labels.length > 0) {
        this.$emit("input", false);
        this.showLabelDialog = true;
      } else {
        this.$emit("input", false);
        this.showLabelDialog = true;
      }
    },
    deleteTask() {
      const minute = 1000 * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const year = day * 365;
      const d = new Date();
      let dayy = Math.round(d.getTime() / day);
      let id = this.task.id;
      this.$store.dispatch("Task/fakeRemove", {
        id,
        setedTime: dayy,
      });
      this.$emit("input", false);
    },

    onResize() {
      this.$emit("input", false);
    },
    setShowFalse(e) {
      if (e) {
        this.$emit("input", false);
      }
    },
  },
};
</script>
<style></style>