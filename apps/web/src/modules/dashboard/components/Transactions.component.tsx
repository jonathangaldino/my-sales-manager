import { useTransactions } from "../hooks/useTransactions";
import TransactionsAnalytics from "./TransactionsAnalytics.component";
import TransactionsTable from "./TransactionsTable.component";

const Transactions = () => {
  const { transactions, isLoading: isLoadingTransactions } = useTransactions({
    limit: 10,
    offset: 1 //deal with pagination
  })

  return (
    <>
      <TransactionsAnalytics />
      <TransactionsTable 
        loading={isLoadingTransactions} 
        transactions={transactions?.transactions || []} 
        totalPages={transactions?.totalPages || 0} 
      />
    </>
  )
}

export default Transactions;
