<template>
  <nav :class="this.$route.name != 'index' ? 'mb-5' : ''">
    <v-app-bar app dark class="primary px-lg-5">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="d-lg-none"
      ></v-app-bar-nav-icon>

      <router-link
        :to="{ name: 'index' }"
        class="white--text text-decoration-none"
      >
        <h3>Book Reading List</h3>
      </router-link>

      <v-spacer></v-spacer>

      <div class="d-none d-lg-flex flew-row justify-content-around">
        <v-tabs background-color="primary">
          <!-- below is for when none of the tabs are active. This prevents Vuetify from underlining For Future Employers (which would be the first tab). We must keep the :to prop -->
          <v-tab link :to="{ name: 'index' }" class="d-none"></v-tab>

          <v-tab link :to="{ name: 'future_employers' }">
            For Future Employers
          </v-tab>

          <v-tab link :to="{}"> Login </v-tab>

          <v-tab link :to="{}"> Register </v-tab>

          <v-tab link @click="openContact"> Contact </v-tab>
        </v-tabs>
      </div>

      <v-spacer></v-spacer>

      <div id="created-by-container" class="d-none">
        <CreatedBy />
      </div>
    </v-app-bar>

    <Sidebar
      :drawer="drawer"
      :group="group"
      @update-drawer="updateDrawer"
      @update-group="updateGroup"
    ></Sidebar>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Sidebar from "./Sidebar.vue";
import CreatedBy from "./CreatedBy.vue";
import { bus } from "../../main";

@Component({
  components: {
    Sidebar,
    CreatedBy
  }
})
export default class Nav extends Vue {
  drawer = false;
  // eslint-disable-next-line
  group: any = null;

  updateDrawer(val: boolean) {
    this.drawer = val;
  }

  // eslint-disable-next-line
  updateGroup(val: any) {
    this.group = val;
  }

  openContact() {
    bus.$emit("openContact", true);
  }
}
</script>

<style scoped lang="scss">
// custom breakpoint
@media (min-width: 480px) {
  #created-by-container {
    display: inline-flex !important;
  }
}
</style>
