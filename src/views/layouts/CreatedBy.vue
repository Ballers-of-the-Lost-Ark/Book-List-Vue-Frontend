<template>
  <v-btn
    href="https://github.com/Ballers-of-the-Lost-Ark"
    target="_blank"
    text
    :elevation="sidebar ? 1 : ''"
    :class="sidebar ? 'primary mb-4 mt-3' : ''"
  >
    <span class="mr-2">Created By Nick Zinn</span>
    <v-icon>mdi-open-in-new</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CreatedBy extends Vue {
  @Prop() readonly sidebar!: boolean | null;
}
</script>
