import { AxiosError } from "axios";
import { useQuery } from "react-query";
import {
  getTransactionsAnalytics,
  GetTransactionsAnalyticsResponse,
} from "../services/get-transactions-analytics.service";

type UseTransactionAnalytics = {
  analytics: GetTransactionsAnalyticsResponse | undefined;
  error: AxiosError<Error, any> | null;
  isLoading: boolean;
};

export const useTransactionsAnalytics = (): UseTransactionAnalytics => {
  const queryKey = ["transactions-analytics"];

  const { data, error, isLoading } = useQuery<
    GetTransactionsAnalyticsResponse,
    AxiosError<Error>
  >(queryKey, () => getTransactionsAnalytics(), {
    refetchOnWindowFocus: true,
    refetchInterval: 60000,
  });

  return { analytics: data, error, isLoading };
};
