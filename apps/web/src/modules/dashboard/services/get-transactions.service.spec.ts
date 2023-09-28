import { AxiosError } from "axios";
import reqInstance from "../../../shared/helpers/axios";
import { getToken } from "../../auth/storage";
import { getTransactions } from "./get-transactions.service"; // Replace with the actual file path

jest.mock("../../../shared/helpers/axios", () => ({
  get: jest.fn(),
}));
jest.mock("../../auth/storage", () => ({
  getToken: jest.fn(),
}));

describe("getTransactions function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch transactions with a valid token", async () => {
    const mockToken = "mocked-token";
    const mockLimit = 10;
    const mockOffset = 0;
    const mockResponse = {
      totalPages: 2,
      transactions: [
        { id: 1, amount: 100 },
        { id: 2, amount: 200 },
      ],
    };

    // Mock getToken to return a valid token
    (getToken as jest.Mock).mockReturnValue(mockToken);

    // Mock Axios response
    (reqInstance.get as jest.Mock).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await getTransactions({
      limit: mockLimit,
      offset: mockOffset,
    });

    expect(result).toEqual(mockResponse);

    // Ensure Axios was called with the correct parameters
    expect(reqInstance.get).toHaveBeenCalledWith(
      `/transactions?limit=${mockLimit}&offset=${mockOffset}`,
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
      }
    );

    expect(getToken).toHaveBeenCalled();
  });

  it("should handle an error when fetching transactions", async () => {
    // Mock getToken to return a valid token
    (getToken as jest.Mock).mockReturnValue("mocked-token");

    // Mock Axios error
    const errorMessage = "Failed to fetch transactions";
    (reqInstance.get as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    try {
      await getTransactions({ limit: 10, offset: 0 });
      // The function should throw an error, so this line should not be reached.
      expect(true).toBe(false);
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect((error as AxiosError).message).toBe(errorMessage);
    }

    // Ensure Axios was called with the correct parameters
    expect(reqInstance.get).toHaveBeenCalledWith(
      `/transactions?limit=10&offset=0`,
      {
        headers: {
          Authorization: `Bearer mocked-token`,
        },
      }
    );

    expect(getToken).toHaveBeenCalled();
  });
});
