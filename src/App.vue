<template>
  <v-app>
    <Nav></Nav>
    <v-main>
      <div :class="this.$route.name != 'index' ? 'pa-4' : ''">
        <router-view></router-view>
      </div>

      <Contact />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Nav from "@/views/layouts/Nav.vue";
import Contact from "@/views/layouts/Contact.vue";

@Component({
  components: {
    Nav,
    Contact
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
.h-100 {
  height: 100% !important;
}
.h-50 {
  height: 50% !important;
}
.w-70 {
  width: 70% !important;
}

.cursor {
  cursor: pointer !important;
}
</style>
