declare module "CustomAxios" {
  import {
    AxiosRequestConfig,
    AxiosInstance,
    AxiosResponse,
    AxiosPromise,
    AxiosError
  } from "axios";
  import { ValidationObserver } from "vee-validate";

  // define a couple of new properties for request
  export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    customErrorHandling?: boolean;
    validate?: {
      formValidationObserver: InstanceType<typeof ValidationObserver>;
    };
    showSuccess?: {
      message: string;
    };
  }

  // keep everything the same except the config must be of type CustomAxiosRequestConfig
  export interface CustomAxiosError<T = any> extends AxiosError {
    config: CustomAxiosRequestConfig;
  }

  // keep everything the same except change the config type to our custom type
  export interface CustomAxiosResponse<T = any> extends AxiosResponse {
    config: CustomAxiosRequestConfig;
  }

  // everything is the same as the AxiosInstance except AxiosRequestConfig was changed CustomAxiosRequestConfig. Also interceptors.response returns CustomAxiosResponse instead of AxiosResponse
  // this allows us to have custom properties and responses
  export interface CustomAxiosInstance {
    (config: CustomAxiosRequestConfig): AxiosPromise;
    (url: string, config?: CustomAxiosRequestConfig): AxiosPromise;
    defaults: CustomAxiosRequestConfig;
    interceptors: {
      request: AxiosInterceptorManager<CustomAxiosRequestConfig>;
      response: AxiosInterceptorManager<CustomAxiosResponse>;
    };
    request<T = any>(config: CustomAxiosRequestConfig): AxiosPromise<T>;
    get<T = any>(
      url: string,
      config?: CustomAxiosRequestConfig
    ): AxiosPromise<T>;
    delete(url: string, config?: CustomAxiosRequestConfig): AxiosPromise;
    head(url: string, config?: CustomAxiosRequestConfig): AxiosPromise;
    post<T = any>(
      url: string,
      data?: any,
      config?: CustomAxiosRequestConfig
    ): AxiosPromise<T>;
    put<T = any>(
      url: string,
      data?: any,
      config?: CustomAxiosRequestConfig
    ): AxiosPromise<T>;
    patch<T = any>(
      url: string,
      data?: any,
      config?: CustomAxiosRequestConfig
    ): AxiosPromise<T>;
  }
}
