<template>
  <div>
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="dialog"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>Contact Me</v-toolbar>
          <v-card-text class="pb-0">
            <v-container class="mt-4">
              <v-row class="text-center" align-content="center">
                <v-col cols="12" sm="6">
                  <v-btn
                    link
                    href="tel:7205566704"
                    color="primary"
                    outlined
                    depressed
                  >
                    <v-icon left>mdi-phone</v-icon>
                    720-556-6704
                  </v-btn>
                  <v-icon right class="cursor" @click="copy('720-556-5604')"
                    >mdi-content-copy</v-icon
                  >
                </v-col>

                <v-col cols="12" sm="6">
                  <v-btn
                    link
                    href="mailto:nzinn43@gmail.com"
                    color="primary"
                    outlined
                    depressed
                    class="text-lowercase"
                  >
                    <v-icon left>mdi-email</v-icon>
                    nzinn43@gmail.com
                  </v-btn>

                  <v-icon
                    right
                    class="cursor"
                    @click="copy('nzinn43@gmail.com')"
                    >mdi-content-copy</v-icon
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions class="justify-end mt-0 pt-0">
            <v-btn text @click="dialog.value = false">Close</v-btn>
          </v-card-actions>

          <v-alert
            type="success"
            v-model="copied"
            border="left"
            close-text="Close Alert"
            dismissible
            >Copied</v-alert
          >
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { bus } from "../../main";
@Component
export default class Contact extends Vue {
  created() {
    bus.$on("openContact", (val: boolean) => {
      this.dialog = val;
    });
  }

  dialog = false;
  copied = false;

  async copy(val: string) {
    await navigator.clipboard.writeText(val);
    this.copied = true;
  }
}
</script>

<style scoped></style>
