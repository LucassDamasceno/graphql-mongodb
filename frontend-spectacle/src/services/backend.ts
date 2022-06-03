import { asClass, Resolver } from "awilix";
import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { IBackendService } from "../protocols/backend";
import { ISystem } from "../protocols/system";
import { store } from "../redux";

export class BackendService implements IBackendService {
  client: AxiosInstance;

  constructor({ configService }: Pick<ISystem, "configService">) {
    this.client = Axios.create({ baseURL: configService.backendUri });
  }

  async withCredentials(): Promise<void> {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      this.client.defaults.headers = {
        Authorization: `Bearer ${token}`,
      } as any;
    } else {
      this.client.defaults.headers = {} as any;
    }
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    await this.withCredentials();
    const res = await this.client.post(url, data, config);
    return res.data;
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    await this.withCredentials();
    const res = await this.client.put(url, data, config);
    return res.data;
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    await this.withCredentials();
    const res = await this.client.get(url, config);
    return res.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    await this.withCredentials();
    const res = await this.client.delete(url, config);
    return res.data;
  }
}

export const createBackendService = (): Resolver<IBackendService> =>
  asClass(BackendService).singleton();
