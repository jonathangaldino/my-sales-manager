import { create } from "zustand";
import { authService } from "../services/auth.service";
import { deleteToken, getToken, updateToken } from "../storage";

type AuthProps = {
  email: string;
  password: string;
  action: "login" | "register"
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;

  auth: (props: AuthProps) => Promise<{ success: boolean, error: Error | null }>;
  signout: () => void;
}

export const useAuthStore = create<AuthState>()(( set ) => ({
  token: getToken(),
  isAuthenticated: false,

  auth: async (props) => {
    const { data, error } = await authService(props)
    
    set({ isAuthenticated: !error, token: data?.token })

    if (error) {
      return { success: false, error }
    }

    updateToken(data.token);
    return { success: true, error: null }
  },
  signout: () => {
    deleteToken();
    return set({ token: null, isAuthenticated: false })
  }
}))
