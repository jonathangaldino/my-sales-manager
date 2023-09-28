import { deleteToken, getToken, updateToken } from "./storage"; // Replace with the actual file path

describe("Token storage functions", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should update and retrieve the token correctly", () => {
    const token = "testToken123";

    updateToken(token);

    const retrievedToken = getToken();

    expect(retrievedToken).toEqual(token);
  });

  it("should delete the token correctly", () => {
    const token = "testToken123";

    updateToken(token);

    deleteToken();

    const retrievedToken = getToken();

    expect(retrievedToken).toBeNull();
  });
});
