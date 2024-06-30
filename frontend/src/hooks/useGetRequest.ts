import { AxiosError } from "axios";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axiosClient from "../services/axiosClient";

export interface IUseGetRequest {
  key: string;
  url: string;
  options?: UseQueryOptions<object | any, AxiosError>;
  params?: object;
}

export const useGetRequest = (options: IUseGetRequest) => {
  const getQuery = useQuery({
    queryKey: [options.key, options.params],
    queryFn: ({ queryKey }) => {
      const [_key, params] = queryKey;
      return axiosClient.get(options.url, {
        params,
      }).then((res) => res.data);
    },
    ...options.options,
  });

  return getQuery;
};
