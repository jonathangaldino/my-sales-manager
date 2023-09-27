import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { GetTransactionsResponse, getTransactions } from "../services/get-transactions.service";

type Props = {
  limit: number;
  offset: number;
}

type UseTransactions = {
  transactions: GetTransactionsResponse | undefined;
  error: AxiosError<Error, any> | null;
  isLoading: boolean;
}

export const useTransactions = (options: Props): UseTransactions  => {
  const queryKey = ['transactions', 'params']

  const { data, error, isLoading } = useQuery<GetTransactionsResponse, AxiosError<Error>>(
    queryKey, 
    () => getTransactions(options), 
    { refetchOnWindowFocus: true, refetchInterval: 60000}
  );

  console.log(`Response from getTransactions: `, data);

  return { transactions: data, error: null, isLoading }
}
