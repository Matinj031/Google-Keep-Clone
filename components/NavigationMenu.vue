<template>
  <v-navigation-drawer
    :mini-variant="mini"
    :expand-on-hover="mini"
    :key="mini"
    v-model="drawer"
    class="mt-2"
    permanent
    :floating="floating"
    absolute
  >
    <v-list :rounded="!isShaped" :shaped="isShaped">
      <v-list-item-group v-model="model" class="">
        <v-list-item
          class="flex flex-row items-center justify-between max-h-[36px] relative ma-0"
          active-class="bg-[#FEEFC3] font-bold block rounded-l-none"
          v-for="item in items"
          :key="item.icon"
          :to="'' + item.urlPage"
          reactive
        >
          <v-list-item-action>
            <v-btn icon active-class="bg-[##FEEFC3]" class="-ml-3">
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-btn>
          </v-list-item-action>

          <v-list-item-action-text>
            {{ item.textIcon }}
          </v-list-item-action-text>
        </v-list-item>

        <v-list-item
          class="flex flex-row items-center justify-between ml-2 max-h-[25px]"
          active-class="bg-[#FEEFC3] font-bold block "
          :transition-event="trasition"
          if="labels.length > 0"
          v-for="label in labels"
          :key="label.id"
          :to="`/label/${label.id}`"
        >
          <v-list-item-action class="ma-0 pa-0">
            <v-btn icon active-class="bg-[#FEEFC3]" class="-ml-3">
              <v-icon> mdi-tag-outline </v-icon>
            </v-btn>
          </v-list-item-action>

          <v-list-item-action-text>
            {{ label.name }}
          </v-list-item-action-text>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    model: [],
    drawer: true,
    mini: true,
    floating: true,
    items: [
      {
        icon: "mdi-lightbulb-outline",
        textIcon: "Notes",
        urlPage: "/",
      },
      {
        icon: "mdi-bell-outline",
        textIcon: "Reminders",
        urlPage: "/ReminderPage",
      },
      // {
      //   icon: "mdi-tag-outline",
      //   textIcon: "Label",
      //   urlPage: "/tagPage",
      // },
      {
        icon: "mdi-pencil-outline",
        textIcon: "Edit Table",
        urlPage: "/label",
      },
      {
        icon: "mdi-archive-arrow-down-outline",
        textIcon: "Archives",
        urlPage: "/archive",
      },
      {
        icon: "mdi-trash-can-outline",
        textIcon: "Trash",
        urlPage: "/trash",
      },
    ],
    isShaped: false,
  }),
  computed: {
    ...mapGetters({
      labels: "Task/labels",
    }),
  },
  props: {
    trasition: {
      type: String,
      default: "v-scroll-x-transition",
    },
  },
  watch: {
    mini(e) {
      if (e == true) {
        this.isShaped = false;
        this.floating = true;
      } else {
        this.isShaped = true;
        this.floating = false;
      }
    },
  },
  created() {
    this.$nuxt.$on("mini", (e) => {
      this.mini = e;
      this.floating = true;
    });
  },
  mounted() {
    this.$store.dispatch(
      "Task/initLabels",
      window.localStorage.getItem("_labels_")
    );
  },
};
</script>

<style scoped>
.v-navigation-drawer {
  height: auto !important;
  top: 4rem !important;
  left: 0 !important;
  margin-left: -0.4rem !important;
  width: 100%;
}

.v-list--nav .v-list-item:not(:last-child):not(:only-child),
.v-list--rounded .v-list-item:not(:last-child):not(:only-child) {
  margin-bottom: 10px !important;
}
.v-list-item {
  margin-bottom: 10px !important;
  min-height: 41px !important;
  padding: 1rem !important;
}

.v-list--rounded:hover .v-list-item,
.v-list--rounded:hover .v-list-item::before,
.v-list--rounded:hover .v-list-item > .v-ripple__container {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
</style>