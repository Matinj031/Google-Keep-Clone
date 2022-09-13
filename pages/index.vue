<template>
  <v-container fluid class="pa-0">
    <div class="ml-16" v-if="showingImage">
      <v-card max-width="100%" flat v-if="pined.length > 0" class="ml-16">
        <v-list>
          <v-subheader class="pa-5">Pinned </v-subheader>
          <v-list-item-group
            class="flex basis-full flex-row flex-wrap items-start"
          >
            <task-item v-for="(task, i) in pined" :task="task" :key="i">
              <template v-slot:title v-if="resultQuery">
                <text-highlight v-if="resultQuery[0]" :queries="searchedtext">{{
                  resultQuery[0].title
                }}</text-highlight>
              </template>
            </task-item>
          </v-list-item-group>
        </v-list>
      </v-card>

      <v-card max-width="100%" flat v-if="resultQuery" class="ml-16">
        <v-list>
          <v-subheader class="pa-5">Tasks </v-subheader>
          <v-list-item-group
            class="flex basis-full flex-row flex-wrap items-start"
          >
            <task-item
              v-for="(task, i) in resultQuery"
              :task="task"
              :key="i"
              id="text"
            >
              <template v-slot:title>
                <text-highlight v-if="resultQuery[0]" :queries="searchedtext">{{
                  resultQuery[0].title
                }}</text-highlight>
              </template>
            </task-item>
          </v-list-item-group>
        </v-list>
      </v-card>

      <v-card max-width="100%" flat v-else-if="!resultQuery" class="ml-16">
        <v-list>
          <v-subheader class="pa-5">Pending Taks </v-subheader>
          <v-list-item-group
            class="flex basis-full flex-row flex-wrap items-start"
          >
            <task-item
              v-for="(task, i) in pendingTasks"
              :task="task"
              :key="i"
              id="text"
            />
          </v-list-item-group>
        </v-list>

        <v-list>
          <v-subheader class="pa-5">Done Tasks </v-subheader>
          <v-list-item-group
            class="flex basis-full flex-row flex-wrap items-start"
          >
            <task-item
              v-for="(task, i) in doneTasks"
              :task="task"
              :key="i"
              id="text"
              from="index"
            />
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
    <div v-else :class="{ showImg: !showingImage }">
      <LampImage />
    </div>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import LampImage from "~/components/ui/lampComponnet.vue";

export default {
  data: () => ({
    searchedtext: "",
    selectedTask: null,
  }),
  computed: {
    ...mapGetters({
      Tasks: "Task/tasks",
      doneTasks: "Task/doneTasks",
      pendingTasks: "Task/pendingTasks",
      pined: "Task/pinedTasks",
    }),

    resultQuery() {
      if (this.searchedtext) {
        return this.Tasks.filter((item) => {
          return this.searchedtext
            .toLowerCase()
            .split(" ")
            .every((v) => item.title.toLowerCase().includes(v));
        });
      }
    },
    showingImage() {
      return this.Tasks.length ? true : false;
    },
  },
  mounted() {
    this.$store.dispatch("Task/init", window.localStorage.getItem("_tasks_"));
    this.$nuxt.$on("textOfSearchbar", (searchQuery) => {
      this.searchedtext = searchQuery;
    });
  },
  components: { LampImage },
};
</script>
<style scoped>
.showImg {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
</style>