<template>
  <v-container class="pa-0 ma-0" fluid>
    <v-row align="center" class="overflow-hidden">
      <v-col cols="12">
        <v-app-bar elevation="1" flat color="#FFFFFF" class="border-orange-600">
          <v-text-field
            v-model="searchQuery"
            v-if="checkStats"
            light
            solo
            prepend-inner-icon="mdi-arrow-left-thin"
            background-color="grey lighten-4"
            placeholder="Search"
            flat
            hide-details
            clearable
            autofocus
            class="rounded-lg d-flex d-sm-none"
            @click:prepend-inner="checkStats = false"
          ></v-text-field>

          <v-app-bar-nav-icon
            class="ml-0.5"
            v-if="visible"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
          <v-toolbar-title v-if="visible">
            <nuxt-link to="/" class="flex items-center">
              <v-img width="35" height="35" src="/keep_2020q4_48dp.png"></v-img>
              <p class="mb-0 pl-0.5 text-h6 font-weight-regular black--text">
                Keep
              </p>
            </nuxt-link>
          </v-toolbar-title>

          <v-text-field
            v-model="searchQuery"
            light
            solo
            background-color="grey lighten-4"
            placeholder="Search"
            flat
            hide-details
            clearable
            autofocus
            class="rounded-lg d-none d-sm-flex ml-10"
          >
            <v-icon
              slot="prepend-inner"
              color="poobrown"
              class="cursor-pointer"
            >
              mdi-magnify
            </v-icon>
          </v-text-field>

          <v-spacer></v-spacer>

          <v-btn
            icon
            class="d-flex d-sm-none"
            @click="checkStats = !checkStats"
            v-if="!checkStats"
          >
            <v-icon ref="icon">mdi-magnify</v-icon>
          </v-btn>

          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" icon v-on="on">
                <v-icon ref="icon">mdi-refresh</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h5"> Are you sure? </v-card-title>
              <v-card-text>you wanna delete all your data?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">
                  Disagree
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  @click="
                    dialog = false;
                    ResetAll();
                  "
                >
                  Agree
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn icon>
            <v-icon ref="icon">mdi-view-list-outline</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon ref="icon">mdi-cog</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon ref="icon">mdi-apps</v-icon>
          </v-btn>

          <v-btn icon>
            <v-avatar size="32">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </v-btn>
        </v-app-bar>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: true,
    checkStats: false,
    dialog: false,
    searchQuery: null,
  }),
  methods: {
    ResetAll() {
      this.$store.dispatch("Task/fakeRemoveAll");
    },
  },
  watch: {
    searchQuery() {
      this.$nuxt.$emit("textOfSearchbar", this.searchQuery);
    },
    drawer() {
      $nuxt.$emit("mini", this.drawer);
    },
  },
  computed: {
    ...mapGetters({
      Tasks: "Task/tasks",
    }),
    visible() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          if (this.checkStats == true) {
            return false;
          }
        case "sm":
          return true;
        case "md":
          return true;
        case "lg":
          return true;
        case "xl":
          return true;
      }
    },
    resultQuery() {
      if (this.searchQuery) {
        return this.Tasks.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.Tasks;
      }
    },
  },
};
</script>
<style soped>
.v-application .ml-2 {
  margin: 0 !important;
}
</style>
