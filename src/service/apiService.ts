import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

const headers = {
  "Content-Type": "application/json",
  "Accept-Language": "en",
};

class Http {
  instance: AxiosInstance;
  static api: { common: string };

  constructor() {
    this.instance = Http.createInstance({
      baseURL: `${import.meta.env.VITE_REACT_APP_BASE_URL || ''}/${this.getURLScope()}`,
      headers,
    });
  }

  static $displayName = "Http";

  static createInstance(config: AxiosRequestConfig): AxiosInstance {
    return axios.create(config);
  }

  getURLScope(): string {
    return "";
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.get(url, config);
  }
}

Http.api = {
  common: import.meta.env.VITE_REACT_APP_BASE_URL || '',
};

export default Http;
