import { UseMutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../services/axiosClient";
import { AxiosError } from "axios";

interface IUsePostRequest {
  key: string;
  url: string;
  options: UseMutationOptions;
  invalidateQueries?: string[];
}

export const useDeleteRequest = (options: IUsePostRequest) => {
  const queryClient = useQueryClient();
  const postMutation = useMutation<unknown, AxiosError>({
    mutationFn: (data) => {
      return axiosClient.delete(options.url, data);
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

  return postMutation;
};
