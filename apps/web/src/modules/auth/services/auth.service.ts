import { AxiosError } from "axios";
import axios from "../../../shared/helpers/axios";
import { ServiceResponse } from "../../../shared/types";

type Props = {
  email: string;
  password: string;
  action: "register" | "login"
}

export type AuthResponse = {
  token: string;
}

export const authService = async ({ email, password, action }: Props): Promise<ServiceResponse<AuthResponse, Error>> => {
  let url = `/auth`;

  if (action === "login") {
    url += "/login";
  }

  try {
    const { data } = await axios.post<AuthResponse>(url, { 
      email,
      password,
    })
  
    return {
      data,
      error: null,
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        data: null,
        error: new Error(error.message),
      }
    }

    console.error(`Fail to auth request: `, error)
    return {
      data: null,
      error: new Error()
    }
  }
}
