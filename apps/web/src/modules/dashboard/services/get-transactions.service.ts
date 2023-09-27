import reqInstance from "../../../shared/helpers/axios";
import { Transaction } from "../../../shared/types";
import { getToken } from "../../auth/storage";

type Props = {
  limit: number;
  offset: number;
}

export type GetTransactionsResponse = {
  totalPages: number;
  transactions: Transaction[];
}

export const getTransactions = async ({ limit, offset }: Props): Promise<GetTransactionsResponse> => {
  const { data } = await reqInstance.get<GetTransactionsResponse>(`/transactions?limit=${limit}&offset=${offset}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  })

  return data;
}
