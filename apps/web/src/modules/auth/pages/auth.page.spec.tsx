import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "../../../shared/helpers/axios";
import { updateToken } from "../storage";
import AuthPage from "./auth.page";

// Mocking axios and updateToken function
jest.mock("../../../shared/helpers/axios", () => ({
  post: jest.fn(),
}));

jest.mock("../storage", () => ({
  updateToken: jest.fn(),
}));

const renderAuthPage = () =>
  render(
    <BrowserRouter>
      <AuthPage />
    </BrowserRouter>
  );

describe("AuthPage component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with default "Login" action', () => {
    renderAuthPage();

    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("name@company.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  it('switches between "Login" and "Register" actions when clicking the button', () => {
    renderAuthPage();
    const button = screen.getByText("Sign Up");

    fireEvent.click(button);
    expect(screen.getByText("Sign up a new account")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
  });

  it("handles form submission successfully", async () => {
    renderAuthPage();
    const emailInput = screen.getByPlaceholderText("name@company.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");
    const submitButton = screen.getByText("Sign in");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Mock axios response
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { token: "token123" },
    });

    fireEvent.click(submitButton);

    const assertAfterWaitFor = () => {
      expect(axios.post).toHaveBeenCalledWith("/auth/login", {
        email: "test@example.com",
        password: "password123",
      });
      expect(updateToken).toHaveBeenCalledWith("token123");
    };

    await waitFor(() => {
      assertAfterWaitFor();
    });
  });

  it("handles form submission with an error", async () => {
    renderAuthPage();
    const emailInput = screen.getByPlaceholderText("name@company.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");
    const submitButton = screen.getByText("Sign in");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Mock axios error
    (axios.post as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to login")
    );

    fireEvent.click(submitButton);

    const assertAfterWaitFor = () => {
      expect(axios.post).toHaveBeenCalledWith("/auth/login", {
        email: "test@example.com",
        password: "password123",
      });
      expect(updateToken).not.toHaveBeenCalled();
      expect(screen.getByText("Failed to login")).toBeInTheDocument();
    };

    await waitFor(() => {
      assertAfterWaitFor();
    });
  });
});
