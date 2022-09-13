<template>
  <div>
    <v-card max-width="100%" flat v-if="thing.length > 0" class="ml-28">
      <v-list>
        <v-subheader class="pa-5">Tasks associated with this label</v-subheader>
        <v-list-item-group
          class="flex basis-full flex-row flex-wrap items-start"
        >
          <task-item v-for="(task, i) in thing" :task="task" :key="i">
          </task-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <div v-else :class="{ showImg: !thing.length > 0 }">
      <EmptyLabelComponent />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import EmptyLabelComponent from "../../components/ui/emptyLabelComponent.vue";

export default {
  computed: {
    ...mapGetters({
      filtredTasks: "Task/filterByLabelId",
    }),
    thing() {
      return this.filtredTasks(this.$route.params.id);
    },
  },
  mounted() {
    this.$store.dispatch("Task/init", window.localStorage.getItem("_tasks_"));
  },
  components: { EmptyLabelComponent },
};
</script>
<style scoped>
.showImg {
  margin-top: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>