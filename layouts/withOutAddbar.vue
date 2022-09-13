<template>
  <v-app>
    <v-main>
      <app-bar />
      <v-container
        fluid
        class="ma-0 pa-0 flex flex-row items-start justify-between gap-8 relative"
      >
        <navigation-menu trasition="v-scroll-x-transition" />
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "withOutAddbar",
};
</script>
<style scoped></style>
