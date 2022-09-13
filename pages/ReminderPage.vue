<template>
  <v-container fluid class="pa-0">
    <div class="ml-16" v-if="reminders">
      <!-- <v-card max-width="100%" flat v-if="resultQuery">
        <v-list>
          <v-subheader class="pa-5">Tasks </v-subheader>
          <v-list-item-group
            class="flex basis-full flex-row flex-wrap items-start opacity-100"
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
      </v-card> -->
    </div>
    <div v-else :class="{ showImg: !reminders }">
      <BellComponent />
    </div>
  </v-container>
</template>
<script>
import BellComponent from "~/components/ui/bellComponent.vue";

export default {
  data: () => ({
    reminders: false,
  }),
  components: { BellComponent },
};
</script>
<style scoped>
.showImg {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
</style>