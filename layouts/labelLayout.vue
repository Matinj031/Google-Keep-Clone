<template>
  <v-app>
    <v-main>
      <app-bar />
      <add-bar />
      <v-container
        fluid
        class="ma-0 pa-0 flex flex-row items-start justify-between gap-8"
      >
        <navigation-menu trasition="v-scroll-x-transition" />
          

        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
    

};
</script>
<style scoped></style>
