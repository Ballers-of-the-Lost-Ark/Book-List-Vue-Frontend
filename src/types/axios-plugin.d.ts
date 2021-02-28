import { CustomAxiosInstance } from "CustomAxios";

declare module "vue/types/vue" {
  interface Vue {
    $http: CustomAxiosInstance;
  }
}
