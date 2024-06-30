import { UseMutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../services/axiosClient";
import { AxiosError } from "axios";

interface IUsePutRequest {
  key: string;
  url: string;
  options: UseMutationOptions;
  invalidateQueries?: string[];
}

export const usePutRequest = (options: IUsePutRequest) => {
  const queryClient = useQueryClient();
  const putMutation = useMutation<unknown, AxiosError, object | any>({
    mutationFn: (data) => {
      return axiosClient.put(options.url, data);
    },
    mutationKey: [options.key],
    ...options.options,
    onSuccess: (data, variables, context) => {
      options.invalidateQueries?.forEach((query) => {
        query && query.length > 0 && queryClient.invalidateQueries(query);
      });
      options?.options?.onSuccess?.(data, variables, context);
    },
  });

  return putMutation;
};
