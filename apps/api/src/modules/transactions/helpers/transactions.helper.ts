import { TransactionFile } from '../entities/transaction-file.entity';

export const parseTransactionType = (type: number) => {
  switch (type) {
    case 1:
      return {
        description: 'Venda produtor',
        nature: 'Entrada',
        signal: '+',
      };
    case 2:
      return {
        description: 'Venda afiliado',
        nature: 'Entrada',
        signal: '+',
      };
    case 3:
      return {
        description: 'Comissão paga',
        nature: 'Saída',
        signal: '-',
      };
    case 4:
      return {
        description: 'Comissão recebida',
        nature: 'Entrada',
        signal: '+',
      };
    default:
      break;
  }
};

export const formatTransactionsFile = (
  transactionFileContent: string[],
): TransactionFile[] => {
  const transactions = transactionFileContent.map((transaction: string) => {
    const type = Number(transaction.slice(0, 1));
    const date = transaction.slice(1, 26);
    const product = transaction.slice(26, 56).trim();
    const amount = Number(transaction.slice(57, 66));
    const seller = transaction.slice(66).trim();
    const transactionType = parseTransactionType(type);

    if (transaction) {
      return {
        // user_id: user.id,
        type,
        date,
        product,
        amount,
        seller,
        ...transactionType,
      };
    }

    return;
  });

  return transactions.filter((transaction) => !!transaction);
};
