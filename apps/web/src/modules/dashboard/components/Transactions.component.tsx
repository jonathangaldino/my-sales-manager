import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import TransactionsAnalytics from "./TransactionsAnalytics.component";
import TransactionsTable from "./TransactionsTable.component";

const Transactions = () => {
  const [offset, setOffset] = useState<number>(0);

  const { transactions, isLoading: isLoadingTransactions } = useTransactions({
    limit: 20,
    offset,
  });

  return (
    <>
      <TransactionsAnalytics />
      <TransactionsTable
        loading={isLoadingTransactions}
        transactions={transactions?.transactions || []}
        totalPages={transactions?.totalPages || 0}
        changePageFn={setOffset}
        currentPage={offset}
      />
    </>
  );
};

export default Transactions;
