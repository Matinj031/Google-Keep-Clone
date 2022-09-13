<template>
  <v-container fluid class="pa-0">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          Use Google's location service?
        </v-card-title>
        <v-card-text
          >Empty trash? All notes in Trash will be permanently
          deleted.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Disagree
          </v-btn>

          <v-btn
            text
            color="blue"
            @click="
              deleteTasks();
              dialog = false;
            "
            small
            >Empty Trash</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div
      class="flex flex-row items-center justify-center gap-4 text-center mt-10"
    >
      <p class="mb-0">Notes in Trash are deleted after 7 days.</p>
      <v-btn
        text
        color="blue"
        @click="dialog = true"
        small
        v-if="deletedTasks.length > 0"
        >Empty Trash</v-btn
      >
    </div>

    <div class="ml-32" v-if="deletedTasks.length > 0">
      <v-card max-width="100%" flat>
        <v-list>
          <v-subheader class="pa-5">Deleted Task </v-subheader>
          <v-list-item-group
            class="flex basis-full flex-row flex-wrap items-start opacity-100"
          >
            <task-item
              v-for="(task, i) in deletedTasks"
              :task="task"
              :key="i"
              id="text"
              from="trash"
            >
            </task-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>

    <div v-else :class="{ showImg: !reminders }">
      <TrashCanComponent />
    </div>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import TrashCanComponent from "~/components/ui/trashCanComponent.vue";

export default {
  layout: "withOutAddbar",
  data: () => ({
    reminders: false,
    dialog: false,
  }),
  computed: {
    ...mapGetters({
      deletedTasks: "Task/deletedTasks",
    }),
  },
  components: { TrashCanComponent },
  mounted() {
    this.$store.dispatch(
      "Task/initDeletedTasks",
      window.localStorage.getItem("_deletedTasks_")
    );
  },
  methods: {
    deleteTasks() {
      this.$store.dispatch("Task/emptyfakeRemove");
    },
  },
};
</script>
<style scoped>
.showImg {
  margin-top: 10rem;
  display: flex;
  justify-content: center;
}
</style>