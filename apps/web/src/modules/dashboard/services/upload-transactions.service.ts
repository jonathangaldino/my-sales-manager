import reqInstance from "../../../shared/helpers/axios";
import { getToken } from "../../auth/storage";


type ServiceResponse<D> = { data: D, error: null } | { data: null, error: Error }
type APIResponse = {inserted: number, skipped: number}

export const uploadTransactions = async (file: File): Promise<ServiceResponse<APIResponse>> => {
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
      error: error as Error,
      data: null,
    }
  }
}
