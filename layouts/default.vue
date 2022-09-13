<template>
  <v-app>
    <v-main>
      <modal-task />
      <app-bar />
      <add-bar />
      <v-container
        fluid
        class="ma-0 pa-0 flex flex-row items-start justify-between gap-8"
      >
        <navigation-menu />
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import modalTask from '~/components/modalTask.vue';

export default {
  components: { modalTask },
  data: () => ({
    snackbarStats: "",
    snackbarText: "",
    timeout: 2200,
    snackColor: "",
    taskId: "",

    mini: false,
  }),
  created() {
    this.$nuxt.$on("myevent", ($event) => this.test($event));
    this.$nuxt.$on("mini", (e) => {
      this.mini = e;
    });
  },
  
  methods: {
    test(e) {
      this.snackbarStats = e.snackbarStats;
      this.snackbarText = e.snackbarText;
      this.snackColor = e.snackColor;
      this.taskId = e.id;
    },
  },

};
</script>
<style scoped></style>
