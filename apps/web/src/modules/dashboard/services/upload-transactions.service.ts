import { AxiosError } from "axios";
import reqInstance from "../../../shared/helpers/axios";
import { ServiceResponse } from "../../../shared/types";
import { getToken } from "../../auth/storage";


type APIResponse = {inserted: number, skipped: number}

export const uploadTransactions = async (file: File): Promise<ServiceResponse<APIResponse, AxiosError>> => {
  const fd = new FormData();
  fd.append('file', file)

  // todo: perhaps it would be better to move this to a context
  // todo: and receive as argument of the function
  const token = getToken();

  if (!token) {
    throw new Error('Unauthorized')
  }

  try {
    const { data } = await reqInstance.post<APIResponse>('/transactions/upload', fd, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": 'multipart/form-data'
      }
    });

    return {
      data,
      error: null
    }
  } catch (error) {
    return {
      error: error as AxiosError,
      data: null,
    }
  }
}
