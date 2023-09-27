export type TransactionEntity = {
  id: string;
  userId: string;
  type: number;
  date: Date;
  product: string;
  seller: string;
  amount: number;
  description: string;
  nature: string;
  signal: string;
  createdAt: Date;
  updatedAt: Date;
};
