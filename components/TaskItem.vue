<template>
  <div>
 <div class="relative" v-if="showTaskItem">
    <v-hover v-slot="{ hover }" :value="false" class="cursor-pointer">
      <v-card
        @click.self="logHelloworld"
        :ripple="false"
        @dblclick="changeContent = !changeContent"
        :color="selectedColor"
        :dark="themeColorActive == 'dark' ? true : false"
        min-width="200"
        max-width="250"
        width="auto"
        height="auto"
        flat
        relative
        :class="{ 'on-hover': hover }"
        class="my-2 mr-6 cursor-pointer rounded-lg relative border-8"
      >
        <v-card-text class="pa-0 ma-0 inline-block overflow-hidden w-full">
          <v-img
            :src="`${task.Background}` || ''"
            :lazy-src="`${task.Background}` || ''"
            max-height="180"
            max-width="300"
          ></v-img>
        </v-card-text>
        <v-list-item
          :ripple="false"
          inactive
          :light="themeColorActive == 'light' ? true : false"
          class="pa-0 ma-0"
        >
          <v-list-item-content class="pa-0 ma-0">
            <v-form lazy-validation ref="myForm">
              <v-list-item-title class="pa-0 ma-0">
                <slot name="title"> </slot>
                <v-text-field
                  background-color="transparent"
                  :value="task.title"
                  solo
                  flat
                  :autofocus="false"
                  :rules="[rules.required, rules.TitleTextlenght]"
                  :disabled="!changeContent"
                  height="5px"
                  class="min-h-0 h-9 pa-0 ma-0"
                ></v-text-field>
              </v-list-item-title>

              <v-list-item-subtitle>
                <v-text-field
                  background-color="transparent"
                  :value="task.description"
                  solo
                  flat
                  :rules="[rules.required, rules.DescriptionTextlenght]"
                  :disabled="!changeContent"
                  @keydown.enter="openDialog('change')"
                  height="5px"
                  class="min-h-0 h-9 pa-0 ma-0"
                >
                </v-text-field>
              </v-list-item-subtitle>
            </v-form>

            <v-dialog v-model="dialog" max-width="250" light>
              <v-card>
                <v-card-title class="text-h5">
                  {{ DialogHeader }}
                </v-card-title>

                <v-card-text>
                  {{ DialogText }}
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="green darken-1"
                    text
                    @click="mutationTask(`${dialogType}`)"
                  >
                    {{ DialogHeader }}
                  </v-btn>

                  <v-btn color="red darken-1" text @click="dialog = false">
                    cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item-content>
        </v-list-item>

        <v-row align="center" justify="start" class="mt-5 px-2">
          <v-col
            v-for="selection in task.labels"
            :key="selection.id"
            class="shrink pa-2"
          >
            <v-chip close @click:close="deleteLabel(selection.id)">
              {{ selection.name }}
            </v-chip>
          </v-col>
        </v-row>

        <v-card-actions
          class="pa-0 ma-0 relative my-4 mt-12 bottom-0 right-0"
          v-if="from == 'index'"
        >
          <div class="flex items-center justify-end opacity-60">
            <v-btn
              :class="{
                'show-btns': hover,
                darkTheme: themeColorActive == 'dark',
              }"
              color="transparent"
              icon
              @click="changeStats"
              title="Change Stats"
            >
              <v-icon
                :class="{
                  'show-btns': hover,
                  darkTheme: themeColorActive == 'dark',
                  lightTheme: themeColorActive == 'light',
                }"
              >
                {{ Icon }}
              </v-icon>
            </v-btn>

            <v-btn
              :class="{
                'show-btns': hover,
                darkTheme: themeColorActive == 'dark',
              }"
              color="transparent"
              icon
              @click="addToArchive()"
              title="Archive Task"
            >
              <v-icon
                :class="{
                  'show-btns': hover,
                  darkTheme: themeColorActive == 'dark',
                  lightTheme: themeColorActive == 'light',
                }"
              >
                mdi-archive-arrow-down-outline
              </v-icon>
            </v-btn>

            <v-btn
              :class="{ 'show-btns': hover }"
              color="transparent"
              icon
              @click="openDialog('delete')"
              title="Delete"
            >
              <v-icon
                :class="{
                  'show-btns': hover,
                  darkTheme: themeColorActive == 'dark',
                  lightTheme: themeColorActive == 'light',
                }"
              >
                mdi-trash-can
              </v-icon>
            </v-btn>

            <div>
              <v-btn
                :class="{ 'show-btns': hover }"
                color="transparent"
                depressed
                icon
                :loading="isSelecting"
                @click="onButtonClick"
                title="add Image"
              >
                <v-icon
                  :class="{
                    'show-btns': hover,
                    darkTheme: themeColorActive == 'dark',
                    lightTheme: themeColorActive == 'light',
                  }"
                >
                  mdi-image
                </v-icon>
              </v-btn>
              <input
                ref="uploader"
                class="d-none"
                type="file"
                accept="image/*"
                @change="onFileChanged"
              />
            </div>

            <v-btn
              :class="{ 'show-btns': hover }"
              color="transparent"
              icon
              @click="ShowColorCanves = !ShowColorCanves"
              title="Change Color"
            >
              <v-icon
                :class="{
                  'show-btns': hover,
                  darkTheme: themeColorActive == 'dark',
                  lightTheme: themeColorActive == 'light',
                }"
              >
                mdi-brush-variant
              </v-icon>
            </v-btn>

            <v-btn
              :class="{ 'show-btns': hover }"
              color="transparent"
              icon
              title="Add Label"
              @click="showListMenu = true"
            >
              <v-icon
                :class="{
                  'show-btns': hover,
                  darkTheme: themeColorActive == 'dark',
                  lightTheme: themeColorActive == 'light',
                }"
              >
                mdi-dots-vertical
              </v-icon>
            </v-btn>

            <!-- <v-btn
              :class="{ 'show-btns': hover }"
              color="transparent"
              icon
              title="Add Label"
              @click="showLabelDialog = !showLabelDialog"
            >
              <v-icon
                :class="{
                  'show-btns': hover,
                  darkTheme: themeColorActive == 'dark',
                  lightTheme: themeColorActive == 'light',
                }"
              >
                mdi-label-outline
              </v-icon>
            </v-btn> -->
          </div>
          <v-row
            class="absolute top-10 left-0 z-50"
            align="center"
            justify="center"
            v-if="ShowColorCanves"
          >
            <v-col cols="12">
              <v-color-picker
                v-model="colorSe"
                hide-mode-switch
                flat
                width="150"
                hide-inputs
                v-click-outside="onClickOutside"
              ></v-color-picker>
            </v-col>
          </v-row>
        </v-card-actions>

        <v-card-actions
          class="pa-0 ma-0 relative my-4 bottom-0 right-0"
          v-if="from == 'archive'"
        >
          <div class="flex items-center justify-end opacity-60">
            <v-btn
              :class="{
                'show-btns': hover,
                darkTheme: themeColorActive == 'dark',
              }"
              color="transparent"
              icon
              @click="changeStats"
              title="Change Stats"
            >
              <v-icon
                :class="{
                  'show-btns': hover,
                  darkTheme: themeColorActive == 'dark',
                  lightTheme: themeColorActive == 'light',
                }"
              >
                {{ Icon }}
              </v-icon>
            </v-btn>

            <v-btn
              :class="{
                'show-btns': hover,
                darkTheme: themeColorActive == 'dark',
              }"
              color="transparent"
              icon
              @click="addToArchive()"
              title="Archive Task"
            >
              <v-icon
                :class="{
                  'show-btns': hover,
                  darkTheme: themeColorActive == 'dark',
                  lightTheme: themeColorActive == 'light',
                }"
              >
                mdi-archive-arrow-down-outline
              </v-icon>
            </v-btn>

            <!-- <v-btn
            :class="{
              'show-btns': hover,
              darkTheme: themeColorActive == 'dark',
            }"
            color="transparent"
            icon
            @click="removeFromArchive()"
            title="Archive Task"
          >
            <v-icon
              :class="{
                'show-btns': hover,
                darkTheme: themeColorActive == 'dark',
                lightTheme: themeColorActive == 'light',
              }"
            >
              mdi-archive-arrow-down-outline
            </v-icon>
          </v-btn> -->

            <!-- <v-btn
            :class="{ 'show-btns': hover }"
            color="transparent"
            icon
            @click="DeleteTask"
            title="Delete"
          >
            <v-icon
              :class="{
                'show-btns': hover,
                darkTheme: themeColorActive == 'dark',
                lightTheme: themeColorActive == 'light',
              }"
            >
              mdi-trash-can
            </v-icon>
          </v-btn> -->

            <v-btn
              :class="{ 'show-btns': hover }"
              color="transparent"
              icon
              @click="openDialog('delete')"
              title="Delete"
            >
              <v-icon
                :class="{
                  'show-btns': hover,
                  darkTheme: themeColorActive == 'dark',
                  lightTheme: themeColorActive == 'light',
                }"
              >
                mdi-trash-can
              </v-icon>
            </v-btn>

            <!-- <v-btn
            :class="{ 'show-btns': hover }"
            color="transparent"
            icon
            @click="restoreData()"
            title="restore"
          >
            <v-icon
              :class="{
                'show-btns': hover,
                darkTheme: themeColorActive == 'dark',
                lightTheme: themeColorActive == 'light',
              }"
            >
              mdi-backup-restore
            </v-icon>
          </v-btn> -->

            <div>
              <v-btn
                :class="{ 'show-btns': hover }"
                color="transparent"
                depressed
                icon
                :loading="isSelecting"
                @click="onButtonClick"
                title="add Image"
              >
                <v-icon
                  :class="{
                    'show-btns': hover,
                    darkTheme: themeColorActive == 'dark',
                    lightTheme: themeColorActive == 'light',
                  }"
                >
                  mdi-image
                </v-icon>
              </v-btn>
              <input
                ref="uploader"
                class="d-none"
                type="file"
                accept="image/*"
                @change="onFileChanged"
              />
            </div>

            <v-btn
              :class="{ 'show-btns': hover }"
              color="transparent"
              icon
              @click="ShowColorCanves = !ShowColorCanves"
              title="Change Color"
            >
              <v-icon
                :class="{
                  'show-btns': hover,
                  darkTheme: themeColorActive == 'dark',
                  lightTheme: themeColorActive == 'light',
                }"
              >
                mdi-brush-variant
              </v-icon>
            </v-btn>
          </div>

          <v-row
            class="absolute top-10 left-0 z-50"
            align="center"
            justify="center"
            v-if="ShowColorCanves"
          >
            <v-col cols="12">
              <v-color-picker
                v-model="colorSe"
                hide-mode-switch
                flat
                width="150"
                hide-inputs
                v-click-outside="onClickOutside"
              ></v-color-picker>
            </v-col>
          </v-row>
        </v-card-actions>

        <v-card-actions
          class="pa-0 ma-0 relative py-4 bottom-0 right-0"
          v-if="from == 'trash'"
        >
          <div class="flex items-center justify-end opacity-60">
            <v-btn
              :class="{ 'show-btns': hover }"
              color="transparent"
              icon
              @click="DeleteTask"
              title="Delete"
            >
              <v-icon
                :class="{
                  'show-btns': hover,
                  darkTheme: themeColorActive == 'dark',
                  lightTheme: themeColorActive == 'light',
                }"
              >
                mdi-trash-can
              </v-icon>
            </v-btn>

            <v-btn
              :class="{ 'show-btns': hover }"
              color="transparent"
              icon
              @click="restoreData()"
              title="restore"
            >
              <v-icon
                :class="{
                  'show-btns': hover,
                  darkTheme: themeColorActive == 'dark',
                  lightTheme: themeColorActive == 'light',
                }"
              >
                mdi-backup-restore
              </v-icon>
            </v-btn>
          </div>
        </v-card-actions>

        <v-card-actions
          class="pa-0 ma-0"
          v-if="from == 'index' || from == 'archive'"
        >
          <v-btn
            ripple
            :class="{
              'show-btns': hover,
              darkTheme: themeColorActive == 'dark',
            }"
            style="position: absolute; top: 3%; right: 3%"
            color="transparent"
            icon
            @click="
              updatePin();
              pinToggle = !pinToggle;
            "
            title="Pin task"
            class="absolute top- right-0"
          >
            <v-icon
              :class="{
                'show-btns': hover,
                darkTheme: themeColorActive == 'dark',
                lightTheme: themeColorActive == 'light',
              }"
            >
              {{ pinIconName }}
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
    <label-dialog
      v-if="showLabelDialog == true"
      class="absolute top-full left-3/4 z-50"
      :taskId="task.id"
    />

    <list-menu
      v-model="showListMenu"
      class="absolute top-full left-3/4 z-50"
      :task="task"
    />

  </div>
  </div>
 
</template>
<script>
import { mapGetters } from "vuex";
import { state } from "~/store/Task";
import LabelDialog from "./labelDialog.vue";
import ListMenu from "./listMenu.vue";
import ModalTask from './modalTask.vue';

export default {
  data: () => ({
    // readyLabels: [],

    showTaskItem: true,
    showModalTask:false,

    pinToggle: false,
    selectedFile: null,
    isSelecting: false,
    dialog: false,
    dialogType: "",
    DialogHeader: "",
    DialogText: "",
    taskId: "",
    image: null,
    url: null,
    showLabelDialog: false,
    changeContent: false,
    dataloaded: false,
    selectedColor: "",
    ShowColorCanves: false,
    themeColorActive: "",

    showListMenu: false,

    snack: {
      delete: {
        snackbarStats: true,
        snackbarText: "deleted",
        snackColor: "error",
        id: "",
      },
      updated: {
        snackbarStats: true,
        snackbarText: "updated",
        snackColor: "success",
        id: "",
      },
    },
    types: ["hex", "hexa", "rgba", "hsla", "hsva"],
    type: "hex",
    hex: "#FF00FF",
    hexa: "#FF00FFFF",
    rgba: { r: 255, g: 0, b: 255, a: 1 },
    hsla: { h: 300, s: 1, l: 0.5, a: 1 },
    hsva: { h: 300, s: 1, v: 1, a: 1 },
    rules: {
      required: (v) => !!v || "Required",
      TitleTextlenght: (v) =>
        (!!v && v.length > 3) || "Title at least Should have 4 char",
      DescriptionTextlenght: (v) =>
        (!!v && v.length > 7) || "Description at least Should have 8 char",
    },
  }),
  props: {
    task: {
      type: Object,
      default: false,
    },
    from: {
      type: String,
      require: false,
      default: "index",
    },
  },
  methods: {
    logHelloworld() {
      this.showModalTask = true;
      this.showTaskItem = false;
    },
    deleteLabel(id) {
      this.$store.dispatch("Task/deleteLabelFromTask", {
        taskid: this.task.id,
        labelid: id,
      });
    },
    changeStats() {
      this.$store.dispatch("Task/done", {
        id: this.task.id,
        done: !this.task.done,
      });
    },
    addToArchive() {
      let id = this.task.id;
      this.$store.dispatch("Task/addArchive", id);
    },
    removeFromArchive() {
      let id = this.task.id;
      this.$store.dispatch("Task/removeFromArchive", id);
    },
    DeleteTask() {
      let id = this.task.id;
      this.$store.dispatch("Task/remove", id);
    },
    restoreData() {
      let id = this.task.id;
      this.$store.dispatch("Task/restoreFakeRemove", id);
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    updatePin() {
      this.$store.dispatch("Task/updatePinToggle", this.task.id);
    },
    async changeImage(e) {
      //  this.url= URL.createObjectURL(this.image)
      let imgSrc = await this.toBase64(e);
      this.$store.dispatch("Task/changeBackground", {
        id: this.task.id,
        NewBackground: imgSrc,
      });
    },
    onClickOutside() {
      this.ShowColorCanves = false;
    },
    changeColor() {
      this.$store.dispatch("Task/changeColor", {
        id: this.task.id,
        bgcolor: this.selectedColor,
        textColor: this.themeColorActive,
      });
    },
    mutationTask(s) {
      const minute = 1000 * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const year = day * 365;
      const d = new Date();
      let dayy = Math.round(d.getTime() / day);
      let taskId = this.task.id;
      if (s == "delete") {
        this.$store.dispatch("Task/fakeRemove", {
          id: taskId,
          setedTime: dayy,
        });
        $nuxt.$emit("myevent", this.snack.delete);
      } else if (s == "change" || s == "Update" || "edit") {
        this.$store.dispatch("Task/changeContent", {
          id: this.task.id,
          title: this.$refs.myForm.$children[0].internalValue,
          description: this.$refs.myForm.$children[1].internalValue,
        });
        this.$nuxt.$emit("myevent", this.snack.updated);
      }
      this.dialog = false;
    },
    openDialog(type) {
      if (!!type) {
        this.dialogType = type;
        if (type == "delete") {
          this.DialogHeader = "Delete";
          this.DialogText = `Are you sure you want to delete task ${this.task.id}?`;
        } else {
          this.DialogHeader = "Edit";
          this.DialogText = `Are you sure you want to Edit task ${this.task.id}?`;
        }
        this.dialog = true;
      }
    },
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.image = e.target.files[0];
      this.changeImage(this.image);
    },
  },
  computed: {
    ...mapGetters({
      colors: "Task/colors",
    }),
    Icon() {
      return this.task.done ? "mdi-check" : "mdi-reload-alert";
    },
    colorSe: {
      get() {
        return this[this.type];
      },
      set(v) {
        this.selectedColor = v;
      },
    },
    pinIconName() {
      return this.pinToggle == true ? "mdi-pin" : "mdi-pin-outline";
    },
  },
  created() {
    this.selectedColor = this.task.bgcolor;
    this.themeColorActive = this.task.textColor;
    this.changeContent = false;
    this.snack.delete.id = this.task.id;
    this.snack.updated.id = this.task.id;
  },
  mounted() {
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;
    const d = new Date();
    let Today = Math.round(d.getTime() / day);
    let id = this.task.id;
    if (!!this.task.setedTime) {
      let diff = this.task.setedTime - Today;
      if (diff >= 7) {
        this.$store.dispatch("Task/fakeRemoveById", id);
        console.log("task has expired");
      }
    }
    if (this.task.pinStats) {
      this.pinToggle = this.task.pinStats;
    }

    this.$nuxt.$on("labels", (labels) => {
      this.$store.dispatch("Task/updateTasksLabel", {
        id: this.task.id,
        labels,
      });
    });
  },
  watch: {
    selectedColor: function (e) {
      if (!!this.dataloaded) {
        if (!!e) {
          var e = e.substring(1);
          var rgb = parseInt(e, 16);
          var r = (rgb >> 16) & 255;
          var g = (rgb >> 8) & 255;
          var b = (rgb >> 0) & 255;
          var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          if (luma < 40) {
            this.themeColorActive = "dark";
          } else {
            this.themeColorActive = "light";
          }
          return this.changeColor();
        }
      } else {
        this.dataloaded = true;
      }
    },
  },
  components: { LabelDialog, ListMenu, ModalTask },
};
</script>
<style scoped>
.v-card {
  border: 0.1rem solid rgba(128, 121, 121, 0.206) !important;
}
</style>