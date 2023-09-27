export type ServiceResponse<D, E> = { data: D, error: null } | { data: null, error: E }

export type Transaction = {
  id: string;
  userId: string;
  type: number;
  date: string;
  product: string;
  seller: string;
  amount: number;
  description: string;
  nature: string;
  signal: string;
  createdAt: Date;
  updatedAt: Date;
}
