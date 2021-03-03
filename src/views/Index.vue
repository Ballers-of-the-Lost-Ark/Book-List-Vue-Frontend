<template>
  <div id="index">
    <div class="pt-5 white--text ml-5 px-4">
      <h1 class="text-h3 text-sm-h2 text-lg-h1">Book Reading List</h1>
      <h2 class="text-subtitle-1 text-sm-h6 text-lg-h5 ml-lg-2 mt-4">
        Beware of the person of one book. -- Thomas Aquinas
      </h2>
    </div>

    <div class="h-50 d-flex flex-column align-center justify-center">
      <v-btn
        link
        :to="{ name: '' }"
        color="primary"
        outlined
        depressed
        x-large
        :elevation="10"
        class="d-inline-flex"
      >
        <span id="btn-text"> Expand Your Horizons </span>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Index extends Vue {}
</script>

<style scoped>
#index {
  height: 100vh !important;
  background-image: url(../assets/images/cat-3.jpg);
  /* background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(../assets/images/index/background.jpg); */
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  overflow-y: hidden;
}

/* white text on btn */
#btn-text {
  color: #fff !important;
}

.v-btn:hover:before,
.v-btn:focus:before {
  opacity: 0.5;
}
</style>
