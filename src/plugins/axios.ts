import _Vue from "vue";
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
  // eslint-disable-next-line
  response: CustomAxiosResponse<any>
  // eslint-disable-next-line
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
  // eslint-disable-next-line
  e: CustomAxiosError<any>
  // eslint-disable-next-line
): Promise<CustomAxiosError<any>> => {
  // eslint-disable-next-line
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
  // eslint-disable-next-line
  function(error: CustomAxiosError<any>) {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  // good response
  // 2XX
  // eslint-disable-next-line
  function(response: CustomAxiosResponse<any>) {
    return responseHandler(response);
  },
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // eslint-disable-next-line
  function(error: CustomAxiosError<any>) {
    return errorHandler(error);
  }
);

export default function AxiosPlugin(Vue: typeof _Vue): void {
  Vue.prototype.$http = client;
}
