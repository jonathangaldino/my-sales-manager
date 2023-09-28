import reqInstance from "../../../shared/helpers/axios";
import { getToken } from "../../auth/storage";
import { uploadTransactions } from "./upload-transactions.service"; // Replace with the actual file path

jest.mock("../../../shared/helpers/axios", () => ({
  post: jest.fn(),
}));
jest.mock("../../auth/storage", () => ({
  getToken: jest.fn(),
}));

describe("uploadTransactions function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should upload transactions with a valid token", async () => {
    const mockToken = "mocked-token";
    const mockFile = new File([""], "test.csv", { type: "text/csv" });
    const mockResponse = {
      data: {
        inserted: 10,
        skipped: 5,
      },
    };

    // Mock getToken to return a valid token
    (getToken as jest.Mock).mockReturnValue(mockToken);

    // Mock Axios response
    (reqInstance.post as jest.Mock).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await uploadTransactions(mockFile);

    expect(result.data).toEqual(mockResponse);

    // Ensure Axios was called with the correct parameters
    expect(reqInstance.post).toHaveBeenCalledWith(
      "/transactions/upload",
      expect.any(FormData),
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    expect(getToken).toHaveBeenCalled();
  });

  it("should handle an error when uploading transactions", async () => {
    // Mock getToken to return a valid token
    (getToken as jest.Mock).mockReturnValue("mocked-token");

    // Mock Axios error
    const mockError = {
      isAxiosError: true,
      message: "Request failed with status code 500",
      name: "AxiosError",
      response: {
        data: { error: "Internal Server Error" },
        status: 500,
        statusText: "Internal Server Error",
        headers: {},
        config: {},
      },
      toJSON: jest.fn(),
    };

    (reqInstance.post as jest.Mock).mockRejectedValueOnce(mockError);

    // Call the function
    const result = await uploadTransactions(
      new File([""], "test.csv", { type: "text/csv" })
    );

    expect(result.error).toEqual(mockError);

    // Ensure Axios was called with the correct parameters
    expect(reqInstance.post).toHaveBeenCalledWith(
      "/transactions/upload",
      expect.any(FormData),
      {
        headers: {
          Authorization: `Bearer mocked-token`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Ensure getToken was called
    expect(getToken).toHaveBeenCalled();
  });

  it("should throw an error when no token is available", async () => {
    // Mock getToken to return null (no token available)
    (getToken as jest.Mock).mockReturnValue(null);

    // Call the function and expect it to throw an error
    await expect(
      uploadTransactions(new File([""], "test.csv", { type: "text/csv" }))
    ).rejects.toThrow("Unauthorized");

    // Ensure Axios was not called
    expect(reqInstance.post).not.toHaveBeenCalled();

    // Ensure getToken was called
    expect(getToken).toHaveBeenCalled();
  });
});
