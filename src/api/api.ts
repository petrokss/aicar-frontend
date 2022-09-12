import axios, { Method, AxiosResponse } from 'axios';
import config from '../config';

const api = axios.create({ baseURL: config.hostBackendUrl });

export const request = <T>(
  method: Method,
  url: string,
  params: any = {},
): Promise<AxiosResponse<T>> => {
  return api.request<T>({
    method,
    url,
    ...params,
  });
};
