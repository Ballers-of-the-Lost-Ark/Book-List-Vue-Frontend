<template>
  <v-navigation-drawer v-model="drawerModel" absolute temporary>
    <v-list nav>
      <v-list-item-group
        v-model="groupModel"
        active-class="deep-purple--text text--accent-4"
      >
        <CreatedBy :sidebar="true" />

        <v-list-item link :to="{ name: 'future_employers' }">
          <v-list-item-title>For Future Employers</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Register</v-list-item-title>
        </v-list-item>

        <v-list-item @click="openContact">
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import CreatedBy from "./CreatedBy.vue";
import { bus } from "../../main";

@Component({
  components: {
    CreatedBy
  }
})
export default class Sidebar extends Vue {
  // we must use getters and setters because we cannot v-model a prop
  @Watch("group")
  // eslint-disable-next-line
  onGroupChange(val: any): void {
    this.updateDrawer(val);
  }

  get drawerModel(): boolean {
    return this.drawer;
  }

  set drawerModel(val: boolean) {
    this.updateDrawer(val);
  }

  // eslint-disable-next-line
  get groupModel(): any {
    return this.group;
  }

  // eslint-disable-next-line
  set groupModel(val: any) {
    this.updateGroup(val);
  }

  @Prop({ required: true }) readonly drawer!: boolean;
  // eslint-disable-next-line
  @Prop({ required: true }) readonly group!: any;

  @Emit()
  updateDrawer(val: boolean) {
    return val;
  }

  @Emit()
  // eslint-disable-next-line
  updateGroup(val: any) {
    return val;
  }

  openContact() {
    bus.$emit("openContact", true);
  }
}
</script>
