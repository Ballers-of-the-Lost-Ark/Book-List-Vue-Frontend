import Vue from "vue";
import "./plugins/axios old";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import AxiosPlugin from "./plugins/axios";

Vue.config.productionTip = false;

Vue.use(AxiosPlugin);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
