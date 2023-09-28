import { AxiosError } from "axios";
import reqInstance from "../../../shared/helpers/axios";
import { getToken } from "../../auth/storage";
import { getTransactionsAnalytics } from "./get-transactions-analytics.service"; // Replace with the actual file path

jest.mock("../../../shared/helpers/axios", () => ({
  get: jest.fn(),
}));
jest.mock("../../auth/storage", () => ({
  getToken: jest.fn(),
}));

describe("getTransactionsAnalytics function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch transaction analytics with a valid token", async () => {
    const mockToken = "mocked-token";
    const mockResponse = {
      paidComission: 100,
      receivedComission: 200,
      affiliateSales: 50,
      producerSales: 75,
    };

    // Mock getToken to return a valid token
    (getToken as jest.Mock).mockReturnValue(mockToken);

    // Mock Axios response
    (reqInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await getTransactionsAnalytics();

    expect(result).toEqual(mockResponse);

    // Ensure Axios was called with the correct parameters
    expect(reqInstance.get).toHaveBeenCalledWith("/transactions/analytics", {
      headers: {
        Authorization: `Bearer ${mockToken}`,
      },
    });

    // Ensure getToken was called
    expect(getToken).toHaveBeenCalled();
  });

  it("should handle an error when fetching transaction analytics", async () => {
    // Mock getToken to return a valid token
    (getToken as jest.Mock).mockReturnValue("mocked-token");

    // Mock Axios error
    const errorMessage = "Failed to fetch analytics";
    (reqInstance.get as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    try {
      await getTransactionsAnalytics();
      // The function should throw an error, so this line should not be reached.
      expect(true).toBe(false);
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect((error as AxiosError).message).toBe(errorMessage);
    }

    // Ensure Axios was called with the correct parameters
    expect(reqInstance.get).toHaveBeenCalledWith("/transactions/analytics", {
      headers: {
        Authorization: `Bearer mocked-token`,
      },
    });

    // Ensure getToken was called
    expect(getToken).toHaveBeenCalled();
  });
});
