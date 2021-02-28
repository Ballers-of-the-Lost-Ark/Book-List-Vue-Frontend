import Vue from "vue";
import axios from "axios";
import {
  CustomAxiosRequestConfig,
  CustomAxiosInstance,
  CustomAxiosError,
  CustomAxiosResponse
} from "CustomAxios";
import store, { moduleNamespaces } from "../store/index";

const customConfig: CustomAxiosRequestConfig = {
  baseURL: "/",
  headers: {
    // set ajax as the requested type
    "X-Requested-With": "XMLHttpRequest",
    // set json as accept type
    Accept: "application/json"
  },
  // required for Laravel Sanctum
  withCredentials: true
  // transformResponse: r => {
  //     console.log(r);
  //     return <RequestModel[]>r.data;
  // }
};

const client: CustomAxiosInstance = axios.create(customConfig);

const requestHandler = (
  request: CustomAxiosRequestConfig
): CustomAxiosRequestConfig => {
  // set the content type for post and put
  if (request.method == "POST" || request.method == "PUT") {
    request.headers["Content-Type"] = "application/json";
  }

  return request;
};

const responseHandler = (
  response: CustomAxiosResponse<any>
): CustomAxiosResponse<any> => {
  if (response.config.showSuccess) {
    // show success message in vuex
    store.dispatch(
      `${moduleNamespaces.flashMessages}/changeSuccess`,
      response.config.showSuccess.message
    );
  }
  // response.config.transformResponse(res => {
  //     return res;
  // });
  return response;
};

// error structure for laravel 422
interface UnprocessableEntity {
  message: string;
  errors: Record<string, Array<string>>;
}

const errorHandler = (
  e: CustomAxiosError<any>
): Promise<CustomAxiosError<any>> => {
  Promise.reject({ ...e }).catch((error: CustomAxiosError<any>) => {
    // custom error handling
    if (error.config.customErrorHandling) {
      return Promise.reject(e);
    }

    // unprocessable entity
    if (error.response?.status === 422 && error.config.validate) {
      // show validation errors using vee-validate
      const serverErrors: UnprocessableEntity = error.response.data;
      error.config.validate.formValidationObserver.setErrors({
        ...serverErrors.errors
      });

      error.response.statusText = "Invalid fields";
    }

    let errorMessage = error.response?.statusText;
    if (!errorMessage) {
      errorMessage = "Something went wrong. Please try again";
    }

    // show error in vuex
    store.dispatch(
      `${moduleNamespaces.flashMessages}/changeError`,
      errorMessage
    );
  });

  return Promise.reject(e);
};

client.interceptors.request.use(
  // good request
  function(request: CustomAxiosRequestConfig) {
    return requestHandler(request);
  },
  // error
  function(error: CustomAxiosError<any>) {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  // good response
  // 2XX
  function(response: CustomAxiosResponse<any>) {
    return responseHandler(response);
  },
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  function(error: CustomAxiosError<any>) {
    return errorHandler(error);
  }
);

g.install = function(Vue: Vue, options: Record<string, any>) {
  Vue.$axios = client;
  // below is same as window
  //   (window as any).axios = client;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return client;
      }
    },
    $axios: {
      get() {
        return client;
      }
    }
  });
};

Vue.use(MyPlugin);

export default MyPlugin;
