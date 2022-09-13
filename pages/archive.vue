<template>
  <v-container fluid class="pa-0">
    <div class="ml-16" v-if="ArchievedTasks.length > 0">
      <v-card max-width="100%" flat>
        <v-list>
          <v-subheader class="pa-5">Archived Tasks </v-subheader>
          <v-list-item-group
            class="flex basis-full flex-row flex-wrap items-start opacity-100"
          >
            <task-item
              v-for="(task, i) in ArchievedTasks"
              :task="task"
              :key="i"
              from="archive"
            >
              {{ task }}
            </task-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
    <div v-else :class="{ showImg: !reminders }">
      <ArchiveComponent />
    </div>
  </v-container>
</template>
<script>
import ArchiveComponent from "~/components/ui/archiveComponent.vue";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    reminders: false,
  }),
  components: { ArchiveComponent },
  computed: {
    ...mapGetters({
      ArchievedTasks: "Task/getArchivedTasks",
    }),
  },
  layout: "withOutAddbar",
  mounted() {
    this.$store.dispatch(
      "Task/initArchivedTasks",
      window.localStorage.getItem("_archivedTasks_")
    );
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