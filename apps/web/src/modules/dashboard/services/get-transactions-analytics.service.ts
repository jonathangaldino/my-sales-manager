import reqInstance from "../../../shared/helpers/axios";
import { getToken } from "../../auth/storage";

export type GetTransactionsAnalyticsResponse = {
  paidComission: number;
  receivedComission: number;
  affiliateSales: number;
  producerSales: number;
};

export const getTransactionsAnalytics =
  async (): Promise<GetTransactionsAnalyticsResponse> => {
    const { data } = await reqInstance.get<GetTransactionsAnalyticsResponse>(
      `/transactions/analytics`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return data;
  };
