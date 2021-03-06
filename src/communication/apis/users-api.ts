/* tslint:disable */
/* eslint-disable */
/**
 * QuizApi
 * No description proved (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosPromise, AxiosInstance } from "axios";
import { Configuration } from "../configuration";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from "../base";
import { GetUserResponse } from "../models";
import { IGeneralDto } from "../models";
import { PostUserRequest } from "../models";
import { PostUserResponse } from "../models";
import { PutUserRequest } from "../models";
/**
 * UsersApi - axios parameter creator
 * @export
 */
export const UsersApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @summary Delete user by
     * @param {*} [options] Overre http request option.
     * @throws {RequiredError}
     */
    usersDelete: async (options: any = {}): Promise<RequestArgs> => {
      // verify required parameter '' is not null or undefined

      const localVarPath = `/Users`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: "DELETE",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.query) {
        query.set(key, options.query[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Get user by
     * @param {*} [options] Overre http request option.
     * @throws {RequiredError}
     */
    usersGet: async (options: any = {}): Promise<RequestArgs> => {
      // verify required parameter '' is not null or undefined
      const localVarPath = `/Users`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.query) {
        query.set(key, options.query[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Updates user by
     * @param {PutUserRequest} [body]
     * @param {*} [options] Overre http request option.
     * @throws {RequiredError}
     */
    usersPut: async (
      body?: PutUserRequest,
      options: any = {}
    ): Promise<RequestArgs> => {
      // verify required parameter '' is not null or undefined
      const localVarPath = `/Users`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: "PUT",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.query) {
        query.set(key, options.query[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      const needsSerialization =
        typeof body !== "string" ||
        localVarRequestOptions.headers["Content-Type"] === "application/json";
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(body !== undefined ? body : {})
        : body || "";

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Creates a user
     * @param {PostUserRequest} [body] User information
     * @param {*} [options] Overre http request option.
     * @throws {RequiredError}
     */
    usersPost: async (
      body?: PostUserRequest,
      options: any = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/Users`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.query) {
        query.set(key, options.query[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      const needsSerialization =
        typeof body !== "string" ||
        localVarRequestOptions.headers["Content-Type"] === "application/json";
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(body !== undefined ? body : {})
        : body || "";

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * UsersApi - functional programming interface
 * @export
 */
export const UsersApiFp = function (configuration?: Configuration) {
  return {
    /**
     *
     * @summary Delete user by
     * @param {*} [options] Overre http request option.
     * @throws {RequiredError}
     */
    async usersDelete(
      options?: any
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs = await UsersApiAxiosParamCreator(
        configuration
      ).usersDelete(options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @summary Get user by
     * @param {*} [options] Overre http request option.
     * @throws {RequiredError}
     */
    async usersGet(
      options?: any
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<GetUserResponse>
    > {
      const localVarAxiosArgs = await UsersApiAxiosParamCreator(
        configuration
      ).usersGet(options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @summary Updates user by
     * @param {PutUserRequest} [body]
     * @param {*} [options] Overre http request option.
     * @throws {RequiredError}
     */
    async usersPut(
      body?: PutUserRequest,
      options?: any
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<PostUserResponse>
    > {
      const localVarAxiosArgs = await UsersApiAxiosParamCreator(
        configuration
      ).usersPut(body, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @summary Creates a user
     * @param {PostUserRequest} [body] User information
     * @param {*} [options] Overre http request option.
     * @throws {RequiredError}
     */
    async usersPost(
      body?: PostUserRequest,
      options?: any
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<PostUserResponse>
    > {
      const localVarAxiosArgs = await UsersApiAxiosParamCreator(
        configuration
      ).usersPost(body, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
  };
};

/**
 * UsersApi - factory interface
 * @export
 */
export const UsersApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  return {
    /**
     *
     * @summary Delete user by
     * @param {string}   of the user
     * @param {*} [options] Overre http request option.
     * @throws {RequiredError}
     */
    usersDelete(options?: any): AxiosPromise<void> {
      return UsersApiFp(configuration)
        .usersDelete(options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Get user by
     * @param {string}   of the user
     * @param {*} [options] Overre http request option.
     * @throws {RequiredError}
     */
    usersGet(options?: any): AxiosPromise<GetUserResponse> {
      return UsersApiFp(configuration)
        .usersGet(options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Updates user by
     * @param {string}
     * @param {PutUserRequest} [body]
     * @param {*} [options] Overre http request option.
     * @throws {RequiredError}
     */
    usersPut(
      body?: PutUserRequest,
      options?: any
    ): AxiosPromise<PostUserResponse> {
      return UsersApiFp(configuration)
        .usersPut(body, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Creates a user
     * @param {PostUserRequest} [body] User information
     * @param {*} [options] Overre http request option.
     * @throws {RequiredError}
     */
    usersPost(
      body?: PostUserRequest,
      options?: any
    ): AxiosPromise<PostUserResponse> {
      return UsersApiFp(configuration)
        .usersPost(body, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * UsersApi - object-oriented interface
 * @export
 * @class UsersApi
 * @extends {BaseAPI}
 */
export class UsersApi extends BaseAPI {
  /**
   *
   * @summary Delete user by
   * @param {string}   of the user
   * @param {*} [options] Overre http request option.
   * @throws {RequiredError}
   * @memberof UsersApi
   */
  public usersDelete(options?: any) {
    return UsersApiFp(this.configuration)
      .usersDelete(options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Get user by
   * @param {string}   of the user
   * @param {*} [options] Overre http request option.
   * @throws {RequiredError}
   * @memberof UsersApi
   */
  public usersGet(options?: any) {
    return UsersApiFp(this.configuration)
      .usersGet(options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Updates user by
   * @param {string}
   * @param {PutUserRequest} [body]
   * @param {*} [options] Overre http request option.
   * @throws {RequiredError}
   * @memberof UsersApi
   */
  public usersPut(body?: PutUserRequest, options?: any) {
    return UsersApiFp(this.configuration)
      .usersPut(body, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Creates a user
   * @param {PostUserRequest} [body] User information
   * @param {*} [options] Overre http request option.
   * @throws {RequiredError}
   * @memberof UsersApi
   */
  public usersPost(body?: PostUserRequest, options?: any) {
    return UsersApiFp(this.configuration)
      .usersPost(body, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
